class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
         
  has_many :direct_messages
  has_many :messages, through: :direct_messages
  
  validates_presence_of :name
  
  # Add a user's admin status and name to their encoded JWT.
  def jwt_payload
    {'admin' => self.admin, 'name' => self.name}
  end
end
