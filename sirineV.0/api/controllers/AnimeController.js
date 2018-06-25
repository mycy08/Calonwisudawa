/**
 * AnimeController
 *
 * @description :: Server-side logic for managing animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    detailAnime: function (req, res, next) {
       
        Anime.findOne(req.param('id')).populateAll().exec(function (err, anime) {
            if (err) {
                return res.serverError(err);
            } else {
                
                anime.genreStrings = []
                anime.userStrings =[]
                async.each(anime.genre_lists, function (genre, callback) {
                    Genre.findOne({ id: genre.id_genre }).exec(function (err, genres) {
                        if (err) {
                            callback(err)
                        } else {
                            
                            anime.genreStrings.push({
                                id:genres.id,
                                nama_genre:genres.nama_genre})
                            callback()
                        }
                    })
                }, function (err) { // function ini akan jalan bila semua genre_lists telah diproses
                
                    if (err)
                        return res.serverError(err);
                    else { 
                        async.each(anime.ratings, function (user, callback) {
                            
                            User.findOne({ id: user.id_user }).exec(function (err, users) {
                                if (err) {
                                    callback(err)
                                } else {
                                        anime.userStrings.push({
                                        id:users.id,
                                        nama:users.nama,
                                        photo_url:users.photo_url,users,
                                        review:users.review,
                                        score:user.score,
                                        
                                    })
                                    callback()
                                }
                            })
                        }, function (err) { // function ini akan jalan bila semua genre_lists telah diproses
                           
                            if (err)
                                return res.serverError(err);
                            else {         
                                res.view("user/detail-anime/", {
                                    status: 'OK',
                                    title: 'Detail Anime',
                                    anime: anime
                                })
                            }
                        })        
                        
                    }
                })

            }
        })
    }
}



