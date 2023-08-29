import 'dotenv/config'

/** Loads environment varialbe from .env */
export function envLoader(name: string) {
  let value = process.env[name]
  if (value === undefined || value === null || value.trim() === '') {
    throw new Error(`environment variable ${name} is not defined`)
  }

  return value
}
