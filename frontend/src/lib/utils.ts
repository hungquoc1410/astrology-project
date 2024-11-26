import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeName(name: string | null) {
  if (!name) {
    return ''
  }
  let result: string[] = []
  let nameArray = name.trim().toLowerCase().split(' ')
  for (let key in nameArray) {
    result.push(nameArray[key][0].toUpperCase() + nameArray[key].substring(1))
  }
  return result.join(' ')
}

export function sortObjectByKeys(obj: { [key: string]: any }, keys: string[]) {
  // Convert object to an array of key-value pairs
  const entries = Object.entries(obj)

  // Sort the array based on the provided keys
  entries.sort((a, b) => {
    const aIndex = keys.indexOf(a[0])
    const bIndex = keys.indexOf(b[0])

    // If both keys are found, compare their indices
    if (aIndex >= 0 && bIndex >= 0) {
      return aIndex - bIndex
    }

    // If one key is not found, prioritize the found one
    return aIndex - bIndex
  })

  // Convert the sorted array back to an object
  return Object.fromEntries(entries)
}
