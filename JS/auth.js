
// home-page.js
document.addEventListener('DOMContentLoaded', () => {
  // --- регистрация ---
  const regForm = document.querySelector('.register-form');
  if (regForm) {
    const err = document.createElement('p');
    err.className = 'error-msg';
    regForm.prepend(err);

    regForm.addEventListener('submit', e => {
      e.preventDefault();
      err.textContent = '';

      const [userInp, emailInp, passInp] = regForm.querySelectorAll('input');
      const username = userInp.value.trim();
      const email    = emailInp.value.trim();
      const pwd      = passInp.value.trim();

      // валидация
      if (username.length < 3) {
        err.textContent = 'имя минимум 3 символа';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        err.textContent = 'введи нормальный email';
        return;
      }
      if (pwd.length < 6) {
        err.textContent = 'пароль минимум 6 символов';
        return;
      }

      // сохраняем
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === email)) {
        err.textContent = 'такой email уже зарегистрирован';
        return;
      }

      users.push({ username, email, password: pwd });
      localStorage.setItem('users', JSON.stringify(users));

      // для надёжности перед alert можно вывести в консоль
      console.log('Registered user:', { username, email });

      alert('успешно зарегистрированы! Теперь войди.');
      window.location.href = 'login.html';
    });

    return; // дальше логин и header не нужен на странице регистрации
  }

  // --- логин ---
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    const err = document.createElement('p');
    err.className = 'error-msg';
    loginForm.prepend(err);

    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      err.textContent = '';

      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const pwd   = loginForm.querySelector('input[type="password"]').value.trim();

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        err.textContent = 'введи нормальный email';
        return;
      }
      if (pwd.length < 6) {
        err.textContent = 'пароль минимум 6 символов';
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === pwd);
      if (!user) {
        err.textContent = 'неверный email или пароль';
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Logged in user:', user);
      window.location.href = 'home.html'; // или dashboard.html
    });
  }

  // --- header: имя пользователя + logout ---
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userInfo = document.querySelector('.user-info');
  const nameEl   = document.getElementById('user-name');
  const logout   = document.getElementById('logout-btn');
  const signBtn  = document.querySelector('.actions .sign-btn');

  if (user && nameEl) {
    nameEl.textContent = `Hi, ${user.username}`;
    userInfo.style.display = 'flex';
    if (signBtn) signBtn.style.display = 'none';

    logout.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  } else if (userInfo) {
    userInfo.style.display = 'none';
    if (signBtn) signBtn.style.display = 'inline-block';
  }
});

