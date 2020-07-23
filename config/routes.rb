Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
      # 上記で追加されるルーティング（defaultsオプションでjsonを指定）
      # group_api_messages GET
      # /groups/:group_id/api/messages(.:format)
      # api/messages#index {:format=>"json"}
    end
  end
end