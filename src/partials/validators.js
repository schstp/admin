import { helpers, email } from 'vuelidate/lib/validators'

export const cyrillicAlpha = helpers.regex('cyrillicAlpha', /^[А-Яа-яёЁ]+$/)
export const passwordBase = helpers.regex('passwordBase', /^[0-9a-zA-Z!@#$%^&*]+$/)
export const hasAtLeastOneUpperCaseLetter = helpers.regex('hasAtLeastOneUpperCaseLetter', /[A-Z]+/)
export const hasAtLeastOneLowerCaseLetter = helpers.regex('hasAtLeastOneLowerCaseLetter', /[a-z]+/)
export const hasAtLeastOneDigit = helpers.regex('hasAtLeastOneDigit', /[0-9]+/)
export const emailBase = helpers.regex('emailBase', /^[0-9a-zA-Z@.]+$/)
export const emailUserNameMinLength = (value) => value && email(value) ? value.slice(0, value.indexOf('@')).length >= 6 : true
export const emailUserNameMaxLength = (value) => value && email(value) ? value.slice(0, value.indexOf('@')).length <= 30 : true
export const emailDomainMaxLength = (value) => value && email(value) ? value.slice(value.indexOf('@') + 1, value.length - 1).length <= 64 : true
