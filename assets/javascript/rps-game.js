   
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
 
 // At the initial load and subsequent value changes, get a snapshot of the stored data.
 // This function allows you to update your page in real-time when the firebase database changes.
 database.ref().on("value", function(snapshot) {
 
   console.log("ROOT DATA: ", snapshot.val());
   
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

  $("#IamPlayer1").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
    console.log('Hey there');
  
    iAmPlayer = 1;

    $("#player2Div").empty();
    $("#player1Div").empty();
    $("#player1Div").html("You are Player 1");
    $("#player2Div").html("Waiting for Player 2");
    gameObj.isPlayer1Selected = true;

    database.ref().set(gameObj);

    if(gameObj.isPlayer2Selected === true){
        //start game
    }
  
  });

  $("#IamPlayer2").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
  
    iAmPlayer = 2;

    $("#player2Div").empty();
    $("#player1Div").empty();
    $("#player1Div").html("Waiting for Player 1");
    $("#player2Div").html("You are Player 2");

    gameObj.isPlayer2Selected = true;

    database.ref().set(gameObj);

    if(gameObj.isPlayer1Selected === true){
        //start game
    }
  
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
});