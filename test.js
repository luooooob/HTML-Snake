var boxWidth  = 25;
var boxHeight = 17; 

function inta() {
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
var inta = new inta();

window.onload = function() {
	alert(inta[2]);
}
