export interface Tag {
  tagId: string
  tagName: string
  order?: number
}

interface TagGroup extends Tag {
  tagGroupId: string
  strategyId?: string
}

/**
 * 数组分类
 * @param arr 数据源
 * @param label 需要分类的 key
 * @returns 返回数据格式 [[],[],[]]
 */
function arrayClassification(arr: TagGroup[], label: 'tagGroupId' | 'strategyId'): TagGroup[][] {
  const categorys = Array.from(new Set(arr.map(item => item[label])))
  return categorys.map(c => arr.filter(a => a[label] === c))
}

// function arrayClassification1(arr: TagGroup[], label: 'tagGroupId' | 'strategyId'): TagGroup[][] {
//   const map = new Map<string, TagGroup[]>()
//   for (const item of arr) {
//     const key = item[label]!.toString()
//     if (!map.has(key)) {
//       map.set(key, [])
//     }
//     map.get(key)?.push(item)
//   }
//   return Array.from(map.values())
// }

// function arrayClassification2(arr: TagGroup[], label: 'tagGroupId' | 'strategyId'): TagGroup[][] {
//   const map = arr.reduce((map, item) => {
//     const key = item[label]!.toString()
//     if (!map.has(key)) {
//       map.set(key, [])
//     }
//     map.get(key)?.push(item)
//     return map
//   }, new Map<string, TagGroup[]>())
//   return Array.from(map.values())
// }

// 测试数据
const array_test = [
  {
    order: -87352629,
    createTime: '2015-09-25 09:51:16',
    tagId: 'incididunt ullamco commodo eiusmod ad',
    tagName: 'do ex',
    strategyId: 'in ad',
    tagGroupId: 'nisi dolor velit qui'
  },
  {
    tagId: 'nostrud pariatur',
    createTime: '2020-08-19 02:02:06',
    tagName: 'deserunt anim aute',
    order: -91596997,
    strategyId: 'in ad',
    tagGroupId: 'nisi dolor velit qui'
  },
  {
    tagId: 'pariatur aliquip sunt',
    createTime: '1980-09-04 17:09:24',
    order: 17379980,
    tagName: 'nisi ut in officia',
    strategyId: 'in ad',
    tagGroupId: 'nisi dolor velit qui'
  },
  {
    order: 28978992,
    tagName: 'ut esse labore',
    createTime: '2000-08-06 00:52:14',
    tagId: 'ullamco incididunt proident',
    strategyId: 'in ad',
    tagGroupId: 'culpa est laborum'
  },
  {
    tagId: 'ullamco voluptate sunt consectetur velit',
    createTime: '2020-03-28 19:56:50',
    tagName: 'pariatur tempor',
    order: -66101165,
    strategyId: 'ipsum ut',
    tagGroupId: 'dolor in'
  },
  {
    tagName: 'eiusmod tempor id',
    createTime: '1997-08-16 18:48:48',
    order: 26964522,
    tagId: 'reprehenderit exercitation aute',
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'in qui eiusmod Lorem Duis'
  },
  {
    order: 41297031,
    tagName: 'Duis ipsum sint adipisicing minim',
    createTime: '1996-04-25 16:39:08',
    tagId: 'aliquip dolor',
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'ullamco adipisicing quis reprehenderit exercitation'
  },
  {
    tagName: 'velit consectetur Duis adipisicing tempor',
    tagId: 'aliqua',
    createTime: '1991-04-09 02:16:27',
    order: -28921289,
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'in ut exercitation id'
  },
  {
    tagId: 'fugiat anim sunt ut',
    createTime: '2009-02-14 07:55:53',
    order: -94319556,
    tagName: 'sunt',
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'consectetur sed Duis'
  },
  {
    order: -69954880,
    createTime: '1980-01-28 11:29:22',
    tagId: 'cillum pariatur consectetur',
    tagName: 'nulla aliqua fugiat',
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'consectetur sed Duis'
  },
  {
    tagId: 'consectetur deserunt dolor',
    order: -37126786,
    createTime: '1989-12-24 13:17:46',
    tagName: 'reprehenderit',
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'nulla'
  },
  {
    tagId: 'sunt',
    tagName: 'ut',
    createTime: '2004-02-20 04:10:32',
    order: -38688614,
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'nulla'
  },
  {
    tagId: 'laboris consequat',
    tagName: 'irure dolore aliqua',
    createTime: '1987-01-10 11:26:33',
    order: -99265221,
    strategyId: 'cupidatat minim irure nisi',
    tagGroupId: 'nulla'
  },
  {
    order: 52348677,
    tagName: 'labore',
    tagId: 'ullamco tempor consequat',
    createTime: '1977-05-27 20:18:41',
    strategyId: 'consectetur quis',
    tagGroupId: 'do dolore amet nulla'
  },
  {
    order: 11354085,
    createTime: '2021-03-07 16:21:36',
    tagName: 'incididunt magna',
    tagId: 'ullamco magna esse enim nisi',
    strategyId: 'consectetur quis',
    tagGroupId: 'officia non'
  },
  {
    createTime: '1982-06-03 23:42:57',
    order: -7001390,
    tagId: 'minim',
    tagName: 'laborum',
    strategyId: 'consectetur quis',
    tagGroupId: 'Ut fugiat cupidatat'
  }
]

