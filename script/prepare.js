
var boxWidth  = 25;
var boxHeight = 17;
var snakeBox  = new Array();
var snake     = new Array();
var food      = new Object();
var instruct  = "right";
var gameOver  = false;


addLoadEvent(start);
addLoadEvent(restart);
addLoadEvent(keyBoardInstruct);

function start() {
	init_snakeBox();
	init_snake();
	set_food();
	rendering();
}

function init_snakeBox() {
	for(i = 0; i < boxHeight; i++ ) {
		snakeBox[i] = new Array();
		for(j = 0; j < boxWidth; j++ ) {
			snakeBox[i][j] = false;
		}
	}
}

function init_snake() {
	for(i = 0; i < 3; i++ ) {
		snake[i] = {x: 2, y: i};
	}
}

function set_food() {
	food.x = Math.floor(Math.random()*boxHeight);
	food.y = Math.floor(Math.random()*boxWidth);
	for(i in snake) {
		if(snake[i].x == food.x && snake[i].y == food.y){
			set_food();
		}
	}
}

function rendering() {
	for(i in snakeBox) {
		for(j in snakeBox[i]) {
			snakeBox[i][j] = false;
		}
	}
	for(i in snake) {
		snakeBox[snake[i].x][snake[i].y] = true;
	}
	snakeBox[food.x][food.y] = true;
	var td = document.getElementsByTagName("td");
	for(var k=0,i = 0; i < boxHeight; i++) {
		for(j = 0; j < boxWidth; j++,k++) {
			if(snakeBox[i][j] === true)
				addClass(td[k],'active');
			else
				removeClass(td[k],'active');
		}
	}
}

function restart() {
	var button = document.getElementsByTagName("button")[0];
	button.onclick = function(event) {
		start();
		event.preventDefault();
	}
}

function keyBoardInstruct () {
	document.onkeydown = function(event) {
		switch(event.keyCode) {
			event.preventDefault();
			case 37: instruct = "left"; break;
			case 38: instruct = "top"; break;
			case 39: instruct = "right"; break;
			case 40: instruct = "down"; break;
		}
	}
}

function playing() {
	document.onkeydown

}

function running() {
	var len = snake.length;
	var head = {x: snake[len-1].x, y: snake[len-1].y};
	switch(instruct) {
		case "top": 
			if(head.x-1 >= 0)
				snake[len] = {x: head.x-1, y: head.y};
			break;
		case "bottom": 
			if(head.x+1 < boxHeight)
				snake[len] = {x: head.x+1, y: head.y};
			break;
		case "left": 
			if(head.y-1 >= 0)
				snake[len] = {x: head.x, y: head.y-1};
			break;
		case "down": 
			if(head.y+1 < boxWidth)
				snake[len] = {x: head.x, y: head.y+1};
			break;
	}
	for(i = 0; i <snake.length-1; i++) {
		snake[i] = snake[i+1];
	}
	snake.pop();
}
