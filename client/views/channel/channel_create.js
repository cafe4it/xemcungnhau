Template.channel_create.helpers({

});

AutoForm.hooks({
    insertChannelForm : {
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