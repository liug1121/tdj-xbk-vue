import * as API from './'

export default {
  // 获取卡列表
  apiCardList: params => {
    return API.GET('wechat/v1.0/users/cards', params)
  },
  // 获取卡状态信息
  apiCardInfo: orderNoUrl => {
    const orderNo = orderNoUrl
    return API.GET(`wechat/v1.0/users/cards/status/${orderNo}`, orderNoUrl)
  },
  // 获取详情数据
  apiOrdersDetails: orderNoUrl => {
    const cardNo = orderNoUrl
    return API.GET(`wechat/v1.0/users/usageinfos/${cardNo}`, orderNoUrl)
  },
  // 修改语音状态
  editVoiceCardStatus: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/cards/status/modify', params, config)
  },
  // 获取地址列表
  apiAddressList: orderNoUrl => {
    const cardNo = orderNoUrl
    return API.GET(`wechat/v1.0/users/address/${cardNo}`, orderNoUrl)
  },
  // 新增地址--地图选点页面
  apiAddAddress: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/address/add', params, config)
  },
  // 编辑地址--地图选点页面
  apiEditAddress: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/address/modify', params, config)
  },
  // 切换离家、到家 switch
  apiIsSwitch: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/address/modify', params, config)
  },
  // 修改备注确认
  apiRessTitle: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/address/modify', params, config)
  },
  // 删除地址
  apiDeleteAddress: params => {
    const addressId = params
    return API.POST(`wechat/v1.0/users/address/delete?addressId=${addressId}`, params)
  },
  // 获取当前位置
  apiCurrAddr: orderNoUrl => {
    const cardNo = orderNoUrl
    return API.GET(`wechat/v1.0/users/address/current/${cardNo}`, orderNoUrl)
  },
  // 历史轨迹
  // apiTrajectory: params => {
  //   return API.POST('wechat/v1.0/users/address/travels', params)
  // }
  // 修改学生群控状态
  apiStudentControltype: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/student/controltype/change', params)
  }
}
