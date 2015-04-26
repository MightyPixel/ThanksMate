/**
 * ActionController
 *
 * @description :: Server-side logic for managing thanks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function view(req, res) {
  return res.view('graph');
};

function graphData(req, res){
  User.find().then(function(users){
    Action.find().then(function(actions){
      var graphData = GraphEngingService.buildGraph(actions, users);
      var katzCentrality = GraphEngingService.katzCentrality(graphData);
      return res.ok({gData: graphData, katzCentrality: katzCentrality})
    });
  });
}

function generateUser(){
  var users = [];
  for(var i=0; i < 5; i++){
    var userObj = {
      username: 'user'+i,
      password: 'user'+i,
      karma: 200,
    };
    users.push(userObj);
  }

  User.create(users).then();

}

function generateActions(){
  var actions =[
    {agent: "553cbe32b5758d4b25fc64c1", recipient:"553b524fb20676a213420ce1", description:"Action test description!"},
    {agent: "553cbe32b5758d4b25fc64c2", recipient:"553b524fb20676a213420ce1", description:"Action test description!"},

    {agent: "553b524fb20676a213420ce1", recipient:"553bb5882374bae63f37165b", description:"Action test description!"},
    {agent: "553cbe32b5758d4b25fc64c2", recipient:"553bb5882374bae63f37165b", description:"Action test description!"},
    {agent: "553cbe32b5758d4b25fc64c0", recipient:"553bb5882374bae63f37165b", description:"Action test description!"},

    {agent: "553cbe32b5758d4b25fc64c2", recipient:"553cbe32b5758d4b25fc64c1", description:"Action test description!"},
    {agent: "553cbe32b5758d4b25fc64c3", recipient:"553cbe32b5758d4b25fc64c1", description:"Action test description!"},

    {agent: "553cbe32b5758d4b25fc64c2", recipient:"553cbe32b5758d4b25fc64c0", description:"Action test description!"},

    {agent: "553cbe32b5758d4b25fc64c1", recipient:"553cbe32b5758d4b25fc64c4", description:"Action test description!"}

  ];
  Action.create({agent: "553cbe32b5758d4b25fc64c1", recipient:"553cbe32b5758d4b25fc64c4", description:"Action test description!"}).then();
}

module.exports = {
  view: view,
  graphData: graphData,
};

