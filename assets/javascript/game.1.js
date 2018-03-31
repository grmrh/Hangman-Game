/*
* bring in the hangman library module
*/
// var myLib = require('hangmanLib');

// planets
function themeWords() {
    return  {
        gameTheme: "planet",
         planets: ["neptune", "jupiter", "mars", "saturn", "uranus", "venus", "mercury", "earth" ],
         numberOfWords: 8
     };
}

// get a word for the game
function getWord() {
    var radomlySelected =  Math.floor(Math.random() * themeWords().numberOfWords );
    return themeWords().planets[radomlySelected];
}

// get a character array from the input string
function getCharArray(word) {
    return word.split('');
}

// get the character place holder initialized by input default char
function initializePlaceHolder(defaultChar, numberOfChars, placeHolder) {
    // var placeHolder = [];
    for (var i = 0; i < numberOfChars ; i++) {
        placeHolder.push(defaultChar);
    }
}

// show the progress of word matching to the user in the screen
function displayWord(charArray) {
    return charArray.toString();
}

 // check if game done
 function checkGameOver(play) {
     if ($.inArray("*", play) == -1) {
         return true;
     }
     else {
         return false;
     }
 }

var guessingCharacter;
var guessedCharacters = [];

var targetWord = myLib.getWord();
$("#targetWord").append(targetWord);

console.log(targetWord);
var targetCharacters = myLib.getCharArray(targetWord);
console.log(targetCharacters);
var placeHolder= [ ];
initializePlaceHolder("*", targetCharacters.length, placeHolder);
var wordProgress = placeHolder;
console.log(wordProgress);

// display game progress
for (var i = 0; i < targetCharacters.length; i++) {
    var cell = $("<div></div>")
                    .text(wordProgress[i])
                    .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
                    .css({"width": "2rem", "height": "3rem", "border-bottom": "2px solid Black"})
                    .css({"padding":".6rem 0.05rem", "margin": ".2rem" });
    $("#gameWord").append(cell);
    //wordProgress[i] = cell.text();
};

// display game progress
var gameProgress = function(selector, wordLength, divValues)
{
    selector.empty();
    for (var i = 0; i < wordLength; i++) {
        var cell = $("<div></div>")
                        .text(divValues[i])
                        .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
                        .css({"width": "2rem", "height": "3rem", "border-bottom": "2px solid Black"})
                        .css({"padding":".6rem 0.05rem", "margin": ".2rem" });
        selector.append(cell);
        //wordProgress[i] = cell.text();
    };
};
console.log(wordProgress);

//displayPanel.innerHTML = wordProgress;
document.onkeyup = function(event) 
{
    var userKey = event.key;

    // check if userKey is alphabetical

    var userKeyLabel = $("<label></label>")
        .text(userKey)
        .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
        .css({"width": "2rem", "height": "3rem"})
        .css({"padding":".6rem 0.05rem", "margin": ".2rem" });

    $("#triedChars").append(userKeyLabel);

     var indexFound = [];
     $.each(targetCharacters, (index, item) => {
        if (item == userKey) {
           indexFound.push(index);
        }
    });

    if (indexFound.length > 0) 
    {
        $.each(indexFound, (index, item) => {
            wordProgress[item] = userKey;
            // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").html(userKey);
            // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").append(userKey);
            // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").text(
            //     function(k, origText) {
            //         return wordProgress[item];
            //     }
            // );
        });
        // update cell character
        gameProgress ($("#gameWord"), targetCharacters.length, wordProgress);

        // check if game done
        if ( checkGameOver(wordProgress)) {
            alert("You Won");
        }
    }

};






