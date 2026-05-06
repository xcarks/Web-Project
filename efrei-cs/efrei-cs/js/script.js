/* =============================================
   EFREI CS DEPARTMENT — MAIN JAVASCRIPT
   ============================================= */

'use strict';

// ─── HEADER SCROLL EFFECT ───────────────────────────────
(function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ─── ACTIVE NAV LINK ────────────────────────────────────
(function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === path) link.classList.add('active');
  });
})();

// ─── MOBILE HAMBURGER NAV ───────────────────────────────
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ─── CAROUSEL ───────────────────────────────────────────
(function initCarousel() {
  const track  = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!track || slides.length === 0) return;

  let current = 0;
  let autoTimer;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5000);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));

  goTo(0);
  startAuto();
})();

// ─── PROGRAM TABS ───────────────────────────────────────
(function initTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
})();

// ─── ACCORDION ──────────────────────────────────────────
(function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
})();

// ─── SCROLL REVEAL ──────────────────────────────────────
(function initReveal() {
  const items = document.querySelectorAll('.reveal, .stagger');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
})();

// ─── ANIMATED COUNTERS ──────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.counter-num[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const duration = 1800;
    const start    = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(ease * target);
      el.innerHTML = prefix + value.toLocaleString() + `<span class="suffix">${suffix}</span>`;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ─── PROGRESS BARS ──────────────────────────────────────
(function initProgress() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));
})();

// ─── CONTACT FORM VALIDATION ────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(group, msg) {
    group.classList.add('error');
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
  }

  function clearError(group) {
    group.classList.remove('error');
  }

  // Live validation
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (field.value.trim()) clearError(group);
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const firstName = form.querySelector('#firstName');
    const lastName  = form.querySelector('#lastName');
    const email     = form.querySelector('#email');
    const subject   = form.querySelector('#subject');
    const message   = form.querySelector('#message');

    [firstName, lastName, email, subject, message].forEach(f => {
      if (!f) return;
      const group = f.closest('.form-group');
      if (!f.value.trim()) {
        showError(group, 'This field is required.');
        valid = false;
      } else if (f === email && !validateEmail(f.value)) {
        showError(group, 'Please enter a valid email address.');
        valid = false;
      } else if (f === message && f.value.trim().length < 20) {
        showError(group, 'Message must be at least 20 characters.');
        valid = false;
      } else {
        clearError(group);
      }
    });

    if (valid) {
      const submitBtn = form.querySelector('.btn-primary');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      // Simulate submission
      setTimeout(() => {
        form.reset();
        form.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) success.classList.add('show');
      }, 1200);
    }
  });
})();

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ─── TYPING ANIMATION (HERO) ─────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = ['Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Software Engineering', 'Cloud Computing'];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
})();

// ─── CAMPUS GALLERY LIGHTBOX ─────────────────────────────
(function initGallery() {
  const items = document.querySelectorAll('.campus-gallery-item');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    display:none;position:fixed;inset:0;background:rgba(0,0,0,0.92);
    z-index:9999;align-items:center;justify-content:center;cursor:pointer;
  `;
  lb.innerHTML = `
    <div style="max-width:90vw;max-height:85vh;text-align:center;">
      <div id="lbCaption" style="color:#fff;font-family:'Syne',sans-serif;font-size:1.1rem;margin-bottom:16px;"></div>
      <div id="lbImg" style="width:72vw;height:55vh;border-radius:12px;background-size:cover;background-position:center;"></div>
    </div>
    <button onclick="document.getElementById('lightbox').style.display='none';document.body.style.overflow='';" 
      style="position:absolute;top:24px;right:32px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;">✕</button>
  `;
  document.body.appendChild(lb);

  items.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      const caption = item.querySelector('span')?.textContent || '';
      const bg = item.style.backgroundImage;
      document.getElementById('lbImg').style.backgroundImage = bg || 'linear-gradient(135deg,#0B1F3A,#1A4A8A)';
      document.getElementById('lbCaption').textContent = caption;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lb.addEventListener('click', function(e) {
    if (e.target === lb) {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();