//quiz logic
var time = questions.length * 12;
var timerEl = document.getElementById("time");
var indexCurrentQuestion = 0;
var timerID;
var startButton = document.getElementById("startQuizButton");
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");
var rightWrongEl = document.getElementById("rightWrong");
var initialEl = document.getElementById("initials");

function startQuiz() {
    // hide start screen
    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "start hide");
  
    // uhhide questions 
    questionsEl.setAttribute("class", " ");
    // start timer
    timerId = setInterval(function() {
      countdown();
    }, 1000);
    // show starting time
    timerEl.textContent = time;
  
    callQuestion();

}

function callQuestion() {
    //calls current question from array of questions, updates question title
    var currentQuestion = questions[indexCurrentQuestion];
    questionsEl.children[0].textContent = currentQuestion.title;

    //clears old answers
    while (answersEl.hasChildNodes()) {
        answersEl.removeChild(answersEl.lastChild);
    }

    // iterates through answers
    for(var i = 0; i < currentQuestion.answers.length; i++) {

    // creates button for each potential answer
    var answerButton = document.createElement("button");
    answerButton.textContent = currentQuestion.answers[i];
    answersEl.appendChild(answerButton);
  }
    //event listener to each answer
  answersEl.children[0].addEventListener("click", function(event) {
    buttonclick(answersEl.children[0]);
  });

  answersEl.children[1].addEventListener("click", function(event) {
    buttonclick(answersEl.children[1]);
  });

  answersEl.children[2].addEventListener("click", function(event) {
    buttonclick(answersEl.children[2]);
  });

  answersEl.children[3].addEventListener("click", function(event) {
    buttonclick(answersEl.children[3]);
  });

}

function buttonclick(answerChoice) {
    //checks for right answer, decrements time if wrong 
    if (answerChoice.textContent != questions[indexCurrentQuestion].correctAnswer){
      time -= 10;
      rightWrongEl.textContent = "Incorrect"; 
    }
    
    // else 
    else {
      rightWrongEl.textContent = "Correct";
    }
  
    // flashes correct/incorrect
    rightWrongEl.setAttribute("class", "rightWrong");

    setInterval(function() {
      rightWrongEl.setAttribute("class", "rightWrong hide");
    }, 1200);
  
    // move to next question
    indexCurrentQuestion++;
  
    // ends quiz if there are no more questions
    if (indexCurrentQuestion === questions.length) {
      endQuiz();
    }
   
    else {
      callQuestion();
    }
}

  function setHighscore() {
    //takes input and converts to uppercase
    var initials = initialEl.value.toUpperCase();
    if (initials === "") {
        alert("Please type your initials");
        return;
    }

    else {
        var highscores;
        if (JSON.parse(localStorage.getItem("highscores")) !=null) {
          highscores = JSON.parse(window.localStorage.getItem("highscores"));
        } 

        else {
            highscores = [];
        }

        var playerScore = {
            initials: initials,
            score: time
        };    
        highscores.push(playerScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        location.href = "highscores.html";

}

}
//function to end the quiz
  function endQuiz() {  
      
    clearInterval(timerId);
    timerEl.textContent = time;
  
    // show end screen
    var resultsEl = document.getElementById("results");
    resultsEl.setAttribute("class", " ");
  
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
}



  function countdown() {
    // drecrements time
    time--;
    timerEl.textContent = time;
  
    // ends quiz if you run out of time
    if (time <= 0)
      endQuiz();
    
}
//lets user press enter instead of clicking on submit
function checkForEnter(event) {
      if(event.keyCode === 13)
        setHighscore();
  }

  var submitButton = document.getElementById("submit");
  submitButton.onclick = setHighscore;
  initialEl.onkeyup = checkForEnter;
  startButton.onclick = startQuiz;