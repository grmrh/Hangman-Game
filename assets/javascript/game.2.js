/*
* bring in the hangman library module
*/
//var lib = require('./hangmanLib');
require(['hangmanLib'], function(lib) {

var userGame = hangmanLib.userGame;
var gameStats = hangmanLib.gameStats;

var targetWord = hangmanLib.getWord();
userGame.targetWord = targetWord;
console.log(userGame);

$("#targetWord").append(targetWord);

console.log(targetWord);
var targetCharacters = hangmanLib.getCharArray(targetWord);
console.log(targetCharacters);

var placeHolder= [ ];
placeHolder = hangmanLib.initializePlaceHolder("*", targetCharacters.length);
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

// display initial place holder
hangmanLib.displayGameProgress($("#gameWord"), targetCharacters.length, wordProgress);

// display game progress
// var gameProgress = function(selector, wordLength, divValues)
// {
//     selector.empty();
//     for (var i = 0; i < wordLength; i++) {
//         var cell = $("<div></div>")
//                         .text(divValues[i])
//                         .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
//                         .css({"width": "2rem", "height": "3rem", "border-bottom": "2px solid Black"})
//                         .css({"padding":".6rem 0.05rem", "margin": ".2rem" });
//         selector.append(cell);
//         //wordProgress[i] = cell.text();
//     };
// };
console.log(wordProgress);


/*  
    respond to the key hit by user
*/
document.onkeyup = function(event) 
{
    var userKey = event.key;
    userGame.triedCharacters.push(userKey);
    console.log(userGame.triedCharacters.toString());

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
            userGame.correctCount++;
            console.log(userGame.correctCount);
            console.log(userGame.triedCharacters.toString());
            // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").html(userKey);
            // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").append(userKey);
            // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").text(
            //     function(k, origText) {
            //         return wordProgress[item];
            //     }
            // );
        });
        // update cell character
        hangmanLib.displayGameProgress ($("#gameWord"), targetCharacters.length, wordProgress);

        console.log(userGame);
        console.log(userGame.triedCharacters.toString());
        console.log(userGame.tillCorrectCount());

        // check if game done and display congratulation comment a little delayed.
        setTimeout(function() {
            if ( hangmanLib.checkGameOver(wordProgress)) {
                console.log(userGame);
                var tried = userGame.triedCharacters.toString();
                console.log(tried);
                $("#userTargetWord").text(userGame.targetWord);
                $("#userTriedChars").text(userGame.triedCharacters.toString());
                $("#userCorrectCount").text(userGame.correctCount);
                $("#userWrongCount").append($("<label></label>").text(userGame.wrongCount));
                $("#userTriedCharsCount").html(userGame.tillCorrectCount());
                

                if (alert("You Won")) {
                    console.log(userGame);
                    $("#userTargetWord").text(userGame.targetWord);
                    $("#userCorrectCount").html(userGame.correctCount);
                    $("#userWrongCount").append($("<label></label>").text(userGame.wrongCount));
                    $("#userTriedCharsCount").text(userGame.tillCorrectCount);
                    $("#userTriedChars").text(userGame.triedCharacters);
                }
            }
        }, 100);      
    }
    else {
        userGame.wrongCount++;
    }
};

});




