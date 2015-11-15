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
        minlength: 6       
      }
    },
    messages: {
      name: {
        required: "Chua nhap ten"
      }
    },
    success: function (element) {
    }
  });

});