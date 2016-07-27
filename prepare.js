
/* ==============================================================
 * Public objects 
 * ============================================================== */

var boxWidth  = 25;
var boxHeight = 17;

var snakeBox  = new snakeBox();
var snake     = new snake();
var food      = new food();
var instruct  = new instruct();
var gameOver  = false;
var score     = 0;
var run;
var runStates = false;

function snakeBox() {
	for(i = 0; i < boxHeight; i++ ) {
		this[i] = new Array();
	}
	this.init = function() {
		for(i = 0; i < boxHeight; i++ ) {
			for(j = 0; j < boxWidth; j++ ) {
				this[i][j] = false;
			}
		}
	}
	this.init();
}

function snake() {
	for(i = 0; i < 3; i++ ) {
		this[i] = new Object();
	}
	this.init = function() {
		for(i = 0; i < 3; i++ ) {
			this[i] = {x: 2, y: i};
		}
		this.len = 3;
	}
	this.init();
}
    
function food() {
	this.x = new Object();
	this.y = new Object();
	this.set = function() {
		this.x = Math.floor(Math.random()*boxHeight);
		this.y = Math.floor(Math.random()*boxWidth);
		for(i in snake) {
			if(snake[i].x == this.x && snake[i].y == this.y)
				this.init();
		}
	}
	this.set();
}

function instruct() {
	this.value = "right";
	this.init = function() {
		this.value = "right";
	}
}

/* ==============================================================
 * prepare part
 * ============================================================== */

addLoadEvent(prepareStart);
addLoadEvent(keyBoardInstruct);
addLoadEvent(restart);

function prepareStart() {
	snakeBox.init();
	snake.init();
	instruct.init()
	score = 0;
	food.set();
	rendering();
}

function rendering() {
	for(i in snakeBox) {
		for(j in snakeBox[i]) {
			snakeBox[i][j] = false;
		}
	}
	for(i = 0; i < snake.len; i++) {
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
	var scorePara = document.querySelector("#score");
	scorePara.innerHTML = "score: <span>"+score+"</span>";
}

function restart() {
	var button = document.getElementsByTagName("button")[0];
	button.onclick = function(event) {
		if(run)
			clearInterval(run);
		prepareStart();
		event.preventDefault();
	}
}

function keyBoardInstruct() {
	document.onkeydown = function(event) {
		if(!runStates)
			gameStop();
		else switch(event.keyCode) {
			case 32: gameStop();
			event.preventDefault();break;
			case 37: instruct.value     = "left"; break;
			case 38: instruct.value     = "top"; break;
			case 39: instruct.value     = "right"; break;
			case 40: instruct.value     = "down"; break;
		}
	}
}

function go_go_go() {
	runStates = true;
	run = setInterval("running()",800);
}

function running() {
	var head = new Object();
	var len = snake.len;
	head.x = snake[len-1].x;
	head.y = snake[len-1].y;
	switch(instruct.value) {
		case "top": 
			if(head.x-1 >= 0)
				snake[len] = {x: head.x-1, y: head.y};
			break;
		case "down": 
			if(head.x+1 < boxHeight)
				snake[len] = {x: head.x+1, y: head.y};
			break;
		case "left":
			if(head.y-1 >= 0)
				snake[len] = {x: head.x, y: head.y-1};
			break;
		case "right":
			if(head.y+1 < boxWidth)
				snake[len] = {x: head.x, y: head.y+1};
			break;
	}
	if(snake[snake.len].x === food.x &&  snake[snake.len].y === food.y) {
		food.set();
		snake.len++;
		score.value++;
		running();
		return ;
	}
	else {
		for(i = 0; i < snake.len; i++) {
			snake[i]=snake[i+1];
		}
	}
	rendering();
}

function gameStop() {
	var para = document.querySelector(".game-stop");
	if(runStates == false) {
		removeClass(para, "active");
		go_go_go();
	}
	else {
		clearInterval(run);
		runStates = false;
		addClass(para, "active");
	}
}


/* ==============================================================
 * jQuery methods
 * ============================================================== */

function hasClass(obj, cls) {
 	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) 
    	obj.className += " " + cls;  
}

function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}

function addLoadEvent(func) { 
	var oldonload = window.onload; 
	if (typeof window.onload != 'function') { 
		window.onload = func; 
	}
	else {
		window.onload = function() { 
			oldonload(); 
			func(); 
		}
	}
}
