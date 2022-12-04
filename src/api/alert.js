import * as API from './'
export default {
  apiBind: params => {
    return API.POST('wechat/v1.0/alert/bind', params)
  }
}
