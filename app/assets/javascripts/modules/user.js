$(function(){

  let search_list = $("#UserSearchResult")
  let group_member = $(".ChatMembers")

  function appendUser(users){
    let html = `
      <div class="ChatMember clearfix">
        <p class="ChatMember__name">${users.user_name}</p>
        <div class="ChatMember__add ChatMember__button" data-user-id=${users.user_id} data-user-name=${users.user_name}>追加</div>
      </div>
      `
    search_list.append(html);
  }
  function appendNoUser(){
    let html =`
      <div class="ChatMember clearfix">
        <p class="ChatMember__name">ユーザーが見つかりません</p>
      </div>
    `
    search_list.append(html);
  }
  function addMenberToGroup(user_id, user_name){
    let html =`
              <div class="ChatMember">
                <p class="ChatMember__name">${user_name}</p>
                <input name="group[user_ids][]" type="hidden" value="${user_id}" />
                <div class="ChatMember__remove ChatMember__button">削除</div>
              </div>
    `
    group_member.append(html);
  }

  $('#UserSearch__field').on('keyup',function(){
    let input = $(this).val()
    let url = "/users"
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      data: {keyword: input}
    })
    .done(function(users){
      search_list.empty();
      if(users.length !== 0){
        users.forEach(function(users){
          appendUser(users);
        });
      } else if (input.length == 0) {
        return false;
      } else{
        appendNoUser();
      }
    })
    .fail(function(){
      alert("oops!検索に失敗ぴえｎ");
    })
  });

  $("#UserSearchResult").on('click', '.ChatMember__add.ChatMember__button', function(){
    let parent = $(this).parent();
    let addUserId = $(this).attr("data-user-id");
    let addUserName = $(this).attr("data-user-name");
    parent.remove();
    addMenberToGroup(addUserId, addUserName);
  });
  $(".ChatMembers").on('click', '.ChatMember__remove.ChatMember__button', function(){
    let parent = $(this).parent();
    parent.remove();
  });

});