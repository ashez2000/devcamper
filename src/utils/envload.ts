import 'dotenv/config'

export default function envLoad(name: string) {
  const value = process.env[name] || ''
  if (value.trim() === '') {
    throw new Error(`Environment variable ${name} undefined`)
  }
  return value
}
