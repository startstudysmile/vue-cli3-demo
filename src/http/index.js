import axios from 'axios'
import { ShowLoading, HideLoading } from './loading.js'
import { HandleError } from './error.js'

import store from '../vuex/store'

// 环境的切换
axios.defaults.baseURL = {
  production: '',
  opsproduction: '',
  development: ''
}[process.env.NODE_ENV]

//配置允许跨域携带cookie
axios.defaults.withCredentials = true

// 配置超时时间
axios.defaults.timeout = 100000

// 请求拦截器
axios.interceptors.request.use(
  config => {
    ShowLoading()
    const xStreamId = store.state.common.xStreamId
    xStreamId && (config.headers['X-Stream-Id'] = xStreamId)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    setTimeout(() => {
      HideLoading()
    }, 200)
    return response
  },
  error => {
    setTimeout(() => {
      HideLoading()
    }, 200)
    HandleError(error.response)
    return Promise.reject(error.response)
  }
)

function formatReq(type, url, data) {
  return new Promise((reslove, reject) => {
    axios(
      Object.assign(
        {
          method: type,
          url: url
        },
        type === 'get' || type === 'delete' ? { params: data } : { data: data }
      )
    )
      .then(res => {
        reslove(res.data.msg)
      })
      .catch(e => {
        reject(e.message)
      })
  })
}

const Axios = {
  get: (url, data) => formatReq('get', url, data),
  post: (url, data) => formatReq('post', url, data),
  put: (url, data) => formatReq('put', url, data),
  patch: (url, data) => formatReq('patch', url, data),
  delete: (url, data) => formatReq('delete', url, data)
}

export default Axios
