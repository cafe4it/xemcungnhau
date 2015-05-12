Template.channel_create.helpers({

});

AutoForm.hooks({
    insertChannelForm : {
        onSubmit : function(doc){
            if(doc){
                _.extend(doc,{userId : Meteor.userId()})
                console.log(doc);
                this.done();
                return true;
            }
        },
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