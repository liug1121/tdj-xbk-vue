import * as API from './'
export default {
  apiBindCard: params => {
    return API.POST('aliy/boss/v1.0/aliy/card/bind', params)
  },
  apiGetBuyRecords: params => {
    return API.GET('aliy/boss/v1.0/aliy/card/buy/products', params)
  },
  apiGetCards: params => {
    return API.GET('aliy/boss/v1.0/aliy/user/cards', params)
  },
  apiUnBindCard: params => {
    return API.POST('aliy/boss/v1.0/aliy/card/unbind', params)
  },
  apiGetCardDetail: params => {
    return API.POST('aliy/boss/v1.0/aliy/card/info', params)
  },
  apiGetPackages: params => {
    return API.POST('aliy/boss/v1.0/aliy/card/buy/packages', params)
  },
  apiGetAddedPackages: params => {
    return API.POST('aliy/boss/v1.0/aliy/card/buy/addpackages', params)
  },
  apiBind: params => {
    return API.POST('aliy/boss/v1.0/aliy/card/bind', params)
  },
  apiOrderOrderId: params => {
    return API.GET('wechat/v1.0/orders/orderid', params)
  },
  apiBuyed: params => {
    return API.POST('aliy/boss/v1.0/buy', params)
  }
}
