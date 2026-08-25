/* ==========================================================================
   Frontier Research and Innovation Foundation — Reusable Components (Header & Footer)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Render Header Component
  function renderHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder') || document.getElementById('siteHeader');
    if (!headerPlaceholder) return;

    let currentClean = window.location.pathname.split('/').pop().toLowerCase().replace('.html', '');
    if (!currentClean || currentClean === '' || currentClean === 'index') {
      currentClean = 'index';
    }

    const navItems = [
      { name: 'Home', link: 'index.html', icon: 'fa-house' },
      { name: 'About Us', link: 'about.html', icon: 'fa-building-columns' },
      { name: 'Committee', link: 'committee.html', icon: 'fa-users' },
      { name: 'Programs', link: 'programs.html', icon: 'fa-diagram-project' },
      { name: 'Gallery', link: 'gallery.html', icon: 'fa-images' },
      { name: 'Contact', link: 'contact.html', icon: 'fa-paper-plane' }
    ];

    const navLinksHTML = navItems.map(item => {
      const itemClean = item.link.toLowerCase().replace('.html', '');
      const isActive = (itemClean === currentClean);
      return `<a href="${item.link}" class="${isActive ? 'active' : ''}"><i class="fa-solid ${item.icon} nav-icon"></i><span>${item.name}</span></a>`;
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
        <a href="donate.html" class="btn btn-gold mobile-donate-btn"><i class="fa-solid fa-heart"></i> Donate Now</a>
      </div>

      <div class="nav-cta">
        <div class="lang-btn-wrap" title="Select Language / ভাষা নির্বাচন করুন">
          <button type="button" class="lang-icon-btn" aria-label="Change Language">
            <i class="fa-solid fa-globe"></i>
          </button>
          <div id="google_translate_element" class="google-translate-hidden"></div>
        </div>
        <a href="donate.html" class="btn btn-gold desktop-donate-btn"><i class="fa-solid fa-heart"></i> Donate</a>
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
          <li><a href="gallery.html">Photo Gallery</a></li>
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

  // 4. Initialize Google Translate
  function initGoogleTranslate() {
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = function () {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  // Continuously remove top banner iframe, prevent body top shift & style language menu popup
  function hideGoogleTranslateBanner() {
    const cleanStyles = () => {
      document.body.style.top = '0px';
      document.body.style.position = 'static';
      document.body.style.marginTop = '0px';
      document.documentElement.style.top = '0px';
      document.documentElement.style.position = 'static';
      document.documentElement.style.marginTop = '0px';

      const banners = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame, iframe[id*=":1.container"], iframe[id*=":2.container"], iframe[class*="VIpgm"]');
      banners.forEach(b => {
        b.style.display = 'none';
        b.style.visibility = 'hidden';
        b.style.opacity = '0';
        b.style.height = '0';
      });

      const menuFrames = document.querySelectorAll('iframe.goog-te-menu-frame, iframe[class*="goog-te-menu-frame"]');
      menuFrames.forEach(m => {
        m.style.setProperty('position', 'fixed', 'important');
        m.style.setProperty('top', window.innerWidth <= 600 ? '65px' : '75px', 'important');
        m.style.setProperty('left', window.innerWidth <= 600 ? '4vw' : '50%', 'important');
        if (window.innerWidth > 600) {
          m.style.setProperty('transform', 'translateX(-50%)', 'important');
        } else {
          m.style.setProperty('transform', 'none', 'important');
        }
        m.style.setProperty('width', '92vw', 'important');
        m.style.setProperty('max-width', '420px', 'important');
        m.style.setProperty('height', '72vh', 'important');
        m.style.setProperty('max-height', '480px', 'important');
        m.style.setProperty('border-radius', '16px', 'important');
        m.style.setProperty('box-shadow', '0 20px 60px rgba(11,25,44,0.35)', 'important');
        m.style.setProperty('z-index', '999999', 'important');
      });
    };

    cleanStyles();
    setInterval(cleanStyles, 300);

    if (window.MutationObserver) {
      const observer = new MutationObserver(cleanStyles);
      observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    }
  }

  // Auto initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    initGoogleTranslate();
    hideGoogleTranslateBanner();

    if (!document.querySelector('script[src*="webmcp.js"]')) {
      const s = document.createElement('script');
      s.src = 'js/webmcp.js';
      s.async = true;
      document.head.appendChild(s);
    }
  });

})();
