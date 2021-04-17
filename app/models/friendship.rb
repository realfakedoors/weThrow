class Friendship < ApplicationRecord
  belongs_to :buddy, class_name: 'User'
  belongs_to :pal, class_name: 'User'
  
  validate :friendship_uniqueness, on: :create
  
  def other_user(user_id)
    user_id == self.buddy_id ? self.pal : self.buddy
  end
  
  def friendship_uniqueness
    if Friendship.find_by(buddy_id: buddy_id, pal_id: pal_id) || Friendship.find_by(pal_id: buddy_id, buddy_id: pal_id)
      errors.add :base, "Friendship already exists!"
    end
  end
end
