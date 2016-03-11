<?php
require('vendor/autoload.php');
use WebSocket\Client;
$client = new Client("ws://127.0.0.1:8081/");

$file = file_get_contents("tensu.png");
$client->send($file, "binary");
exit;

$arrays =
    array(
        array(
            "qid"=>"1",
            "kind"=>"question",
            "question"=>"結婚おめでとう!abc",
            "A1"=>"kaiou1",
            "A2"=>"kaiou2",
            "A3"=>"kaiou3",
            "A4"=>"kaiou4",
            'image'=>'',
        ),
        array(
            "qid"=>"2",
            "kind"=>"question",
            "question"=>"結婚おめでとう!abc2",
            "A1"=>"kaiou1",
            "A2"=>"kaiou2",
            "A3"=>"kaiou3",
            "A4"=>"kaiou4",
            'image'=>'',
        ),
        array(
            "qid"=>"3",
            "kind"=>"question",
            "question"=>"3",
            "A1"=>"kaiou1",
            "A2"=>"kaiou2",
            "A3"=>"kaiou3",
            "A4"=>"kaiou4",
            'image'=>'/tmp/googlelogo_color_272x92dp.png',
        ),
    );

send($arrays, 0);
exit;
function send($arrays, $id)
{
    $client = new Client("ws://127.0.0.1:8081/");
    $json = json_encode(array(
        "countdown"=>"countdown",
        "kind"=>"countdown",
    ));
    $client->send($json);
    sleep(3);
    $array = $arrays[$id];
    if ($array['question']) {
        $client->send(json_encode($array));
    }
    sleep(3);
    if ($array['image']) {
        $file = file_get_contents($array['image']);
        $client->send($file, "binary");
    }
}


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
//$client->send($json);

//URL
$json = json_encode(array(
    "url"=>"table.html",
    "kind"=>"url",
));
//$client->send($json);

//COUNTDOWN
$json = json_encode(array(
    "countdown"=>"countdown",
    "kind"=>"countdown",
));
//$client->send($json);

//BINARY
$dir = '/tmp/images/';
$files = glob(rtrim($dir, '/') . '/*.jpg');
for ($i=0 ; $i<100000 ; $i++) {
    foreach ($files as $file) {
        $file = file_get_contents($file);
        $client->send($file, "binary");
        sleep(3);
    }
}

/*
foreach (range(1,6) as $kazu) {
    $json = json_encode(array(
        "qid"=>"",
        "time"=>"12:20:16",
        "question"=>"q",
        "kind"=>'answer',
        "uid"=>$kazu,
        "selected"=>"A1",
    ));
    var_dump($json);
}

$client->send($json);
exit;
*/
