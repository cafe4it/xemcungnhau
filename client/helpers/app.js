Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD/MM/YYYY H:m:s');
});

Template.registerHelper('formatDateChatLog', function(date) {
    return moment(date).format('HH:mm:ss');
});