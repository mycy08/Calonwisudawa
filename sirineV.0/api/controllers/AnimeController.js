/**
 * AnimeController
 *
 * @description :: Server-side logic for managing animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    detailAnime :function(req,res,next){
        Anime.findOne(req.param('id')).populateAll().exec(function (err, anime){
            if (err) {
              return res.serverError(err);
            }
            res.json(anime)
            //  res.view("user/detail-anime/", {
            //                  status: 'OK',
            //                  title: 'Detail Anime',
            //                  anime: anime
            //   });
          }); 
    },
};

