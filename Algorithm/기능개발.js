//나의 풀이:
function solution(progresses, speeds) {
  let days = [];
  const answer = [];
  let time = 1;

  for (let i = 0; i < progresses.length; i++) {
    days.push(Math.ceil((100 - progresses[i]) / speeds[i]));
  }

  for (let i = 0; i < days.length; i++) {
    if (days[i] >= days[i + 1]) {
      days[i + 1] = days[i];
    }

    if (days[i] === days[i + 1]) {
      time++;
    } else {
      answer.push(time);
      time = 1;
    }
  }

  return answer;
}

//남의 풀이: 나보다 훨씬 간단하게 잘 짰구나..
function solution(progresses, speeds) {
  let answer = [0];
  let days = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );
  let maxDay = days[0];

  for (let i = 0, j = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      answer[j] += 1;
    } else {
      maxDay = days[i];
      answer[++j] = 1;
    }
  }

  return answer;
}
