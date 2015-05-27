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
        clearChat : function(channelId){
              if(channelId){
                  ChatMessages.remove({channelId : channelId});
                  return true;
              }
            return false;
        },
        userJoinChannel : function(channelId,userId){
            var result = false;
            if(channelId && userId){
                if(userId == channelId){
                    result = ListUsersJoinChannel.upsert({userId : userId},{
                        $set : {
                            channelUserId : channelId,
                            userId : userId,
                            isOwner : -1
                        }
                    })
                }else{
                    result = ListUsersJoinChannel.upsert({userId : userId},{
                        $set : {
                            channelUserId : channelId,
                            userId : userId,
                            isOwner : _.random(0,1000)
                        }
                    })
                }
            }
            return result;
        },
        userLeaveChannel : function(userId){
            var result = false;
            if(userId){
                result = ListUsersJoinChannel.remove({userId : userId})
            }
            return result;
        },
        updateSearchResult : function(channelId,term,items){
            if(channelId && term && items && _.size(items) > 0){
                _.each(items,function(item){
                    var thumbnails = JSON.stringify(item.thumbnails),
                        item = _.extend(item,{thumbnails : thumbnails});
                    SearchResuls.insert({
                        channelId : channelId,
                        term : term,
                        item : item
                    })
                })

                return true;
            }
        },
        clearSearchResult : function(channelId){
            if(channelId){
                SearchResuls.remove({channelId : channelId})
                return true;
            }
        },
        updatePlayer : function(channelId, item,isFromSearch){
            if(channelId && item){
                var isFromSearch = isFromSearch || true;
                PlayList.update({channelId: channelId},{
                    $set : {
                        'item.isPlay' : false
                    }
                })
                var itemId = item.itemId;
                if(isFromSearch){
                    PlayList.upsert({itemId : itemId,channelId :channelId},{
                        $set : {
                            channelId : channelId,
                            itemId : itemId,
                            item : item,
                            no : 0
                        }
                    });
                }

                Meteor.call('playPlayerFromPlaylist', channelId, item);

                return true;
            }
            return false;
        },
        playPlayerFromPlaylist : function(channelId, item){
            if(channelId && item){
                var playedNow = new Date;
                Players.upsert({channelId : channelId},{
                    $set : {
                        channelId : channelId,
                        playItem : item,
                        currentState : 'PLAYED',
                        playedAt : playedNow
                    },
                    $unset : {
                        pausedAt : "",
                        stoppedAt : ""
                    }
                })
            }
            return false;
        },
        controlPlayer : function(channelId,state){
            if(channelId && state){
                var now = new Date;
                switch(state){
                    case "played" :
                        Players.update({channelId : channelId},{
                            $set : {
                                playedAt : now,
                                currentState : 'PLAYED'
                            },
                            $unset :{
                                pausedAt : "",
                                stoppedAt : ""
                            }
                        })
                        break;
                    case "stopped" :
                        Players.update({channelId : channelId},{
                            $set : {
                                stoppedAt : now,
                                currentState : 'STOPPED'
                            },
                            $unset :{
                                pausedAt : "",
                                playedAt : ""
                            }
                        })
                        break;
                    case "paused" :
                        Players.update({channelId : channelId},{
                            $set : {
                                pausedAt : now,
                                currentState : 'PAUSED'
                            },
                            $unset :{
                                playedAt : "",
                                stoppedAt : ""
                            }
                        })
                        break;
                    default :
                        return false;
                        break;
                }
                return true;
            }
            return false;
        }
    });

    UserStatus.events.on("connectionLogout", function(fields) {
        Meteor.call('userLeaveChannel',fields.userId,function(err,rs){
            console.log('leave',rs)
        })
    })
}