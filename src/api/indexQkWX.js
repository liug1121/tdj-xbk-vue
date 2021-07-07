import axios from 'axios'
const QKwxApi = axios.create()
// 环境的切换
if (process.env.VUE_APP_CURRENTMODE === 'production') {
  // QKwxApi.defaults.baseURL = 'http://xbk.tdj.cn/ceshi/'
  QKwxApi.defaults.baseURL = 'http://xbk.xuebaka.cn/'
} else if (process.env.VUE_APP_CURRENTMODE === 'test') {
}
QKwxApi.defaults.headers.post['Content-Type'] = 'application/json'
QKwxApi.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.token = localStorage.getItem('QKtokenWX')
  // 在最后必须 return config
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
QKwxApi.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default QKwxApi

// 通用方法
export const POST = (url, params, config = {}) => {
  return QKwxApi.post(url, params, config).then(res => res.data)
}

export const GET = (url, params) => {
  return QKwxApi.get(url, { params: params }).then(res => res.data)
}

export const ALL = (promiseArr) => {
  return QKwxApi.all(promiseArr)
}
