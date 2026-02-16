const score = document.getElementById('score');
const timer = document.getElementById('time');
const gameArea = document.getElementById('game-area');
const hearts = document.getElementById('hearts');
const btnStart = document.getElementById('btn1');

let gameStart = true;
let timeLeft = 60;
let scoreCount = 0;
let lives = 3;
let gameInterval;
let timerInterval;

function updateHearts() {
    hearts.textContent = '❤️'.repeat(lives);
}

btnStart.addEventListener('click',()=>{
    if(gameStart){
        gameStart=false;
        btnStart.textContent="Stop Game";
        scoreCount = 0;
        score.textContent = scoreCount;
        //create ballon
        lives = 3;
        updateHearts();
        timerInterval =setInterval(() => {
            timeLeft--;
            timer.textContent = timeLeft;
            if(timeLeft <= 0 || lives <= 0){
                endGame();
            }
        },1000);

    gameInterval =setInterval(() => {
        if(Math.random() < 0.3){
            createBomb();
        }
        else{
            createBalloon();
        }

    },800);
}
    else
        {endGame();}
});






//     if(gameStart){
//         gameStart=false;
//         btnStart.textContent="Stop Game";
//         scoreCount = 0;
//         score.textContent = scoreCount;
//         lives = 3;
//         updateHearts();
        
//         timerInterval = setInterval(() => {
//             timeLeft--;
//             timer.textContent = timeLeft;
            
//             if(timeLeft <= 0 || lives <= 0){
//                 endGame();
//             }
//         }, 1000);
        
//         // Start spawning balloons and bombs
//         gameInterval = setInterval(() => {
//             if(Math.random() < 0.3) {
//                 createBomb();
//             } else {
//                 createBalloon();
//             }
//         }, 800);
//     }
//     else{
//         endGame();
//     }
// });

function endGame() {
    gameStart = true;
    btnStart.textContent = "Start Game";
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    timeLeft = 60;
    timer.textContent = timeLeft;
    gameArea.innerHTML = '';
}



function createBalloon(){
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.textContent = "🎈";
    const maxLeft = gameArea.offsetWidth - 80;
    balloon.style.left = Math.random() * maxLeft + 'px';
    balloon.style.bottom = '0px';
    
    // Add click event to pop balloon
    balloon.addEventListener('click', () => {
        popBalloon(balloon);
    });
    
    gameArea.appendChild(balloon);
    
    // Remove balloon after animation ends
    setTimeout(() => {
        if(balloon.parentNode){
            balloon.remove();
        }
    }, 5000);
}

function createBomb(){
    const bomb = document.createElement('div');
    bomb.classList.add('bomb');
    const maxLeft = gameArea.offsetWidth - 80;
    bomb.style.left = Math.random() * maxLeft + 'px';
    bomb.style.bottom = '0px';
    
    // Add click event to explode bomb
    bomb.addEventListener('click', () => {
        explodeBomb(bomb);
    });
    
    gameArea.appendChild(bomb);
    
    // Remove bomb after animation ends
    setTimeout(() => {
        if(bomb.parentNode){
            bomb.remove();
        }
    }, 5000);
}

function popBalloon(balloon){
    scoreCount += 5;
    score.textContent = scoreCount;
    
    // Get the current visual position using getBoundingClientRect
    const rect = balloon.getBoundingClientRect();
    const gameRect = gameArea.getBoundingClientRect();
    const currentTop = rect.top - gameRect.top;
    
    // Fix the position before stopping animation
    balloon.style.top = currentTop + 'px';
    balloon.style.bottom = 'auto';
    balloon.style.animation = 'none';
    balloon.classList.add('pop-effect');
    
    setTimeout(() => {
        balloon.remove();
    }, 500);
}

function explodeBomb(bomb){
    lives--;
    updateHearts();
    
    scoreCount -= 10;
    if(scoreCount < 0) scoreCount = 0;
    score.textContent = scoreCount;
    
    // Get the current visual position using getBoundingClientRect
    const rect = bomb.getBoundingClientRect();
    const gameRect = gameArea.getBoundingClientRect();
    const currentTop = rect.top - gameRect.top;
    
    // Fix the position before stopping animation
    bomb.style.top = currentTop + 'px';
    bomb.style.bottom = 'auto';
    bomb.style.animation = 'none';
    bomb.classList.add('explosion-effect');
    bomb.textContent = '💥';
    bomb.style.fontSize = '60px';
    
    setTimeout(() => {
        bomb.remove();
    }, 600);
    
    if(lives <= 0) {
        endGame();
    }
}



