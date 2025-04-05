export const convertHeight = (value: number, from: 'cm' | 'in', to: 'cm' | 'in'): number => {
  if (from === to) return value
  return from === 'cm' ? value / 2.54 : value * 2.54
}

export const convertWeight = (value: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs'): number => {
  if (from === to) return value
  return from === 'kg' ? value * 2.20462 : value / 2.20462
}