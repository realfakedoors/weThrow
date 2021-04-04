class CreateHoleLayouts < ActiveRecord::Migration[6.1]
  def change
    create_table :hole_layouts do |t|
      t.references :course, foreign_key: true
      t.string :name, null: false
      
      t.timestamps
    end
  end
end
