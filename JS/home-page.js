// ====== FAQ ======
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    this.querySelector('img').classList.toggle('reverse');
  });
});

// ====== Sidebar (Basket) Toggle ======
const openBtn       = document.getElementById('open-basket');
const closeBtn      = document.getElementById('closeBasket');
const sidebar       = document.getElementById('basketSidebar');
const basketContent = document.querySelector('.basket-content');

openBtn.addEventListener('click',  () => sidebar.classList.add('open'));
closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));

// ====== Persistence Helpers ======
function loadBasket() {
  return JSON.parse(localStorage.getItem('basket')) || [];
}
function saveBasket() {
  localStorage.setItem('basket', JSON.stringify(basket));
}

// ====== Basket Logic ======
let basket = loadBasket();
renderBasket();

function renderBasket() {
  basketContent.innerHTML = '';
  let total = 0;

  basket.forEach(item => {
    total += parseFloat(item.price);

    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="card-flag" style="width:160px;height:80px;"/>
      <h3 class="card-title">${item.title}</h3>
      <div class="card-meta">
        <div class="meta-item">
          <svg viewBox="0 0 20 20" class="icon">
            <path d="M4 4h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1 3v6l5-3-5-3z"/>
          </svg>
          <span>${item.courses}</span>
        </div>
        <div class="meta-item">
          <svg viewBox="0 0 20 20" class="icon">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm.5-8.414V6a.5.5 0 1 0-1 0v5a.5.5 0 0 0 .276.447l3 1.5a.5.5 0 1 0 .447-.894L10.5 9.586z"
                  clip-rule="evenodd"/>
          </svg>
          <span>${item.duration}</span>
        </div>
      </div>
      <div class="card-footer">
        <span class="card-price">$${item.price}</span>
        <button class="remove-btn" data-id="${item.id}">Remove from Basket</button>
      </div>
    `;
    basketContent.appendChild(card);
  });

  // update totals
  document.querySelector('.totals-item:nth-child(2) div:nth-child(1)')
          .innerText = `$${total.toFixed(1)}`;
  document.querySelector('.totals-item:nth-child(2) div:nth-child(2)')
          .innerText = `-0.0$`;
  document.querySelector('.totals-item:nth-child(2) div:nth-child(3)')
          .innerText = `$${total.toFixed(1)}`;

  saveBasket();
}

// ====== Add to Basket ======
document.querySelectorAll('.join-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();  // ← предотвратить всплытие до .course-card
    const card     = btn.closest('.course-card');
    const title    = card.querySelector('h3').innerText;
    const price    = card.querySelector('.title-price span').innerText.replace('$','');
    const img      = card.querySelector('img').src;
    const meta     = card.querySelectorAll('.meta div');
    const duration = meta[0].innerText.trim();
    const courses  = meta[1].innerText.trim();
    const id       = `${title}-${price}`;

    if (!basket.find(x => x.id === id)) {
      basket.push({ id, title, price, img, duration, courses });
      renderBasket();
      sidebar.classList.add('open');
    }
  });
});

// ====== Remove from Basket ======
basketContent.addEventListener('click', e => {
  if (e.target.matches('.remove-btn')) {
    basket = basket.filter(x => x.id !== e.target.dataset.id);
    renderBasket();
  }
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

// ====== Course Search ======
document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.querySelector('.search-bar');
  if (!searchBar) return;

  const input = searchBar.querySelector('input');
  const btn   = searchBar.querySelector('button');
  const cards = document.querySelectorAll('.course-grid > .course-card');

  function filterCourses() {
    const term = input.value.trim().toLowerCase();
    cards.forEach(card => {
      const titleEl = card.querySelector('h3');
      const title   = titleEl ? titleEl.textContent.trim().toLowerCase() : '';
      card.style.display = title.includes(term) ? '' : 'none';
    });
  }

  btn.addEventListener('click', e => { e.preventDefault(); filterCourses(); });
  input.addEventListener('input', filterCourses);
  input.addEventListener('keyup', e => {
    if (e.key === 'Enter') { e.preventDefault(); filterCourses(); }
  });
});

// ====== Course-Card Navigation ======
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.course-card[data-course]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      // если клик по кнопке внутри карточки — игнорируем
      if (e.target.closest('button')) return;
      const key = card.getAttribute('data-course');
      window.location.href = `detail.html?course=${encodeURIComponent(key)}`;
    });
  });
});
