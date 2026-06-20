(function setYear() {
  const yr = new Date().getFullYear();
  const footerYr = document.getElementById('footerYear');
  const heroYr   = document.getElementById('heroYear');
  if (footerYr) footerYr.textContent = yr;
  if (heroYr)   heroYr.textContent   = yr;
})();


(function initDarkToggle() {
  const btn  = document.getElementById('darkToggle');
  const icon = document.getElementById('darkIcon');
  if (!btn) return;

  function update(isLight) {
    icon.className = isLight ? 'bi bi-moon' : 'bi bi-sun';
    btn.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    update(isLight);
  });

  update(false);
})();


(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();


(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


function submitForm() {
  const nameEl    = document.getElementById('contactName');
  const emailEl   = document.getElementById('contactEmail');
  const messageEl = document.getElementById('contactMessage');

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const message = messageEl.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert('Thank you for your message, ' + name + '! I\'ll get back to you soon.');

  nameEl.value    = '';
  emailEl.value   = '';
  messageEl.value = '';
}