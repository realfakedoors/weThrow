class CreateHoles < ActiveRecord::Migration[6.1]
  def change
    create_table :holes do |t|
      t.references :hole_layout, foreign_key: true
      t.string :name, null: false
      t.integer :par, null: false
      t.integer :distance
      
      t.timestamps
    end
  end
end
