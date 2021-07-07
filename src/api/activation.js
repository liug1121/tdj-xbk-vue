import * as API from './'

export default {
  // 提交绑定
  apiAddaActivation: params => {
    const config = {
      needFormData: true
    }
    return API.POST('wechat/v1.0/cards/bind', params, config)
  },
  // 上传头像
  apiUploadIcon: params => {
    return API.POST('wechat/v1.0/users/icon/upload', params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // 微信签名授权
  apiSigin: params => {
    return API.POST('wechat/v1.0/sigin', params)
  }
}
