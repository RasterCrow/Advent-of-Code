import { readFile } from '_utils/file'

const solve = (data) => {
  // write your solution here

  console.log('> result 1:', data)

  // and the second part here
  // console.log('> result 2:')
}

export default function () {
  console.log('--- Day 05 ---')

  const data = readFile('05/input.in')

  return solve(data)
}
