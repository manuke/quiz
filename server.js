var fs = require('fs');
// http server
var connect = require('connect');
    serveStatic = require('serve-static');
var httpServer = connect()
    .use(serveStatic(__dirname + '/webroot'))
    .listen(8081);

// WebSocket Server
var WebSocketServer = require('websocket').server;
var clients = [];
var socket = new WebSocketServer({
    httpServer: httpServer,
    maxReceivedFrameSize: '5MiB',
  autoAcceptConnections: false
});

socket.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  clients.push(connection);
  connection.on('message', function(message) {
    //broadcast the message to all the clients
    clients.forEach(function(client) {
		if (message.type === 'utf8') {
            console.log("text send");
            console.log(message.utf8Data);
            var obj = JSON.parse(message.utf8Data);
            if (obj.kind == 'answer') {
                console.log(obj);
		obj.now = getCurrentTime();
                fs.appendFileSync("/tmp/result.txt", JSON.stringify(obj) + "\n");
                client.sendUTF(message.utf8Data);
            } else if  (obj.kind == 'question') {
                // 文字列だったら文字列としてそのまま送信
		        client.sendUTF(message.utf8Data);
            } else if (obj.kind == 'countdown') {
                client.sendUTF(message.utf8Data);
            } else if (obj.kind == 'url') {
                client.sendUTF(message.utf8Data);
            }
		} else if (message.type === 'binary') {
		    console.log("image send");
		    // バイナリだったらバイナリとしてそのまま送信
		    client.sendBytes(message.binaryData);
		} else {
		    console.log('nanigashi');
		}   
    });
  });
});

//先頭ゼロ付加
function padZero(num) {
    var result;
    if (num < 10) {
	result = "0" + num;
    } else {
	result = "" + num;
    }
    return result;
}    
//現在時刻取得（yyyy/mm/dd hh:mm:ss）
function getCurrentTime() {
    var now = new Date();
    var res = "" + now.getFullYear() + "/" + padZero(now.getMonth() + 1) +
	"/" + padZero(now.getDate()) + " " + padZero(now.getHours()) + ":" +
	padZero(now.getMinutes()) + ":" + padZero(now.getSeconds()) + "." +  now.getMilliseconds();
    return res;
}
