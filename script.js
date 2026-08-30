document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // 2. Project Carousel Controls
  const carouselContainer = document.getElementById('carouselContainer');
  const scrollLeftBtn = document.getElementById('scrollLeft');
  const scrollRightBtn = document.getElementById('scrollRight');

  if (carouselContainer && scrollLeftBtn && scrollRightBtn) {
    const cardWidth = 220; 
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * 2;

    scrollLeftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // 3. Interactive Ginger Cat Follower
  const cat = document.createElement('div');
  cat.classList.add('fat-cat');
  cat.innerHTML = `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
      <ellipse cx="32" cy="38" rx="22" ry="16" fill="#E8833A"/>
      <ellipse cx="28" cy="40" rx="14" ry="10" fill="#FFF2E5"/>
      <circle cx="20" cy="24" r="10" fill="#E8833A"/>
      <polygon points="12,18 16,8 22,16" fill="#D36B23"/>
      <polygon points="22,16 26,8 30,18" fill="#D36B23"/>
      <path d="M 28 26 C 30 32, 34 32, 36 28" stroke="#B85210" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 34 32 C 38 38, 42 38, 44 34" stroke="#B85210" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="16" cy="22" r="2" fill="#2D5A27"/>
      <circle cx="24" cy="22" r="2" fill="#2D5A27"/>
      <polygon points="19,25 21,25 20,26.5" fill="#E8A2A8"/>
      <path d="M 12 25 L 4 24 M 12 26 L 5 27 M 26 25 L 34 24 M 26 26 L 33 27" stroke="#FFF2E5" stroke-width="1.2"/>
      <path d="M 52 38 Q 62 26 58 16" stroke="#E8833A" stroke-width="5" stroke-linecap="round" fill="none"/>
      <circle cx="30" cy="51" r="3.5" fill="#FFF2E5"/>
      <circle cx="39" cy="51" r="3.5" fill="#FFF2E5"/>
    </svg>
  `;
  
  if (document.body) {
    document.body.appendChild(cat);
  }

  let catX = window.innerWidth / 2;
  let catY = window.innerHeight / 2;
  let mouseX = catX;
  let mouseY = catY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCat() {
    const dx = mouseX - catX;
    const dy = mouseY - catY;
    
    catX += dx * 0.08;
    catY += dy * 0.08;

    const flip = dx < 0 ? 'scaleX(-1)' : 'scaleX(1)';
    cat.style.transform = `translate3d(${catX - 26}px, ${catY - 26}px, 0) ${flip}`;

    requestAnimationFrame(animateCat);
  }

  animateCat();
});