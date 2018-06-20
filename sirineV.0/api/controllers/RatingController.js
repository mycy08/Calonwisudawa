/**
 * RatingController
 *
 * @description :: Server-side logic for managing ratings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        res.view('admin/addRating')
    },
    findall: function (req, res) {
        console.log("Inside findall..............");

        return Rating.find().then(function (rating) {
            console.log("animeService.findAll -- anime = " + rating);
            return res.view("admin/listEpisode", {
                status: 'OK',
                title: 'List of anime',
                rating: rating
            });
        }).catch(function (err) {
            console.error("Error on ContactService.findAll");
            console.error(err);
            return res.view('500', {message: "Sorry, an error occurd - " + err});
        });
    },
};

