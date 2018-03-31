/*
* bring in the hangman library module
*/
var myLib = require('./hangmanLib');

var guessingCharacter;
var guessedCharacters = [];

var targetWord = myLib.getWord();
$("#targetWord").append(targetWord);

console.log(targetWord);
var targetCharacters = myLib.getCharArray(targetWord);
console.log(targetCharacters);
var wordProgress = myLib.initializePlaceHolder("_", targetCharacters.length);
console.log(wordProgress);

// display game progress
for (var i = 0; i < targetCharacters.length; i++) {
    var cell = $("<div></div>")
                    .text("X")
                    .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
                    .css({"width": "2rem", "height": "3rem", "border-bottom": "2px solid Black"})
                    .css({"padding":".6rem 0.05rem", "margin": ".2rem" });
    $("#gameWord").append(cell);
    wordProgress[i] = cell.text();
}
console.log(wordProgress);

document.onkeyup = function(event) 
{
    var userKey = event.key;

    // check if userKey is alphabetical

    var userKeyLabel = $("<label></label>")
        .text(userKey)
        .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
        .css({"width": "2rem", "height": "3rem", "border-bottom": "2px solid Black"})
        .css({"padding":".6rem 0.05rem", "margin": ".2rem" });

    $("#triedChars").append(userKeyLabel);

    // var goodPick = $.map(targetWord,function(item, index) {
    //     $.each()
    //     return []
    // })

     var indexFound = [];
    //  $.each(targetCharacters, function(index, item) {
    //      if (item == userKey) {
    //         indexFound.push(index);
    //      }
    //  });

     $.each(targetCharacters, (index, item) => {
        if (item == userKey) {
           indexFound.push(index);
        }
    });

    if (indexFound.length > 0) 
    {
        $.each(indexFound, (index, item) => {
            wordProgress[item] = userKey;
        });
    }

    for (var i = 0; i < indexFound.length; i++)
    {
        $("#gameWord:nth-child(indexFound[i]+1)").text(userKey);

        // or 
        $("#gameWord:nth-child(indexFound[i]+1)").text(userKey);
    }

};

// document.onkeyup = function(event) 
// {
//     var userKey = event.key;

//     // check if userKey is alphabetical

//     var userKeyLabel = $("<label></label>")
//         .text(userKey)
//         .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
//         .css({"width": "2rem", "height": "3rem"})
//         .css({"padding":".6rem 0.05rem", "margin": ".2rem" });

//     $("#triedChars").append(userKeyLabel);

//      var indexFound = [];
//      $.each(targetCharacters, (index, item) => {
//         if (item == userKey) {
//            indexFound.push(index);
//         }
//     });

//     if (indexFound.length > 0) 
//     {
//         $.each(indexFound, (index, item) => {
//             wordProgress[item] = userKey;
//             // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").html(userKey);
//             // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").append(userKey);
//             // $("#gameWord div:nth-child(" + indexFound[index]+1 + ")").text(
//             //     function(k, origText) {
//             //         return wordProgress[item];
//             //     }
//             // );
//         });
//         // update cell character
//         gameProgress ($("#gameWord"), targetCharacters.length, wordProgress);

//         // check if game done
//         if ( checkGameOver(wordProgress)) {
//             alert("You Won");
//         }
//     }

// };
