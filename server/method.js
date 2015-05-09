if(Meteor.isServer){
    Meteor.methods({
        createUserFacebook : function(fbUser){
            if(fbUser){
                var exists = !!Meteor.users.findOne({profile : {id : fbUser.id}});
                //console.log('fbUser, exists',fbUser,exists)
                if(!exists){
                    var adminEmails = ['bigbomb10@yahoo.com.vn','sunrisevietnam.hn@gmail.com']
                    var facebookRoles = ['facebook','user']
                    var userId = Accounts.createUser({
                        email : fbUser.email,
                        password : fbUser.id,
                        profile : fbUser
                    });

                    Meteor.users.update({_id : userId},{
                        $set :{
                            'emails.0.verified': true
                        }
                    });

                    if(adminEmails.indexOf(fbUser.email) >=0){
                        facebookRoles = ['admin','facebook','user']
                    }

                    Roles.addUsersToRoles(userId, facebookRoles);

                    return true;
                }
            }
            return false;
        },
        insertSurveyResponse : function(response){
            if(response){
                Responses.insert({
                    userId : response.userId,
                    surveyId : response.surveyId,
                    lottoCode : response.lottoCode
                });

                Surveys.update({_id : response.surveyId},{
                    $inc : {registered : 1}
                });

                return true;
            }
            return false;
        }
    })
}