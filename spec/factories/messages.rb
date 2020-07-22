FactoryBot.define do

  factory :message do
    body              { Faker::Lorem.sentence }
    # image             { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/test.jpeg')) }
    image             {File.open("#{Rails.root}/public/images/test_image.jpg")}
    # 上記は模範回答から
    user
    group
  end

end