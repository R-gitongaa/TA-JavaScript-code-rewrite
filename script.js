const questionElement = document.getElementById('question')
const optionButtonsContainer = document.getElementById('optionButtons')
const nextButton = document.getElementById('next-button')
const quizData = [
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correctAnswer: "4",
    },
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
    },
    {question: "Which is the largest city in the world?",
    answers: ["Tokyo", "Madrid", "Paris", "Rome", "New York"],
    correctAnswer: "Tokyo",
},
];

let currentQuestionIndex = 0
let score = 0
// create an element to store the next question
const nextQuestionElement = document.createElement('div')
// load a question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question
    optionButtonsContainer.innerHTML = '' // clear previous content
    currentQuestion.answers.forEach((answer) => {
        const optionButton = document.createElement('input') // create a radio button for each answer
        optionButton.type = 'radio'
        optionButton.name = 'option'
        optionButton.value = answer

        let label = document.createElement('label') //create a paragraph label to act as placeholder for the answer
        label.textContent = answer
        // listen only once for a click on an answer
        optionButton.addEventListener('click', () => {
            checkAnswer(answer, label)
        }, {once: true});
        // qppend the button the label and break to newline for each answer
        optionButtonsContainer.appendChild(optionButton)
        optionButtonsContainer.appendChild(label)
        optionButtonsContainer.appendChild(document.createElement('br'))
        
    });
    document.body.appendChild(nextQuestionElement) //   // Append the next question element to the DOM below the optionButtonsContainer element

}
//check answer function
function checkAnswer(selectedAnswer, label) {
    const currentQuestion = quizData[currentQuestionIndex]
    const correctAnswer = currentQuestion.correctAnswer
    // disable option button when the user makes a choice
    const optionButtons = optionButtonsContainer.querySelectorAll('input[name="option"]');
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    // change border color of answer depending on answer
    if(selectedAnswer === correctAnswer) {
        score++
        label.style.border = '2px solid green'
    }
    else {
        label.style.border = '2px solid red'
    }
}

function nextQuestion() {
    currentQuestionIndex ++;
    if(currentQuestionIndex < quizData.length) {
        document.body.removeChild(nextQuestionElement) //remove the next question element from the DOM and load the  next question
        loadQuestion()
    }
    else {
        const scores = document.getElementById('scores')
        scores.textContent = score
        scores.innerHTML = `your score: ${score}/${quizData.length}`
    }
}
loadQuestion()
nextButton.addEventListener('click', nextQuestion)

