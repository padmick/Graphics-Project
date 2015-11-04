var canvas = new Object();
var mainSnake;
var food;


canvas.element = document.getElementById('canvas');
canvas.context = canvas.element.getContext('2d');
canvas.width = canvas.element.getAttribute('width');
canvas.height = canvas.element.getAttribute('height');
canvas.cellWidth = 10;

canvas.redraw = function(fillColour, strokeColour){
	// Add default canvas colour options
	var fillColour = fillColour || 'white',
		strokeColour = strokeColour || 'black';

	this.paint(0, 0, fillColour, strokeColour, this.width, this.height);
}
