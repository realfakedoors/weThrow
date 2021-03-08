class RemoveAuthorNameFromMessages < ActiveRecord::Migration[6.1]
  def change
    remove_column :messages, :author_name
  end
end
