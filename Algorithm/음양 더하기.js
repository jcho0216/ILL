//나의 답
function solution(absolutes, signs) {
  let answerArr = [];

  for (let i = 0; i < absolutes.length; i++) {
    if (signs[i]) {
      answerArr.push(absolutes[i]);
    } else answerArr.push(absolutes[i] * -1);
  }

  return answerArr.reduce((acc, value) => acc + value);
}

//멋진 답안 : 와..

function solution(absolutes, signs) {
  return absolutes.reduce((acc, val, i) => acc + val * (signs[i] ? 1 : -1), 0);
}
