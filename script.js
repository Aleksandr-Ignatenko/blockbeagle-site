// Cursor glow effect - only on desktop with mouse
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouch && cursorGlow) {
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
      });

      function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
      }
      animateGlow();
    }

    // Header scroll effect with logo animation
    const header = document.getElementById('header');
    const heroLogo = document.getElementById('heroLogo');
    const headerLogo = document.querySelector('.logo');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Header state
      if (currentScrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Synchronized logo animation
      const heroLogoImg = heroLogo.querySelector('.hero-logo-img');

      if (heroLogoImg) {
        const imgRect = heroLogoImg.getBoundingClientRect();
        const imgHeight = imgRect.height;
        const imgMiddle = imgRect.top + (imgHeight / 2);

        // Both animations trigger at the exact same time
        if (imgMiddle <= 0) {
          // Hide hero logo AND show header logo simultaneously
          heroLogo.classList.add('hide');
          headerLogo.classList.add('show');
        } else {
          // Show hero logo AND hide header logo simultaneously
          heroLogo.classList.remove('hide');
          headerLogo.classList.remove('show');
        }
      }

      lastScrollY = currentScrollY;
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          // Close mobile menu if open
          const navLinks = document.getElementById('navLinks');
          const hamburger = document.querySelector('.hamburger');
          if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });

    // Toggle mobile menu
    function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      const hamburger = document.querySelector('.hamburger');
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const navLinks = document.getElementById('navLinks');
      const hamburger = document.querySelector('.hamburger');
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay for form groups and contact rows
          if (entry.target.classList.contains('form-group') ||
              entry.target.classList.contains('contact-row')) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
          } else {
            entry.target.classList.add('visible');
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.feature-card, .about-content, .form-group, .contact-row').forEach(el => {
      observer.observe(el);
    });

    // Card mouse tracking - only on desktop
    if (!isTouch) {
      document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', x + '%');
          card.style.setProperty('--mouse-y', y + '%');
        });
      });
    }

    // Button ripple effect from cursor position
    function createRipple(button, e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      button.style.setProperty('--x', percentX + '%');
      button.style.setProperty('--y', percentY + '%');
    }

    // Add ripple to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', (e) => createRipple(ctaButton, e));
      ctaButton.addEventListener('mousemove', (e) => createRipple(ctaButton, e));
    }

    // Add ripple to submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('mouseenter', (e) => createRipple(submitBtn, e));
      submitBtn.addEventListener('mousemove', (e) => createRipple(submitBtn, e));
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        if (window.innerWidth < 768) {
          const viewport = document.querySelector('meta[name=viewport]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
          }
        }
      });

      input.addEventListener('blur', function() {
        if (window.innerWidth < 768) {
          const viewport = document.querySelector('meta[name=viewport]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
          }
        }
      });
    });