/* ═══════════════════════════════════════════
   PROFESSIONAL PORTFOLIO MAIN JS
   ═══════════════════════════════════════════ */

/* Active Nav Link based on scroll (Scroll Spy) */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

const scrollSpyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.15, rootMargin: "-20% 0px -40% 0px" });

sections.forEach((section) => scrollSpyObserver.observe(section));

/* Scroll Reveal Animation */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.card, .section-title, .timeline-item').forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* Stat Counter Animation */
const statEls = document.querySelectorAll('[data-count]');

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out
    const value = (target * ease).toFixed(decimals);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach((el) => counterObserver.observe(el));

/* Mobile Menu Drawer Toggle */
const hamburger = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebarBackdrop');

function openMenu() {
  sidebar.classList.add('is-open');
  backdrop.classList.add('is-open');
  hamburger.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  sidebar.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  hamburger.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.contains('is-open') ? closeMenu() : openMenu();
  });
}

if (backdrop) {
  backdrop.addEventListener('click', closeMenu);
}

// Close drawer if clicking anywhere outside sidebar when it is open
document.addEventListener('click', (e) => {
  if (sidebar && sidebar.classList.contains('is-open')) {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  }
});

// Close mobile drawer when clicking a navigation link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  });
});


/* Contact Form Simulation */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn--primary');
    const originalText = btn.textContent;
    
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#059669'; // Soft success green
    btn.style.borderColor = '#059669';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
