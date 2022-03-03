import * as API from './'
export default {
  apiZxCardBind: params => {
    return API.POST('zxcard/v1.0/zxcard/bind', params)
  },
  apiGetCardsInfo: params => {
    return API.POST('zxcard/v1.0/zxcard/infos', params)
  }
}
