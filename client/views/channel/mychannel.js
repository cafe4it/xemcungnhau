Template.myChannel.rendered = function(){
    if(FlowRouter.subsReady('channel_by_user')){

    }
}

Template.myChannel.helpers({
    channel : function(){
        var channel = Channels.findOne({userId : Meteor.userId()}),
            defEditChannel = '/channel/:userId/edit',
            params = {userId : Meteor.userId()},
            pathEditChannel = FlowRouter.path(defEditChannel,params);
        if(!channel) FlowRouter.go('/channel/create');
        _.extend(channel, {pathEditChannel : pathEditChannel})
        return channel;
    }
})