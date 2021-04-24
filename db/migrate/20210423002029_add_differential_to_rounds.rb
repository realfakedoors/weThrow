class AddDifferentialToRounds < ActiveRecord::Migration[6.1]
  def change
    change_table :rounds do |t|
      t.integer :differential
    end
  end
end
