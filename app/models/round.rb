class Round < ApplicationRecord
  belongs_to :course
  belongs_to :user
  has_many :recorded_holes, dependent: :destroy
  
  accepts_nested_attributes_for :recorded_holes
  
  before_create :calculate_differential, :set_golfer_name
  
  def total_distance
    zero_if_empty?
    self.recorded_holes.map{|hole| hole.distance}.sum
  end
  
  def total_par
    zero_if_empty?
    self.recorded_holes.map{|hole| hole.par}.sum
  end
  
  def score
    zero_if_empty?
    self.recorded_holes.map{|hole| hole.score}.sum
  end
  
  def calculate_differential
    self.differential = (score - total_par)
  end
  
  def set_golfer_name
    self.golfer_name = User.find(self.user_id).username
  end
  
  private
  
  def zero_if_empty?
    return 0 if self.recorded_holes.size == 0
  end
end
