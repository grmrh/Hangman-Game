/*
* Load the hangman library module
*/
//var lib = require('./hangmanLib');
require(['hangmanLib'], function(lib) {

    // get the theme music
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "Assets/bensound-relaxing.mp3");

    // Theme Button
    $("#musicControls").on("click", ".theme-button", function() {
      audioElement.play();
    }).on("click", ".pause-button", function() {
      audioElement.pause();
    });

    // var username = prompt("Please enter username, e.g. like  'user1' or 'dragon.' Remember your username");
    var userGame = hangmanLib.userGame;
    // userGame.userName = username;
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
                        .css({"width": "2rem", "height": "3rem", "border-bottom": "2px solid Whitesmoke"})
                        .css({"padding":".6rem 0.05rem", "margin": ".2rem" });
        $("#gameWord").append(cell);
        //wordProgress[i] = cell.text();
    };

    // display initial place holder
    hangmanLib.displayGameProgress($("#gameWord"), targetCharacters.length, wordProgress);

    /*  
        respond to the key hit by user
    */
    document.onkeyup = function(event) 
    {
        var userKey = (event.key).toUpperCase();
        userGame.triedCharacters.push(userKey);
       
        console.log(userGame.triedCharacters.toString());

        // check if userKey is alphabetical
        var userKeyLabel = $("<label></label>")
            .text(userKey)
            .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
            .css({"width": "2rem", "height": "3rem"})
            .css({"padding":".6rem 0.05rem", "margin": ".2rem" });

        // show in the key list that was entered by user
        $("#triedChars").append(userKeyLabel);

        var indexFound = [];
        // find if the key is included in the target word
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
                // $("#gameWord div:nth-child(" + (item+1) + ")").html(userKey);
                // $("#gameWord div:nth-child(" + (item+1) + ")").append(userKey);
                // $("#gameWord div:nth-child(" + (item+1) + ")").text(
                //     function(k, origText) {
                //         return wordProgress[item];
                //     }
                // );
            });
            // update cell character
            hangmanLib.displayGameProgress ($("#gameWord"), targetCharacters.length, wordProgress);

            console.log(userGame);
            console.log(userGame.triedCharacters.toString());
            console.log(userGame.tillCorrectCount);

            // check if game done and display congratulation comment a little delayed.
            setTimeout(function() {
                var reachedMaxNumberOfTrial = (userGame.maxNumberOfTrialLimit == (userGame.correctCount + userGame.wrongCount)) ? true : false;
                if ( hangmanLib.checkGameOver(wordProgress)) 
                {
                    gameStats.gameCount++;
                    gameStats.userGameHistory.push(userGame);
                    gameStats.numberOfWins++;
            
                    console.log(userGame);
                    var tried = userGame.triedCharacters.toString();

                    $("#userTargetWord").text(userGame.targetWord);
                    $("#userTriedChars").text(userGame.triedCharacters.toString());
                    $("#userCorrectCount").text(userGame.correctCount);
                    $("#userWrongCount").append($("<label></label>").text(userGame.wrongCount));
                    $("#userTriedCharsCount").html(userGame.tillCorrectCount());
                    $("#userScore").text(userGame.averageScore());
                    

                    if (alert("Congratulation, You Won!")) {
                        // console.log(userGame);
                        // $("#userTargetWord").text(userGame.targetWord);
                        // $("#userTriedChars").text(userGame.triedCharacters.toString());
                        // $("#userCorrectCount").text(userGame.correctCount);
                        // $("#userWrongCount").append($("<label></label>").text(userGame.wrongCount));
                        // $("#userTriedCharsCount").html(userGame.tillCorrectCount());
                        // $("#userScore").text(userGame.averageScore());
                        // console.log(userGame.averageScore());
                    }
                }
                else if (reachedMaxNumberOfTrial)
                {
                    gameStats.gameCount++;
                    gameStats.userGameHistory.push(userGame);
                    gameStats.numberOfLossses++;
                }

            }, 100);      
        }
        else {
            userGame.wrongCount++;
        }
    };

});




