/**
 * Rating.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_user:{
      type:'string',
      required:true
    },
    id_anime:{
      type:'string',
      required:'string'
    },
    score:{
      type:'string'
    },
    review:{
      type:'string'
    }
  },
  connection:'database',
};

