class Message < ApplicationRecord

  mount_uploader :image, ImageUploader

  validates :content, presence: true, unless: :image?

  
  belongs_to :group
  belongs_to :user
  
end
