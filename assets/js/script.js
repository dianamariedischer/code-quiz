// initialize variables for timer
var writtenTime = document.getElementById("timer");
var time = 0;

// function that writes the time to the page
function writeTime() {
    writtenTime.textContent = "Time: " + time;
}

// initialize variables for buttons and links
var startButton = document.querySelector("#start");
var goBackButton = document.querySelector("#go-back");
var viewScoreLink = document.querySelector("#scoreLink");

// initialize page sections
var header = document.querySelector("header");
var startPage = document.querySelector("#start-page");
var quizPage = document.querySelector("#quiz");
var scorePage = document.querySelector("#highscores");
var donePage = document.querySelector("#all-done");

// TODO: put in array containing objects containing questions and answers
// at least 6 questions
// answers have boolean values

// function that will write the questions and its answers onto the page
// if correct answer, add a point to the score: score++;
// else it's incorrect and subtract 10 seconds: time -= 10;
// after answer selected write next question to window

// boolean on whether or not the score page has been shown
var scorePageShown = false;

// button that sends user to start page if quiz has been completed
// or sends user back to the quiz
function goBack() {
    // if user has completed quiz
    // show only start page, set time to zero
    time = 0;
    scorePageShown = false;
    writeTime();
    header.setAttribute("style", "display: flex;");
    startPage.setAttribute("style", "display: block;");
    quizPage.setAttribute("style", "display: none;");
    scorePage.setAttribute("style", "display: none;");
    donePage.setAttribute("style", "display: none;");

    // if user has not completed quiz
    // return to quiz and start timer back up
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
        // pause the timer if the user checks the score page
        if (scorePageShown) {
            clearInterval(quizTimer);
            return;
        }
        
        // subtract to count down
        time--;

        // if time is up
        if (time === 0) {
            // stop timer
            clearInterval(quizTimer);
            // go to all done page for user to enter initials
            quizPage.setAttribute("style", "display: none;");
            donePage.setAttribute("style", "display: block;");
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

    
    // if user gets through all questions before timer ends, stop time

}

// once user submits their initials it should save it to a locally stored array of initials with scores

// event listeners that call to functions
startButton.addEventListener("click", startQuiz);
viewScoreLink.addEventListener("click", showScorePage);
goBackButton.addEventListener("click", goBack);
// add button for clear highscores
// that button should call to a function that empties the high score array and prints it

