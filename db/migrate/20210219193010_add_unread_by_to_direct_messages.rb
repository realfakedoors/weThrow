class AddUnreadByToDirectMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :direct_messages, :unread_by, :bigint, default: 0
  end
end
