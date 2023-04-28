const startButton = document.getElementById("start-game");
const newScore = document.querySelector("#score");
let score = 0;
const win = document.getElementById("win");
let animationId;
let gameInProgress = false;
const rules = document.querySelector(".pop-up-rules");

startButton.addEventListener("click", startGame);

// start the game and moving my element1
function startGame() {
  score = 0;
  newScore.textContent = score;
  if (gameInProgress) {
    return;
  }
  gameInProgress = true;

  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isMoving) {
      isMoving = true;
      switch (key) {
        case "ArrowLeft":
          event.preventDefault();
          if (positionX > 0) positionX -= 20;
          break;
        case "ArrowRight":
          event.preventDefault();
          if (positionX < section1.offsetWidth - element1.offsetWidth)
            positionX += 20;
          break;
        case "ArrowUp":
          event.preventDefault();
          if (positionY > 0) positionY -= 20;
          break;
        case "ArrowDown":
          event.preventDefault();
          if (positionY < section1.offsetHeight - element1.offsetHeight)
            positionY += 20;
          if (positionY > section1.offsetHeight - element1.offsetHeight) {
            positionY = section1.offsetHeight - element1.offsetHeight;
          }
          break;
      }

      if (positionY < 0) {
        positionY = 0;
      }
      if (positionX < 0) {
        positionX = 0;
      }

      element1.style.setProperty("top", positionY + "px");
      element1.style.setProperty("left", positionX + "px");
      isMoving = false;
    }
  });

  // moving my balls and add score

  function fall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballWidth >= sectionWidth || ballX <= 0) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballHeight >= sectionHeight || ballY <= 0) {
      ballSpeedY = -ballSpeedY;
    }

    const element1Rect = element1.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    if (
      ballRect.left < element1Rect.right &&
      ballRect.right > element1Rect.left &&
      ballRect.bottom > element1Rect.top &&
      ballRect.top < element1Rect.bottom
    ) {
      score = 0;
      newScore.textContent = score;
    }

    ball.style.setProperty("left", ballX + "px");
    ball.style.setProperty("top", ballY + "px");

    if (isFalling) {
      fallBallY += fallBallSpeed;
      fallingBall.style.top = `${fallBallY}px`;
      fallingBall.style.left = `${fallBallX}px`;

      const element1Rect = element1.getBoundingClientRect();
      const fallingBallRect = fallingBall.getBoundingClientRect();

      if (
        fallingBallRect.left < element1Rect.right &&
        fallingBallRect.right > element1Rect.left &&
        fallingBallRect.bottom > element1Rect.top &&
        fallingBallRect.top < element1Rect.bottom
      ) {
        fallBallX =
          Math.random() * (section1.offsetWidth - fallingBall.offsetWidth);
        fallBallY = 0;
        score += 1;
        newScore.textContent = score;
      }

      let sectionBounding = section1.getBoundingClientRect();

      if (fallingBallRect.bottom >= sectionBounding.bottom) {
        fallBallX =
          Math.random() * (section1.offsetWidth - fallingBall.offsetWidth);
        fallBallY = 0;
      }
      if (score === 3) {
        win.showModal();
        gameInProgress = false;
        return cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(fall);
    }
  }

  animationId = requestAnimationFrame(fall);
}

//element 1 moving//

const element1 = document.querySelector(".element1");
const section1 = document.querySelector(".section1");

let positionX = section1.offsetWidth / 2 - element1.offsetWidth / 2;
let positionY = section1.offsetHeight / 2 - element1.offsetHeight / 2;

element1.style.setProperty("top", positionY + "px");
element1.style.setProperty("left", positionX + "px");

let isMoving = false;

//ball bouncing//

const ball = document.querySelector(".ball");

const sectionWidth = section1.offsetWidth;
const sectionHeight = section1.offsetHeight;
const ballWidth = ball.offsetWidth;
const ballHeight = ball.offsetHeight;

let ballX = Math.floor(Math.random() * (sectionWidth - ballWidth));
let ballY = Math.floor(Math.random() * (sectionHeight - ballHeight));

let ballSpeedX = 9;
let ballSpeedY = 9;

//falling element to catch//

const fallingBall = document.querySelector(".fallingBall");

let fallBallX =
  Math.random() * (section1.offsetWidth - fallingBall.offsetWidth);
let fallBallY = 0;
let fallBallSpeed = 11;
let isFalling = true;
