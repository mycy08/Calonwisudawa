/**
 * Anime.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_anime:{
      type:'string'
    },
    type:{
      type:'string',
      required:true
    },
    nama_anime:{
      type:'string',
      required:true
    },
    deskripsi:{
      type:'string'
    },
    tahun_terbit:{
      type:'string'
    },
    photo_url:{
      type:'string'
    },
    status:{
      type:'string'
    },

    episodes:{
      collection:'episode_anime',
      via :'owner'
    }
  },
  connection:'database'
};

