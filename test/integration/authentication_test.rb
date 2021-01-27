require 'test_helper'
require 'devise/jwt/test_helpers'

class AuthenticationTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(email: "rocko1@o-town.com", password: "spunky")
  end
  
  test "JWT Authentication with Devise" do
    assert @user.valid?
    # Send a confirmation email to a user when they sign up.
    confirmation = ActionMailer::Base.deliveries.last
    assert_equal confirmation.to.first, @user.email
    
    # A confirmed user can sign in.
    @user.confirm
    @params = { user: {  email: @user.email, password: @user.password }}
    post '/users/sign_in', params: @params
    assert_response :success
    
    # After signing a user in, we can use their new Authorization Token in each request to our backend API.
    assert response.headers['Authorization'].present?
    auth_token = response.headers['Authorization']
    get '/pages/hello',
      headers: {'Authorization' => auth_token, 'Content-Type' => 'application/json'}
    assert_response :success
    
    # Signing out returns a 'No Content' response.
    delete '/users/sign_out'
    assert_response 204
  end
end
