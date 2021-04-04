class Api::PhotosController < ApplicationController
  before_action :authenticate_user!
  
  def new
    data = S3_BUCKET.presigned_post(key: "photos/#{SecureRandom.uuid}", success_action_status: '201', acl: 'public-read')
    
    render json: { url: data.url, fields: data.fields }
  end
  
  def create
    @photo = Photo.new(photo_params)
    @photo.uploader_id = current_user.id
    
    if @photo.save
      render json: @photo
    else
      render json: @photo.errors.full_messages, status: :unprocessable_entity
    end  
  end
  
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    
    render json: {}, status: :no_content
  end
  
  private
  
  def photo_params
    params.require(:photo).permit(:url, :photo_attachable_id, :photo_attachable_type)
  end
end
