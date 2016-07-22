
var i,j;
var boxWidth  = 25;
var boxHeight = 17;
var snake     = declarationSnake();

addLoadEvent(start);
addLoadEvent(restart);
addLoadEvent(test);

function declarationSnake() {
	var snake = new Array();
	for(i = 0; i < boxHeight; i++ ) {
		snake[i] = new Array();
		for(j = 0; j < boxWidth; j++ ) {
			snake[i][j] = false;
		}
	}
	return snake;
}

function start() {
	for(i = 0; i < boxHeight; i++) {
		for(j = 0; j < boxWidth; j++) {
			snake[i][j] = false;
		}
	}
	for(j = 0; j < 3; j++ ) {
		snake[2][j] = true;
	}
	rendering(snake);
	var button = document.getElementsByTagName("table")[0];
	button.focus();
}

function rendering(snake) {
	var td = document.getElementsByTagName("td");
	for(var k=0,i = 0; i < boxHeight; i++) {
		for(j = 0; j < boxWidth; j++,k++) {
			if(snake[i][j] === true)
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

function test() {
	for(j = 0; j <= boxWidth ; j++) {
		if(snake[2][j] === true) {
			if(snake[2][boxWidth] === true ) {
				snake[2][0] = true;
			}
			snake[2][++j] = true;
			if(j-3 >= 0)
				snake[2][j-3] = false;
		}
	}
	rendering(snake);
	setTimeout("test()",100);
}