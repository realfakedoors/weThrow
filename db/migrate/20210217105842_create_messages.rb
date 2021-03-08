class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :content
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :messageable, polymorphic: true
      
      t.timestamps
    end
  end
end
