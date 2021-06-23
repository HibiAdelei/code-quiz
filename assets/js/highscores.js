//highscore logic

function createHighscores() {
        //printHighscores
    // parses content from highscores, returns a message if null/empty

    var highScores = JSON.parse(localStorage.getItem("highscores"));
    if(highScores != null) {
    
        //iterates through scores to create a list element for each.
      for(var i = 0; i < highScores.length; i++) {
        var scoreList = document.createElement("li");
        scoreList.textContent = highScores[i].initials + " " + highScores[i].score;
        document.getElementById("highscores").appendChild(scoreList);
      }
       }
    else{
      var noScores = document.getElementById("highscores");
      noScores.textContent = "There are no high scores to display.";     
    }
        
  }
  //removes highscores then reloads the page
  function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  // makes clear button clear all highscores
  var clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", function(){
    clearHighscores();
  })

  //runs function
  createHighscores();