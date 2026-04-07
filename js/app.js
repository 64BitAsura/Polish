/**
 * Polish Declination Teaching Tool
 * Interactive learning and quiz application for building muscle memory.
 */

(function () {
  "use strict";

  /* ── State ─────────────────────────────────────────────────── */
  let currentView = "home";
  let currentCaseIndex = 0;
  let quizState = null;

  const QUIZ_LENGTH = 10;

  /* ── DOM helpers ───────────────────────────────────────────── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  function show(id) {
    $$(".view").forEach((v) => v.classList.remove("active"));
    $(`#${id}`).classList.add("active");
    currentView = id;
    window.scrollTo(0, 0);
  }

  /* ── Navigation ────────────────────────────────────────────── */
  function initNav() {
    $$("#nav-home").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        renderHome();
      })
    );

    $$("#nav-learn").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        renderLearnMenu();
      })
    );

    $$("#nav-practice").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        renderPracticeMenu();
      })
    );

    $$("#nav-reference").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        renderReference();
      })
    );
  }

  /* ── Home ──────────────────────────────────────────────────── */
  function renderHome() {
    const stats = getStats();
    const totalAttempts = stats.totalAttempts || 0;
    const totalCorrect = stats.totalCorrect || 0;
    const pct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    const html = `
      <div class="hero">
        <h1>🇵🇱 Polish Declination Trainer</h1>
        <p class="subtitle">Master the 7 Polish grammatical cases through interactive learning and practice.</p>
      </div>
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">${totalAttempts}</span>
          <span class="stat-label">Questions Attempted</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${pct}%</span>
          <span class="stat-label">Accuracy</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${stats.streak || 0}</span>
          <span class="stat-label">Best Streak</span>
        </div>
      </div>
      <div class="home-actions">
        <button class="btn btn-primary btn-large" id="home-learn">📖 Learn Cases</button>
        <button class="btn btn-accent btn-large" id="home-practice">✏️ Practice Quiz</button>
        <button class="btn btn-secondary btn-large" id="home-reference">📋 Quick Reference</button>
      </div>
      <div class="case-overview">
        <h2>The 7 Polish Cases</h2>
        <div class="case-grid">
          ${CASES.map(
            (c) => `
            <div class="case-card-mini" style="border-left: 4px solid ${c.color}">
              <strong>${c.name}</strong> <span class="case-en">(${c.nameEn})</span>
              <div class="case-question">${c.question}</div>
            </div>
          `
          ).join("")}
        </div>
      </div>
    `;

    $("#home-view").innerHTML = html;
    show("home-view");

    $("#home-learn").addEventListener("click", renderLearnMenu);
    $("#home-practice").addEventListener("click", renderPracticeMenu);
    $("#home-reference").addEventListener("click", renderReference);
  }

  /* ── Learn Menu ────────────────────────────────────────────── */
  function renderLearnMenu() {
    const html = `
      <h1>📖 Learn Polish Cases</h1>
      <p>Select a case to study its rules, endings, and example sentences.</p>
      <div class="case-grid-learn">
        ${CASES.map(
          (c, i) => `
          <button class="case-card-learn" data-index="${i}" style="--accent: ${c.color}">
            <div class="case-number">${c.number}</div>
            <div class="case-name">${c.name}</div>
            <div class="case-name-en">${c.nameEn}</div>
            <div class="case-q">${c.question}</div>
          </button>
        `
        ).join("")}
      </div>
    `;

    $("#learn-view").innerHTML = html;
    show("learn-view");

    $$(".case-card-learn").forEach((el) =>
      el.addEventListener("click", () => {
        currentCaseIndex = parseInt(el.dataset.index, 10);
        renderCaseLesson(currentCaseIndex);
      })
    );
  }

  /* ── Case Lesson ───────────────────────────────────────────── */
  function renderCaseLesson(idx) {
    const c = CASES[idx];
    const examples = NOUNS.map((n) => ({
      word: n.word,
      english: n.english,
      gender: n.genderLabel,
      nominative: n.forms[0],
      form: n.forms[idx],
      sentence: n.sentences[idx],
    }));

    const html = `
      <div class="lesson-header" style="--accent: ${c.color}">
        <button class="btn btn-secondary btn-small back-btn" id="back-to-learn">← Back</button>
        <h1>${c.number}. ${c.name} <span class="case-en-title">(${c.nameEn})</span></h1>
        <div class="case-question-large">${c.question} — ${c.questionEn}</div>
      </div>

      <div class="lesson-body">
        <section class="lesson-section">
          <h2>📝 Description</h2>
          <p>${c.description}</p>
        </section>

        <section class="lesson-section">
          <h2>🎯 When to Use</h2>
          <ul class="usage-list">
            ${c.usage.map((u) => `<li>${u}</li>`).join("")}
          </ul>
        </section>

        <section class="lesson-section">
          <h2>📐 Ending Rules</h2>
          <div class="rules-grid">
            <div class="rule-card masculine">
              <h3>♂ Masculine</h3>
              <p>${c.rules.masculine}</p>
            </div>
            <div class="rule-card feminine">
              <h3>♀ Feminine</h3>
              <p>${c.rules.feminine}</p>
            </div>
            <div class="rule-card neuter">
              <h3>⚲ Neuter</h3>
              <p>${c.rules.neuter}</p>
            </div>
          </div>
        </section>

        <section class="lesson-section">
          <h2>📚 Examples</h2>
          <div class="examples-table-wrap">
            <table class="examples-table">
              <thead>
                <tr>
                  <th>Noun (${CASE_NAMES[0]})</th>
                  <th>Gender</th>
                  <th>${c.name} form</th>
                  <th>Example Sentence</th>
                </tr>
              </thead>
              <tbody>
                ${examples
                  .map(
                    (ex) => `
                  <tr>
                    <td><strong>${ex.nominative}</strong> <span class="en">(${ex.english})</span></td>
                    <td><span class="gender-badge ${ex.gender.split(" ")[0]}">${ex.gender}</span></td>
                    <td class="form-highlight">${ex.form}</td>
                    <td class="sentence">${ex.sentence}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </section>

        <section class="lesson-section">
          <h2>🧠 Quick Practice</h2>
          <p>Test your knowledge of ${c.name} with a focused quiz.</p>
          <button class="btn btn-accent" id="quick-practice-btn">Practice ${c.name} →</button>
        </section>

        <div class="lesson-nav">
          ${idx > 0 ? `<button class="btn btn-secondary" id="prev-case">← ${CASES[idx - 1].name}</button>` : "<span></span>"}
          ${idx < CASES.length - 1 ? `<button class="btn btn-secondary" id="next-case">${CASES[idx + 1].name} →</button>` : "<span></span>"}
        </div>
      </div>
    `;

    $("#learn-view").innerHTML = html;
    show("learn-view");

    $("#back-to-learn").addEventListener("click", renderLearnMenu);

    const prevBtn = $("#prev-case");
    const nextBtn = $("#next-case");
    if (prevBtn) prevBtn.addEventListener("click", () => renderCaseLesson(idx - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => renderCaseLesson(idx + 1));

    $("#quick-practice-btn").addEventListener("click", () => startQuiz([idx]));
  }

  /* ── Practice Menu ─────────────────────────────────────────── */
  function renderPracticeMenu() {
    const html = `
      <h1>✏️ Practice Quiz</h1>
      <p>Choose which cases to practice. Build muscle memory through repetition!</p>

      <div class="practice-options">
        <div class="option-group">
          <h2>Quick Modes</h2>
          <div class="practice-buttons">
            <button class="btn btn-primary btn-large" id="quiz-all">All Cases Mix</button>
            <button class="btn btn-accent btn-large" id="quiz-random">Random 10</button>
          </div>
        </div>

        <div class="option-group">
          <h2>Practice by Case</h2>
          <div class="practice-buttons">
            ${CASES.map(
              (c, i) =>
                `<button class="btn btn-outline case-quiz-btn" data-cases="${i}" style="--accent: ${c.color}">${c.name}</button>`
            ).join("")}
          </div>
        </div>

        <div class="option-group">
          <h2>Practice by Gender</h2>
          <div class="practice-buttons">
            <button class="btn btn-outline gender-quiz-btn" data-gender="masculine">♂ Masculine</button>
            <button class="btn btn-outline gender-quiz-btn" data-gender="feminine">♀ Feminine</button>
            <button class="btn btn-outline gender-quiz-btn" data-gender="neuter">⚲ Neuter</button>
          </div>
        </div>
      </div>
    `;

    $("#practice-view").innerHTML = html;
    show("practice-view");

    $("#quiz-all").addEventListener("click", () => startQuiz([0, 1, 2, 3, 4, 5, 6]));
    $("#quiz-random").addEventListener("click", () => startQuiz([0, 1, 2, 3, 4, 5, 6]));

    $$(".case-quiz-btn").forEach((el) =>
      el.addEventListener("click", () => {
        const cases = el.dataset.cases.split(",").map(Number);
        startQuiz(cases);
      })
    );

    $$(".gender-quiz-btn").forEach((el) =>
      el.addEventListener("click", () => {
        startQuiz([0, 1, 2, 3, 4, 5, 6], el.dataset.gender);
      })
    );
  }

  /* ── Quiz Engine ───────────────────────────────────────────── */
  function generateQuestions(caseIndices, genderFilter) {
    const questions = [];
    const filteredNouns = genderFilter
      ? NOUNS.filter((n) => n.gender === genderFilter)
      : NOUNS;

    // Skip nominative (index 0) for quiz questions since it's the base form
    const quizCases = caseIndices.filter((i) => i !== 0);
    if (quizCases.length === 0) {
      // If only nominative was selected, use all other cases
      quizCases.push(1, 2, 3, 4, 5, 6);
    }

    for (const noun of filteredNouns) {
      for (const ci of quizCases) {
        questions.push({
          noun: noun,
          caseIndex: ci,
          caseName: CASE_NAMES[ci],
          caseNameEn: CASE_NAMES_EN[ci],
          question: CASES[ci].question,
          correctAnswer: noun.forms[ci],
          sentence: noun.sentences[ci],
        });
      }
    }

    // Shuffle
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions.slice(0, QUIZ_LENGTH);
  }

  function startQuiz(caseIndices, genderFilter) {
    const questions = generateQuestions(caseIndices, genderFilter);

    quizState = {
      questions: questions,
      currentIndex: 0,
      score: 0,
      answers: [],
      streak: 0,
      maxStreak: 0,
    };

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const progress = quizState.currentIndex + 1;
    const total = quizState.questions.length;
    const pct = Math.round((progress / total) * 100);

    const html = `
      <div class="quiz-container">
        <div class="quiz-header">
          <div class="quiz-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${pct}%"></div>
            </div>
            <span>${progress} / ${total}</span>
          </div>
          <div class="quiz-score">
            Score: ${quizState.score} | Streak: ${quizState.streak} 🔥
          </div>
        </div>

        <div class="quiz-question">
          <div class="quiz-case-badge" style="background: ${CASES[q.caseIndex].color}">
            ${q.caseName} (${q.caseNameEn})
          </div>
          <div class="quiz-prompt">
            <p class="quiz-instruction">Decline the noun <strong>"${q.noun.word}"</strong> <span class="en">(${q.noun.english})</span> into:</p>
            <p class="quiz-case-name">${q.caseName} — ${q.question}</p>
          </div>
          <div class="quiz-input-area">
            <input type="text" id="quiz-input" class="quiz-text-input"
                   placeholder="Type the declined form..." autocomplete="off" autofocus
                   lang="pl" spellcheck="false">
            <button class="btn btn-primary" id="quiz-submit">Check ✓</button>
          </div>
          <div id="quiz-feedback" class="quiz-feedback hidden"></div>
          <div class="quiz-hint">
            <button class="btn btn-ghost btn-small" id="quiz-show-hint">💡 Show Hint</button>
            <div id="quiz-hint-text" class="hidden">
              <p class="hint-text">Gender: <strong>${q.noun.genderLabel}</strong></p>
              <p class="hint-text">Rule: ${CASES[q.caseIndex].rules[q.noun.gender]}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    $("#practice-view").innerHTML = html;
    show("practice-view");

    const input = $("#quiz-input");
    const submitBtn = $("#quiz-submit");

    input.focus();

    const handleSubmit = () => {
      const userAnswer = input.value.trim().toLowerCase();
      if (!userAnswer) return;
      checkAnswer(userAnswer, q);
    };

    submitBtn.addEventListener("click", handleSubmit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSubmit();
    });

    $("#quiz-show-hint").addEventListener("click", () => {
      $("#quiz-hint-text").classList.toggle("hidden");
    });
  }

  function checkAnswer(userAnswer, question) {
    const correct = userAnswer === question.correctAnswer.toLowerCase();
    const feedbackEl = $("#quiz-feedback");
    const input = $("#quiz-input");

    if (correct) {
      quizState.score++;
      quizState.streak++;
      if (quizState.streak > quizState.maxStreak) {
        quizState.maxStreak = quizState.streak;
      }
      feedbackEl.innerHTML = `
        <div class="feedback-correct">
          ✅ Correct! <strong>${question.correctAnswer}</strong>
          <p class="feedback-sentence">${question.sentence}</p>
        </div>
      `;
      feedbackEl.classList.remove("hidden");
      input.classList.add("input-correct");
    } else {
      quizState.streak = 0;
      feedbackEl.innerHTML = `
        <div class="feedback-wrong">
          ❌ Not quite. The correct answer is: <strong>${question.correctAnswer}</strong>
          <p>You answered: <em>${userAnswer}</em></p>
          <p class="feedback-sentence">${question.sentence}</p>
        </div>
      `;
      feedbackEl.classList.remove("hidden");
      input.classList.add("input-wrong");
    }

    quizState.answers.push({
      question: question,
      userAnswer: userAnswer,
      correct: correct,
    });

    input.disabled = true;
    $("#quiz-submit").disabled = true;

    // Update score display
    $(".quiz-score").textContent =
      `Score: ${quizState.score} | Streak: ${quizState.streak} 🔥`;

    // Show next button
    const nextHtml = quizState.currentIndex < quizState.questions.length - 1
      ? `<button class="btn btn-primary btn-large" id="quiz-next">Next Question →</button>`
      : `<button class="btn btn-accent btn-large" id="quiz-finish">See Results 🏆</button>`;

    feedbackEl.insertAdjacentHTML("beforeend", `<div class="feedback-actions">${nextHtml}</div>`);

    const nextBtn = $("#quiz-next");
    const finishBtn = $("#quiz-finish");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        quizState.currentIndex++;
        renderQuizQuestion();
      });
      nextBtn.focus();
    }
    if (finishBtn) {
      finishBtn.addEventListener("click", renderQuizResults);
      finishBtn.focus();
    }
  }

  function renderQuizResults() {
    const total = quizState.questions.length;
    const score = quizState.score;
    const pct = Math.round((score / total) * 100);

    // Save stats
    saveStats(total, score, quizState.maxStreak);

    let emoji, message;
    if (pct === 100) {
      emoji = "🏆";
      message = "Perfect score! You're mastering Polish declination!";
    } else if (pct >= 80) {
      emoji = "🌟";
      message = "Great job! Keep practicing to reach perfection!";
    } else if (pct >= 60) {
      emoji = "👍";
      message = "Good effort! Review the cases you missed and try again.";
    } else {
      emoji = "💪";
      message = "Keep going! Practice makes perfect. Review the lessons and try again.";
    }

    const html = `
      <div class="results-container">
        <div class="results-header">
          <div class="results-emoji">${emoji}</div>
          <h1>Quiz Complete!</h1>
          <p class="results-message">${message}</p>
        </div>

        <div class="results-stats">
          <div class="result-stat">
            <span class="result-number">${score}/${total}</span>
            <span class="result-label">Correct</span>
          </div>
          <div class="result-stat">
            <span class="result-number">${pct}%</span>
            <span class="result-label">Accuracy</span>
          </div>
          <div class="result-stat">
            <span class="result-number">${quizState.maxStreak}</span>
            <span class="result-label">Best Streak</span>
          </div>
        </div>

        <div class="results-detail">
          <h2>Review Answers</h2>
          <div class="answer-list">
            ${quizState.answers
              .map(
                (a, i) => `
              <div class="answer-item ${a.correct ? "correct" : "wrong"}">
                <div class="answer-number">${i + 1}</div>
                <div class="answer-body">
                  <div class="answer-question">
                    <strong>${a.question.noun.word}</strong> → ${a.question.caseName}
                  </div>
                  <div class="answer-detail">
                    ${
                      a.correct
                        ? `✅ <strong>${a.question.correctAnswer}</strong>`
                        : `❌ Your answer: <em>${a.userAnswer}</em> → Correct: <strong>${a.question.correctAnswer}</strong>`
                    }
                  </div>
                  <div class="answer-sentence">${a.question.sentence}</div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="results-actions">
          <button class="btn btn-primary btn-large" id="results-retry">🔄 Try Again</button>
          <button class="btn btn-secondary btn-large" id="results-learn">📖 Review Lessons</button>
          <button class="btn btn-secondary btn-large" id="results-home">🏠 Home</button>
        </div>
      </div>
    `;

    $("#practice-view").innerHTML = html;
    show("practice-view");

    $("#results-retry").addEventListener("click", renderPracticeMenu);
    $("#results-learn").addEventListener("click", renderLearnMenu);
    $("#results-home").addEventListener("click", renderHome);
  }

  /* ── Reference ─────────────────────────────────────────────── */
  function renderReference() {
    const html = `
      <h1>📋 Quick Reference Table</h1>
      <p>Complete declination table for all example nouns across all 7 cases.</p>

      <div class="reference-controls">
        <label>Filter by gender:
          <select id="ref-gender-filter">
            <option value="all">All genders</option>
            <option value="masculine">Masculine</option>
            <option value="feminine">Feminine</option>
            <option value="neuter">Neuter</option>
          </select>
        </label>
      </div>

      <div id="reference-tables"></div>
    `;

    $("#reference-view").innerHTML = html;
    show("reference-view");

    const renderTables = (genderFilter) => {
      const filtered =
        genderFilter === "all"
          ? NOUNS
          : NOUNS.filter((n) => n.gender === genderFilter);

      const tablesHtml = filtered
        .map(
          (noun) => `
        <div class="ref-noun-card">
          <h3>${noun.word} <span class="en">(${noun.english})</span>
            <span class="gender-badge ${noun.gender}">${noun.genderLabel}</span>
          </h3>
          <table class="ref-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Question</th>
                <th>Form</th>
              </tr>
            </thead>
            <tbody>
              ${CASES.map(
                (c, i) => `
                <tr>
                  <td style="border-left: 3px solid ${c.color}">
                    <strong>${c.name}</strong> <span class="case-en">(${c.nameEn})</span>
                  </td>
                  <td>${c.question}</td>
                  <td class="form-highlight">${noun.forms[i]}</td>
                </tr>
              `
              ).join("")}
            </tbody>
          </table>
        </div>
      `
        )
        .join("");

      $("#reference-tables").innerHTML = tablesHtml;
    };

    renderTables("all");
    $("#ref-gender-filter").addEventListener("change", (e) => renderTables(e.target.value));
  }

  /* ── Persistence ───────────────────────────────────────────── */
  function getStats() {
    try {
      return JSON.parse(localStorage.getItem("polishDeclStats") || "{}");
    } catch {
      return {};
    }
  }

  function saveStats(attempted, correct, streak) {
    const stats = getStats();
    stats.totalAttempts = (stats.totalAttempts || 0) + attempted;
    stats.totalCorrect = (stats.totalCorrect || 0) + correct;
    if (!stats.streak || streak > stats.streak) {
      stats.streak = streak;
    }
    localStorage.setItem("polishDeclStats", JSON.stringify(stats));
  }

  /* ── Init ──────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    renderHome();
  });
})();
