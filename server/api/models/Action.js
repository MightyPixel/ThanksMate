/**
* Action.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    agent: {
      model: 'user'
    },
    recipient: {
      model: 'user'
    },
    description : {
      type: 'string'
    },
    category: {
      type: 'string', enum: ['LEARN', 'SMILE', 'SUPPORT'] // TODO: Add all cats
    },
    tags: {
      type: 'array'
    }

  }
};

