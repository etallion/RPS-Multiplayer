 // --------------------------------------------------------------  
  
  
 // Initialize Firebase
 firebase.initializeApp(config);
 
 // Assign the reference to the database to a variable named 'database'
 // var database = ...
 var database = firebase.database();
 
 // Initial Values
 var iAmPlayer = null;

  // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
  var computerChoices = ["r", "p", "s"];

  // Creating variables to hold the number of wins, losses, and ties. They start at 0.
  var wins = 0;
  var losses = 0;
  var ties = 0;

  var player = {
    connection : null,
    choice : null,
    wins : 0,
    losses : 0,
    ties : 0,
  }

  // Create variables that hold references to the places in the HTML where we want to display things.
  var mainGameDiv = document.getElementById("mainGameDiv");
  var statsDiv   = document.getElementById('statsDiv');
  var playerDiv = document.getElementById("playerDiv");
  var messagesDiv = document.getElementById("messagesDiv");

  var playerNum = document.getElementById("playerNum");
  var winsText = document.getElementById("wins");
  var lossesText = document.getElementById("losses");
  var tiesText = document.getElementById("ties");



 
 // --------------------------------------------------------------


 $(document).ready(function (){

  $("#chatBtn").on("click", function(event){
    event.preventDefault();
    
    var $newMessage = $("#newMessageText");
    var $messageBox =  $("#messageBox");

    if($newMessage.val() != ''){
      var playerLabel = "Player" + iAmPlayer;
      displayNewMessage($newMessage.val(), playerLabel);
      $newMessage.attr('placeholder', 'chat here');
      
      var height = $messageBox[0].scrollHeight;
      $messageBox.scrollTop(height);
    };

  });

 // Whenever a user clicks their rock, paper, scissor selection
 $("#playerDiv").on("click", ".playerChoice", function(event) {
   // Prevent form from submitting
   event.preventDefault();
 
   // Get the input values
   player.playerChoice = $(this).attr("data-value");
   
   //store in database
   myGameRef.set(player);
   console.log($(this).attr("data-value"));
 
    checkResults();
 
 });



   // This function is run whenever the user presses a key.
   function seeWhoWins(){

   var p1 = player.player1Choice;
   var p2 = player.player2Choice;

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


var myGameRef = firebase.database().ref('users/rps/game');

function player1Joined(con){
    console.log("Player 1 has now joined");
    iAmPlayer = 1;
    player.player1Con = con.toLocaleString();
   
   
    
    $("#player1Div").empty();
    displayNewMessage("You are Player 1, waiting for Player 2", "RPS");
    $("#player1Div").html(" 1");
    
    player.isPlayer1Selected = true;

   myGameRef.set(player);

};

function player2Joined(con){
    console.log("Player 2 has now joined");
    iAmPlayer = 2;
    player.player2Con = con.toLocaleString();
   

    
    $("#player2Div").empty();
   
    displayNewMessage("You are Player 2, time to play!", "RPS");


    player.isPlayer2Selected = true;

    myGameRef.set(player);
};

function tryAgainLater(){
    $("#player1Div").empty();
    $("#player2Div").empty();
    $("#player1Div").html("server overloaded with 2 players battling it out, please try again later.");
    console.log("Sorry, game in progress, try again later.")
};


function displayNewMessage(msg, sender){
    $messageDiv = $("#messageBox");

    $messageDiv.append('<br>');
    $messageDiv.append(sender + ': ' + msg);
    
    }
