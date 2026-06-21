// Nav scroll behavior
const nav = document.getElementById('mainNav');
if (nav && nav.classList.contains('nav-transparent')) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// Password toggle (sign-in page)
const pwToggle = document.getElementById('passwordToggle');
const pwInput = document.getElementById('password');
if (pwToggle && pwInput) {
  pwToggle.addEventListener('click', () => {
    const isText = pwInput.type === 'text';
    pwInput.type = isText ? 'password' : 'text';
    const icon = document.getElementById('eyeIcon');
    if (icon) {
      icon.innerHTML = isText
        ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
        : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
    }
  });
}

// Steps carousel (homebuyers page)
const stepCards = document.querySelectorAll('.step-card');
let activeStep = 0;

function setActiveStep(idx) {
  stepCards.forEach((c, i) => {
    c.classList.toggle('step-card--active', i === idx);
    const title = c.querySelector('.step-title');
    if (title) {
      title.classList.toggle('text-gold', i === idx);
    }
  });
  activeStep = idx;
}

const prevBtn = document.getElementById('prevStep');
const nextBtn = document.getElementById('nextStep');
if (prevBtn && nextBtn && stepCards.length) {
  prevBtn.addEventListener('click', () => {
    setActiveStep((activeStep - 1 + stepCards.length) % stepCards.length);
  });
  nextBtn.addEventListener('click', () => {
    setActiveStep((activeStep + 1) % stepCards.length);
  });

  stepCards.forEach((card, i) => {
    card.addEventListener('click', () => setActiveStep(i));
  });
}

// Sign in form validation feedback
const signinForm = document.getElementById('signinForm');
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let valid = true;

    [email, password].forEach(input => {
      if (!input) return;
      const wrap = input.closest('.input-wrap');
      if (!input.value.trim()) {
        if (wrap) wrap.style.borderColor = 'var(--error)';
        valid = false;
      } else {
        if (wrap) wrap.style.borderColor = '';
      }
    });

    if (valid) {
      const btn = signinForm.querySelector('.signin-submit');
      if (btn) {
        btn.textContent = 'Signing in…';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Sign In →';
          btn.disabled = false;
        }, 2000);
      }
    }
  });
}

// Smooth reveal on scroll
const revealEls = document.querySelectorAll(
  '.audience-card, .advantage-item, .step-card, .partner-card, .concierge-feature-card, .concierge-dark-card, .stat-item'
);

if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`;
    io.observe(el);
  });
}
