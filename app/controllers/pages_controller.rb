class PagesController < ApplicationController
  before_action :authenticate_user!
  
  def hello
  end
end
