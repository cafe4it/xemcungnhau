Template.channel_edit.helpers({
    myChannel : function(){
       return Channels.findOne({userId : Meteor.userId()})
    }
});

AutoForm.hooks({
    updateChannelForm : {
        onSuccess : function(type, result){
            if(result){
                var def = '/channel/:userId',
                    params = {userId : Meteor.userId()},
                    path = FlowRouter.path(def,params);
                FlowRouter.go(path);
            }
        }
    }
})