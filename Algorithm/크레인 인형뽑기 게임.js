//나의 풀이
function solution(board, moves) {
  let bucket = [];
  let answer = 0;
  
  moves.forEach((mvalue) => {
    board.some((_, bindex) => {
      if (board[bindex][mvalue - 1] != 0) {
        if (bucket[bucket.length - 1] === board[bindex][mvalue - 1]) {
          bucket.pop();
          answer += 2;
        } else {
          bucket.push(board[bindex][mvalue - 1]);
        }
      }

      return board[bindex][mvalue - 1] != 0;
    });

    for (let i = 0; i < board.length; i++) {
      if (board[i][mvalue - 1] != 0) {
        board[i][mvalue - 1] = 0;
        break;
      }
    }
  });

  return answer;
}

//남의 풀이: 나도 for문을 사용할 걸...
function solution(board, moves) {

    var count =0;
    var stack = [];

    for(var i=0;i<moves.length;i++){
        var now = moves[i]-1
        for(var j=0;j<board.length;j++){
            if(board[j][now]!=0){
                if(stack[stack.length-1]===board[j][now]){
                    stack.pop();
                    count+=2;
                }
                else{
                    stack.push(board[j][now])
                }
                board[j][now] = 0;
                break;
            }
        }
    }
    console.log(stack)
    return count
}
