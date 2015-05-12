Template.channel_create.helpers({

});

AutoForm.hooks({
    insertChannelForm : {
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