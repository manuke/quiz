<?php
require('vendor/autoload.php');
use WebSocket\Client;
$client = new Client("ws://127.0.0.1:8081/");

//TEXT
$json = json_encode(array(
"qid"=>"2", 
"kind"=>"question",
"question"=>"結婚おめでとう!abc",
"A1"=>"kaiou1",
"A2"=>"kaiou2",
"A3"=>"kaiou3",
"A4"=>"kaiou4"
));
$client->send($json);

exit;

//BINARY
$dir = '/Users/ka/Desktop/';
$files = glob(rtrim($dir, '/') . '/*.jpg');
for ($i=0 ; $i<100000 ; $i++) {
foreach ($files as $file) {
$file = file_get_contents($file);
$client->send($file, "binary");
sleep(3);
}
}
