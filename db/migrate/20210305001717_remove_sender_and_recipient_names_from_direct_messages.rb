class RemoveSenderAndRecipientNamesFromDirectMessages < ActiveRecord::Migration[6.1]
  def change
    remove_column :direct_messages, :sender_name
    remove_column :direct_messages, :recipient_name
  end
end
