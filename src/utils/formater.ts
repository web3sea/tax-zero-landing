import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const FormatDate = {
  timeAgo(timestamp: string | number | Date): string {
    return dayjs(timestamp).fromNow()
  },
}

export const FormatNumber = {
  numberWithCommas(value: number) {
    return value.toLocaleString('en-US')
  },
}

/**
 * Formats a phone number to international format (+1...)
 * Defaults to US country code (+1)
 * 
 * @param phone - Phone number string (can include spaces, dashes, parentheses, etc.)
 * @returns Formatted phone number in E.164 format (+1XXXXXXXXXX) or empty string if invalid
 * 
 * @example
 * formatPhoneNumber('1234567890') => '+11234567890'
 * formatPhoneNumber('(123) 456-7890') => '+11234567890'
 * formatPhoneNumber('123-456-7890') => '+11234567890'
 * formatPhoneNumber('+1 123 456 7890') => '+11234567890'
 */
export function formatPhoneNumber(phone: string | undefined | null): string {
  if (!phone) return ''

  const trimmed = phone.trim()
  if (!trimmed) return ''

  // Remove all non-digit characters except leading +
  let cleaned = trimmed.replace(/[^\d+]/g, '')

  // If it already starts with +1, just clean it
  if (cleaned.startsWith('+1')) {
    const digits = cleaned.slice(2).replace(/\D/g, '')
    if (digits.length === 10) {
      return '+1' + digits
    }
    // If not exactly 10 digits, return original to let validation handle it
    return trimmed
  }
  // If it starts with just 1 (without +), check if it's 11 digits
  else if (cleaned.startsWith('1') && cleaned.length === 11) {
    return '+' + cleaned.replace(/\D/g, '')
  }
  // Otherwise, assume it's a US number without country code
  else {
    const digitsOnly = cleaned.replace(/\D/g, '')
    // If it's exactly 10 digits, add +1
    if (digitsOnly.length === 10) {
      return '+1' + digitsOnly
    }
    // If it's 11 digits starting with 1, add +
    if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      return '+' + digitsOnly
    }
    // If not valid length, return original (validation will catch it)
    return trimmed
  }
}

/**
 * Validates if a phone number is valid (US format)
 * 
 * @param phone - Phone number string
 * @returns true if valid, false otherwise
 */
export function isValidPhoneNumber(phone: string | undefined | null): boolean {
  if (!phone) return false
  const formatted = formatPhoneNumber(phone)
  return formatted.length > 0 && formatted.startsWith('+1') && formatted.length === 12
}
