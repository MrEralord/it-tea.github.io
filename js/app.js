/* ============================================================
   IT-Tea.org — Core Application JS
   System-aware theme, syllabus tabs, accordions, mobile nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initSyllabusTabs();
  initSyllabusAccordions();
  initScrollAnimations();
  initSmoothScroll();
});

/* ============================================================
   THEME  — System-aware (prefers-color-scheme) + manual toggle
   ============================================================ */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('ittea-theme');

  // If user previously picked a theme, apply it
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  // Otherwise, no data-theme attribute → CSS @media handles it

  updateThemeIcon(toggle);

  toggle.addEventListener('click', () => {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ittea-theme', next);
    updateThemeIcon(toggle);
  });

  // Listen for system changes (only if no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('ittea-theme')) {
      updateThemeIcon(toggle);
    }
  });
}

function getEffectiveTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit) return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeIcon(toggle) {
  const theme = getEffectiveTheme();
  const icon = toggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.className = 'fas fa-moon';
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('header-nav');
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   SYLLABUS FILTER TABS
   ============================================================ */
function initSyllabusTabs() {
  const tabs = document.querySelectorAll('.syllabus-tab');
  const grades = document.querySelectorAll('.syllabus-grade');
  if (!tabs.length || !grades.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      grades.forEach(grade => {
        if (filter === 'all' || grade.dataset.grade === filter) {
          grade.classList.remove('hidden');
        } else {
          grade.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================================
   SYLLABUS UNIT ACCORDIONS
   ============================================================ */
function initSyllabusAccordions() {
  const units = document.querySelectorAll('.syllabus-unit');
  units.forEach(unit => {
    const toggle = unit.querySelector('.unit-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = unit.classList.contains('open');
      unit.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  });

  // Auto-open the first unit of each grade
  document.querySelectorAll('.syllabus-grade').forEach(grade => {
    const firstUnit = grade.querySelector('.syllabus-unit');
    if (firstUnit) {
      firstUnit.classList.add('open');
      const btn = firstUnit.querySelector('.unit-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  });
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  // Add animate-target class to elements
  const targets = document.querySelectorAll(
    '.lo-card, .lab-card, .assessment-card, .syllabus-unit'
  );

  targets.forEach((el, i) => {
    el.classList.add('animate-target');
    // Add stagger class (cycle through 1-4)
    const stagger = (i % 4) + 1;
    el.classList.add(`stagger-${stagger}`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
