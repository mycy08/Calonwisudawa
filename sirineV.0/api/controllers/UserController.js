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
    User.findOneByEmail(req.param('email'),function(err,user){
      if(user){
        var emailAlready = [{
					name: 'Email sudah terdaftar',
					message: 'Email ' + req.param('email') + ' sudah terdaftar. gunakan email lain untuk mendaftar'
				}]
				req.session.flash = {
					err: emailAlready
        }
        res.redirect('/register');
        return
      }
      else{
        User.create(req.body).exec(function(err,user){
          if (err) {
            console.log(err);
            
            }
          else{
            var daftarSuccess = [{
              name: 'Email sudah berhasil didaftarkan',
              message: 'Email ' + req.param('email') + ' berhasil didaftar. Silahkan Login'
            }]
            req.session.flash = {
              err: daftarSuccess
            // If error redirect back to sign-up page
            }
            res.redirect('/login');
            return;
          }
            
        })
      }
    })
  }
}