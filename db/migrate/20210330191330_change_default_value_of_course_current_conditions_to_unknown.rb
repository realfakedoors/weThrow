class ChangeDefaultValueOfCourseCurrentConditionsToUnknown < ActiveRecord::Migration[6.1]
  def change
    change_column_default :courses, :current_conditions, "Unknown"
  end
end
