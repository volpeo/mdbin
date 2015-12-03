class CreateBins < ActiveRecord::Migration
  def change
    create_table :bins do |t|
      t.text :content
      t.references :user, index: true, foreign_key: true
      t.string :slug

      t.timestamps null: false
    end
  end
end
