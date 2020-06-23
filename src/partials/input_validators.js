import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
import {
  cyrillicAlpha,
  passwordBase,
  hasAtLeastOneDigit,
  hasAtLeastOneLowerCaseLetter,
  hasAtLeastOneUpperCaseLetter,
  emailBase,
  emailUserNameMaxLength,
  emailUserNameMinLength,
  emailDomainMaxLength
} from './validators'

export const fullNameValidators = {
  required,
  minLength: minLength(2),
  maxLength: maxLength(127),
  cyrillicAlpha
}

export const emailValidators = {
  required,
  email,
  emailBase,
  emailUserNameMaxLength,
  emailUserNameMinLength,
  emailDomainMaxLength,
  maxLength: maxLength(95)
}

export const passwordAuthValidators = {
  required
}

export const passwordRegValidators = {
  required,
  minLength: minLength(8),
  maxLength: maxLength(127),
  passwordBase,
  hasAtLeastOneUpperCaseLetter,
  hasAtLeastOneLowerCaseLetter,
  hasAtLeastOneDigit
}

export const passwordRepeatValidators = {
  required,
  sameAs: sameAs('password')
}
