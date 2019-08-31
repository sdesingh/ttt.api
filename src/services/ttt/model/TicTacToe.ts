class TicTacToe {

  playerOneName : string;
  playerTwoName : string;
  movesMade: number = 0;
  state: GameState = GameState.NOT_STARTED;
  grid: string[];

  constructor(p1: string, p2: string){
    this.playerOneName = p1;
    this.playerTwoName = p2;
    this.state = GameState.IN_PROGRESS;
    this.grid = this.initalizeGameGrid();
  }

  initalizeGameGrid() : string[] {

    let grid : string[] = [];

    for(let i = 0; i < 9; i++){
      grid.push(' ');
    }

    return grid;
  }

  updateGameState(playerChar: string){

    //TODO: Make an algo to figure out the winner.
    if(this.isWinner(playerChar)){
      this.state = GameState.WINNER;
    }

  }

  isWinner(playerChar: string): boolean {

  }

  makeMove(playerID: number, x: number, y: number) : boolean {

    // If valid move, make the move.
    if(this.moveIsValid(x, y)){

      let boardIndex : number = (x * 3) + y;
      this.grid[boardIndex] = this.getPlayerChar(playerID);
      this.movesMade++;
      this.updateGameState(this.getPlayerChar(playerID));

      return true;
    } 

    // Invalid move, return false;
    else return false;
  }

  makeMoveIndex(playerID: number, index: number): boolean {

    // Check if the index is valid. Return false.
    if(index >= this.grid.length || index < 0) return false;
    else if (this.grid[index] != ' ') return false;

    // Make the player move.
    else{
      this.grid[index] = this.getPlayerChar(playerID);
      this.movesMade++;
      this.updateGameState(this.getPlayerChar(playerID));
      return true;
    } 
    
  }

  moveIsValid(x: number, y: number) : boolean {
    if(x < 0 || y < 0) return false;
    else return true;
  }

  getPlayerChar(playerID: number){
    if(playerID == 0) return 'X';
    else return 'O';
  }


}

enum GameState {
  NOT_STARTED,
  IN_PROGRESS,
  TIE,
  WINNER
}