/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `UserController.index()`
   */
  index: function (req, res) {
    User.find(function (err, users) {
      //this is a newly added comment
      if (err) {
        return next(err);
      }
      if (!users) return next();
      res.view({ users: users });
    });
  },


  /**
   * `UserController.new()`
   */
  'new': function (req, res) {
    res.view();
  },


  /**
   * `UserController.create()`
   */
  create: function (req, res) {
	   User.create(req.params.all(), function userCreated(err, user) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        return res.redirect('/user/new');
      }
      res.redirect('/user/show/' + user.id);
	   });
  },


  /**
   * `UserController.show()`
   */
  show: function (req, res) {
    User.findOne(req.params["id"], function (err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view(
        {
          user: user
        }
        );
    });
  },


  /**
   * `UserController.edit()`
   */
  edit: function (req, res) {
    User.findOne(req.params["id"], function (err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({ user: user });
    });
  },


  /**
   * `UserController.update()`
   */
  update: function (req, res) {
    User.update(req.params["id"], req.params.all(), function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.params["id"]);
      }
      res.redirect('/user/show/' + req.params["id"]);
    });
  },


  /**
   * `UserController.destroy()`
   */
  destroy: function (req, res) {
    User.findOne(req.params["id"], function foundUser(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) return next("user does not exists");

      User.destroy(req.params["id"], function deleteUser(err) {
        if (err) {
          return next(err);
        }
        res.redirect("/user");

      });

    });
  }
};
