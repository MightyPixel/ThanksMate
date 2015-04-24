/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function view(req, res) {
  User.findOne(req.param('userId')).then(function(user) {
    return res.view('user', {
      user: user,
    });
  });
};

module.exports = {
  view: view,
};

