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

