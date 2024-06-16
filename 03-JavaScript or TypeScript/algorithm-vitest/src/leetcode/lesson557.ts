export function reverseWords(str: string): string {
  // return str
  //   .split(' ')
  //   .map((item) => item.split('').reverse().join(''))
  //   .join(' ')

  return str
    .split(/\s/g)
    .map((item) => item.split('').reverse().join(''))
    .join(' ')
}
