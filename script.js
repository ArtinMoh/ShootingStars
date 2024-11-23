// Select elements
const startButton = document.getElementById('start-button');
const starContainer = document.querySelector('.stars');
const timerDisplay = document.getElementById('timer');
const clickCounterDisplay = document.getElementById('click-counter');

let timer;
let timerCount = 60;
let clickCount = 0;
let gameRunning = false;
let currentScaledStar = null; // Track the currently scaled-up star
let scaleDuration = 1500; // Duration to keep star big
let clickDuration = scaleDuration; // Player has time to click while the star is big

// Create and display stars
const createStars = () => {
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    // Randomly decide if the star will be circular or polygon-shaped
    if (Math.random() < 0.7) {
      star.classList.add('circle-star');
    } else {
      star.classList.add('polygon-star');
    }

    const size = Math.random() * 5 + 3; // Increase random size
    const x = Math.random() * 100; // Random X position
    const y = Math.random() * 100; // Random Y position
    const twinkleDuration = Math.random() * 3 + 2; // Random twinkle duration

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}vw`;
    star.style.top = `${y}vh`;
    star.style.animation = `twinkle ${twinkleDuration}s infinite`;

    starContainer.appendChild(star);
  }
};

// Start the game when the start button is clicked
startButton.addEventListener('click', () => {
  if (gameRunning) return; // Prevent restarting if the game is already running
  gameRunning = true;
  startButton.style.display = 'none'; // Hide the start button
  createStars(); // Create stars

  // Start the timer
  timer = setInterval(() => {
    if (timerCount <= 0) {
      clearInterval(timer);
      gameRunning = false;
      startButton.style.display = 'block'; // Show the start button again
      alert(`Game Over! You clicked ${clickCount} times.`); // Show score
      location.reload(); // Refresh the page for a new game
    } else {
      timerCount--;
      timerDisplay.textContent = `Time: ${timerCount}`;
    }
  }, 1000);

  // Randomly scale up stars (with 1s delay)
  setInterval(() => {
    if (!gameRunning) return;

    // Select a random star
    const stars = document.querySelectorAll('.stars div');
    const randomStar = stars[Math.floor(Math.random() * stars.length)];

    // Scale it up (make stars 4x bigger for better visibility)
    randomStar.style.transform = 'scale(4)';  // Increased size to 4x
    randomStar.style.transition = `transform ${scaleDuration / 1000}s ease`; // Longer scale duration

    // Set this star as the currently scaled star
    currentScaledStar = randomStar;

    // Reset scale after the scaling duration
    setTimeout(() => {
      randomStar.style.transform = 'scale(1)';
    }, scaleDuration); // Reset after the scale duration (1.5 seconds)
  }, 1000); // New star scales every 1 second
});

// Handle star hover (change color to yellow and glowing effect)
document.body.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  document.querySelectorAll('.stars div').forEach((star) => {
    const starRect = star.getBoundingClientRect();
    const starX = starRect.left + starRect.width / 2;
    const starY = starRect.top + starRect.height / 2;
    const distance = Math.sqrt(Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2));

    if (distance < 100) {
      star.classList.add('hovered');
    } else {
      star.classList.remove('hovered');
    }
  });
});

// Handle star click (explosion effect and score increment)
document.body.addEventListener('click', (event) => {
  if (!gameRunning) return;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  document.querySelectorAll('.stars div').forEach((star) => {
    const starRect = star.getBoundingClientRect();
    const starX = starRect.left + starRect.width / 2;
    const starY = starRect.top + starRect.height / 2;

    const distanceFromClick = Math.sqrt(Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2));

    // Only count click if the clicked star is the currently scaled one
    if (distanceFromClick < 150 && star === currentScaledStar) {
      // Explosion effect
      const angle = Math.random() * 2 * Math.PI;
      const distance = 10 + Math.random() * 20;
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      // Set the explosion animation
      star.style.setProperty('--offset-x', `${offsetX}px`);
      star.style.setProperty('--offset-y', `${offsetY}px`);
      star.classList.add('exploded');

      // Count the click
      clickCount++;
      clickCounterDisplay.textContent = `Clicks: ${clickCount}`;

      // Remove explosion effect after animation
      setTimeout(() => {
        star.classList.remove('exploded');
      }, 300); // Match duration with explosion effect

      // Reset the currently scaled star to null after a click
      currentScaledStar = null;
    }
  });
});