Template.playlist.helpers({
    items : function(){
        var playlist = PlayList.find({},{fields : {item : 1}}).fetch();
        playlist = _.map(playlist,function(p){
            var thumbnails = JSON.parse(p.item.thumbnails);
            return _.extend(p.item,{thumbnails : thumbnails})
        });
        return playlist;
    }
});

Template.playlist.events({
    'click button[id^="btnPlayNow_"]' : function(e,t){
        e.preventDefault();

        if(e.currentTarget){
            var videoId = $(jquerySelectorId({id: e.currentTarget.id})).attr('data-id');

            if(videoId){
                var player = PlayList.findOne({"item.itemId" : videoId});
                if(player){
                    var item = player.item;
                    item = _.extend(item, {isPlay : true});
                    var controller = Iron.controller(),
                        channelId = controller.state.get('userId');
                    Meteor.call('updatePlayer', channelId, item, false);
                }
            }
        }
    }
})