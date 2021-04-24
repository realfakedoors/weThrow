class CreateRecordedHoles < ActiveRecord::Migration[6.1]
  def change
    create_table :recorded_holes do |t|
      t.references :round, null: false, foreign_key: true
      t.string :name
      t.integer :par
      t.integer :distance
      t.integer :score

      t.timestamps
    end
  end
end
