import * as API from './'

export default {
  // 获取省
  apiProvincesList: params => {
    return API.GET('wechat/v1.0/pois/provinces', params)
  },
  // 获取市
  apiCitiesList: params => {
    const provinceId = params
    return API.GET(`wechat/v1.0/pois/cities/${provinceId}`, params)
  },
  // 获取县/区
  apiDistrictsList: params => {
    const districtId = params
    return API.GET(`wechat/v1.0/pois/districts/${districtId}`, params)
  },
  // 获取归属地
  apiProvinces: params => {
    return API.GET('wechat/v1.0/packages/provinces', params)
  },
  // 获取套餐
  apiPackageList: params => {
    return API.GET('wechat/v1.0/packages', params)
  },
  // 获取充值金额
  apiPriceList: params => {
    return API.GET('wechat/v1.0/pay/priceLabels', params)
  },
  // 提交订单
  apiAddPackage: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/orders/add', params, config)
  },
  apiWXprepay: params => {
    return API.POST('wechat/v1.0/pay/wxprepay', params)
  },
  // 修改订单状态为已成功
  apiOrdersPayedStatus: params => {
    return API.POST('wechat/v1.0/orders/payed', params)
  },
  // 修改订单状态 支付失败
  apiOrdersPayedfaildStatus: params => {
    return API.POST('wechat/v1.0/orders/payedfaild', params)
  },
  // 生成订单id
  apiOrderOrderId: params => {
    return API.GET('wechat/v1.0/orders/orderid', params)
  },
  // 生成预订单 --- 苏宁99学霸卡
  apiOrderPreorderCreate: params => {
    return API.POST('wechat/v1.0/order/preorder/create', params)
  },
  apiAddaActivation: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/cards/bind', params, config)
  },
  // 获取渠道套餐
  apiChannelPackageList: params => {
    return API.POST('wechat/v1.0/channel/packages', params)
  },
  // 微信签名授权
  apiSigin: params => {
    return API.POST('wechat/v1.0/sigin', params)
  },
  // 公众号-根据卡iccid查询归属地
  apiCardsProvince: params => {
    return API.POST('wechat/v1.0/cards/province', params)
  }
}
