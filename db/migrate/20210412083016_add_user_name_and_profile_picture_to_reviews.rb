class AddUserNameAndProfilePictureToReviews < ActiveRecord::Migration[6.1]
  def change
    change_table :reviews do |t|
      t.string :user_name
      t.string :user_profile_picture
    end
  end
end
