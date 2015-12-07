class AddIndexToSlugFromBins < ActiveRecord::Migration
  def change
    add_index :bins, :slug
  end
end
