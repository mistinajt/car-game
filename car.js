const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let road = gameArea.getBoundingClientRect();
let player = {
  speed:5,
  score:0
};

let keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false
        };

startScreen.addEventListener('click', start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function start() {
  startScreen.classList.add("hide");
  // gameArea.classList.remove("hide");
  gameArea.innerHTML = "";
  for (let x = 0; x < 5; x++) {
                let div = document.createElement("div");
                div.classList.add("line");
                div.y = x * 150;
                div.style.top = div.y + "px";
                gameArea.appendChild(div);
            }
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  // car.innerText = "Car";
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  for (let x = 0; x < 3; x++) {
                let enemy = document.createElement("div");
                enemy.classList.add("enemy");
                enemy.y = ((x+1)*600)-1;
                enemy.style.top = enemy.y + "px";
                enemy.style.left = Math.floor(Math.random()*350) + 'px';
                enemy.style.backgroundColor = "red";
                gameArea.appendChild(enemy);
            }
}

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function moveLines() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function(item) {
    if(item.y > 750){
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  })
}

function moveEnemy(car) {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach(function(item) {
    if(isCollide(car,item)){
      endGame();
    }
    if(item.y >= 1500){
      item.y = -600;
      item.style.left = Math.floor(Math.random()*150) + "px";
      item.style.backgroundColor = 'red';
  }
  item.y += player.speed;
  item.style.top = item.y + "px";
  })
}

function isCollide(a,b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
  (aRect.bottom < bRect.top) ||
  (aRect.top > bRect.bottom) ||
  (aRect.right < bRect.left) ||
  (aRect.left > bRect.right)
);
}

function playGame() {
  let car = document.querySelector('.car');
  moveLines();
  moveEnemy(car);
  if(player.start) {
    if (keys.ArrowUp && player.y > road.top) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < (road.width-50)) {
      player.x += player.speed;
    }
  car.style.left = player.x + 'px';
  car.style.top = player.y + 'px';
  window.requestAnimationFrame(playGame);
  player.score++;
  score.innerText = `Score: ${player.score}`;
   }
}

function endGame() {
  player.start = false;
  score.innerHTML = `Game over <br> score was ${player.score}`;
  startScreen.classList.remove("hide");
}
