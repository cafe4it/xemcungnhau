Template.myChannel.rendered = function(){
    if(FlowRouter.subsReady('myChannel')){
        var userId = FlowRouter.getParam("userId"),
            channel = Channels.findOne({userId : userId});
        if(!channel) FlowRouter.go('/channel/create');
    }
}

var sendChat = function(){
    var msg = _.escape($('#txtMessage').val()),
        userId = Meteor.userId(),
        channelId = FlowRouter.getParam('userId');
    if(channelId && userId && msg){
        Meteor.call('sendChat',channelId,userId,msg,function(err,rs){
            console.log(err,rs);
            $('#txtMessage').val('');
        })
    }
}

Template.myChannel.helpers({
    channel : function(){
        if(FlowRouter.subsReady('myChannel')){
            var userId = FlowRouter.getParam("userId"),
                channel = Channels.findOne({userId : userId}),
                defEditChannel = '/channel/:userId/edit',
                params = {userId : userId},
                pathEditChannel = FlowRouter.path(defEditChannel,params);
            var isOwner = channel.userId == Meteor.userId();
            _.extend(channel, {pathEditChannel : pathEditChannel, isOwner : isOwner})
            return channel;
        }
    },
    chatLogs : function(){
        var channelId = FlowRouter.getParam("userId")
        return ChatMessages.find({channelId : channelId});
    },
    chatUser : function(){
        var user = Meteor.users.findOne({_id : this.senderId}),
            name = (user._id == Meteor.userId()) ? 'Tôi' : user.profile.name,
            channelId = FlowRouter.getParam("userId"),
            ownerClass = (user._id == channelId) ? 'channel-owner' : ''
        _.extend(user.profile,{name : name, ownerClass : ownerClass});
        return user;
    }
})

function sendInvite(to, message, callback) {
    var options = {
        method: 'apprequests'
    };
    if(to) options.to = to;
    if(message) options.message = message;
    FB.ui(options, function(response) {
        if(callback) callback(response);
    });
}

Template.myChannel.events({
    'keyup #txtMessage': function (e, t) {
        e.preventDefault();
        if (e.keyCode == 13) {
            sendChat();
        }
    },
    'click #inviteFriend' : function(e,t){
        e.preventDefault();
        sendInvite(null,'[Xem cùng nhau] rất thú vị, hãy xem cùng tôi nhé.', function(response) {
            console.log('sendChallenge',response);
        });
    }
})