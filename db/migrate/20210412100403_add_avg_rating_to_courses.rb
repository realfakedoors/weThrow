class AddAvgRatingToCourses < ActiveRecord::Migration[6.1]
  def change
    change_table :courses do |t|
      t.float :avg_rating, scale: 1
    end
  end
end
