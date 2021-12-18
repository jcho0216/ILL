//내 풀이
function solution(answers) {
  let answerArr = [];
  const p1 = [1, 2, 3, 4, 5];
  const p2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const p3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
    
  answers.map((value, index) => {
      if(value === p1[index % p1.length]) {
          count1++;
      }
      if(value === p2[index % p2.length]) {
          count2++;
      } 
      if(value === p3[index % p3.length]) {
          count3++;
      }
  })
  
    const maxNum = Math.max(count1, count2, count3);
    let countArr = [count1, count2, count3];

    countArr.map((value, index) => {
        if(value === maxNum) {
            answerArr.push(index + 1);
        }
    })
    
    return answerArr;
    
}

//남의 풀이 아... filter를 사용해보았어야했는데 
function solution(answers) {
  var answer = [];
  var a1 = [1, 2, 3, 4, 5];
  var a2 = [2, 1, 2, 3, 2, 4, 2, 5]
  var a3 = [ 3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  var a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length;
  var a2c = answers.filter((a,i)=> a === a2[i%a2.length]).length;
  var a3c = answers.filter((a,i)=> a === a3[i%a3.length]).length;
  var max = Math.max(a1c,a2c,a3c);

  if (a1c === max) {answer.push(1)};
  if (a2c === max) {answer.push(2)};
  if (a3c === max) {answer.push(3)};


  return answer;
}