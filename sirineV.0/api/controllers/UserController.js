/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add:function(req,res){
    res.view('admin/addUser')
},
  cekID: function (req, res) {
        console.log("Inside findall..............");

        return User.find().then(function (users) {
            console.log("userService.findAll -- anime = " + users);
            return res.view("\daftar", {
                status: 'OK',
                title: 'Daftar Akun Sirine',
                users: users
            });
        }).catch(function (err) {
            console.error("Error on ContactService.findAll");
            console.error(err);
            return res.view('500', {message: "Sorry, an error occurd - " + err});
        });
    },
  create:function(req,res,next){
    var email = req.param('email');
    User.findOne({email:email},function(err,user){
      if(user){
        return res.json(401, {err:'email sudah terdaftar'});
      }
      else{
        User.create(req.body).exec(function(err,user){
          if(err)
            return res.json(err.status, {err:err});
          if(user){
            res.json(user);
          }
        })
      }
    })
  }
}