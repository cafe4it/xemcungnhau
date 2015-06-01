Template.menu.events({
    'click #btnSignOut' : function(e,t){
        e.preventDefault();
        Meteor.logout(function(){
            Router.go('https://www.facebook.com')
        });
    }
})