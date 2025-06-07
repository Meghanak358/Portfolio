// Wait for the DOM content to load before running scripts
document.addEventListener('DOMContentLoaded', function() {
  // Toggle mobile navigation menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });
  
  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinksItems = document.querySelectorAll('.nav-links a');
  
  function highlightNavLink() {
      let scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              navLinksItems.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === '#' + sectionId) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              // Adjust scroll offset based on screen size
              let scrollOffset = 80;
              if (window.innerWidth <= 768) {
                  scrollOffset = 70; // Less offset on mobile
              }
              
              window.scrollTo({
                  top: targetElement.offsetTop - scrollOffset,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Navbar background change on scroll - enhanced for mobile
  const navbar = document.querySelector('.navbar');
  
  function adjustNavbar() {
      if (window.scrollY > 50) {
          navbar.style.padding = window.innerWidth <= 768 ? '10px 0' : '15px 0';
          navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
      } else {
          navbar.style.padding = window.innerWidth <= 768 ? '15px 0' : '20px 0';
          navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }
  }
  
  window.addEventListener('scroll', adjustNavbar);
  window.addEventListener('resize', adjustNavbar);
  
  // Initialize navbar style
  adjustNavbar();
  
  // Form submission handling
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.querySelector('#name').value;
          const email = document.querySelector('#email').value;
          const message = document.querySelector('#message').value;
          
          // Simple validation
          if (!name || !email || !message) {
              showFormMessage('Please fill in all fields', 'error');
              return;
          }
          
          // Here you would normally send the data to a server
          // For now, we'll just simulate a successful submission
          showFormMessage('Thank you! Your message has been sent.', 'success');
          contactForm.reset();
      });
  }
  
  // Form message display
  function showFormMessage(message, type) {
      const formMessage = document.querySelector('#form-message');
      
      if (!formMessage) {
          const messageDiv = document.createElement('div');
          messageDiv.id = 'form-message';
          messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
          messageDiv.textContent = message;
          
          contactForm.appendChild(messageDiv);
          
          // Remove message after 3 seconds
          setTimeout(() => {
              messageDiv.remove();
          }, 3000);
      } else {
          formMessage.className = type === 'error' ? 'error-message' : 'success-message';
          formMessage.textContent = message;
          
          // Remove message after 3 seconds
          setTimeout(() => {
              formMessage.remove();
          }, 3000);
      }
  }
  
  // Animate elements when they come into view - optimized for responsive design
  const animatedElements = document.querySelectorAll('.project-card, .achievement-card, .info-card, .tech-item, .section-animate');
  
  // Adjust threshold based on device size
  const threshold = window.innerWidth <= 768 ? 0.1 : 0.2;
  
  const observerOptions = {
      threshold: threshold,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
  });
  
  // Typing effect for the hero section with responsive delay
  const typingElement = document.querySelector('.subtitle');
  if (typingElement) {
      const text = typingElement.textContent;
      typingElement.textContent = '';
      
      // Adjust typing speed based on device
      const typingSpeed = window.innerWidth <= 768 ? 30 : 20;
      
      let charIndex = 0;
      const typingInterval = setInterval(() => {
          if (charIndex < text.length) {
              typingElement.textContent += text.charAt(charIndex);
              charIndex++;
          } else {
              clearInterval(typingInterval);
          }
      }, typingSpeed);
  }
  
  // Skill progress animation - adjusted for mobile
  function animateProgress() {
      const progressBars = document.querySelectorAll('.progress');
      
      progressBars.forEach(progress => {
          const width = progress.getAttribute('data-value') + '%';
          progress.style.width = '0';
          
          setTimeout(() => {
              progress.style.width = width;
              progress.style.transition = 'width 1.5s ease-in-out';
          }, 300);
      });
  }
  
  // Run progress animation when element is in view
  const progressSection = document.querySelector('.coding-stats');
  if (progressSection) {
      const progressObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateProgress();
                  progressObserver.unobserve(entry.target);
              }
          });
      }, { threshold: window.innerWidth <= 768 ? 0.3 : 0.5 });
      
      progressObserver.observe(progressSection);
  }
  
  // CGPA Circle Animation
  const cgpaCircles = document.querySelectorAll('.cgpa-circle');
  const semProgressBars = document.querySelectorAll('.sem-fill');
  
  // Animate CGPA elements when they come into view
  function animateCGPA() {
      cgpaCircles.forEach(circle => {
          const circleBoundary = circle.getBoundingClientRect();
          // When element is in viewport
          if (circleBoundary.top < window.innerHeight - 100) {
              const progress = circle.querySelector('.cgpa-progress');
              if (progress && !progress.classList.contains('animated')) {
                  progress.classList.add('animated');
                  // Initially hide the progress
                  progress.style.background = 'rgba(255, 255, 255, 0.1)';
                  
                  // Animate after a small delay
                  setTimeout(() => {
                      progress.style.transition = 'background 1.5s ease-in-out';
                      const cgpaValue = parseFloat(progress.style.getPropertyValue('--cgpa'));
                      progress.style.background = `conic-gradient(
                          var(--primary-color) 0deg, 
                          var(--primary-color) calc(${cgpaValue} * 36deg), 
                          rgba(255, 255, 255, 0.1) calc(${cgpaValue} * 36deg),
                          rgba(255, 255, 255, 0.1) 360deg
                      )`;
                  }, 300);
                  
                  // Animate the CGPA number counting up
                  const scoreElement = circle.querySelector('.cgpa-score');
                  const targetValue = parseFloat(scoreElement.textContent);
                  animateValue(scoreElement, 0, targetValue, 1500);
              }
          }
      });
      
      // Animate semester progress bars
      semProgressBars.forEach(bar => {
          const barBoundary = bar.getBoundingClientRect();
          if (barBoundary.top < window.innerHeight - 50) {
              if (!bar.classList.contains('animated')) {
                  bar.classList.add('animated');
                  // Start with width 0 and animate to full width
                  const targetWidth = bar.style.getPropertyValue('--width');
                  bar.style.width = '0%';
                  setTimeout(() => {
                      bar.style.transition = 'width 1s ease-out';
                      bar.style.width = targetWidth;
                  }, 300);
              }
          }
      });
  }
  
  // Animate counting up
  function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentValue = progress * (end - start) + start;
          element.textContent = currentValue.toFixed(1);
          if (progress < 1) {
              window.requestAnimationFrame(step);
          }
      };
      window.requestAnimationFrame(step);
  }
  
  // Run CGPA animation on scroll
  if (cgpaCircles.length > 0 || semProgressBars.length > 0) {
      // Run on page load
      animateCGPA();
      
      // Run on scroll
      window.addEventListener('scroll', animateCGPA);
  }
  
  // Add scroll to top button functionality
  const scrollTopButton = document.createElement('button');
  scrollTopButton.className = 'scroll-top';
  scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopButton);
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          scrollTopButton.classList.add('show');
      } else {
          scrollTopButton.classList.remove('show');
      }
  });
  
  // Scroll to top when button is clicked
  scrollTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  
  // Handle orientation changes for mobile devices
  window.addEventListener('orientationchange', function() {
      // Short timeout to let the browser adjust to new orientation
      setTimeout(() => {
          adjustNavbar();
          highlightNavLink();
      }, 200);
  });
  
  // Initialize - call necessary functions
  highlightNavLink();
});

  // Open modal
  document.querySelectorAll('.know-more').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const modal = document.querySelector(button.getAttribute('data-modal-target'));
      if (modal) modal.style.display = 'block';
    });
  });

  // Close modal
  document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });

  // Optional: Close on outside click
  window.addEventListener('click', event => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

