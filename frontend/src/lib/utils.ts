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
