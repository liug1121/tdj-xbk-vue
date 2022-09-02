import * as API from './'
export default {
  // 登录
  apiWXLogin: params => {
    return API.GET('wechat/v1.0/users/loginredirect?channelId=1', params)
  },
  // 获取 token
  apiWXLoginToken: params => {
    const code = params
    return API.GET(`wechat/v1.0/users/login?channelId=1&code=${code}`, params)
  },
  // 群控获取 token
  apiQKLoginToken: params => {
    const code = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/user/anonymouslogin/${code}`, params)
  },
  // 微信签名授权
  apiSigin: params => {
    return API.POST('wechat/v1.0/sigin', params)
  },
  apiSalerLogin: params => {
    const code = params
    console.log('apiSalerLogin')
    return API.GET(`saler/v1.0/users/login/${code}`, params)
  },
  apiZxLogin: params => {
    const code = params
    console.log('apiZxLogin')
    return API.GET(`zxcard/v1.0/users/login/${code}`, params)
  },
  apiBigflowLogin: params => {
    const code = params
    console.log('apiBigflowLogin')
    return API.GET(`bigflow/boss/v1.0/users/login/${code}`, params)
  }
}
