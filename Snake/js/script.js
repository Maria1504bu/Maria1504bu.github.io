const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let cell = 32;
let score = 0;
let foodSrc = [
    "img/carrot.png",
    "img/cherry.png",
    "img/cupcake.png",
    "img/grape.png"
]

const field = new Image();
field.src = "img/field.png";

const cherry = new Image();
cherry.src = "img/cherry.png";

function Food(){
    this.x = Math.ceil(Math.random() * 17) * cell;
    this.y = Math.ceil(Math.random() * 15 + 2) * cell;
    this.imgSrc = foodSrc[Math.floor(Math.random() * 4)];
    this.img = function(){
        let img = new Image();
        img.src = this.imgSrc;
        return img;
    }
}
let food = new Food();
let snake = [];
snake[0] = {
    x : 9 * cell,
    y : 10 * cell
}

function drawGame(){
    context.drawImage(field, 0, 0);
    
    context.drawImage(food.img(), food.x, food.y);

    //context.fillStyle = "blue";
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = i == 0? "red" : "orange";
        context.fillRect(snake[i].x, snake[i].y, cell, cell);
    }

    context.fillStyle = "yellow";
    context.font = "50px Times New Roman";
    context.fillText(score, 2.5 * cell, 1.7 * cell);

    let snakeHead = {
        x : snake[0].x,
        y : snake[0].y
    }

    if(dir == "left"){
        if(snakeHead.x == cell){
            snakeHead.x = 608 - cell * 2;
        } else {
            snakeHead.x -= cell;
        }
    } else if(dir == "up"){
        if(snakeHead.y == cell * 3){
            snakeHead.y = 608 - cell * 2;
        } else {
            snakeHead.y -= cell;
        }
    } else if(dir == "right"){
        if(snakeHead.x == 608 - cell * 2){
            snakeHead.x = cell;
        } else {
            snakeHead.x += cell;
        }
    } else if(dir == "down"){
        if(snakeHead.y == 608 - cell * 2){
            snakeHead.y = cell * 3;
        } else {
            snakeHead.y += cell;
        }
    }
    snake.unshift(snakeHead);
    eatFood(snakeHead);
    eatTail(snakeHead);
}

let game = setInterval(drawGame, 200); //not work without interval

document.addEventListener("keydown", direct);

let dir;

function direct(event){
    if(event.keyCode == 37 && dir != "right"){
        dir = "left";
    } else if(event.keyCode == 38 && dir != "down"){
        dir = "up";
    } else if(event.keyCode == 39 && dir != "left"){
        dir = "right";
    } else if(event.keyCode == 40 && dir != "up"){
        dir = "down";
    }
}

function eatFood(snakeHead){
    if(snakeHead.x == food.x && snakeHead.y == food.y){
        score++;
        food = new Food();
    } else{
        snake.pop();
    }
}

function eatTail(snakeHead){
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snakeHead.x && snake[i].y == snakeHead.y){
            context.fillStyle = "red";
            context.font = "100px Arial";
            context.fillText("Game Over!", cell, 10 * cell);
            clearInterval(game); 
        }
    }
}