class UsersController < ApplicationController

  def index
    return nil if params[:keyword] == ""
    # 入力フォームが空の場合にアクションを終わらせるための記述
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    # JSファイルで使用するために@usersのインスタンス変数の宣言
    # whereでparamsのLIKE句%部分一致%で検索
    # where.notにcurrent_userを弾く記述を追加
    # limitで検索上限を設ける
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to  root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
