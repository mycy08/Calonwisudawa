/**
 * AnimeController
 *
 * @description :: Server-side logic for managing animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    detailAnime :function(req,res,next){
        var idanime = req.param('id_anime');
        Anime.findOne({
            id_anime:idanime
        }).populate('episodes',{
            where :{
                id_anime:idanime
            }
        }).exec(function (err, anime){
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

