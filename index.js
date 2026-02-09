let memeCount = 0;

// Cat memes
const catMemes = [
  {
    img: "https://i.imgflip.com/30uw4c.jpg",
    text: "Kahi ko ris kahi • You're tougher than this! 💪",
  },
  {
    img: "https://i.imgflip.com/9ehk.jpg",
    text: "When you're just existing and mummy finds fault 🙃 • It happens!",
  },
  {
    img: "https://i.imgflip.com/1hur.jpg",
    text: "Just nod and say 'hunxa' 😌 • Works most of the time!",
  },
  {
    img: "https://i.imgflip.com/4t0m5.jpg",
    text: "Plot twist: You're the strong one 🦁 • Believe it!",
  },
  {
    img: "https://i.imgflip.com/1hur.jpg",
    text: "Mummy today: 😤 | Mummy tomorrow: 'Kei khane babu?' 🥰",
  },
  {
    img: "https://i.imgflip.com/9ehk.jpg",
    text: "Mummy scolds = Love language 💕 • She cares!",
  },
];
const totalMemes = catMemes.length;

function goToScreen(num) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("screen" + num).classList.add("active");

  // Only show first meme when entering screen3 for the first time
  if (num === 3 && memeCount === 0) {
    showMeme();
  }

  createFloatingEmoji();
}

function nextMeme() {
  if (memeCount < catMemes.length) {
    showMeme();
  } else {
    goToScreen(4); // go to exit after last meme
  }
  createFloatingEmoji();
}
function showMeme() {
  if (memeCount >= catMemes.length) memeCount = 0; // loop back

  const message = catMemes[memeCount];
  const catImg = document.getElementById("catImage");
  catImg.src = message.img;

  // reset animation
  catImg.style.animation = "none";
  setTimeout(() => {
    catImg.style.animation = "slideIn 0.5s ease";
  }, 10);

  document.getElementById("complimentBox").textContent = message.text;

  // Update counter
  const inspirationsLeft = catMemes.length - memeCount - 1;
  document.getElementById("counter").textContent =
    inspirationsLeft > 0
      ? `${inspirationsLeft} inspirations left`
      : "Last inspiration!";

  memeCount++;
}

// Bonus screen
function showBonusScreen() {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("screen5").classList.add("active");
  createFloatingEmoji();
}

// Floating emojis: 💫 + random
function createFloatingEmoji() {
  const emojis = ["💛", "✨", "🌟", "😺", "💪", "🌈"];

  const emoji1 = document.createElement("div");
  emoji1.className = "floating-emoji";
  emoji1.textContent = "💫";
  emoji1.style.left = 10 + Math.random() * 20 + "%";
  emoji1.style.top = 50 + Math.random() * 20 - 10 + "%";
  document.body.appendChild(emoji1);
  setTimeout(() => emoji1.remove(), 3000);

  const emoji2 = document.createElement("div");
  emoji2.className = "floating-emoji";
  emoji2.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji2.style.left = 70 + Math.random() * 20 + "%";
  emoji2.style.top = 50 + Math.random() * 20 - 10 + "%";
  document.body.appendChild(emoji2);
  setTimeout(() => emoji2.remove(), 3000);
}
