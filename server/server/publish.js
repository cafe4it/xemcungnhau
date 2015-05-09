Meteor.publish(null, function (){
    return Meteor.roles.find({})
});

Meteor.publish(null, function (){
    return Meteor.users.find({},{field : {profile : 1}})
});

Meteor.publish("users_admin_list",function(){
    return Meteor.users.find();
});

Meteor.publishComposite('feedbacks_list',{
    find : function(){
        return Feedbacks.find()
    },
    children : [
        {
            find : function(feedback){
                return Meteor.users.find({_id : feedback.author})
            }
        }
    ]
});

Meteor.publishComposite('feedback_by_id',function(fId){
    return {
        find : function(){
            return Feedbacks.find({_id : fId})
        },
        children : [
            {
                find : function(feedback){
                    return Meteor.users.find({_id : feedback.author})
                }
            }
        ]
    }
});