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
    }
})

var playReady = function () {
    $(document).ready(function () {
        var controller = Iron.controller(),
            channelId = controller.state.get('userId'),
            videoId = 'videoPlayer_' + channelId;
        var ownerId = Meteor.userId();
        if (ownerId !== channelId) return;
        videojs(videoId).ready(function () {
            var myPlayer = this;

            // EXAMPLE: Start playing the video.
            myPlayer.play();

        });
    })
}