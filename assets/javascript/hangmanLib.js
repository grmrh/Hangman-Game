/*
* bring in the pre-defined words appear in the game
*/

var myLib = function() {

// planets
function themeWords() {
    return  {
        gameTheme: "planet",
         planets: ["neptune", "jupiter", "mars", "saturn", "uranus", "venus", "mercury", "earth" ],
         numberOfWords: 8
     };
}

// create an object per user and per game
var userGame =  {
    targetWord: '', 
    triedCharacters:  [], 
    correctCount: 0,
    wrongCount: 0,
    tillCorrectCount:  this.correctCount + this.wrongCount,
    userName: ''
}

// singleton
var gameStats = {
    userName:'',
    userGameHistory: [ ], 
    numberOfWins: 0,
    numberOfLossses: 0, 
    averageNumberOfAttemptPerGram: 0, 
    totalNumberOfPlay:  this.numberOfWins + this.numberOfLosses, 
    averageOnGames: 0.00
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

// javascript array.find(callback fuction)  returns the first element found in the array
// determin if the user answer is correct
function isCorrect(charTry, targetChars) {
    if (targetChars.find(function(e){return e === charTry;})) 
        return true;
    else
        return false;
}

// remove the first character from the input char array
function removeChar(correctChar, targetChars) {
    var ind = targetChars.indexOf(correctChar);
    // return the array that removed correctChar element
    return targetChars.splice(ind, 1);
}

// get the character place holder initialized by input default char
function initializePlaceHolder(defaultChar, numberOfChars, placeHolder) {
    // var placeHolder = [];
    for (var i = 1; i < numberOfChars ; i++) {
        placeHolder.add(defaultChar);
    }
    return placeHolder;
}

// show the progress of word matching to the user in the screen
function displayWord(charArray) {
    charArray.toString();
}

// check if the user won
function didWin(targetChars) {
    if (targetChars.length == 0) 
        return true;
    else 
        return false;
}

}();

//module.exports = myLib;