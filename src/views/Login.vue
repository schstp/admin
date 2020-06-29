<template>
  <div class="container">
    <div class="row justify-content-center align-items-center content-wrapper">
      <div class="col-5">
        <h4 class="logo">Спекталь.ru</h4>
        <span>Панель администрирования</span>
        <h4 class="title">{{ title }}</h4>
            <form autocomplete="off" @submit.prevent="validateForm" method="post">
              <b-form-group :invalid-feedback="emailInvalidFeedback">
                <b-form-input
                  v-model="authorizationData.email"
                  :state="validationState.email"
                  trim
                  placeholder="Email"
                  @input="validationState.email = null">
                </b-form-input>
              </b-form-group>
              <b-form-group :invalid-feedback="passwordInvalidFeedback" style="margin-bottom: 50px">
                <b-form-input
                  type="password"
                  v-model="authorizationData.password"
                  :state="validationState.password"
                  trim
                  placeholder="Пароль"
                  @input="validationState.password = null">
                </b-form-input>
              </b-form-group>
              <b-overlay
                :show="loadingState"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="dark"
                class="d-inline-block"
              >
                <b-button
                  :disabled="loadingState"
                  type="submit"
                  class="login-btn"
                >
                  {{ submitFormButtonTitle }}
                </b-button>
              </b-overlay>
            </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { emailValidators, passwordAuthValidators } from '../partials/input_validators'
import { authFormInvalidFeedback } from '../partials/invalid_input_feedback_pull'

export default {
  name: 'Login',

  props: {
    title: {
      type: String,
      default: 'Авторизация'
    },
    submitFormButtonTitle: {
      type: String,
      default: 'Войти'
    }
  },

  data: function () {
    return {
      authorizationData: {
        email: null,
        password: null
      },
      validationState: {
        email: null,
        password: null
      },
      authorizationFailed: false,
      loadingState: false
    }
  },

  computed: {
    ...authFormInvalidFeedback
  },

  methods: {
    ...mapActions(['authorizeUser']),
    validateForm () {
      this.authorizationFailed = false
      this.validateEmail()
      this.validatePassword()
      if (!this.$v.$invalid) this.login()
    },
    validateEmail () {
      this.$v.authorizationData.email.$touch()
      this.validationState.email = !this.$v.authorizationData.email.$error
    },
    validatePassword () {
      this.$v.authorizationData.password.$touch()
      this.validationState.password = !this.$v.authorizationData.password.$error
    },

    login () {
      this.loadingState = true
      this.authorizeUser(this.authorizationData)
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          this.authorizationFailed = true
          this.validateEmail()
          this.validatePassword()
        })
        .finally(() => {
          this.loadingState = false
        })
    }
  },

  validations: {
    authorizationData: {
      email: {
        ...emailValidators,
        authorizationFailed () {
          return !this.authorizationFailed
        }
      },
      password: {
        ...passwordAuthValidators,
        authorizationFailed () {
          return !this.authorizationFailed
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    text-align: center;
    margin-top: 100px;
    .content-wrapper {
      min-height: calc(100vh - 250px);

      .title {
        margin-top: 20px;
        margin-bottom: 20px;
      }

      .logo {
        margin-top: 50px;
        font-weight: normal;
      }
    }

    .col-5 {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      border-radius: 5px;
      min-height: 400px;
    }
  }
  a {
    display: inline-block;
    margin-top: 50px;
    margin-bottom: 50px;
    color: #868686;
    text-decoration: none;
    border-bottom: 1px solid #868686;

    &:hover {
      color: #282828;
      border-color: #282828;
    }
  }
  .router-link {
    display: block;
    margin: 10px 0;
  }
</style>