const array_test_result = arrayClassification(array_test, 'tagGroupId')

console.info(array_test_result)
// 测试结果
// [
//   [
//       {
//           "order": -87352629,
//           "createTime": "2015-09-25 09:51:16",
//           "tagId": "incididunt ullamco commodo eiusmod ad",
//           "tagName": "do ex",
//           "strategyId": "in ad",
//           "tagGroupId": "nisi dolor velit qui"
//       },
//       {
//           "tagId": "nostrud pariatur",
//           "createTime": "2020-08-19 02:02:06",
//           "tagName": "deserunt anim aute",
//           "order": -91596997,
//           "strategyId": "in ad",
//           "tagGroupId": "nisi dolor velit qui"
//       },
//       {
//           "tagId": "pariatur aliquip sunt",
//           "createTime": "1980-09-04 17:09:24",
//           "order": 17379980,
//           "tagName": "nisi ut in officia",
//           "strategyId": "in ad",
//           "tagGroupId": "nisi dolor velit qui"
//       }
//   ],
//   [
//       {
//           "order": 28978992,
//           "tagName": "ut esse labore",
//           "createTime": "2000-08-06 00:52:14",
//           "tagId": "ullamco incididunt proident",
//           "strategyId": "in ad",
//           "tagGroupId": "culpa est laborum"
//       }
//   ],
//   [
//       {
//           "tagId": "ullamco voluptate sunt consectetur velit",
//           "createTime": "2020-03-28 19:56:50",
//           "tagName": "pariatur tempor",
//           "order": -66101165,
//           "strategyId": "ipsum ut",
//           "tagGroupId": "dolor in"
//       }
//   ],
//   [
//       {
//           "tagName": "eiusmod tempor id",
//           "createTime": "1997-08-16 18:48:48",
//           "order": 26964522,
//           "tagId": "reprehenderit exercitation aute",
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "in qui eiusmod Lorem Duis"
//       }
//   ],
//   [
//       {
//           "order": 41297031,
//           "tagName": "Duis ipsum sint adipisicing minim",
//           "createTime": "1996-04-25 16:39:08",
//           "tagId": "aliquip dolor",
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "ullamco adipisicing quis reprehenderit exercitation"
//       }
//   ],
//   [
//       {
//           "tagName": "velit consectetur Duis adipisicing tempor",
//           "tagId": "aliqua",
//           "createTime": "1991-04-09 02:16:27",
//           "order": -28921289,
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "in ut exercitation id"
//       }
//   ],
//   [
//       {
//           "tagId": "fugiat anim sunt ut",
//           "createTime": "2009-02-14 07:55:53",
//           "order": -94319556,
//           "tagName": "sunt",
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "consectetur sed Duis"
//       },
//       {
//           "order": -69954880,
//           "createTime": "1980-01-28 11:29:22",
//           "tagId": "cillum pariatur consectetur",
//           "tagName": "nulla aliqua fugiat",
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "consectetur sed Duis"
//       }
//   ],
//   [
//       {
//           "tagId": "consectetur deserunt dolor",
//           "order": -37126786,
//           "createTime": "1989-12-24 13:17:46",
//           "tagName": "reprehenderit",
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "nulla"
//       },
//       {
//           "tagId": "sunt",
//           "tagName": "ut",
//           "createTime": "2004-02-20 04:10:32",
//           "order": -38688614,
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "nulla"
//       },
//       {
//           "tagId": "laboris consequat",
//           "tagName": "irure dolore aliqua",
//           "createTime": "1987-01-10 11:26:33",
//           "order": -99265221,
//           "strategyId": "cupidatat minim irure nisi",
//           "tagGroupId": "nulla"
//       }
//   ],
//   [
//       {
//           "order": 52348677,
//           "tagName": "labore",
//           "tagId": "ullamco tempor consequat",
//           "createTime": "1977-05-27 20:18:41",
//           "strategyId": "consectetur quis",
//           "tagGroupId": "do dolore amet nulla"
//       }
//   ],
//   [
//       {
//           "order": 11354085,
//           "createTime": "2021-03-07 16:21:36",
//           "tagName": "incididunt magna",
//           "tagId": "ullamco magna esse enim nisi",
//           "strategyId": "consectetur quis",
//           "tagGroupId": "officia non"
//       }
//   ],
//   [
//       {
//           "createTime": "1982-06-03 23:42:57",
//           "order": -7001390,
//           "tagId": "minim",
//           "tagName": "laborum",
//           "strategyId": "consectetur quis",
//           "tagGroupId": "Ut fugiat cupidatat"
//       }
//   ]
// ]
