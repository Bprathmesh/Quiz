const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['script','css', 'style', 'span'],
        answer: 1, 
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 2,
    },
    {
        question: 'Which of the following is a programming language?',
        choices: ['HTML', 'CSS', 'JavaScript', 'XML'],
        answer: 2,
    }
    
];

let currentQuestion = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const progressElement = document.getElementById('progress-bar');
    const questionCountElement = document.getElementById('current-question');
    const scoreElement = document.getElementById('current-score');

    function loadQuestion() {
        const currentQ = questions[currentQuestion];

        questionElement.textContent = currentQ.question;
        choicesElement.innerHTML = ''; 

        currentQ.choices.forEach((choice, index) => {
            const button = document.createElement('div');
            button.classList.add('choice');
            button.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}</span><span class="option-text">${choice}</span>`;
            button.dataset.number = index;
            button.onclick = () => checkAnswer(index);
            choicesElement.appendChild(button);
        });

        questionCountElement.textContent = currentQuestion + 1; 
        updateProgressBar();
    }

    function checkAnswer(selectedChoice) {
        const correctAnswerIndex = questions[currentQuestion].answer;
        const selectedButton = choicesElement.querySelectorAll('.choice')[selectedChoice];

        if (selectedChoice === correctAnswerIndex) {
            score += 10;
            scoreElement.textContent = score;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            choicesElement.querySelectorAll('.choice')[correctAnswerIndex].classList.add('correct');
        }

        choicesElement.querySelectorAll('.choice').forEach(button => {
            button.onclick = null; 
        });

        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(() => {
                loadQuestion(); 
                updateProgressBar(); 
            }, 1000); 
        } else {
            setTimeout(() => {
                endQuiz();
            }, 1000); 
        }
    }

    function updateProgressBar() {
        const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
        progressElement.style.width = `${progressPercent}%`; 
    }

    function endQuiz() {
        window.location.href = `end.html?score=${score}`;
    }

    loadQuestion();
});
