/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function view(req, res) {
  Partner.findOne(req.param('partnerId')).populate('rewards').then(function(partner) {
    var fd = partner.photo.split('/');
    var filename = fd[fd.length - 1];

    partner.photo = filename;

    return res.view('partner', {
      partner: partner,
    });
  });
};

function apply(req, res) {
  UtilService.uploadFile(req.file('uploadFile')).then(function(file) {
    var fd = file.fd.split('/');
    var filename = fd[fd.length - 1];

    var partnerObj = {
      name: req.param('name'),
      email: req.param('email'),
      photo: filename,
      password: req.param('password'),
    };

    Partner.create(partnerObj).then(function(partner) {
      req.session.authenticated = true;
      req.session.partnerId = partner.id;
      req.session.partner = partner;

      return res.redirect('/partner/' + partner.id);
    });
  });
};

module.exports = {
  view: view,
  apply: apply,
};

