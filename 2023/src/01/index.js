import { readFile } from '../utils/file'

const solve = (data) => {
  // write your solution here
  const result = data.split('\r\n').reduce((sum, line) => {
    const lineData = line.split('')
    const first = lineData.find((val) => !isNaN(val))
    const last = lineData.findLast((val) => !isNaN(val))
    return sum + Number(first + last)
  }, 0)
  console.log('> result 1:', result)

  const stringNums = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]

  const result2 = data.split('\r\n').reduce((sum, line) => {
    const lineData = line.split('')
    let first
    let last
    let currString = ''

    for (let i = 0; i < lineData.length; i++) {
      if (!first && !isNaN(lineData[i])) {
        first = Number(lineData[i])
      }
      if (!isNaN(lineData[i])) {
        last = lineData[i]
      }
      if (isNaN(lineData[i])) {
        currString = currString + lineData[i]
        const index = stringNums.findIndex((val) => val === currString)
        if (index != -1) {
          if (!first) {
            first = index + 1
          }
          last = index + 1
          currString = currString.slice(1)
          let isStillNumber = stringNums.some((num) =>
            num.startsWith(currString)
          )
          while (!isStillNumber && currString.length > 0) {
            currString = currString.slice(1)
            isStillNumber = stringNums.some((num) => num.startsWith(currString))
          }
        } else {
          let isStillNumber = stringNums.some((num) =>
            num.startsWith(currString)
          )
          while (!isStillNumber && currString.length > 0) {
            currString = currString.slice(1)
            isStillNumber = stringNums.some((num) => num.startsWith(currString))
          }
          if (!isStillNumber) currString = ''
        }
      }
    }

    return sum + Number(String(first) + String(last))
  }, 0)

  console.log('> result 2:', result2)
}

export default function () {
  console.log('--- Day 01 ---')

  const data = readFile('01/input.in')

  return solve(data)
}
