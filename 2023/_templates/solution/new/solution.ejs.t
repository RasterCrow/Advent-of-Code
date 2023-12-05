---
to: src/<%= name %>/index.js
---
import { readFile } from '_utils/file'

const solve = (data) => {
  // write your solution here

  console.log('> result 1:', data)

  // and the second part here
  // console.log('> result 2:')
}

export default function () {
  console.log('--- Day <%= name %> ---')

  const data = readFile('<%= name %>/input.in')

  return solve(data)
}
