Template.youtube_player.rendered = function(){
    playReady();
}

var playReady = function(){
    $(document).ready(function(){
        var controller = Iron.controller(),
            channelId = controller.state.get('userId'),
            videoId = 'videoPlayer_' + channelId;
        console.log(videoId)
        videojs(videoId).ready(function(){
            var myPlayer = this;

            // EXAMPLE: Start playing the video.
            myPlayer.play();

        });
    })
}