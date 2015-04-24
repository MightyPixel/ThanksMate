/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function view(req, res) {
  Partner.findOne(req.param('partnerId')).populate('rewards').then(function(partner) {
    return res.view('partner', {
      partner: partner,
    });
  });
};

function apply(req, res) {
  var partnerObj = {
    name: req.param('name'),
    email: req.param('email'),
    password: req.param('password'),
  };

  Partner.create(partnerObj).then(function(partner) {
    req.session.authenticated = true;
    req.session.partnerId = partner.id;
    return res.redirect('/partner/' + partner.id);
  });
};

module.exports = {
  view: view,
  apply: apply,
};

