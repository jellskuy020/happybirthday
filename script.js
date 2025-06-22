// Animasi bintang jatuh
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
let shootingStars = [];
let stars = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

// Bintang statis
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.1 + 0.2,
    alpha: Math.random() * 0.5 + 0.5
  });
}

// Bintang jatuh
function createShootingStar() {
  shootingStars.push({
    x: randomBetween(0, width),
    y: randomBetween(-height * 0.2, 0),
    len: randomBetween(80, 180),
    speed: randomBetween(8, 16),
    size: randomBetween(0.7, 1.5),
    alpha: randomBetween(0.5, 1),
    life: 0,
    angle: randomBetween(Math.PI / 4, Math.PI / 3)
  });
}

setInterval(() => {
  for (let i = 0; i < 3; i++) createShootingStar();
}, 500);

function draw() {
  ctx.clearRect(0, 0, width, height);

  // Draw static stars
  for (let s of stars) {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  // Draw shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let star = shootingStars[i];
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = star.size;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(
      star.x - Math.cos(star.angle) * star.len,
      star.y - Math.sin(star.angle) * star.len
    );
    ctx.stroke();
    ctx.restore();

    // Update position
    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;
    star.life += star.speed;

    // Remove if out of screen
    if (
      star.x > width + 100 ||
      star.y > height + 100 ||
      star.life > width * 1.2
    ) {
      shootingStars.splice(i, 1);
    }
  }

  requestAnimationFrame(draw);
}
draw();

// Birthday logic
const openBtn = document.getElementById('openBtn');
const startBox = document.getElementById('startBox');
const balloons = document.getElementById('balloons');
const card = document.getElementById('birthdayCard');
const typewriter = document.getElementById('typewriter');
const nextBtn = document.getElementById('nextBtn');
const longCard = document.getElementById('longCard');
const toPhotoBtn = document.getElementById('toPhotoBtn');
const photoSlide = document.getElementById('photoSlide');
const bgMusic = document.getElementById('bgMusic');
const confetti = document.getElementById('confetti');
const message = "Selamat ulang tahun ya! Semoga semua hal baik datang di hidupmu—kesehatan, kebahagiaan, dan hal-hal kecil yang bikin kamu senyum tiap hari. Makasih udah jadi bagian penting dalam hidupku";

// Pastikan balon dan kartu tidak tampil di awal
if (balloons) balloons.style.display = 'none';
if (card) card.style.display = 'none';
if (longCard) longCard.style.display = 'none';
if (photoSlide) photoSlide.style.display = 'none';

// Pause lagu di awal (agar tidak autoplay sebelum klik)
if (bgMusic) bgMusic.pause();

if (openBtn) openBtn.onclick = function() {
  if (bgMusic) {
    bgMusic.currentTime = 0;
    bgMusic.play();
  }
  if (startBox) startBox.classList.add('hide');
  setTimeout(() => {
    if (startBox) startBox.style.display = 'none';
    if (balloons) balloons.style.display = 'block';
    setTimeout(() => {
      if (balloons) balloons.style.display = 'none';
      if (card) card.style.display = 'flex';
      setTimeout(() => {
        if (card) card.classList.add('show');
        launchConfetti();
        if (typewriter) typeWriterEffect(message, typewriter, 0, 30, () => {
          if (nextBtn) nextBtn.style.display = 'inline-block';
        });
      }, 50);
    }, 2300);
  }, 700);
};

function typeWriterEffect(text, el, i, speed, callback) {
  if (i < text.length) {
    el.innerHTML = '<span class="typewriter">' + text.slice(0, i+1).replace(/\n/g, '<br>') + '</span>';
    setTimeout(() => typeWriterEffect(text, el, i+1, speed, callback), text[i] === '\n' ? speed*6 : speed);
  } else {
    el.innerHTML = text.replace(/\n/g, '<br>');
    if (callback) callback();
  }
}

if (nextBtn) nextBtn.onclick = function() {
  if (card) card.classList.remove('show');
  setTimeout(() => {
    if (card) card.style.display = 'none';
    if (longCard) longCard.style.display = 'flex';
    setTimeout(() => {
      if (longCard) longCard.classList.add('show');
      launchConfetti();
    }, 50);
  }, 700);
};

if (toPhotoBtn) toPhotoBtn.onclick = function() {
  if (longCard) longCard.classList.remove('show');
  setTimeout(() => {
    if (longCard) longCard.style.display = 'none';
    if (photoSlide) {
      photoSlide.classList.add('show');
      photoSlide.style.display = 'flex';
    }
  }, 700);
};

function launchConfetti() {
  if (!confetti) return;
  confetti.innerHTML = '';
  const colors = ['#ff6f91', '#f9f871', '#bbded6', '#8ac6d1', '#ffb6b9', '#fff', '#f7cac9'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.8) + 's';
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.appendChild(piece);
  }
  setTimeout(() => { confetti.innerHTML = ''; }, 2500);
}