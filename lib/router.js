var testUser = {
    "picture": {
        "data": {
            "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/p50x50/10409749_972492632775191_330199456167910074_n.jpg?oh=8fc8f66dcc092d29f39b2ce0bc348feb&oe=55C7DA76&__gda__=1440199333_5867ab701891fd83a2c9656dd803e3df",
            "is_silhouette": false
        }
    },
    "id": "903512369673218",
    "email": "bigbomb10@yahoo.com.vn",
    "timezone": 7,
    "name": "Nguyễn Xuân Công"
}
FlowRouter.route('/', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [],

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

FlowRouter.route('/channel/:userId', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [],

    // define your subscriptions
    subscriptions: function(params, queryParams) {

    },

    // do some action for this route
    action: function(params, queryParams) {
        //Session.set('myChannel',Session.get('currentPath'));
        FlowLayout.render('defaultLayout', { main: "myChannel" });
    },

    name: "myChannel" // optional
});