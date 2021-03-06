let cards = document.getElementsByClassName("card");
const HTMLarray = document.querySelector(".deck");
let currentFaceupCards = 0;
let faceupArray = [];
const allCards = document.querySelectorAll(".card");
// move counter variables
let numberOfMoves = 0;
let moves = document.querySelector('#moves');
const plurality = "Moves";
const singularity = "Move";
let star = document.getElementsByClassName("fa fa-star");
let cardCounter = [];
let counter = 0;
let timeouts = [];
let starArray = [];

allCards.forEach(function(card) {
    card.addEventListener("click", function() {
        if (currentFaceupCards < 2) {
            if (
                card.classList.contains("open") == false &&
                card.classList.contains("show") == false &&
                card.classList.contains("match") == false
            ) {
                currentFaceupCards++;
                card.classList.add("open", "show");
                faceupArray.push(card);
                //if they Match or not
                if (currentFaceupCards === 2) {
                    if (faceupArray[0] == faceupArray[1]) {
                        alert("You can't click the same card twice!")
                        faceupArray.pop(0);
                        currentFaceupCards = 1;
                    } else if (
                        (faceupArray[0].querySelector("i").classList.value ==
                            faceupArray[1].querySelector("i").classList.value) ==
                        false
                    ) {
                        faceupArray[0].classList.add("mismatch");
                        faceupArray[1].classList.add("mismatch");
                        numberOfMoves++
                        moves.innerHTML = numberOfMoves;
                        stars();
                        plural();
                        timeouts.push(setTimeout(function() {
                            faceupArray[0].classList.add("animate");
                            faceupArray[1].classList.add("animate");
                        }, 1500))
                        timeouts.push(setTimeout(function() {
                            faceupArray[0].classList.remove("show");
                            faceupArray[0].classList.remove("animate");
                            faceupArray[0].classList.remove("open");
                            faceupArray[0].classList.remove("mismatch");
                            faceupArray[1].classList.remove("animate");
                            faceupArray[1].classList.remove("show");
                            faceupArray[1].classList.remove("open");
                            faceupArray[1].classList.remove("mismatch");
                            faceupArray = [];
                            currentFaceupCards = 0;
                        }, 1800));
                    } else {
                        counter++
                        cardCounter.push(counter);
                        timeouts.push(setTimeout(function() {
                            faceupArray[0].classList.remove("open");
                            faceupArray[0].classList.remove("show");
                            faceupArray[1].classList.remove("open");
                            faceupArray[1].classList.remove("show");
                            faceupArray[0].classList.add("complete");
                            faceupArray[0].classList.add("match");
                            faceupArray[1].classList.add("complete");
                            faceupArray[1].classList.add("match");
                            faceupArray[0].classList.add("animation");
                            faceupArray[1].classList.add("animation");
                            numberOfMoves++
                            moves.innerHTML = numberOfMoves;
                            stars();
                            plural();
                        }, 1000));
                        timeouts.push(setTimeout(function() {
                            faceupArray[0].classList.add("deanimation");
                            faceupArray[1].classList.add("deanimation");
                            faceupArray[0].classList.remove("animation");
                            faceupArray[1].classList.remove("animation");
                            faceupArray = [];
                            currentFaceupCards = 0;
                        }, 1750));
                    }
                }
            }
        }
    })
});

// timer
HTMLarray.addEventListener("click", function() {
    let seconds = 00;
    let minutes = 00;
    let secondsHTML = document.getElementById('seconds');
    let minutesHTML = document.getElementById('minutes');
    let beginTimer = document.querySelector(".deck");
    const resetTimer = document.getElementById('restartButton');
    let interval;

    beginTimer.addEventListener('click', function() {
        if (seconds === 00 || seconds == '00') {
            clearInterval(interval);
            interval = setInterval(startClock, 1000);
        }
    });
    document.addEventListener('click', function() {
        if (cardCounter.length === 8) {
            clearInterval(interval);
        }
    });
    resetTimer.addEventListener('click', function() {
        clearInterval(interval);
        seconds = '00';
        minutes = '00';
        secondsHTML.innerHTML = seconds;
        minutesHTML.innerHTML = minutes;
    });
//starts the timer
    function startClock() {
        seconds++;
        if (seconds < 10) {
            secondsHTML.innerHTML = '0' + seconds;
        }
        if (seconds > 9) {
            secondsHTML.innerHTML = seconds;
        }
        if (seconds > 59) {
            minutes++;
            minutesHTML.innerHTML = '0' + minutes;
            seconds = 0;
            secondsHTML.innerHTML = '0' + seconds;
        }
        if (minutes > 10) {
            minutesHTML.innerHTML = minutes;
        }
    }
}, {
    once: true
});
// shuffle function
function shuffle(HTMLarray) {
    for (i = HTMLarray.children.length; i >= 0; i--) {
        HTMLarray.appendChild(HTMLarray.children[Math.random() * i | 0]);
    };
}

// game completed alert function and event listener
function youDidIt() {
    swal(starMessage(),'You did it in ' + numberOfMoves + ' moves using ' + document.getElementById('minutes').innerHTML + ':' + document.getElementById('seconds').innerHTML + '!');
};

HTMLarray.addEventListener('click', function(e) {
    if (cardCounter.length === 8) {
        setTimeout(function() {
            youDidIt();
            cardCounter = 0;
        }, 2500);

    }
});

// resets the grid & stars
document.getElementById('restartButton').addEventListener('click', function(e) {
    let holdingArray = Array.from(document.getElementsByClassName('card'));
    for (each of holdingArray) {
        each.className = 'card';
    }
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    starArray = [];
    faceupArray = [];
    currentFaceupCards = 0;
    numberOfMoves = 0;
    cardCounter = [];
    counter = 0;
    plural();
    shuffle(HTMLarray);
    for (var i = 0; i < 3; i++) {
        star[i].style.color = 'black';
    };
});
// changes 'moves' to 'move' when the numberOfMoves === 1
function plural() {
    document.getElementById('moves').innerHTML = numberOfMoves;
    if (numberOfMoves === 1) {
        document.getElementById('plurality').innerHTML = singularity;
    } else {
        document.getElementById('plurality').innerHTML = plurality;
    }
};
//removes stars based on numberOfMoves
function stars() {
    if (numberOfMoves === 4) {
        star[2].style.color = '#ccc';
    }
    if (numberOfMoves === 22) {
        star[1].style.color = '#ccc';
    }
}
function starMessage() {
  for (i = 0; i < 3; i++) {
    if (star[i].style.color =='black') {
      starArray.push(i);
    }
  }
  if (starArray.length === 1) {
    return('You scored 1 star!');
  }else{
    return('You scored ' + starArray.length + ' stars!');
  }
}
