export class TicTacToe {

  player1 : string;
  player2 : string;
  movesMade: number = 0;
  winner: string = ' ';
  state: GameState = GameState.NOT_STARTED;
  grid: string[];

  constructor(p1: string, p2: string){
    this.player1 = p1;
    this.player2 = p2;
    this.state = GameState.IN_PROGRESS;
    this.grid = this.initalizeGameGrid();
  }

  private initalizeGameGrid() : string[] {

    let grid : string[] = [];

    for(let i = 0; i < 9; i++){
      grid.push(' ');
    }

    return grid;
  }

  /**
   * @param playerChar Player who's move initiated the update of the game state.
   */
  updateGameState(playerChar: string): void {

    if(this.hasWinner()){
      this.winner = playerChar;
      this.state = GameState.WINNER;
    } 
    else if (this.movesMade == 9){
      this.state = GameState.TIE;
    }

  }

  hasWinner(): boolean {

    let grid = this.grid;

    for (let i = 0; i < 3; i++) {
      
      let j = i * 3;
        
      // Check for horizontal
      if(grid[j] == grid[j+1] && grid[j] == grid[j+2]){
        this.winner = grid[j];
        return true;
      }
        
      // Check for vertical
      if((grid[j] == grid[j+3] && grid[j] == grid[j+6])){
        this.winner = grid[j];
        return true;
      }

      
      // Check for diagonal.
      if(i == 0){

        if(this.grid[0] == this.grid[4] && this.grid[0] == this.grid[8]){
          this.winner = grid[j];
          return true;
        }
    
        
      } else if (i == 2){

        if(this.grid[6] == this.grid[4] && this.grid[0] == this.grid[2]){
          this.winner = grid[j];
          return true;
        }
          
      }
      
    }

    return false;
  }


  public static getWinnerFromJson(grid: string[]) : Object {
    let game = new TicTacToe('player one', 'player two');
    game.grid = grid
    game.hasWinner();

    return {
      grid: game.grid,
      name: game.player1,
      winner: game.winner
    };
    
  }

  makeMove(playerID: number, index: number): boolean {

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