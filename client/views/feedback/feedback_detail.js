Template.feedback_detail.helpers({
    isSubReady : function(){
        return FlowRouter.subsReady("feedback_by_id")
    },
    feedback : function(){
        var feedbackId = FlowRouter.getParam("id");
        return Feedbacks.findOne(feedbackId)
    },
    author : function(){
        return Meteor.users.findOne(this.author)
    }
})