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
  var graphData = GraphEngingService.buildGraph(Action.find());
  GraphEngingService.katzCentrality(graphData);
  return res.ok({gData: graphData})
}
module.exports = {
  view: view,
  graphData: graphData,
};

