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

Template.channelOfFriends.events({
    '#click btnGetFriends' : function(e,t){
        e.preventDefault();
        var fbUser = Session.get('fbUser');
        if(fbUser){
            FB.api('/me/friends', {fields: 'id,name,email,picture.width(120).height(120)'}, function(response){
                if( !response.error ) {
                    var fbUser = Session.get('fbUser') || {};
                    fbUser.friends = response.data;
                    Session.set('fbUser',fbUser);
                } else {
                    console.error('/me/friends', response);
                }
            });
        }
    }
})