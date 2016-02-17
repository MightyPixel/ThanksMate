/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function thanks(req, res) {
  if(req.method === 'GET') {
    return res.view('thanks');
  }

  // TODO: Save all fields

  var uploadFile = req.file('uploadFile');
  var category = req.param('category');
  var description = req.param('desc');

  sails.log(description);

  User.findOne({ username: req.session.user.username }).then(function(user) {
    var action = {
      file: uploadFile,
      category: category,
      description: description
    };

    sails.log('desc: ', action.description, description);
    UtilService.sayHello();

    UserActionService.registerAction(action, user).then(function(action) {
      req.flash('success', 'Your thank you was recieved!');
      return res.redirect('/user/' + action.recipient);
    });
  });
};

module.exports = {
  thanks: thanks,
};

