class CreatePhotos < ActiveRecord::Migration[6.1]
  def change
    create_table :photos do |t|
      t.string :url

      t.references :uploader, null: false, foreign_key: { to_table: :users }
      t.references :photo_attachable, polymorphic: true
      
      t.timestamps
    end
  end
end
