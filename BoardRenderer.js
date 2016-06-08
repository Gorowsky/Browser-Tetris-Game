/*
    Render class which is handling canvas repainting, Updates, frames etc.
 */
function BoardRenderer(context, canvas){
    // Reference to this object.
    var self = this;
	this._ctx = context;
    this._canvas = canvas;
    // There columns and rows of grid can be changed.
    this._cols = 9;
    this._rows = 18;
    
	this._boardModel = new BoardModel(this._cols, this._rows, this._ctx);
    
	// Top left corner.
	this._x = 0;
	this._y = 0;
    // Initialize width and height.
    this._width = 0;
    this._height = 0;
	// Initialize game cell size.
	this._cellSize = 0;
    // Initialize time values
    this._curTime = 0;
    this._prevTime = 0;
    this._timePeriod = 500; // in miliseconds.
    // Initialize current block.
    this._curPiece;
    // Initialize event handling touch properties.
    this.touchX;
    this.touchY;
    this.touchId;
    // Event handlers.
    this._canvas.addEventListener('touchstart', function(e){
        
        e.preventDefault();
        self.touchX = e.touches[0].pageX;
        self.touchY = e.touches[0].pageY;
        self.touchId = e.touches[0].identifier;
    });
    
    this._canvas.addEventListener('touchmove', function(e){
        
        e.preventDefault();
        var difY = e.touches[0].pageY - self.touchY;

        if(difY > 60){
            if(self._boardModel.checkMove(self._curPiece.gridx, self._curPiece.gridy + 1, self._curPiece.curState)) self._curPiece.gridy++;
        }

    });

    this._canvas.addEventListener('touchend', function(e){
        
        e.preventDefault();
        var touchEndX;
        var touchEndY;

        var touch = e.changedTouches.item(0);

        try{
            touchEndX = touch.pageX;
            touchEndY = touch.pageY;
        } catch(err){
            alert(err);
            return;
        }

        var difX = Math.abs(touchEndX - self.touchX);
        var difY = Math.abs(touchEndY - self.touchY);

        if(difX < 10 && difY < 10){
            
            var newState = self._curPiece.curState - 1;
            if(newState < 0)
                newState = self._curPiece.states.length - 1;

            if(self._boardModel.checkMove(self._curPiece.gridx, self._curPiece.gridy, newState) )
                self._curPiece.curState = newState;
        } else if(difX > difY){
            
            if(touchEndX < self.touchX){
                if(self._boardModel.checkMove(self._curPiece.gridx - 1, self._curPiece.gridy, self._curPiece.curState)) self._curPiece.gridx--;
            } else{
                if(self._boardModel.checkMove(self._curPiece.gridx + 1, self._curPiece.gridy, self._curPiece.curState)) self._curPiece.gridx++;
            }
        }
    });
    
    document.addEventListener("keydown", function(e){
        self.getInput(self, e);
    });
    // Request animation Frame initialize.
	window.requestAnimationFrame = this.setUpAnimationFrame();
    // Repaint.
    requestAnimationFrame(function(){
        self.repaint(self);
    });
}

_p = BoardRenderer.prototype;
// Check which request animation frame should be used.
_p.setUpAnimationFrame = function(){
    return  window.requestAnimationFrame       ||  // Chrome
        window.webkitRequestAnimationFrame ||      // Webkit
        window.mozRequestAnimationFrame    ||      // Mozilla
        window.oRequestAnimationFrame      ||      // Opera
        window.msRequestAnimationFrame     ||      // IE
        function(callback, element){               // In case function.
            return window.setTimeout(callback, 1000/30);
        }
}
// Key input handler.
_p.getInput = function(self, e){
    
	if(!e) var e = window.event;
    var newState = this._boardModel.getNewState();
	
	e.preventDefault();
    
    switch(e.keyCode){
        case 37:{
            if(this._boardModel.checkMove(this._curPiece.gridx - 1, this._curPiece.gridy, this._curPiece.curState)) this._curPiece.gridx--;
        }
        break;

        case 39:{
            if(this._boardModel.checkMove(this._curPiece.gridx + 1, this._curPiece.gridy, this._curPiece.curState)) this._curPiece.gridx++;
        }
        break;

        case 38:{
            var newState = this._curPiece.curState - 1;
            if(newState < 0) newState = this._curPiece.states.length - 1;

            if(this._boardModel.checkMove(this._curPiece.gridx, this._curPiece.gridy, newState)) this._curPiece.curState = newState;
        }
        break;

        case 40:{
            if(this._boardModel.checkMove(this._curPiece.gridx, this._curPiece.gridy + 1, this._curPiece.curState)) this._curPiece.gridy++;
        }
        break;
    }
}

