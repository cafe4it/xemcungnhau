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
        type : String
    },
    modId : {
        type : String,
        optional : true
    },
    fbUserId : {
        type : String
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date;
        }
    }
})

Channels.attachSchema(Schemas.Channel);

ListUsersJoinChannel = new Meteor.Collection('list_users_join_channel');

Schemas.UserJoinChannel = new SimpleSchema({
    channelUserId : {
        type : String
    },
    userId : {
        type : String
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date;
        }
    },
    isOwner : {
        type : Number,
        optional : true
    }
});

ListUsersJoinChannel.attachSchema(Schemas.UserJoinChannel);

Schemas.PlayerItem = new SimpleSchema({
    itemId : {
        type : String
    },
    kind : {
        type : String
    },
    title : {
        type : String
    },
    description : {
        type : String,
        optional : true
    },
    thumbnails : {
        type : String,
        optional : true
    },
    url : {
        type : String
    },
    duration : {
        type : String,
        optional : true
    },
    isPlay : {
        type : Boolean,
        defaultValue : false,
        optional : true
    }
});

Players = new Meteor.Collection('players');

PlayList = new Meteor.Collection('playlist');

Schemas.PlayListItem = new SimpleSchema({
    channelId : {
        type : String
    },
    item : {
        type : Schemas.PlayerItem
    },
    no : {
        type : Number,
        defaultValue : 0
    }
});

PlayList.attachSchema(Schemas.PlayListItem);

Schemas.Player = new SimpleSchema({
    channelId : {
        type : String,
        autoValue : function(){
            return Meteor.userId()
        }
    },
    playlistItemId : {
        type : String,
        optional : true
    }
});

Players.attachSchema(Schemas.Player);

ChatMessages = new Meteor.Collection('chatMessages');

Schemas.ChatMessage = new SimpleSchema({
    channelId : {
        type : String
    },
    senderId : {
        type : String
    },
    message : {
        type : String
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date;
        }
    }
})

ChatMessages.attachSchema(Schemas.ChatMessage);

