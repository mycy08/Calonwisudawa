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
            res.send('true');
          }
        })
      }
    })
  }
}