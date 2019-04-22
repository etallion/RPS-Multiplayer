var myConnectionsRef = firebase.database().ref('users/rps/connections');

// stores the timestamp of my last disconnect (the last time I was seen online)
var lastOnlineRef = firebase.database().ref('users/rps/lastOnline');

//store the user count
var usersOnlineRef = firebase.database().ref('users/rps/count');

var connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', function(snap) {
if (snap.val() === true) {
    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
    var con = myConnectionsRef.push();

   //newUser(myConnectionsRef);

    // When I disconnect, remove this device
    con.onDisconnect().remove();

    // Add this device to my connections list
    // this value could contain info about the device or a timestamp too
    con.set(true);

    // When I disconnect, update the last time I was seen online
    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

 usersOnlineRef.once('value').then(function(snapshot) {
  var count = snapshot.val() || 1;
  usersOnlineRef.onDisconnect().set(count++);
    });
    

}
});