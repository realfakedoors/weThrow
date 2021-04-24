class AddGolferNameToRounds < ActiveRecord::Migration[6.1]
  def change
    change_table :rounds do |t|
      t.string :golfer_name
    end
  end
end
