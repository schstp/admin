import axios from 'axios'
import { BACKEND_ENDPOINTS } from './backend_endpoints'

class ApiClientClass {
  constructor (options = {}) {
    this.defaultHeaders = options.headers || {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    this.client = options.client ||
      axios.create({
        baseURL: process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : '',
        headers: this.defaultHeaders
      })

    this.client.interceptors.request.use(
      config => {
        if (!localStorage.getItem('token')) {
          return config
        }
        const newHeaders = {
          ...this.defaultHeaders,
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        return {
          ...config,
          headers: newHeaders
        }
      },
      err => Promise.reject(err)
    )

    this.client.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401 && !error.config.retry) {
          this.removeToken()
        }
        throw error
      }
    )
  }

  urlFormat (url, args) {
    for (const attr in args) {
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty(attr)) url = url.split('{' + attr + '}').join(args[attr])
    }
    return url
  }

  async logout () {
    try {
      await this.client({
        method: BACKEND_ENDPOINTS.deauthorizeUser.method,
        url: BACKEND_ENDPOINTS.deauthorizeUser.url
      })
    } catch (error) {
      throw new Error(error.response)
    } finally {
      this.removeToken()
    }
  }

  setToken (token = '') {
    localStorage.setItem('token', token)
    window.dispatchEvent(new StorageEvent('storage', { key: 'token' }))
  }

  removeToken () {
    localStorage.removeItem('token')
    window.dispatchEvent(new StorageEvent('storage', { key: 'token' }))
  }
}

export default new Proxy(
  new ApiClientClass(),
  {
    get: function (target, name) {
      if (BACKEND_ENDPOINTS[name] !== undefined) {
        return ({ params = {}, data = {}, args = {}, headers = {} } = {}) => {
          return target.client({
            method: BACKEND_ENDPOINTS[name].method,
            url: target.urlFormat(BACKEND_ENDPOINTS[name].url, args),
            data: data,
            params: params,
            headers: headers
          })
            .then((serverResponse) => serverResponse.data)
            .catch((err) => {
              if (err.response.status === 401) {
                target.logout()
                return null
              }
              throw err
            })
        }
      } else {
        return target[name]
      }
    }
  }
)
