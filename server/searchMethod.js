Meteor.methods({
    search_Youtube_V3 : function(term){
        if(term){
            var response = Async.runSync(function(done){
                YoutubeApi.search.list({
                    part: "snippet",
                    type: "video",
                    maxResults: 30,
                    regionCode : 'vn',
                    q: term
                }, function (err, data) {
                    if (err) throw new Meteor.Error(err);
                    done(null, data);
                });
            });

            if(response.result && response.result.pageInfo.totalResults > 0){
                var videoIds =_.pluck(_.pluck(response.result.items,'id'),'videoId');
                var url = _.template("https://www.youtube.com/watch?v=<%=id%>");
                var result = response.result;
                response = Async.runSync(function(done){
                    YoutubeApi.videos.list({
                        part : 'contentDetails',
                        type :'video',
                        id : videoIds
                    },function(err,data){
                        if(err) throw new Meteor.Error(err);
                        done(null, data)
                    });
                });

                var items = _.map(result.items, function(i){
                    var duration = _.findWhere(response.result.items,{id : i.id.videoId}).contentDetails.duration || 0;
                    duration = moment.utc(moment.duration(duration).asMilliseconds()).format("HH:mm:ss");
                    return {
                        _id : i.id.videoId,
                        kind : 'youtube',
                        url : url({id : i.id.videoId}),
                        title : i.snippet.title,
                        description : i.snippet.description,
                        thumbnails : i.snippet.thumbnails,
                        duration : duration
                    }
                });
                return items;
            }else{
                return 0;
            }
        }
    }
})