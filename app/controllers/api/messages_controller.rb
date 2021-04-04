class Api::MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_message, only: [:update, :destroy]
  
  def create
    @message = Message.new(message_params)
    @message.read_by << current_user.id
    
    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages, status: :unprocessable_entity
    end      
  end
  
  def update
    unless @message.read_by.include?(current_user.id.to_s)
      @message.read_by << current_user.id 
      @message.save!
    end
    render json: @message
  end

  def destroy
    @message.destroy
    
    render json: {}, status: :no_content
  end

  private
  
  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:author_id, :content, :messageable_id, :messageable_type)
  end
end
