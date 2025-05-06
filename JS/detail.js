// detail.js
document.addEventListener('DOMContentLoaded', () => {
  // 1️⃣ Словарь курсов
  const courses = {
    english: {
      name: 'English Language Course',
      image: 'assets/uk-big.png',
      video: 'https://www.youtube.com/embed/CbPy_CjJR90',
      teacher: {
        name: 'Almas Nuray',
        img: 'assets/img_1.png'
      }
    },
    chinese: {
      name: 'Chinese Course',
      image: 'assets/flag-china.png',
      video: 'https://www.youtube.com/embed/BNiZ97hEzhc', // Complete Introduction to Chinese in 30 Minutes
      teacher: {
        name: 'Li Wei',
        img: 'assets/teacher-china.png'
      }
    },

    japanese: {
      name: 'Japanese Course',
      image: 'assets/flag-japan.png',
      video: 'https://www.youtube.com/embed/8YV8KmfBbBM', // Learn Japanese in 4 Hours - ALL the Japanese Basics You Need
      teacher: {
        name: 'Yuki Tanaka',
        img: 'assets/teacher-japan.png'
      }
    },

    turkish: {
      name: 'Turkish Course',
      image: 'assets/flag-turkey.png',
      video: 'https://www.youtube.com/embed/YCu45ILtikE', // Learn Turkish in 25 Minutes - ALL the Basics You Need
      teacher: {
        name: 'Mehmet Kaya',
        img: 'assets/teacher-turkey.png'
      }
    },

    arabic: {
      name: 'Arabic Course',
      image: 'assets/flag-arab.png',
      video: 'https://www.youtube.com/embed/NapGLT3WFX8', // Learn Arabic from scratch: Lesson 1
      teacher: {
        name: 'Layla Al-Farsi',
        img: 'assets/teacher-arabic.png'
      }
    },

    french: {
      name: 'French Course',
      image: 'assets/flag-france.png',
      video: 'https://www.youtube.com/embed/ujDtm0hZyII', // Learn French in 25 Minutes - ALL the Basics You Need
      teacher: {
        name: 'Claire Dubois',
        img: 'assets/teacher-france.png'
      }
    }

    // добавь остальные курсы по аналогии
  };

  // 2️⃣ Параметр из URL
  const params = new URLSearchParams(window.location.search);
  const key = (params.get('course') || params.get('country') || 'english').toLowerCase();

  // 3️⃣ Берём данные
  const info = courses[key];
  if (!info) {
    console.warn(`No data for "${key}"`);
    return;
  }

  // 4️⃣ Апдейтим DOM
  document.querySelector('.course-title').textContent = info.name;

  const flagImg = document.querySelector('.course-flag img');
  flagImg.src = info.image;
  flagImg.alt = info.name;

  document.querySelector('.video-wrapper iframe').src = info.video;

  // 5️⃣ Апдейтим учителя
  document.querySelector('.teacher-name').textContent = info.teacher.name;
  const teachImg = document.querySelector('.teacher-thumb img');
  teachImg.src = info.teacher.img;
  teachImg.alt = info.teacher.name;
});

// ====== Header (User Info) ======
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userInfo  = document.querySelector('.user-info');
  const userName  = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');
  const signBtn   = document.querySelector('.actions .sign-btn');

  if (user && userName) {
    userName.textContent = user.username;
    userInfo.style.display = 'flex';
    if (signBtn) signBtn.style.display = 'none';
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  } else {
    if (userInfo) userInfo.style.display = 'none';
    if (signBtn)  signBtn.style.display = 'inline-block';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const key    = (params.get('course') || 'english').toLowerCase();
  document
    .getElementById('knowledge-check-btn')
    .href = `test.html?course=${encodeURIComponent(key)}`;
});