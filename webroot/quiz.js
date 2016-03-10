function getAllUrlParameter()
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var allUrlParameters = {};
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        allUrlParameters[sParameterName[0]] = sParameterName[1];
    }
    return allUrlParameters;
}

// URL
URL = window.URL || window.webkitURL;

// document
var doc = document;
        
// WebSocketを開く
var socket = new WebSocket('ws://' + location.host);
socket.onopen = function(){
    console.log('Socket is now open.');
};
socket.onerror = function (error) {
    console.error('There was an un-identified Web Socket error');
};
socket.onmessage = function (message) {
    console.info("Message: %o", message.data);
};
socket.onclose = function(closeevent) {
    console.error(closeevent);
    console.info( 'Socket is now closed.' );
}
//socket.binaryType = "arraybuffer";
// messageイベント
socket.addEventListener('message', function(evt) {
    var data = evt.data;
    if (data.constructor === String) {
        console.log(data);
        var data = JSON.parse(data);
        console.log(data.kind);
        if (data.kind == "answer") {
            var targetUid = data.uid;
            console.log(data.uid);
            var selected = data.selected;
            console.log(selected);
            $('#kaitouzumi'+targetUid).attr('class', 'ato'+selected);
        } else if (data.kind == "question"){            
            // Stringの場合、pタグで追加
            var p = doc.createElement('p');
            p.textContent = data.question;
            if ($("#question").val() != data.question) {
                $('input[name=qa]').prop("disabled", false);
                $('#qasend').prop("disabled", false);
                $('input[name=qa]:checked').prop('checked', false);
                $('.kaitouzumi p').attr('class', 'mae');
            }
	        var oldElement = doc.getElementById('messages').lastChild;
	        console.log(oldElement);
            //doc.getElementById('messages').replaceChild(p, oldElement);
            doc.getElementById('messages').removeChild(oldElement);
            doc.getElementById('messages').innerHTML = "<p>" + data.question + "</p>";
            
            $("#label1").text(data.A1);
            $("#label2").text(data.A2);

	    if (data.A3) {
		$('.a3_box').show();
		$("#label3").text(data.A3);
	    } else {
		$('.a3_box').hide();
	    }

	    if (data.A4) {
		$('.a4_box').show();
		$("#label4").text(data.A4);
	    } else {
		$('.a4_box').hide();
	    }

            $("#question").val(data.question);
            $("#qid").val(data.qid);            
            console.log("js add text");
            $('.qas').css('background-image', "none");


            // del image
            var dummy_p = doc.createElement('p');
	        var oldElement = doc.getElementById('images').lastChild;
            doc.getElementById('images').replaceChild(dummy_p, oldElement);
        } else if (data.kind == 'countdown') {
            console.log("COUNTDOWN GIF START!");
            $('.qas').css('background-image', "url(countdown.gif?" + (new Date).getTime() + ")");
        } else if (data.kind == 'url') {
            console.log("URL REDIRECT!");
            location.href = data.url;
        } else {
            console.log("mondai json error");
        }
    } else if (data.constructor === Blob) {
        console.log("js add image");
        // Blobの場合、imgタグで追加
        var img = new Image();
        img.src = URL.createObjectURL(data);
	    var oldElement = doc.getElementById('images').lastChild;
        doc.getElementById('images').replaceChild(img, oldElement);
    } else {
        alert('nanigashi');
        console.log(data.constructor);
    }
}, false);

$(function() {
    /*
    $('#qasend').click(function() {
        if (!$('input[name=qa]:checked').val()) {
            alert('selct answer!');
        } else {
            var selected = $('input[name=qa]:checked').val()
            var lavel = "";
            var idVal = $("input[name='qa']:checked").attr("id");
            lavel = $("label[for='"+idVal+"']").text();
            var question = $("#question").val()
            var qid = $("#qid").val()            
            //$('input[name=qa]').prop("disabled", true);
            //$(this).prop("disabled", true);
            var params = getAllUrlParameter();
            var d = new Date(); // for now
            var datetext = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            var obj = {"uid":params.uid,"qid":qid,"time":datetext, "kind":"answer","lavel":lavel,"question":question,"selected":selected};
            console.log(obj);
	        socket.send(JSON.stringify(obj));
        }
    });
*/

    $('.qa').change(function() {
        if (!$('input[name=qa]:checked').val()) {
            alert('selct answer!');
        } else {
            var selected = $('input[name=qa]:checked').val()
            var lavel = "";
            var idVal = $("input[name='qa']:checked").attr("id");
            lavel = $("label[for='"+idVal+"']").text();
            var question = $("#question").val()
            var qid = $("#qid").val()            
            //$('input[name=qa]').prop("disabled", true);
            //$(this).prop("disabled", true);
            var params = getAllUrlParameter();
            var d = new Date(); // for now
            var datetext = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            var obj = {"uid":params.uid,"qid":qid,"time":datetext, "kind":"answer","lavel":lavel,"question":question,"selected":selected};
            console.log(obj);
	        socket.send(JSON.stringify(obj));
        }
    });
});
