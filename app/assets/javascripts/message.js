$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="main__messages__message">
          <div class="main__messages__message__upper">
            <div class="main__messages__message__upper__talker">
              ${message.user_name}
            </div>
            <div class="main__messages__message__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__messages__message__lower">
            <p class="main__messages__message__lower__text">
              ${message.content}
            </p>
          </div>
          <img src="${message.image}" >
        </div>`
      return html;
    } else {
      var html =
        `<div class="main__messages__message">
          <div class="main__messages__message__upper">
            <div class="main__messages__message__upper__talker">
              ${message.user_name}
            </div>
            <div class="main__messages__message__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__messages__message__lower">
            <p class="main__messages__message__lower__text">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  };
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.main__messages').append(html);      
        $('form')[0].reset();
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
        $('.main__form__submit-btn').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        $('.main__form__submit-btn').prop('disabled', false);
      });
  });
});