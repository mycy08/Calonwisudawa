module.exports.sendWelcomeMail = function(obj) {
    sails.hooks.email.send(
    "welcomeEmail", 
    {
    Name: obj.nama
    },
    {
    to: obj.email,
    subject: "Aktifkan akun Sirine Anda !"
    },
    function(err) {console.log(err || "Mail Sent!");}
    )
   }