class DirectMessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_direct_message, only: [:update, :destroy]
  before_action :correct_user, only: [:destroy]
  
  def index
    if current_user.admin && params[:inbox] == "admin"
      @direct_messages = DirectMessage.where(category: ["issue", "feedback", "approval"])
    else
      @direct_messages = DirectMessage.where(category: "private", sender_id: current_user.id)
        .or(DirectMessage.where(category: "private", recipient_id: current_user.id))
    end
    
    @unread_count = 0
    @partners = []
    @direct_messages.each do |dm|
      dm.messages.each do |msg| 
        @unread_count += 1 if msg.read_by.exclude?(current_user.id.to_s)
      end
      @partners << {dm.id.to_s => dm.other_user(current_user).username}
    end
    
    render json: {direct_messages: @direct_messages.as_json(include: :messages), unread_count: @unread_count, partners: @partners}
  end
  
  def create
    @direct_message = DirectMessage.new(direct_message_params)
    @direct_message.messages.first.read_by << current_user.id
    
    if @direct_message.save
      render json: [@direct_message, @direct_message.messages]
    else
      render json: @direct_message.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    @direct_message.destroy
    
    render json: {}, status: :no_content
  end
  
  private
  
  def set_direct_message
    @direct_message = DirectMessage.find(params[:id])
  end
  
  def correct_user
    if current_user != ( @direct_message.sender || @direct_message.recipient )
      render json: {}, status: :no_content
    end
  end

  def direct_message_params
    params.require(:direct_message).permit(
      :sender_id,
      :recipient_id,
      :subject,
      :category,
      :inbox,
      messages_attributes: [
        :author_id,
        :content
      ]
    )
  end
end
