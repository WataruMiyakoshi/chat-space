# README

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false, add_index :users, :name,unique: true|
|email|string|null: false, add_index :users, :email,unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups,  through:  : groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index :groups, :name,unique: true|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users,  through:  : groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|images|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user