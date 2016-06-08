/*
    BoardModel class is storing data Model of 2 dimension array which is game field. Also this class is checking is move is correct and is whole line is filled with blocks.
 */
function BoardModel(cols, rows, ctx) {
    // Initialize parameters. If cols or rows are not set then 9x18 is default.
	this._cols = cols || 9;
	this._rows = rows || 18;
	this._data;
	this._totalTokens = 0;
    // Is game over flag.
    this._isOver = false;
    this._ctx = ctx;
    this._curPiece;
    this._newState;
    this._score = 0;
    
    this.init();
}

_p = BoardModel.prototype;

// Clearing data Model. And returning game to primal setting.
_p.init = function(){
    document.getElementById("mainCanvas").style.cursor = "default";
    document.getElementById("score").innerHTML = this._score;
    if(this._data == undefined){
		this._data = new Array();
		for(r = 0; r < this._rows; r++){
			this._data[r] = new Array();
			for(c = 0; c < this._cols; c++){
				this._data[r].push(0);
			}
		}		
	} else{
		for(r = 0; r < this._rows; r++){
			for(c = 0; c < this._cols; c++){
				this._data[r][c] = 0;
			}
		}
    }
    this._curPiece = getRandomPiece();
};

// If move is correct store it in data Model.
_p.copyData = function(){
	var xpos = this._curPiece.gridx;
	var ypos = this._curPiece.gridy;
	var state = this._curPiece.curState;
	
	for(var r = 0, len = this._curPiece.states[state].length; r < len; r++){
		for(var c = 0, len2 = this._curPiece.states[state][r].length; c < len2; c++){
			if(this._curPiece.states[state][r][c] == 1 && ypos >= 0){
				this._data[ypos][xpos] = this._curPiece.color;
			}
			xpos += 1;
		}
		xpos = this._curPiece.gridx;
		ypos += 1;
	}
	
	if(this._curPiece.gridy < 0){
		this._isOver = true;
	}
}

// Check if move is correct.
_p.checkMove = function(xpos, ypos, newState){
	var result = true;
	var newx = xpos;
	var newy = ypos;
    this._newState = newState
	
	for(var r = 0, len = this._curPiece.states[this._newState].length; r < len; r++){
		for(var c = 0, len2 = this._curPiece.states[this._newState][r].length; c < len2; c++){
			if(newx < 0 || newx >= this._cols){
				result = false;
				c = len2;
				r = len;
			}
			if(this._data[newy] != undefined && this._data[newy][newx] != 0
				&& this._curPiece.states[this._newState][r] != undefined && this._curPiece.states[this._newState][r][c] != 0){
				result = false;
				c = len2;
				r = len;
			}
			newx += 1;
		}
		newx = xpos;
		newy += 1;
		
		if(newy > this._rows){
			r = len;
			result = false;
		}
	}
	return result;
}

// Checking if line is filled with blocks.
_p.checkLine = function(){
    var c = 0
    for(var r = 0; r < this._rows; r++){
        while(c < this._cols){
            if(this._data[r][c] != 0) c++;
            else{
                c = 0;
                break;
            }
        }
        if(c == this._cols){
            // + 10 score if line is filled.
            this._score += 10;
            document.getElementById("score").innerHTML = this._score;
            // Rows
            for(var i = r; i >= 0; i--){
                // Cols
                for(var j = 0; j < this._cols; j++){
                    if(i == 0) this._data[i][j] = 0;
                    else this._data[i][j] = this._data[i-1][j];
                }
            }
            c = 0;
        }
    }
}

// Getters and setters.
_p.setRandomPiece = function(){
    this._curPiece = getRandomPiece();
    return this._curPiece;
}

_p.getPiece = function(){
    return this._curPiece;
}

_p.getData = function(){
    return this._data;
}

_p.getNewState = function(){
    return this._newState;
}

_p.isGameOver = function(){
    return this._isOver;
}