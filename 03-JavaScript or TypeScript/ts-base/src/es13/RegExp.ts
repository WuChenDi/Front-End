// https://peaku.co/questions/65852-%C2%BFpor-que-vs-code-typescript-no-reconoce-la-propiedad-de-indices-en-el-resultado-de-regexexec
type RegExpMatchArrayWithIndices = RegExpMatchArray & {
  indices: Array<[number, number]>
}

{
  const re1 = /a+(z)?/

  const s1 = 'xaaaz'
  const m1 = re1.exec(s1)

  console.log(m1?.[0])  // 'aaaz'
  console.log(m1?.[1])  // 'z'
}

{
  const re1 = /a+(?<Z>z)?/d

  // indices are relative to start of the input string:
  const s1 = 'xaaaz'
  const m1 = re1.exec(s1) as unknown as RegExpMatchArrayWithIndices

  console.log(m1.indices[0]) // [1, 5]
  console.log(s1.slice(...m1.indices[0])) // aaaz
  console.log((m1 as any).groups.Z) // z
  console.log((m1 as any).indices.groups.Z); // [4, 5]

  console.log(m1.indices[0][0] === 1) // true
  console.log(m1.indices[0][1] === 5) // true
  console.log(s1.slice(...m1.indices[0]) === 'aaaz') // true

  console.log(m1.indices[1][0] === 4) // true
  console.log(m1.indices[1][1] === 5) // true
  console.log(s1.slice(...m1.indices[1]) === 'z') // true

  console.log((m1 as any).indices.groups['Z'][0] === 4) // true
  console.log((m1 as any).indices.groups['Z'][1] === 5) // true
  console.log(s1.slice(...(m1 as any).indices.groups['Z']) === 'z') // true

  // capture groups that are not matched return `undefined`:
  const m2 = re1.exec('xaaay') as unknown as any
  console.log(m2.indices[1] === undefined) // true
  console.log(m2.indices.groups['Z'] === undefined) // true
}
