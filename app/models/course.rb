class Course < ApplicationRecord
  belongs_to :curator, class_name: "User"
  has_many :hole_layouts, dependent: :destroy
  has_many :holes, through: :hole_layouts, dependent: :destroy
  has_many :photos, as: :photo_attachable, dependent: :destroy
  has_many :reviews, dependent: :destroy
  
  validates :name, presence: true, length: { in: 6..75 }
  validates :description, length: { maximum: 600 }
  validates_presence_of :city
  validates :photos, length: { maximum: 20 }
  validates_associated :photos, :hole_layouts, :holes
  
  accepts_nested_attributes_for :hole_layouts, :photos
  
  def curator_name
    User.find(self.curator_id).username
  end
  
  def avg_rating
    return 0 if self.reviews.size == 0
    self.reviews.map{|review| review[:rating]}.sum / self.reviews.count
  end
end
