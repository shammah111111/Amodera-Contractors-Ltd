const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
const yearNodes = document.querySelectorAll('#year');
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');
const header = document.querySelector('.site-header');
const animated = document.querySelectorAll('.animate');
const testimonials = document.querySelectorAll('.testimonial-card');

yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

if (contactForm && contactFeedback) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const button = contactForm.querySelector('button[type="submit"]');
    const buttonText = button?.textContent || 'Send Message';
    button.disabled = true;
    button.textContent = 'Sending...';
    contactFeedback.textContent = 'Sending your message...';
    contactFeedback.classList.remove('error');

    try {
      const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        subject: document.getElementById('subject')?.value || '',
        message: document.getElementById('message')?.value || ''
      };

      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        contactFeedback.textContent = '✓ Your message has been received. We will be in touch shortly.';
        contactForm.reset();
        button.textContent = 'Sent';
        window.setTimeout(() => {
          button.disabled = false;
          button.textContent = buttonText;
        }, 2500);
      } else {
        throw new Error(result.error || 'Unable to send the message right now.');
      }
    } catch (error) {
      contactFeedback.textContent = '✗ Please try again or contact us directly by phone or email.';
      contactFeedback.classList.add('error');
      button.disabled = false;
      button.textContent = buttonText;
      console.error('Form submission error:', error);
    }
  });
}

if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
  const updateHeroOffset = () => {
    const offset = Math.min(window.scrollY / 12, 70);
    heroSection.style.backgroundPosition = `center calc(30% + ${offset}px)`;
  };
  window.addEventListener('scroll', updateHeroOffset, { passive: true });
  updateHeroOffset();
}

if (animated.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  animated.forEach((element) => observer.observe(element));
}

if (testimonials.length) {
  let current = 0;
  let intervalId = null;

  const setActive = (index) => {
    testimonials.forEach((item, itemIndex) => {
      item.classList.toggle('active', itemIndex === index);
    });
  };

  const startRotator = () => {
    intervalId = window.setInterval(() => {
      current = (current + 1) % testimonials.length;
      setActive(current);
    }, 5000);
  };

  const stopRotator = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  setActive(0);
  startRotator();

  testimonials.forEach((testimonial) => {
    testimonial.addEventListener('mouseenter', stopRotator);
    testimonial.addEventListener('mouseleave', startRotator);
  });
}
