require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  let(:user) {create(:user)}
  let(:group) {create(:group)}

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end
      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    # paramsの定義、attributes_forはFactoryBotで定義されているメソッド
    # attributes_forはオブジェクトを生成せずにハッシュを生成できる
    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
               params: params
        }
        # postメソッドでcreateアクションを擬似的にリクエストした結果
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
          # changeマッチャは引数の変化を確かめるマッチャ
          # change(Message, :count).by(1)でMessageモデルのレコードが1つ増えたかどうかを確かめている
      end

      it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }

        subject {
          post :create,
               params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
          # 変化しなかったこと＝保存に失敗したことを確かめている
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end