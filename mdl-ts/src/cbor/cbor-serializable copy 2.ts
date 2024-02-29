export interface SerializableStatic {
  new (...args: any[]): any
  fromObject(data: Record<string, unknown>): InstanceType<this>
}

export interface Serializable {
  id: string
  toJSON(): string
}

//class Person implements Serializable {
  // ...
//}

class Database<S extends SerializableStatic, I extends Serializable = InstanceType<S>> {
  #dbPath: string
  #data: Map<string, I> = new Map()
  #entity: S

  constructor(entity: S) {
//    this.#dbPath = resolve(dirname(import.meta.url), `.data/${entity.name.toLowerCase()}.json`)
    this.#entity = entity
    this.#initialize()
  }

  #initialize() {
//    if (existsSync(this.#dbPath)) {
      const data: [string, Record<string, unknown>][] = [];// = JSON.parse(readFileSync(this.#dbPath, 'utf-8'))
      for (const [key, value] of data) {
        this.#data.set(key, this.#entity.fromObject(value))
      }
      return
//    }
   // this.#updateFile()
  }

  get(id: string): I | undefined {
    return this.#data.get(id)
  }
  
  getAll(): I[] {
    return [...this.#data.values()]
  }
  
  save(entity: I): this {
    this.#data.set(entity.id, entity)
   // return this.#updateFile()
   return null;
  }
}

//const db = new Database(Person)
//const all = db.getAll() // Person[]
//const oneOrNone = db.get(1) // Person | undefined
//db.save(new Person())