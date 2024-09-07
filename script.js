// Define questions and correct answers
const questions = [
   
    { question: "", correctAnswer: "D" },
    { question: "", correctAnswer: "C" },
    { question: "", correctAnswer: "D" },
    { question: "", correctAnswer: "C" },
    { question: "", correctAnswer: "D" },
    { question: "", correctAnswer: "B" },
    { question: "", correctAnswer: "D" },
    { question: "", correctAnswer: "C" },
    { question: "", correctAnswer: "B" },
    { question: "", correctAnswer: "B" },
    { question: "", correctAnswer: "C" },
    { question: "", correctAnswer: "B" },
    { question: "", correctAnswer: "C" },
    { question: "", correctAnswer: "C" },
    { question: "", correctAnswer: "A" },
    


   
];

function submitQuiz() {
    let correctAnswers = 0;
    const totalQuestions = questions.length;

    // Calculate score
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selectedOption && selectedOption.value === questions[index].correctAnswer) {
            correctAnswers++;
        }
    });

    // Calculate percentage
    const percentage = (correctAnswers / totalQuestions) * 100;

    // Show results section
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    updateResults(correctAnswers, totalQuestions, percentage);
}

function updateResults(correctAnswers, totalQuestions, percentage) {
    // Update score and percentage circle
    document.getElementById('score-label').textContent = `Your Score: ${correctAnswers}/${totalQuestions}`;
    updateCircle(percentage);
}

// Update the progress circle based on percentage
function updateCircle(percentage) {
    const circle = document.getElementById('percentage-circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius; // Correct formula for circumference

    // Set the stroke-dasharray to the circumference
    circle.style.strokeDasharray = circumference;
    // Calculate the offset
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Display the percentage in the center
    document.getElementById('percentage').textContent = `${Math.round(percentage)}%`;
}


function viewAnswers() {
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('detailed-results').classList.remove('hidden');
    showDetailedResults();
}

function showDetailedResults() {
    const correctAnswers = {
        q1: 'A',
        q2: 'B'
    };

    const resultContainer = document.getElementById('detailed-results');
    resultContainer.innerHTML = '<h2>Quiz Review</h2>';
    
    questions.forEach((question, index) => {
        const questionBlock = document.querySelector(`.question-block[data-question="${index + 1}"]`);
        const labels = questionBlock.querySelectorAll('label');
        
        labels.forEach(label => {
            const input = label.querySelector('input');
            if (input.checked) {
                if (input.value === question.correctAnswer) {
                    label.classList.add('correct-answer');
                } else {
                    label.classList.add('wrong-answer');
                }
            }
        });
        
        // Display the correct answer with a green background if not selected
        const correctLabel = Array.from(labels).find(label => label.querySelector('input').value === question.correctAnswer);
        if (correctLabel) {
            correctLabel.classList.add('correct-answer');
        }
        
        // Append the question block to the results section
        resultContainer.innerHTML += `
            <div class="detailed-result">
                <p class="question">${question.question}</p>
                ${questionBlock.innerHTML}
            </div>
        `;
    });
}
