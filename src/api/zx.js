import * as API from './'
export default {
  apiZxCardBind: params => {
    return API.POST('zxcard/v1.0/zxcard/bind', params)
  },
  apiGetCardsInfo: params => {
    return API.POST('zxcard/v1.0/zxcard/infos', params)
  },
  apiGetBuyPackages: params => {
    return API.POST('zxcard/v1.0/zxcard/buy/packages', params)
  },
  apiPackageBuyed: params => {
    return API.POST('zxcard/v1.0/zxcard/buyed', params)
  }
}
