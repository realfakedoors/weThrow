class ChangeCourseScheduleToSeasonality < ActiveRecord::Migration[6.1]
  def change
    rename_column :courses, :schedule, :seasonality
  end
end
