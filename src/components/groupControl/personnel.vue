<template>
  <!-- 人员管理 -->
  <div class="QKbg">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="QKHarderTitle">
      {{userName}}老师-{{schoolName}}
      <div class="switchAccount" @click="switchAccountButton">退出</div>
    </div>
    <div class="searchBox">
      <input type="text" v-model="searchInput" class="searchInput" placeholder="请输入学生姓名或手机号">
      <van-icon class="searchIcon" name="search" @click="searchButton" />
    </div>
    <!-- tree -->
    <div class="tree-main" v-show="!searchStudentshow">
      <ul class="tree-wrap">
        <tree-item ref="treeWrap" v-for="(model,i) in treeDataSource" :root="0" :num="i" :nodes="treeDataSource.length" @openExpand="openExpand" :model="model" :key="'root_'+i"></tree-item>
      </ul>
    </div>
    <!-- 搜索出的结果 -->
    <div v-show="searchStudentshow" class="textPanel">
      <div class="studentItem">
        <p class="studentName">姓名</p>
        <p class="studentPhone">手机号</p>
        <p class="studentType">状态</p>
      </div>
      <van-swipe-cell v-for="item in searchStudentList" :key="item.id" class="studentLine">
        <div class="studentItem">
          <p class="studentName">{{item.name}}</p>
          <p class="studentPhone">{{item.phone}}</p>
          <p v-if="item.controlType == 1 && (item.status == 0 || item.status == 1)" class="studentType">
            <span class="sendButton" @click="sendApply(item)">发送申请</span>
          </p>
          <p v-else-if="item.controlType == 0 && item.status == 0" class="studentType">未受控</p>
          <p v-else-if="item.controlType == 0 && item.status == 1" class="studentType">已受控</p>
          <el-popover v-else-if="item.controlType == 0 && item.status == 2" placement="top-start" title="提示" width="200" trigger="hover" :content="item.description">
            <p class="studentType" slot="reference" style="color:#FFB525">无法受控</p>
          </el-popover>
        </div>
        <template #right>
          <div style="margin-top:-7px">
            <van-button square type="danger" text="删除" @click="delClick(item)" />
          </div>
        </template>
      </van-swipe-cell>
    </div>
    <div class="returnButton" v-show="searchStudentshow" @click="returnButton">返回</div>

    <div class="plusBox">
      <van-icon class="strategyIcon" name="plus" size="40px" color="#ffb525" @click="plusStudent" />
      <div class="plusExplain">亲爱的 {{userName}} 老师，请添加需要管理的学生</div>
    </div>
    <!-- 新增/删除 受控组 -->
    <!-- <van-dialog v-model="addStudentDialog" show-cancel-button :title="dialogTitle" class="mealContent" :before-close="StudentAdd">
      <div class="successBox">
        <van-field v-show="!isDelShow" v-model="studentModel.name" label="姓名" placeholder="请输入姓名" />
        <div v-show="isDelShow" class="fieldText">姓名：<span>{{studentModel.name}}</span></div>
        <van-field v-show="!isDelShow" v-model="studentModel.phone" label="手机号" placeholder="请输入手机号" />
        <div v-show="isDelShow" class="fieldText">手机号：<span>{{studentModel.phone}}</span></div>
      </div>
    </van-dialog> -->
    <el-dialog :title="dialogTitle" :visible.sync="addStudentDialog" width="90%" top="50%">
      <el-form ref="studentModelRef" :model="studentModel" :rules="studentModelRules" label-width="95px">
        <el-form-item v-show="!isDelShow" label="姓名" prop="name">
          <el-input v-model="studentModel.name" placeholder="请输入学生姓名"></el-input>
        </el-form-item>
        <div v-show="isDelShow" class="fieldText">姓名：<span>{{studentModel.name}}</span></div>
        <el-form-item v-show="!isDelShow" label="手机号" prop="phone">
          <el-input v-model="studentModel.phone" placeholder="请输入学生手机号"></el-input>
        </el-form-item>
        <div v-show="isDelShow" class="fieldText">手机号：<span>{{studentModel.phone}}</span></div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="studentCancel">取 消</el-button>
        <el-button @click="StudentAdd" type="goon">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import VHeader from './../header'
