Rails.application.routes.draw do  
  devise_for :users, defaults: { format: :json }
  
  resources :direct_messages, only: [:index, :create, :destroy]
  resources :messages, only: [:update, :create, :destroy]
  
  # All our front-end routing takes place in app/javascript/components/App.js
  get '*path', to: 'pages#app'
  root 'pages#app'
end
