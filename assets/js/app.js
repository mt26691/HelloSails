var socket = io.sails.connect();

socket.on('connect', function socketConnected() {

  console.log("This is from the connect: ");
  
  socket.on('message', function notificationReceivedFromServer(message) {
    console.log(message);
  });
  socket.on('updated', function notificationReceivedFromServer(message) {
    console.log(message);
  });
  socket.on('user', function notificationReceivedFromServer(message) {
    console.log(message);
  });
  socket.get('/user/subscribe');
});
