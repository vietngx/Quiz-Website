/* querySelector gibt das erste Element innerhalb eines Dokuments zurück, welches dem angegebenen Selektor bzw. Selektoren entspricht. 
Wurden keine Übereinstimmungen gefunden wird null zurückgegeben. */
const question = document.querySelector('#question');
// Get all elements in the document with class="example" & put in an Array
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}; // leeres Objekt
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questions
let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<scripting>",
        choice2: "<script>",
        choice3: "<javascript>",
        choice4: "<js>",
        answer: 2,
    },    
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below? \n <p id= \"demo\" >This is a demonstration.</p>",
        choice1: "document.getElementByName(\"p\").innerHTML = \"Hello World!\";",
        choice2: "document.getElement(\"p\").innerHTML = \"Hello World!\";",
        choice3: "document.getElementById(\"demo\").innerHTML = \"Hello World!\";",
        choice4: "#demo.innerHTML = \"Hello World!\";",
        answer: 3,
    }, 
    {
        question: "Where is the correct place to insert a JavaScript?",
        choice1: "The <body> section",
        choice2: "The <head> section",
        choice3: "Both the <head> section and the <body> section are correct",
        choice4: "None of the sections",
        answer: 3,
    }, 
    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        choice1: "<script src=\"xxx.js\">",
        choice2: "<script href=\"xxx.js\">",
        choice3: "<script name=\"xxx.js\">",
        choice4: "<script file=\"xxx.js\">",
        answer: 1,
    },  
    {
        question: "How do you write \"Hello World\" in an alert box?",
        choice1: "alertBox(\"Hello World\");",
        choice2: "alert(\"Hello World\");",
        choice3: "msg(\"Hello World\");",
        choice4: "msgBox(\"Hello World\");",
        answer: 2,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // spread-syntax
    getNewQuestion();
}

getNewQuestion = () => {
    // Ende des Spiels 
    if (questionCounter > MAX_QUESTIONS || availableQuestions.length === 0) {
        // localStorage des window-Objekts stellt Ihnen ein Storage-Objekt zur Verfügung, in dem Sie Daten in Form von Key-Value Paaren speichern können.
        localStorage.setItem('mostRecentScore', score);
        // The window.location object can be used to get the current page address (URL) and to redirect the browser to a new page.
        return window.location.assign('/end.html'); // assign = loads a new document // Ausgabe End-Score in end.html
    }

    questionCounter++;
    // Anführungszeichen "" funktionieren hier nicht bei $
    progressText.innerText = `Frage ${questionCounter} von ${MAX_QUESTIONS}`;
    
    // update CSS style progressBar  // berechnet prozentualen Anteil erledigter Fragen
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // generate random index for Questions 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // get a Question with random index
    currentQuestion = availableQuestions[questionIndex];    
    // display question in document
    question.innerText = currentQuestion.question; // objectName.propertyName

    // The forEach() method calls a function once for each element in an array, in order.
    choices.forEach(choice => {
        const number = choice.dataset['number']; // get data-number from html document
        choice.innerText = currentQuestion['choice' + number] // currentQuestion['choice' + 1,2,3,4]
    })

    // delete Question from Array
    availableQuestions.splice(questionIndex, 1); // remove 1 element by index questionIndex

    acceptingAnswers = true;
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

choices.forEach(choice => {
    // when we click, then ...
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        // Die Eigenschaft Event.target zeigt das Element an, durch den das Ereignis ausgelöst wurde.
        // selectedChoice: Name des Elements durch das das Ereignis ausgelöst wurde.
        const selectedChoice = e.target;
        // get data-number from selectedChoice(.choice-text)
        const selectedAnswer = selectedChoice.dataset['number'];

        // if selectedAnswer == currentQuestion.answer then classToApply is 'correct' otherwise 'incorrect'
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // if correct then get score points
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        // get parent element(div .choice-container) from selectedChoice(p .choice-text)
        // add a class to parentElement (div .choice-container) of selectedChoice
        selectedChoice.parentElement.classList.add(classToApply);

        // delay of 1 second
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
    })
})



startGame();
