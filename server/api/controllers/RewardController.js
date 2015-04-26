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
  UtilService.uploadFile(req.file('uploadFile')).then(function(file) {
    var fd = file.fd.split('/');
    var filename = fd[fd.length - 1];

    var rewardObj = {
      name: req.param('name'),
      description: req.param('description'),
      photo: filename,
      provider: req.session.partnerId,
    };

    Reward.create(rewardObj).then(function(reward) {
      return res.redirect('/reward/' + reward.id);
    });
  });
};

function consume(req, res) {
  Reward.findOne(req.param('rewardId')).populate('provider').then(function(reward) {
    User.findOne(req.param('userId')).then(function(user){
      if(user.karma >= reward.requiredKarma){
        user.karma = user.karma - reward.requiredKarma;
        User.update(user);
        return res.ok();
      }
      return res.badRequest();
    });
  });
};

module.exports = {
  view: view,
  create: create,
  consume: consume,
};

