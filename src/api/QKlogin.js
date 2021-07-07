import * as API from './indexQkWX'
export default {
  // 登录
  apiGroupcontrolLogin: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/user/login', params)
  },
  // 短信验证
  apiSmsmsgVerifycode: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/smsmsg/verifycode/send', params)
  },
  // 修改密码
  apiGroupcontrolpwdModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/user/pwd/modify', params)
  },
  // 同意学生群控
  apiStudentControltypeModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/student/controltype/modify', params)
  }
}
