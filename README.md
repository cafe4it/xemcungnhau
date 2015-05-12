#Xem cung nhau

```javascript
var testUser = {
    "picture": {
        "data": {
            "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/p50x50/10409749_972492632775191_330199456167910074_n.jpg?oh=8fc8f66dcc092d29f39b2ce0bc348feb&oe=55C7DA76&__gda__=1440199333_5867ab701891fd83a2c9656dd803e3df",
            "is_silhouette": false
        }
    },
    "id": "9035123696713218",
    "email": "bigbomb110@yahoo.com.vn",
    "timezone": 7,
    "name": "Thái Lan Hương"
}

if(!Session.get('fbUser')){
    var fbUser = {};
    fbUser.me = testUser;
    Session.set('fbUser',fbUser);
}
```
