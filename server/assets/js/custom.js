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
