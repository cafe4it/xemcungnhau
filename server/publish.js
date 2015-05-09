Meteor.publish(null, function (){
    return Meteor.roles.find({})
})

Meteor.publish("users_admin_list",function(){
    return Meteor.users.find();
})

Meteor.publishComposite('challenge_by_id',function(id){
    return {
        find : function(){
            return Challenges.find({_id: id})
        },
        children : [
            {
                find : function(challenge){
                    return Meteor.users.find({_id : challenge.author})
                }
            }
        ]
    }
})