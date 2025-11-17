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

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const emailError = document.getElementById('emailError');
    const successPopup = document.getElementById('successPopup');
    const closeSuccessPopup = document.getElementById('closeSuccessPopup');

    // Email validation function - only Latin characters and allowed email symbols
    function validateEmail(email) {
      // Check if email contains only Latin characters, numbers, and allowed symbols
      const latinPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!latinPattern.test(email)) {
        return false;
      }

      // Check for proper email structure: must have @, domain, dot, and country zone (TLD)
      const parts = email.split('@');
      if (parts.length !== 2) {
        return false;
      }

      const [localPart, domain] = parts;
      if (!localPart || localPart.length === 0) {
        return false;
      }

      // Domain must have at least one dot and TLD (country zone)
      const domainParts = domain.split('.');
      if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
        return false;
      }

      // Check that local part and domain don't contain invalid characters
      const invalidChars = /[^a-zA-Z0-9._+-]/;
      return !(invalidChars.test(localPart) || invalidChars.test(domain.replace(/\./g, '')));


    }

    // Character counter for message
    if (messageTextarea && charCount) {
      function updateCharCount() {
        const length = messageTextarea.value.length;
        charCount.textContent = length;
        
        // Change color when approaching limit
        if (length > 900) {
          charCount.style.color = '#ff6b6b';
        } else if (length > 800) {
          charCount.style.color = '#ffa500';
        } else {
          charCount.style.color = '';
        }
      }

      messageTextarea.addEventListener('input', updateCharCount);
      updateCharCount(); // Initialize counter
    }

    // Email validation on input
    if (emailInput && emailError) {
      // Filter input to only allow Latin characters and allowed email symbols
      emailInput.addEventListener('input', function(e) {
        // Remove any non-Latin characters and invalid symbols
        const allowedPattern = /[a-zA-Z0-9._+\-@]/;
        const filteredValue = emailInput.value.split('').filter(char => {
          return allowedPattern.test(char);
        }).join('');
        
        if (emailInput.value !== filteredValue) {
          emailInput.value = filteredValue;
        }

        const email = emailInput.value.trim();
        
        if (email.length === 0) {
          emailError.textContent = '';
          emailError.classList.remove('show');
          emailInput.classList.remove('error');
          return;
        }

        if (!validateEmail(email)) {
          emailError.textContent = 'Please enter a valid email address (Latin characters only)';
          emailError.classList.add('show');
          emailInput.classList.add('error');
        } else {
          emailError.textContent = '';
          emailError.classList.remove('show');
          emailInput.classList.remove('error');
        }
      });

      emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        if (email.length > 0 && !validateEmail(email)) {
          emailError.textContent = 'Please enter a valid email address (Latin characters only)';
          emailError.classList.add('show');
          emailInput.classList.add('error');
        }
      });
    }

    // Form submission handler with AJAX
    if (contactForm) {
      const submitBtn = document.getElementById('submitBtn');
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = emailInput.value.trim();
        const message = messageTextarea.value.trim();

        // Validate required fields
        let isValid = true;

        if (!name) {
          document.getElementById('name').classList.add('error');
          isValid = false;
        } else {
          document.getElementById('name').classList.remove('error');
        }

        if (!email) {
          emailError.textContent = 'Email is required';
          emailError.classList.add('show');
          emailInput.classList.add('error');
          isValid = false;
        } else if (!validateEmail(email)) {
          emailError.textContent = 'Please enter a valid email address (Latin characters only)';
          emailError.classList.add('show');
          emailInput.classList.add('error');
          isValid = false;
        } else {
          emailError.textContent = '';
          emailError.classList.remove('show');
          emailInput.classList.remove('error');
        }

        if (!message) {
          messageTextarea.classList.add('error');
          isValid = false;
        } else {
          messageTextarea.classList.remove('error');
        }

        if (!isValid) {
          // Scroll to first error
          const firstError = contactForm.querySelector('.error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
          }
          return;
        }

        // Disable submit button and show loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        // Prepare form data for FormSubmit
        const formData = new FormData(contactForm);
        formData.append('_to', 'office@block-beagle.com');
        formData.append('_subject', 'New message from Block Beagle website');
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        // Send form via AJAX to FormSubmit
        fetch('https://formsubmit.co/ajax/ecf09304b8bc900469ee85cd90efcc1b', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Success - show popup
          successPopup.classList.add('show');
          
          // Reset form
          contactForm.reset();
          if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = '';
          }
          
          // Remove error classes
          document.getElementById('name').classList.remove('error');
          emailInput.classList.remove('error');
          messageTextarea.classList.remove('error');
          emailError.classList.remove('show');
        })
        .catch(error => {
          console.error('Error:', error);
          // Show error message to user
          emailError.textContent = 'Sorry, there was an error sending your message. Please try again later.';
          emailError.classList.add('show');
          emailInput.classList.add('error');
        })
        .finally(() => {
          // Re-enable submit button
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        });
      });
    }

    // Close success popup
    if (closeSuccessPopup) {
      closeSuccessPopup.addEventListener('click', function() {
        successPopup.classList.remove('show');
      });
    }

    // Close popup when clicking outside
    if (successPopup) {
      successPopup.addEventListener('click', function(e) {
        if (e.target === successPopup) {
          successPopup.classList.remove('show');
        }
      });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && successPopup.classList.contains('show')) {
        successPopup.classList.remove('show');
      }
    });