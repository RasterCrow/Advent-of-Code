import { readFile } from '_utils/file'

//i don't like the 2 whiles
//tried recursivly but stack size gets too big

const part1 = (data) => {
  const times = data.split('\r\n')[0].split(': ')[1].trim().split(/\s+/)
  const distance = data.split('\r\n')[1].split(': ')[1].trim().split(/\s+/)

  const result = times.reduce((acc, el, i) => {
    const maxTime = +el
    const distToBeat = +distance[i]

    let minHold
    let maxHold

    let holdingTime = 1
    while (minHold === undefined) {
      if (holdingTime > maxTime) {
        minHold = 0
      } else {
        const notHoldingTime = maxTime - holdingTime
        const expectedDist = holdingTime * notHoldingTime
        if (expectedDist > distToBeat) {
          minHold = holdingTime + 1
        }

        holdingTime = holdingTime + 1
      }
    }
    holdingTime = maxTime
    while (maxHold === undefined) {
      if (holdingTime < 1) {
        maxHold = 1
      } else {
        const notHoldingTime = maxTime - holdingTime
        const expectedDist = holdingTime * notHoldingTime
        if (expectedDist > distToBeat) {
          maxHold = holdingTime + 2 // +2 to count for current number and max number too
        }
        holdingTime = holdingTime + -1
      }
    }
    return acc * (maxHold - minHold)
  }, 1)

  return result
}

const part2 = (data) => {
  const maxTime = parseInt(
    data.split('\r\n')[0].split(': ')[1].trim().split(/\s+/).join('')
  )
  const distToBeat = parseInt(
    data.split('\r\n')[1].split(': ')[1].trim().split(/\s+/).join('')
  )

  let minHold
  let maxHold

  let holdingTime = 1
  while (minHold === undefined) {
    if (holdingTime > maxTime) {
      minHold = 0
    } else {
      const notHoldingTime = maxTime - holdingTime
      const expectedDist = holdingTime * notHoldingTime
      if (expectedDist > distToBeat) {
        minHold = holdingTime + 1
      }

      holdingTime = holdingTime + 1
    }
  }
  holdingTime = maxTime
  while (maxHold === undefined) {
    if (holdingTime < 1) {
      maxHold = 1
    } else {
      const notHoldingTime = maxTime - holdingTime
      const expectedDist = holdingTime * notHoldingTime
      if (expectedDist > distToBeat) {
        maxHold = holdingTime + 2 // +2 to count for current number and max number too
      }
      holdingTime = holdingTime + -1
    }
  }

  const result = maxHold - minHold
  return result
}

const solve = (data) => {
  // write your solution here

  const result1 = part1(data)
  console.log('> result 1:', result1)

  // and the second part here

  const result2 = part2(data)
  console.log('> result 2:', result2)
}

export default function () {
  console.log('--- Day 06 ---')

  const data = readFile('06/input.in')

  return solve(data)
}
