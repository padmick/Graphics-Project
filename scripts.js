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

Snake.prototype.move = function() {
	if (this.nd.length) {
		this.direction = this.nd.shift();
	}

	this.nx = this.array[0].x;
	this.ny = this.array[0].y;
	var tail;

	switch(this.direction) {
		case 'right':
			this.nx++;
			break;
		case 'left':
			this.nx--;
			break;
		case 'up':
			this.ny--;
			break;
		case 'down':
			this.ny++;
			break;
	}

	if(this.outsideBounds() || this.colliding()) {
		game.over();
		return;
	}

	if(this.eatingFood()) {
		game.score++;
		tail = {x: this.nx, y: this.ny};
		food = new Food();
	} else {
		var tail = this.array.pop();
		tail.x = this.nx;
		tail.y = this.ny;
	}

	this.array.unshift(tail);

	this.paint();
}

Snake.prototype.paint = function() {
	canvas.redraw();
	for(var i = 0; i < this.array.length; i++) {
		var j = this.array[i];

		canvas.paint(j.x, j.y, this.bodyColour, this.outlineColour);
	}
}

Snake.prototype.outsideBounds = function() {
	if(this.nx <= -1 || this.nx === canvas.width/canvas.cellWidth || this.ny <= -1 || this.ny === canvas.height/canvas.cellWidth) {
		return true;
	}
	return false;
}

Snake.prototype.eatingFood = function() {
	if(this.nx === food.x && this.ny === food.y) {
		return true;
	}
	return false;
}

Snake.prototype.colliding = function(x, y) {
	var x = x || this.nx,
		y = y || this.ny;
	for(var i = 0; i < this.array.length; i++) {
		if(this.array[i].x === x && this.array[i].y === y) {
			
			return true;
		}
	}
	return false;
}

function Food() {
	this.generateCoords = function() {
		this.x = Math.round(Math.random() * (canvas.width-canvas.cellWidth)/canvas.cellWidth);
		this.y = Math.round(Math.random() * (canvas.height-canvas.cellWidth)/canvas.cellWidth);
		this.checkCollision();
	};
	this.checkCollision = function() {
		if(mainSnake.colliding(this.x, this.y)) {
			this.generateCoords();
		}
	};
	this.draw = function(){
		canvas.paint(this.x, this.y, 'blue');
	};

	this.generateCoords();
	this.checkCollision();
	this.draw();

}

var game = new Object();
game.fps = 20;
game.score = 0;
game.scoreText = 'Score: ';
game.drawScore = function() {
	canvas.paintText(this.scoreText + this.score);
};
game.runLoop = function(){
	setTimeout(function() {
        requestAnimationFrame(game.runLoop);
		mainSnake.move();
		if(typeof food.draw != 'undefined') {
			food.draw();
		}
		game.drawScore();
    }, 1000 / game.fps);
};
game.start = function() {
	mainSnake = new Snake(10, 'red', 'white', {x: 5, y: 5});
	food = new Food();
	game.score = 0;
};
game.over = function(){
	canvas.redraw();
	this.start();
};

game.start();
game.runLoop();


document.onkeydown = function(e) {
	if(typeof mainSnake !== 'undefined'){
		var key = (e.keyCode ? e.keyCode : e.which);
		var td;
		if (mainSnake.nd.length) {
			td = mainSnake.nd[mainSnake.nd.length - 1];
		} else {
			td = mainSnake.direction;
		}
		if(key == "37" && mainSnake.direction != 'right') {
			mainSnake.nd.push('left');
		} else if(key == "38" && mainSnake.direction != 'down') {
			mainSnake.nd.push('up');
		} else if(key == "39" && mainSnake.direction != 'left') {
			mainSnake.nd.push('right');
		} else if(key == "40" && mainSnake.direction != 'up') {
			mainSnake.nd.push('down');
		}
	}
}


