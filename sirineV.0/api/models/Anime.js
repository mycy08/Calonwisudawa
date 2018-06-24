/**
 * Anime.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
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
      via :'id_anime'
    },
    genre_lists:{
      collection:'genre_list',
      via:'id_anime'
    },
    
    ratings:{
      collection:'rating',
      via:'id_anime'
    }
  },
  connection:'database'
};

