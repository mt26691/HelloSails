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
        UserIndexPage.displayFlash(message);
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
    var obj = {
      user: message.data,
      _csrf: window.overlord.csrf || ''
    }
    $('tr:last').after(
      JST['/templates/addUser.ejs'](obj)
      );
  },
  destroyUser: function (message) {
    $('tr[data-id="' + message.id + '"]').remove();
  },
  displayFlash: function (message) {
    $('#chatAudio')[0].play();
    var msg = message.data.name + message.data.action;
    var alertdiv = "<div class='alert alert-success'>" + msg + "</div>";
    $('.navbar').after(alertdiv);
    $('.alert').fadeOut(5000);
  }
}