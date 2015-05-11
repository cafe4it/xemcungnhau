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

Channels = new Meteor.Collection('channels');

Schemas.Channel = new SimpleSchema({
    title : {
        type : String,
        label : 'Tên kênh'
    },
    description : {
        type : String,
        label : 'Miêu tả',
        optional : true
    },
    isPublic : {
        type : Boolean,
        label : 'Là kênh công cộng?',
        defaultValue : false
    },
    userId : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    modId : {
        type : String,
        optional : true
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date;
        }
    }
})

Channels.attachSchema(Schemas.Channel);

Players = new Meteor.Collection('players');

Schemas.PlayerItem = new SimpleSchema({
    title : {
        type : String
    },
    description : {
        type : String,
        optional : true
    },
    src : {
        type : String
    },
    isPlay : {
        type : String
    }
})

Schemas.Player = new SimpleSchema({
    userId : {
        type : String,
        autoValue : function(){
            return Meteor.userId()
        }
    }
});

ChatMessages = new Meteor.Collection('chatMessages');

Schemas.ChatMessage = new SimpleSchema({
    
})