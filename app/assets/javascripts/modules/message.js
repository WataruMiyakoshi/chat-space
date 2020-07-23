$(function(){
  function buildHtml(message){
    if (message.image) {
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
  $(".Message-form").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(content){
      let html = buildHtml(content);
      $('.Message-list').append(html);
      $('.Message-list').animate({ scrollTop: $('.Message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("oops!!メッセージか画像を入れてね！>_<ぴえん");
    })
    .always(function(){
      $('.Message-form__btn').prop('disabled', false)
    });
  });
});