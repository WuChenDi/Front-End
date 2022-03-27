interface AsyncStorage {
  readonly length: number
  clear(): Promise<void>
  getItem(key: string): Promise<string | null>
  removeItem(key: string): Promise<void>
  setItem(key: string, value: string): Promise<void>
  [name: string]: any
}

function isPromise(obj: any): obj is PromiseLike<any> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

/**
 * Storage
 * @desc localstorage, sessionStorage 封装
 */

export class Storage<T extends globalThis.Storage | AsyncStorage> {
  storage: T
  constructor(storage: T) {
    this.storage = storage
  }

  /**
   * 取值
   * @param key
   */
  public get(key: string | number): unknown | Promise<unknown> {
    if (isPromise(this.storage.getItem)) {
      return new Promise(resolve => {
        ;(this.storage.getItem(String(key)) as Promise<string | null>).then(result => {
          try {
            result = JSON.parse(result ?? '')
          } catch {}
          resolve(resolve)
        })
      })
    } else {
      let data = this.storage.getItem(String(key))

      try {
        data = JSON.parse((data as string | null) ?? '')
      } catch {}

      return data
    }
  }

  /**
   * 写入
   * @param key
   * @param value
   */
  public set<U>(key: string | number, value: U) {
    let data: string
    if (typeof value === 'object') {
      data = JSON.stringify(value)
    } else {
      data = String(value)
    }
    this.storage.setItem(String(key), data)
  }

  /**
   * 删除
   * @param key
   */
  public remove(key: string | number) {
    this.storage.removeItem(String(key))
  }

  /**
   * 清空
   */
  public clear() {
    this.storage.clear()
  }
}

// const local = new Storage(localStorage)
// const session = new Storage(sessionStorage)

// // localStorage
// // 写
// local.set('test', 123)
// // 取
// const getLocal = <string>local.get('test') || ''
// // 删
// local.remove('test')

// // localStorage
// // 写
// session.set('test', 123)
// // 取
// const getSession = <string>session.get('test') || ''
// // 删
// session.remove('test')
