class AddAvgRoundToCourses < ActiveRecord::Migration[6.1]
  def change
    change_table :courses do |t|
      t.float :avg_round
    end
  end
end
