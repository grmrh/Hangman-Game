/*
* functions and objects called by the gamejs
*/

var hangmanLib = (function() {

    // planets
    var themeWords = function() {
        return  {
            gameTheme: "planet",
            planets: ["NEPTUNE", "JUPITER", "MARS", "SATURN", "URANUS", "VENUS", "MERCURY", "EARTH" ],
            numberOfWords: 8
        };
    };

    // create an object per user and per game
    var userGame =  {
        userName: 'Anoymous',  
        targetWord: '', 
        triedCharacters:  [ ], 
        correctCount: 0,
        wrongCount: 0,
        tillCorrectCount: function() {return this.correctCount + this.wrongCount}, 
        maxNumberOfTrialLimit: 15, 
        averageScore: function() {
            if (this.tillCorrectCount()== 0 ) {
                return NaN
            }
            else {
                return ((this.correctCount * 100)/this.tillCorrectCount()/100).toFixed(2)
            }
        }      
    };
    

    // singleton
    var gameStats = {        
        gameCount: 0,
        gameName: () => {
            return "Game " + this.gameCount
        },
        userGameHistory: [ ], 
        numberOfWins: 0,
        numberOfLossses: 0, 
        totalNumberOfPlay:  function() {
            return this.numberOfWins + this.numberOfLosses
        },
        averageOnGames: function() {
            if (totalNumberOfPlay() == 0 ) {
                return NaN
            }
            else {
                return ((this.numberOfWins*100)/this.totalNumberOfPlay()/100).toFixed(2)
            }
        }
    };

    // get a word for the game
    var  getWord = function() {
        var radomlySelected =  Math.floor(Math.random() * themeWords().numberOfWords );
        return themeWords().planets[radomlySelected];
    };

    // get a character array from the input string
    var getCharArray = function(word) {
        return word.split('');
    };

    // javascript array.find(callback fuction)  returns the first element found in the array
    // determin if the user answer is correct
    var isCorrect = function(charTry, targetChars) {
        if (targetChars.find(function(e){return e === charTry;})) 
            return true;
        else
            return false;
    };

    // remove the first character from the input char array
    var removeChar = function(correctChar, targetChars) {
        var ind = targetChars.indexOf(correctChar);
        // return the array that removed correctChar element
        return targetChars.splice(ind, 1);
    };

    // get the character place holder initialized by input default char
    var initializePlaceHolder = function(defaultChar, numberOfChars) {
        var placeHolder = [ ];
        for (var i = 0; i < numberOfChars ; i++) {
            placeHolder.push(defaultChar);
        }
        return placeHolder;
    };

    // show the progress of word matching to the user in the screen
    var displayWord = function(charArray) {
        charArray.toString();
    };

    // check if the user won
    var didWin = function(targetChars) {
        if (targetChars.length == 0) 
            return true;
        else 
            return false;
    };

    // check if game done
    var chceckGameOver = function checkGameOver(play) {
        if ($.inArray("*", play) == -1) {
            return true;
        }
        else {
            return false;
        }
    };

    // display game progress
var displayGameProgress = function(selector, wordLength, divValues) {
    selector.empty();
    for (var i = 0; i < wordLength; i++) {
        var cell = $("<div></div>")
                        .text(divValues[i])
                        .css({"display": "inline-block", "text-align":"center","vertical-align":"middle" })
                        .css({"width": "3rem", "height": "4rem", "border-bottom": "2px solid Whitesmoke"})
                        .css({"padding":".6rem 0.05rem", "margin": ".2rem" });
        selector.append(cell);
        //wordProgress[i] = cell.text();
    };n
};

    return {
        userGame: userGame,
        gameStats: gameStats,
        getWord: getWord,
        getCharArray: getCharArray,
        isCorrect: isCorrect,
        removeChar: removeChar,
        initializePlaceHolder: initializePlaceHolder,
        displayWord: displayWord,
        displayGameProgress: displayGameProgress,
        didWin: didWin,
        checkGameOver: chceckGameOver
    }

})();

// module.exports = hangmanLib();