require 'test_helper'

class PhotoTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  setup do
    @user = users(:rocko)
    @admin = users(:dr_hutchison)
    
    @user.confirm
    @admin.confirm
    sign_in @user
  end
  
  test "User profile pictures" do
    # We can get a brand new signed AWS S3 url to upload our photo to.
    get '/photos/new'
    assert_includes(response.body, "https://wethrow-photos.s3.us-west-1.amazonaws.com")
    assert_includes(response.body, "x-amz-signature")
    assert_includes(response.body, "x-amz-credential")
    
    # We can then create a new Photo object that becomes our profile picture.
    fake_url = "https://fakeurl.org/photo1"
    new_profile_pic_params = {
      photo: {
        url: fake_url,
        photo_attachable_id: @user.id.to_s,
        photo_attachable_type: "User"
      }
    }
    sign_in @user
    assert_difference 'Photo.count', 1 do
      post '/photos', params: new_profile_pic_params
    end
    assert_equal(@user.grab_profile_pic_url, fake_url)
  end
end
