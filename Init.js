/* 
    Fully responsive Simple Tetris game.
    
            Controls          -          PC          -          Mobile
    
    - Move block to the left  - Left Arrow Key       - Touch and move Your finger from right to left
    - Move block to the right - Right Arrow Key      - Touch and move Your finger from left to right
    - Accelerate block        - Down Arrow Key       - Touch and move Your finger from top to bottom
    - Rotate block            - Up Arrow Key         - Tap the screen
    
*/

var game;

// Initialization Class.
function InitGame(){
    
    this._canvas;
    this._canvas = this.initFullScreenCanvas("mainCanvas");
    
    // Create Game Object with Canvas.
    game = new Game(this._canvas);
    // Event listeners.
    this._canvas.addEventListener("click", function(e) {
        // If game is over.
        if(game.isGameOver()){
            game.handleClick(e.pageX, e.pageY);
            e.stopPropagation();
            e.preventDefault();
        }
    }, false);
    
    this._canvas.addEventListener("mousemove", function(e) {
        // Is game is over.
        if(game.isGameOver()){
            game.handleHover(e.pageX, e.pageY);
            e.preventDefault();
        }
    }, false);
    
    this._canvas.addEventListener("touchstart", function(e) {
        // If game is over.
        if(game.isGameOver()){
            game.handleClick(e.touches[0].pageX, e.touches[0].pageY);
            e.stopPropagation();
            e.preventDefault();
        }
    }, false);
}

_p = InitGame.prototype;

// Handle resize event.
_p.initFullScreenCanvas = function(canvasId){
    var canvas = document.getElementById(canvasId);
    _p.resizeCanvas(canvas);
    window.addEventListener("resize", function(){
        _p.resizeCanvas(canvas);
    });
    return canvas;
}
// Resize canvas after event listener is triggered.
_p.resizeCanvas = function(canvas){
    var screen_width = document.width || document.body.clientWidth;
    var screen_height = document.height || document.body.clientHeight;
    var score_height = document.getElementById("score_container").clientHeight;
    canvas.width  = screen_width;
    canvas.height = screen_height - score_height;
    // Refresh canvas to see changes of browser resize.
    game && game.resizeEvent();
}
