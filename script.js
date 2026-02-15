const button = document.getElementById("celebrateBtn");
const nahButton = document.getElementById("nahBtn");
const message = document.getElementById("message");
const canvas = document.getElementById("poppers");
const ctx = canvas.getContext("2d");
const emojiBackground = document.querySelector(".emoji-background");

// const backgroundEmojis = ["🤍", "🤍", "🤍", "🤍🌹", "🤍🌹"];
const backgroundEmojis = ["🌼", "🪷", "🐣", "🦢", "🌸", "💛", "🐈"];


function fillEmojiBackground() {
  if (!emojiBackground) return;

  const minCellWidth = window.innerWidth <= 640 ? 44 : 56;
  const minCellHeight = window.innerWidth <= 640 ? 40 : 48;
  const rows = Math.ceil(window.innerHeight / minCellHeight) + 2;
  const cols = Math.ceil(window.innerWidth / minCellWidth) + 1;
  const totalCells = Math.ceil((rows * cols) / 2);

  emojiBackground.innerHTML = "";

  for (let i = 0; i < totalCells; i += 1) {
    const span = document.createElement("span");
    span.textContent =
      backgroundEmojis[Math.floor(Math.random() * backgroundEmojis.length)];
    emojiBackground.appendChild(span);
  }
}


// const messages = [
//   "You are loved today and always 🤍",
//   "You're my favorite reason to smile 😊",
//   "Everything looks amazing on you ✨",
//   "Sending du'as, kindness, and happiness your way 🌷",
//   "I am so grateful to have known you",
//   "May your character and light always shine ✨",
//   "Wishing you a peaceful and blessed day filled with goodness 🤍🌹"
// ];

const messages = [
  "You are one of the funniest people I know",
  "You make everything lighter and brighter ✨",
  "Sending du'as, kindness, and happiness your way",
  "I genuinely feel lucky that Allah let me meet you",
  "Some people are rare. You are one of them",
  "You are important to me, and I dont say that lightly",
  "Talking to you always feel natural and sincere 🌿",
  "I really like how curious you are, thats a sign of real intelligence",
  "May Allah always protect your beautiful and kind heart 🤍",
];

const nahMessages = [
  "Can the duck change your mind?",
  "Are you sure?",
  "I will tell Lumba!",
];

let confetti = [];
let animationFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function launchPoppers() {
  const colors = ["#ff4fa3", "#ffd166", "#7cf7ff", "#ffe8ff", "#9bff9b"];

  for (let i = 0; i < 170; i += 1) {
    confetti.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: randomBetween(-5, 5),
      vy: randomBetween(-10, -3),
      size: randomBetween(4, 9),
      color: colors[Math.floor(Math.random() * colors.length)],
      life: randomBetween(55, 95),
      rotation: randomBetween(0, Math.PI * 2),
      spin: randomBetween(-0.2, 0.2),
    });
  }

  if (!animationFrame) animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti = confetti.filter((piece) => piece.life > 0);

  confetti.forEach((piece) => {
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.vy += 0.2;
    piece.rotation += piece.spin;
    piece.life -= 1;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
    ctx.restore();
  });

  if (confetti.length > 0) {
    animationFrame = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

button.addEventListener("click", () => {
  message.textContent = messages[Math.floor(Math.random() * messages.length)];
  message.style.color = "#d25d98";
  launchPoppers();
});

// nahButton.addEventListener("click", () => {
//   message.textContent = "Can the duck change your mind? Are you sure? I will tell Lumba! 🥺🦆";
// });

nahButton.addEventListener("click", () => {
  message.textContent = nahMessages[Math.floor(Math.random() * nahMessages.length)];
  message.style.color = "#FF6B6B";
});

window.addEventListener("resize", () => {
  resizeCanvas();
  fillEmojiBackground();
});

resizeCanvas();
fillEmojiBackground();
