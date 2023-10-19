// initialize variables for buttons and links
var startButton = document.querySelector("#start");
var tryAgainButton = document.querySelector("#try-again");
var clearButton = document.querySelector("#clear");
var viewScoreLink = document.querySelector("#scoreLink");
var submitButton = document.querySelector("#submit");
var main = document.querySelector("#main");

// initialize page sections
var header = document.querySelector("header");
var startPage = document.querySelector("#start-page");
var quizPage = document.querySelector("#quiz");
var quizPageAnswers = document.querySelector("#answers");
var scorePage = document.querySelector("#highscores");
var scoreListSection = document.querySelector("#scores");
var donePage = document.querySelector("#all-done");

// initialize empty array for scores and initials
var scoreList = [];

// variable for user's initials and score
var user = document.querySelector("#user");
var userScore = 0;

// whether the score page has been shown, indicator for timer
var scorePageShown = false;

var correctOrIncorrect = document.createElement("p");

// initialize variables for timer
var writtenTime = document.getElementById("timer");
var time = 0;

// array containing objects containing questions and answers
// at least 6 questions
// answers have boolean values
var questions = [
    [{"question": "Commonly used data types DO NOT include:"},
    {
        "answer": "strings",
        "bool": false
    },
    {
        "answer": "booleans",
        "bool": false
    },
    {
        "answer": "alerts",
        "bool": true
    },
    {
        "answer": "numbers",
        "bool": false
    }],
    [{"question": "The condition in an if / else statement is enclosed within"},
    {
        "answer": "quotes",
        "bool": false
    },
    {
        "answer": "curly brackets",
        "bool": false
    },
    {
        "answer": "parentheses",
        "bool": true
    },
    {
        "answer": "square brackets",
        "bool": false
    }],
    [{"question": "Arrays in JavaScript can be used to store ______."},
    {
        "answer": "numbers and strings",
        "bool": false
    },
    {
        "answer": "other arrays",
        "bool": false
    },
    {
        "answer": "booleans",
        "bool": false
    },
    {
        "answer": "all of the above",
        "bool": true
    }],
    [{"question": "String values must be enclosed within ______ when being assigned to variables."},
    {
        "answer": "commas",
        "bool": false
    },
    {
        "answer": "curly brackets",
        "bool": false
    },
    {
        "answer": "quotes",
        "bool": true
    },
    {
        "answer": "parentheses",
        "bool": false
    }],
    [{"question": "A very useful tool used during development and debugging for printing content to the debugger is:"},
    {
        "answer": "JavaScript",
        "bool": false
    },
    {
        "answer": "terminal / bash",
        "bool": false
    },
    {
        "answer": "for loops",
        "bool": false
    },
    {
        "answer": "console.log",
        "bool": true
    }],
    [{"question": "When assigned to variables, objects are enclosed within:"},
    {
        "answer": "quotes",
        "bool": false
    },
    {
        "answer": "curly brackets",
        "bool": true
    },
    {
        "answer": "parentheses",
        "bool": false
    },
    {
        "answer": "square brackets",
        "bool": false
    }]
]

// function that writes the time to the page
function writeTime() {
    writtenTime.textContent = "Time: " + time;
}

// countdown function
function countdown() {
    // set initial amount of time and writes it to window
    time = 75;
    writeTime();

    // quiz timer with interval countdown
    var quizTimer = setInterval(function () {
        // end the timer if the user checks the score page
        if (scorePageShown) {
            x = 0;
            writeTime();
            clearInterval(quizTimer);
            return;
        }
        
        // subtract to count down
        time--;

        // if time is up
        if (time === 0) {
            scorePageShown = true;
            // stop timer
            clearInterval(quizTimer);
            // go to all done page for user to enter initials
            showDonePage();
        } 

        writeTime();
    }
    , 1000);
}

// clear scorelist, create append and render scores with initials
function renderScores() {
    // clear scores
    scoreListSection.innerHTML = "";

    // creating the list of scores
    for (var i = 0; i < scoreList.length; i++) {
        var score = scoreList[i];
    
        var li = document.createElement("li");
        li.textContent = score;
    
        scoreListSection.appendChild(li);
      }
}

