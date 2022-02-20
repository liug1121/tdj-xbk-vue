import * as API from './'
export default {
  apiBindSaler: params => {
    return API.POST('saler/v1.0/user/bind', params)
  },
  apiGetBindSalerInfo: params => {
    return API.GET('saler/v1.0/user/info', params)
  },
  apiGetSalerStocks: params => {
    return API.GET('saler/v1.0/stocks', params)
  },
  apiGetOrderDetail: params => {
    return API.POST('saler/v1.0/order/detail', params)
  },
  apiOrderPayed: params => {
    return API.POST('saler/v1.0/pay/payed', params)
  },
  apiGetOrders: params => {
    return API.GET('saler/v1.0/orders', params)
  }
}
