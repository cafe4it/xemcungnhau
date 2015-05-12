var subs = new SubsManager();

Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.render('loading_user')
    } else {
        this.next();
    }
});

BaseController = RouteController.extend({
    layoutTemplate : 'defaultLayout',
    loadingTemplate: 'loading_data'
});

AdminBaseController = RouteController.extend({
    layoutTemplate : 'adminLayout',
    loadingTemplate: 'loading_data'
});

HomeController = BaseController.extend({
    template : 'home',
    path : '/',
    action : function(){

        this.render()
    },
    fastRender : true
});

myChannelController = BaseController.extend({
    template : 'myChannel',
    layoutTemplate : 'channelLayout',
    path : '/channel/:userId',
    waitOn : function(){
        var userId = this.params.userId;
        return [
            subs.subscribe('channel_by_user',userId),
            subs.subscribe('chat_by_channel',userId),
            Meteor.subscribe('list_users_join_channel',userId),
            Meteor.subscribe('userStatus')
        ]
    },
    channel : function(){
        return Channels.findOne({userId : this.params.userId});
    },
    onAfterAction : function(){
        var channel = this.channel();
        if(!channel) Router.go('/channel/create')
    },
    action : function(){
        this.state.set('userId', this.params.userId);
        this.render()
    },
    fastRender : true
});

ChannelOfFriend = BaseController.extend({
    path : '/channel-of-friends',
    template : 'channelOfFriends',
    waitOn : function(){
        var fbUser = Session.get('fbUser');
        if(fbUser){
            var friend_ids = _.map(fbUser.friends,function(f){ return f.id});
            return [
                Meteor.subscribe('channels_by_users',friend_ids),
                Meteor.subscribe('userStatus')
            ];
        }
    }
});

Meteor.startup(function(){
    Router.route('/',{
        name : 'home',
        controller : HomeController
    });

    Router.route('/channel/create',{
        name : 'channel_create',
        template : 'channel_create',
        layoutTemplate : 'defaultLayout',
        loadingTemplate : 'loading_data',
        fastRender : true
    });

    Router.route('/channel/:userId/edit',{
        name : 'channel_edit',
        path : '/channel/:userId/edit',
        template : 'channel_edit',
        layoutTemplate : 'defaultLayout',
        loadingTemplate : 'loading_data',
        waitOn : function(){
            return subs.subscribe('channel_by_user',this.params.userId)
        },
        fastRender : true
    });

    Router.route('/channel/:userId',{
        name : 'myChannel',
        controller : myChannelController
    });

    Router.route('/channel-of-friends',{
        name : 'channelOfFriends',
        controller : ChannelOfFriend
    })
})

/*FlowRouter.route('/', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [requiredLogin],

    // define your subscriptions
    subscriptions: function(params, queryParams) {

    },

    // do some action for this route
    action: function(params, queryParams) {
        if(!Session.get('fbUser')){
            var fbUser = {};
            fbUser.me = testUser;
            Session.set('fbUser',fbUser);
        }
        FlowLayout.render('defaultLayout', { main: "home" });
    },

    name: "home" // optional
});

FlowRouter.route('/channel/create', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [requiredLogin],

    // define your subscriptions
    subscriptions: function(params, queryParams) {
    },

    // do some action for this route
    action: function(params, queryParams) {
        //Session.set('myChannel',Session.get('currentPath'));
        FlowLayout.render('defaultLayout', { main: "channel_create" });
    },

    name: "channel_create" // optional
});

FlowRouter.route('/channel/:userId/edit', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [requiredLogin],

    // define your subscriptions
    subscriptions: function(params, queryParams) {
        this.register('editMyChannel', subs.subscribe('channel_by_user', params.userId));
    },

    // do some action for this route
    action: function(params, queryParams) {
        //Session.set('myChannel',Session.get('currentPath'));
        FlowLayout.render('defaultLayout', { main: "channel_edit" });
    },

    name: "channel_create" // optional
});

FlowRouter.route('/channel/:userId', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [requiredLogin],

    // define your subscriptions
    subscriptions: function(params, queryParams) {
        this.register('myChannel', subs.subscribe('channel_by_user', params.userId));
        this.register('chatLogs', subs.subscribe('chat_by_channel', params.userId));
    },

    // do some action for this route
    action: function(params, queryParams) {
        FlowLayout.render('channelLayout', { main: "myChannel" });
    },

    name: "myChannel" // optional
});

FlowRouter.route('/channel-of-friends',{
    middlewares: [requiredLogin],
    subscriptions: function(params, queryParams) {
        /!*this.register('myChannel', subs.subscribe('channel_by_user', params.userId));
        this.register('chatLogs', subs.subscribe('chat_by_channel', params.userId));*!/
    },
    action: function(params, queryParams) {
        /!*FlowLayout.render('channelLayout', { main: "myChannel" });*!/
    },

    name: "channelOfFriends" // optional
})

FlowRouter.route('/loading',{
    middlewares : [function(path,next){
        if(Meteor.userId()){
            next('/');
        }
        next()
    }],
    action : function(params,queryParams){
        FlowLayout.render('loading');
    }
})*/

/*
function requiredLogin(path, next) {
    if(!Meteor.userId()){
        var isLogout = Session.get('isLogout') || false;
        if(!isLogout){
            next('/loading')
        }else{
            next('/sign-out')
        }
    }
    next();
}*/
