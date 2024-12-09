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

    if(timerCount <= 10 && timerCount > 0){
        timerDisplay.style.color='#c50000';
    }

    if (timerCount <= 0) {
      clearInterval(timer);
      gameRunning = false;
      startButton.style.display = 'block'; // Show the start button again
      alert(`Game Over! Your score: ${clickCount} (clicks).`); // Show score
      location.reload(); // Refresh the page for a new game
    }
    
    else {
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
      if(clickCount >= 15){
        clickCounterDisplay.style.color='yellow';
    }

      // Remove explosion effect after animation
      setTimeout(() => {
        star.classList.remove('exploded');
      }, 300); // Match duration with explosion effect

      // Reset the currently scaled star to null after a click
      currentScaledStar = null;
    }
  });
});

document.getElementById('start-button').addEventListener('click' ,() =>
{

    document.getElementById('bimg').style.display = 'none';
        startGame();
});

document.getElementById('start-button').addEventListener('click' ,() =>
    {
    
        document.getElementById('guide').style.display = 'none';
            startGame();
    });

const title = document.getElementById('title');
const titlebar = document.getElementById('titlebar');

title.addEventListener('mousedown', function(){
    titlebar.style.animationDuration='1s';
});
title.addEventListener('touchstart', function(){
    titlebar.style.animationDuration='1s';
});
title.addEventListener('mouseup', function(){
    titlebar.style.animationDuration='6s';
});
title.addEventListener('touchend', function(){
    titlebar.style.animationDuration='6s';
});
title.addEventListener('mouseleave', function(){
    titlebar.style.animationDuration='6s';
});

const titlebar2 = document.getElementById('titlebar2');

title.addEventListener('mousedown', function(){
    titlebar2.style.animationDuration='2s';
});
title.addEventListener('touchstart', function(){
    titlebar2.style.animationDuration='2s';
});
title.addEventListener('mouseup', function(){
    titlebar2.style.animationDuration='4s';
});
title.addEventListener('touchend', function(){
    titlebar2.style.animationDuration='4s';
});
title.addEventListener('mouseleave', function(){
    titlebar2.style.animationDuration='4s';
});

const titlebar3 = document.getElementById('titlebar3');

title.addEventListener('mousedown', function(){
    titlebar3.style.animationDuration='1.5s';
});
title.addEventListener('touchstart', function(){
    titlebar3.style.animationDuration='1.5s';
});
title.addEventListener('mouseup', function(){
    titlebar3.style.animationDuration='5s';
});
title.addEventListener('touchend', function(){
    titlebar3.style.animationDuration='5s';
});
title.addEventListener('mouseleave', function(){
    titlebar3.style.animationDuration='5s';
});

const mobileHover = document.getElementById('start-button');
mobileHover.addEventListener('touchstart', function(){
    mobileHover.style.backgroundColor='#666';
    mobileHover.style.transform='scale(1.1)';
    // mobileHover.style.cssText='background-color: #666; transform: scale(1.1);';
});
mobileHover.addEventListener('touchend', function(){
    mobileHover.style.backgroundColor='#444'
    mobileHover.style.transform='scale(1)'
});


// const box = document.getElementById('guide');

//     // Hover ON - Play forward
//     box.addEventListener('mousedown', () => {
//       box.style.transform = 'matrix3d(1, 0, -0.15, 0.0003, 0, 1, 0, 0.001, 0, 0, 1, 0, 2, 4, 0, 1)';
//     });

//     // Hover OFF - Play backward
//     box.addEventListener('mouseup', () => {
//       box.style.transform = 'none';
//     });

// const glass = document.getElementById('guide');

//     // Event listener for mouse movement to create 3D tilt
//     glass.addEventListener('mousemove', (e) => {
//       const { offsetWidth: width, offsetHeight: height } = glass;
//       const { offsetX: x, offsetY: y } = e;

//       // Calculate rotation angles
//       const rotateX = ((y / height) - 0.5) * 50; // -10deg to 10deg
//       const rotateY = ((x / width) - 0.5) * -50; // -10deg to 10deg

//       // Apply 3D rotation
//       glass.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//     });

//     // Reset rotation on mouse leave
//     glass.addEventListener('mouseleave', () => {
//       glass.style.transform = `rotateX(0deg) rotateY(0deg)`;
//     });

// const glass = document.getElementById('guide');

// let currentX = 0, currentY = 0; // Smooth rotation control
// let targetX = 0, targetY = 0;   // Target rotation
// const smoothFactor = 0.1;       // Smoothness factor (smaller = smoother)

// // Event listener for mouse movement
// glass.addEventListener('mousemove', (e) => {
//   const { offsetWidth: width, offsetHeight: height } = glass;
//   const { offsetX: x, offsetY: y } = e;

//   // Calculate target rotation (smaller tilt range for smoothness)
//   targetX = ((y / height) - 0.5) * 30; // -5deg to 5deg
//   targetY = ((x / width) - 0.5) * -30;
// });

// // Smooth animation using requestAnimationFrame
// function animateTilt() {
//   currentX += (targetX - currentX) * smoothFactor; // Interpolate X
//   currentY += (targetY - currentY) * smoothFactor; // Interpolate Y

//   glass.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
//   requestAnimationFrame(animateTilt);
// }
// animateTilt();

// // Reset rotation on mouse leave
// glass.addEventListener('mouseleave', () => {
//   targetX = 0;
//   targetY = 0;
//   glass.style.boxShadow='none';
// });
// glass.addEventListener('mouseenter', function(){
//   glass.style.boxShadow='10px 10px 10px 2px #000000';
// })

const glass = document.getElementById('guide');
    const glowLine = document.getElementById('glowLine');

    // glass.addEventListener('mousedown', function(){
        let currentX = 0, currentY = 0; // Smooth rotation control
      let targetX = 0, targetY = 0;   // Target rotation
      const smoothFactor = 0.1;       // Smoothness factor (smaller = smoother)

      // Event listener for mouse movement
      glass.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = glass;
        const { offsetX: x, offsetY: y } = e;

        // Calculate target rotation (smaller tilt range for smoothness)
        targetX = ((y / height) - 0.5) * 33; // -5deg to 5deg
        targetY = ((x / width) - 0.5) * -33;
      });

      // Smooth animation using requestAnimationFrame
      function animateTilt() {
        currentX += (targetX - currentX) * smoothFactor; // Interpolate X
        currentY += (targetY - currentY) * smoothFactor; // Interpolate Y

        glass.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        requestAnimationFrame(animateTilt);
      }
      animateTilt();

      // Reset rotation on mouse leave
      glass.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
      });

      // Animate glow line movement
      glass.addEventListener('mouseenter', function(){
          glowLine.style.visibility='visible';
          let pos = -500;
      function animateGlowLine() {
        pos += 5;
        if (pos > 500) pos = -500; // Reset position
        glowLine.style.transform = `translate(${pos}%, ${pos}%)`;
        requestAnimationFrame(animateGlowLine);
      }
      animateGlowLine();

      })
      glass.addEventListener('mouseleave', function(){
          glowLine.style.visibility='hidden';
      })

      // })


glass.addEventListener('mouseup', function(){
  glowLine.style.visibility='hidden';
  targetX = 0;
  targetY = 0;

  })