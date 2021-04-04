class AddCuratorNameToCourses < ActiveRecord::Migration[6.1]
  def change
    change_table :courses do |t|
      t.string :curator_name
    end
  end
end
