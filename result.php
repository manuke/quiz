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
    
$result = file_get_contents('result.txt');
$array = explode("\n", $result);
$previous = '';
foreach ($array as $value) {
    if ($value && $value != $previous) {
        $decoded = json_decode($value, true);
        $decodeds[] = $decoded;
        $kekka[$decoded['uid']] = 0;
    }
    $previous = $value;
}

foreach ($decodeds as $value) {
    if ($seikai[$value['qid']] == $value['selected']) {
        $kekka[$value['uid']]++;
    }
}
var_dump($kekka);
