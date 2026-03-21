/* ============================================================
   IDROTTSKADESPECIALISTEN — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Mobile nav toggle
     ---------------------------------------------------------- */
  const toggle   = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close when a link inside is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     Desktop dropdown (Olika skador)
     ---------------------------------------------------------- */
  document.querySelectorAll('.has-dropdown > button').forEach(function (btn) {
    const dropdown = btn.nextElementSibling;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);

      // Close other open dropdowns
      document.querySelectorAll('.dropdown.open').forEach(function (d) {
        if (d !== dropdown) {
          d.classList.remove('open');
          d.previousElementSibling.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Arrow-key navigation: open dropdown and move into it
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        var first = dropdown.querySelector('a');
        if (first) first.focus();
      }
    });

    // Arrow-key navigation within the open dropdown
    dropdown.addEventListener('keydown', function (e) {
      var items = Array.from(dropdown.querySelectorAll('a'));
      var idx   = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < items.length - 1) items[idx + 1].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) {
          items[idx - 1].focus();
        } else {
          dropdown.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      d.previousElementSibling.setAttribute('aria-expanded', 'false');
    });
  });

  /* ----------------------------------------------------------
     Mark current page in nav
     ---------------------------------------------------------- */
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-list a, .nav-mobile a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (!href) return;
    const normalised = href.replace(/\/$/, '') || '/';
    if (normalised === path || (path === '' && normalised === '/')) {
      a.classList.add('current');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ----------------------------------------------------------
     Sticky header shadow on scroll
     ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.25)'
        : 'none';
    }, { passive: true });
  }

})();
