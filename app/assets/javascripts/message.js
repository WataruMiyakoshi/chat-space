$(function(){
  function buildHtml(message){
    if (message.image) {
      let html = `<div class="Message-list__content">
                    <div class="Message-list__content__user-name">
                      ${message.user_name}
                    </div>
                    <div class="Message-list__content__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Message-list__files">
                    <p class="message">
                      ${message.body}
                    </p>
                    <img class="image" src="${message.image}">
                  </div>`
    return html;
    } else {
      let html = `<div class="Message-list__content">
                    <div class="Message-list__content__user-name">
                      ${message.user_name}
                    </div>
                    <div class="Message-list__content__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Message-list__files">
                    <p class="message">
                      ${message.body}
                    </p>
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
      $('.Message-form__btn').prop('disabled', false)
    })
    .fail(function(){
      alert("oops!!メッセージか画像を入れてね！>_<ぴえん");
      $('.Message-form__btn').prop('disabled', false)
    });
  });
});