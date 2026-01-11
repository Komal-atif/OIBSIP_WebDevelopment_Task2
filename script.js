// ================= NAVIGATION SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      document.querySelector('.nav-links').classList.remove('active');
    }
  });
});

// ================= MOBILE MENU TOGGLE =================
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ================= FIXED NAVIGATION SCROLL EFFECT =================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.fixed-nav');
  if (nav) {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// ================= COPY EMAIL FUNCTIONALITY =================
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('click', function() {
    const content = this.querySelector('p').textContent;
    if (content.includes('@')) {
      navigator.clipboard.writeText(content.trim())
        .then(() => {
          const actionSpan = this.querySelector('.contact-action');
          if (actionSpan) {
            const originalText = actionSpan.textContent;
            actionSpan.textContent = 'Copied!';
            actionSpan.style.background = '#4CAF50';
            
            setTimeout(() => {
              actionSpan.textContent = originalText;
              actionSpan.style.background = '';
            }, 2000);
          }
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  });
});

// ================= BACK TO TOP BUTTON =================
function createBackToTopButton() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.title = 'Back to top';
  backToTopBtn.ariaLabel = 'Back to top';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ================= INITIALIZE ON DOM LOAD =================
document.addEventListener('DOMContentLoaded', function() {
  createBackToTopButton();
  
  // Add animation classes on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.certificate-card, .compact-project-card').forEach(el => {
    observer.observe(el);
  });
});