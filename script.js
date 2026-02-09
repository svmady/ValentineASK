const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const imageDisplay = document.getElementById("imageDisplay");
const valentineQuestion = document.getElementById("valentineQuestion");
const responseButtons = document.getElementById("responseButtons");
const loveMessage = document.getElementById("loveMessage");
const yesSound = document.getElementById("yesSound");

// Name from URL
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
if (name) document.getElementById("name").textContent = name;

// Images
const IMAGES = [
  "image1.gif",
  "image2.gif",
  "image3.gif",
  "image4.gif",
  "image5.gif",
  "image6.gif",
  "image7.gif",
];

let noCount = 0;
let isMoving = false;
let dodgeCount = 0;
const MAX_DODGES_MOBILE = 3;

// Floating hearts
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random() * 20 + "px";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  document.getElementById("floating-hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 500);

// Cursor sparkles (desktop only)
document.addEventListener("mousemove", (e) => {
  if (isMobile()) return;
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 600);
});

// Desktop hover dodge
noButton.addEventListener("mouseenter", () => {
  if (isMobile() || isMoving) return;
  moveNoButton();
});

// Mobile tap dodge
noButton.addEventListener("touchstart", (e) => {
  if (isMoving) return;
  e.preventDefault();

  if (dodgeCount >= MAX_DODGES_MOBILE) return;
  dodgeCount++;

  moveNoButton();
});

function moveNoButton() {
  isMoving = true;

  const x = Math.random() * 160 - 80;
  const y = Math.random() * 160 - 80;

  noButton.style.transform = `translate(${x}px, ${y}px)`;

  setTimeout(() => {
    isMoving = false;
  }, 300);
}

function isMobile() {
  return window.matchMedia("(hover: none)").matches;
}

// NO click logic
noButton.addEventListener("click", () => {
  noCount++;

  if (noCount < IMAGES.length) {
    imageDisplay.src = "./images/" + IMAGES[noCount];
  } else {
    yesButton.click();
  }
});

// YES click
yesButton.addEventListener("click", () => {
  yesSound.play();

  imageDisplay.src = "./images/image7.gif";
  imageDisplay.classList.add("scale-110");

  valentineQuestion.textContent = "Yayyy!! 💖";
  responseButtons.style.display = "none";

  const message =
    "You just made my whole heart smile 💕 Thank you for being my Valentine.";

  loveMessage.classList.remove("hidden");
  let i = 0;
  const typing = setInterval(() => {
    loveMessage.textContent += message[i];
    i++;
    if (i === message.length) clearInterval(typing);
  }, 50);

  confetti({ particleCount: 150, spread: 120, origin: { y: 0.6 } });
});
