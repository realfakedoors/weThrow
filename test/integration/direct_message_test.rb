require 'test_helper'

class DirectMessageTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  setup do
    @user = users(:rocko)
    @admin = users(:dr_hutchison)
    
    @user.confirm
    @admin.confirm
    sign_in @user
    
    @dm_params = { 
      direct_message: {
        sender_id: @user.id,
        recipient_id: @admin.id,
        subject: "Hey Paula!",
        category: "private",
        messages_attributes: [
          author_id: @user.id,
          content: "How are ya? -Rocko"
        ]
      }
    }
  end
  
  test "Direct messages" do
    # Users can successfully create direct message conversations with other users.
    assert_difference 'DirectMessage.count', 1 do
      post '/direct_messages', params: @dm_params
    end
    
    # Users can add messages to the conversation.
    sign_in @user
    assert_difference 'Message.count', 1 do
      post '/messages', params: {
        message: {
          author_id: @user.id,
          content: "I can actually add messages, this is great!",
          messageable_type: "DirectMessage",
          messageable_id: DirectMessage.last.id,
        }
      }
    end
    
    # Users are added to a message's "read by" list when a message is updated.
    new_msg_id = Message.last.id
    patch "/messages/#{new_msg_id}"
    assert_includes Message.last.read_by, @user.id.to_s
    
    # Direct messages can't be created with missing params.
    bad_dm_params = @dm_params.deep_dup
    bad_dm_params[:direct_message][:sender_id] = ""
    assert_no_difference 'DirectMessage.count' do
      post '/direct_messages', params: bad_dm_params
    end
    bad_dm_params = @dm_params.deep_dup
    bad_dm_params[:direct_message][:recipient_id] = ""
    assert_no_difference 'DirectMessage.count' do
      post '/direct_messages', params: bad_dm_params
    end
    bad_dm_params = @dm_params.deep_dup
    bad_dm_params[:direct_message][:messages_attributes][0][:author_id] = nil
    assert_no_difference 'DirectMessage.count' do
      post '/direct_messages', params: bad_dm_params
    end
    bad_dm_params = @dm_params.deep_dup
    bad_dm_params[:direct_message][:messages_attributes][0][:content] = nil
    assert_no_difference 'DirectMessage.count' do
      post '/direct_messages', params: bad_dm_params
    end
    
    # The content of a message can't exceed 1000 characters.
    bad_dm_params = @dm_params.deep_dup
    really_long_string = "What is love?" * 1000
    bad_dm_params[:direct_message][:messages_attributes][0][:content] = really_long_string
    assert_no_difference 'DirectMessage.count' do
      post '/direct_messages', params: bad_dm_params
    end
    
    # The content of a message can't be empty either.
    bad_dm_params = @dm_params.deep_dup
    empty_string = ""
    bad_dm_params[:direct_message][:messages_attributes][0][:content] = empty_string
    assert_no_difference 'DirectMessage.count' do
      post '/direct_messages', params: bad_dm_params
    end
    
    # A user can only check their inbox if they're signed in.
    sign_out @user
    get "/direct_messages"
    assert_response :redirect
    sign_in @user
    get "/direct_messages"
    assert_response :success
    assert_includes(response.body, @dm_params[:direct_message][:subject])
    
    # Destroying a direct message also destroys its associated messages.
    sign_in @user
    new_dm_id = DirectMessage.last.id
    assert_difference 'Message.count', -2 do
      delete "/direct_messages/#{new_dm_id}"
    end
    assert_response :no_content
  end
  
  test "Admin messages" do
    # Admins have their own shared inbox of admin-related direct messages.
    # This includes things like issue tickets, user feedback and approval requests.
    ticket_params = {
      direct_message: {
        sender_id: @user.id,
        recipient_id: @admin.id,
        subject: "My profile won't save!",
        category: "issue",
        messages_attributes: [
          author_id: @user.id,
          content: "Help! How do I do this?"
        ]
      }
    }
    sign_in @user
    post '/direct_messages', params: ticket_params
    sign_in @admin
    get "/direct_messages", params: {inbox: "admin"}
    assert_response :success
    assert_includes(response.body, ticket_params[:direct_message][:subject])
  end
end
