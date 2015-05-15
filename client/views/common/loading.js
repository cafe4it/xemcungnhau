Template.loading_user.created = function(){
    var self = this;
    var num = 60;
    Session.set('showRefreshButton',false);
    this.remaining = new ReactiveVar(num);
    this.interval = Meteor.setInterval(function(){
        var remaining = self.remaining.get();
        self.remaining.set(--remaining);
        if (remaining === 0){
            Meteor.clearInterval(self.interval);
            Session.set('showRefreshButton',true);
        }
    }, 1000);
}

Template.loading_user.helpers({
    ifInternetDown : function(){
        return Session.get('showRefreshButton')
    }
})

Template.loading_user.events({
    'click #btnRefreshPage' : function(e,t){
        e.preventDefault();
        location.reload();
    }
})