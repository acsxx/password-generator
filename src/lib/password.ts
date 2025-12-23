export interface PasswordOptions {
  length: number
  includeLowercase: boolean
  includeUppercase: boolean
  includeDigits: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
  requireEach: boolean
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const SIMILAR_CHARS = 'iIl1oO0'

export function generatePassword(options: PasswordOptions): string {
  let charset = ''
  const charsets: string[] = []

  if (options.includeLowercase) {
    let chars = LOWERCASE
    if (options.excludeSimilar) {
      chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('')
    }
    charset += chars
    charsets.push(chars)
  }

  if (options.includeUppercase) {
    let chars = UPPERCASE
    if (options.excludeSimilar) {
      chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('')
    }
    charset += chars
    charsets.push(chars)
  }

  if (options.includeDigits) {
    let chars = DIGITS
    if (options.excludeSimilar) {
      chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('')
    }
    charset += chars
    charsets.push(chars)
  }

  if (options.includeSymbols) {
    charset += SYMBOLS
    charsets.push(SYMBOLS)
  }

  if (charset.length === 0) {
    throw new Error('No character types selected')
  }

  let password = ''
  const array = new Uint32Array(options.length)

  if (options.requireEach && charsets.length > 0) {
    for (const cs of charsets) {
      const randomIndex = getSecureRandomInt(cs.length)
      password += cs[randomIndex]
    }

    const remaining = options.length - password.length
    crypto.getRandomValues(array)
    for (let i = 0; i < remaining; i++) {
      const randomIndex = array[i] % charset.length
      password += charset[randomIndex]
    }

    password = shuffleString(password)
  } else {
    crypto.getRandomValues(array)
    for (let i = 0; i < options.length; i++) {
      const randomIndex = array[i] % charset.length
      password += charset[randomIndex]
    }
  }

  return password
}

function getSecureRandomInt(max: number): number {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] % max
}

function shuffleString(str: string): string {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

export function calculateEntropy(options: PasswordOptions): number {
  let charsetSize = 0

  if (options.includeLowercase) {
    let chars = LOWERCASE
    if (options.excludeSimilar) {
      chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('')
    }
    charsetSize += chars.length
  }

  if (options.includeUppercase) {
    let chars = UPPERCASE
    if (options.excludeSimilar) {
      chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('')
    }
    charsetSize += chars.length
  }

  if (options.includeDigits) {
    let chars = DIGITS
    if (options.excludeSimilar) {
      chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('')
    }
    charsetSize += chars.length
  }

  if (options.includeSymbols) {
    charsetSize += SYMBOLS.length
  }

  if (charsetSize === 0) return 0

  return Math.log2(Math.pow(charsetSize, options.length))
}

export function getStrengthLevel(entropy: number): 'weak' | 'medium' | 'strong' {
  if (entropy < 50) return 'weak'
  if (entropy < 80) return 'medium'
  return 'strong'
}

export function getStrengthColor(level: 'weak' | 'medium' | 'strong'): string {
  switch (level) {
    case 'weak':
      return 'var(--strength-weak)'
    case 'medium':
      return 'var(--strength-medium)'
    case 'strong':
      return 'var(--strength-strong)'
  }
}

export function getStrengthPercentage(entropy: number): number {
  const maxEntropy = 128
  return Math.min((entropy / maxEntropy) * 100, 100)
}
