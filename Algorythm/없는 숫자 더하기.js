//나의 풀이
function solution(numbers) {
    let maxNum = 9;
    let sum = 0;
    
    for(let i = 0; i <= maxNum; i++) {
        sum += i;
    }
    
    return sum - getAddedValue(numbers);
}

function getAddedValue(numbers) {
    let numberSum = 0;
    numbers.map((value) => {
        numberSum += value;
    })
    
    return numberSum;
}

//다른 사람의 풀이 : reduce 함수를 깜빡하였다. 다시 reduce 함수를 공부하게됨
function solution(numbers) {
    return 45 - numbers.reduce((cur, acc) => cur + acc, 0);
}