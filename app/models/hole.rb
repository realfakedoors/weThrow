class Hole < ApplicationRecord
  belongs_to :hole_layout
  
  validates :name, presence: true, length: { maximum: 3 }
  validates_presence_of :par
end
