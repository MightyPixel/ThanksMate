/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function home(req, res) {
  var name;

  if (req.session.authenticated) {
    name = req.session.username || req.session.partnerId; // TODO
  }

  Partner.find().then(function(partners) {
    res.view('homepage', {
      name: name,
      partners: partners,
    });
  });
};

module.exports = {
  home: home,
};

