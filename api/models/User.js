/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  //The avantages of 
  schema:true,
  connection: 'someMongodbServer',
  attributes: {
    name: { type: 'string', required: true },
    title: { type: 'string' },
    email: { type: 'email',required: true, unique:true },
    encrypted: { type: 'string' },
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  }
};

