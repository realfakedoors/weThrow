class AddReadByToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :read_by, :string, array: true, default: []
  end
end
