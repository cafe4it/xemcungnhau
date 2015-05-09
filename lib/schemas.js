Schemas = {}

Feedbacks = new Meteor.Collection('feedbacks');

Schemas.Feedback = new SimpleSchema({
    title : {
        type : String,
        label : 'Tiêu đề'
    },
    description : {
        type : String,
        label : 'Nội dung',
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor', // optional
                settings: {
                    height: 150
                }
            }
        }
    },
    author : {
        type : String,
        autoValue : function(){
            return Meteor.userId()
        }
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date;
        }
    },
    isClosed : {
        type : Boolean,
        defaultValue : false
    },
    closedBy :{
        type : String,
        optional : true
    },
    closedAt : {
        type : Date,
        optional : true
    }
})

Feedbacks.attachSchema(Schemas.Feedback);
