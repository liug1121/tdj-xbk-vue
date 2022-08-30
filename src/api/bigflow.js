import * as API from './'
export default {
  apiBindCard: params => {
    return API.POST('bigflow/boss/v1.0/wechat/card/bind', params)
  }
}