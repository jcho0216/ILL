//내 답안
function solution(array, commands) {
    let answer = new Array();
    
    commands.map((value) => {
        returnArr.push(array.slice(value[0] - 1, value[1]).sort((a, b) => {
            if(a < b) return -1
            if(a === b) return 0
            if(a > b) return 1
        })[value[2] - 1])
    })
    
    return answer;
}

//멋있는 답안: 비구조화 할당으로 멋있고 깔끔하게 처리를 해주었다. 신기한 알고리즘
function solution(array, commands) {
    return commands.map(command => {
        const [sPosition, ePosition, position] = command
        const newArray = array
            .filter((value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1)
            .sort((a,b) => a - b)    

        return newArray[position - 1]
    })
}
