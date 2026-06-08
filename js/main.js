const CATEGORIES = [
  {
    tier:  'Vulnerable',
    color: '#2FD6C3',
    picks: ['Friulian', 'Welsh', 'Mixtec', 'Irish', 'Kashubian'],
  },
  {
    tier:  'Definitely Endangered',
    color: '#22B5DA',
    picks: ['Mapuche', 'Breton', 'Asturian', 'Ladino (Judeo-Spanish)', 'Karelian'],
  },
  {
    tier:  'Severely Endangered',
    color: '#3E8DE9',
    picks: ['Mohawk', 'Jicarilla Apache', 'Tlingit', 'Hidatsa', 'Chiricahua Apache'],
  },
  {
    tier:  'Critically Endangered',
    color: '#5C6FF0',
    picks: ['Cayuga', "Ts'ixa", 'Comanche', 'Haida', 'Kiowa'],
  },
  {
    tier:  'Last Speakers',
    color: '#8E5BE8',
    picks: [],
  },
];

let allLanguages = [];

async function fetchLanguages() {
  const res = await fetch('data/endangered-languages.json');
  allLanguages = await res.json();
}

function buildLanguageView(catIndex) {
  const cat = CATEGORIES[catIndex];
  const byName = Object.fromEntries(allLanguages.map(l => [l.name, l]));
  const languages = cat.picks.map(n => byName[n]).filter(Boolean);

  const view = document.getElementById('language-view');
  view.innerHTML = '';

  let currentIndex    = 0;
  let currentDotCount = 0;
  let allDots         = [];
  let dotScale        = 1;
  let isAnimating     = false;

  const back = document.createElement('button');
  back.className = 'lang-back';
  back.textContent = '←';
  back.addEventListener('click', closeLanguageView);
  view.appendChild(back);

  const slide = document.createElement('div');
  slide.className = 'lang-slide';

  const left = document.createElement('div');
  left.className = 'lang-left';

  const right = document.createElement('div');
  right.className = 'lang-right';

  const box = document.createElement('div');
  box.className = 'dot-box';

  const grid = document.createElement('div');
  grid.className = 'dot-box-grid';

  const footer = document.createElement('div');
  footer.className = 'dot-box-footer';
  footer.innerHTML = '<span></span><span></span>';

  box.appendChild(grid);
  box.appendChild(footer);
  right.appendChild(box);
  slide.appendChild(left);
  slide.appendChild(right);
  view.appendChild(slide);

  const pills = document.createElement('div');
  pills.className = 'lang-pills';

  const setPillColor = (el, active) => {
    el.style.background  = active ? cat.color : '';
    el.style.borderColor = active ? cat.color : '';
  };

  const pillEls = languages.map((_, i) => {
    const pill = document.createElement('div');
    pill.className = 'lang-pill';
    pill.style.cursor = 'pointer';
    setPillColor(pill, i === 0);
    pill.addEventListener('click', () => navigateTo(i));
    pills.appendChild(pill);
    return pill;
  });

  view.appendChild(pills);

  function renderLeft(lang) {
    left.innerHTML = `
      <p class="lang-status" style="color:${cat.color}">${cat.tier}</p>
      <h2 class="lang-name">${lang.name}</h2>
      <div class="lang-count">
        <span class="lang-number" style="color:${cat.color}">${lang.speakers.toLocaleString()}</span>
        <span class="lang-unit">living speakers</span>
      </div>
      <div class="lang-meta">
        <div class="lang-row">
          <span class="lang-key">Family</span>
          <span class="lang-val">${lang.language_family}</span>
        </div>
        <div class="lang-row">
          <span class="lang-key">Country</span>
          <span class="lang-val">${lang.country}</span>
        </div>
        <div class="lang-row">
          <span class="lang-key">Region</span>
          <span class="lang-val">${lang.region}</span>
        </div>
      </div>
    `;
  }

  function animateDots(fromCount, toCount) {
    if (fromCount === toCount) return;
    if (toCount < fromCount) {
      gsap.to(allDots.slice(toCount, fromCount), { opacity: 0, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(allDots.slice(fromCount, toCount), { opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
  }

  function navigateTo(index) {
    if (isAnimating || !allDots.length || index === currentIndex || index < 0 || index >= languages.length) return;
    isAnimating = true;

    const direction     = index > currentIndex ? 1 : -1;
    const next          = languages[index];
    const nextDotCount  = Math.round(next.speakers / dotScale);

    gsap.to(left, {
      x: -40 * direction,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        renderLeft(next);
        footer.querySelectorAll('span')[1].textContent = `n = ${next.speakers.toLocaleString()}`;
        gsap.fromTo(left,
          { x: 40 * direction, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out', onComplete: () => { isAnimating = false; } }
        );
      },
    });

    animateDots(currentDotCount, nextDotCount);
    pillEls.forEach((p, i) => setPillColor(p, i === index));

    currentDotCount = nextDotCount;
    currentIndex    = index;
  }

  const handleKey = (e) => {
    if (!view.classList.contains('is-open')) return;
    if (e.key === 'ArrowRight') navigateTo(currentIndex + 1);
    if (e.key === 'ArrowLeft')  navigateTo(currentIndex - 1);
  };
  document.addEventListener('keydown', handleKey);

  const onWheel = (e) => {
    if (!view.classList.contains('is-open') || isAnimating) return;
    e.preventDefault();
    if (e.deltaY > 0) navigateTo(currentIndex + 1);
    if (e.deltaY < 0) navigateTo(currentIndex - 1);
  };
  slide.addEventListener('wheel', onWheel, { passive: false });

  view._removeKeyListener = () => {
    document.removeEventListener('keydown', handleKey);
    slide.removeEventListener('wheel', onWheel);
  };

  requestAnimationFrame(() => {
    const dotSize = 14;
    const gap     = 6;
    const padding = 28;

    const fallbackW = (window.innerWidth - 120) / 2;
    const fallbackH =  window.innerHeight - 64 - 65 - 46;
    const usableW   = (box.clientWidth  || fallbackW) - padding * 2;
    const usableH   = (box.clientHeight || fallbackH) - (footer.clientHeight || 40) - padding * 2;

    const cols        = Math.floor(usableW / (dotSize + gap));
    const rows        = Math.floor(usableH / (dotSize + gap));
    const totalCap    = cols * rows;
    const maxSpeakers = Math.max(...languages.map(l => l.speakers));
    dotScale          = Math.max(1, Math.round(maxSpeakers / totalCap));
    const scaleDisp   = dotScale;

    grid.style.gridTemplateColumns = `repeat(${cols}, ${dotSize}px)`;
    grid.style.gap = `${gap}px`;

    const frag = document.createDocumentFragment();
    for (let i = 0; i < totalCap; i++) {
      const dot = document.createElement('span');
      dot.className = 'lang-dot';
      dot.style.background = cat.color;
      dot.style.width  = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.opacity = '0';
      frag.appendChild(dot);
    }
    grid.appendChild(frag);
    allDots = Array.from(grid.querySelectorAll('.lang-dot'));

    const first = languages[0];
    currentDotCount = Math.round(first.speakers / dotScale);
    allDots.slice(0, currentDotCount).forEach(d => { d.style.opacity = '1'; });

    footer.querySelectorAll('span')[0].textContent = `1 dot = ${scaleDisp.toLocaleString()} ${scaleDisp === 1 ? 'speaker' : 'speakers'}`;
    footer.querySelectorAll('span')[1].textContent = `n = ${first.speakers.toLocaleString()}`;
    renderLeft(first);
  });
}

function openLanguageView(catIndex) {
  buildLanguageView(catIndex);
  const view = document.getElementById('language-view');
  view.setAttribute('aria-hidden', 'false');
  view.classList.add('is-open');
  gsap.fromTo(view, { y: '100%' }, { y: '0%', duration: 0.5, ease: 'power3.out' });
}

function closeLanguageView() {
  const view = document.getElementById('language-view');
  gsap.to(view, {
    y: '100%',
    duration: 0.4,
    ease: 'power3.in',
    onComplete: () => {
      if (view._removeKeyListener) view._removeKeyListener();
      view.classList.remove('is-open');
      view.setAttribute('aria-hidden', 'true');
      view.innerHTML = '';
    },
  });
}

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
  const cards      = document.querySelectorAll('.category-card');
  const container  = document.querySelector('.scroll-container');
  const experience = document.getElementById('experience');
  let animated = false;

  gsap.set(cards, { opacity: 0 });

  function runAnimation() {
    if (animated) return;
    if (container.scrollTop < experience.offsetTop - 10) return;
    animated = true;

    gsap.to(cards, {
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }

  container.addEventListener('scroll', runAnimation);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      openLanguageView(Number(card.dataset.index));
    });
  });
}

function animateLastSpeakers() {
  const container = document.querySelector('.scroll-container');
  const section   = document.getElementById('last-speakers');
  const left      = document.querySelector('.last-left');
  const right     = document.querySelector('.last-right');
  const bottom    = document.querySelector('.last-bottom');
  const dot       = document.querySelector('.last-dot');
  const innerRing = document.querySelector('.last-circle-inner');
  const outerRing = document.querySelector('.last-circle-outer');
  let animated = false;

  gsap.set([left, right, bottom], { opacity: 0, y: 40 });

  function runAnimation() {
    if (animated) return;
    if (container.scrollTop < section.offsetTop - 10) return;
    animated = true;

    gsap.to(left, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    gsap.to(right, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' });
    gsap.to(bottom, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' });

    // pulse wave: dot pulses on, then rings cascade out
    const pulse = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });

    // pulse on: dot -> inner -> outer
    pulse.to(dot, { scale: 1.3, opacity: 1, duration: 0.5, ease: 'sine.inOut' }, 0);
    pulse.to(innerRing, { borderColor: 'rgba(142, 91, 232, 0.6)', duration: 0.5, ease: 'sine.inOut' }, 0.35);
    pulse.to(outerRing, { borderColor: 'rgba(142, 91, 232, 0.8)', duration: 0.5, ease: 'sine.inOut' }, 0.7);

    // pulse off: dot -> inner -> outer
    pulse.to(dot, { scale: 1, opacity: 0.7, duration: 0.5, ease: 'sine.inOut' }, 1.4);
    pulse.to(innerRing, { borderColor: 'rgba(142, 91, 232, 0.2)', duration: 0.5, ease: 'sine.inOut' }, 1.75);
    pulse.to(outerRing, { borderColor: 'rgba(142, 91, 232, 0.3)', duration: 0.5, ease: 'sine.inOut' }, 2.1);
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
    const tier = CATEGORIES[(Math.random() * CATEGORIES.length) | 0];
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
  fetchLanguages();
  animateExperience();
  animateLastSpeakers();
  animateIntro();
  buildDotGrid();
});