// Update (repaint). Method takes self parameter which is reference to current Board Renderer object.
_p.repaint = function(self){
    // Set up canvas.
    self._clearCanvas();
    self._ctx.save();
    // After resize this parameters will change.
    self._ctx.translate(self._x, self._y);
    // Drawning grid and pieces which were already placed.
	self.drawBoard();
    self._ctx.restore();
    // Get current time.
    self._curTime = new Date().getTime();
    // Get current Block.
    self._curPiece = self._boardModel.getPiece();
    // After half sec update. Get current block and redraw it one cell below. 
	if(self._curTime - self._prevTime > self._timePeriod){
		if(self._boardModel.checkMove(self._curPiece.gridx, self._curPiece.gridy + 1, self._curPiece.curState)){
			self._curPiece.gridy += 1;
		} else{
			self._boardModel.copyData(self._curPiece);
            self._boardModel.checkLine();
			self._boardModel.setRandomPiece();
		}
		// Update time.
		self._prevTime = self._curTime;
	}
    // Redraw Block.
	self.drawPiece(self._curPiece);
	
	if(self._boardModel.isGameOver() == false){
        // If game isnt over call repaint.
		requestAnimationFrame(function(){
            self.repaint(self);
        });
	} else{
        // If game is over display Game over screen.
        self._clearCanvas();
        
        requestAnimationFrame(function(){
            self.repaint(self);
        });
        var x_center = this._x + (this._cols/2) * this._cellSize;
        var y_center = this._y + (this._rows/2) * this._cellSize;
        self._ctx.beginPath();
        self._ctx.fillStyle = "#000000";
        self._ctx.font = this._cellSize + "px Arial bold";
        self._ctx.textAlign = "center";
        self._ctx.fillText("GAME OVER", x_center, y_center);
        self._ctx.closePath();
        
        self._ctx.beginPath();
        self._ctx.font = this._cellSize/1.2 + "px Arial bold";
        self._ctx.textAlign = "center";
        self._ctx.fillText("Try again!", x_center, y_center + this._cellSize);
        self._ctx.closePath();
    }
    
};

// drawBoard draws Grid and already placed blocks.
_p.drawBoard = function(){
    // Get current data Model.
    var data = this._boardModel.getData();
    
	this._ctx.beginPath();
    this._ctx.lineWidth = 1;
	// Horizontal lines.
	for (var i = 0; i <= this._cols; i++){
		this._ctx.moveTo(i*this._cellSize + 0.5, 0.5);
		this._ctx.lineTo(i*this._cellSize + 0.5, this._height + 0.5)
	}

	// Vertical lines.
	for (var j = 0; j <= this._rows; j++){
		this._ctx.moveTo(0.5, j*this._cellSize + 0.5);
		this._ctx.lineTo(this._width + 0.5, j*this._cellSize + 0.5);
	}
    
	this._ctx.strokeStyle = "#CCC";
	this._ctx.stroke();
    this._ctx.closePath();
    
    // Checking if data model has on certain pixel already set block and draws it.
    for(var r = 0; r < this._rows; r++){
		for(var c = 0; c < this._cols; c++){
			if(data[r][c] != 0){
				this.drawPixel(c * this._cellSize, r * this._cellSize, data[r][c]);
			}
		}
	}
};

