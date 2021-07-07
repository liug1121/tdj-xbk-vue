<template>
  <!-- 受控组管理 -->
  <div class="QKbg">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="QKHarderTitle">{{OrganizationsInfoClass.name}} - {{OrganizationsInfo.name}}<div class="switchAccount" @click="switchAccountButton">退出</div>
    </div>
    <div class="FunctionBoxItem" v-for="item in ManageStrategysList" :key="item.id">
      <!-- 设置策略 -->
      <div class="stragegysBox">
        <div>策略：</div>
        <div class="stragegyName">
          <div v-for="stragegysItem in item.stragegys" :key="stragegysItem.id" v-show="stragegysItem.id !== null">
            <span class="stragegysItem">{{stragegysItem.name}}</span>
          </div>
        </div>
        <div class="stragegyButton" v-if="item.stragegys.length === 0" @click="stragegysAddShow(item.id)">设置策略</div>
        <div class="stragegyButton" v-else @click="stragegysModityShow(item.id,item.stragegys)">编辑</div>
      </div>

      <div class="collapseBox">
        <van-collapse v-model="activeNames" @change="onChangeId(item.id)">
          <van-collapse-item :name="item.id">
            <div slot="title" class="stragegyHeard">
              <span style="flex:1;display:flex;"><span class="stragegyHeardName">{{item.name}}</span><span style="color:#aaa">（{{item.code}}）</span></span>

              <span class="stragegyDel" @click.stop="ControlgroupsDel(item.id)">删除</span>
            </div>
            <div class="SKZList" v-for="itemStudent in StudentStatusYes" :key="itemStudent.id" v-show="itemStudent.status === true">
              <div class="SKZListItem">{{itemStudent.name}}</div>
              <div class="SKZListItem">{{itemStudent.phone}}</div>
              <img class="SKZListItemIcon" :src="switchOpenIcon" v-if="itemStudent.status === true" @click="StudentStatusModify(itemStudent.id,0)">
              <div class="SKZListItemStutasName">已受控</div>
            </div>
            <div class="SKZList" v-for="itemStudent in StudentStatusNo" :key="itemStudent.id" v-show="StudentStatusNo.length<5">
              <div class="SKZListItem">{{itemStudent.name}}</div>
              <div class="SKZListItem">{{itemStudent.phone}}</div>
              <img class="SKZListItemIcon" :src="switchCloseIcon" v-if="itemStudent.status === false" @click="StudentStatusModify(itemStudent.id,1)">
              <div class="SKZListItemStutasName">未受控</div>
            </div>
            <van-collapse v-model="activeStudent" accordion v-if="StudentStatusNo.length>5">
              <van-collapse-item title="未受控" name="stragegysFalse">
                <div class="SKZList" v-for="itemStudent in StudentStatusNo" :key="itemStudent.id" v-show="StudentStatusNo.length>5">
                  <div class="SKZListItem">{{itemStudent.name}}</div>
                  <div class="SKZListItem">{{itemStudent.phone}}</div>
                  <div class="SKZListItem">
                  </div>
                  <img class="SKZListItemIcon" :src="switchCloseIcon" v-if="itemStudent.status === false" @click="StudentStatusModify(itemStudent.id,1)">
                  <div class="SKZListItemStutasName">未受控</div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div v-for="itemDetail in item.stragegys.slice(0,1)" :key="itemDetail.id">
        <div v-for="itemStragegysDetail in itemDetail.details" :key="'A' +itemStragegysDetail.id">
          <div class="currentState" v-if="itemStragegysDetail.current === true">当前状态</div>
          <div class="FunctionBox" v-if="itemStragegysDetail.current === true">
            <function-item v-if="itemStragegysDetail.card_voice_statue === true" :functionImg="telLogo" :functionTitle="voiceTitle" :functionSwitch="itemStragegysDetail.card_voice_statue" :functionExplain="voiceExplain"
              @closepop="closepop" :noEdit="noEdit">
            </function-item>
            <function-item v-else :functionImg="telLogo" :functionTitle="voiceTitle" :functionSwitch="itemStragegysDetail.card_voice_statue" :functionExplain="NOvoiceExplain" @closepop="closepop" :noEdit="noEdit">
            </function-item>
            <function-item v-if="itemStragegysDetail.card_sms_statue === true" :functionImg="smsIcon" :functionTitle="smsTitle" :functionSwitch="itemStragegysDetail.card_sms_statue" :functionExplain="smsExplain"
              @closepop="closepop" :noEdit="noEdit"></function-item>
            <function-item v-else :functionImg="smsIcon" :functionTitle="smsTitle" :functionSwitch="itemStragegysDetail.card_sms_statue" :functionExplain="NOsmsExplain" @closepop="closepop" :noEdit="noEdit">
            </function-item>
            <function-item v-if="itemStragegysDetail.card_data_statue === true" :functionImg="networkIcon" :functionTitle="networkTitle" :functionSwitch="itemStragegysDetail.card_data_statue"
              :functionExplain="networkExplain" @closepop="closepop" :noEdit="noEdit"></function-item>
            <function-item v-else :functionImg="networkIcon" :functionTitle="networkTitle" :functionSwitch="itemStragegysDetail.card_data_statue" :functionExplain="NOnetworkExplain" @closepop="closepop" :noEdit="noEdit">
            </function-item>
          </div>
        </div>
        <div v-show="itemDetail.details.length ===0">
          <div>
            <div class="currentState">暂无状态</div>
            <div class="FunctionBox">
              <div class="FunctionItem">
                <div class="functionItemHeader">
                  <img class="functionImg" :src="telLogo" alt="">
                  <div class="functionTitle">{{voiceTitle}}</div>
                </div>
                <div class="functionSwitch">
                  <van-switch v-model="voiceSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" disabled />
                </div>
                <div class="functionExplain" v-if="voiceSwitch === true">{{voiceExplain}}</div>
                <div class="functionExplain" v-else>{{NOvoiceExplain}}</div>
              </div>
              <div class="FunctionItem">
                <div class="functionItemHeader">
                  <img class="functionImg" :src="smsIcon" alt="">
                  <div class="functionTitle">{{smsTitle}}</div>
                </div>
                <div class="functionSwitch">
                  <van-switch v-model="smsSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" disabled />
                </div>
                <div class="functionExplain" v-if="smsSwitch === true">{{smsExplain}}</div>
                <div class="functionExplain" v-else>{{NOsmsExplain}}</div>
              </div>
              <div class="FunctionItem">
                <div class="functionItemHeader">
                  <img class="functionImg" :src="networkIcon" alt="">
                  <div class="functionTitle">{{networkTitle}}</div>
                </div>
                <div class="functionSwitch">
                  <van-switch v-model="networkSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" disabled />
                </div>
                <div class="functionExplain" v-if="networkSwitch === true">{{networkExplain}}</div>
                <div class="functionExplain" v-else>{{NOnetworkExplain}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="plusBox" style="padding-bottom:60px">
      <van-icon class="strategyIcon" name="plus" size="40px" color="#ffb525" @click="plusSKZ" />
      <div class="plusExplain">亲爱的 XXX 老师，请添加受控组</div>
    </div>

    <!-- 新增受控组 -->
    <el-dialog title="新增受控组" :visible.sync="addSKZDialog" width="90%" top="50%" :before-close="handleClose">
      <el-form ref="groupControlRef" :model="groupControlForm" :rules="groupControlRules" label-width="95px">
        <el-form-item label="所属组织" prop="organizationId">
          <el-select v-model="groupControlForm.organizationId" filterable placeholder="请选择受控组所属组织">
            <!-- <el-option v-for="item in organizationOptions" :key="item.id" :label="item.name>item.children" :value="item.id">
            </el-option> -->
            <el-option v-for="item in organizationOptions" :key="item.id" :label="item.name" :value="item.id">
              <span>{{ item.name }}</span>
            </el-option>
          </el-select>
          <!--select tree -->
          <!-- <SelectTree :props="props" :options="organizationOptions" :value="groupControlForm.organizationId" :clearable="isClearable" :accordion="isAccordion" @getValue="getValue($event)" height="200" style="width:100%">
          </SelectTree> -->
        </el-form-item>
        <el-form-item label="受控组名称" prop="name">
          <el-input v-model="groupControlForm.name" maxlength="12" placeholder="请输入受控组名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSKZDialog = false">取 消</el-button>
        <el-button @click="SKZAdd" type="goon">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置策略 -->
    <el-dialog title="受控组策略设置" :visible.sync="addstragegysDialog" width="90%" :before-close="handleClose">
      <el-form ref="form" :model="stragegyForm" label-width="60px">
        <el-form-item label="策略">
          <el-select style="width:100%" v-model="stragegyForm.stragegyIds" multiple placeholder="请选择策略">
            <el-option v-for="item in StragegysListOption" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addstragegysDialog = false">取 消</el-button>
        <el-button @click="stragegysAdd" type="goon">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import VHeader from './../header'
import telLogo from 'common/images/voiceIcon.png'
import smsIcon from 'common/images/smsIcon.png'
import networkIcon from 'common/images/networkIcon.png'
import switchOpenIcon from 'common/images/switch_open.png'
import switchCloseIcon from 'common/images/switch_close.png'
import FunctionItem from './base/functionItem'
// import SelectTree from './base/treeSelect'
// import selectInput from './base/selectMultiple'
import API from 'api/groupcontrol'
export default {
  data () {
    return {
      // headerName: '受控组管理',
      ManageStrategysList: [],
      ManageStrategys: [],
      switchTrue: true,
      switchFalse: false,
      addSKZDialog: false,
      switchOpenIcon: switchOpenIcon,
      switchCloseIcon: switchCloseIcon,
      activeStudent: '',
      name: null,
      stragegyIds: null,
      activeNames: [],
      telLogo: telLogo,
      smsIcon: smsIcon,
      networkIcon: networkIcon,
      voiceTitle: '语音通话',
      smsTitle: '短信业务',
      networkTitle: '网络服务',
      voiceSwitch: false,
      smsSwitch: false,
      networkSwitch: false,
      voiceExplain: '允许语音通话',
      smsExplain: '允许收发短信',
      networkExplain: '允许上网',
      NOvoiceExplain: '禁止语音通话',
      NOsmsExplain: '禁止收发短信',
      NOnetworkExplain: '禁止上网',
      noEdit: true,
      XSswitch: false,
      groupControlForm: {
        name: null,
        organizationId: null
      },
      ControlgroupsStudentList: [],
      StudentStatusNo: [],
      StudentStatusYes: [],
      groupId: null,
      addstragegysDialog: false,
      stragegyForm: {
        stragegyIds: [],
        stragegyIdsOld: []
      },
      StragegysListOption: [],
      OrganizationsInfo: {},
      OrganizationsInfoClass: {},
      OrganizationsId: null,
      organizationOptions: [],
      userName: null,
      groupControlRules: {
        organizationId: [
          { required: true, message: '请选择组织', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入受控组名称', trigger: 'blur' }
        ]
      },
      props: {
        // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children'
        // disabled:true
      },
      isClearable: true, // 可清空（可选）
      isAccordion: true // 可收起（可选）
    }
  },
  components: {
    // VHeader,
    FunctionItem
    // SelectTree
    // selectInput
  },
  created () {
    this.getGroupcontrolControlgroups()
    this.getControlgroupsStragegys()
    this.getStudentOrganizations()
    this.userName = localStorage.getItem('userName')
  },
  methods: {
    // 下拉多选传值展示
    // changeStragegysList (msg) {
    //   this.stragegyForm.stragegyIds = msg
    // },
    // 取值
    getValue (value) {
      this.groupControlForm.organizationId = value
    },
    // 获取组织架构
    getStudentOrganizations () {
      API.apiStudentOrganizations().then(res => {
        if (res.resultCode === 0) {
          this.OrganizationsList = res.data
          const jsonData = JSON.parse(JSON.stringify(this.OrganizationsList))
          var result = []; var temp = {}; var i = 0; var j = 0; var len = jsonData.length
          for (; i < len; i++) {
            temp[jsonData[i].id] = jsonData[i] // 以id作为索引存储元素，可以无需遍历直接定位元素
          }
          for (; j < len; j++) {
            var currentElement = jsonData[j]
            var tempCurrentElementParent = temp[currentElement.parentId] // 临时变量里面的当前元素的父元素 parentId 父级ID
            if (tempCurrentElementParent) { // 如果存在父元素
              if (!tempCurrentElementParent.children) { // 如果父元素没有chindren键
                tempCurrentElementParent.children = [] // 设上父元素的children键
              }
              tempCurrentElementParent.children.push(currentElement) // 给父元素加上当前元素作为子元素
            } else { // 不存在父元素，意味着当前元素是一级元素
              result.push(currentElement)
            }
          }
          this.OrganizationsInfo = result[0]
          this.OrganizationsInfoClass = this.OrganizationsInfo.children[0]
          this.OrganizationsId = this.OrganizationsInfoClass.id
          // this.organizationOptions = result
          this.organizationOptions = res.data.filter(item => {
            return item.managed === true
          }).map(item => {
            return item
          })
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // filterTree (tree, arr = []) {
    //   if (!tree.length) return []
    //   for (const item of tree) {
    //     // 循环数组，然后过滤数据
    //     // 如果该条数据type不为0时，跳出本次循环
    //     if (item.managed !== true) continue
    //     // 如果满足条件时，用新node代替，然后把chilren清空
    //     const node = { ...item, children: [] }
    //     // 然后添加到新数组中
    //     arr.push(node)
    //     // 如果有子节点，调用递归函数，并把空数组传给下一个函数
    //     // 利用引用数据类型的特性，实现浅拷贝
    //     // 递归函数过滤时会改变这个空数组数据，从而实现层级结构过滤
    //     if (item.children && item.children.length) {
    //       this.filterTree(item.children, node.children)
    //     }
    //   }
    //   return arr
    // },
    // 获取群控组信息
    getGroupcontrolControlgroups () {
      API.apiGroupcontrolControlgroups().then(res => {
        if (res.resultCode === 0) {
          const ManageStrategysList = res.data
          for (let i = 0; i < ManageStrategysList.length; i++) {
            const element = ManageStrategysList[i].stragegys
            for (let j = 0; j < element.length; j++) {
              const detail = element[j].details
              var detailsNew = detail.filter((item) => {
                if (item.current) {
                  return item
                }
              })
              element[j].details = detailsNew
            }
          }
          this.ManageStrategysList = ManageStrategysList
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取受控组id
    onChangeId (event) {
      this.groupId = event
      if (this.groupId !== 0) {
        this.getControlgroupsStudent(this.groupId)
      }
    },
    // 获取群控组下的学生
    getControlgroupsStudent (groupId) {
      const data = {
        groupId: groupId
      }
      API.apiControlgroupsStudent(data).then(res => {
        if (res.resultCode === 0) {
          this.ControlgroupsStudentList = res.data
          for (var i = 0; i < this.ControlgroupsStudentList.length; i++) {
            this.ControlgroupsStudentList[i].status === 0 ? this.ControlgroupsStudentList[i].status = false : this.ControlgroupsStudentList[i].status = true
          }
          this.StudentStatusNo = this.ControlgroupsStudentList.filter(item => {
            return item.status === false
          }).map(item => {
            return item
          })
          this.StudentStatusYes = this.ControlgroupsStudentList.filter(item => {
            return item.status === true
          }).map(item => {
            return item
          })
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    closepop (voiceEnabled) {
    },
    // 点击新增群控组
    plusSKZ () {
      this.addSKZDialog = true
    },
    // 提交群控组   ---- 新增后，数据没加载
    SKZAdd () {
      this.$refs.groupControlRef.validate((valid) => {
        if (valid) {
          const data = {
            name: this.groupControlForm.name,
            organizationId: this.groupControlForm.organizationId
          }
          API.apiGroupcontrolControlgroupsAdd(data).then(res => {
            if (res.resultCode === 0) {
              this.getGroupcontrolControlgroups()
              this.$toast('受控组新增成功！')
              this.groupControlForm.name = ''
              this.groupControlForm.organizationId = ''
              this.addSKZDialog = false
            } else {
              this.$toast(res.resultInfo)
            }
          })
        }
      })
    },
    // 删除受控组
    ControlgroupsDel (id) {
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要删除该受控组吗!'
      }).then(() => {
        API.apiWXGroupcontrolControlgroupsDel(id).then(res => {
          if (res.resultCode === 0) {
            this.getGroupcontrolControlgroups()
            this.$toast('受控组删除成功！')
          } else {
            const resultInfo = this.stringHandle(res.resultInfo)
            this.$toast(resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    // 获取所有策略信息
    getControlgroupsStragegys () {
      API.apiControlgroupsStragegys().then(res => {
        if (res.resultCode === 0) {
          this.StragegysListOption = res.data.reverse()
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 设置受控组策略
    stragegysAddShow (id) {
      this.addstragegysDialog = true
      this.stragegyForm.id = id
      this.stragegyForm.stragegyIds = null
      this.stragegyForm.stragegyIdsOld = null
    },
    stragegysModityShow (id, stragegysItem) {
      this.addstragegysDialog = true
      this.stragegyForm.id = id
      this.stragegyForm.stragegyIds = stragegysItem.map(function (item) {
        return item.id
      })
      this.stragegyForm.stragegyIdsOld = stragegysItem.map(function (item) {
        return item.id
      })
    },
    stragegysAdd () {
      if (this.stragegyForm.stragegyIdsOld !== null) {
        const data = {
          groupId: this.stragegyForm.id,
          stragegyIds: this.stragegyForm.stragegyIdsOld
        }
        API.apiControlgroupsStragegyDel(data).then(res => {
          if (res.resultCode === 0) {
            const data = {
              groupId: this.stragegyForm.id,
              stragegyIds: this.stragegyForm.stragegyIds
            }
            this.getApiStragegyAdd(data)
          } else {
            this.$toast(res.resultInfo)
          }
        })
      } else {
        const data = {
          groupId: this.stragegyForm.id,
          stragegyIds: this.stragegyForm.stragegyIds
        }
        this.getApiStragegyAdd(data)
      }
    },
    getApiStragegyAdd (data) {
      API.apiControlgroupsStragegyAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolControlgroups()
          this.$toast('新增成功！')
          this.addstragegysDialog = false
          this.stragegyForm.stragegyIds = null
          this.stragegyForm.stragegyIdsOld = null
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 修改学生受控状态
    StudentStatusModify (id, type) {
      const data = {
        groupId: this.groupId,
        status: Number(type),
        studentId: id
      }
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要修改受控状态吗!'
      }).then(() => {
        API.apiControlgroupsStudentStatusModify(data).then(res => {
          if (res.resultCode === 0) {
            this.getControlgroupsStudent(this.groupId)
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    handleClose (done) {
      done()
    },
    switchAccountButton () {
      localStorage.clear('QKtoken')
      this.$router.push({
        path: '/QKLogin'
      })
    },
    stringHandle (handleData) {
      var str = handleData
      var newString = str.split(':')
      return newString[1]
    }
  }
}
</script>

<style lang="less" scoped>
.FunctionBoxItem {
  position: relative;
  background: #fff;
  margin: 15px;
  border-radius: 4px;
  -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Firefox */
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Safari 和 Chrome */
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
  .closeIcon {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 999;
    font-size: 16px;
    background: red;
    border-radius: 100%;
    padding: 2px;
    color: #fff;
  }
  .stragegysBox {
    font-size: 12px;
    display: flex;
    padding: 0 15px;
    line-height: 40px;
    color: #ffb525;
    display: flex;
    align-items: center;
    background: #f2f2f2;
    box-sizing: border-box;
    .stragegyName {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      overflow: hidden;
      width: 4rem;
      display: flex;
    }
    .stragegyButton {
      background: #ffb525;
      color: #fff;
      height: 24px;
      line-height: 24px;
      padding: 0 5px;
      border-radius: 4px;
      font-size: 14px;
    }
    .stragegysItem {
      margin-right: 10px;
    }
  }
  .stragegyHeard {
    display: flex;
    margin-left: 18px;
    .stragegyDel {
      display: inline-block;
      background: red;
      color: #fff;
      height: 24px;
      line-height: 24px;
      padding: 0 5px;
      border-radius: 4px;
      margin-left: 5px;
    }
    span {
      .stragegyHeardName {
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
        max-width: 2.6rem;
      }
    }
  }
  .collapseBox {
    .SKZList {
      color: #000;
      display: flex;
      border-bottom: 1px dotted #d7d7d7;
      line-height: 30px;
      align-items: center;
      .SKZListItem {
        flex: 1;
        text-align: center;
        .SKZbutton {
          line-height: 20px;
          width: 50px;
          text-align: center;
          background: #ffb525;
          border: 0;
          border-radius: 4px;
          color: #fff;
        }
        .SKZbutton:active {
          color: #fad488;
        }
        .SKZListItemSwitch {
          vertical-align: middle;
        }
      }
      .SKZListItemIcon {
        width: 36px;
        height: 21px;
        margin-right: 2px;
      }
      .SKZListItemStutasName {
        width: 45px;
        margin-right: 15px;
      }
    }
    .SKZList:last-child {
      border-bottom: 0;
    }
  }
  .currentState {
    height: 30px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    background: #ffb525;
    color: #fff;
  }
  .FunctionBox {
    display: flex;
    .FunctionItem {
      flex: 1;
      border-right: 1px solid #ededed;
      .functionItemHeader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        .functionImg {
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          height: 20px;
        }
        .functionTitle {
          font-size: 14px;
          margin-left: 8px;
        }
      }
      .functionSwitch {
        text-align: center;
        line-height: 30px;
        .van-switch {
          vertical-align: middle;
        }
      }
      .functionExplain {
        font-size: 12px;
        text-align: center;
        line-height: 30px;
      }
    }
    .FunctionItem:last-child {
      border-right: 0;
    }
  }
}
.labelTitle {
  margin: 0 15px;
  width: 50px;
  line-height: 42px;
}
</style>
