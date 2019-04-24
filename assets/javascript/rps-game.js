   
   // Initialize Firebase
 firebase.initializeApp(config);
 
 // Assign the reference to the database to a variable named 'database'
 // var database = ...
 var database = firebase.database();
 
 // Initial Values
 var iAmPlayer = null;

 var gameObj = {
     isPlayer1Selected : false,
     isPlayer2Selected : false,
     player1Choice : null,
     player2Choice : null,
     player1Wins : 0,
     player2Wins : 0,
     ties : 0,
 }
 
 // --------------------------------------------------------------
 var myGameRef = firebase.database().ref('users/rps/game');
 // At the initial load and subsequent value changes, get a snapshot of the stored data.
 // This function allows you to update your page in real-time when the firebase database changes.
 database.ref().on("value", function(snapshot) {
 
   console.log("ROOT DATA: ", snapshot.val());
   
   // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
  } else{

  }
   //Players makes selection

   //If Both Players have select
   if(gameObj.player1Choice != null && gameObj.player2Choice != null){
       //compare and report winner or tie
   }

   //update score
 
 
 // If any errors are experienced, log them to console.
 }, function(errorObject) {
   console.log("The read failed: " + errorObject.code);
 });
 
 // --------------------------------------------------------------
 $(document).ready(function (){




 // Whenever a user clicks their rock, paper, scissor selection
 $("#player1Choice").on("click", function(event) {
   // Prevent form from submitting
   event.preventDefault();
 
   // Get the input values
   var choice = $("#player1Choice").val();
 
    //if player2 has selected go to seeWhoWins()

    // else do nothing and wait patiently
 
 });

 $("#player1Choice").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
  
    // Get the input values
    var choice = $("#player1Choice").val();
  
     //if player2 has selected go to seeWhoWins()
 
     // else do nothing and wait patiently
  
  });


 
   
   // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
   var computerChoices = ["r", "p", "s"];

   // Creating variables to hold the number of wins, losses, and ties. They start at 0.
   var wins = 0;
   var losses = 0;
   var ties = 0;

   // Create variables that hold references to the places in the HTML where we want to display things.
   var directionsText = document.getElementById("directions-text");
   var userChoiceText = document.getElementById("userchoice-text");
   var computerChoiceText = document.getElementById("computerchoice-text");
   var winsText = document.getElementById("wins-text");
   var lossesText = document.getElementById("losses-text");
   var tiesText = document.getElementById("ties-text");

   // This function is run whenever the user presses a key.
   function seeWhoWins(){

   var p1 = gameObj.player1Choice;
   var p2 = gameObj.player2Choice;

     // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
     if ((p1 === "r") || (p1 === "p") || (p1 === "s")) {

       if ((p1 === "r" && p2 === "s") ||
         (p1 === "s" && p2 === "p") || 
         (p1 === "p" && p2 === "r")) {
         wins++;
       } else if (p1 === p2) {
         ties++;
       } else {
         losses++;
       }

       // Hide the directions
       directionsText.textContent = "";

       // Display the user and computer guesses, and wins/losses/ties.
       userChoiceText.textContent = "You chose: " + p1;
       computerChoiceText.textContent = "The computer chose: " + p2;
       winsText.textContent = "wins: " + wins;
       lossesText.textContent = "losses: " + losses;
       tiesText.textContent = "ties: " + ties;
     }
   };

function newUser(count){
    if(newUser === 1){
        //let user no they are Player 1
        console.log("you are player 1");
    } else if (newUser === 2){
        //let user know they are Player 2
        console.log("you are player 2");
    }
}



});

function player1Joined(){
    console.log("Player 1 has now joined");
    iAmPlayer = 1;

   
    
    $("#player1Div").empty();
    $("#player1Div").html("You are Player 1");
    $("#player2Div").html("Waiting for Player 2");
    gameObj.isPlayer1Selected = true;

   myGameRef.set(gameObj);

};

function player2Joined(){
    console.log("Player 2 has now joined");
    iAmPlayer = 2;
    $("#player1Div").html("Player 1 Ready");
    $("#player2Div").empty();
   
    $("#player2Div").html('You are Player 2, select : <br><button type="button" class="btn btn-lg btn-primary" data-value="rock">ROCK</button><br><button type="button"  class="btn btn-lg btn-success" data-value="paper">PAPER</button><br><button type="button" class="btn btn-lg btn-danger" data-value="scissors">SCISSORS</button>');
    


    gameObj.isPlayer2Selected = true;

    myGameRef.set(gameObj);
};

function tryAgainLater(){
    console.log("Sorry, game in progress, try again later.")
};