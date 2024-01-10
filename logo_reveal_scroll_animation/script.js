let grid = document.querySelector(".stagger-grid");
let columns, centerX, centerY;
let gridAnimation = null;
const gridItemSize = 24;
const rows = 13; 
const radius = 5;

window.addEventListener('resize', function() {
  document.querySelectorAll('.stagger-container').forEach(container => {
    createGrid(container);
    initializeAnimation(container);
  });
});

document.querySelectorAll('.stagger-container').forEach((container, index) => {
  if (!container.id) {
    container.id = `stagger-container-${index}`;
  }
  createGrid(container);
  initializeAnimation(container); 
});

function createGrid(container) {
  let columns = Math.floor(window.document.body.clientWidth / gridItemSize);
  columns = (columns % 2 === 0) ? columns - 1 : columns;

  const grid = container.querySelector('.stagger-grid');
  grid.innerHTML = Array(columns * rows).fill('<div class="grid-item"></div>').join('');

  const gridWidth = columns * gridItemSize;
  grid.style.width = `${gridWidth}px`;
}

function initializeAnimation(container) {
  const gridItems = Array.from(container.querySelectorAll('.grid-item'));
  const distances = [];
  const radius = 5;

  let columns = Math.floor(window.document.body.clientWidth / gridItemSize);
  columns = (columns % 2 === 0) ? columns - 1 : columns;
  let centerX = Math.floor(columns / 2);
  let centerY = Math.floor(rows / 2);

  gridItems.forEach((item, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const distanceFromCenter = Math.sqrt(Math.pow(centerX - col, 2) + Math.pow(centerY - row, 2));
    distances.push(distanceFromCenter);
  });

  container.gridAnimation = anime({
    targets: gridItems,
    scale: (el, i) => distances[i] <= radius ? [1, 0] : 1,
    opacity: (el, i) => distances[i] <= radius ? [1,0] : 1,
    easing: 'easeOutSine',
    autoplay: false,
    delay: anime.stagger(200, {grid: [columns, rows], from: 'center'}),
    complete: function(anim) {}
  });
}

document.addEventListener('scroll', function handleScrollEvent() {
  document.querySelectorAll('.stagger-container').forEach(container => {
    if (isElementInView(container)) {
      let progress = calculateScrollProgress(container);
      if (container.gridAnimation) {
        container.gridAnimation.seek(container.gridAnimation.duration * progress / 2);
      }
      const svgElement = container.querySelector('svg');
      updateSvgVisibility(progress, svgElement);
    }
  });
});

function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function calculateScrollProgress(element) {
  const rect = element.getBoundingClientRect();
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  // Inconsistencies in scroll animation  
  // const responsiveMultiplier = Math.max(0.5, Math.min(1.5, 1.2 - (window.innerWidth / 1920)));
  // const startAnimationAt = rect.top + scrollPosition - windowHeight * 0.75 * responsiveMultiplier;
  // const endAnimationAt = rect.bottom + scrollPosition - windowHeight * 0.5 * responsiveMultiplier;

  const startAnimationAt = rect.top + scrollPosition - windowHeight * 0.75;
  const endAnimationAt = rect.bottom + scrollPosition - windowHeight * 0.5;


  const progress = (scrollPosition - startAnimationAt) / (endAnimationAt - startAnimationAt);
  
  return Math.max(0, Math.min(1, progress)); // Clamps the value between 0 and 1
}

function updateSvgVisibility(progress, svgElement) {
  if (progress > 0.75) {
    svgElement.style.opacity = 1;
  } else {
    svgElement.style.opacity = 0;
  }
}