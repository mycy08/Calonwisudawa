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
  

  userProfile:function(req,res,next){
    User.findOne(req.param('id'),function(err,userProfil){
      if(err){
        console.log(err);
      }
      else{
        return res.view('user/profile',{
          status: 'OK',
          title: 'Profil',
          userProfil: userProfil
        })
      }
    })
  },
  editProfile:function(req,res,next){
    User.findOne(req.param('id'),function(err,editProfile){
      if(err){
        console.log(err);
      }
      else{
        return res.view('user/edit-profile',{
          status: 'OK',
          title: 'Edit Profil',
          editProfile: editProfile
        })
      }
    })
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