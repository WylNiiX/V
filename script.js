const button = document.getElementById("celebrateBtn");
const message = document.getElementById("message");
const canvas = document.getElementById("poppers");
const ctx = canvas.getContext("2d");

const messages = [
  "You are loved today and always 💞",
  "Sending hugs, hearts, and happiness 💝",
  "You're my favorite reason to smile 😊",
  "Love looks amazing on you ✨",
  "Wishing you the sweetest Valentine's Day 🤍🌹",
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
  launchPoppers();
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
