# Milestone 4 Execution Summary

## Repository & App Link
- **Source Repository**: https://github.com/Viru-45/intership3.git

## Required Checks Verification
- **Required check 1: Read the provided question array.**
  - Read questions from `const questions` specifying question text, choice options, and zero-based answer indices.
- **Required check 2: Show one question and its answer buttons.**
  - Rendered `questions[index].text` into `#question` and dynamically generated choice buttons inside `#answers` with safe `textContent` and `aria-label`.
- **Required check 3: Count each question only once and show correct/incorrect text.**
  - Guarded interaction with an `answered` state flag and disabled choice buttons upon click. Displayed clear status messages: `"Correct!"` or `"Incorrect. The correct answer was: <text>"`.
- **Required check 4: Show the score out of three after the final answer.**
  - Displayed `"Your final score: X out of 3"` into `#score` upon quiz completion.

## Test Runs

### 1. Correct Run (Perfect Score: 3 / 3)
- **Question 1**: *"Which tag is a heading?"* -> Selected `h1` (Correct! +1 point, score: 1)
- **Question 2**: *"Which language styles a page?"* -> Selected `CSS` (Correct! +1 point, score: 2)
- **Question 3**: *"How many days in a week?"* -> Selected `7` (Correct! +1 point, score: 3)
- **Result**: Output displayed `Your final score: 3 out of 3`.

### 2. Mixed-Answer Run (Score: 2 / 3)
- **Question 1**: *"Which tag is a heading?"* -> Selected `h1` (Correct! +1 point, score: 1)
- **Question 2**: *"Which language styles a page?"* -> Selected `SQL` (Incorrect. The correct answer was: CSS. +0 points, score: 1)
- **Question 3**: *"How many days in a week?"* -> Selected `7` (Correct! +1 point, score: 2)
- **Result**: Output displayed `Your final score: 2 out of 3`.

### 3. Boundary / Validation Run
- **Action**: Attempted to click the "Next" button without selecting any answer choice.
- **Result**: Advanced blocked; feedback element alerted `"Please choose an answer before proceeding."`.

## Key Technical Decision
- **Single-Choice Enforcement & XSS Safety**: Utilized `btn.disabled = true` immediately upon option click to prevent multi-click score inflation, and built DOM elements strictly via `document.createElement` and `.textContent` rather than `innerHTML` to ensure complete protection against script injection.
