import * as API from './'

export default {
  // 获取卡列表数据
  apiCardList: params => {
    return API.GET('wechat/v1.0/users/cards', params)
  },
  // 获取详情数据
  apiOrdersDetails: orderNoUrl => {
    const cardNo = orderNoUrl
    return API.GET(`wechat/v1.0/users/usageinfos/${cardNo}`, orderNoUrl)
  },
  // 获取-用量查询-明细
  apiUsageinfosDetails: orderNoUrl => {
    const cardNo = orderNoUrl
    return API.GET(`wechat/v1.0/users/usageinfos/details/${cardNo}`, orderNoUrl)
  },
  // 获取套餐
  apiPackageList: params => {
    return API.GET('wechat/v1.0/packages/card', params)
  },
  // 获取充值金额
  apiPriceList: params => {
    return API.GET('wechat/v1.0/pay/priceLabels/card', params)
  },
  // 发送短信
  apiSmsAdd: params => {
    return API.POST('wechat/v1.0/sms/verifycode', params)
  },
  // 更换套餐
  apiEditPackage: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/packages/change', params, config)
  },
  // 点击充值
  apipayPrice: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/payrecords/add', params, config)
  },
  // 获取加油包列表
  apiPackList: params => {
    return API.GET('wechat/v1.0/packages/addedpackages', params)
  },
  // 提交加油包
  apiRefuelingAdd: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/orders/addpackages/add', params, config)
  },
  // 取消当前套餐
  apiPackagesCancel: params => {
    return API.POST('wechat/v1.0/packages/cancel', params)
  }
}
