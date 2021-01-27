Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }
  
  get 'pages/hello'
  root 'pages#hello'
end
