Template.youtube_player.rendered = function () {
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
        if(player){
            videojs(videoId).ready(function () {
                var myPlayer = this;

                // EXAMPLE: Start playing the video.
                var currentTime = moment().diff(player.playedAt, 'seconds'),
                    playedAt = moment.duration(player.playedAt).asSeconds();

                if(currentTime < playedAt){
                    myPlayer.currentTime(currentTime)
                    myPlayer.play();
                }else{
                    //PlayerTemplate.set({template : 'empty-player', data : {}})
                    Session.set('PlayerTemplate',{template : 'empty-player', data : {}})
                    myPlayer.destroy();
                }


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
                    myPlayer.dispose();
                });
            });
        }
    })
}