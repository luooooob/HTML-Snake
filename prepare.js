/* ==============================================================
 * 
 * 
 * ============================================================== 
 * 
 * 
 * ============================================================== */
var boxWidth  = 25;
var boxHeight = 17;
var snakeBox  = new Array();
var snake     = new Array();
var food      = new Object();
var instruct  = "right";
var gameOver  = false;
var run;


addLoadEvent(prepareStart);
addLoadEvent(keyBoardInstruct);
addLoadEvent(restart);


function prepareStart() {
	clearInterval(run);
	init_snakeBox();
	set_food(); 
	rendering();
}

function init_snakeBox() {
	for(i = 0; i < boxHeight; i++ ) {
		snakeBox[i] = new Array();
		for(j = 0; j < boxWidth; j++ ) {
			snakeBox[i][j] = false;
		}
	}//init_snakeBox
	for(i = 0; i < 3; i++ ) {
		snake[i] = {x: 2, y: i};
	}//init_snake
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
		clearInterval(run);
		prepareStart();
		event.preventDefault();
	}
}

function keyBoardInstruct() {
	document.onkeydown = function(event) {
		var instruct_direction = true;
		switch(event.keyCode) {
			case 32: instruct = "space"; break;
			case 37: instruct = "left"; break;
			case 38: instruct = "top"; break;
			case 39: instruct = "right"; break;
			case 40: instruct = "down"; break;
			default: 
				init_snakeBox();
				rendering();		
				go_go_go();
		}
		event.preventDefault();
	}
}

function go_go_go() {
	run = setInterval("running()",100);

}

function running() {
	var len = snake.length;
	var head = new Object();
	head.x = snake[len-1].x;
	head.y = snake[len-1].y;
	switch(instruct) {
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
	for(i = 0; i <snake.length-1; i++) {
		snake[i] = snake[i+1];
	}
	if(snake[snake.length-1].x === food.x &&  snake[snake.length-1].y === food.y) {
		set_food();
	}
	else
		snake.pop();
	rendering();
}


/* ==============================================================
 * 
 * 
 * ============================================================== 
 * 
 * 
 * ============================================================== */

function hasClass(obj, cls) {
 	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
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
