Template.youtube_search.helpers({
    resultTemplate : function(){
        if(!Session.get('SearchResultItems')){
            Session.set('resultTemplate',{
                template : 'youtube_search_no_result',
                data : {}
            })
        }
        return Session.get('resultTemplate')
    }
})

Template.youtube_search.events({
    'keyup #txtSearchTerm' : function(e,t){
        e.preventDefault();
        if(e.keyCode == 13){
            var term = $('#txtSearchTerm').val(),
                rs = {};
            if(!term || _.isEmpty(term)){
                Session.set('resultTemplate',{
                    template : 'youtube_search_no_result',
                    data : {}
                })
                return;
            }
            var rs = {
                template : 'loading_search',
                data : {}
            }
            Session.set('resultTemplate', rs);
            Meteor.call('search_Youtube_V3',term,function(err,result){
                Session.set('SearchResultItems',result);
                rs = {
                    template : 'youtube_search_has_result',
                    data : {
                        items : Session.get('SearchResultItems')
                    }
                }
                Session.set('resultTemplate', rs);
            })
        }
    }
})