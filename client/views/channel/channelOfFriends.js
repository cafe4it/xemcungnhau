Template.channelOfFriends.helpers({
    channels : function(){
        var fbUser = Session.get('fbUser');
        if(fbUser){
            var friend_ids = _.map(fbUser.friends,function(f){ return f.id});
            return Channels.find({fbUserId : {$in : friend_ids}});
        }
    },
    userChannel : function(){
        return Meteor.users.findOne({_id : this.userId});
    }
})