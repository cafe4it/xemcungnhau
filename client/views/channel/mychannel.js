Template.myChannel.rendered = function(){
    if(FlowRouter.subsReady('channel_by_user')){
        var channel = Channels.findOne({userId : Meteor.userId()})
        if(!channel) FlowRouter.go('/channel/create');
    }
}