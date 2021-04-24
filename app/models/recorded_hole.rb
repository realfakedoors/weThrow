class RecordedHole < ApplicationRecord
  belongs_to :round
  
  validates_presence_of :score, :par, :distance
end
