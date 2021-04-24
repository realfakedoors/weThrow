class Api::SearchController < ApplicationController
  before_action :set_search_terms
  
  def courses
    @courses = Course.find_by("name ILIKE ?", "%#{@search}%")
    render json: @courses.as_json(include: [:photos, :hole_layouts, :holes])
  end

  def users
    @users = User.find_by("username ILIKE ?", "%#{@search}%")
    render json: @users.as_json
  end
  
  private
  
  def set_search_terms
    @search = params[:search]
  end
  
  def search_params
    params.require(:search)
  end
end
