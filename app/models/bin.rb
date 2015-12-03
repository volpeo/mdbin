class Bin < ActiveRecord::Base
  belongs_to :user

  before_create :add_slug

  SLUG_LENGTH = 8

  private

  def add_slug
    loop do
      self.slug = SlugGenerator.generate(Bin::SLUG_LENGTH)
      break unless Bin.find_by_slug(self.slug)
    end
  end
end
