class AddSenderAndRecipientNamesToDirectMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :direct_messages, :sender_name, :string, default: ""
    add_column :direct_messages, :recipient_name, :string, default: ""
  end
end
