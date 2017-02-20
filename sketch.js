var wrong = 0;
var words = [];
var wordsTemp = [];
var word, offsetLength, width, height, letter, gameOver;
var lettersTried = [];
var wordLetter = [];
var wordHit = [];
var choices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var choices2 = [];
var wordnikWord;
var wordnikDef;

function preload() {
    //    words = loadStrings('words2.txt');
    for (var i = 0; i < 26; i++) {
        choices2.push(new choice(i));
    }
    getWord();
}

function setup() {
    width = 400;
    height = 500;
    getDef();

    var canvas = createCanvas(width, height);

    canvas.parent('sketch-holder');
    //    word = words[floor(random(words.length))].toUpperCase();
    word = wordnikWord[0].word.toUpperCase();
    offsetLength = floor((width - (word.length * 10 + ((word.length - 1) * 5))) / 2);
    wordLetter = split(word, "");
    for (var i = wordLetter.length - 1; i >= 0; i--) {
        if (wordLetter[i] == " " || wordLetter[i] == "-") {
            wordLetter.splice(i, 1);
        }
    }
    for (var i = 0; i < wordLetter.length; i++) {
        wordHit[i] = false;
    }
    findUnusedChoices();
    gameOver = false;
    console.log(word);
    var button = select('#def')
    button.mousePressed(showDef);
}

function draw() {
    noLoop();
    background(255);
    strokeWeight(1);
    displayHeaders();
    noFill();
    rect(0, 0, width - 1, height - 1); // Draw Borders
    for (var i = 0; i < word.length; i++) {
        line(offsetLength + (i * 15), 320, offsetLength + (i * 10) + (i * 5) + 10, 320);
    }

    var correctGuesses = 0;
    for (var i = 0; i < wordHit.length; i++) {
        if (wordHit[i] == true) {
            fill(0);
            push();
            textAlign(CENTER);
            text(wordLetter[i], offsetLength + (i * 15) + 5, 315);
            pop();
            noFill();
            correctGuesses++;
        }
    }
    drawGallows();
    displayGuesses();
    drawMan();
    if (correctGuesses == wordHit.length) {
        endGame(true);
    }
}

function displayGuesses() {
    var location = 10;
    fill(0);
    for (var i = 0; i < choices2.length; i++) {
        push();
        fill(150);
        text(choices2[i].value, 10 + (i * 15), 370)
        pop();
        for (var j = 0; j < lettersTried.length; j++) {
            if (choices2[i].value == lettersTried[j]) {
                var wasRight = false;
                for (var k = 0; k < wordLetter.length; k++) {
                    if (wordLetter[k] == choices2[i].value) {
                        wasRight = true;
                    }
                }
                push();
                fill(255, 0, 0);
                if (wasRight == true) {
                    fill(32, 147, 78);
                }
                text(choices[i], 10 + (i * 15), 370)
                pop();
            }
        }
    }
    text("Guesses Remaining: ".concat(6 - wrong), 250, 40);
    noFill();
}

function keyPressed() {
    if (gameOver == false) {
        if (key == "A" || key == "B" || key == "C" || key == "D" || key == "E" || key == "F" || key == "G" || key == "H" || key == "I" || key == "J" || key == "K" || key == "L" || key == "M" || key == "N" || key == "O" || key == "P" || key == "Q" || key == "R" || key == "S" || key == "T" || key == "U" || key == "V" || key == "W" || key == "X" || key == "Y" || key == "Z") {
            letter = key;
            checkKeyPress();
            loop();
        }
    } else {
        if (keyCode == 13) {
            location.reload();
        }
    }
    //    return false;
}

function checkKeyPress() {
    var letterFound = false;
    for (var i = lettersTried.length; i >= 0; i--) {
        if (lettersTried[i] == letter) {
            letterFound = true;
        }
    }
    if (letterFound == false) {
        lettersTried.push(letter);
        isCorrect();
    }
}

function isCorrect() {
    var correctHit = false;
    for (var i = 0; i <= wordLetter.length; i++) {
        if (wordLetter[i] == letter) {
            correctHit = true;
            wordHit[i] = true;
        }
    }
    if (correctHit == false) {
        wrong++;
    }
}

function endGame(type) {
    noLoop();
    gameOver = true;
    // background(150);
    fill(0);
    textAlign(CENTER);
    if (type == true) {
        textSize(64);
        text("CONGRATS!", width / 2, 450);
        textSize(16);
        text("Press enter to play again", width / 2, 480);
    }
    if (type == false) {
        textSize(64);
        text("Fail", width / 2, 440);
        textSize(16);
        text("The correct word was ".concat(word), width / 2, 470);
        text("Press enter to play again", width / 2, 490);
    }
}