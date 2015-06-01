Template.youtube_player.rendered = function(){
    playReady();
}

Players.find().observe({
    changed: function (newDocument, oldDocument) {
        var channelId = newDocument.channelId,
            videoId = 'videoPlayer_' + channelId,
            currentState = newDocument.currentState;

        videojs(videoId).ready(function () {
            var myPlayer = this;
            switch (currentState) {
                case 'PLAYED' :
                    myPlayer.src(newDocument.playItem.url);
                    myPlayer.play();
                    break;
                case 'PAUSED' :
                    myPlayer.paused()
                    break;
            }
        });
    },
    removed : function(id){
        if(id){

        }
    }
})

var playReady = function () {
    $(document).ready(function () {
        var controller = Iron.controller(),
            channelId = controller.state.get('userId'),
            player = controller.state.get('player'),
            videoId = 'videoPlayer_' + channelId;
        var ownerId = Meteor.userId();

        var reSyncPlayer = function(myPlayer,player){
            var playedTime = moment().diff(player.playedAt, 'seconds'),
                duration = moment.duration(player.playItem.duration).asSeconds();

            if(playedTime <= duration){
                myPlayer.currentTime(playedTime-2)
                myPlayer.play();
            }else{
                Meteor.call('removePlayer',channelId,function(rs){
                    location.reload();
                });
            }
        }
        if(player){
            try{
                videojs(videoId).ready(function () {

                    var myPlayer = this;

                    // EXAMPLE: Start playing the video.

                    reSyncPlayer(this,player);

                    myPlayer.on('waiting', function () {
                        myPlayer.poster('/images/loading.gif');
                        //console.log('đang tải..')
                    });

                    myPlayer.on('progress', function () {
                        myPlayer.poster('/images/loading.gif');
                        //console.log('đang tải..')
                    });

                    myPlayer.on('seeking', function () {
                        myPlayer.poster('/images/loading.gif');
                        //console.log('đang tải..')
                    });

                    myPlayer.on('ended', function() {
                        Session.set('PlayerTemplate',{template : 'empty-player', data : {}})
                        //myPlayer.dispose();
                    });

                    myPlayer.on('seeking', function() {
                        reSyncPlayer(this,player);
                        //myPlayer.dispose();
                    });
                    
                    myPlayer.on('pause', function() {
                        reSyncPlayer(this,player);
                        //myPlayer.dispose();
                    });
                });
            }catch(ex){
                if(ex){
                    location.reload();
                }
            }
        }
    })
}