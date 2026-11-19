// Milestone 4: A three-question quiz
// Revision: beginner-20261028

const questions = [
  { text: 'Which tag is a heading?', choices: ['h1', 'p', 'div'], answer: 0 },
  { text: 'Which language styles a page?', choices: ['CSS', 'SQL', 'C++'], answer: 0 },
  { text: 'How many days in a week?', choices: ['5', '7', '9'], answer: 1 }
];

let index = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const progressBarEl = document.getElementById('progress-bar');
const progressTextEl = document.getElementById('progress-text');

function updateProgress() {
  if (progressBarEl) {
    const percentage = (index / questions.length) * 100;
    progressBarEl.style.width = `${percentage}%`;
    progressBarEl.setAttribute('aria-valuenow', String(Math.round(percentage)));
  }
  if (progressTextEl) {
    progressTextEl.textContent = `Question ${index + 1} of ${questions.length}`;
  }
}

function render() {
  const currentQ = questions[index];
  questionEl.textContent = currentQ.text;
  
  // Reset feedback
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  scoreEl.textContent = '';
  answered = false;

  updateProgress();

  // Clear existing buttons
  answersEl.innerHTML = '';

  // Configure navigation buttons
  nextBtn.hidden = false;
  nextBtn.disabled = false;
  nextBtn.textContent = index === questions.length - 1 ? 'Show Score' : 'Next';
  if (restartBtn) {
    restartBtn.hidden = true;
  }

  // Create answer buttons using textContent for security and accessibility
  currentQ.choices.forEach((choice, choiceIndex) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.setAttribute('aria-label', `Choice ${choiceIndex + 1}: ${choice}`);

    btn.addEventListener('click', () => {
      // Required check 3: Count each question only once
      if (answered) return;
      answered = true;

      const allButtons = answersEl.querySelectorAll('.choice-btn');
      allButtons.forEach((b, i) => {
        b.disabled = true;
        if (i === currentQ.answer) {
          b.classList.add('correct');
        }
      });

      if (choiceIndex === currentQ.answer) {
        score++;
        btn.classList.add('selected-correct');
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = 'feedback active feedback-correct';
      } else {
        btn.classList.add('selected-incorrect');
        const correctChoiceText = currentQ.choices[currentQ.answer];
        feedbackEl.textContent = `Incorrect. The correct answer was: ${correctChoiceText}`;
        feedbackEl.className = 'feedback active feedback-incorrect';
      }
    });

    answersEl.appendChild(btn);
  });
}

function showFinalResults() {
  if (progressBarEl) {
    progressBarEl.style.width = '100%';
    progressBarEl.setAttribute('aria-valuenow', '100');
  }
  if (progressTextEl) {
    progressTextEl.textContent = 'Quiz Completed!';
  }

  questionEl.textContent = 'Quiz Finished!';
  answersEl.innerHTML = '';
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  nextBtn.hidden = true;

  // Required check 4: Show score out of three after the final answer
  scoreEl.textContent = `Your final score: ${score} out of ${questions.length}`;
  scoreEl.className = 'score-display';

  if (restartBtn) {
    restartBtn.hidden = false;
  }
}

document.getElementById('next').onclick = () => {
  // Boundary check: require an answer before advancing
  if (!answered) {
    feedbackEl.textContent = 'Please choose an answer before proceeding.';
    feedbackEl.className = 'feedback active feedback-warning';
    return;
  }

  index++;
  if (index < questions.length) {
    render();
  } else {
    showFinalResults();
  }
};

if (restartBtn) {
  restartBtn.onclick = () => {
    index = 0;
    score = 0;
    answered = false;
    render();
  };
}

render();
