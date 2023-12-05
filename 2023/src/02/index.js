import { readFile } from '_utils/file'

const solve = (data) => {
  // write your solution here
  const ballimits = {
    green: 13,
    red: 12,
    blue: 14,
  }
  const result = data.split('\r\n').reduce((sum, line) => {
    const [gameInfo, gameData] = line.split(':')
    const ID = +gameInfo.slice(5)
    const isValid = !gameData.split(';').some((ex) => {
      const exColors = ex.split(',')
      return exColors.find(
        (elem) => elem.split(' ')[1] > ballimits[elem.split(' ')[2]]
      )
    })
    return isValid ? sum + ID : sum
  }, 0)

  console.log('> result 1:', result)
  // and the second part here
  const result2 = data.split('\r\n').reduce((sum, line) => {
    const [gameInfo, fullData] = line.split(':')
    const resultMap = new Map()

    const gameData = fullData.split(';')
    for (let i = 0; i < gameData.length; i++) {
      const extractions = gameData[i].split(',')
      extractions.map((singleEx) => {
        const [value, color] = singleEx.slice(1).split(' ')
        if (resultMap.has(color)) {
          if (value > resultMap.get(color)) {
            resultMap.set(color, +value)
          }
        } else {
          resultMap.set(color, +value)
        }
      })
    }
    return (
      sum +
      resultMap.get('red') * resultMap.get('green') * resultMap.get('blue')
    )
  }, 0)

  console.log('> result 2:', result2)
}

export default function () {
  console.log('--- Day 02 ---')

  const data = readFile('02/input.in')

  return solve(data)
}
