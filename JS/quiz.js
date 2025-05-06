// quiz.js
document.addEventListener('DOMContentLoaded', () => {
  // словари вопросов для каждого курса
const banks = {
  english: [
    { word: 'apple',       correct: true },
    { word: 'table',       correct: true },
    { word: 'undistrict',  correct: false },
    { word: 'frobnicate',  correct: false },
    { word: 'river',       correct: true },
    { word: 'gharnish',    correct: false },
    { word: 'cloud',       correct: true },
    { word: 'splonk',      correct: false },
    { word: 'bicycle',     correct: true },
    { word: 'cringlepop',  correct: false }
  ],
  turkish: [
    { word: 'merhaba',     correct: true },
    { word: 'elma',        correct: true },
    { word: 'blorf',       correct: false },
    { word: 'okul',        correct: true },
    { word: 'frinzak',     correct: false },
    { word: 'kitap',       correct: true },
    { word: 'snergle',     correct: false },
    { word: 'masa',        correct: true },
    { word: 'plurt',       correct: false },
    { word: 'şehir',       correct: true }
  ],
  arabic: [
    { word: 'سلام',         correct: true },
    { word: 'كتاب',         correct: true },
    { word: 'xyzabc',       correct: false },
    { word: 'قلم',          correct: true },
    { word: 'رغنبق',        correct: false },
    { word: 'مدرسة',        correct: true },
    { word: 'شنبلوغ',       correct: false },
    { word: 'بيت',          correct: true },
    { word: 'هفرز',         correct: false },
    { word: 'شمس',          correct: true }
  ],
  japanese: [
    { word: 'こんにちは',   correct: true },
    { word: '水',           correct: true },
    { word: 'foo',          correct: false },
    { word: '山',           correct: true },
    { word: 'ズンダモン',    correct: true },
    { word: 'ブリフ',        correct: false },
    { word: '猫',           correct: true },
    { word: 'パルタゴン',    correct: false },
    { word: '木',           correct: true },
    { word: 'クレンチ',      correct: false }
  ],
  french: [
    { word: 'bonjour',     correct: true },
    { word: 'fromage',     correct: true },
    { word: 'snarkle',     correct: false },
    { word: 'voiture',     correct: true },
    { word: 'blagouille',  correct: false },
    { word: 'maison',      correct: true },
    { word: 'zintrope',    correct: false },
    { word: 'livre',       correct: true },
    { word: 'planchin',    correct: false },
    { word: 'chien',       correct: true }
  ],
  chinese: [
    { word: '你好',          correct: true },
    { word: '苹果',          correct: true },
    { word: 'blorf',        correct: false },
    { word: '学校',          correct: true },
    { word: '胡哨砸',        correct: false },
    { word: '水',            correct: true },
    { word: '琦咯碎',        correct: false },
    { word: '朋友',          correct: true },
    { word: '咕噜啪',        correct: false },
    { word: '书',            correct: true }
  ]
};


  // получаем курс из URL
  const course = new URLSearchParams(window.location.search)
                   .get('course')?.toLowerCase() || 'english';
  const questions = banks[course] || banks.english;

  let current = 0, score = 0;
  const progEl = document.getElementById('quiz-progress');
  const qEl     = document.querySelector('.quiz-question');
  const wEl     = document.querySelector('.quiz-word');
  const yesBtn  = document.querySelector('.btn-yes');
  const noBtn   = document.querySelector('.btn-no');
  const card    = document.querySelector('.quiz-card');

  function showQuestion() {
    const {word} = questions[current];
    progEl.textContent = `Question ${current+1} of ${questions.length}`;
    qEl.textContent = `Is “${word}” a real word in this course?`;
    wEl.textContent = word;
  }

  function handle(ans) {
    if (ans === questions[current].correct) score++;
    current < questions.length-1
      ? (current++, showQuestion())
      : showResults();
  }

  function showResults() {
    card.innerHTML = `
      <div class="quiz-results">
        <h2>Your score: ${score} / ${questions.length}</h2>
        <button id="restart-btn">Restart</button>
      </div>`;
    document.getElementById('restart-btn')
      .addEventListener('click', () => location.reload());
  }

  yesBtn.addEventListener('click', () => handle(true));
  noBtn .addEventListener('click', () => handle(false));
  showQuestion();
});


// test.js
document.addEventListener('DOMContentLoaded', () => {
  const course = new URLSearchParams(window.location.search)
                   .get('course') || 'english';
  document
    .getElementById('start-test')
    .addEventListener('click', () => {
      window.location.href = `test-dict.html?course=${encodeURIComponent(course)}`;
    });
});

// grab the course param and wire up the back button
const params   = new URLSearchParams(window.location.search);
const course   = ( params.get('course') || 'english' ).toLowerCase();
const backLink = document.getElementById('back-btn');
if (backLink) {
  backLink.href = `detail.html?course=${encodeURIComponent(course)}`;
}
