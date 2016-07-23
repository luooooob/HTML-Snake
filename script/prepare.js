
/*                            _ooOoo_  
 *                           o8888888o  
 *                           88" . "88  
 *                           (| -_- |)  
 *                            O\ = /O  
 *                        ____/`---'\____  
 *                      .   ' \\| |// `.  
 *                       / \\||| : |||// \  
 *                     / _||||| -:- |||||- \  
 *                       | | \\\ - /// | |  
 *                     | \_| ''\---/'' | |  
 *                      \ .-\__ `-` ___/-. /  
 *                   ___`. .' /--.--\ `. . __  
 *                ."" '< `.___\_<|>_/___.' >'"".  
 *               | | : `- \`.;`\ _ /`;.`/ - ` : | |  
 *                 \ \ `-. \_ __\ /__ _/ .-` / /  
 *         ======`-.____`-.___\_____/___.-`____.-'======  
 *                            `=---='  
 *  
 *         .............................................   */

var i,j;
var boxWidth  = 25;
var boxHeight = 17;
var direct    = "right";
var snake     = new Array();
var snakeBody = new Array();

addLoadEvent(initSnake);
addLoadEvent(initSnakeBody);
addLoadEvent(start);
addLoadEvent(restart);

function initSnake() {
	for(i = 0; i < boxHeight; i++ ) {
		snake[i] = new Array();
		for(j = 0; j < boxWidth; j++ ) {
			snake[i][j] = false;
		}
	}
}

function initSnakeBody() {
	for(i = 0; i < 3; i++ ) {
		snakeBody[i] = new Array();
		snakeBody[i].x = 2;
		snakeBody[i].y = i;
	}
}

function start() {
	for(i in snake) {
		for(j in snake[i]) {
			snake[i][j] = false;
		}
	}
	for(i in snakeBody) {
		snake[snakeBody[i].x][snakeBody[i].y] = true;
	}
	rendering(snake);
}

function rendering() {
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
	//alert(snake[2]);
	rendering(snake);
	for(j = 0; j < boxWidth ; j++) {
		if(snake[2][j] === true) {
			snake[2][++j] = true;
			snake[2][j-3] = false;
		}
	}
	if(snake[2].indexOf(true)>=23)
		test2();
		return;
	setTimeout("test()",100);
}

function test2() {
	rendering();
	for(j = 0; j < boxWidth ; j++) {
		if(snake[2][j] === true) {
			snake[2][j-1] = true;
			snake[2][j+3] = false;
		}
	}
	if(snake[2].indexOf(true) === 0) {
		test();
		return;
	}
	setTimeout("test2()",100);
}