const question = [
    {
        question: "What is the capital of France?",
        answer: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "What is 2 + 3?",
        answer: [
            { text: "4", correct: false },
            { text: "5", correct: true },
            { text: "6", correct: false },
            { text: "7", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButton.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none"; 
    answerButton.innerHTML = '';
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    nextButton.style.display = "block";
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
    nextButton.addEventListener('click', startQuiz);
}

startQuiz();