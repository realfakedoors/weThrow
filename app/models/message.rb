class Message < ApplicationRecord
  belongs_to :author, class_name: "User"
  belongs_to :messageable, polymorphic: true
  
  default_scope -> { order('created_at DESC') }
  
  validates :content, presence: true, length: { maximum: 1000 }
end
