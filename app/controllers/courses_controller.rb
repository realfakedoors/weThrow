class CoursesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :correct_user, only: [:update, :destroy]
  
  def index
    @courses = Course.all
    
    render json: @courses
  end
  
  def show
    render json: @course
  end

  def create
    @course = Course.new(course_params)
    @course.curator = current_user
    
    if @course.save
      render json: @course
    else
      render json: @course.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @course.destroy
    
    render json: {}, status: :no_content
  end
  
  private
  
  def set_course
    @course = Course.find(params[:id])
  end
  
  def correct_user
    unless (current_user == @course.curator || current_user.admin == true)
      render json: {}, status: :no_content
    end
  end
  
  def course_params
    params.require(:course).permit(
      :name,
      :description,
      :current_conditions,
      :public_availability,
      :schedule,
      :lat,
      :lng,
      :address,
      :city,
      :state,
      :zip
    )
  end
end
