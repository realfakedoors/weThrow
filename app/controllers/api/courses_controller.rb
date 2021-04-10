class Api::CoursesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy, :my_courses]
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :correct_user, only: [:update, :destroy]
  
  def index
    @courses = Course.all
    
    render json: @courses.as_json(include: :photos)
  end
  
  def search
    search = params[:search]
    
    if search.length > 0
      @courses = Course.find_by("name ILIKE ?", "%#{search}%")
      render json: @courses.as_json(include: :photos)
    end
  end
  
  def my_courses
    @courses = Course.where(curator_id: current_user.id)
    
    render json: @courses.as_json(include: :photos)
  end
  
  def show
    render json: @course.as_json(include: [:photos, :hole_layouts, :holes])
  end

  def create
    @course = Course.new(course_params)
    @course.curator_id = current_user.id
    
    if @course.save
      render json: @course.as_json(include: [:photos, :hole_layouts, :holes])
    else
      render json: @course.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    # Our form lets us add and delete hole layouts, so we can just wipe them and rebuild each time.
    if course_params["hole_layouts_attributes"] && course_params["hole_layouts_attributes"].length > 0
      @course.hole_layouts.destroy_all
    end
    
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
      :seasonality,
      :lat,
      :lng,
      :address,
      :city,
      :state,
      :zip,
      :course_designer,
      :teepads,
      :baskets,
      :established,
      :pet_policy,
      :public_restrooms,
      :cart_friendly,
      :free_parking,
      :camping,
      :dedicated_property,
      :search,
      photos_attributes: [
        :uploader_id,
        :url
      ],
      hole_layouts_attributes: [
        :name,
        holes_attributes: [
          :name,
          :par,
          :distance
        ]
      ]
    )
  end
end
