Meteor.publish(null, function (){
    return Meteor.roles.find({})
})

Meteor.publish("users_admin_list",function(){
    return Meteor.users.find();
})

Meteor.publish('channel_by_user',function(userId){
    return Channels.find({userId : userId});
})