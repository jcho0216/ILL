//내 풀이 
function solution(n, words) {
  let findFail = [words[0]];
  let number = 0;
  let time = 0;

  for (let i = 1; i < words.length; i++) {
    if (
      findFail.includes(words[i]) === true ||
      findFail[findFail.length - 1].slice(-1) != words[i].charAt(0)
    ) {
      number = (i % n) + 1;
      time = Math.floor(i / n) + 1;
      break;
    } else {
      findFail.push(words[i]);
    }
  }

  return [number, time];
}

//남의 풀이 : reduce 함수 공부해봐! 잘 짜신다....
function solution(n, words) {
    let answer = 0;
    words.reduce((prev, now, idx) => {
        answer = answer || ((words.slice(0, idx).indexOf(now) !== -1 || prev !== now[0]) ? idx : answer);
        return now[now.length-1];
    }, "")

    return answer ? [answer%n+1, Math.floor(answer/n)+1] : [0,0];
}