const TIERS = [
  { name: 'Vulnerable',            color: '#2FD6C3', index: 0 },
  { name: 'Definitely Endangered', color: '#22B5DA', index: 1 },
  { name: 'Severely Endangered',   color: '#3E8DE9', index: 2 },
  { name: 'Critically Endangered', color: '#5C6FF0', index: 3 },
  { name: 'On the Brink',          color: '#8E5BE8', index: 4 },
  { name: 'Extinct',               color: '#6F6796', index: 5 },
];

const field = document.getElementById('dot-field');
let current = { cols: 0, rows: 0 };

function animateIntro() {
  const wordmark = document.querySelector('.wordmark');
  const chars = wordmark.textContent.split('');

  wordmark.innerHTML = chars
    .map(char => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  const tl = gsap.timeline();

  tl.from(wordmark.querySelectorAll('span'), {
    x: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.04,
    ease: 'power2.out',
  })

  .from('.statement-heading', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '+=1')

  .from('.statement-sub', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, '+=1')


  .call(() => {
    gsap.to(document.querySelectorAll('.dot'), {
      y: 300,
      opacity: 0,
      duration: 0.4,
      stagger: {
        amount: 5,
        from: 'random',
      },
      ease: 'power2.in',
      onComplete: () => {
        const indicator = document.querySelector('.scroll-indicator');

        gsap.to(indicator, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            document.querySelector('.scroll-container').style.overflowY = 'scroll';
          },
        });

        gsap.to(indicator.querySelector('.scroll-caret'), {
          y: 6,
          duration: 0.55,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      },
    });
  }, null, '+=2');
}

function animateExperience() {
  const directions = [
    { x: -120, y: -120 }, 
    { x:    0, y: -120 }, 
    { x:  120, y: -120 }, 
    { x: -120, y:  120 }, 
    { x:    0, y:  120 }, 
    { x:  120, y:  120 }, 
  ];

  const cards      = document.querySelectorAll('.category-card');
  const container  = document.querySelector('.scroll-container');
  const experience = document.getElementById('experience');
  let animated = false;

  cards.forEach((card, i) => {
    gsap.set(card, { x: directions[i].x, y: directions[i].y, opacity: 0 });
  });

  function runAnimation() {
    if (animated) return;
    if (container.scrollTop < experience.offsetTop - 10) return;
    animated = true;

    cards.forEach((card, i) => {
      gsap.to(card, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.75,
        delay: i * 0.06,
        ease: 'power3.out',
      });
    });
  }

  container.addEventListener('scroll', runAnimation);
}

function buildDotGrid() {
  const { width, height } = field.getBoundingClientRect();
  if (!width || !height) return;

  const cell = Math.max(34, Math.min(48, width * 0.05));
  const cols = Math.max(1, Math.round(width / cell));
  const rows = Math.max(1, Math.round(height / cell));


  if (cols === current.cols && rows === current.rows) return;
  current = { cols, rows };

  field.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  field.style.gridTemplateRows    = `repeat(${rows}, 1fr)`;

 
  const frag = document.createDocumentFragment();
  for (let i = 0, total = cols * rows; i < total; i++) {
    const tier = TIERS[(Math.random() * TIERS.length) | 0];
    const dot  = document.createElement('span');
    dot.className = 'dot';
    dot.style.setProperty('--c', tier.color);
    dot.dataset.tier = tier.index;
    dot.setAttribute('aria-hidden', 'true');
    frag.appendChild(dot);
  }
  field.replaceChildren(frag);
}

const ro = new ResizeObserver(() => {
  clearTimeout(field._t);
  field._t = setTimeout(buildDotGrid, 150);
});
ro.observe(field);

document.addEventListener('DOMContentLoaded', () => {
  animateExperience();
  animateIntro();
  buildDotGrid();
});
