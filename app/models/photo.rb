class Photo < ApplicationRecord
  belongs_to :uploader, class_name: "User"
  belongs_to :photo_attachable, polymorphic: true
  
  default_scope -> { order('created_at DESC') }
  
  validates_presence_of :url
end
