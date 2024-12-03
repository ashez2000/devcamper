export function loadenv(name: string, fallback?: string) {
  const value = process.env[name]
  if (!value && !fallback) {
    throw Error(`env "${name}" undefined`)
  }
  return (value ?? fallback) as string
}
