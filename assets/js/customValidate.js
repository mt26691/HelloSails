$(document).ready(function () {
  $('.form-signin').validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        minlength: 6,
        required: true
      },
      confirmation: {
        minlength: 6,
        equalTo: '#password'
      }
    },
    messages: {
      name: {
        required: "Chua nhap ten"
      }
    },
    success: function (element) {
      $('#summary').text("OK");
    }
  });

});