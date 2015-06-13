SC.initialize({
  client_id: 'eb34b223d18072113fbb551e7f8a6bdb',
  // redirect_uri: 'http://external.codecademy.com/soundcloud.html'
});

$(document).ready(function() {
	$('a.connect').click(function(e) {
	    e.preventDefault();
	    SC.connect(function() {
	        SC.get('/me', function(me) {
	            $('#username').html;
	        });
	    });
	  });
	
    $('#startRecording a').click(function(e) {
        $('#startRecording').hide();
        $('#stopRecording').show();
        e.preventDefault();
        SC.record({
            progress: function(ms, avgPeak) {
            updateTimer(ms);
        }
    });
});

    $('#stopRecording a').click(function(e) {
          e.preventDefault();
          $('#stopRecording').hide();
          $('#playBack').show();
          $('#upload').show();
          SC.recordStop();
    });
    
    $('#playBack a').click(function() {
       updateTimer(0); 
       SC.recordPlay({
            progress: function(ms) {
                updateTimer(ms);
            }
       })
    });
	
    $('#comment_form').submit(function(e) {
        e.preventDefault();
        SC.connect(function() {
            SC.post('/tracks/70355723/comments', {
                comment: {
                    body: $('#comment_body').val(),
                    timestamp: window.sound.position
                }
            },
                function(comment) {
                    $('#status').val('Your comment was posted!');
                    $('#comment_body').val('');
            });
        });
    });
});

// Helper methods for our UI.

function updateTimer(ms) {
  // update the timer text. Used when we're recording
  $('.status').text(SC.Helper.millisecondsToHMS(ms));
}