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
        if (isset($decoded['uid']) && $decoded['uid']) {
            if ($decoded['qid']) {
                $decodeds[$decoded['qid']][$decoded['uid']] = $decoded;
                $kekka[$decoded['uid']] = 0;
                $previous = $value;
            }
        }
    }
}

$user_count = count($kekka);

foreach ($decodeds as $qid => $value) {
    foreach ($value as $uid => $decoded) {
        $seikais = array();
        if ($seikai[$qid] == $decoded['selected']) {
            $kekka[$uid]++;
            $seikais[$decoded['now']] = $decoded;
        }
    }
    ksort($seikais);

    var_dump("Q$qid:" . $decoded["question"]);
    $seikai_count = count($seikais);
    if ($seikai_count ) {
        $amari = $user_count % $seikai_count;
        $wari = $user_count / $seikai_count;
        foreach ($seikais as $saisyu) {
            $point = $wari;
            if ($amari > 0) {
                $point = $wari + 1;
                $amari--;
            } else {
                $point = $wari;
            }
            $saisyu['point'] = $point;
            $saisyus[] = $saisyu;
        }
        var_dump($saisyus);
    } else {
        var_dump("no answer");
    }
}


var_dump($kekka);
