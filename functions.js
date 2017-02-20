// Functions that check stuff
function getIndex(indexLetter) {
    for (var i = 0; i < choices.length; i++) {
        if (choices[i] == indexLetter) {
            return i;
        }
    }
    return false;
}

function findUnusedChoices() {
    for (var i = 0; i < choices2.length; i++) {
        for (var j = 0; j < wordLetter.length; j++) {
            if (choices2[i].value == wordLetter[j]) {
                choices2[i].isUsed = true;
            }
        }
    }
}

function mouseClicked() {
    if (gameOver == false) {
        if (mouseY > 360 && mouseY < 370) {
            if (mouseX >= 5 && mouseX <= 395) {
                var i = floor((mouseX - 5) / 15);
                console.log(mouseX + " should use the index " + i);
                letter = choices[i];
            }
        }
        checkKeyPress();
        console.log(getIndex(letter));
        loop();
    }
}

function getWord() {
    var path = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=16&limit=1&api_key=";
    var apiKey = "e1f5825d453522fca400802d88c09a83be4f1ba3b32ba624a";
    wordnikWord = loadJSON(path + apiKey);
}

function getDef() {
    var path1 = "https://api.wordnik.com/v4/word.json/";
    var path2 = "/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key="
    var apiKey = "e1f5825d453522fca400802d88c09a83be4f1ba3b32ba624a";
    wordnikDef = loadJSON(path1 + wordnikWord[0].word + path2 + apiKey);
}

function showDef() {
    var myP = createP(wordnikDef[0].text);
    myP.style("display", "block");
    myP.style("clear", "both");
}

// Functions to Display Elements
function displayHeaders() {
    push();
    textAlign(CENTER);
    fill(0, 161, 211);
    text("Hangman", width / 2, 20);
    pop();
}

function drawMan() {
    // Man
    if (wrong >= 1) {
        ellipse(200, 100, 40);
    };
    if (wrong >= 2) {
        line(200, 220, 200, 120);
    }
    if (wrong >= 3) {
        line(200, 170, 150, 160);
    }
    if (wrong >= 4) {
        line(200, 170, 250, 160);
    }
    if (wrong >= 5) {
        line(150, 270, 200, 220);
    }
    if (wrong >= 6) {
        line(250, 270, 200, 220);
        endGame(false);
    }
}

function drawGallows() {
    strokeWeight(5);
    //Gallows
    line(120, 290, 20, 290);
    line(70, 290, 70, 30);
    line(70, 30, 200, 30);
    line(200, 30, 200, 80);
    line(70, 110, 150, 30);
}