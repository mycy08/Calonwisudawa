/**
 * Rating.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_user:{
      model:'user',
      required:true
    },
    id_anime:{
      model:'anime',
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

