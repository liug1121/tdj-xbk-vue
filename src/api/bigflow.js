import * as API from './'
export default {
  apiBindCard: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/bind', params)
  },
  apiGetBuyRecords: params => {
    return API.GET('bigflow/boss/v1.0/wechat/card/buy/products', params)
  },
  apiGetCards: params => {
    return API.GET('bigflow/boss/v1.0/wechat/user/cards', params)
  },
  apiUnBindCard: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/unbind', params)
  },
  apiGetCardDetail: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/info', params)
  },
  apiGetPackages: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/buy/packages', params)
  },
  apiGetAddedPackages: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/buy/addpackages', params)
  },
  apiBind: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/bind', params)
  },
  apiWxSign: params => {
    return API.POST('bigflow/boss/v1.0/sigin', params)
  },
  apiOrderOrderId: params => {
    return API.GET('wechat/v1.0/orders/orderid', params)
  },
  apiCreateOrderId: params => {
    return API.POST('wechat/v1.0/orders/orderid/create', params)
  },
  apiWXprepay: params => {
    return API.POST('bigflow/boss/v1.0/pay/wxprepay', params)
  },
  apiBuyed: params => {
    return API.POST('bigflow/boss/v1.0/buy', params)
  }
}
