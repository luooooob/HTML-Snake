addLoadEvent(control);

function control() {
	;
}

function running() {
	var len = snake.length;
	var head = {x: snake[len-1].x, y: snake[len-1].y};
	switch(direct) {
		case "top": 
			if(head.x-1 >= 0) {
				snake[len] = {x: head.x-1, y: head.y};
			}
			break;
		case "bottom": 
			if(head.x+1 < boxHeight) {
				snake[len] = {x: head.x+1, y: head.y};
			}
			break;
		case "left": 
			if(head.y-1 >= 0) {
				snake[len] = {x: head.x, y: head.y-1};
			}
			break;
		case "right": 
			if(head.y+1 < boxWidth) {
				snake[len] = {x: head.x, y: head.y+1};
			}
			break;
	}
	for(i = 0; i <snake.length-1; i++) {
		snake[i] = snake[i+1];
	}
	snake.pop();
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


