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
}
/* exec on SCRIPT POSTION*/
onDomLoadFunc();
