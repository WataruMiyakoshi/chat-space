$(function(){
  function buildHtml(message){
    if (message.image) {
      let html = `
        <div class="Message-list__content" data-message-id="${message.id}">
          <div class="Message-info">
            <div class="Message-info__user-name">
              ${message.user_name}
            </div>
            <div class="Message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message-list__files">
            <p class="message">
              ${message.body}
            </p>
            <img class="image" src="${message.image}">
          </div>
        </div>`
    return html;
    } else {
      let html = `<div class="Message-list__content" data-message-id="${message.id}">
                    <div class="Message-info">
                      <div class="Message-info__user-name">
                        ${message.user_name}
                      </div>
                      <div class="Message-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Message-list__files">
                      <p class="message">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
    return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.Message-list__content:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        // HTMLの入れ物を作っている
        $.each(messages, function(i, message) {
          insertHTML += buildHtml(message)
          // 自己代入してHTMLを構築している
        });
        $('.Message-list').append(insertHTML);
        $('.Message-list').animate({ scrollTop: $('.Message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
  // ミリ秒単位で処理を繰り返す
  // 7秒より短くすると二重にメッセージが表示されてしまう場合がある
});