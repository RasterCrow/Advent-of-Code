import { readFile } from '_utils/file'

const checkAdjacentLines = (lines, lineIndex, charIndex) => {
  const isValidIndex = (array, index) => index >= 0 && index < array.length

  const isValidSymbol = (char) => char !== '.' && isNaN(Number(char))

  const isSymbolAtIndex = (array, lineIndex, charIndex) => {
    return (
      isValidIndex(array, lineIndex) &&
      isValidIndex(array[lineIndex], charIndex) &&
      isValidSymbol(array[lineIndex][charIndex])
    )
  }

  return (
    isSymbolAtIndex(lines, lineIndex, charIndex - 1) ||
    isSymbolAtIndex(lines, lineIndex, charIndex + 1) ||
    isSymbolAtIndex(lines, lineIndex - 1, charIndex - 1) ||
    isSymbolAtIndex(lines, lineIndex - 1, charIndex) ||
    isSymbolAtIndex(lines, lineIndex - 1, charIndex + 1) ||
    isSymbolAtIndex(lines, lineIndex + 1, charIndex - 1) ||
    isSymbolAtIndex(lines, lineIndex + 1, charIndex) ||
    isSymbolAtIndex(lines, lineIndex + 1, charIndex + 1)
  )
}
const solve = (data) => {
  // write your solution here
  const lines = data.split('\r\n')
  const result = lines.reduce((sum, line, i) => {
    let number = ''
    let hasSymbolAdjacent = ''
    let lineSum = 0
    for (let x = 0; x < line.length; x++) {
      const el = line[x]
      const isNumber = !isNaN(el)
      if (isNumber) {
        number = number + el
        //check for adjacent numbers
        if (!hasSymbolAdjacent) {
          hasSymbolAdjacent = checkAdjacentLines(lines, i, x)
        }
        if (x == line.length - 1 && hasSymbolAdjacent) {
          lineSum = lineSum + Number(number)
        }
      } else {
        if (number.length > 0 && hasSymbolAdjacent) {
          lineSum = lineSum + Number(number)
        }
        hasSymbolAdjacent = false
        number = ''
      }
    }
    return sum + lineSum
  }, 0)
  console.log('> result 1:', result)

  // and the second part here
  const sum2AdjacentNumbers = (lines, i, x) => {
    const isValidIndex = (array, index) => index >= 0 && index < array.length

    const hasNumber = (array, lineIndex, charIndex, direction) => {
      if (
        !isValidIndex(array, lineIndex) ||
        !isValidIndex(array[lineIndex], charIndex) ||
        isNaN(array[lineIndex][charIndex])
      ) {
        return ''
      }

      return direction == 'left'
        ? hasNumber(array, lineIndex, charIndex - 1, direction) +
            array[lineIndex][charIndex]
        : array[lineIndex][charIndex] +
            hasNumber(array, lineIndex, charIndex + 1, direction)

      //check for number
    }

    const aboveLeft = hasNumber(lines, i - 1, x - 1, 'left')
    const aboveCenter = !isNaN(lines[i - 1][x]) ? lines[i - 1][x] : ''
    const aboveRight = hasNumber(lines, i - 1, x + 1, 'right')

    const belowLeft = hasNumber(lines, i + 1, x - 1, 'left')
    const belowCenter = !isNaN(lines[i + 1][x]) ? lines[i + 1][x] : ''
    const belowRight = hasNumber(lines, i + 1, x + 1, 'right')

    const above = !isNaN(lines[i - 1][x])
      ? [+(aboveLeft + aboveCenter + aboveRight)]
      : [+aboveLeft, +aboveRight]

    const below = !isNaN(lines[i + 1][x])
      ? [+(belowLeft + belowCenter + belowRight)]
      : [+belowLeft, +belowRight]

    const left = +hasNumber(lines, i, x - 1, 'left')
    const right = +hasNumber(lines, i, x + 1, 'right')
    const nCount = [above, below, left, right]
      .flatMap((el) => el)
      .filter((variable) => variable != 0)
    return nCount.length === 2 ? nCount[0] * nCount[1] : 0
  }
  const result2 = lines.reduce((sum, line, i) => {
    let lineValue = 0
    for (let x = 0; x < line.length; x++) {
      const el = line[x]
      const isGear = el === '*'
      if (isGear) {
        lineValue = lineValue + sum2AdjacentNumbers(lines, i, x)
      }
    }
    return sum + lineValue
  }, 0)
  console.log('> result 2:', result2)
}

export default function () {
  console.log('--- Day 03 ---')

  const data = readFile('03/input.in')

  return solve(data)
}
