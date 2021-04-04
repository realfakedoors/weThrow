class AddFieldsToCourses < ActiveRecord::Migration[6.1]
  def change
    change_table :courses do |t| 
      t.text :course_designer
      t.string :teepads
      t.text :baskets
      t.integer :established
      t.string :pet_policy
      t.boolean :public_restrooms
      t.boolean :cart_friendly
      t.boolean :free_parking
      t.boolean :camping
      t.boolean :dedicated_property
    end
  end
end
