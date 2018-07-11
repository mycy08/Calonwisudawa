/**
 * RekomendasiController
 *
 * @description :: Server-side logic for managing rekomendasis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add : function(req,res){
        res.view('admin/addRekomendasi',{
            layout:false
        })
    },

    rekomendasi:function(req,res){
        Rekomendasi.native(function(err, collection) {
            if (err) return res.serverError(err);
      
            collection.find({}, {
                id_anime:true,
                nama_anime: true,
                action : true,
                adventure :true,
                comedy :true,
                scifi :true,
                drama :true,
                space :true,
                supernatural : true,
                thriller : true,
                mystery : true,
                seinen : true,
                school : true,
                historical : true,
                echi	 : true,
                sliceoflife	 : true,
                harem	: true,
                pyschological	: true,
                superpower	: true,
                fantasy	: true,
                mecha	: true,
                sports	: true,
                romance	: true,
                shounen	: true,
                horor	: true,
                martialarts	: true,
                magic: true
            }).toArray(function (err, rekomendasi) {
              if (err) return res.serverError(err);
              var cluster = []
              var c1 =[]
              var c2 =[]
              var c3 =[]
              var jarak_terpendek=[]
              for(var i=0;i<3;i++){
                var rand = Math.floor(Math.random()*201);
                cluster.push(rekomendasi[rand])

              }
              
                  for(var j=0;j<rekomendasi.length;j++){
                    c1.push(Math.sqrt((rekomendasi[j].action-cluster[0].action)^2
                    +(rekomendasi[j].adventure-cluster[0].adventure)^2
                    +(rekomendasi[j].comedy-cluster[0].comedy)^2
                    +(rekomendasi[j].scifi-cluster[0].scifi)^2
                    +(rekomendasi[j].drama-cluster[0].drama)^2
                    +(rekomendasi[j].space-cluster[0].space)^2
                    +(rekomendasi[j].supernatural-cluster[0].supernatural)^2
                    +(rekomendasi[j].thriller-cluster[0].thriller)^2
                    +(rekomendasi[j].mystery-cluster[0].mystery)^2
                    +(rekomendasi[j].seinen-cluster[0].seinen)^2
                    +(rekomendasi[j].school-cluster[0].school)^2
                    +(rekomendasi[j].historical-cluster[0].historical)^2
                    +(rekomendasi[j].echi-cluster[0].echi)^2
                    +(rekomendasi[j].sliceoflife-cluster[0].sliceoflife)^2
                    +(rekomendasi[j].harem-cluster[0].harem)^2
                    +(rekomendasi[j].pyschological-cluster[0].pyschological)^2
                    +(rekomendasi[j].superpower-cluster[0].superpower)^2
                    +(rekomendasi[j].fantasy-cluster[0].fantasy)^2
                    +(rekomendasi[j].mecha-cluster[0].mecha)^2
                    +(rekomendasi[j].sports-cluster[0].sports)^2
                    +(rekomendasi[j].romance-cluster[0].romance)^2
                    +(rekomendasi[j].shounen-cluster[0].shounen)^2
                    +(rekomendasi[j].horor-cluster[0].horor)^2
                    +(rekomendasi[j].martialarts-cluster[0].martialarts)^2
                    +(rekomendasi[j].magic-cluster[0].magic)^2
                  )
                )
                // c2.push(Math.sqrt((
                //     rekomendasi[j].action-cluster[1].action)^2
                //     +(rekomendasi[j].adventure-cluster[1].adventure)^2
                //     +(rekomendasi[j].comedy-cluster[1].comedy)^2
                //     +(rekomendasi[j].scifi-cluster[1].scifi)^2
                //     +(rekomendasi[j].drama-cluster[1].drama)^2
                //     +(rekomendasi[j].space-cluster[1].space)^2
                //     +(rekomendasi[j].supernatural-cluster[1].supernatural)^2
                //     +(rekomendasi[j].thriller-cluster[1].thriller)^2
                //     +(rekomendasi[j].mystery-cluster[1].mystery)^2
                //     +(rekomendasi[j].seinen-cluster[1].seinen)^2
                //     +(rekomendasi[j].school-cluster[1].school)^2
                //     +(rekomendasi[j].historical-cluster[1].historical)^2
                //     +(rekomendasi[j].echi-cluster[1].echi)^2
                //     +(rekomendasi[j].sliceoflife-cluster[1].sliceoflife)^2
                //     +(rekomendasi[j].harem-cluster[1].harem)^2
                //     +(rekomendasi[j].pyschological-cluster[1].pyschological)^2
                //     +(rekomendasi[j].superpower-cluster[1].superpower)^2
                //     +(rekomendasi[j].fantasy-cluster[1].fantasy)^2
                //     +(rekomendasi[j].mecha-cluster[1].mecha)^2
                //     +(rekomendasi[j].sports-cluster[1].sports)^2
                //     +(rekomendasi[j].romance-cluster[1].romance)^2
                //     +(rekomendasi[j].shounen-cluster[1].shounen)^2
                //     +(rekomendasi[j].horor-cluster[1].horor)^2
                //     +(rekomendasi[j].martialarts-cluster[1].martialarts)^2
                //     +(rekomendasi[j].magic-cluster[1].magic)^2
                //   )
                // )
                // c3.push(Math.sqrt((
                //     rekomendasi[j].action-cluster[2].action)^2
                //     +(rekomendasi[j].adventure-cluster[2].adventure)^2
                //     +(rekomendasi[j].comedy-cluster[2].comedy)^2
                //     +(rekomendasi[j].scifi-cluster[2].scifi)^2
                //     +(rekomendasi[j].drama-cluster[2].drama)^2
                //     +(rekomendasi[j].space-cluster[2].space)^2
                //     +(rekomendasi[j].supernatural-cluster[2].supernatural)^2
                //     +(rekomendasi[j].thriller-cluster[2].thriller)^2
                //     +(rekomendasi[j].mystery-cluster[2].mystery)^2
                //     +(rekomendasi[j].seinen-cluster[2].seinen)^2
                //     +(rekomendasi[j].school-cluster[2].school)^2
                //     +(rekomendasi[j].historical-cluster[2].historical)^2
                //     +(rekomendasi[j].echi-cluster[2].echi)^2
                //     +(rekomendasi[j].sliceoflife-cluster[2].sliceoflife)^2
                //     +(rekomendasi[j].harem-cluster[2].harem)^2
                //     +(rekomendasi[j].pyschological-cluster[2].pyschological)^2
                //     +(rekomendasi[j].superpower-cluster[2].superpower)^2
                //     +(rekomendasi[j].fantasy-cluster[2].fantasy)^2
                //     +(rekomendasi[j].mecha-cluster[2].mecha)^2
                //     +(rekomendasi[j].sports-cluster[2].sports)^2
                //     +(rekomendasi[j].romance-cluster[2].romance)^2
                //     +(rekomendasi[j].shounen-cluster[2].shounen)^2
                //     +(rekomendasi[j].horor-cluster[2].horor)^2
                //     +(rekomendasi[j].martialarts-cluster[2].martialarts)^2
                //     +(rekomendasi[j].magic-cluster[2].magic)^2
                // ))
                // for(var k=0;k<rekomendasi.length;k++){
                //     jarak_terpendek.push(Math.min(
                //         c1,c2,c3
                //     ))
                // }
                      
              }
              console.log(c1)

            })
        })
    }

};

