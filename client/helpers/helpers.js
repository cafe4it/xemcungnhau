Template.registerHelper('isSubReady',function(name){
    if(name) return FlowRouter.subsReady(name);
    if(!name) return FlowRouter.subsReady();
})