import * as API from './'
export default {
  apiZxCardBind: params => {
    return API.POST('zxcard/v1.0/zxcard/bind', params)
  },
  apiZxCardUnBind: params => {
    return API.POST('zxcard/v1.0/zxcard/unbind', params)
  },
  apiGetCardsInfo: params => {
    return API.POST('zxcard/v1.0/zxcard/infos', params)
  },
  apiGetBuyPackages: params => {
    return API.POST('zxcard/v1.0/zxcard/buy/packages', params)
  },
  apiPackageBuyed: params => {
    return API.POST('zxcard/v1.0/zxcard/buyed', params)
  },
  apiSigin: params => {
    return API.POST('zxcard/v1.0/sigin', params)
  },
  apiWXprepay: params => {
    return API.POST('zxcard/v1.0/pay/wxprepay', params)
  },
  apiOrderOrderId: params => {
    return API.GET('wechat/v1.0/orders/orderid', params)
  },
  apiGetBuyedRecords: params => {
    return API.POST('zxcard/v1.0/zxcard/buyed/records', params)
  }
}
