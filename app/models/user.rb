class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
         
  has_many :direct_messages
  has_many :messages, through: :direct_messages
  
  validates :username, presence: true, length: { in: 6..20 }, uniqueness: true
  validates :name, length: { maximum: 50 }
  validates :email, presence: true
  
  # Add a user's admin status and name to their encoded JWT.
  def jwt_payload
    {'admin' => self.admin, 'name' => self.name}
  end
end
