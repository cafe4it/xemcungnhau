Channels.permit(['insert', 'update', 'remove']).ifHasRole('user').apply();
ChatMessages.permit(['insert', 'update', 'remove']).ifHasRole('user').apply();
ListUsersJoinChannel.permit(['insert', 'update', 'remove']).ifHasRole('user').apply();