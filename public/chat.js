
$(function(){

	var socket = io.connect('http://localhost:3000')
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	socket.on("new_message", (data) => {
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		feedback.html('');
		message.val('');
		chatroom.append("<div class='message'><p>" + data.username + ": " + data.message + "<p class='datetime'>" + message.h + ":" + message.m + "</p></div>")
	})

	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	message.bind("keypress", () => {
		socket.emit('typing')
	})

	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " est en train d'écrire..." + "</i></p>")
	})
});