// Draws whole block.
_p.drawPiece = function(p){
	var drawX = p.gridx;
	var drawY = p.gridy;
	var state = p.curState;
    var SIZE = this._cellSize;
    
	for(var r = 0, len = p.states[state].length; r < len; r++){
		for(var c = 0, len2 = p.states[state][r].length; c < len2; c++){
			if(p.states[state][r][c] == 1 && drawY >= 0){
                this.drawPixel(drawX * this._cellSize + this._x, drawY * this._cellSize + this._y, this._curPiece.color);
			}
			drawX += 1;
		}
		drawX = p.gridx;
		drawY += 1;
	}
}

// Draws certain pixel.
_p.drawPixel = function(x, y, color){
    
    var line_width = 3;
    var line_space = (line_width/2);
    
    this._ctx.fillStyle = "#" + color;
    this._ctx.fillRect(x, y, this._cellSize, this._cellSize);
    
    this._ctx.beginPath();
    this._ctx.lineWidth = line_width;
    this._ctx.moveTo(x, y + line_space);
    this._ctx.lineTo(x + this._cellSize, y + line_space);
    this._ctx.strokeStyle = "#EEEEEE";
    this._ctx.stroke();
    this._ctx.closePath();
    
    this._ctx.beginPath();
    this._ctx.lineWidth = line_width;
    this._ctx.moveTo(x + this._cellSize - line_space, y);
    this._ctx.lineTo(x + this._cellSize - line_space, y + this._cellSize);
    this._ctx.strokeStyle = "#888888";
    this._ctx.stroke();
    this._ctx.closePath();
    
    this._ctx.beginPath();
    this._ctx.lineWidth = line_width;
    this._ctx.moveTo(x + this._cellSize, y + this._cellSize - line_space);
    this._ctx.lineTo(x, y + this._cellSize - line_space);
    this._ctx.strokeStyle = "#666666";
    this._ctx.stroke();
    this._ctx.closePath();
    
    this._ctx.beginPath();
    this._ctx.lineWidth = line_width;
    this._ctx.moveTo(x + line_space, y + this._cellSize);
    this._ctx.lineTo(x + line_space, y);
    this._ctx.strokeStyle = "#DDDDDD";
    this._ctx.stroke();
    this._ctx.closePath();
}

// Changing pointers if "Try Again" is hovered.
_p.hoverOn = function(){
    document.getElementById("mainCanvas").style.cursor = "pointer";
}

_p.hoverOff = function(){
    document.getElementById("mainCanvas").style.cursor = "default";
    
}

// When browser is resized this method is fired.
_p.handleResize = function(){
	this._clearCanvas();
	this._newBoardSize();
	this.setSize(this._x, this._y, this._cellSize);
};

// Calculating new width and height of core parameters.
_p._newBoardSize = function(){
    
	var cellSize = Math.floor(
			Math.min(this._canvas.width/this._cols, this._canvas.height/this._rows));
	
	var boardWidth = cellSize * this._cols;
	var boardHeight = cellSize * this._rows;

    this._x = Math.floor((this._canvas.width - boardWidth)/2);
    this._y =  Math.floor((this._canvas.height - boardHeight)/2);
    this._cellSize = cellSize;
};

// Sets new size of the canvas.
_p.setSize = function(x, y, cellSize){
	this._x = x;
	this._y = y;
	this._cellSize = cellSize;
    this._width = this._cellSize*this._cols;
    this._height = this._cellSize*this._rows;
};

// Clears canvas object.
_p._clearCanvas = function(){
	this._ctx.fillStyle = "white";
	this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
};

// Getters
_p.getCols = function(){
    return this._cols;
};

_p.getRows = function(){
    return this._rows;
};

_p.getCoords = function(){
    return{
        x: this._x,
        y: this._y,
        cellSize: this._cellSize
    }
}

_p.isGameOver = function(){
    return this._boardModel.isGameOver();
}
