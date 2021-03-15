class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
         
  has_one :profile_picture, class_name: "Photo", as: :photo_attachable
  
  has_many :direct_messages
  has_many :messages, through: :direct_messages
  has_many :photos
  
  validates :username, presence: true, length: { in: 6..20 }, uniqueness: true
  validates :name, length: { maximum: 50 }
  validates :email, presence: true
  
  # Add a user's admin status and name to their encoded JWT.
  def jwt_payload
    {'admin' => self.admin, 'name' => self.username, 'profile_picture' => grab_profile_pic_url}
  end
  
  def grab_profile_pic_url
    self.profile_picture ? self.profile_picture.url : "default_user.svg"
  end
end
