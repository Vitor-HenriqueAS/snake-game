const startGame = document.querySelector('.start');
let scoreGame = document.querySelector('.score');
let windowGameOver = document.querySelector('.game-over');
let windowYouWin = document.querySelector('.you-win');
let jogo;

let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d");
let box = 32;

let score = 0;
let difficulty = 285;

startGame.addEventListener('click', () => {
	startGame.classList.add('disabled');
	scoreGame.classList.remove('disabled');
	canvas.classList.remove('disabled');

	jogo = setInterval(iniciarJogo, difficulty);
})

let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha() {
	for(let i=0; i< snake.length; i++) {
		context.fillStyle = 'green';
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function drawFood() {
	context.fillStyle = 'red';
	context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
	if(event.keyCode == 37 || event == 37 && direction != 'right') direction = 'left';
	if(event.keyCode == 38 || event == 38 && direction != 'down') direction = 'up';
	if(event.keyCode == 39 || event == 39 && direction != 'left') direction = 'right';
	if(event.keyCode == 40 || event == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {

	if(snake.length == 225) {
		youWin();

	} else {
		criarBG();
		criarCobrinha();
		drawFood();

		if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
		if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
		if(snake[0].x < 0 * box && direction == 'left') snake[0].x = 16 * box;
		if(snake[0].y < 0 * box && direction == 'up') snake[0].y = 16 * box;

		for(let i = 1; i < snake.length; i++) {
			if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
				clearInterval(jogo);
				gameOver()
			}
		}

		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		if(direction == 'right') snakeX += box;
		if(direction == 'left') snakeX -= box;
		if(direction == 'up') snakeY -= box;
		if(direction == 'down') snakeY += box;

		if(snakeX != food.x || snakeY != food.y) {
			snake.pop();
		} else {
			food.x = Math.floor(Math.random() * 15 + 1) * box,
			food.y = Math.floor(Math.random() * 15 + 1) * box
			score++;
			difficulty--;
			scoreGame.innerHTML = `Minha Pontuação : ${score}`;
		}

		let newHead = {
			x: snakeX,
			y: snakeY
		}

		snake.unshift(newHead);
	}
}

function newGame() {
	document.location.reload(true);
}

function gameOver() {
	windowYouWin.classList.add('disabled');
	windowGameOver.classList.remove('disabled');
	document.querySelector('.last-score').innerHTML = `Sua Pontuação foi de ${score} pontos :/`;
	document.querySelectorAll('.restart')[0].addEventListener('click', () => {
		newGame();
	})
}

function youWin() {
	windowYouWin.classList.remove('disabled');
	windowGameOver.classList.add('disabled');
	document.querySelectorAll('.restart')[1].addEventListener('click', () => {
		newGame();
	})
}
