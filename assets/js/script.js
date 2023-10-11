// initialize variables for timer
var writtenTime = document.getElementById("timer");
var time = 0;

// function that writes the time to the page
function writeTime() {
    writtenTime.textContent = "Time: " + time;
}

// initialize variables for buttons and links
var startButton = document.querySelector("#start");
var restartButton = document.querySelector("#try-again");
var viewScoreLink = document.querySelector("#scoreLink");
var submitButton = document.querySelector("#submit");

// initialize page sections
var header = document.querySelector("header");
var startPage = document.querySelector("#start-page");
var quizPage = document.querySelector("#quiz");
var scorePage = document.querySelector("#highscores");
var donePage = document.querySelector("#all-done");

// TODO: put in array containing objects containing questions and answers
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

var x = 0;

function answerCorrect() {
    score++;
    moveOn();
}

function answerIncorrect() {
    time -= 10;
    moveOn();
}

function showDonePage() {
    quizPage.setAttribute("style", "display: none;");
    donePage.setAttribute("style", "display: block;");
    scorePage.setAttribute("style", "display: none;");

    scorePageShown = true;
    var score = document.getElementById("score");
    score.textContent = "Your final score is " + time + ".";
}

function saveScore() {
    localStorage.setItem();
}

function renderScore() {

}

function clearAnswers() {
    //clear answers
    for (y = 1; y < 5; y++) {
        var answer = document.querySelector(".answer");
        answer.remove();
    }
}

function moveOn() {

    if (x < questions.length) {
        clearAnswers();
        askQuestions();
    } else {
        showDonePage();
    }
}

// function that will write the questions and its answers onto the page
function askQuestions() {
    var writtenQuestion = document.getElementById("question");
    writtenQuestion.textContent = questions[x][0].question;

    for (y = 1; y < questions[x].length; y++) {
        var answer = document.createElement("button");
        answer.classList.add("btn");
        answer.classList.add("answer");
        answer.append(y + ". " + questions[x][y].answer);
        quizPage.append(answer);

        if (questions[x][y].bool) {
            answer.addEventListener("click", answerCorrect);
        } else {
            answer.addEventListener("click", answerIncorrect);
        }
    }

    x++;
}

// boolean on whether or not the score page has been shown
var scorePageShown = false;

// button that sends user to start page if quiz has been completed
// or sends user back to the quiz
function restart() {
    // if user has completed quiz
    // show only start page, set time to zero

    // if user has answered any questions, reset questions and clear answers
    if (x >= 0) {
        clearAnswers();
        x = 0;
    }

    time = 0;
    scorePageShown = false;
    writeTime();
    header.setAttribute("style", "display: flex;");
    startPage.setAttribute("style", "display: block;");
    quizPage.setAttribute("style", "display: none;");
    donePage.setAttribute("style", "display: none;");
    scorePage.setAttribute("style", "display: none;");

}

// shows high score page
function showScorePage() {
    scorePageShown = true;
    //hide the rest of the sections
    header.setAttribute("style", "display: none;");
    startPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: none;");
    donePage.setAttribute("style", "display: none;");
    scorePage.setAttribute("style", "display: block; margin-top: 60px;");
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

// once user submits their initials it should save it to a locally stored array of initials with scores

// event listeners that call to functions
startButton.addEventListener("click", startQuiz);
viewScoreLink.addEventListener("click", showScorePage);
restartButton.addEventListener("click", restart);
//submitButton.addEventListener("click", addScore);
// add button for clear highscores
// that button should call to a function that empties the high score array

