/**
 * Anime_favorit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    owner_anime:{
      model:'anime',
      required:true
    },
    owner_user:{
      model:'user',
      required:true
    },
    animes:{
      type:"string"
    },
    users:{
      type:"string"
    },
    notifikasi:{
      type:'string'
    }
  },
  connection:'database'
};

