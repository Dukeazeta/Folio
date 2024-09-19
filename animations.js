gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Glitch effect for the name
  const glitchEffect = (target) => {
    const originalText = target.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    let interval;

    const startGlitch = () => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        target.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    target.addEventListener('mouseenter', startGlitch);
    target.addEventListener('mouseleave', () => {
      clearInterval(interval);
      target.textContent = originalText;
    });
  };

  glitchEffect(document.querySelector('h1'));

  // Particle background effect
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
      opacity: { value: 0.5, random: false, anim: { enable: false } },
      size: { value: 3, random: true, anim: { enable: false } },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
    },
    retina_detect: true
  });

  // Smooth scroll animation
  const smoothScroll = (target) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 50 },
      ease: 'power3.inOut'
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });

  // Animated underline effect for navigation links
  gsap.utils.toArray('.nav-links a').forEach(link => {
    const underline = document.createElement('span');
    underline.classList.add('nav-underline');
    link.appendChild(underline);

    gsap.from(underline, {
      width: 0,
      duration: 0.3,
      ease: 'power1.inOut',
      paused: true
    });

    link.animation = gsap.to(underline, {
      width: '100%',
      duration: 0.3,
      ease: 'power1.inOut',
      paused: true
    });

    link.addEventListener('mouseenter', () => link.animation.play());
    link.addEventListener('mouseleave', () => link.animation.reverse());
  });

  // Animated skill bars
  gsap.utils.toArray('.skill-list li').forEach(skill => {
    const skillLevel = skill.querySelector('.skill-level');
    const level = skillLevel.textContent.toLowerCase();
    let width;

    switch (level) {
      case 'basic': width = '30%'; break;
      case 'intermediate': width = '60%'; break;
      case 'advanced': width = '90%'; break;
      default: width = '50%';
    }

    const bar = document.createElement('div');
    bar.classList.add('skill-bar');
    skill.appendChild(bar);

    gsap.from(bar, {
      scrollTrigger: {
        trigger: skill,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'restart pause reverse pause'
      },
      width: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.to(bar, { width: width });
  });

  // Animated counters for experience years
  gsap.utils.toArray('.info-box p').forEach(info => {
    const text = info.textContent;
    const match = text.match(/(\d+)\+/);
    
    if (match) {
      const number = parseInt(match[1]);
      let start = 0;
      
      const counter = { value: start };
      const updateCounter = () => {
        info.textContent = text.replace(/\d+\+/, Math.ceil(counter.value) + '+');
      };
      
      gsap.to(counter, {
        scrollTrigger: {
          trigger: info,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'restart pause reverse pause'
        },
        value: number,
        duration: 2,
        onUpdate: updateCounter,
        ease: 'power1.inOut'
      });
    }
  });

  // 3D parallax effect for project cards
  gsap.utils.toArray('.project-card').forEach(card => {
    const content = card.querySelector('.project-info');
    const image = card.querySelector('.project-img');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(content, {
        rotationY: -10 * x,
        rotationX: 10 * y,
        transformPerspective: 500,
        ease: 'power1.out',
        duration: 0.5
      });

      gsap.to(image, {
        rotationY: -15 * x,
        rotationX: 15 * y,
        transformPerspective: 500,
        scale: 1.05,
        ease: 'power1.out',
        duration: 0.5
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to([content, image], {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        ease: 'power3.out',
        duration: 0.5
      });
    });
  });

  // Animated background gradient
  gsap.to('body', {
    background: 'linear-gradient(45deg, #ff9a9e, #fad0c4, #ffecd2)',
    backgroundSize: '400% 400%',
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Reveal animations for sections
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  });
});