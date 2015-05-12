Template.channel_edit.helpers({
    myChannel : function(){
       return Channels.findOne({userId : Meteor.userId()})
    }
});

AutoForm.hooks({
    updateChannelForm : {
        onSuccess : function(type, result){
            if(result){
                var def = _.template('/channel/<%=userId%>'),
                    params = {userId : Meteor.userId()},
                    path = def(params);
                Router.go(path);
            }
        }
    }
})