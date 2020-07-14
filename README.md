# README

# ChatSpace DB設計
## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index :users, :name,unique: true|
|email|string|null: false, add_index :users, :email,unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :group_users
- has_many :groups,  through:  : group_users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :group_users
- has_many :users,  through:  : group_users

## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user