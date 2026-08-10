/* ==========================================================================
   Frontier Research and Innovation Foundation — Reusable Components (Header & Footer)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Render Header Component
  function renderHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder') || document.getElementById('siteHeader');
    if (!headerPlaceholder) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const navItems = [
      { name: 'Home', link: 'index.html' },
      { name: 'About Us', link: 'about.html' },
      { name: 'Committee', link: 'committee.html' },
      { name: 'Programs', link: 'programs.html' },
      { name: 'Membership', link: 'membership.html' },
      { name: 'Awards', link: 'awards.html' },
      { name: 'Conferences', link: 'conferences.html' },
      { name: 'Contact', link: 'contact.html' }
    ];

    const navLinksHTML = navItems.map(item => {
      const isActive = (item.link === currentPath) || (currentPath === '' && item.link === 'index.html');
      return `<a href="${item.link}" class="${isActive ? 'active' : ''}">${item.name}</a>`;
    }).join('');

    const headerHTML = `
<header id="siteHeader">
  <div class="container">
    <nav>
      <a href="index.html" class="brand">
        <img src="images/logo.png" alt="Frontier Research and Innovation Foundation Logo" />
        <div class="brand-text">
          <b>Frontier Research</b>
          <span>&amp; Innovation Foundation</span>
        </div>
      </a>

      <div class="nav-links" id="navLinks">
        ${navLinksHTML}
      </div>

      <div class="nav-cta">
        <a href="donate.html" class="btn btn-gold"><i class="fa-solid fa-heart"></i> Donate</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  </div>
</header>`;

    if (headerPlaceholder.id === 'header-placeholder') {
      headerPlaceholder.outerHTML = headerHTML;
    } else {
      headerPlaceholder.outerHTML = headerHTML;
    }

    initHeaderEvents();
  }

  // 2. Initialize Header Interactions & Scroll Squeeze
  function initHeaderEvents() {
    const siteHeader = document.getElementById('siteHeader');
    const mainNav = siteHeader ? siteHeader.querySelector('nav') : null;
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (siteHeader && mainNav) {
      const handleScroll = () => {
        const scrollY = window.scrollY;

        if (window.innerWidth > 1080) {
          const progress = Math.min(1, Math.max(0, scrollY / 140));
          const currentWidth = 1420 - (progress * 180);
          const currentPaddingY = 11 - (progress * 4);
          const currentPaddingX = 26 - (progress * 6);
          const currentTop = 18 - (progress * 8);

          siteHeader.style.top = `${currentTop}px`;
          mainNav.style.maxWidth = `${currentWidth}px`;
          mainNav.style.padding = `${currentPaddingY}px ${currentPaddingX}px`;
        } else {
          siteHeader.style.top = '';
          mainNav.style.maxWidth = '';
          mainNav.style.padding = '';
        }

        if (scrollY > 30) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
      handleScroll();
    }

    if (menuToggle && navLinksContainer) {
      menuToggle.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        navLinksContainer.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = navLinksContainer.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
      };

      const navLinks = navLinksContainer.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navLinksContainer.classList.remove('open');
          const icon = menuToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        });
      });

      document.addEventListener('click', function(e) {
        if (siteHeader && !siteHeader.contains(e.target) && navLinksContainer.classList.contains('open')) {
          navLinksContainer.classList.remove('open');
          const icon = menuToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      });
    }
  }

  // 3. Render Footer Component
  function renderFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder') || document.querySelector('footer');
    if (!footerPlaceholder) return;

    const footerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <img src="images/logo.png" alt="Frontier Research and Innovation Foundation Logo" />
          <b>Frontier Research &amp; Innovation Foundation</b>
        </div>
        <p style="font-size:14px;margin-bottom:20px;">Frontier Research and Innovation Foundation — Dedicated to research, education, training, public health, social development, and humanitarian activities.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>

      <div class="footer-col">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="about.html">About Foundation</a></li>
          <li><a href="committee.html">Executive Committee</a></li>
          <li><a href="programs.html">Research &amp; Programs</a></li>
          <li><a href="membership.html">Join Membership</a></li>
          <li><a href="awards.html">Grants &amp; Awards</a></li>
          <li><a href="conferences.html">Conferences 2026</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>Focus Areas</h5>
        <ul>
          <li><a href="programs.html">Medical Genomics</a></li>
          <li><a href="programs.html">Public Health Policy</a></li>
          <li><a href="programs.html">Climate Resilience</a></li>
          <li><a href="programs.html">AI &amp; Data Science</a></li>
          <li><a href="programs.html">Emergency Relief</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>Contact Secretariat</h5>
        <ul>
          <li><i class="fa-solid fa-location-dot" style="margin-right:6px;color:var(--gold-500);"></i> UHUD Mayer Badhon, 84/V/9/1, Jafrabad, Mohammadpur, Dhaka -1207, Bangladesh</li>
          <li><i class="fa-solid fa-phone" style="margin-right:6px;color:var(--gold-500);"></i> +880 1712 131931</li>
          <li><i class="fa-solid fa-envelope" style="margin-right:6px;color:var(--gold-500);"></i> info@frinf.org</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>&copy; 2026 Frontier Research and Innovation Foundation. All rights reserved.</div>
      <div style="display:flex;gap:20px;">
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="terms-of-service.html">Terms of Service</a>
        <a href="governance.html">Governance</a>
      </div>
    </div>
  </div>
</footer>`;

    if (footerPlaceholder.id === 'footer-placeholder') {
      footerPlaceholder.outerHTML = footerHTML;
    } else {
      footerPlaceholder.outerHTML = footerHTML;
    }
  }

  // Auto initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });

})();
