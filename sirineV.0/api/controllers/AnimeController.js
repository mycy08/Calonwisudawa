/**
 * AnimeController
 *
 * @description :: Server-side logic for managing animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    animeTerbaru: function (req, res, next) {
        var d = new Date()
        var month = new Array();
        month[0] = "01";
        month[1] = "02";
        month[2] = "03";
        month[3] = "04";
        month[4] = "05";
        month[5] = "06";
        month[6] = "07";
        month[7] = "08";
        month[8] = "09";
        month[9] = "10";
        month[10] = "11";
        month[11] = "12";


        var bulan = month[d.getMonth()];
        var hariTo = d.getDate() + 1
        var hariFrom = d.getDate() - 3
        var dateFrom = d.getFullYear() + "-" + bulan + "-" + 23
        var dateTo = d.getFullYear() + "-" + bulan + "-" + 25
        Episode_anime.find().where({ createdAt: { '>=': dateFrom, '<=': dateTo } }).populateAll().exec(function (err, episode) {
            if (err) return next(err);
            
        })

    },
    search: function (req, res, next) {
        Anime.find({ like: { nama_anime: '%' + req.param('search') + '%' } }).exec(function (err, search) {
            if (err) {
                return res.serverError(err);
            }
            else {
                res.view("user/search/", {
                    status: 'OK',
                    title: 'Detail Anime',
                    search: search
                })
            }
        })
    },

    detailAnime: function (req, res, next) {

        Anime.findOne(req.param('id')).populateAll().exec(function (err, anime) {
            if (err) {
                return res.serverError(err);
            } else {

                anime.genreStrings = []
                anime.userStrings = []
                async.each(anime.genre_lists, function (genre, callback) {
                    Genre.findOne({ id: genre.id_genre }).exec(function (err, genres) {
                        if (err) {
                            callback(err)
                        } else {

                            anime.genreStrings.push({
                                id: genres.id,
                                nama_genre: genres.nama_genre
                            })
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
                                        id: users.id,
                                        nama: users.nama,
                                        photo_url: users.photo_url, users,
                                        review: user.review,
                                        score: user.score,

                                    })
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
                                                id: users.id,
                                                nama: users.nama,
                                                photo_url: users.photo_url, users,
                                                review: user.review,
                                                score: user.score,

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
        })
    }
}



