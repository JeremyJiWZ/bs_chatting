
function keysend(event){
    if (event.ctrlKey && event.keyCode == 13) {
        sendMessage();
        $('.main-right-chatmessage')[0].scrollTop = $('.main-right-chatmessage')[0].scrollHeight;
    }
}

