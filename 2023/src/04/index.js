import { readFile } from '_utils/file'

const solve = (data) => {
  // write your solution here

  const lines = data.split('\r\n')
  const result = lines.reduce((sum, line, i) => {
    const winning = line.split(':')[1].split('|')[0].trim().split(' ')
    const mine = line.split(':')[1].split('|')[1].trim().split(' ')
    const gamesWon = winning
      .map((winningCard) => winningCard !== '' && mine.includes(winningCard))
      .filter((i) => i)
    if (gamesWon.length === 0) return sum
    return (sum = sum + 2 ** (gamesWon.length - 1))
  }, 0)

  console.log('> result: ', result)

  //part 2 had the worst description possible

  const copies = Array(lines.length).fill(0)
  const result2 = lines.reduce((sum, line, i) => {
    const winning = line.split(':')[1].split('|')[0].trim().split(' ')
    const mine = line.split(':')[1].split('|')[1].trim().split(' ')
    const gamesWon = winning
      .map((winningCard) => winningCard !== '' && mine.includes(winningCard))
      .filter((i) => i)
    for (let x = i; x <= i + gamesWon.length; x++) {
      if (i !== x) {
        copies[x] = copies[x] + copies[i] + 1
      }
    }
    return (sum = sum + 1 + copies[i])
  }, 0)

  console.log('> result 2:', result2)
}

export default function () {
  console.log('--- Day 04 ---')

  const data = readFile('04/input.in')

  return solve(data)
}
