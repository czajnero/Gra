const c = document.querySelector('#game');
const ctx = c.getContext("2d");

let map = new Image();
map.src = "./img/map.png";
let foodImg = new Image();
foodImg.src = "./img/apple.png";

// rozmiar kafelki, map.png pod 40x40 zrobione
const tileSize = 40;

// waz, pozycja startowa
let snake = [];
snake[0] = {
    x : 4 * tileSize,
    y : 4 * tileSize
}

let food = {
    x : Math.floor(Math.random()*10) * tileSize,
    y : Math.floor(Math.random()*10) * tileSize
}

let points = 0;

// sterowanie
document.addEventListener("keydown",direction);
let move;
function direction(event){
    let key = event.keyCode;
    if( key == 37 && move != "RIGHT"){
        move = "LEFT";
    }else if(key == 38 && move != "DOWN"){
        move = "UP";
    }else if(key == 39 && move != "LEFT"){
        move = "RIGHT";
    }else if(key == 40 && move != "UP"){
        move = "DOWN";
    }
}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.drawImage(map,0,0);
    
    for( let i = 0 ; i < snake.length ; i++) {
        ctx.fillStyle = ( i == 0) ? "#000" : "#fff";
        ctx.fillRect(snake[i].x,snake[i].y,tileSize,tileSize)

        ctx.strokeStyle = "#500000";
        ctx.strokeRect(snake[i].x,snake[i].y,tileSize,tileSize)

    }
    ctx.drawImage(foodImg, food.x, food.y);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( move == "LEFT") snakeX -= tileSize;
    if( move == "UP") snakeY -= tileSize;
    if( move == "RIGHT") snakeX += tileSize;
    if( move == "DOWN") snakeY += tileSize;

    if(snakeX == food.x && snakeY == food.y){
        points++;
        food = {
            x : Math.floor(Math.random()*10) * tileSize,
            y : Math.floor(Math.random()*10) * tileSize
        }
    }else{
        snake.pop(); //usuwa z
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    if(snakeX < 0 || snakeX > 9 * tileSize || snakeY < 0 || snakeY > 9*tileSize || collision(newHead,snake)){
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "16px Verdana"
    ctx.fillText(`Points: ${points}`, 0.4 * tileSize, 0.6 * tileSize)
}

let game = setInterval(draw, 125);


