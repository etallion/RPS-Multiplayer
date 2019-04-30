//establish reference to users/connection
var myConnectionsRef = firebase.database().ref('users/connections');
//create varibles for this connection and number of users connected to webpage
var thisConnectionRef;
var numberOfConnections;

//That is start of a new connection run function grab the number of connection, do something if it is the 1st or 2nd connectino
myConnectionsRef.once("value", function(snapshot) {
    console.log("There are "+snapshot.numChildren()+" viewers");
    numberOfConnections = snapshot.numChildren();
    if(numberOfConnections === 1){
        console.log('Player 1 Joined');
        // waiting for player 2
        player1Joined(conRef);
    } else if (numberOfConnections === 2){
        //ready to play, start new game

        player2Joined(conRef);
    } else {
        console.log("p1 :" + player.connection);
    
        console.log("current :" + conRef);
        
        //sorry game not available, try back later 
       if(conRef != player.connection && numberOfConnections === 2){
        tryAgainLater();};
    }
});

myConnectionsRef.on("value", function(snapshot) {
    console.log("There are "+snapshot.numChildren()+" viewers");
    numberOfConnections = snapshot.numChildren();
    if(numberOfConnections === 2 && iAmPlayer === 1){
        $("#player2Div").empty();
        displayNewMessage("Player 2 has joined. Let's Play!", "RPS");
        $("#player1Div").html('You are Player 1, select : <br><button type="button" class="player1Choice btn btn-lg btn-primary" data-value="rock">ROCK</button><br><button type="button"  class="player1Choice btn btn-lg btn-success" data-value="paper">PAPER</button><br><button type="button" class="player1Choice btn btn-lg btn-danger" data-value="scissors">SCISSORS</button>');

    }

    if(numberOfConnections === 1){
    $("#playerDiv").empty();
    $("#playerNum").html(" 1");
    displayNewMessage("Waiting for Player 2");
    }
});

var connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', function(snap) {
if (snap.val() === true) {
    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
    thisConnectionRef = myConnectionsRef.push();
    conRef = thisConnectionRef;
    console.log("con" + conRef);
   //newUser(myConnectionsRef);

    // When I disconnect, remove this device
    thisConnectionRef.onDisconnect().remove();

    // Add this device to my connections list
    // this value could contain info about the device or a timestamp too
    thisConnectionRef.set(true);

}
});


myGameRef.child('player1Con').on("value", function(snapshot){
    player.connection = snapshot.val();
    console.log("player1Con >> " + player.connection);
});





function setPlayerData(){
    thisConnectionRef.set(player);
}