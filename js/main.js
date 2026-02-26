// ========================================
// CV Website JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // ========================================
  // Navigation
  // ========================================
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('themeToggle');

  // ========================================
  // Theme Toggle (Light / Dark)
  // ========================================
  const body = document.body;
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      body.classList.add('theme-light');
    } else {
      body.classList.remove('theme-light');
    }
  };

  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = body.classList.contains('theme-light') ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  // Scroll effect for navigation
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ========================================
  // Smooth Scroll
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // Scroll Animations
  // ========================================
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('is-visible');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load

  // ========================================
  // Skill Bars Animation
  // ========================================
  const skillBars = function() {
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillPercents = document.querySelectorAll('.skill-percent');
    
    skillFills.forEach((fill, index) => {
      const percent = fill.getAttribute('data-percent');
      const elementTop = fill.getBoundingClientRect().top;
      
      if (elementTop < window.innerHeight - 100) {
        fill.style.width = percent + '%';
        
        // Animate percentage number
        let currentPercent = 0;
        const targetPercent = parseInt(percent);
        const percentElement = skillPercents[index];
        
        const animatePercent = setInterval(() => {
          if (currentPercent >= targetPercent) {
            clearInterval(animatePercent);
          } else {
            currentPercent++;
            percentElement.textContent = currentPercent + '%';
          }
        }, 15);
      }
    });
  };

  window.addEventListener('scroll', skillBars);
  skillBars(); // Run once on load

  // ========================================
  // Portfolio Filter
  // ========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      // Filter items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          
          setTimeout(() => {
            item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ========================================
  // Contact Form
  // ========================================
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = `
        <div style="width: 18px; height: 18px; border: 2px solid #151515; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        Sending...
      `;
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        formMessage.textContent = 'Thank you! Your message has been sent successfully😊!';
        formMessage.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.classList.remove('success');
        }, 5000);
      }, 1500);
    });
  }

  // ========================================
  // Back to Top
  // ========================================
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // Hero Image 3D Tilt Effect
  // ========================================
  const heroImage = document.getElementById('heroImage');
  
  if (heroImage && window.innerWidth > 1024) {
    document.addEventListener('mousemove', function(e) {
      const rect = heroImage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 25;
      const rotateY = (e.clientX - centerX) / 25;
      
      heroImage.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });

    document.addEventListener('mouseleave', function() {
      heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }

  // ========================================
  // Parallax Effect for Gradient Orbs
  // ========================================
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');

  if (orb1 && orb2) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      orb1.style.transform = `translateY(${scrollY * 0.1}px)`;
      orb2.style.transform = `translateY(${scrollY * -0.1}px)`;
    });
  }

  // ========================================
  // Menu Toggle Animation
  // ========================================
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const spans = this.querySelectorAll('span');
      
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
});

// ========================================
// Cascading Style Sheet Animation Keyframes (injected via Java Script)
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(style);
