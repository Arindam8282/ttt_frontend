  import emojis from '../cell-emojis.json'
import CoreUtils from './CoreUtils'
  const isGameOver = (arr,you,opponent) => {
    // row check
    for(let i=0;i<=6;i+=3) {
      if(arr[i]===you
        && arr[i+1]===you 
        && arr[i+2]===you) {
          return you
      }

      if(arr[i]===opponent 
        && arr[i+1]===opponent 
        && arr[i+2]===opponent){
        return opponent
      }
    }
     // column check
     for(let i=0;i<=2;i+=1) {
      if(arr[i]===you
        && arr[i+3]===you 
        && arr[i+6]===you) {
          return you
      }

      if(arr[i]===opponent 
        && arr[i+3]===opponent 
        && arr[i+6]===opponent){
        return opponent
      }
    }
    // left diagonal
    if(arr[0]===you
      && arr[4]===you 
      && arr[8]===you) {
        return you
    }

    if(arr[0]===opponent 
      && arr[4]===opponent 
      && arr[8]===opponent){
      return opponent
    }
     // right diagonal
     if(arr[2]===you
      && arr[4]===you 
      && arr[6]===you) {
        return you
    }

    if(arr[2]===opponent 
      && arr[4]===opponent 
      && arr[6]===opponent){
      return opponent
    }

    let tie=0
    for(let i=0;i<arr.length;i+=1) 
      if(arr[i]!=="") tie+=1

    if(tie===arr.length) return "tied"

    return ""
  }
  const toss = ()=>{
    let turn = CoreUtils.randomNumber(0,10)
    if(turn<5) return true
    else return false 
  }
  const getBotChar = (you)=> {
    let arr = [...Object.keys(emojis),'circle'].filter((item)=> item!==you)
    let num = CoreUtils.randomNumber(0,(arr.length-1))
    return arr[num]
  }
  const botMove = (board,you,opponent) => {

    // Driver code
    let board2 = [['','',''],
                    ['','',''],
                    ['','','']]
    let c = 0
    for(let i=0 ; i<3 ; i++) {
      for(let j =0 ; j<3 ; j++) {

        if(board[c] === you) board2[i][j] = 'o'
        
        else if(board[c] === opponent) board2[i][j] = 'x'
        
        else board2[i][j] = '_'

        c+=1
      }
    }
    let algo = _minimax()
    let move = algo.findBestMove(board2);
    console.log("move",move,board)
    if(move.row<0 || move.row<0)
      board2[CoreUtils.randomNumber(0,2)][CoreUtils.randomNumber(0,2)] = 'x'
    else 
      board2[move.row][move.col] = 'x'
    let board3 = ['','','','','','','','','']
    c = 0
    for(let i =0 ;i<3;i++) {
      for(let j =0 ;j<3;j++) {
        if(board2[i][j] === 'o') board3[c] = you
        else if(board2[i][j] === 'x') board3[c] = opponent
        else board3[c] = ""
        c+=1
      }
    }
    return board3
    
  }
  
  const _minimax =()=>{

        // Javascript program to find the
        // next optimal move for a player
        class Move
        {
          constructor()
          {
            let row,col;
          }
        }

        let player = 'x', opponent = 'o';

        // This function returns true if there are moves
        // remaining on the board. It returns false if
        // there are no moves left to play.
        function isMovesLeft(board)
        {
          for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
              if (board[i][j] === '_')
                return true;
                
          return false;
        }

        // This is the evaluation function as discussed
        // in the previous article ( http://goo.gl/sJgv68 )
        function evaluate(b)
        {
          
          // Checking for Rows for X or O victory.
          for(let row = 0; row < 3; row++)
          {
            if (b[row][0] === b[row][1] &&
              b[row][1] === b[row][2])
            {
              if (b[row][0] === player)
                return +10;
                
              else if (b[row][0] === opponent)
                return -10;
            }
          }

          // Checking for Columns for X or O victory.
          for(let col = 0; col < 3; col++)
          {
            if (b[0][col] === b[1][col] &&
              b[1][col] === b[2][col])
            {
              if (b[0][col] === player)
                return +10;

              else if (b[0][col] === opponent)
                return -10;
            }
          }

          // Checking for Diagonals for X or O victory.
          if (b[0][0] === b[1][1] && b[1][1] === b[2][2])
          {
            if (b[0][0] === player)
              return +10;
              
            else if (b[0][0] === opponent)
              return -10;
          }

          if (b[0][2] === b[1][1] &&
            b[1][1] === b[2][0])
          {
            if (b[0][2] === player)
              return +10;
              
            else if (b[0][2] === opponent)
              return -10;
          }

          // Else if none of them have
          // won then return 0
          return 0;
        }

        // This is the minimax function. It
        // considers all the possible ways
        // the game can go and returns the
        // value of the board
        function minimax(board, depth, isMax)
        {
          let score = evaluate(board);

          // If Maximizer has won the game
          // return his/her evaluated score
          if (score === 10)
            return score;

          // If Minimizer has won the game
          // return his/her evaluated score
          if (score === -10)
            return score;

          // If there are no more moves and
          // no winner then it is a tie
          if (isMovesLeft(board) === false)
            return 0;

          // If this maximizer's move
          if (isMax)
          {
            let best = -1000;

            // Traverse all cells
            for(let i = 0; i < 3; i++)
            {
              for(let j = 0; j < 3; j++)
              {
                
                // Check if cell is empty
                if (board[i][j]==='_')
                {
                  
                  // Make the move
                  board[i][j] = player;

                  // Call minimax recursively
                  // and choose the maximum value
                  best = Math.max(best, minimax(board,
                          depth + 1, !isMax));

                  // Undo the move
                  board[i][j] = '_';
                }
              }
            }
            return best;
          }

          // If this minimizer's move
          else
          {
            let best = 1000;

            // Traverse all cells
            for(let i = 0; i < 3; i++)
            {
              for(let j = 0; j < 3; j++)
              {
                
                // Check if cell is empty
                if (board[i][j] === '_')
                {
                  
                  // Make the move
                  board[i][j] = opponent;

                  // Call minimax recursively and
                  // choose the minimum value
                  best = Math.min(best, minimax(board,
                          depth + 1, !isMax));

                  // Undo the move
                  board[i][j] = '_';
                }
              }
            }
            return best;
          }
        }

        // This will return the best possible
        // move for the player
        function findBestMove(board)
        {
          let bestVal = -1000;
          let bestMove = new Move();
          bestMove.row = -1;
          bestMove.col = -1;

          // Traverse all cells, evaluate
          // minimax function for all empty
          // cells. And return the cell
          // with optimal value.
          for(let i = 0; i < 3; i++)
          {
            for(let j = 0; j < 3; j++)
            {
              
              // Check if cell is empty
              if (board[i][j] === '_')
              {
                
                // Make the move
                board[i][j] = player;

                // compute evaluation function
                // for this move.
                let moveVal = minimax(board, 0, false);

                // Undo the move
                board[i][j] = '_';

                // If the value of the current move
                // is more than the best value, then
                // update best
                if (moveVal > bestVal)
                {
                  bestMove.row = i;
                  bestMove.col = j;
                  bestVal = moveVal;
                }
              }
            }
          }


          return bestMove;
        }

        return { findBestMove }


  }

export default {isGameOver,botMove,getBotChar,toss}