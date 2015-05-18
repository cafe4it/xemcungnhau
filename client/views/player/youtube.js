Template.youtube_search.helpers({
    resultTemplate : function(){
        var rs = Session.get('resultSearchTemplate');
        if(!rs){
            rs = {
                template : 'youtube_search_no_result',
                data : {}
            }
        }
        return rs;
    }
})

Template.youtube_search.events({
    'keyup #txtSearchTerm' : function(e,t){
        e.preventDefault();
        if(e.keyCode == 13){
            var term = $('#txtSearchTerm').val(),
                rs = {};
            if(!term || _.isEmpty(term)){
                rs = {
                    template : 'youtube_search_no_result',
                    data : {}
                }
                Session.set('resultSearchTemplate',rs);
                return;
            }
            rs = {
                template : 'loading_search',
                data : {}
            }
            Session.set('resultSearchTemplate',rs);
            Meteor.call('search_Youtube_V3',term,function(err,result){
                Session.set('resultItems',result);
                rs = {
                    template : 'youtube_search_has_result',
                    data : {
                        items : result
                    }
                }
                Session.set('resultSearchTemplate',rs);
            })
        }
    }
})