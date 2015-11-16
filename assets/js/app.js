var socket = io.sails.connect();

socket.on('connect', function socketConnected() {

  socket.on('user', function notificationReceivedFromServer(message) {

    updateUserInDom(message.id, message);
  });

  socket.get('/user/subscribe');
});

function updateUserInDom(userId, message) {

  var page = document.location.pathname;
  page = page.replace(/(\/)$/, '');
  switch (page) {
    case '/user/':
    case '/user':
    case 'user':

      if (message.verb === 'updated') {
        UserIndexPage.updateOnlineOffline(userId, message);
      }
      else if (message.verb === 'created') {
        UserIndexPage.addUser(message);
      }
      else if (message.verb === 'destroyed') {
        UserIndexPage.destroyUser(message);
      }
      break;

    default:
      break;
  }
}
var UserIndexPage = {
  updateOnlineOffline: function (id, message) {
    var userRow = $('tr[data-id="' + id + '"] td img').first();
    if (message.data.loggedIn) {
      userRow.attr("src", "/images/online.png");
    } else {
      userRow.attr("src", "/images/offline.png");
    }
  },
  addUser: function (message) {
    debugger;
    var obj = {
      user: message.data,
      _csrf: window.overlord.csrf || ''
    }
    $('tr:last').after(
      JST['/templates/addUser.ejs'](obj)
      );
  },
  destroyUser: function (id) {
    $('tr[data-id="' + id + '"]').remove();
  }
}