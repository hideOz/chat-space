$(function(){
  function buildHTML(message){
    if ( message.content && message.image ) {
      var html =
        `<div class="main__messages__message" data-message-id="${message.id}">
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
    } else if (message.image) {
      var html =
      `<div class="main__messages__message" data-message-id="${message.id}">
        <div class="main__messages__message__upper">
          <div class="main__messages__message__upper__talker">
            ${message.user_name}
          </div>
          <div class="main__messages__message__upper__date">
            ${message.created_at}
          </div>
        </div>
        <img src="${message.image}" >
      </div>`
    } else if (message.content) {
      var html =
        `<div class="main__messages__message" data-message-id="${message.id}">
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
    };
  return html;
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
  var reloadMessages = function() {
    var last_message_id = $('.main__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__messages').append(insertHTML);
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});