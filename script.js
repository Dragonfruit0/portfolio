// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Particle.js Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#4acfee'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#4acfee',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// Custom Rocket Cursor - Ultra Fast and Responsive
const cursor = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  // Ultra fast cursor movement - almost instant response
  cursorX += dx * 0.8; // Increased from 0.3 to 0.8 for much faster response
  cursorY += dy * 0.8; // Increased from 0.3 to 0.8 for much faster response
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  requestAnimationFrame(updateCursor);
}

updateCursor();

// Dynamic Text Animation - Updated with Mahfooz's skills
const dynamicText = document.querySelector('.dynamic-text');
const texts = [
  'Full Stack Developer',
  'AI & ML Enthusiast',
  'Python Developer',
  'Crypto Trader',
  'World Teen Parliament Member',
  'Django Developer',
  'Flutter Developer',
  'Data Analyst'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    dynamicText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    dynamicText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeText, typingSpeed);
}

// Start typing animation after page load
setTimeout(typeText, 2000);

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const count = parseInt(counter.innerText);
  const increment = target / speed;
  
  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => animateCounter(counter), 1);
  } else {
    counter.innerText = target + (target === 2023 ? '' : '+');
  }
}

// Intersection Observer for counters
const observerOptions = {
  threshold: 0.7,
  rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id') || 'home';
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Parallax Effect for Floating Elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-icon');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Interactive Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Add particle effect
    createParticles(card);
  });
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });
});

function createParticles(card) {
  const particlesContainer = card.querySelector('.card-particles');
  if (!particlesContainer) return;
  
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: #4acfee;
      border-radius: 50%;
      pointer-events: none;
      animation: particleFloat 2s ease-out forwards;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 0.5 + 's';
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-50px) scale(0);
    }
  }
`;
document.head.appendChild(style);

// Glow Effect on Scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrolled / maxScroll;
  
  document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
});

// Interactive Social Icons
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(74, 207, 238, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    const rect = icon.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    icon.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Hire Me Button Effect
const hireMeBtn = document.querySelector('.glow-btn');

if (hireMeBtn) {
  hireMeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create explosion effect
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #4acfee;
        border-radius: 50%;
        pointer-events: none;
        animation: explode 1s ease-out forwards;
      `;
      
      const angle = (i / 20) * Math.PI * 2;
      const velocity = 100 + Math.random() * 50;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;
      
      particle.style.setProperty('--x', x + 'px');
      particle.style.setProperty('--y', y + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  });
}

// Add explosion animation CSS
const explodeStyle = document.createElement('style');
explodeStyle.textContent = `
  @keyframes explode {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--x), var(--y)) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(explodeStyle);

// Mouse Trail Effect - Optimized and Faster
const trail = [];
const trailLength = 12; // Reduced for better performance

document.addEventListener('mousemove', (e) => {
  trail.push({ x: e.clientX, y: e.clientY });
  
  if (trail.length > trailLength) {
    trail.shift();
  }
  
  // Update trail elements with faster response
  trail.forEach((pos, index) => {
    const opacity = index / trailLength;
    const size = 12 - (index * 0.3); // Smaller trail elements
    
    if (!trail[index].element) {
      trail[index].element = document.createElement('div');
      trail[index].element.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(128, 128, 128, ${opacity}) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.02s ease;
      `;
      document.body.appendChild(trail[index].element);
    }
    
    trail[index].element.style.left = pos.x - size / 2 + 'px';
    trail[index].element.style.top = pos.y - size / 2 + 'px';
    trail[index].element.style.opacity = opacity;
  });
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
  // Update scroll-based animations here
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 1s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
  
  // Add entrance animations for elements
  const animatedElements = document.querySelectorAll('.hero-content, .info-card, .project-card, .about-card, .skills-card, .contact-card');
  
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowDown':
      e.preventDefault();
      window.scrollBy(0, 100);
      break;
    case 'ArrowUp':
      e.preventDefault();
      window.scrollBy(0, -100);
      break;
    case 'Home':
      e.preventDefault();
      window.scrollTo(0, 0);
      break;
    case 'End':
      e.preventDefault();
      window.scrollTo(0, document.body.scrollHeight);
      break;
  }
});

// Add skill tag interactions
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
  tag.addEventListener('click', () => {
    // Add a small animation when clicked
    tag.style.transform = 'scale(1.1)';
    setTimeout(() => {
      tag.style.transform = 'scale(1)';
    }, 200);
  });
});

console.log('🚀 Mahfooz Faiz Portfolio loaded with amazing animations!'); 