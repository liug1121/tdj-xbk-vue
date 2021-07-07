import * as API from './'

export default {
  // 获取订单列表
  apiOrderList: params => {
    return API.GET('wechat/v1.0/users/myorders', params)
  },
  // 获取订单详情
  apiOrderXQ: params => {
    const orderUUID = params
    return API.GET(`/wechat/v1.0/orders/${orderUUID}`, params)
  },
  // 修改订单状态为已成功
  apiOrdersPayedStatus: params => {
    return API.POST('wechat/v1.0/orders/payed', params)
  },
  // 微信支付授权接口
  apiWXprepay: params => {
    return API.POST('wechat/v1.0/pay/wxprepay', params)
  },
  // 生成订单id
  apiOrderOrderId: params => {
    return API.GET('wechat/v1.0/orders/orderid', params)
  }
}
