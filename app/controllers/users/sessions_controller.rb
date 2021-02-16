class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]
  
  def create
    @user = User.find(params[:email])
    
    @user.admin ? admin = true : admin = false ;
    render json: { admin: admin }
  end

  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end
end
