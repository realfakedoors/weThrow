class AddReadByIndex < ActiveRecord::Migration[6.1]
  def change
    add_index :messages, :read_by
  end
end
