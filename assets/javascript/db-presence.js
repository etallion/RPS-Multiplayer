var myConnectionsRef = firebase.database().ref('users/rps/connections');

// stores the timestamp of my last disconnect (the last time I was seen online)
var lastOnlineRef = firebase.database().ref('users/rps/lastOnline');

var numberOfConnections;

myConnectionsRef.once("value", function(snapshot) {
    console.log("There are "+snapshot.numChildren()+" viewers");
    numberOfConnections = snapshot.numChildren();
    if(numberOfConnections === 1){
        // waiting for player 2
        player1Joined();
    } else if (numberOfConnections === 2){
        //ready to play, start new game

        player2Joined();
    } else {
        //sorry game not available, try back later 
        tryAgainLater();
    }
});

myConnectionsRef.on("value", function(snapshot) {
    console.log("There are "+snapshot.numChildren()+" viewers");
    numberOfConnections = snapshot.numChildren();
    if(numberOfConnections === 2 && iAmPlayer === 1){
        $("#player2Div").empty();
        $("#player2Div").html("Player 2 has joined, Select R, P, or S");
        $("#player1Div").html('You are Player 1, select : <br><button type="button" class="btn btn-lg btn-primary" data-value="rock">ROCK</button><br><button type="button"  class="btn btn-lg btn-success" data-value="paper">PAPER</button><br><button type="button" class="btn btn-lg btn-danger" data-value="scissors">SCISSORS</button>');

    }

    if(numberOfConnections === 1){
    $("#player1Div").empty();
    $("#player1Div").html("You are Player 1");
    $("#player2Div").empty();
    $("#player2Div").html("Waiting for Player 2");
    }
});


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

}
});