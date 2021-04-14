class Review < ApplicationRecord
  belongs_to :course
  belongs_to :user
  
  validates :rating, presence: true, numericality: { in: 1..10 }
  validates :assessment, length: { maximum: 360 }
  validates :user_id, uniqueness: { scope: :course_id }
  validate :ratings_scale_by_half_integers
  
  def ratings_scale_by_half_integers
    if !rating || ((rating * 2) % 1 != 0)
      errors.add(:rating, "Rating should be either an integer or half integer.")
    end
  end
  
  def user_name
    User.find(self.user_id).username
  end
  
  def user_profile_picture
    User.find(self.user_id).grab_profile_pic_url
  end
end
