/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcryptjs = require('bcryptjs');
module.exports = {
  'new': function (req, res) {
    res.view();
  },
  'create': function (req, res) {
    if (!req.param("email") || !req.param("password")) {
      var error = [{ name: "userNamePasswordRequired", message: "you must enter username and password" }];
      req.session.flash = {
        err: error
      };
      req.redirect("/session/new");
      return;
    }
    User.findOne({ "email": req.param("email") }, function (err, user) {
      if (err) {
        return next(err);
      }
      console.log(user);
      if (!user) {
        var noUserFoundError = [{ name: "noUserFound", message: "Email address and password are not match" }];
        req.session.flash = {
          err: noUserFoundError
        };
        req.redirect("/session/new");
        return;
      }
      bcryptjs.compare(req.param("password"), user.encrypted, function (err, valid) {
        if (err) {
          return next(err);
        }
        if (!valid) {
          var invalid = [{ name: "invalidPassword", message: "Invalid Password" }];
          req.session.flash = {
            err: invalid
          };
          req.redirect("/session/new");
          return;
        }
        req.session.authenticated = true;
        req.session.User = user;

        user.online = true;
        user.save(function (err, user) {
          if (err) {
            return next(err);
          }
          User.publishUpdate(user.id, {
            loggedIn: true,
            id: user.id,
            name: user.name,
            action: " has logged in"
          });
          if (req.session.User.admin) {
            res.redirect("/user/");
            return;
          }
          res.redirect("/user/show/" + user.id);
        });
      });
    });
  },
  'destroy': function (req, res) {
    User.findOne(req.session.User.id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        user.online = false;
        user.save(function (err, user) {
          if (err) {
            return next(err);
          }
          User.publishUpdate(user.id, {
            loggedIn: false,
            id: user.id,
            name: user.name,
            action: " has logged out"
          });
          req.session.destroy();
          res.redirect("/session/new");
        });
      } else {
        req.session.destroy();
        res.redirect("/session/new");
      }
    });
  }
};

