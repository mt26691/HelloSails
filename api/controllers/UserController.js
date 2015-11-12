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
    User.find(function(err,users){
      //this is a newly added comment
      if(err){
        res.send(err,500);
        console.log("err");
      }
    });
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },


  /**
   * `UserController.new()`
   */
  'new': function (req, res) {
    return res.view();
  },


  // /**
  //  * `UserController.create()`
  //  */
  // create: function (req, res) {
  //   return res.json({
  //     todo: 'create() is not implemented yet!'
  //   });
  // },


  /**
   * `UserController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },


  /**
   * `UserController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `UserController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `UserController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  }
};
