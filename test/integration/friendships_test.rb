require 'test_helper'

class FriendshipsTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  setup do
    @buddy = users(:rocko)
    @pal = users(:dr_hutchison)
    
    @buddy.confirm
    @pal.confirm
  end
  
  test "Friendships" do
    friendship_params = {
      friendship: {
        buddy_id: @buddy.id,
        pal_id: @pal.id
      }
    }
    
    # Users can search for other users by username.
    search_params = {
      search: "hutch100",
    }
    sign_in @buddy
    get '/api/search_users', params: search_params
    assert_response :success
    assert_includes(response.body, @pal.name)
    # Users can send friend requests to other users.
    assert_difference 'Friendship.count', 1 do
      sign_in @buddy
      post '/api/friendships', params: friendship_params
    end
    
    # Friendships should be unique, no matter who is requesting them.
    reverse_friendship_params = { 
      friendship: { 
        buddy_id: @pal.id, 
        pal_id: @buddy.id 
      }
    }
    assert_no_difference 'Friendship.count' do
      sign_in @buddy
      post '/api/friendships', params: friendship_params
      sign_in @pal
      post '/api/friendships', params: reverse_friendship_params
    end
    
    # It's up to the receipient to accept or decline a friend request.
    sign_in @pal
    get "/api/friendships"
    assert_response :success
    assert_includes(response.body, friendship_params[:friendship][:buddy_id].to_s)
    assert_includes(response.body, @buddy.name)
    
    # Accepting confirms the friendship.
    new_friendship_id = Friendship.last.id
    sign_in @pal
    patch "/api/friendships/#{new_friendship_id}"
    assert Friendship.last.confirmed?
    # Declining destroys the friendship.
    assert_difference 'Friendship.count', -1 do
      sign_in @pal
      delete "/api/friendships/#{new_friendship_id}"
    end
  end
end