import treeItem from './base/tree'
import API from 'api/groupcontrol'
export default {
  inject: ['reload'], // 注入App里的reload方法
  data () {
    return {
      // headerName: '人员管理',
      addStudentDialog: false,
      studentModel: {
        name: null,
        phone: null,
        studentId: null
      },
      dialogTitle: '新增人员',
      isDelShow: false,
      // tree start
      treeDataSource: [],
      groupControlData: [],
      // tree end
      organizationId: null,
      searchInput: null,
      searchStudentList: [],
      searchStudentshow: false,
      userName: null,
      OrganizationsList: [],
      studentModelRules: {
        phone: [
          { required: true, message: '请输入学生手机号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ]
      },
      organizationName: null,
      schoolName: null
    }
  },
  components: {
    // VHeader,
    treeItem
  },
  created () {
    this.getStudentOrganizations()
    this.userName = localStorage.getItem('userName')
  },
  computed: {
  },
  methods: {
    // 查找学生
    searchButton () {
      API.apiStudentSearch(this.searchInput).then(res => {
        if (res.resultCode === 0) {
          this.searchStudentList = res.data
          this.searchStudentshow = true
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    returnButton () {
      this.searchStudentshow = false
      this.searchInput = null
    },
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
          this.groupControlData = result
          const tempData = JSON.parse(JSON.stringify(this.groupControlData))
          const reduceDataFunc = (data, level) => {
            data.map((m, i) => {
              m.isExpand = m.isExpand || true // 默认打开
              // m.isExpand = m.isExpand || false
              m.children = m.children || []
              m.level = level
              if (m.children.length > 0) {
                reduceDataFunc(m.children, level + 1)
              }
            })
          }
          reduceDataFunc(tempData, 1)
          this.treeDataSource = tempData
          this.schoolName = tempData[0].name
          localStorage.setItem('schoolName', this.schoolName)
        } else {
          const resultInfo = this.stringHandle(res.resultInfo)
          this.$toast(resultInfo)
        }
      })
    },
    // 新增人员
    plusStudent () {
      if (this.organizationId === null || this.organizationId === undefined || this.organizationId === '') {
        this.$toast('请选择组织！')
      } else {
        this.addStudentDialog = true
      }
    },
    // 新增窗口 取消
    studentCancel () {
      this.addStudentDialog = false
      this.$refs.studentModelRef.resetFields()
    },
    // 新增人员 提交
    StudentAdd () {
      if (this.studentModel.studentId === null || this.studentModel.studentId === '') {
        this.$refs.studentModelRef.validate((valid) => {
          if (valid) {
            const data = {
              name: this.studentModel.name,
              phone: this.studentModel.phone,
              organizationId: this.organizationId
            }
            API.apiStudentAdd(data).then(res => {
              if (res.resultCode === 0) {
                this.$toast('新增成功！')
                this.addStudentDialog = false
                this.$refs.studentModelRef.resetFields()
                this.getStudentOrganizationsStudent(this.organizationId)
                this.reload() // 刷新页面
              } else {
                const resultInfo = this.stringHandle(res.resultInfo)
                this.$toast(resultInfo)
              }
            })
          }
        })
      } else {
        const data = {
          name: this.studentModel.name,
          phone: this.studentModel.phone,
          studentId: this.studentModel.studentId
        }
        API.apiStudentDel(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('删除成功！')
            this.addStudentDialog = false
            this.getStudentOrganizationsStudent(this.organizationId)
            this.reload() // 刷新页面
          } else {
            const resultInfo = this.stringHandle(res.resultInfo)
            this.$toast(resultInfo)
          }
        })
      }
    },
    // 删除学生
    delClick (row) {
      this.addStudentDialog = true
      this.studentModel.name = row.name
      this.studentModel.phone = row.phone
      this.studentModel.studentId = row.id
    },
    getStudentOrganizationsStudent (id) {
      const organizationId = id
      API.apiStudentOrganizationsStudent(organizationId).then(res => {
        if (res.resultCode === 0) {
          this.studentList = res.data
        } else {
          this.$message.error(res.data)
        }
      })
    },
    openExpand (m) {
      m.isExpand = !m.isExpand
      this.organizationId = m.id
      this.organizationName = m.name
    },
    // 发送申请
    sendApply (row) {
      const data = {
        phone: row.phone,
        url: `http://xbk.xuebaka.cn/#/ParentalControl?name=${row.name}&phone=${row.phone}&school=${this.schoolName}&teacher=${this.userName}&studentId=${row.id}`
      }
      API.apiStudentControlapply(data).then(res => {
        if (res.resultCode === 0) {
          this.$toast('发送申请成功，请等待家长同意！')
          this.getStudentOrganizationsStudent(this.organizationId)
        } else {
          const resultInfo = this.stringHandle(res.resultInfo)
          this.$toast(resultInfo)
        }
      })
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
.searchBox {
  margin: 10px 15px;
  position: relative;
  font-size: 14px;
}
.searchInput {
  border: 1px solid #bbb;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
}
.searchIcon {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 20px;
  color: #bbb;
}
.successBox {
  .fieldText {
    margin: 15px;
    font-size: 14px;
    span {
      color: #aaa;
    }
  }
}
.tree-wrap {
  > li {
    border-bottom: 1px solid #ccc;
  }
  > li:last-child {
    border-bottom: 0;
  }
  li {
    min-height: 30px;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    height: auto;
    line-height: 30px;
  }
  .box {
    display: block;
    padding-left: 15px;
    box-shadow: none;
    li {
      &.node:not(:last-child) {
        > .line {
          content: '';
          display: block;
          background-color: #ddd;
          position: absolute;
          width: 1px;
          height: 100%;
          left: 14px;
          top: 18px;
        }
      }
      &::before,
      &::after {
        content: '';
        display: block;
        background-color: #ddd;
        position: absolute;
      }
      &::before {
        width: 1px;
        height: 28px;
        left: 14px;
        top: 18px;
      }
      &::after {
        width: 15px;
        height: 1px;
        left: 15px;
        top: 45px;
      }
    }
  }
  ul {
    margin-top: 1px;
    li {
      padding-top: 0;
      padding-right: 0;
    }
  }
}
.textPanel {
  font-size: 12px;
  box-shadow: #f8e7bf 0px 0px 10px 1px;
  border-radius: 4px;
  margin: 0.2rem;
  line-height: 0.6rem;
  .studentLine {
    border-top: 1px solid #e6e6e6;
  }
  .studentItem {
    display: flex;
    font-size: 12px;
    margin: 0 10px;
    .studentName {
      flex: 1;
    }
    .sendButton {
      background: #ffb525;
      padding: 5px;
      color: #fff;
      border-radius: 4px;
    }
    .studentPhone {
      flex: 1;
    }
    .studentType {
      width: 60px;
    }
  }
}
.returnButton {
  font-size: 18px;
  text-align: center;
  color: #ffb525;
  margin: 10px 0;
}
.plusBox {
  padding-bottom: 70px;
}
</style>
