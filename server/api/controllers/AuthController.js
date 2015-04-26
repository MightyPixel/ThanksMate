/**
 * AuthController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function login(req, res) {
  var userObj = {
    username: req.param('username'),
    password: req.param('password'),
  };

  User.findOne(userObj).then(function(user) {
    if (user) {
      req.session.authenticated = true;
      req.session.user = user;
      req.session.name = user.username; // TODO: Real name

      return res.redirect('/thanks');
    } else {
      return res.redirect('/login');
    }
  });
};

function partnerLogin(req, res) {
  var partnerObj = {
    email: req.param('email'),
    password: req.param('password'),
  };

  Partner.findOne(partnerObj).then(function(partner) {
    sails.log(partner);
    if (partner) {
      req.session.authenticated = true;
      req.session.partnerId = partner.id;
      req.session.partner = partner;
      req.session.name = partner.name;

      return res.redirect('/partner/' + partner.id);
    } else {
      return res.redirect('/partner-login');
    }
  });
};


function logout(req, res) {
  req.session.authenticated = false;
  req.session.username = null;
  req.session.partner = null;
  req.session.user = null;
  req.session.name = '';

  return res.redirect('/');
};

function register(req, res) {
  UtilService.uploadFile(req.file('uploadFile')).then(function(file) {
    var fd = file.fd.split('/');
    var filename = fd[fd.length - 1];

    var userObj = {
      username: req.param('username'),
      password: req.param('password'),
      photo: filename,
	  karma: 0,
    };

    User.create(userObj).then(function(user) {
      UserActionService.registerActor(file);

      req.session.authenticated = true;
      req.session.username = user.username;
      req.session.user = user;
      req.session.name = user.username;

      return res.redirect('/thanks');
    });
  });
};

module.exports = {
  login: login,
  partnerLogin: partnerLogin,
  logout: logout,
  register: register,
};
