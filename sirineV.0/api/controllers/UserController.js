/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt')
module.exports = {
  add:function(req,res){
    res.view('admin/addUser')
  },
  

  userProfile:function(req,res,next){
    User.findOne(req.param('id')).populateAll().exec(function(err,user){
      if (err){
        return res.serverError(err);
      } else {
          user.anfavStrings = []
          async.each(user.anime_favorits, function(anfav,callback){
              Anime.findOne({id:anfav.owner_anime}).exec(function(err,anfavs){
                if (err) {
                  callback(err)
                } else {
                  
                  user.anfavStrings.push({
                      id_fav:anfav.id,
                      id:anfavs.id,
                      nama_anime:anfavs.nama_anime,
                      photo_url :anfavs.photo_url,
                      deskripsi :anfavs.deskripsi
                    })
                  callback()
                }
              })
      }, function(err){ // function ini akan jalan bila semua genre_lists telah diproses
              
              if (err){
                return res.serverError(err);
              }
              else{
                Genre.find().exec(function(err,genre){
                  res.view("user/profile", {
                    genre:genre, 
                    status: 'OK',
                    title: 'Prorfil',
                    user: user
                })     
                })
                 
              }
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
        Genre.find().exec(function(err,genre){
          return res.view('user/edit-profile',{
            status: 'OK',
            title: 'Edit Profil',
            genre:genre,
            editProfile: editProfile
          })
        })
        
      }
    })
  },
  updateProfile:function(req,res,next){
    var userObj = {
      nama: req.param('nama'),
      tgl_lahir: req.param('tgl_lahir'),
      jenis_kelamin: req.param('jenis_kelamin'),
      email: req.param('email'),
      no_hp: req.param('no_hp')
    }
    
    
      User.update(req.param('id'),userObj,function(err){
      
        if(err){
          console.log(err);
        }
        else{
          var ubahSuccess = [
            'Biodata Sudah berhasil diubah',
          ]
          req.session.flash = {
            err: ubahSuccess
          // If error redirect back to sign-up page
          }
          res.redirect('/profile/' + req.param('id'));
        }
      })
    
  },
  updateProfilPassword:function(req,res,next){
    User.findOne(req.param('id'), function(err,pass){
      if(err){
        console.log(err)
      }
      else{
        bcrypt.compare(req.param('password_lama'), pass.password, function(err, valid) {
          if (err) return next(err);
  
          // If the password from the form doesn't match the password from the database...
          if (!valid) {
            var usernamePasswordMismatchError = [
              "Password Lama Anda salah"
            ]
            req.session.flash = {
              err: usernamePasswordMismatchError
            }
            res.redirect('/profile/' + req.param('id'));
            return;
          }
          else{
            var passbaru 
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.param('password_baru'), salt, function(err, hash) {
                if(err) {
                    console.log(err);     
                } else {
                  var passObj={
                      password : hash
                    }
                  User.update(req.param('id'),passObj,function(err){
    
                          if(err){
                            console.log(err);
                          }
                          else{
                            var ubahPass = [
                              'Password berhasil diubah',
                            ]
                            req.session.flash = {
                              err: ubahPass
                            // If error redirect back to sign-up page
                            }
                            res.redirect('/profile/' + req.param('id'));
                          }
                    })    
                }
              });
            });
            
          }
        })
      }
    })
  },
  uploadPhotoProfil: function(req, res) {
    req.file('photo_url') // this is the name of the file in your multipart form
    .upload({ dirname: '../../assets/images/user' }, function(err, uploads) {
      // try to always handle errors
      if (err) { return res.serverError(err) }
      // uploads is an array of files uploaded 
      // so remember to expect an array object
      if (uploads.length === 0) { return res.badRequest('No file was uploaded') }
      // if file was uploaded create a new registry
      // at this point the file is phisicaly available in the hard drive
      var id =User.id;
      var photo = User.photo;
      var fd = uploads[0].fd;
      var nameImage = fd.substring(124)
      
      User.update({id:req.param('id')}
                ,
                {photo_url: nameImage
              }).exec(function(err, file) {
                if (err) { return res.serverError(err) }
                // if it was successful return the registry in the response
                res.redirect('/profile/' + req.param('id'));
    })
    })
    
},
  
  
  
  create:function(req,res,next){
    User.findOneByEmail(req.param('email'),function(err,user){
      if(user){
        var emailAlready = [
          'Email sudah terdaftar. gunakan email lain untuk mendaftar'
				]
				req.session.flash = {
					err: emailAlready
        }
        res.redirect('/register');
        return
      }
      else{
        
        if(req.param('no_hp').length>12|| req.param('no_hp').length<11){
          var failedNohp = [
            'Nomor Hp yang Anda masukan salah'
          ]
          req.session.flash = {
            err: failedNohp
          }
          res.redirect('/register');
          return
        }
        else{
          User.findOne({no_hp:req.param('no_hp')}).exec(function(err,user){
            if(user){
              var nohpready = [
                'Nomor Hp sudah terdaftar. gunakan Nomor Hp lain untuk mendaftar'
              ]
              req.session.flash = {
                err: nohpready
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
                  var daftarSuccess = [
                    'Email sudah berhasil didaftar. Silahkan Login'
                  ]
                  req.session.flash = {
                    err: daftarSuccess
                  // If error redirect back to sign-up page
                  }
                  mailer.sendWelcomeMail(user)
                  res.redirect('/login');
                  return;
                }
                  
              })
            }
          })
          
        }
        
      }
    })
  }
}