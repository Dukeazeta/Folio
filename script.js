document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const bars = document.querySelectorAll('.bar');
  
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  
      gsap.to(bars[0], {
        rotation: navLinks.classList.contains('active') ? 45 : 0,
        y: navLinks.classList.contains('active') ? 9 : 0,
        duration: 0.3
      });
  
      gsap.to(bars[1], {
        opacity: navLinks.classList.contains('active') ? 0 : 1,
        duration: 0.3
      });
  
      gsap.to(bars[2], {
        rotation: navLinks.classList.contains('active') ? -45 : 0,
        y: navLinks.classList.contains('active') ? -9 : 0,
        duration: 0.3
      });
    });
  
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        animateMenuIcon(false);
      });
    });
  
    function animateMenuIcon(isOpen) {
      gsap.to(bars[0], {
        rotation: isOpen ? 45 : 0,
        y: isOpen ? 9 : 0,
        duration: 0.3
      });
  
      gsap.to(bars[1], {
        opacity: isOpen ? 0 : 1,
        duration: 0.3
      });
  
      gsap.to(bars[2], {
        rotation: isOpen ? -45 : 0,
        y: isOpen ? -9 : 0,
        duration: 0.3
      });
    }
  });