class ChangeCourseLatAndLngToDecimalType < ActiveRecord::Migration[6.1]
  def change
    change_column :courses, :lat, :decimal
    change_column :courses, :lng, :decimal
  end
end
