Meteor.publish(null, function (){
    return Meteor.roles.find({})
})

/*Meteor.publish(null,function(){
    return Meteor.users.find();
})*/

Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
});

Meteor.publish("users_admin_list",function(){
    return Meteor.users.find();
})

Meteor.publish('channel_by_user',function(userId){
    return Channels.find({userId : userId});
});

Meteor.publishComposite('chat_by_channel',function(channelId){
    return {
        find : function(){
           return ChatMessages.find({channelId : channelId})
        },
        children : [
            {
                find : function(a){
                    return Meteor.users.find({_id : a.userId});
                }
            }
        ]
    }
});

Meteor.publishComposite('channels_by_users',function(users){
    return {
        find : function(){
            return Channels.find({fbUserId : {$in : users}})
        },
        children : [
            {
                find : function(c){
                    return Meteor.users.find({_id : c.userId})
                }
            }
        ]
    }
});

Meteor.publishComposite('list_users_join_channel',function(channelId){
    return {
        find : function(){
            return ListUsersJoinChannel.find({channelUserId : channelId});
        },
        children : [
            {
                find : function(l){
                    return Meteor.users.find({_id : l.userId})
                }
            }
        ]
    }
})