/* ==============================================================
 * some methods
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
var runStates  = false;
var runSpeed  = 0;

function snakeBox() {
/*	snakeBox类, boolean型二维数组储存坐标*/
	this.init = function() {
		for(i = 0; i < boxHeight; i++ ) {
			this[i] = new Array();
			for(j = 0; j < boxWidth; j++ ) {
				this[i][j] = false;
			}
		}
	}
	this.init();
}

function snake() {
/*	snake类, 蛇坐标值数组*/
	this.init = function() {
		for(i = 0; i < 3; i++ ) {
			this[i] = {x: 2, y: i};
		}
		this.len = 3;
	}
	this.init();
}
    
function food() {
/*	食物类, set方法返回随机非蛇区域坐标*/
	this.set = function() {
		this.x = Math.floor(Math.random()*boxHeight);
		this.y = Math.floor(Math.random()*boxWidth);
		for(i in snake) {
			if(snake[i].x == this.x && snake[i].y == this.y)
				this.set();
		}
	}
	this.set();
}

function instruct() {
/*	键盘指令类*/
	this.init = function() {
		this.value = "right";
		this.valueBeUsed = false;
	}
}

/* ==============================================================
 * prepare part
 * ============================================================== */

addLoadEvent(prepareStart);
addLoadEvent(keyBoardInstruct);
addLoadEvent(restartEvent);

function prepareStart() {
/*	初始化*/
	snakeBox.init();
	snake.init();
	instruct.init()
	runStates = false;
	runSpeed  = 0;
	score     = 0;
	food.set();
	rendering();
}

function restartEvent() {
/*	定义重新开始按钮事件*/
	var button = document.getElementsByTagName("button")[0];
	button.onclick = function(event) {
		if(runStates)
			runStates = false;
		else {
			/*清除game over, 暂停*/
			var para1 = document.querySelector(".game-over");
			var para2 = document.querySelector(".game-stop");
			removeClass(para1, "active");
			removeClass(para2, "active");
			gameOver = false;
		}
		prepareStart();
		event.preventDefault();
	}
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
			removeClass(td[k],'food');
			if(snakeBox[i][j] === true)
				addClass(td[k],'active');
			else
				removeClass(td[k],'active');
			if(i === food.x && j === food.y)
				addClass(td[k],'food');
		}
	}
	var scorePara = document.querySelector("#score");
	scorePara.innerHTML = "score: <span>"+score+"</span>";
}

function gameStopEvent() {
	var para = document.querySelector(".game-stop");
	if(!runStates) {
		removeClass(para, "active");
		runStates = true;
		go_go_go();
	}
	else {
		runStates = false;
		addClass(para, "active");
	}
}

function gameOverEvent() {
	runStates = false;
	var para = document.querySelector(".game-over");
	addClass(para, "active");
}


/* ==============================================================
 * use key board to eat everything!
 * ============================================================== */


function keyBoardInstruct() {
/*	keycode 32: space;

	keycode 37: left
	keycode 38: top
	keycode 39: right
	keycode 40: down

	keycode 65: a;
	keycode 87: w;
	keycode 68: d;
	keycode 83: s;*/
	document.onkeydown = function(event) {
		if(!runStates && runSpeed === 0) {
			runStates = true;
			go_go_go();
		}
		else switch(event.keyCode) {
			case 32: 
				gameStopEvent();
			case 65:
			case 37:
				if(instruct.valueBeUsed === false || instruct.value === "right") break; 
				instruct.value = "left"; break;
			case 87:
			case 38: 
				if(instruct.valueBeUsed === false || instruct.value === "down" ) break;
				instruct.value = "top"; break;
			case 68:
			case 39: 
				if(instruct.valueBeUsed === false || instruct.value === "left" ) break;
				instruct.value = "right"; break;
			case 83:
			case 40: 
				if(instruct.valueBeUsed === false || instruct.value === "top") break;
				instruct.value = "down"; break;

		}
		instruct.valueBeUsed = false;
		event.preventDefault();
	}
}

function go_go_go() {
	runSpeed  = Math.max(250 - snake.len*3, 90);
	run = setTimeout("running()",runSpeed);

}

function running() {
	if(!runStates) 
		return;
	var head = new Object();
	var len = snake.len;
	head.x = snake[len-1].x;
	head.y = snake[len-1].y;
	switch(instruct.value) {
		case "top": 
			if(head.x-1 >= 0)
				snake[len] = {x: head.x-1, y: head.y};
			else gameOver = true ;
			break;
		case "down": 
			if(head.x+1 < boxHeight)
				snake[len] = {x: head.x+1, y: head.y};
			else gameOver = true;
			break;
		case "left":
			if(head.y-1 >= 0)
				snake[len] = {x: head.x, y: head.y-1};
			else gameOver = true;
			break;
		case "right":
			if(head.y+1 < boxWidth)     
				snake[len] = {x: head.x, y: head.y+1};
			else gameOver = true;
			break;
	}
	instruct.valueBeUsed = true;
	for(i = 0; i < snake.len; i++) {
		if(snake[len].x === snake[i].x && snake[len].y === snake[i].y)
			gameOver = true;
	}
	if(gameOver) {
		gameOverEvent();
		return;
	}
	if(snake[snake.len].x === food.x && snake[snake.len].y === food.y) {
		food.set();
		snake.len++;
		score++;
	}
	else for(i = 0; i < snake.len; i++) {
			snake[i]=snake[i+1];
	}
	rendering();
	go_go_go();
}

/* ==============================================================
 * the end
 * ============================================================== */




