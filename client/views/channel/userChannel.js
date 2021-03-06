Template.userChannel.created = function(){
    Session.set('PlayerTemplate',{})
}

Template.userChannel.destroyed = function(){
    Meteor.call('userLeaveChannel',Meteor.userId(),function(err,rs){
        console.log('leave',rs)
    })
}

Template.userChannel.rendered = function(){
    var controller = Iron.controller(),channelId = controller.state.get('userId')
    Meteor.call('userJoinChannel',channelId,Meteor.userId(),function(err,rs){
        console.log('join',rs)
    })

    ChatMessages.find({}).observe({
        added : function(doc){
            var chatIdTemplate = _.template('chat_<%=id%>'),
                chatLog = document.getElementById((chatIdTemplate({id : doc.channelId}))),
                hasScroll = chatLog.scrollHeight > 347;

            if(hasScroll){
                chatLog.scrollTop = chatLog.scrollHeight;
            }
        }
    })
}

Template.userChannel.helpers({
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
        return ChatMessages.find({channelId : channelId},{sort : {updatedAt : 1}});
    },
    chatUser : function(){
        if(this.senderId){
            var user = Meteor.users.findOne({_id : this.senderId}),
                name = (user._id == Meteor.userId()) ? 'Tôi' : user.profile.name,
                controller = Iron.controller(),
                channelId = controller.state.get('userId'),
                ownerClass = (user._id == channelId) ? 'channel-owner' : ''
            _.extend(user.profile,{name : name, ownerClass : ownerClass});
            return user;
        }
    },
    listUsersJoinChannel :function(){
        return ListUsersJoinChannel.find({},{sort :{isOwner : 1}})
    },
    userJoin : function(){
        var user = Meteor.users.findOne({_id : this.userId}),
            controller = Iron.controller(),
            userId = controller.state.get('userId'),
            isOwner = (userId == user._id);
        _.extend(user,{isOwner : isOwner})
        return user;
    },
    playerTemplate : function(){
        var controller = Iron.controller(),
            channelId = controller.state.get('userId'),
            player = Players.findOne({channelId : channelId}),
            dynamicTemplate = {};
        if(!player){
            _.extend(dynamicTemplate, {template : 'empty-player', data : {}})
        }else{
            _.extend(dynamicTemplate, {template : 'youtube_player', data : {player : player}})
        }
        Session.set('PlayerTemplate',dynamicTemplate)

        return Session.get('PlayerTemplate');
    }
})

Template.userChannel.events({
    'keyup #txtMessage': function (e, t) {
        e.preventDefault();
        if (e.keyCode == 13) {
            sendChat();
        }
    },
    'click #inviteFriend' : function(e,t){
        e.preventDefault();
        var controller = Iron.controller(),
            channelId = controller.state.get('userId');
        ShareDialog_Href(channelId);
    }
})