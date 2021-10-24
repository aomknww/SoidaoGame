var score = 0,
    highScore = 0,
    time = 30,
    timer;

var IsPlaying = false;
var timeBoard = document.getElementById('time'),
    scoreBoard = document.getElementById('score'),
    btnStart = document.getElementById('btn');

    function fallDown(star) {
         if (!(IsPlaying && star instanceof HTMLElement)) {
             return;
        }
        // store the current top position for future refrence.
        star.setAttribute('data-top', star.style.top);
        
        // Change the top position 
        star.style.top = "330px";

        // increase score
        score = score + 5;
        // Show the score by calling this function
        renderScore();
        // hide the star after it reaches the ground by calling this function
        hideFallenStar(star);
}

function hideFallenStar(star) {
    setTimeout(function () {
        star.style.display = 'none';

        restoreFallenStar(star);
    }, 500);
}

function restoreFallenStar(star) {
    star.style.top = star.getAttribute('data-top');
    setTimeout(function () { 
        star.style.display = 'inline-block';
    }, 500);
}

function renderScore() {
    scoreBoard.innerText = score;
    if (score > highScore) {
        highScore = score;
        document.getElementById('high').innerText = highScore;
    }
}

function startGame() {
    // disable the button to make it unclickable
    btnStart.disabled = "disabled";
    IsPlaying = true;
    renderScore();

    timer = setInterval(countDown, 1000);
}

function countDown() {
    time -= 1;
    timeBoard.innerText = time;
    if (time == 0) {
        clearInterval(timer);
        endGame();
     }
}

function endGame() {
    IsPlaying = false;
    alert("Your score is " + score);
    // reset score and time for next game
    score = 0;
    time = 30;
    // enable the bottom to make it clickable
    btnStart.removeAttribute('disabled');
    }