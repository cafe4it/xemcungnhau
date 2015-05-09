Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD/MM/YYYY H:m:s');
});

Template.registerHelper('isActive',function(name){
    return (Router.current().name == name) ? 'active' : ''
})