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

                    var channelId = Channels.upsert({userId : userId},{
                        $set : {
                            title : 'Kênh của ' + fbUser.name,
                            isPublic : false,
                            userId : userId,
                            fbUserId : fbUser.id
                        }
                    });

                    console.log(channelId);

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
        },
        userJoinChannel : function(channelId,userId){
            var result = false;
            if(channelId && userId){
                if(userId == Meteor.userId()){
                    result = ListUsersJoinChannel.upsert({userId : userId},{
                        $set : {
                            channelUserId : channelId,
                            userId : userId,
                            isOwner : -1
                        }
                    })
                }
            }else{
                result = ListUsersJoinChannel.upsert({userId : userId},{
                    $set : {
                        channelUserId : channelId,
                        userId : userId,
                        isOwner : {$inc : 1}
                    }
                })
            }
            return result;
        },
        userLeaveChannel : function(userId){
            var result = false;
            if(userId){
                result = ListUsersJoinChannel.remove({userId : userId})
            }
            return result;
        }
    });

    UserStatus.events.on("connectionLogout", function(fields) {
        Meteor.call('userLeaveChannel',fields.userId,function(err,rs){
            console.log(err,rs)
        })
    })
}