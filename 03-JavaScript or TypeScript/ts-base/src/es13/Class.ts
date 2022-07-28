{
  // Class Public Instance Fields 公共实例字段
  class ES13Class {
    name = 'wudi'
    age: unknown
    sex: unknown
  }

  const es13class = new ES13Class()

  console.log('Class Public Instance Fields: ', es13class.name) // Class Public Instance Fields:  wudi
  console.log('Class Public Instance Fields: ', es13class.age) // Class Public Instance Fields:  undefined
  console.log('Class Public Instance Fields: ', es13class.sex) // Class Public Instance Fields:  undefined
}

{
  // Private Instance Fields 私有实例字段
  // Private instance methods and accessors 私有实例方法和访问器
  class ES13Class {
    #name: string // 私有字段
    getName: string

    constructor(name: string) {
      this.#name = name
      this.getName = name
    }

    setName() {
      return `My name is: ${this.#getNameFn()}`
    }

    #getNameFn() {
      return this.#name
    }
  }

  const es13class = new ES13Class('wudi')

  console.log('Private instance methods and accessors: ', es13class.setName()) // "Private instance methods and accessors:  My name is: wudi"
  console.log('Private instance methods and accessors: ', es13class.getName) // "Private instance methods and accessors:  wudi"
  // console.log('Private instance methods and accessors: ', es13class.#getNameFn()) // error
  // TS18013: Property '#getNameFn' is not accessible outside class 'ES13Class' because it has a private identifier.
  // console.log('Private instance methods and accessors: ', es13class1.#name) // error
  // TS18013: Property '#name' is not accessible outside class 'Info' because it has a private identifier.
}

{
  // Static class fields and methods 静态公共字段和方法
  class ES13Class {
    #num = 0

    static baseNum = 100

    // 静态方法可以通过 this 访问静态字段
    static baseNumFn = () => this.baseNum * 2
  }

  // 静态字段和方法通过类本身访问
  console.log('Static class fields and methods: ', ES13Class.baseNum) // Static class fields and methods:  100
  console.log('Static class fields and methods: ', ES13Class.baseNumFn()) // Static class fields and methods:  200

  // 实例不能访问静态字段和方法
  const es13class = new ES13Class()
  // console.log(es13class.baseNum) // error
  // TS2576: Property 'baseNum' does not exist on type 'ES13Class'. Did you mean to access the static member 'ES13Class.baseNumFn' instead?
}

{
  // Class Static Block 类静态初始化块
  let getBaseNum: () => void
  let getDoubleBaseNum

  class ES13Class {
    static base = 50
    static #baseNum = this.base * 2

    #x

    constructor(data: number) {
      this.#x = { data }
    }

    static {
      getBaseNum = () => this.#baseNum * 2
      getDoubleBaseNum = (obj: any) => {
        obj.#x.data *= obj.#x.data
        return obj.#x
      }
    }
  }

  console.log('Class Static Block: ', ES13Class.base) // Class Static Block:  50
  console.log('Class Static Block: ', getBaseNum()) // Class Static Block:  200
  console.log('Class Static Block: ', getDoubleBaseNum(new ES13Class(2)).data) // Class Static Block:  4
}

{
  // Ergonomic brand checks for Private Fields 私有字段检查
  class ES13Class {
    #phone = '189********'

    static phoneNumber(obj: any) {
      // 检查 obj 中是否存在 #phone 字段
      if (!(#phone in obj)) {
        return `Not applicable`
      }
      return `Phone number: ${obj.#phone}`
    }
  }

  const ES13User = { 'phone': '189********' }
  console.log('Ergonomic brand checks for Private Fields: ', 'phone' in ES13User) // Ergonomic brand checks for Private Fields:  true

  const ES13NewUser = {}
  console.log('Ergonomic brand checks for Private Fields: ', 'phone' in ES13NewUser) // Ergonomic brand checks for Private Fields:  false

  const phoneNo = ES13Class.phoneNumber(new ES13Class())
  console.log('Ergonomic brand checks for Private Fields: ', phoneNo) // Ergonomic brand checks for Private Fields:  Phone number: 189********

  const newPhoneNo = ES13Class.phoneNumber({})
  console.log('Ergonomic brand checks for Private Fields: ', newPhoneNo) // Ergonomic brand checks for Private Fields:  Not applicable
}

// https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md
