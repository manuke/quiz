// document
var doc = document;

// fileを参照したらサーバに送信
doc.getElementById('image')
.addEventListener('change', function(evt) {
    var file = evt.target.files[0];
    console.log(file);
    socket.send(file);
}, false);
var onDomLoadFunc = function() {
    var textarea = document.getElementById('textarea');
    var button = document.getElementById('sendText');
    button.onclick = function() {
	    socket.send(textarea.value);
    }
    var countdownButton = document.getElementById('sendCountdown');
    countdownButton.onclick = function() {
	    socket.send(JSON.stringify({"countdown":1,"kind":"countdown"}));
    }
    var countdownButton = document.getElementById('sendCountdown');
    countdownButton.onclick = function() {
	    socket.send(JSON.stringify({"countdown":1,"kind":"countdown"}));
    }
    var urlButton = document.getElementById('sendUrl');
    urlButton.onclick = function() {
        var url = document.getElementById('url_text').value;
        console.log(url);
	    socket.send(JSON.stringify({"url":url,"kind":"url"}));
    }

    //parameterがないやつにはコンソール表示
    var params = getAllUrlParameter();
    if (!params.uid) {
        $('.send').show();
    }
}
/* exec on SCRIPT POSTION*/
onDomLoadFunc();
