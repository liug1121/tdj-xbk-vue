// import * as API from './'
import * as API from './indexQk'
export default {
  // 获取群控组信息
  apiGroupcontrolControlgroups: params => {
    return API.GET('groupControl/v1.0/groupcontrol/wechart/controlgroups', params)
  },
  // 新增群控组
  apiGroupcontrolControlgroupsAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/controlgroups/add', params)
  },
  // 删除群控组
  apiWXGroupcontrolControlgroupsDel: params => {
    const groupId = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/controlgroups/delete/${groupId}`, params)
  },
  // 新增群控组策略
  apiControlgroupsStragegyAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/controlgroups/stragegy/add', params)
  },
  // 删除群控组策略
  apiControlgroupsStragegyDel: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/controlgroups/stragegy/delete', params)
  },
  // 修改学生受控状态
  apiControlgroupsStudentStatusModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/controlgroups/student/status/modify', params)
  },
  // 查询群控组中的学生信息
  apiControlgroupsStudent: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/controlgroups/students', params)
  },
  // 获取策略配置信息
  apiControlgroupsStragegys: params => {
    return API.GET('groupControl/v1.0/groupcontrol/wechart/stragegys', params)
  },
  // 新增策略
  apiStragegysAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/stragegys/add', params)
  },
  // 删除策略
  apiStragegysDel: params => {
    const stragegyId = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/stragegys/delete/${stragegyId}`, params)
  },
  // 新增策略明细
  apiStragegysDetailAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/stragegys/detail/add', params)
  },
  // 删除策略明细
  apiStragegysDetailDel: params => {
    const detailId = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/stragegys/detail/delete/${detailId}`, params)
  },
  // 修改策略
  apiStragegysModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/stragegys/modify', params)
  },
  // 修改策略明细
  apiStragegysDetailModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/stragegys/detail/modify', params)
  },
  // 查询学生
  apiStudentSearch: params => {
    const searchInfo = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/student/${searchInfo}`, params)
  },
  // 新增学生
  apiStudentAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/student/add', params)
  },
  // 发送群控申请
  apiStudentControlapply: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/student/controlapply', params)
  },
  // 根据手机号码获取学生群控信息
  apiStudentControltype: params => {
    const phone = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/student/controltype/${phone}`, params)
  },
  // 同意学生群控
  apiStudentControltypeModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/student/controltype/modify', params)
  },
  // 删除学生
  apiStudentDel: params => {
    return API.POST('groupControl/v1.0/groupcontrol/wechart/student/delete', params)
  },
  // 获取组织信息
  apiStudentOrganizations: params => {
    return API.GET('groupControl/v1.0/groupcontrol/wechart/student/organizations', params)
  },
  // 获取组织下学生信息
  apiStudentOrganizationsStudent: params => {
    const organizationId = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/student/organizations/${organizationId}`, params)
  },
  // 获取用户当前的策略状态
  apiStudentStragegys: params => {
    const studentId = params
    return API.GET(`groupControl/v1.0/groupcontrol/wechart/student/stragegys/${studentId}`, params)
  }
}
