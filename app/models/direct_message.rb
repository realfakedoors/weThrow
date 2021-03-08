class DirectMessage < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  
  has_many :messages, as: :messageable, dependent: :destroy
  
  default_scope -> { order('created_at DESC') }
  
  accepts_nested_attributes_for :messages
  
  def other_user(user)
    user == self.sender ? self.recipient : self.sender
  end
end
