/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function view(req, res) {
  User.findOne(req.param('userId')).populateAll().then(function(user) {
    if(req.session.partner){
      Partner.findOne(req.session.partner.id).populate('rewards').then(function(partner){
        var userIds = [];
        _.each(user.sentThanks, function(action) {
          userIds.push(action.agent);
          userIds.push(action.recipient);
        });

        User.find(userIds).then(function(users) {
          var userIndex = _.indexBy(users, 'id');

          return res.view('user', {
            user: user,
            partner: partner,
            userIndex: userIndex,
          })
        });
      });
    } else {
      var userIds = [];
      _.each(user.sentThanks, function(action) {
        userIds.push(action.agent);
        userIds.push(action.recipient);
      });
      _.each(user.recievedThanks, function(action) {
        userIds.push(action.agent);
        userIds.push(action.recipient);
      });

      User.find(userIds).then(function(users) {
        var userIndex = _.indexBy(users, 'id');
        console.log(userIndex);
        return res.view('user', {
          user: user,
          userIndex: userIndex,
        });
      });
    }
  });
};

module.exports = {
  view: view,
};

