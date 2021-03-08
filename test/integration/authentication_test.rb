require 'test_helper'
require 'devise/jwt/test_helpers'

class AuthenticationTest < ActionDispatch::IntegrationTest  
  test "JWT Authentication with Devise" do
    @user = User.create!(name: "spunky", email: "spunky@o-town.com", password: "iloverocko")
    assert @user.valid?
    
    # Send a confirmation email to a user when they sign up.
    confirmation = ActionMailer::Base.deliveries.last
    assert_equal confirmation.to.first, @user.email
    
    # A confirmed user can sign in successfully.
    @user.confirm
    @params = { user: { name: @user.name, email: @user.email, password: @user.password }}
    post '/users/sign_in', params: @params
    assert_response :success
    
    # After signing a user in, we can use their new Authorization Token in each request to our backend API.
    assert response.headers['Authorization'].present?
    auth_token = response.headers['Authorization']
    get '/dashboard',
      headers: {'Authorization' => auth_token}
    assert_response :success
    
    # Signing out returns a 'No Content' response.
    delete '/users/sign_out'
    assert_response 204
    
    # If a user forgets their password, they can send themselves an email and reset it.
    post '/users/password', params: { user: { email: @user.email }}
    reset_email = ActionMailer::Base.deliveries.last
    assert_equal reset_email.to.first, @user.email
    
    # A user can change their password.
    @user.reset_password("koala2", "koala2")
    @params = { user: {  email: @user.email, password: "koala2" }}
    post '/users/sign_in', params: @params
    assert_response :success
    
    # An unconfirmed user can't sign in.
    unconfirmed = User.create!(name: "heffer", email: "heffer@o-town.com", password: "seamonkeys")
    unconfirmed_params = { user: {  email: unconfirmed.email, password: unconfirmed.password }}
    post '/users/sign_in', params: unconfirmed_params
    assert_response 401
  end
end
