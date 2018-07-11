/**
 * AnimeController
 *
 * @description :: Server-side logic for managing animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nestedPop = require('nested-pop')
module.exports = {
    editAni:function(req,res){
        res.view('admin/editAnime',{
            layout:false
        })
    },
    editAnime:function(req,res,next){
        var id = req.param('id_anime')
        Anime.update({id:id},{
            nama_anime:req.param('nama_anime'),
           
        }).exec(function(err,animeUpdated){
            if(err){
                if (err) return next(err)

            }
            res.json(animeUpdated)
        })
    },
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
         var hariTo = d.setDate(d.getDate() + 1)
         var hariFrom = d.setDate(d.getDate() - 3)
        var dateFrom = d.getFullYear() + "-" + 06 + "-" + 23
        var dateTo = d.getFullYear() + "-" + 06 + "-" + 25
            var perPage = 12
            if(!req.params.page){
                var page =1
            }
            else{
                var page = req.params.page
            }

            Episode_anime
                .find({})
                //.where({ createdAt: { '>=': dateFrom, '<=': dateTo } })
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .populateAll()
                .exec(function(err, episode) {
                    Genre.find().exec(function(err,genre){
                        Episode_anime.count().exec(function(err, count) {
                            if (err) return next(err)
                            res.view('user/anime-terbaru/', {
                                title : "Anime Terbaru",
                                episode: episode,
                                genre:genre,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
                    
                }); 
    },
    search: function (req, res, next) {
        Anime.find({ like: { nama_anime: '%' + req.param('search') + '%' } }).exec(function (err, search) {
            if (err) {
                return res.serverError(err);
            }
            else {
                Genre.find().exec(function(err,genre){
                    res.view("user/search/", {
                        status: 'OK',
                        title: 'Hasil Pencarian',
                        genre:genre,
                        search: search
                    })
                })
                
                
            }
        })
    },

    daftarAnime:function(req,res,next){
        var perPage = 10
            if(!req.params.page){
                var page =1
            }
            else{
                var page = req.params.page
            }
        
        Anime.find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err,anime){
            if(err){
                return res.serverError(err); 
            }
            else{
                Genre.find().exec(function(err,genre){
                    Anime.count().exec(function(err, count) {
                        if (err) return next(err)
                        res.view('user/daftar-anime/', {
                            title : "Daftar Anime",
                            anime: anime,
                            genre:genre,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    })
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
                }, function (err) { 

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
                                        createdAt : user.createdAt,
                                        updatedAt :user.updatedAt
                                        

                                    })
                                    callback()
                                }
                            })
                        }, function (err) { 
                            
                            if (err)
                                return res.serverError(err);
                            else {
                                if (err)
                                        return res.serverError(err);
                                    else {
                                        Genre.find().exec(function(err,genre){
                                            res.view("user/detail-anime/", {

                                                status: 'OK',
                                                title: 'Detail Anime',
                                                genre:genre,
                                                anime: anime
                                            })
                                        })
                                        
                                    }
                            }
                        })

                    }
                })

            }
        })
    }
}



