/**
 * Created by inakov on 26.04.15.
 */


function buildGraph(actions){
  //TODO: build graph from user interactions
  var nodes = [
    {id: 0, label: 'Node 1', userId: "434lj443lkjlk43hk4331"},
    {id: 1, label: 'Node 2', userId: "434ljlkjlk4343fek4342"},
    {id: 2, label: 'Node 3', userId: "434ljlkjlk4343fek4343"},
    {id: 3, label: 'Node 4', userId: "434ljlkjlk4343fek4344"},
    {id: 4, label: 'Node 5', userId: "434ljlkjlk4343fek4345"},
    {id: 5, label: 'Node 6', userId: "434ljlkjlk4343fek4346"}
  ];

  // create an array with edges
  var edges = [
    {from: 0, to: 1},
    {from: 4, to: 1},
    {from: 2, to: 1},

    {from: 3, to: 0},
    {from: 4, to: 0},

    {from: 4, to: 3},
    {from: 5, to: 0},

    {from: 4, to: 2}

  ];

  var graph = {
    nodes: nodes,
    edges: edges
  };

  return graph;
}

function katzCentrality(graph){
  var DEFAULT_ALPHA = 0.3;
  var DEFAULT_BETA = 0.8;

  var MAX_ITERATIONS = 100;
  var EPSILON = 1e-6;

  var size = graph.nodes.length;
  //arrays
  var centrality = {};
  var old = {};
  var tmp = {};

  var change;
  var sum2;
  var norm;
  var iteration;
  var alpha = DEFAULT_ALPHA;
  var beta = DEFAULT_BETA;

  // Initialization: 1/N

  for (var i = 0; i < size; i++) {
    centrality[i] = 1.0 / size;
    old[i] = centrality[i];
  }

  // Power iteration: O(k(n+m))
  // The value of norm converges to the dominant eigenvalue, and the vector 'centrality' to an associated eigenvector
  // ref. http://en.wikipedia.org/wiki/Power_iteration
  change = Number.MAX_VALUE;

  for (iteration = 0; (iteration < MAX_ITERATIONS) && (change > EPSILON); iteration++) {
    tmp = old;         // Swap old-centrality
    old = centrality;
    centrality = tmp;

    sum2 = 0;

    for (var v = 0; v < size; v++) {

      centrality[v] = 0.0;

      // Right eigenvector
      graph.edges.forEach(function(entry) {
        if(entry.to == v) {
          centrality[v] += old[entry.from];
        }
      });

      // Katz centrality
      centrality[v] = alpha * centrality[v] + beta / size;
      sum2 += centrality[v] * centrality[v];
    }

    // Normalization
    norm = Math.sqrt(sum2);
    change = 0;

    for (var v = 0; v < size; v++) {
      centrality[v] /= norm;

      if (Math.abs(centrality[v] - old[v]) > change)
        change = Math.abs(centrality[v] - old[v]);
    }
  }

  var normalisedCentrality = normalised(centrality);
  console.log(JSON.stringify(normalisedCentrality, null, 4));

  return normalisedCentrality;
}

function normalised(principalEigenvector) {
  var total = sum(principalEigenvector);
  var normalisedValues = {};

  _.each(principalEigenvector, function(value, key) {
    normalisedValues[key] = value / total;
  });

  return normalisedValues;
}

function sum(principalEigenvector) {
  var total = 0;
  _.each(principalEigenvector, function(value, key) {
      total += value;
  });

  return total;
}


module.exports = {
  buildGraph: buildGraph,
  katzCentrality: katzCentrality,
};
