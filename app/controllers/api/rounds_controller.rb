class Api::RoundsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @my_rounds = Round.where(user_id: current_user.id)
    
    render json: @my_rounds.as_json(include: :course)
  end

  def create
    @round = Round.new(round_params)
    
    if @round.save
      render json: @round.as_json(include: :recorded_holes)
    else
      render json: @round.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @round = Round.find(params[:id])
    if @round.user_id == current_user.id || current_user.admin?
      @round.destroy
    end
    
    render json: {}, status: :no_content
  end
  
  private
  
  def round_params
    params.require(:round).permit(
      :course_id,
      :user_id,
      :layout_name,
      recorded_holes_attributes: [
        :name,
        :par,
        :distance,
        :score
      ]
    )
  end
end
