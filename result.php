<?php
$seikai = array(
    '1'=>"A1",
    '2'=>"A4",
    '3'=>"A1",
    '4'=>"A1",
    '5'=>"A1",
    '6'=>"A1",
    '7'=>"A1",
    '8'=>"A1",
    '9'=>"A1",
    '10'=>"A1",
);

//force selecte the last answer
$result = file_get_contents('/tmp/result.txt');
$array = explode("\n", $result);
$previous = '';
foreach ($array as $value) {
    if ($value) {
        $decoded = json_decode($value, true);
        $decodeds[$decoded['uid']][$decoded['qid']] = $decoded;
        $kekka[$decoded['uid']] = 0;
        $previous = $value;
    }
}
foreach ($decodeds as $uid => $value) {
    foreach ($value as $qid => $decoded) {
        if ($seikai[$qid] == $decoded['selected']) {
            $kekka[$uid]++;
        }
    }
}
var_dump($kekka);
