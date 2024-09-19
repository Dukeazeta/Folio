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

  // Smooth and slow scroll animation
  const smoothScroll = (target) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: target, offsetY: 50 },
      ease: 'power2.inOut'
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

    gsap.set(underline, { 
      width: 0,
      height: '2px',
      background: 'var(--primary-color)',
      position: 'absolute',
      bottom: '-2px',
      left: 0
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

    const barContainer = document.createElement('div');
    barContainer.classList.add('skill-bar-container');
    const bar = document.createElement('div');
    bar.classList.add('skill-bar');
    barContainer.appendChild(bar);
    skill.appendChild(barContainer);

    gsap.set(barContainer, {
      width: '100%',
      height: '6px',
      background: 'rgba(0,0,0,0.1)',
      borderRadius: '3px',
      marginTop: '5px',
      overflow: 'hidden'
    });

    gsap.set(bar, {
      width: 0,
      height: '100%',
      background: 'var(--primary-color)',
      borderRadius: '3px'
    });

    gsap.to(bar, {
      scrollTrigger: {
        trigger: skill,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'restart pause reverse pause'
      },
      width: width,
      duration: 1,
      ease: 'power3.out'
    });
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
        rotationY: -5 * x,
        rotationX: 5 * y,
        transformPerspective: 500,
        ease: 'power1.out',
        duration: 0.5
      });

      gsap.to(image, {
        rotationY: -7.5 * x,
        rotationX: 7.5 * y,
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

  // Cool scroll fade animation
  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach(element => {
    gsap.set(element, { 
      opacity: 0, 
      y: 50 
    });

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
});