// --- CONFIGURATION: CHANGE YOUR IMAGES HERE ---
const VALENTINE_CONFIG = {
  nameFromUrl: true, // Use ?name=YourName in URL
  images: {
    initial: "./images/image1.jpeg",
    noResponses: [
      "./images/image2.jpeg",
      "./images/image3.jpeg"],
    accepted: "./images/image3.gif"
  },
  messages: {
    acceptedTitle: "Yayyy! 💖",
    acceptedText: "mabrook you’re now my wife 💕"
  }
};

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const imageDisplay = document.getElementById("imageDisplay");
const valentineQuestion = document.getElementById("valentineQuestion");
const responseButtons = document.getElementById("responseButtons");
const loveMessage = document.getElementById("loveMessage");

// Initialization
let noCount = 0;
imageDisplay.src = VALENTINE_CONFIG.images.initial;

const params = new URLSearchParams(window.location.search);
const name = params.get("name");
if (name && VALENTINE_CONFIG.nameFromUrl) {
  document.getElementById("userName").textContent = name;
}

// Hover/Dodge Logic
const moveNoButton = () => {
  const x = Math.random() * (window.innerWidth - noButton.offsetWidth - 100);
  const y = Math.random() * (window.innerHeight - noButton.offsetHeight - 100);
  
  noButton.style.position = 'fixed';
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
};

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Click No
noButton.addEventListener("click", () => {
  noCount++;
  const nextImg = VALENTINE_CONFIG.images.noResponses[noCount % VALENTINE_CONFIG.images.noResponses.length];
  imageDisplay.src = nextImg;
});

// Click Yes
yesButton.addEventListener("click", () => {
  imageDisplay.src = VALENTINE_CONFIG.images.accepted;
  valentineQuestion.textContent = VALENTINE_CONFIG.messages.acceptedTitle;
  
  // Clean UI
  responseButtons.classList.add("hidden");
  loveMessage.textContent = VALENTINE_CONFIG.messages.acceptedText;
  loveMessage.classList.remove("opacity-0", "h-0");
  loveMessage.classList.add("opacity-100", "h-auto", "mt-4");

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff6b9f', '#ff85c1', '#ffffff']
  });
});