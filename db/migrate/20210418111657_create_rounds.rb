class CreateRounds < ActiveRecord::Migration[6.1]
  def change
    create_table :rounds do |t|
      t.references :course, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :score
      t.text :layout_name
      t.integer :total_distance
      t.integer :total_par

      t.timestamps
    end
  end
end
