/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function view(req, res) {
  return res.view('graph');
};

function generateMockData(req, res) {
  generateUsers().then(function(users) {
    generateActions(users).then(function(actions) {
      return res.ok({ users: users, actions: actions });
    });
  });
};

function graphData(req, res){
  User.find({ active: true }).then(function(users){
    Action.find().then(function(actions){
      var graphData = GraphEngingService.buildGraph(actions, users);
      var katzCentrality = GraphEngingService.katzCentrality(graphData);
      return res.ok({gData: graphData, katzCentrality: katzCentrality})
    });
  });
}

function generateUsers(){
  return new Promise(function(resolve) {
    var users = [];
    for(var i=0; i < 6; i++){
      var userObj = {
        username: 'user'+i,
         password: 'user'+i,
         karma: 200,
      };
      users.push(userObj);
    }

    User.create(users).then(resolve);
  });
}

function generateActions(users){
  return new Promise(function(resolve) {
    var actions =[
      {agent: users[0].id, recipient: users[1].id, description: 'Thanks ' +  users[1].id},
      {agent: users[4].id, recipient: users[1].id, description: 'Thanks ' +  users[1].id},
      {agent: users[2].id, recipient: users[1].id, description: 'Thanks ' +  users[1].id},

      {agent: users[3].id, recipient: users[0].id, description: 'Thanks ' +  users[0].id},
      {agent: users[4].id, recipient: users[0].id, description: 'Thanks ' +  users[0].id},

      {agent: users[4].id, recipient: users[3].id, description: 'Thanks ' +  users[3].id},
      {agent: users[5].id, recipient: users[3].id, description: 'Thanks ' +  users[3].id},

      {agent: users[4].id, recipient: users[2].id, description: 'Thanks ' +  users[2].id},
    ];

    Action.create(actions).then(resolve);
  });
}

module.exports = {
  view: view,
  graphData: graphData,
  generateMockData: generateMockData,
};

