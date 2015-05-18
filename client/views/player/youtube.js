Template.youtube_search.created = function(){
    SearchResultItems = new ReactiveVar({});
}

Template.youtube_search.helpers({
    resultTemplate : function(){
        if(_.size(SearchResultItems.get())<=0){
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
                SearchResultItems.set({});
                return;
            }
            var rs = {
                template : 'loading_search',
                data : {}
            }
            Session.set('resultTemplate', rs);
            Meteor.call('search_Youtube_V3',term,function(err,result){
                SearchResultItems.set(result);
                rs = {
                    template : 'youtube_search_has_result',
                    data : {
                        items : SearchResultItems.get()
                    }
                }
                Session.set('resultTemplate', rs);
            })
        }
    }
})