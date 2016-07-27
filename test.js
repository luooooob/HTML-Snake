var button = document.getElementsByTagName("button")[0];
button.onclick = function(event) {
	if(runStates)
		clearInterval(run);
	prepareStart();
	button.onblur;
	event.preventDefault();
}