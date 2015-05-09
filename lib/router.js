FlowRouter.route('/', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [],

    // define your subscriptions
    subscriptions: function(params, queryParams) {

    },

    // do some action for this route
    action: function(params, queryParams) {
        FlowLayout.render('defaultLayout', { main: "home" });
    },

    name: "home" // optional
});