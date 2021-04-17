class CreateFriendships < ActiveRecord::Migration[6.1]
  def change
    create_table :friendships do |t|
      t.integer :buddy_id, null: false
      t.integer :pal_id, null: false
      t.boolean :confirmed, default: false

      t.timestamps
    end
  end
end
