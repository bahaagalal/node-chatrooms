jQuery(document).ready(function(){
	var socket = io();

	socket.on('message', function(message){
		jQuery('#messages').append('<li>' + message + '</li>');
	});

	jQuery('form').on('submit', function(){
		socket.emit('message', jQuery('#message').val());
		jQuery('#message').val('');
		return false;
	});
});
