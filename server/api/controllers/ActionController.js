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
  var description = req.param('description');

  sails.log(uploadFile, description, category);

  User.findOne({ username: req.session.username }).then(function(user) {
    var action = {
      file: uploadFile,
      category: category,
      description: description
    };

    UserActionService.registerAction(action, user).then(function(action) {
      req.flash('success', 'Your thank you was recieved!');
      return res.view('thanks');
    });
  });
};

module.exports = {
  thanks: thanks,
};

