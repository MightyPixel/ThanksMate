/*=============================================================
    Authour URL: www.designbootstrap.com

    http://www.designbootstrap.com/

    License: MIT

    http://opensource.org/licenses/MIT

    100% Free To use For Personal And Commercial Use.

    IN EXCHANGE JUST TELL PEOPLE ABOUT THIS WEBSITE

========================================================  */
$(document).ready(function () {

    /*====================================
          SUBSCRIPTION   SCRIPTS
    ======================================*/
  ;

  // create a network



  $.get("/graph/data", function(data, status){
    console.log(JSON.stringify(data));
    var container = document.getElementById('visualization');
    var graphData = data.gData;
    var networkString = graphData.edges.map(function(entry) {
      return entry.from + ' -> ' + entry.to;
    }).join(';');

    console.log(networkString);
    var katzView = "";
    $.each( data.katzCentrality, function( key, value ) {
      katzView = katzView + "<tr><td>Node " + key + "</td><td>Rank: " + value + "</td></tr>";
    });
    $('#katzCentrality').html(katzView);

    var data = {
      dot: 'dinetwork {node[shape=circle]; ' + networkString + '  }'
    };
    var options = {
      width: '900px',
      height: '500px'
    };
    var network = new vis.Network(container, data, options);
  });

   $("#postcontent").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "subscribe.php",
            data: $("#postcontent").serialize(),
             success: function (response) {
               $('[name="email"]').val('');
               // alert(response); // FOR ACTUAL RESPONSE
               alert('Thanks for  subscribing Us');
            }
        });
        e.preventDefault();
    });

    // SCROLL SCRIPTS
    $('.scroll-me a').bind('click', function (event) { //just pass scroll-me class and start scrolling
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuad');
        event.preventDefault();
    });

  // TAGS

    $('a.tag').click(function() {
      data = $(this).text() + ' ';
      $("#description").val($("#description").val() + data);
    });
});

var isStreaming = false,
    v = document.getElementById('v'),
    c = document.getElementById('c'),
    play = document.getElementById('play');
    con = c.getContext('2d');
    w = 600, 
    h = 420,
    greyscale = false;

v.addEventListener('canplay', function(e) {
   if (!isStreaming) {
      // videoWidth isn't always set correctly in all browsers
      if (v.videoWidth > 0) h = v.videoHeight / (v.videoWidth / w);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
      // Reverse the canvas image
      con.translate(w, 0);
      con.scale(-1, 1);
      isStreaming = true;
   }
}, false);

v.addEventListener('play', function() {
   // Every 33 milliseconds copy the video image to the canvas
   setInterval(function() {
      if (v.paused || v.ended) return;
      con.fillRect(0, 0, w, h);
      con.drawImage(v, 0, 0, w, h);
      goingGrey();
   }, 33);
}, false);

play.addEventListener('click', function() {
  var v = document.getElementById('v');
  navigator.getUserMedia = (navigator.getUserMedia || 
    navigator.webkitGetUserMedia || 
    navigator.mozGetUserMedia || 
    navigator.msGetUserMedia);
  if (navigator.getUserMedia) {
    // Request access to video only
    navigator.getUserMedia({
      video:true,
      audio:false
    },
    function(stream) {
      var url = window.URL || window.webkitURL;
      v.src = url ? url.createObjectURL(stream) : stream;
      v.play();
    },
    function(error) {
      alert('Something went wrong. (error code ' + error.code + ')');
        return;
    });
  } else {
    alert('Sorry, the browser you are using doesn\'t support getUserMedia');
    return;
  }
}, false);

var goingGrey = function() {
   var imageData = con.getImageData(0, 0, w, h);
   var data = imageData.data;
   for (var i = 0; i < data.length; i += 4) {
      var bright = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      data[i] = bright;
      data[i + 1] = bright;
      data[i + 2] = bright;
   }
   con.putImageData(imageData, 0, 0);
}
 
