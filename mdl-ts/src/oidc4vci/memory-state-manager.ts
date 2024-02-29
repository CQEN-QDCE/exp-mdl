import { IStateManager, StateType } from "./state-manager.types"

export class MemoryStates<T extends StateType> implements IStateManager<T> {
    private readonly expiresInMS: number
    private readonly states: Map<string, T>
    private cleanupIntervalId?: number | NodeJS.Timeout
  
    constructor(opts?: { expiresInSec?: number }) {
      this.expiresInMS = opts?.expiresInSec !== undefined ? opts?.expiresInSec * 1000 : 180000
      this.states = new Map()
    }
    async clearAll(): Promise<void> {
      this.states.clear()
    }
  
    async clearExpired(timestamp?: number): Promise<void> {
      const states = Array.from(this.states.entries())
      const ts = timestamp ?? +new Date()
      for (const [id, state] of states) {
        if (state.createdAt + this.expiresInMS < ts) {
          this.states.delete(id)
        }
      }
    }
  
    async delete(id: string): Promise<boolean> {
      if (!id) {
        throw Error('No id supplied')
      }
      return this.states.delete(id)
    }
  
    async getAsserted(id: string): Promise<T> {
      if (!id) {
        throw Error('No id supplied')
      }
      let result: T | undefined
      if (await this.has(id)) {
        result = (await this.get(id)) as T
      }
      if (!result) {
        throw new Error('issuer state or pre-authorized key not found' + ` (${id})`)
      }
      return result
    }
  
    async get(id: string): Promise<T | undefined> {
      return this.states.get(id)
    }
  
    async has(id: string): Promise<boolean> {
      if (!id) {
        throw Error('No id supplied')
      }
      return this.states.has(id)
    }
  
    async set(id: string, stateValue: T): Promise<void> {
      if (!id) {
        throw Error('No id supplied')
      }
      this.states.set(id, stateValue)
    }
  
    async startCleanupRoutine(timeout?: number): Promise<void> {
      if (!this.cleanupIntervalId) {
        this.cleanupIntervalId = setInterval(() => this.clearExpired(), timeout ?? 30000)
      }
    }
  
    async stopCleanupRoutine(): Promise<void> {
      if (this.cleanupIntervalId) {
        clearInterval(this.cleanupIntervalId)
      }
    }
  }
  