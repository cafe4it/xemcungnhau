AutoForm.hooks({
    insertFeedbackForm : {
        onSuccess : function(type,result){
            if(result){
                var params = { id : result},
                    path = FlowRouter.path('feedback_detail',params);
                FlowRouter.go(path);
            }
        }
    }
})