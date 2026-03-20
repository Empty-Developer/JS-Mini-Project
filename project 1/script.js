// DOM Element

const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const resultScreen = document.getElementById('result-screen')
const startButton = document.getElementById('start-btn')
const questionText = document.getElementById('question-text')
const answersContainer = document.getElementById('answers-container')
const currentQuestionSpan = document.getElementById('current-question')
const scoreSpan = document.getElementById('score')
const totalQuestionsSpan = document.getElementById('total-questions')
const finalScoreSpan = document.getElementById('final-score')
const maxScoreSpan = document.getElementById('max-score')
const resultMessage = document.getElementById('result-message')
const restartButton = document.getElementById('restart-btn')
const progressBar = document.getElementById('progress')

const quizQuestions = [
    {
        question: 'Choose the correct form: She _____ English for 5 years.',
        answers: [
            {text: 'study', correct: false},
            {text: 'is studying', correct: false},
            {text: 'has been studying', correct: true},
            {text: 'studies', correct: false},
        ],
    },
    {
        question: 'Choose the correct article: _____ Amazon is the longest river in the world.',
        answers: [
            {text: 'A', correct: false},
            {text: 'An', correct: false},
            {text: 'The', correct: true},
            {text: 'No article', correct: false},
        ],
    },
    {
        question: 'Choose the correct preposition: I`m interested _____ learning Japanese.',
        answers: [
            {text: 'on', correct: false},
            {text: 'at', correct: false},
            {text: 'for', correct: false},
            {text: 'in', correct: true},
        ],
    },
    {
        question: 'Choose the correct modal verb: You _____ smoke here. It`s prohibited.',
        answers: [
            {text: 'mustn`t', correct: true},
            {text: 'don`t have to', correct: false},
            {text: 'shouldn`t', correct: false},
            {text: 'can`t', correct: false},
        ],
    },
    {
        question: 'Choose the correct phrasal verb: Please _____ the music. It`s too loud.',
        answers: [
            {text: 'turn on', correct: false},
            {text: 'turn off', correct: false},
            {text: 'turn up', correct: false},
            {text: 'turn down', correct: true},
        ],
    },
]

// quiz state vars
let currentQuestionIndex = 0
let score = 0
let answersDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length
maxScoreSpan.textContent = quizQuestions.length

// event listeners

restartButton.addEventListener('click', restartQuiz)
startButton.addEventListener('click', startQuiz)

function startQuiz() {
    // reset vars
    currentQuestionIndex = 0
    score = 0
    scoreSpan.textContent = score

    startScreen.classList.remove('active')
    quizScreen.classList.add('active')

    showQuestion()
}

function showQuestion() {
    // reset state
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100
    progressBar.style.width = progressPercent + '%'
    // 50%

    questionText.textContent = currentQuestion.question

    // todo: explain this in a second
    answersContainer.innerHTML = ''

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.text
        button.classList.add('answer-btn')

        // dataset is save data user
        button.dataset.correct = answer.correct

        button.addEventListener('click', selectAnswer)

        answersContainer.appendChild(button)
    })
}

function selectAnswer(event) {
    // optimization check
    if (answersDisabled) return

    answersDisabled = true

    const selectedButton = event.target
    const isCorrect = selectedButton.dataset.correct === 'true'

    // todo: explain this in a sec
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct')
        } else {
            button.classList.add('incorrect')
        }
    })

    if (isCorrect) {
        score++
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++

        // check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults()
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove('active')
    resultScreen.classList.add('active')

    finalScoreSpan.textContent = score

    const percentage = (score/quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You`re a genius!"
    } 
    else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!"
    }
    else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!"
    }
    else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!"
    }
    else {
        resultMessage.textContent = "Keep studying! You`ll get better"
    }
}

function restartQuiz() {
    resultScreen.classList.remove('active')

    startQuiz()
}

