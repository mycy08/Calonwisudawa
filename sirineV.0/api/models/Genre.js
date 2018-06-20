/**
 * Genre.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_genre:{
      type:'string'
    },
    nama_genre:{
      type:'string'
    }
  },
  connection:'database'
};

