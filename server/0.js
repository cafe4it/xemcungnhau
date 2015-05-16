if(Meteor.isServer){
    Meteor.startup(function(){
        YoutubeApi.authenticate({
            type: 'key',
            key: 'AIzaSyBwgOnx4EmH0gHF2x_oH3gNn10lyu4ENPE'
        });
    })
}