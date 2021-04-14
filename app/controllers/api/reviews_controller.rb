class Api::ReviewsController < ApplicationController
  before_action :authenticate_user!
  
  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id
    
    if @review.save
      render json: @review.as_json
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @review = Review.find(params[:id])
    
    correct_user
    @review.destroy
  end
  
  private
  
  def correct_user
    unless (current_user == @review.user || current_user.admin == true)
      render json: {}, status: :no_content
    end
  end
  
  def review_params
    params.require(:review).permit(:rating, :assessment, :course_id, :id)
  end
end
