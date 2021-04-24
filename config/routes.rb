Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }
  
  namespace :api do
    resources :courses, only: [:index, :show, :create, :update, :destroy]
    resources :rounds, only: [:index, :create, :destroy]
    resources :direct_messages, only: [:index, :create, :destroy]
    resources :friendships, only: [:index, :create, :update, :destroy]
    resources :messages, only: [:update, :create, :destroy]
    resources :photos, only: [:new, :create, :destroy]
    resources :reviews, only: [:create, :destroy]
    
    get 'search_courses', to: 'search#courses'
    get 'search_users', to: 'search#users'
    
    get 'my_courses', to: 'courses#my_courses'
  end
  
  # All our front-end routing takes place in app/javascript/components/App.js
  root 'pages#app'
  get '*path', to: 'pages#app'
end
