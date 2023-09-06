import { envLoader } from './env-loader'

const NODE_ENV = envLoader('NODE_ENV')

export function createDebug(label: string) {
  return function (...args: any[]) {
    if (NODE_ENV === 'development') {
      console.log(`[${label}]`, ...args)
    }
  }
}
