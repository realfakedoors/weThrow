class Users::PasswordsController < Devise::PasswordsController
  before_action :configure_send_password_reset_params, only: [:create]
  before_action :configure_update_passwords_params, only: [:update]

  protected

  def configure_send_password_reset_params
    devise_parameter_sanitizer.permit(:password, keys: [:email])
  end
  
  def configure_update_passwords_params
    devise_parameter_sanitizer.permit(:password, keys: [:password, :password_confirmation, :reset_password_token])
  end
end
