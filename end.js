const finalScore = document.querySelector('#finalScore');
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// A common use of JSON is to exchange data to/from a web server.
// When receiving data from a web server, the data is always a string.
// Parse the data with JSON.parse(), and the data becomes a JavaScript object.
// get storage 'highScores'. If not there, then return get empty Array/Objekt []
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;

// overwrite finalScore with mostRecentScore
finalScore.innerText = mostRecentScore;

// The onkeyup event occurs when the user releases a key (on the keyboard).
username.addEventListener('keyup', () => {
    // by "" (empty string) -> !falsy -> true -> disabled = true
    // by string -> !true -> false -> disabled = false
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    // e.g. Clicking on a "Submit" button, prevent it from submitting a form (type="submit" onclick="saveHighScore(event))
    e.preventDefault();

    // save score and name in object
    const score = {
        score: mostRecentScore,
        name: username.value
    };

    // The push() method adds new items to the end of an array, and returns the new length.
    highScores.push(score);

    // The sort() method sorts the items of an array.
    // array.sort(compareFunction) -> function(a, b){return a-b}
    // When the sort() method compares two values, it sends the values to the compare function, and sorts the values according to the returned 
    // (negative, zero, positive) value.
    /* Example:     When comparing 40 and 100, the sort() method calls the compare function(40,100).
                    The function calculates 40-100, and returns -60 (a negative value).
                    The sort function will sort 40 as a value lower than 100. */
    highScores.sort((a, b) => {
        // sorted in descending order (absteigen nach score)
        return b.score - a.score;
    });

    // beginnend ab der Stelle 5 (Zählung beginnt bei Null!) werden alle Elemente gelöscht
    highScores.splice(5);

    // When sending data to a web server, the data has to be a string.
    // Convert a JavaScript object into a string with JSON.stringify().
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/highscore.html');
};