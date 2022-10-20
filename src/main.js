import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './vant'
import './element'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import 'common/css/style.less'
import axios from 'axios'
// import VConsole from 'vconsole'
import wx from 'weixin-js-sdk'
import infiniteScroll from 'vue-infinite-scroll'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(infiniteScroll)
if (process.env.VUE_APP_BASE_URL === 'http://xbk.tdj.cn') {
  /* eslint-disable no-new */
  // new VConsole()
}
/* eslint-disable no-new */
// new VConsole()
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.wx = wx
// 配置请求的跟路径sessionStorage
axios.interceptors.request.use(config => {
  config.headers.token = sessionStorage.getItem('token')
  return config
})
Vue.filter('dateSpecificDateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = Number(dt.getFullYear())
  const m = Number((dt.getMonth() + 1 + '').padStart(2, '0'))
  const d = Number((dt.getDate() + '').padStart(2, '0'))

  return `${y}/${m}/${d}`
})
Vue.filter('dateHourMinSecondFormat', function (originVal) {
  const dt = new Date(originVal)
  const hh = Number((dt.getHours() + '').padStart(2, '0'))
  const mm = Number((dt.getMinutes() + '').padStart(2, '0'))
  const ss = Number((dt.getSeconds() + '').padStart(2, '0'))
  return `${hh}:${mm}:${ss}`
})
Vue.filter('JQnumber', function (numVal) {
  const num = numVal.replace(/[^0-9]/ig, '')
  return Number(num)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
