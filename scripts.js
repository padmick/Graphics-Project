var canvas = new Object();
var mainSnake;
var food;
canvas.element = document.getElementById('canvas');
canvas.context = canvas.element.getContext('2d');
canvas.width = canvas.element.getAttribute('width');
canvas.height = canvas.element.getAttribute('height');
canvas.cellWidth = 10;
canvas.redraw = function(fillColour, strokeColour){
	var fillColour = fillColour || 'white',
		strokeColour = strokeColour || 'black';

	this.paint(0, 0, fillColour, strokeColour, this.width, this.height);
}
canvas.paint = function(x, y, fillColour, strokeColour, width, height) {
	var width = width || this.cellWidth,
		height = height || this.cellWidth,
		fillColour = fillColour || 'red',
		strokeColour = strokeColour || 'white';

	this.context.fillStyle = fillColour;
	this.context.fillRect(x*canvas.cellWidth, y*canvas.cellWidth, width, height);
	this.context.strokeStyle = strokeColour;
	this.context.strokeRect(x*canvas.cellWidth, y*canvas.cellWidth, width, height);
};
canvas.paintText = function(text, x, y) {
	var x = x || 5,
		y = y || 15;
	this.context.fillText(text, x, y);
};
canvas.redraw();
function Snake(length, bodyColour, outlineColour, startingPos) {
	this.length = length;
	this.bodyColour = bodyColour;
	this.outlineColour = outlineColour;
	this.array = [];
	this.direction = 'right';
	this.nd = []; 
	this.nx; 
	this.ny; 
	var startingPos = startingPos;
	this.create = function(){
		for(var i = this.length-1; i>=0; i--) {
			this.array.push({x: startingPos.x + i, y: startingPos.y});
		}
	};
	this.create();
}
