import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import WxAPI from './../api/login'

Vue.use(VueRouter)
Vue.prototype.$axios = axios

const routes = [
  {
    path: '/',
    redirect: '/suningCard'
  },
  {
    path: '/Index',
    name: '首页',
    component: () => import('components/index.vue')
  },
  {
    path: '/applyCard',
    name: '申请学霸卡', // 申请卡
    component: () => import('components/applyCard/applyCard.vue')
  },
  {
    path: '/OpeningCard',
    name: '苏宁99学霸卡', // 苏宁
    component: () => import('components/applyCard/OpeningCard.vue'),
    meta: { suning: true }
  },
  {
    path: '/suningCard',
    name: '免费领取，无限续定', // 苏宁
    component: () => import('components/applyCard/suningCard.vue'),
    meta: { suningCard: true }
  },
  {
    path: '/suningCardSuccess',
    name: '申请成功', // 苏宁
    component: () => import('components/applyCard/suningCardSuccess.vue'),
    meta: { suningCard: true }
  },
  {
    path: '/useCard',
    name: '立即使用', // 苏宁
    component: () => import('components/applyCard/useCard.vue'),
    meta: { suning: true }
  },
  {
    path: '/activation',
    name: '绑定学霸卡',
    component: () => import('components/activation/activation.vue')
  },
  {
    path: '/activationTest', // 测试用
    name: '绑定学霸卡',
    component: () => import('components/activation/activationTest.vue')
  },
  {
    path: '/administer',
    name: '管理中心',
    component: () => import('components/administer/administer.vue')
  },
  {
    path: '/consumption',
    name: '用量信息',
    component: () => import('components/consumption/consumption.vue')
  },
  {
    path: '/orderCard',
    name: '我的记录',
    component: () => import('components/orderCard/orderCard.vue')
  },
  {
    path: '/monthbill',
    name: '月账单',
    component: () => import('components/orderCard/monthBill.vue')
  }, {
    path: '/monthbilldtl',
    name: '月详情',
    component: () => import('components/orderCard/monthBillDtl.vue')
  }, {
    path: '/flowday',
    name: '上网流量日详单',
    component: () => import('components/orderCard/flowDayOrder.vue')
  }, {
    path: '/seeOrder',
    name: '我的订单',
    component: () => import('components/orderCard/seeOrder.vue')
  }, {
    path: '/settingWhite',
    name: '设置呼出号码',
    component: () => import('components/setting/settingWhite.vue')
  }, {
    path: '/setting',
    name: '设置',
    component: () => import('components/setting/setting.vue')
  },
  {
    path: '/portraitEdit',
    name: '修改头像',
    component: () => import('components/setting/portraitEdit.vue')
  },
  {
    path: '/studentNameEdit',
    name: '修改姓名',
    component: () => import('components/setting/studentNameEdit.vue')
  }, {
    path: '/whiteEdit',
    name: '呼出白名单设置',
    component: () => import('components/setting/whiteEdit.vue')
  }, {
    path: '/rechargeList',
    name: '充值扣费',
    component: () => import('components/orderCard/rechargeList.vue')
  }, {
    path: '/cardOrderList',
    name: '卡订购&套餐变更',
    component: () => import('components/orderCard/cardOrderList.vue')
  },
  {
    path: '/refueling',
    name: '加油包',
    component: () => import('components/consumption/refueling.vue')
  },
  {
    path: '/commonAddress',
    name: '常用位置',
    component: () => import('components/administer/commonAddress.vue')
  },
  {
    path: '/locpicker',
    name: '地图选点',
    component: () => import('components/administer/locpicker.vue')
  },
  {
    path: '/trajectory',
    name: '历史轨迹', // 历史轨迹
    component: () => import('components/administer/trajectory.vue')
  },
  {
    path: '/position',
    name: '我的位置',
    component: () => import('components/administer/position.vue')
  },
  {
    path: '/applySuccess',
    name: '申请卡成功详情',
    component: () => import('components/applyCard/applySuccess.vue')
  },
  {
    path: '/RefuelingXq',
    name: '加油包详情',
    component: () => import('components/applyCard/RefuelingXq.vue')
  },
  {
    path: '/applyCardFail',
    name: '申请卡失败详情',
    component: () => import('components/applyCard/applyCardFail.vue')
  },
  {
    path: '/activateCard',
    name: '实名认证',
    component: () => import('components/activation/activateCard.vue')
  },
  {
    path: '/QKLogin',
    name: '出错啦',
    component: () => import('components/groupControl/groupLogin.vue'),
    meta: { groupControlLogin: true }
  },
  {
    path: '/QKModifyPwd',
    name: '修改密码',
    component: () => import('components/groupControl/modifyPwd.vue'),
    meta: { groupControlLogin: true }
  },
  {
    path: '/QKIndex',
    name: '群控',
    component: () => import('components/groupControl/groupIndex.vue'),
    meta: { groupControl: true },
    children: [
      {
        path: '/personnel',
        name: '人员管理',
        component: () => import('components/groupControl/personnel.vue'),
        meta: { groupControl: true }
      },
      {
        path: '/controlledGroup',
        name: '受控组管理',
        component: () => import('components/groupControl/controlledGroup.vue'),
        meta: { groupControl: true }
      },
      {
        path: '/controlledStrategy',
        name: '受控策略管理',
        component: () => import('components/groupControl/controlledStrategy.vue'),
        meta: { groupControl: true }
      }
    ]
  },
  {
    path: '/SKCLAdd',
    name: '设置受控策略管理',
    component: () => import('components/groupControl/SKCLAdd.vue'),
    meta: { groupControl: true }
  },
  {
    path: '/studentParent',
    name: '发起申请',
    component: () => import('components/groupControl/studentParent.vue'),
    meta: { groupControl: true }
  },
  {
    path: '/ParentalControl',
    name: '超级学霸卡',
    component: () => import('components/groupControl/ParentalControl.vue'),
    meta: { groupControl: true }
  },
  {
    path: '/SalerUnBind',
    name: '合伙人未绑定提示',
    component: () => import('components/saler/unBind.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerBind',
    name: '绑定合伙人',
    component: () => import('components/saler/bind.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerBindInfo',
    name: '绑定合伙人',
    component: () => import('components/saler/bindInfo.vue'),
    meta: { saler: true }
  },
  {
    path: '/ModifySalerBindInfo',
    name: '绑定合伙人',
    component: () => import('components/saler/modifyBindInfo.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerPay',
    name: '在线支付',
    component: () => import('components/saler/pay.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerPledge',
    name: '在线支付',
    component: () => import('components/saler/payPledge.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerPaySuccess',
    name: '在线支付成功',
    component: () => import('components/saler/paySuccess.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerPayFaild',
    name: '在线支付失败',
    component: () => import('components/saler/payFaild.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerSock',
    name: '我的库存',
    component: () => import('components/saler/salerSock.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerOrder',
    name: '我的订单',
    component: () => import('components/saler/salerOrder.vue'),
    meta: { saler: true }
  },
  {
    path: '/SalerOrderDetail',
    name: '订单详情',
    component: () => import('components/saler/orderDetail.vue'),
    meta: { saler: true }
  },
  {
    path: '/ZxBind',
    name: '5G至尊卡',
    component: () => import('components/zx/bind.vue'),
    meta: { zx: true }
  },
  {
    path: '/ZxCardInfo',
    name: '5G至尊卡',
    component: () => import('components/zx/cardInfo.vue'),
    meta: { zx: true }
  },
  {
    path: '/ZxCardInfoDetail',
    name: '5G至尊卡',
    component: () => import('components/zx/cardInfoDetail.vue'),
    meta: { zx: true }
  },
  {
    path: '/bigflowBind',
    name: '大流量卡绑定',
    component: () => import('components/bigflow/bind.vue'),
    meta: { bigflow: true }
  },
  {
    path: '/toCert',
    name: '联通实名认证',
    component: () => import('components/bigflow/toCert.vue'),
    meta: { bigflow: true }
  },
  {
    path: '/usageInfo',
    name: '卡信息',
    component: () => import('components/bigflow/usageInfo.vue'),
    meta: { bigflow: true }
  },
  {
    path: '/usageDetails',
    name: '用量明细',
    component: () => import('components/bigflow/usageDetails.vue'),
    meta: { bigflow: true }
  },
  {
    path: '/buyedRecords',
    name: '购买记录',
    component: () => import('components/bigflow/buyedRecords.vue'),
    meta: { bigflow: true }
  },
  {
    path: '/aliy/cards',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/cards.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/aliy/bind',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/bind.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/aliy/certct',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/certCt.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/aliy/cert',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/cert.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/aliy/cardDetail',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/cardDetail.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/aliy/buyPackage',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/buyPackage.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/aliy/cardPackageDetails',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/cardPackageDetails.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/notaliy',
    name: '灵趣智慧物联',
    component: () => import('components/aliybigflow/notAliPay.vue'),
    meta: { aliybigflow: true }
  },
  {
    path: '/zopCard/orderSubmit',
    name: '订单',
    component: () => import('components/zopCard/orderSubmit.vue'),
    meta: { zopCard: true }
  },
  {
    path: '/alert/bind',
    name: '告警用户绑定',
    component: () => import('components/alert/bind.vue'),
    meta: { alert: true }
  }
]

const router = new VueRouter({
  base: '/dist',
  // mode: 'history',
  routes
})

// 全局钩子函数,在跳转之前执行
router.beforeEach((to, from, next) => {
  console.log('1:' + JSON.stringify(to.meta))
  document.title = to.name
  if (to.meta.groupControlLogin) {
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      const token = localStorage.getItem('QKtokenWX')
      if (token === null || token === '' || token === undefined) {
        const code = getUrlKey('code')
        if (code === null || code === '') {
          const urlNow = encodeURIComponent(window.location.href)
          // 正式环境 超级学霸卡
          const appid = 'wx92971625eac3ce35'
          // 测试环境 蜀徽
          // const appid = 'wx7b2ff15843262832'
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = url
        } else {
          WxAPI.apiQKLoginToken(code).then(res => {
            localStorage.setItem('QKtokenWX', res.data.token)
            next()
          })
        }
      } else {
        next()
      }
    } else {
      console.log('sdsdsd')
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvTVdLbDFQQWp4WmRfakp3N3QwTDVjTmFNX19VIiwidHlwZSI6IjQifQ.b9ObQEzABSib2mvHEXSGC6yNjY142QYrtNRd2CANZaqZL6CGkqiquw-wdVTvKsPxumyMjmrIEv4wMcSFzTBaYw'
      if (token) {
        next()
      }
      localStorage.setItem('QKtokenWX', token)
    }
  } else if (to.meta.groupControl) {
    console.log('2')
    // 群控 登录之外的页面
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      console.log('3')
      const token = localStorage.getItem('QKtoken')
      const userName = localStorage.getItem('userName')
      if (token && userName) {
        next()
      } else {
        next('/QKLogin')
      }
    } else {
      console.log('3')
      console.log('sdsdsd')
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvUjdwUDFhRnAyZEU4dnhGSmYzanlMbmdVdkpBIiwidHlwZSI6IjMiLCJzY2hvb2xNYW5hZ2VySWQiOjEsInNjaG9vbElkIjoxLCJvcmdhbml6YXRpb25JZHMiOiIxIiwiY29udHJvbEdyb3VwSWRzIjoiNCw1In0.nr6a3_nvQETar7M_4tAaf0J52xFgUJgBvw9toamxh6tbzUR0I1g-8eNPGc-YRrYDsAUBSkq61jIBvHrSoJaowQ'
      const userName = '测试'
      localStorage.setItem('QKtoken', token)
      if (token && userName) {
        next()
      } else {
        next('/QKLogin')
      }
    }
  } else if (to.meta.saler) {
    console.log('22')
    console.log('process.env.VUE_APP_CURRENTMODE:' + process.env.VUE_APP_CURRENTMODE)
    // 群控 登录之外的页面
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
    // if (!process.env.VUE_APP_CURRENTMODE) {
      const token = sessionStorage.getItem('token')
      console.log('token:' + token)
      if (token === null || token === '' || token === undefined || token === 'null') {
        const code = getUrlKey('code')
        console.log('222code')
        // const code = '1111'
        if (code === null || code === '') {
          const urlNow = encodeURIComponent(window.location.href)
          const appid = 'wx7dc1d69cc672844c'
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = url
        } else {
          console.log('111apiSalerLogin：' + code)
          WxAPI.apiSalerLogin(code).then(res => {
            const loginInfo = res.data
            console.log(JSON.stringify(to))
            sessionStorage.setItem('token', loginInfo.token)
            if (!loginInfo.logined && to.path !== '/SalerUnBind' && to.path !== '/SalerBind') {
              next('/SalerUnBind')
            } else {
              next()
            }
          })
        }
      } else {
        next()
      }
    } else {
      console.log('32')
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvUjdwUDFhRnAyZEU4dnhGSmYzanlMbmdVdkpBIiwidHlwZSI6IjMiLCJzY2hvb2xNYW5hZ2VySWQiOjEsInNjaG9vbElkIjoxLCJvcmdhbml6YXRpb25JZHMiOiIxIiwiY29udHJvbEdyb3VwSWRzIjoiNCw1In0.nr6a3_nvQETar7M_4tAaf0J52xFgUJgBvw9toamxh6tbzUR0I1g-8eNPGc-YRrYDsAUBSkq61jIBvHrSoJaowQ'
      const userName = '测试'
      localStorage.setItem('QKtoken', token)
      if (token && userName) {
        next()
      } else {
        next('/QKLogin')
      }
    }
  } else if (to.meta.aliybigflow) {
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      if (isAlipayClient()) {
        const token = sessionStorage.getItem('token')
        if (token === null || token === '' || token === undefined || token === 'null') {
          const code = getUrlKey('auth_code')
          console.log('auth_code:' + code)
          if (code === null || code === '') {
            const urlNow = encodeURIComponent(window.location.href)
            const url = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002105630076&scope=auth_user&redirect_uri=' + urlNow
            window.location.href = url
          } else {
              console.log(code)
              const appId = getUrlKey('app_id')
              const params = code + ' ' + appId
              console.log('params:' + params)
              WxAPI.apiAliBigflowLogin(params).then(res => {
                const loginInfo = res.data
                console.log(JSON.stringify(to))
                sessionStorage.setItem('token', loginInfo.token)
                next()
              })
          }
        } else {
          next()
        }
      } else {
        next('/QKLogin')
      }
    } else {
      console.log('32')
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiIyMDg4MjIyOTM4MTMwNTE0IiwiYXBwSWQiOiIyMDIxMDAyMTA1NjMwMDc2IiwidHlwZSI6IjQifQ.kiV4sPXJMlCQ8XzMuFvjWDUIFmi6bZ0e2iuWYPdBICJAS9nbmpMrKcuYm_WiIanuOHUD7q0eOdwXCKiZkF-Dxg'
      // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiIyMDg4OTMyMzEzNjg4NDY1IiwiYXBwSWQiOiIyMDIxMDAyMTA1NjMwMDc2IiwidHlwZSI6IjQifQ.ty28G2Kj53ERdQW2pebwzEKr2JxOFmirPANxCq65RDgNIZ7WwtfpM7yhU1oRcsmZ0Mq7cL51XEwA8lev586rMA'
      const userName = '测试'
      sessionStorage.setItem('token', token)
      if (token && userName) {
        next()
      } else {
        next('/QKLogin')
      }
      // if (isAlipayClient()) {
      //   alert('isAlipay')
      //   console.log('32')
      //   const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiIyMDg4OTMyMzEzNjg4NDY1IiwiYXBwSWQiOiIyMDIxMDAyMTA1NjMwMDc2IiwidHlwZSI6IjQifQ.ty28G2Kj53ERdQW2pebwzEKr2JxOFmirPANxCq65RDgNIZ7WwtfpM7yhU1oRcsmZ0Mq7cL51XEwA8lev586rMA'
      //   const userName = '测试'
      //   sessionStorage.setItem('token', token)
      //   if (token && userName) {
      //     next()
      //   } else {
      //     next('/QKLogin')
      //   }
      // } else {
      //   console.log('not alipay')
      //   next('/QKLogin')
      // }
    }
  } else if (to.meta.zx) {
    console.log('22')
    console.log('process.env.VUE_APP_CURRENTMODE:' + process.env.VUE_APP_CURRENTMODE)
    // 群控 登录之外的页面
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      const token = sessionStorage.getItem('token')
    // if (!process.env.VUE_APP_CURRENTMODE) {
    //   const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvd21FODZXV3JCcWNzYkw3S3UxQUptc0p1Z0tJIiwidHlwZSI6IjQifQ.51XSrf6b3wCP8AsSjG1vTadJ73OlHEG_7oAEXL3U5s9nWECAjd6iUf5xlMFnzZXurbl19sA29vo6kNPNXuZeoQ'
    //   sessionStorage.setItem('token', token)
      console.log('token:' + token)
      if (token === null || token === '' || token === undefined || token === 'null') {
        const code = getUrlKey('code')
        console.log('222code')
        // const code = '1111'
        if (code === null || code === '') {
          const urlNow = encodeURIComponent(window.location.href)
          const appid = 'wxd28b159bd97976d0'
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = url
        } else {
          console.log('111apiZxLogin:' + code)
          console.log(code)
          WxAPI.apiZxLogin(code).then(res => {
            const loginInfo = res.data
            console.log(JSON.stringify(to))
            sessionStorage.setItem('token', loginInfo.token)
            next()
            // if (!loginInfo.logined && to.path !== '/SalerUnBind' && to.path !== '/SalerBind') {
            //   next('/SalerUnBind')
            // } else {
            //   next()
            // }
          })
        }
      } else {
        next()
      }
    } else {
      console.log('32')
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvd21FODZXV3JCcWNzYkw3S3UxQUptc0p1Z0tJIiwidHlwZSI6IjQifQ.51XSrf6b3wCP8AsSjG1vTadJ73OlHEG_7oAEXL3U5s9nWECAjd6iUf5xlMFnzZXurbl19sA29vo6kNPNXuZeoQ'
      // const userName = '测试'
      sessionStorage.setItem('token', token)
      next()
    }
  } else if (to.meta.bigflow) {
    console.log('22')
    console.log('process.env.VUE_APP_CURRENTMODE:' + process.env.VUE_APP_CURRENTMODE)
    // 群控 登录之外的页面
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      const token = sessionStorage.getItem('token')
    // if (!process.env.VUE_APP_CURRENTMODE) {
    //   const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvd21FODZXV3JCcWNzYkw3S3UxQUptc0p1Z0tJIiwidHlwZSI6IjQifQ.51XSrf6b3wCP8AsSjG1vTadJ73OlHEG_7oAEXL3U5s9nWECAjd6iUf5xlMFnzZXurbl19sA29vo6kNPNXuZeoQ'
    //   sessionStorage.setItem('token', token)
      console.log('token:' + token)
      if (token === null || token === '' || token === undefined || token === 'null') {
        const code = getUrlKey('code')
        console.log('222code')
        // const code = '1111'
        if (code === null || code === '') {
          const urlNow = encodeURIComponent(window.location.href)
          // const appid = 'wx7dc1d69cc672844c'
          const appid = getUrlKey('appId')
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = url
        } else {
          console.log('111apiZxLogin:' + code)
          console.log(code)
          const appId = getUrlKey('appId')
          const params = code + ' ' + appId
          WxAPI.apiBigflowLogin(params).then(res => {
            const loginInfo = res.data
            console.log(JSON.stringify(to))
            sessionStorage.setItem('token', loginInfo.token)
            next()
            // if (!loginInfo.logined && to.path !== '/SalerUnBind' && to.path !== '/SalerBind') {
            //   next('/SalerUnBind')
            // } else {
            //   next()
            // }
          })
        }
      } else {
        next()
      }
    } else {
      console.log('32')
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvejdJRzFxa2hpQlBkWGNma3J1SmxycTZyLU5ZIiwidHlwZSI6IjQifQ.i0pJIHY63utUpREQg3KRGFTOHzFHoL9HfatgHOISQjHuj7WvfuO6xaZDK5yB_Clvlj4Xxi1RUU6J-fpPQj2uPQ'
      const userName = '测试'
      sessionStorage.setItem('token', token)
      if (token && userName) {
        next()
      } else {
        next('/QKLogin')
      }
    }
  } else if (to.meta.suningCard) {
    next()
  } else if (to.meta.suning) {
    // 苏宁登录
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      const token = sessionStorage.getItem('token')
      if (token === null || token === '') {
        const code = getUrlKey('code')
        if (code === null || code === '') {
          const urlNow = encodeURIComponent(window.location.href)
          // 正式环境 超级学霸卡
          const appid = 'wx92971625eac3ce35'
          // 测试环境 蜀徽
          // const appid = 'wx7b2ff15843262832'
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = url
        } else {
          const channel = Number(getUrlKey('channelId'))
          if (channel === null || channel === '' || channel === 0) {
            sessionStorage.setItem('channelIdNew', 124)
            axios({
              method: 'GET',
              // 正式环境
              url: `wechat/v1.0/users/login?channelId=124&code=${code}`
              // 测试环境
              // url: `http://xbk.tdj.cn/ceshi/wechat/v1.0/users/login?channelId=1&code=${code}`
            }).then(res => {
              sessionStorage.setItem('token', res.data.token)
              next()
            })
          } else {
            sessionStorage.setItem('channelIdNew', channel)
            axios({
              method: 'GET',
              // 正式环境
              url: `wechat/v1.0/users/login?channelId=${channel}&code=${code}`
              // 测试环境
              // url: `http://xbk.tdj.cn/ceshi/wechat/v1.0/users/login?channelId=1&code=${code}`
            }).then(res => {
              sessionStorage.setItem('token', res.data.token)
              next()
            })
          }
        }
      } else {
        next()
      }
    } else {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvejdJRzFxa2hpQlBkWGNma3J1SmxycTZyLU5ZIiwidHlwZSI6IjQifQ.i0pJIHY63utUpREQg3KRGFTOHzFHoL9HfatgHOISQjHuj7WvfuO6xaZDK5yB_Clvlj4Xxi1RUU6J-fpPQj2uPQ'
      if (token) {
        next()
      }
      sessionStorage.setItem('token', token)
    }
  } else if (to.meta.alert) {
    console.log('22')
    console.log('process.env.VUE_APP_CURRENTMODE:' + process.env.VUE_APP_CURRENTMODE)
    // 群控 登录之外的页面
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      const token = sessionStorage.getItem('token')
    // if (!process.env.VUE_APP_CURRENTMODE) {
    //   const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvd21FODZXV3JCcWNzYkw3S3UxQUptc0p1Z0tJIiwidHlwZSI6IjQifQ.51XSrf6b3wCP8AsSjG1vTadJ73OlHEG_7oAEXL3U5s9nWECAjd6iUf5xlMFnzZXurbl19sA29vo6kNPNXuZeoQ'
    //   sessionStorage.setItem('token', token)
      console.log('token:' + token)
      if (token === null || token === '' || token === undefined || token === 'null') {
        const code = getUrlKey('code')
        console.log('222code')
        // const code = '1111'
        if (code === null || code === '') {
          const urlNow = encodeURIComponent(window.location.href)
          // const appid = 'wx7dc1d69cc672844c'
          const appid = getUrlKey('appId')
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = url
        } else {
          console.log('111apiZxLogin:' + code)
          console.log(code)
          const appId = getUrlKey('appId')
          const params = code + ' ' + appId
          WxAPI.apiBigflowLogin(params).then(res => {
            const loginInfo = res.data
            console.log(JSON.stringify(to))
            sessionStorage.setItem('token', loginInfo.token)
            next()
            // if (!loginInfo.logined && to.path !== '/SalerUnBind' && to.path !== '/SalerBind') {
            //   next('/SalerUnBind')
            // } else {
            //   next()
            // }
          })
        }
      } else {
        next()
      }
    } else {
      console.log('32')
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvejdJRzFxa2hpQlBkWGNma3J1SmxycTZyLU5ZIiwidHlwZSI6IjQifQ.i0pJIHY63utUpREQg3KRGFTOHzFHoL9HfatgHOISQjHuj7WvfuO6xaZDK5yB_Clvlj4Xxi1RUU6J-fpPQj2uPQ'
      const userName = '测试'
      sessionStorage.setItem('token', token)
      if (token && userName) {
        next()
      } else {
        next('/QKLogin')
      }
    }
  } else {
    // 家长登录
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      const token = sessionStorage.getItem('token')
      if (token === null || token === '') {
        const code = getUrlKey('code')
        if (code === null || code === '') {
          const urlNow = encodeURIComponent(window.location.href)
          // 正式环境
          const appid = 'wx92971625eac3ce35'
          // 测试环境
          // const appid = 'wx7b2ff15843262832'
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = url
        } else {
          axios({
            method: 'GET',
            // 正式环境
            url: `http://xbk.xuebaka.cn/wechat/v1.0/users/login?code=${code}`
            // 测试环境
            // url: `http://xbk.tdj.cn/ceshi/wechat/v1.0/users/login?channelId=1&code=${code}`
          }).then(res => {
            sessionStorage.setItem('token', res.data.token)
            next()
          })
        }
      } else {
        next()
      }
    } else {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvejdJRzFxa2hpQlBkWGNma3J1SmxycTZyLU5ZIiwidHlwZSI6IjQifQ.i0pJIHY63utUpREQg3KRGFTOHzFHoL9HfatgHOISQjHuj7WvfuO6xaZDK5yB_Clvlj4Xxi1RUU6J-fpPQj2uPQ'
      console.log('***token:' + token)
      if (token) {
        next()
      }
      sessionStorage.setItem('token', token)
    }
  }
})

export default router
function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null
}
function isAlipayClient () {
  if (navigator.userAgent.indexOf('AlipayClient') > -1) {
    return true
  }
  return false
}
