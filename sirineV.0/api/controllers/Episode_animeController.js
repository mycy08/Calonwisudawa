/**
 * Episode_animeController
 *
 * @description :: Server-side logic for managing episode_animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request')
var cheerio = require('cheerio')

    fs = require('fs'),
    urls =[],
    urls1 =[];
module.exports = {
	add:function(req,res){
        res.view('admin/addEpisode',{
            layout:false
        })
        
    },
    updateEpisode:function(req,res){
        
            Anime.native(function(err, collection) {
              if (err) return res.serverError(err);
        
              collection.find({status:"OnGoing"}, {
                nama_anime: true,
                url_anime_english:true
              }).toArray(function (err, results) {
                if (err) return res.serverError(err);
                for(var i=0;i<results.length;i++){
                    
                    
                    request(results[i].url_anime_english,function(err,res,body){
                        if(!err && res.statusCode == 200){
                            var $ = cheerio.load(body);
                            $('a','.infoepbox').each(function(){
                                var select = $(this);
                                var url =select.attr('href');
                                urls.push("http://animeheaven.eu/"+url);
                            });
                            fs.writeFile('url.txt', urls, function (err) {
                                                if (err) 
                                                    return console.log(err);
                                                console.log('sukses');
                                            });
                            
                        // console.log(urls);
                        };
                    });
                }
                console.log('->',results[1].nama_anime);
                return res.ok(results);
              });
            });
          
    },

    coba:function(req,res,next){
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
    var hariTo = d.getDate()+1
    var hariFrom = d.getDate()-3
        var dateFrom = d.getFullYear()+"-"+bulan+"-"+23
        var dateTo = d.getFullYear()+"-"+bulan+"-"+25
        Episode_anime.find({createdAt: { '>=': dateFrom, '<=': dateTo }}).populateAll().exec(function(err,coba){
                
                res.json(coba)
            })
    },
    findall: function (req, res) {
        console.log("Inside findall..............");

        return Episode_anime.find().then(function (episode_anime) {
            console.log("animeService.findAll -- anime = " + episode_anime);
            return res.view("admin/listEpisode", {
                status: 'OK',
                title: 'List of anime',
                episode_anime: episode_anime
            });
        }).catch(function (err) {
            console.error("Error on ContactService.findAll");
            console.error(err);
            return res.view('500', {message: "Sorry, an error occurd - " + err});
        });
    },
    delete:function(req,res){
        Episode_anime.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500,{error:'Database error'})
            }
            res.redirect('/episode_anime')
        })
    }
};

