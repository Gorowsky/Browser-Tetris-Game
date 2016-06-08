/*
    Shapes data. Current state (after rotation), color and default starting grid x and y location.
*/

function LPiece(){
    
	this.state1 = [ [1, 0],
					[1, 0],
					[1, 1] ];
					
	this.state2 = [ [0, 0, 1],
					[1, 1, 1] ];
					
	this.state3 = [ [1, 1],
					[0, 1],
					[0, 1] ];
	
	this.state4 = [ [1, 1, 1],
					[1, 0, 0] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.curState = 0;
	
	this.color = "";
	this.gridx = 3;
	this.gridy = -3;
}

function ReverseLPiece(){
    
	this.state1 = [ [0, 1],
					[0, 1],
					[1, 1] ];
					
	this.state2 = [ [1, 1, 1],
					[0, 0, 1] ];
					
	this.state3 = [ [1, 1],
					[1, 0],
					[1, 0] ];
	
	this.state4 = [ [1, 0, 0],
					[1, 1, 1] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.curState = 0;
	
	this.color = "";
	this.gridx = 3;
	this.gridy = -3;
}

function BlockPiece(){
    
	this.state1 = [ [1, 1],
					[1, 1] ];
					
	this.states = [ this.state1 ];
	this.curState = 0;
	
	this.color = "";
	this.gridx = 3;
	this.gridy = -2;
}

function LinePiece(){
    
	this.state1 = [ [1],
					[1],
					[1],
					[1] ];
					
	this.state2 = [ [1,1,1,1] ];
					
	this.states = [ this.state1, this.state2 ];
	this.curState = 0;
	
	this.color = "";
	this.gridx = 4;
	this.gridy = -4;
}

function TPiece(){
    
	this.state1 = [ [1, 1, 1],
					[0, 1, 0] ];
					
	this.state2 = [ [1, 0],
					[1, 1],
					[1, 0] ];
	
	this.state3 = [ [0, 1, 0],
					[1, 1, 1] ];
					
	this.state4 = [ [0, 1],
					[1, 1],
					[0, 1] ];
					
	this.states = [ this.state1, this.state2, this.state3, this.state4 ];
	this.curState = 0;
	
	this.color = "";
	this.gridx = 3;
	this.gridy = -2;
}

function ZPiece(){
    
	this.state1 = [ [1, 1, 0],
					[0, 1, 1] ];
					
	this.state2 = [ [0, 1],
					[1, 1],
					[1, 0] ];
					
	this.states = [ this.state1, this.state2 ];
	this.curState = 0;
	
	this.color = "";
	this.gridx = 3;
	this.gridy = -2;
}

function ReverseZPiece(){
    
	this.state1 = [ [0, 1, 1],
					[1, 1, 0] ];
					
	this.state2 = [ [1, 0],
					[1, 1],
					[0, 1] ];
					
	this.states = [ this.state1, this.state2 ];
	this.curState = 0;
	
	this.color = "";
	this.gridx = 3;
	this.gridy = -2;
}

// Randomizer.
function getRandomPiece(){
    
	var result = Math.floor( Math.random() * 7 );
	var piece;
	
	switch(result){
		case 0: piece = new LPiece();			break;
		case 1: piece = new BlockPiece();		break;
		case 2: piece = new ZPiece();			break;
		case 3: piece = new TPiece();			break;
		case 4: piece = new ReverseLPiece();	break;
		case 5: piece = new ReverseZPiece();	break;
		case 6: piece = new LinePiece();		break;
	}	
	
	var color = Math.floor(Math.random() * 8);
    
    switch(color){
            
        case 0: piece.color = "E01B1B";         break; // red
        case 1: piece.color = "28DE18";         break; // green
        case 2: piece.color = "3A40F2";         break; // blue
        case 3: piece.color = "F2EC3A";         break; // yellow
        case 4: piece.color = "AD18DE";         break; // violet
        case 5: piece.color = "72E8E8";         break; // cyan
        case 6: piece.color = "F26B0A";         break; // orange
        case 7: piece.color = "9BF542";         break; // black
    }
	return piece;
}