// retrieve and update the global score list array then call the render function //MOVE THIS 
function initScorePage() {

    if (document.querySelector(".comment") !== null) {
        document.querySelector(".comment").remove();
    }

    // show score page, hide the rest
    header.setAttribute("style", "display: none;");
    startPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: none;");
    donePage.setAttribute("style", "display: none;");
    scorePage.setAttribute("style", "display: block; margin-top: 60px;");

    scorePageShown = true;
    
    // retrieve score list from local storage and parse as an array
    var storedScoreList = JSON.parse(localStorage.getItem("namesAndScores"));

    // if there is anything in storage, update the global score list
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

    renderScores();
}

function storeScores() {
    // store the current score array in local storage as a JSON string
    localStorage.setItem("namesAndScores", JSON.stringify(scoreList));
}

// function that shows the done page, and sets and displays the user score
function showDonePage() {
    quizPage.setAttribute("style", "display: none;");
    donePage.setAttribute("style", "display: block;");

    scorePageShown = true;

    var score = document.getElementById("score");
    score.textContent = "Your final score is " + time + ".";
    userScore = time;
}

// variable defined globally so that moveOn can check if there are more questions
var x = 0;

// go to next question or show the done page
function moveOn() {
    if (x < questions.length - 1) {
        x++;
        quizPageAnswers.innerHTML = ""
        askQuestions();
    } else {
        x = 0;
        quizPageAnswers.innerHTML = ""
        console.log(correctOrIncorrect);
        showDonePage();
    }
}

function answerCorrect() {
    // append text that says Correct!
    correctOrIncorrect.textContent = "Correct!";
    correctOrIncorrect.classList.add("comment");
    main.append(correctOrIncorrect);
    
    moveOn();
}

function answerIncorrect() {
    time -= 10;
    
    // append text that says Wrong!
    correctOrIncorrect.textContent = "Wrong!";
    correctOrIncorrect.classList.add("comment");
    main.append(correctOrIncorrect);
    
    moveOn();
}

// function that writes the questions and answers to the page
function askQuestions() {
    
    var writtenQuestion = document.getElementById("question");
    // x is defined right above move on function
    writtenQuestion.textContent = questions[x][0].question;

    // loop that writes the answers as buttons
    for (y = 1; y < questions[x].length; y++) {
        var answer = document.createElement("button");
        answer.classList.add("btn");
        answer.classList.add("answer");
        answer.append(y + ". " + questions[x][y].answer);
        quizPageAnswers.appendChild(answer);

        // checks the boolean key in the answer to see if it's correct
        if (questions[x][y].bool) {
            answer.addEventListener("click", answerCorrect);
        } else {
            answer.addEventListener("click", answerIncorrect);
        }
    }
}

// starts quiz!
function startQuiz() {
    // hides all blocks but quiz
    startPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: flex;");

    // starts counting down
    countdown();

    askQuestions();
    
    // if user gets through all questions before timer ends, stop time

}

// reset all of the global variables
function reset() {

    scorePageShown = false;
    userScore = 0;
    time = 0;
    writeTime();
    quizPageAnswers.innerHTML = "";
}

// restart the quiz by going to the start page and resetting variables
function tryAgain() {
    reset();

    header.setAttribute("style", "display: flex;");
    startPage.setAttribute("style", "display: block;");
    quizPage.setAttribute("style", "display: none;");
    donePage.setAttribute("style", "display: none;");
    scorePage.setAttribute("style", "display: none");
}

function saveScore(event) {
    event.preventDefault();
    var initials = user.value;
  
    // make sure input isn't blank
    if (initials === "") {
        return;
    }

    // retrieve score list from local storage and parse as an array
    var storedScoreList = JSON.parse(localStorage.getItem("namesAndScores"));

    // if there is anything in storage, update the global score list
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

    // adds new initals with score to the array
    scoreList.push(scoreList.length + 1 + ". " + initials + " - " + userScore);

    storeScores();
    initScorePage();
}

// function that empties the high score array
function clearScores() {
    scoreList = [];

    storeScores();
    initScorePage();
}

// event listeners that call to functions
startButton.addEventListener("click", startQuiz);
viewScoreLink.addEventListener("click", initScorePage);
tryAgainButton.addEventListener("click", tryAgain);
submitButton.addEventListener("click", saveScore);
clearButton.addEventListener("click", clearScores);