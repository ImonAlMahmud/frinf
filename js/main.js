/* ==========================================================================
   Frontier Research and Innovation Foundation — Main JS Logic
   ========================================================================== */

function initMain() {
  // 0. Preloader Screen Animation (Guaranteed Minimum 1.5 Seconds Display)
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderPercent = document.getElementById('preloaderPercent');

  if (preloader) {
    // Fail-safe auto hide after 2.5 seconds max
    setTimeout(() => {
      if (!preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
      }
    }, 2500);

    if (preloaderBar && preloaderPercent) {
      let progress = 0;
      const minDuration = 1500; // 1.5 seconds minimum
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        let targetProgress = Math.min(100, Math.floor((elapsedTime / minDuration) * 100));

        progress = targetProgress;
        preloaderBar.style.width = progress + '%';
        preloaderPercent.innerText = progress + '%';

        if (elapsedTime >= minDuration && progress >= 100) {
          clearInterval(interval);
          preloaderBar.style.width = '100%';
          preloaderPercent.innerText = '100%';
          setTimeout(() => {
            preloader.classList.add('fade-out');
          }, 250);
        }
      }, 20);
    }
  }

  // 1. Genuine 3D Animated DNA Double Helix Engine
  const dnaCanvas = document.getElementById('dnaCanvas');
  if (dnaCanvas && dnaCanvas.getContext) {
    const ctx = dnaCanvas.getContext('2d');
    let angleOffset = 0;
    let scrollPercent = 0;

    const updateScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent = scrollTotal > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollTotal)) : 0;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const draw3DDNA = () => {
      const w = dnaCanvas.width;
      const h = dnaCanvas.height;
      ctx.clearRect(0, 0, w, h);

      angleOffset += 0.024; // Continuous 3D rotation speed

      const numPairs = 32;
      const radius = 13;
      const centerX = w / 2;

      // Array to collect 3D elements for depth sorting
      const elements = [];

      for (let i = 0; i <= numPairs; i++) {
        const y = (i / numPairs) * (h - 24) + 12;
        const normY = y / h;
        const isHighlighted = normY <= scrollPercent;

        const theta1 = angleOffset + (i * 0.38);
        const theta2 = theta1 + Math.PI;

        const z1 = Math.sin(theta1);
        const x1 = centerX + Math.cos(theta1) * radius;

        const z2 = Math.sin(theta2);
        const x2 = centerX + Math.cos(theta2) * radius;

        // Base pair rung
        elements.push({
          type: 'rung',
          y: y,
          x1: x1,
          z1: z1,
          x2: x2,
          z2: z2,
          avgZ: (z1 + z2) / 2,
          isHighlighted: isHighlighted
        });

        // Node 1 (Strand A)
        elements.push({
          type: 'node',
          strand: 'A',
          x: x1,
          y: y,
          z: z1,
          isHighlighted: isHighlighted
        });

        // Node 2 (Strand B)
        elements.push({
          type: 'node',
          strand: 'B',
          x: x2,
          y: y,
          z: z2,
          isHighlighted: isHighlighted
        });
      }

      // Sort elements by Z-depth (back to front)
      elements.sort((a, b) => (a.avgZ !== undefined ? a.avgZ : a.z) - (b.avgZ !== undefined ? b.avgZ : b.z));

      // Draw connecting strands
      for (let s = 0; s < 2; s++) {
        ctx.beginPath();
        for (let i = 0; i <= numPairs; i++) {
          const y = (i / numPairs) * (h - 24) + 12;
          const theta = angleOffset + (i * 0.38) + (s * Math.PI);
          const x = centerX + Math.cos(theta) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(228, 222, 207, 0.4)';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Highlighted active portion of strand
        if (scrollPercent > 0) {
          ctx.beginPath();
          const activeMaxY = scrollPercent * h;
          for (let i = 0; i <= numPairs; i++) {
            const y = (i / numPairs) * (h - 24) + 12;
            if (y > activeMaxY + 12) break;
            const theta = angleOffset + (i * 0.38) + (s * Math.PI);
            const x = centerX + Math.cos(theta) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = '#C6A356';
          ctx.lineWidth = 2.4;
          ctx.stroke();
        }
      }

      // Draw depth-sorted rungs & nodes
      elements.forEach(el => {
        if (el.type === 'rung') {
          const alpha = 0.3 + (el.avgZ + 1) * 0.35;
          ctx.beginPath();
          ctx.moveTo(el.x1, el.y);
          ctx.lineTo(el.x2, el.y);
          ctx.strokeStyle = el.isHighlighted ? `rgba(198, 163, 86, ${alpha})` : `rgba(228, 222, 207, ${alpha * 0.5})`;
          ctx.lineWidth = 1.2 + (el.avgZ + 1) * 0.5;
          ctx.stroke();
        } else if (el.type === 'node') {
          const depthScale = 0.6 + (el.z + 1) * 0.4;
          const nodeRadius = 2.2 * depthScale;
          const alpha = 0.35 + (el.z + 1) * 0.35;

          ctx.beginPath();
          ctx.arc(el.x, el.y, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = el.isHighlighted ? `rgba(198, 163, 86, ${alpha})` : `rgba(228, 222, 207, ${alpha * 0.6})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(draw3DDNA);
    };

    draw3DDNA();
  }

  // 5. Scroll reveal animation (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('in'));
  }

  // 6. Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const filterItems = document.querySelectorAll('.filter-item');
  if (tabBtns.length > 0 && filterItems.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-tab');
        filterItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // 7. Modal Handlers
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  const modalCloses = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
      }
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      close.closest('.modal-backdrop').classList.remove('active');
    });
  });

  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  // 8. Form Submit Interceptor
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Submitted Successfully!';
          btn.style.background = '#28a745';
          btn.style.borderColor = '#28a745';

          setTimeout(() => {
            form.reset();
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
          }, 3000);
        }, 1200);
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
