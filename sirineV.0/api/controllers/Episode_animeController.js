/**
 * Episode_animeController
 *
 * @description :: Server-side logic for managing episode_animes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        res.view('admin/addEpisode')
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

