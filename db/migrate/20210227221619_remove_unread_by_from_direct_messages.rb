class RemoveUnreadByFromDirectMessages < ActiveRecord::Migration[6.1]
  def change
    remove_column :direct_messages, :unread_by
  end
end
