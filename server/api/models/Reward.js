/**
* Reward.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },
    photo: {
      type: 'string'
    },
    description: {
      type: 'text'
    },
    price: {
      type: 'float'
    },
    requiredKarma: {
      type: 'integer'
    },
    quantity: {
      type: 'integer'
    },
    provider: {
      model: 'partner'
    }

  }
};

