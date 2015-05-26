Template.playlist.helpers({
    items : function(){
        var playlist = PlayList.find({},{fields : {item : 1}}).fetch();
        playlist = _.map(playlist,function(p){
            var thumbnails = JSON.parse(p.item.thumbnails);
            return _.extend(p.item,{thumbnails : thumbnails})
        });
        return playlist;
    }
})