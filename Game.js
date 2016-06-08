/*
    Game class which is handling Event listeners such as Click and Hover.
 */
function Game(canvas) {
    
	this._canvas = canvas;
	this._ctx = canvas.getContext("2d");

	this._boardRenderer = new BoardRenderer(this._ctx, this._canvas);
	this._boardRenderer.handleResize();
}

_g = Game.prototype;
// Resize method.
_g.resizeEvent = function(){
	this._boardRenderer.handleResize();
}
// This method gets two parameters from event pageX and Y. Then calculate game screen, Canvas grid and grid cell to match "Try again" word. When area is matched with click coords, Board Renderer is recreated.
_g.handleClick = function(x, y){
    var min_x = this._boardRenderer.getCoords().x  + (this._boardRenderer.getCoords().cellSize * 2.7);
    var min_y = this._boardRenderer.getCoords().y  + (this._boardRenderer.getCoords().cellSize * 9.3);
    var max_x = min_x + (this._boardRenderer.getCoords().cellSize * 3.5);
    var max_y = min_y + this._boardRenderer.getCoords().cellSize;
    
    if(x > min_x && x < max_x && y > min_y && y < max_y){
        // Deleting the only one reference to Board Renderer object.
        delete this._boardRenderer;
        // Recreate Board Renderer object.
        this._boardRenderer = new BoardRenderer(this._ctx, this._canvas);
        // Repaint canvas to see the result.
        this._boardRenderer.handleResize();
    }
    
}
// Same mechanics as Click handler.
_g.handleHover = function(x, y){
    var min_x = this._boardRenderer.getCoords().x  + (this._boardRenderer.getCoords().cellSize * 2.7);
    var min_y = this._boardRenderer.getCoords().y  + (this._boardRenderer.getCoords().cellSize * 9.3);
    var max_x = min_x + (this._boardRenderer.getCoords().cellSize * 3.5);
    var max_y = min_y + this._boardRenderer.getCoords().cellSize;
    
    if(x > min_x && x < max_x && y > min_y && y < max_y){
        this._boardRenderer.hoverOn();
    } else{
        this._boardRenderer.hoverOff();
    }
}
// Simple getter to send isGameOver flag.
_g.isGameOver = function(){
    return this._boardRenderer.isGameOver();
}