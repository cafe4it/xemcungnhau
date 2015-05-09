FlowRouter.route('/', {
    // an array of middlewares (we'll discuess about this later on)
    middlewares: [],

    // define your subscriptions
    subscriptions: function(params, queryParams) {

    },

    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params)
        console.log("Query Params:", queryParams)
    },

    name: "home" // optional
});