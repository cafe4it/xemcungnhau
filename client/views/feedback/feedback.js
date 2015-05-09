Template.feedback_list.helpers({
    feedbacks : function(){
        return Feedbacks.find({},{order : {updatedAt : 1}})
    },
    Author : function(){
        return Meteor.users.findOne({_id : this.author})
    }
})