/* ============================================
   NIHARIKA GURUGUBELLI — PORTFOLIO JS
============================================ */

// ==========================================
// 1. CUSTOM CURSOR
// ==========================================
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth ring follows cursor using lerp
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .skill-card, .project-card, .cert-card, .tilt-card, .btn-primary, .btn-ghost, .nav-link'
);
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hovering');
    cursorRing.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hovering');
    cursorRing.classList.remove('hovering');
  });
});

// Click state
document.addEventListener('mousedown', () => {
  cursorDot.classList.add('clicking');
  cursorRing.classList.add('clicking');
});
document.addEventListener('mouseup', () => {
  cursorDot.classList.remove('clicking');
  cursorRing.classList.remove('clicking');
});


// ==========================================
// 2. CLICK RIPPLE EFFECT
// ==========================================
const rippleContainer = document.getElementById('rippleContainer');

document.addEventListener('click', (e) => {
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');
  ripple.style.left = e.clientX + 'px';
  ripple.style.top  = e.clientY + 'px';
  const colors = [
    'radial-gradient(circle, rgba(124,58,237,0.5), transparent)',
    'radial-gradient(circle, rgba(6,182,212,0.5), transparent)',
    'radial-gradient(circle, rgba(236,72,153,0.3), transparent)',
  ];
  ripple.style.background = colors[Math.floor(Math.random() * colors.length)];
  rippleContainer.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});


// ==========================================
// 3. PARTICLE CANVAS BACKGROUND
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x       = Math.random() * canvas.width;
    this.y       = Math.random() * canvas.height;
    this.size    = Math.random() * 2 + 0.5;
    this.speedX  = (Math.random() - 0.5) * 0.4;
    this.speedY  = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color   = Math.random() > 0.5 ? '124,58,237' : '6,182,212';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle   = `rgb(${this.color})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 100) * 0.08;
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();


// ==========================================
// 4. TYPEWRITER EFFECT
// ==========================================
const roles = [
  'UI/UX Designer',
  'Frontend Developer',
  'Creative Coder',
  'Figma Enthusiast',
  'Web Craftsperson',
];
let rIdx = 0, cIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWrite() {
  const current = roles[rIdx];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, cIdx--);
  } else {
    typeEl.textContent = current.substring(0, cIdx++);
  }
  let delay = isDeleting ? 60 : 110;
  if (!isDeleting && cIdx === current.length + 1) {
    delay = 1800; isDeleting = true;
  } else if (isDeleting && cIdx === 0) {
    isDeleting = false;
    rIdx = (rIdx + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeWrite, delay);
}
typeWrite();


// ==========================================
// 5. 3D TILT CARD EFFECT
// ==========================================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    const deltaX  = (e.clientX - centerX) / (rect.width  / 2);
    const deltaY  = (e.clientY - centerY) / (rect.height / 2);
    const rotateX = -deltaY * 10;
    const rotateY =  deltaX * 10;
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
      scale(1.02)
    `;
    const glow = card.querySelector('.skill-glow');
    if (glow) {
      glow.style.left   = (e.clientX - rect.left - 75) + 'px';
      glow.style.bottom = 'auto';
      glow.style.top    = (e.clientY - rect.top  - 75) + 'px';
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});


// ==========================================
// 6. SCROLL REVEAL ANIMATION
// ==========================================
const scrollEls = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.scroll-reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

scrollEls.forEach(el => revealObserver.observe(el));


// ==========================================
// 7. COUNTER ANIMATION
// ==========================================
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current  = 0;
      const step   = target / 40;
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// ==========================================
// 8. NAVBAR SCROLL EFFECT + ACTIVE LINK
// ==========================================
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#7c3aed';
    }
  });
});


// ==========================================
// 9. HAMBURGER MOBILE MENU
// ==========================================
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.style.display === 'flex';
  if (isOpen) {
    navLinksEl.style.display = '';
  } else {
    Object.assign(navLinksEl.style, {
      display: 'flex', flexDirection: 'column',
      position: 'absolute', top: '70px', left: '0', right: '0',
      background: 'rgba(6,7,15,0.97)', padding: '2rem', gap: '1.5rem',
      backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(124,58,237,0.2)'
    });
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.style.display = '';
  });
});


// ==========================================
// 10. PARALLAX ORBS ON MOUSE MOVE
// ==========================================
const orbs = document.querySelectorAll('.orb');

document.addEventListener('mousemove', (e) => {
  const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const strength = (i + 1) * 15;
    orb.style.transform = `translate(${xRatio * strength}px, ${yRatio * strength}px)`;
  });
});


// ==========================================
// 11. SCROLL PROGRESS BAR
// ==========================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0;
  height: 2px; z-index: 10000; width: 0%;
  background: linear-gradient(90deg, #7c3aed, #06b6d4);
  transition: width 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / scrollMax) * 100 + '%';
});


// ==========================================
// 12. GLITCH EFFECT ON NAME HOVER
// ==========================================
const heroName = document.querySelector('.hero-name');
if (heroName) {
  let glitchTimeout;
  heroName.addEventListener('mouseenter', () => {
    glitchTimeout = setInterval(() => {
      heroName.style.textShadow = `
        ${(Math.random()-0.5)*6}px ${(Math.random()-0.5)*6}px 0 rgba(6,182,212,0.5),
        ${(Math.random()-0.5)*6}px ${(Math.random()-0.5)*6}px 0 rgba(236,72,153,0.5)
      `;
      setTimeout(() => { heroName.style.textShadow = ''; }, 80);
    }, 200);
  });
  heroName.addEventListener('mouseleave', () => {
    clearInterval(glitchTimeout);
    heroName.style.textShadow = '';
  });
}


// ==========================================
// 13. MAGNETIC BUTTON EFFECT
// ==========================================
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


// ==========================================
// CONSOLE SIGNATURE
// ==========================================
console.log('%c✨ Niharika Gurugubelli — Portfolio', 'color:#7c3aed;font-size:18px;font-weight:bold;');
console.log('%cUI/UX Designer · Frontend Developer · BCA Final Year', 'color:#06b6d4;font-size:12px;');