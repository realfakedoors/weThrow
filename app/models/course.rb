class Course < ApplicationRecord
  belongs_to :curator, class_name: "User"
  
  validates :name, presence: true, length: { in: 6..75 }
  validates :description, length: { maximum: 300 }
  validates :current_conditions, length: { maximum: 300 }
  validates_presence_of :lat
  validates_presence_of :lng
end
