Meteor.users.find({ "status.online": true }).observe({
    added: function(id) {
        // id just came online
    },
    removed: function(id) {
        Meteor.call('userLeaveChannel',id,function(err,rs){
            console.log(err,rs)
        })
    }
});

Template.myChannel.created = function(){
    var controller = Iron.controller(),channelId = controller.state.get('userId')
    Meteor.call('userJoinChannel',channelId,Meteor.userId(),function(err,rs){
        console.log(err,rs)
    })
}

Template.myChannel.destroyed = function(){
    Meteor.call('userLeaveChannel',Meteor.userId(),function(err,rs){
        console.log(err,rs)
    })
}

Template.myChannel.rendered = function(){
    var controller = Iron.controller(),userId = controller.state.get('userId');
        channel = Channels.findOne({userId : userId});
    if(!channel) Router.go('/channel/create');
}

var sendChat = function(){
    var msg = _.escape($('#txtMessage').val()),
        userId = Meteor.userId(),
        controller = Iron.controller(),
        channelId = controller.state.get('userId');
    if(channelId && userId && msg){
        Meteor.call('sendChat',channelId,userId,msg,function(err,rs){
            console.log(err,rs);
            $('#txtMessage').val('');
        })
    }
}

Template.myChannel.helpers({
    channel : function(){
        var controller = Iron.controller(),
            userId = controller.state.get('userId'),
            channel = Channels.findOne({userId : userId}),
            defEditChannel = _.template('/channel/<%=userId%>/edit'),
            params = {userId : userId},
            pathEditChannel = defEditChannel(params);
        var isOwner = channel.userId == Meteor.userId();
        _.extend(channel, {pathEditChannel : pathEditChannel, isOwner : isOwner})
        return channel;
    },
    chatLogs : function(){
        var controller = Iron.controller(),
            channelId = controller.state.get('userId');
        return ChatMessages.find({channelId : channelId});
    },
    chatUser : function(){
        var user = Meteor.users.findOne({_id : this.senderId}),
            name = (user._id == Meteor.userId()) ? 'Tôi' : user.profile.name,
            controller = Iron.controller(),
            channelId = controller.state.get('userId'),
            ownerClass = (user._id == channelId) ? 'channel-owner' : ''
        _.extend(user.profile,{name : name, ownerClass : ownerClass});
        return user;
    },
    listUsersJoinChannel :function(){
        return ListUsersJoinChannel.find()
    },
    userJoin : function(){
        return Meteor.users.findOne({_id : this.userId});
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