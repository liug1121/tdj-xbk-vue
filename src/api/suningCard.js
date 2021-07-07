// import * as API from './index'
import * as APISN from './indexSN'

export default {
  // 短信验证码
  apiRegisterSendvercode: params => {
    return APISN.POST('regiestercard/v1.0/register/sendvercode', params)
  },
  // 大流量订单
  apiRegister: params => {
    return APISN.POST('regiestercard/v1.0/register', params)
  },
  // 获取省
  apiSNProvincesList: params => {
    return APISN.GET('regiestercard/v1.0/pois/provinces', params)
  },
  // 获取市
  apiSNCitiesList: params => {
    const provinceId = params
    return APISN.GET(`regiestercard/v1.0/pois/cities/${provinceId}`, params)
  }
}
