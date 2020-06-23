export const authFormInvalidFeedback = {
  emailInvalidFeedback () {
    if (!this.$v.authorizationData.email.maxLength) {
      return `Максимальная длина email - ${this.$v.authorizationData.email.$params.maxLength.max} символов`
    }
    if (!this.$v.authorizationData.email.email) {
      return 'Неверный формат email адреса'
    }
    if (!this.$v.authorizationData.email.emailBase) {
      return 'Email может содержать только символы латинского алфавита, цифры, символ @ и точки (не более одной подряд)'
    }
    if (!this.$v.authorizationData.email.emailUserNameMinLength) {
      return 'Длина логина (символы до @) должна быть не менее 6 символов'
    }
    if (!this.$v.authorizationData.email.emailUserNameMaxLength) {
      return 'Длина логина (символы до @) должна быть не более 30 символов'
    }
    if (!this.$v.authorizationData.email.emailDomainMaxLength) {
      return 'Длина домена (символы после @) должна быть не более 64 символов'
    }
    if (!this.$v.authorizationData.email.authorizationFailed) {
      return ''
    }
    return 'Данное поле необходимо заполнить'
  },
  passwordInvalidFeedback () {
    if (!this.$v.authorizationData.password.authorizationFailed) {
      return 'Не удаётся войти. Неверный логин или пароль.'
    }
    return 'Данное поле необходимо заполнить'
  }
}

export const registrationFormInvalidFeedback = {
  nameInvalidFeedback () {
    if (!this.$v.registrationData.name.minLength) {
      return `Имя должно состоять минимум из ${this.$v.registrationData.name.$params.minLength.min} букв`
    }
    if (!this.$v.registrationData.name.maxLength) {
      return `Имя должно состоять максимум из ${this.$v.registrationData.name.$params.maxLength.max} букв`
    }
    if (!this.$v.registrationData.name.cyrillicAlpha) {
      return 'Имя может содержать только символы кириллицы'
    }
    return 'Данное поле необходимо заполнить'
  },
  surnameInvalidFeedback () {
    if (!this.$v.registrationData.surname.minLength) {
      return `Фамилия должна состоять минимум из ${this.$v.registrationData.surname.$params.minLength.min} букв`
    }
    if (!this.$v.registrationData.surname.maxLength) {
      return `Фамилия должна состоять максимум из ${this.$v.registrationData.surname.$params.maxLength.max} букв`
    }
    if (!this.$v.registrationData.surname.cyrillicAlpha) {
      return 'Фамилия может содержать только символы кириллицы'
    }
    return 'Данное поле необходимо заполнить'
  },
  emailInvalidFeedback () {
    if (!this.$v.registrationData.email.maxLength) {
      return `Максимальная длина email - ${this.$v.registrationData.email.$params.maxLength.max} символов`
    }
    if (!this.$v.registrationData.email.email) {
      return 'Неверный формат email адреса'
    }
    if (!this.$v.registrationData.email.emailBase) {
      return 'Email может содержать только символы латинского алфавита, цифры, символ @ и точки (не более одной подряд)'
    }
    if (!this.$v.registrationData.email.emailUserNameMinLength) {
      return 'Длина логина (символы до @) должна быть не менее 6 символов'
    }
    if (!this.$v.registrationData.email.emailUserNameMaxLength) {
      return 'Длина логина (символы до @) должна быть не более 30 символов'
    }
    if (!this.$v.registrationData.email.emailDomainMaxLength) {
      return 'Длина домена (символы после @) должна быть не более 64 символов'
    }
    if (!this.$v.registrationData.email.isEmailAlreadyTaken) {
      return 'Пользователь с таким email уже зарегистрирован'
    }
    return 'Данное поле необходимо заполнить'
  },
  passwordInvalidFeedback () {
    if (!this.$v.registrationData.password.minLength) {
      return `Пароль должен состоять минимум из ${this.$v.registrationData.password.$params.minLength.min} символов`
    }
    if (!this.$v.registrationData.password.maxLength) {
      return `Длина пароля не должна привышать ${this.$v.registrationData.password.$params.maxLength.max} символов`
    }
    if (!this.$v.registrationData.password.passwordBase) {
      return 'Пароль может содержать только буквы латинского алфавита, цифры и допустимые специальные символы: !@#$%^&*'
    }
    if (!this.$v.registrationData.password.hasAtLeastOneUpperCaseLetter) {
      return 'Пароль должен содержать минимум одну букву в верхнем регистре'
    }
    if (!this.$v.registrationData.password.hasAtLeastOneLowerCaseLetter) {
      return 'Пароль должен содержать минимум одну букву в нижнем регистре'
    }
    if (!this.$v.registrationData.password.hasAtLeastOneDigit) {
      return 'Пароль должен содержать минимум одну цифру'
    }
    return 'Данное поле необходимо заполнить'
  },
  passwordRepeatFeedback () {
    if (!this.$v.registrationData.passwordRepeat.sameAs) {
      return 'Введенные пароли не совпадают'
    }
    return 'Данное поле необходимо заполнить'
  }
}
