/**
 * AnimeController
 *
 * @description :: Server-side logic for managing animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	detailAnime: function(req, res, next){
        Anime.findOne(req.param('id'), function foundAnime(err,anime){
            if(err) return next(err);
            if(!anime) return next('Anime doesn\'t exist.');
            res.view("user/detail-anime/", {
                status: 'OK',
                title: 'Detail Anime',
                anime: anime
            });
        });
    },
};

