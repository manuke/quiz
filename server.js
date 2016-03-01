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
    maxReceivedFrameSize: '1MiB',
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
                fs.appendFileSync("/tmp/result.txt", message.utf8Data + "\n");
                client.sendUTF(message.utf8Data);
            } else if  (obj.kind == 'question') {
                // 文字列だったら文字列としてそのまま送信
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
