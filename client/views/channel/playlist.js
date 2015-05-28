Template.playlist.helpers({
    items : function(){
        /*var playlist = PlayList.find({},{fields : {item : 1}}).fetch();
        playlist = _.map(playlist,function(p){
            var thumbnails = JSON.parse(p.item.thumbnails);
            return _.extend(p.item,{thumbnails : thumbnails})
        });
        return playlist;*/
        var controller = Iron.controller(),
            playlist = controller.state.get('playlist');
        return playlist;
    }
});

Template.playlist.events({
    'click button[id^="btnPlayNow_"]' : function(e,t){
        e.preventDefault();
        if(e.currentTarget){
            var videoId = $(jquerySelectorId({id: e.currentTarget.id})).attr('data-id');
            if(videoId){
                var player = PlayList.findOne({"item.itemId" : videoId}),
                    controller = Iron.controller(),
                    channelId = controller.state.get('userId');
                if(player && channelId == Meteor.userId()){
                    var item = player.item;
                    item = _.extend(item, {isPlay : true});
                    Meteor.call('updatePlayer', channelId, item, false);
                }
            }
        }
    },
    'click button[id^="btnRemoveItem_"]' : function(e,t){
        e.preventDefault();
        if(e.currentTarget){
            var videoId = $(jquerySelectorId({id: e.currentTarget.id})).attr('data-id');
            if(videoId){
                    var controller = Iron.controller(),
                    channelId = controller.state.get('userId'),
                    item = PlayList.findOne({itemId : videoId, channelId : channelId});
                if(item && channelId == Meteor.userId()){
                    Meteor.call('removeItemFromPlaylist', item.channelId, item.itemId);
                }
            }
        }
    }
})