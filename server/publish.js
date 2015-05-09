Meteor.publish(null, function (){
    return Meteor.roles.find({})
})

Meteor.publish("users_admin_list",function(){
    return Meteor.users.find();
})
