/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function view(req, res) {
  Reward.findOne(req.param('rewardId')).populate('provider').then(function(reward) {
    return res.view('reward', {
      reward: reward,
    });
  });
};

function create(req, res) {
  sails.log('partnerID');
  sails.log(req.session.partnerId);
  var rewardObj = {
    name: req.param('name'),
    description: req.param('description'),
    provider: req.session.partnerId,
  };

  Reward.create(rewardObj).then(function(reward) {
    return res.redirect('/reward/' + reward.id);
  });
};

module.exports = {
  view: view,
  create: create,
};

