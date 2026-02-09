let memeCount = 0;
let preloadedImages = {};
let isMuted = false;

// Cat memes
const catMemes = [
  {
    img: "./images/insp1.jpg",
    text: "Kahi ko ris kahi • You're tougher than this! 💪",
  },
  {
    img: "./images/insp2.jpg",
    text: "When you're just existing and mummy finds fault 🙃 • It happens!",
  },
  {
    img: "./images/insp3.jpg",
    text: "Just nod and say 'hunxa' 😌 • Works most of the time!",
  },
  {
    img: "./images/insp4.jpg",
    text: "Plot twist: You're the strong one 🦁 • Believe it!",
  },
  {
    img: "./images/insp5.jpg",
    text: "Mummy today: 😤 | Mummy tomorrow: 'Kei khane babu?' 🥰",
  },
  {
    img: "./images/insp6.jpg",
    text: "Mummy scolds = Love language 💕 • She cares!",
  },
];

// Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  if (isMuted) return;

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  const now = audioContext.currentTime;

  switch (type) {
    case "click":
      osc.type = "square";
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
      break;
    case "meme":
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      break;
    case "bonus":
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc.type = "triangle";
      osc2.type = "sine";
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.exponentialRampToValueAtTime(659, now + 0.15);
      osc2.frequency.setValueAtTime(783, now);
      osc2.frequency.exponentialRampToValueAtTime(1046, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      osc2.start(now);
      osc2.stop(now + 0.3);
      break;
    case "complete":
      const osc3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      osc.type = "triangle";
      osc3.type = "sine";
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.25);
      osc3.frequency.setValueAtTime(850, now);
      osc3.frequency.exponentialRampToValueAtTime(1050, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      gain3.gain.setValueAtTime(0.12, now);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc3.connect(gain3);
      gain3.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.25);
      osc3.start(now);
      osc3.stop(now + 0.25);
      break;
  }
}

// Mute toggle
function toggleMute() {
  isMuted = !isMuted;
  document.getElementById("muteBtn").textContent = isMuted ? "🔇" : "🔊";
  if (!isMuted) playSound("click");
}

// Preload images
function preloadImages() {
  catMemes.forEach((m, index) => {
    const img = new Image();
    img.src = m.img;
    preloadedImages[index] = img;
  });

  preloadedImages.happy = new Image();
  preloadedImages.happy.src = "./images/happy.jpg";

  preloadedImages.salute = new Image();
  preloadedImages.salute.src = "./images/cat-salute.gif";

  preloadImages.bonus = new Image();
  preloadImages.bonus.src = "./images/bonus.jpg";
}
window.addEventListener("load", preloadImages);

// Screen navigation
function goToScreen(num) {
  playSound("click");
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("screen" + num).classList.add("active");

  if (num === 3 && memeCount === 0) showMeme();
  if (num === 4) showHappy();
  if (num === 6) showSalute();
  createFloatingEmoji();
}

// Meme functions
function nextMeme() {
  if (memeCount < catMemes.length) {
    playSound("meme");
    showMeme();
  } else {
    goToScreen(4);
  }
  createFloatingEmoji();
}

function showMeme() {
  if (memeCount >= catMemes.length) memeCount = 0;

  const msg = catMemes[memeCount];
  const img = document.getElementById("memeImage");
  const loader = document.getElementById("memeLoader");
  loader.classList.add("hidden"); // preloaded
  img.src = preloadedImages[memeCount].src;
  img.classList.add("loaded");

  img.style.animation = "none";
  setTimeout(() => (img.style.animation = "slideIn 0.5s ease"), 10);

  document.getElementById("memeComplimentBox").textContent = msg.text;
  const left = catMemes.length - memeCount - 1;
  document.getElementById("memeCounter").textContent =
    left > 0 ? `${left} inspirations left` : "Last inspiration!";

  memeCount++;
}

function showHappy() {
  document.getElementById("screen4").classList.add("active");
  const img = document.getElementById("happyImage");
  img.style.animation = "slideIn 0.5s ease";
}

function showSalute() {
  document.getElementById("screen6").classList.add("active");
  const img = document.getElementById("saluteImage");
  img.style.animation = "slideIn 0.5s ease";
  playSound("complete");
}

function showBonus() {
  document.getElementById("screen5").classList.add("active");
  const img = document.getElementById("bonus");
  img.style.animation = "slideIn 0.5s ease";
  playSound("meme");
}

// Bonus screen
function showBonusScreen() {
  playSound("bonus");
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("screen5").classList.add("active");
  createFloatingEmoji();
}

// Floating emojis
function createFloatingEmoji() {
  const emojis = ["💛", "✨", "🌟", "😺", "💪", "🌈"];
  const e1 = document.createElement("div");
  e1.className = "floating-emoji";
  e1.textContent = "💫";
  e1.style.left = 10 + Math.random() * 20 + "%";
  e1.style.top = 50 + Math.random() * 20 - 10 + "%";
  document.body.appendChild(e1);
  setTimeout(() => e1.remove(), 3000);

  const e2 = document.createElement("div");
  e2.className = "floating-emoji";
  e2.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  e2.style.left = 70 + Math.random() * 20 + "%";
  e2.style.top = 50 + Math.random() * 20 - 10 + "%";
  document.body.appendChild(e2);
  setTimeout(() => e2.remove(), 3000);
}

// Reset app
function resetApp() {
  memeCount = 0;
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("screen1").classList.add("active");
  playSound("complete");
}

//for crack
function crackAndEnd() {
  playSound("complete"); // final sound

  const container = document.getElementById("container");
  const blackout = document.getElementById("blackout");

  // Crack (shake)
  container.classList.add("crack");

  // After shake → fall
  setTimeout(() => {
    container.classList.remove("crack");
    container.classList.add("fall");
  }, 500);

  // After fall → blackout
  setTimeout(() => {
    blackout.style.opacity = "1";
  }, 1200);
}
