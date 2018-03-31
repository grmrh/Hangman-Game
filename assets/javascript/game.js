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

    var remainingCountToTry =  userGame.maxNumberOfTrialLimit - userGame.correctCount - userGame.wrongCount;

    // set initial value of number of Wins 0
    $("#numberOfWins").html('<strong>' + gameStats.numberOfWins + '</strong>');
    $("#remainingCount").html('<strong>' + remainingCountToTry + '</strong>');

    var placeHolder= [ ];
    placeHolder = hangmanLib.initializePlaceHolder("*", targetCharacters.length);
    var wordProgress = placeHolder;
    console.log(wordProgress);

    // display initial place holder
    hangmanLib.displayGameProgress($("#gameWord"), targetCharacters.length, wordProgress);

    /*  
        respond to the key hit by user
    */
     //var numberOfTrials = userGame.maxNumberOfTrialLimit;
    document.onkeyup = function(event) 
    {
        console.log( $("#remainingCount").text());
        var userKey = (event.key).toUpperCase();
        userGame.triedCharacters.push(userKey);
       
        // reduce the remaining number of trials
        $("#remainingCount").html('<strong>' + ( --(userGame.maxNumberOfTrialLimit))+ '</strong>');

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

            // check if game done and display congratulation comment a little delayed.
            //setTimeout(function() {
            //var reachedMaxNumberOfTrial = (userGame.maxNumberOfTrialLimit == (userGame.correctCount + userGame.wrongCount)) ? true : false;
            if ( hangmanLib.checkGameOver(wordProgress)) 
            {
                gameStats.gameCount++;
                gameStats.userGameHistory.push(userGame);
                gameStats.numberOfWins++;
        
                //console.log(userGame);
                $("#numberOfWins").html('<strong>' + gameStats.numberOfWins + '</strong>');

                $("#userTargetWord").text(userGame.targetWord);
                $("#userTriedChars").text(userGame.triedCharacters.toString());
                $("#userCorrectCount").text(userGame.correctCount);
                $("#userWrongCount").append($("<label></label>").text(userGame.wrongCount));
                $("#userTriedCharsCount").html(userGame.tillCorrectCount());
                $("#userScore").text(userGame.averageScore());
                
                // reset to default values for the userGame object 
                //and get the display and content arrays to start
                // get the Hangman ready to start over

                // uerGame.getReadyForGame( $("#remainingCount"), $("#gameWord"), $("#triedChars"));

                // Get the next game ready ===> from line 121 to 135 and from line 145 to 158 are exactly same
                // and need to refactor.
                userGame.reset();
                wordProgress = [];
                $("#remainingCount").text(userGame.maxNumberOfTrialLimit);

                // display initial place holder
                targetWord = hangmanLib.getWord();
                userGame.targetWord = targetWord;
                targetCharacters = hangmanLib.getCharArray(targetWord);

                placeHolder = hangmanLib.initializePlaceHolder("*", targetCharacters.length);
                wordProgress = placeHolder;

                hangmanLib.displayGameProgress($("#gameWord"), targetCharacters.length, wordProgress);
                $("#triedChars").empty();
                            
            }
            else if (($("#remainingCount").text()) <= 0)
            {
                gameStats.gameCount++;
                gameStats.userGameHistory.push(userGame);
                gameStats.numberOfLossses++;

                // get the Hangman ready to start over
                userGame.reset();
                wordProgress = [];
                $("#remainingCount").text(userGame.maxNumberOfTrialLimit);

                    // display initial place holder
                targetWord = hangmanLib.getWord();
                userGame.targetWord = targetWord;
                targetCharacters = hangmanLib.getCharArray(targetWord);

                placeHolder = hangmanLib.initializePlaceHolder("*", targetCharacters.length);
                wordProgress = placeHolder;

                hangmanLib.displayGameProgress($("#gameWord"), targetCharacters.length, wordProgress);
                $("#triedChars").empty();
                return;
            } 
        }
        else {
            userGame.wrongCount++;
        }
    };

});




