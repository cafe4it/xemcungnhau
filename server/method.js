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

                    Channels.upsert({userId : userId},{
                        $set : {
                            title : 'Kênh của' + fbUser.name,
                            description : '',
                            isPublic : false,
                            userId : userId,
                            fbUserId : fbUser.id
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
        sendChat : function(channelId, senderId, message){
            var result = false;
            if(channelId && senderId && message){
                ChatMessages.insert({
                    channelId : channelId,
                    senderId : senderId,
                    message : message
                })
                result = true;
            }
            return result;
        }
    })
}