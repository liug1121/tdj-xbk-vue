import * as API from './'

export default {
  // 获取卡列表数据
  apiCardList: params => {
    return API.GET('wechat/v1.0/users/cards', params)
  },
  // 修改学生姓名
  apiStudentName: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/modify', params, config)
  },
  // 修改头像
  apiUploadIcon: params => {
    return API.POST('wechat/v1.0/users/icon/upload', params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // 获取白名单列表
  apiWhiteList: params => {
    return API.POST('wechat/v1.0/users/white', params)
  },
  // 新增白名单
  apiAddWhite: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/white/add', params, config)
  },
  // 删除白名单
  apiDelWhite: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/users/white/delete', params, config)
  },
  // 解绑
  apiCardsUnbind: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/cards/unbind', params, config)
  }
}
