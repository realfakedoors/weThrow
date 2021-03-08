class AddAuthorNameToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :author_name, :string, default: ""
  end
end
