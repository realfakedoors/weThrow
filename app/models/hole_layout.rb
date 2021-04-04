class HoleLayout < ApplicationRecord
  belongs_to :course
  has_many :holes, dependent: :destroy
  
  accepts_nested_attributes_for :holes
  
  validates_presence_of :name
  validates :holes, length: { maximum: 99 }
end
