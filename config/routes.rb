Rails.application.routes.draw do  
  devise_for :users, defaults: { format: :json }
  
  # All our routing takes place in react-router-dom at app/javascript/components/App.js
  get '*path', to: 'pages#app'
  root 'pages#app'
end
