import * as API from './'
export default {
  apiBindCard: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/bind', params)
  },
  apiGetBuyRecords: params => {
    return API.GET('bigflow/boss/v1.0/wechat/card/buy/products', params)
  }
}
