Template.channelOfFriends.helpers({
    channels : function(){
        return Channels.find()
    },
    userChannel : function(){
        return Meteor.users.find({_id : this.userId});
    }
})