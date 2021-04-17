class Api::FriendshipsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_friendship, only: [:update, :destroy]
  before_action :correct_user, only: [:update, :destroy]
  
  def index
    @friendships = Friendship.where(buddy: current_user).or(Friendship.where(pal: current_user))
    new_friend_requests = []
    confirmed_friendships = []
    sent_friend_requests = []
    @friendships.each do |friendship|
      other_user = friendship.other_user(current_user.id)
      new_friendship = {
        friendship_id: friendship.id,
        other_user: other_user,
        profile_pic: other_user.grab_profile_pic_url
      }
      if friendship.confirmed?
        confirmed_friendships << new_friendship
      elsif other_user == friendship.buddy
        new_friend_requests << new_friendship
      elsif other_user == friendship.pal
        sent_friend_requests << new_friendship
      end
    end
    
    render json: {new_friend_requests: new_friend_requests.as_json, confirmed: confirmed_friendships.as_json, sent: sent_friend_requests.as_json }
  end

  def create
    @friendship = Friendship.new(friendship_params)
    
    if @friendship.save
      render json: @friendship.as_json
    else
      render json: @friendship.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    @friendship.confirmed = true
    
    if @friendship.save
      render json: @friendship.as_json
    else
      render json: @friendship.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @friendship.destroy
    
    render json: {}, status: :no_content
  end
  
  private
  
  def set_friendship
    @friendship = Friendship.find(params[:id])
  end
  
  def correct_user
    if ((current_user.id != @friendship.buddy_id) && (current_user.id != @friendship.pal_id))
      byebug
      render json: {}, status: :no_content
    end
  end

  def friendship_params
    params.require(:friendship).permit(:buddy_id, :pal_id)
  end
end
