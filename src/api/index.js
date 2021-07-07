import axios from 'axios'
// import QS from 'qs'

// 环境的切换
if (process.env.VUE_APP_CURRENTMODE === 'production') {
  // axios.defaults.baseURL = 'http://xbk.tdj.cn/ceshi/'
  axios.defaults.baseURL = 'http://xbk.xuebaka.cn/'
} else if (process.env.VUE_APP_CURRENTMODE === 'test') {
}
// 设置请求超时
// axios.defaults.timeout = 10000
// 设置 POST 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.token = sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 通用方法
export const POST = (url, params, config = {}) => {
  return axios.post(url, params, config).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(url, { params: params }).then(res => res.data)
}

export const ALL = (promiseArr) => {
  return axios.all(promiseArr)
}
