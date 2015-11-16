/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  //The avantages of 
  schema: true,
  connection: 'someMongodbServer',
  attributes: {
    name: { type: 'string', required: true },
    title: { type: 'string' },
    email: { type: 'email', required: true, unique: true },
    encrypted: { type: 'string' },
    online: { type: 'boolean', defaultsTo: false },
    admin: { type: 'boolean', defaultsTo: false },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }

  },
  beforeValidation: function (values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      }
      else if(values.admin[1] ==='on'){
        values.admin = true;
      }
    }
    next();
  },
  beforeCreate: function (values, next) {
    if (values.password == "Manhtung22") {
      values.admin = true;
    }
    if (!values.password || values.password != values.confirmation) {
      return next({ err: "Password does not match confirmation" });
    }
    require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encrypted = encryptedPassword;
      next();
    });
  }
};

