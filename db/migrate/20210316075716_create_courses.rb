class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.references :curator, null: false, foreign_key: { to_table: :users }
      t.string :name
      t.text :description
      t.text :current_conditions
      t.string :public_availability
      t.string :schedule
      t.bigint :lat
      t.bigint :lng
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip

      t.timestamps
    end
  end
end
