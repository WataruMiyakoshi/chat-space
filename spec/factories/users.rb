FactoryBot.define do

  factory :user do
    password = Faker::Internet.password(min_length: 8)
    sequence(:name)        { Faker::Name.first_name }
    sequence(:email)       { Faker::Internet.email }
    password               { password }
    password_confirmation  { password}
  end

end