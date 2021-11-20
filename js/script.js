const resultText = document.querySelector(".counter-result");
const myCards = document.querySelector(".cards-container");
const appendSeconds = document.getElementById("seconds");
const appendTens = document.getElementById("tens");
var seconds = 00;
var tens = 00;
var counter = 0;
var resultsArray = [];
var interval;
var icons = ["html", "css", "sass", "javascript", "vue"];

var clone = icons.slice(0);
var cards = icons.concat(clone);
// shuffle Cards Array
var shuffle = cards.sort(function(a, b) {
    return 0.5 - Math.random();
});

for(let i = 0; i < cards.length; i++) {
    var card = document.createElement("div");
    card.dataset.item = cards[i];
    card.dataset.view = "card";
    myCards.appendChild(card);

    card.onclick = function() {
        if(this.className != "flipped" || this.className != "correct") {
            this.className = "flipped";
            var result = this.dataset.item;
            resultsArray.push(result);
            console.log(resultsArray)
            clearInterval(interval);
            interval = setInterval(startTimer, 10);
        }

        if(resultsArray.length > 1) {
            if(resultsArray[0] === resultsArray[1]) {
                check("correct");
                counter ++;
                win();
                resultsArray = [];
            } else {
                check("reverse");
                resultsArray = [];
            }
        }
    }
}


var check = function(className) {
    const flipped = document.getElementsByClassName("flipped");
    setTimeout(function() {
        for(var i = (flipped.length - 1); i >= 0; i--) {
            flipped[i].className = className;
        }
    }, 500)
}

var win = function() {
    if(counter === 5) {
        clearInterval(interval);
        resultText.innerHTML = "You Win in " + seconds + ":" + tens
    }
}

function startTimer() {
    tens ++;

    if(tens < 9) {
        appendTens.innerHTML = "0" + tens;
    }

    if(tens > 9) {
        appendTens.innerHTML = tens;
    }
    if(tens > 99) {
        seconds ++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + tens;
    }
    if(seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}

