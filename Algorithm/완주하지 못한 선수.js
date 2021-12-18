// 나의 풀이
const numArr = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

function solution(s) {
  numArr.map((value, index) => {
    let regex = new RegExp(value, "g")
    if (s.includes(value)) {
      s = s.replace(regex, index);
    } 
  });

  return Number(s);
}

//남의 풀이 : 굳이 정규식을 쓸 필요가 없었네.. split과 join을 이렇게 사용하다니 멋있어요
function solution(s) {
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var answer = s;

    for(let i=0; i< numbers.length; i++) {
        let arr = answer.split(numbers[i]);
        answer = arr.join(i);
    }

    return Number(answer);
}
