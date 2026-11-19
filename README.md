# Milestone 4: A Three-Question Quiz (TASK-FSD-03)

**Revision**: `beginner-20261028`  
**Repository**: [https://github.com/Viru-45/intership3.git](https://github.com/Viru-45/intership3.git)  

A clean, accessible, and responsive single-page quiz application that reads an array of questions, presents choices dynamically, enforces single-answer evaluation per question with instant visual feedback, and computes the final score out of three upon completion.

---

## Required Checks & Implementation Status

- [x] **Required check 1: Read the provided question array.**
  - Consumed the starter `questions` dataset with structured objects containing question text, array of choices, and correct zero-based answer indices.
- [x] **Required check 2: Show one question and its answer buttons.**
  - Displayed the current question text in `h2#question`.
  - Dynamically created accessible button elements in `#answers` using `textContent` for secure DOM injection.
- [x] **Required check 3: Count each question only once and show correct/incorrect text.**
  - State flag `answered` locks evaluation immediately after the user's first choice.
  - Buttons are disabled upon click to prevent double-counting or score inflation.
  - Informative feedback displayed in `#feedback` (`role="status"`, `aria-live="assertive"`) highlighting whether the choice was correct or what the correct answer was.
- [x] **Required check 4: Show the score out of three after the final answer.**
  - Advancing from the final question renders the quiz completion view with final score displayed in `#score` (`Your final score: X out of 3`).
- [x] **Optional Stretch Features Implemented**:
  - **Restart Quiz**: Added a `#restart` button allowing users to replay without reloading the page.
  - **Progress Tracking**: Added dynamic progress bar and "Question X of 3" indicator.
  - **Responsive & Accessible Design**: High-contrast states, clear keyboard focus indicators, and mobile-friendly touch targets.

---

## Test Notes & Verification

### 1. Ordinary Case (Perfect Run: 3 / 3)
- **Question 1**: *"Which tag is a heading?"* -> Selected `h1`. Feedback: `Correct!`, Score: `1/3`.
- **Question 2**: *"Which language styles a page?"* -> Selected `CSS`. Feedback: `Correct!`, Score: `2/3`.
- **Question 3**: *"How many days in a week?"* -> Selected `7`. Feedback: `Correct!`, Score: `3/3`.
- **Final Result**: `"Your final score: 3 out of 3"`.

### 2. Mixed-Answer Run (Score: 2 / 3)
- **Question 1**: *"Which tag is a heading?"* -> Selected `h1`. Feedback: `Correct!`.
- **Question 2**: *"Which language styles a page?"* -> Selected `SQL`. Feedback: `"Incorrect. The correct answer was: CSS"`. Score remained `1/3`.
- **Question 3**: *"How many days in a week?"* -> Selected `7`. Feedback: `Correct!`.
- **Final Result**: `"Your final score: 2 out of 3"`.

### 3. Boundary & Validation Case (Advance Without Answering)
- **Action**: Clicked "Next" button prior to choosing any option.
- **Result**: The question did not advance. Warning feedback displayed: `"Please choose an answer before proceeding."`.

### 4. Restart Functionality
- **Action**: Clicked "Restart Quiz" after completion.
- **Result**: Reset `index = 0`, `score = 0`, and `answered = false`, resetting DOM to Question 1 cleanly.

---

## Key Technical Decisions & Design

1. **Defensive Interaction Flow**:
   - Answer buttons are immediately disabled (`btn.disabled = true`) once a choice is selected, preventing rapid double-clicking or changing answers after seeing feedback.
2. **XSS Protection**:
   - All text rendering uses `.textContent` rather than `.innerHTML`, eliminating potential Cross-Site Scripting vulnerabilities.
3. **Inclusive Accessibility**:
   - Utilized semantic HTML (`<main>`, `<header>`, `<section>`, `<h2>`), live regions (`aria-live="polite"` and `aria-live="assertive"`), descriptive `aria-label` tags on buttons, and WCAG AA compliant color contrast ratios.

---

## Screenshots

- **Desktop View (Question 1)**: `screenshot-desktop.png`
- **Correct Feedback**: `screenshot-correct-answer.png`
- **Incorrect Feedback**: `screenshot-incorrect-answer.png`
- **Validation Warning**: `screenshot-validation-warning.png`
- **Perfect Score Run (3/3)**: `screenshot-perfect-run.png`
- **Mixed Score Run (2/3)**: `screenshot-mixed-run.png`
