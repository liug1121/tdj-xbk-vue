<template>
  <li class="node list-item" data-type="0">
    <template v-if="root !==0 && nodes !== 1">
      <span class="line"></span>
    </template>
    <div class="contanier flex">
      <div class="body-panel flex">
        <div class="title" style="font-size:12px" @click="openExpand(model)">
          <i v-if="HasChild" class="arrow" :class="isOpenOrClose"></i>
          {{model.name}}
        </div>
      </div>
      <div v-show="studentshow" class="textPanel" v-if="model.type === 1 && studentList.length !== 0">
        <div class="studentItem">
          <p class="studentName">姓名</p>
          <p class="studentPhone">手机号</p>
          <p class="studentType">状态</p>
        </div>
        <van-swipe-cell v-for="item in studentList" :key="item.id" class="studentLine" v-show="model.type === 1">
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
    </div>
    <template v-if="HasChild && this.model.isExpand">
      <ul class="box">
        <tree-item ref="treeWrap" v-for="(m, i) in model.children" :key="String('child_node'+i)" :num='i' :root="1" @openExpand="openExpand" :nodes.sync="model.children.length" :model="m">
        </tree-item>
      </ul>
    </template>
    <!-- 删除 受控组 -->
    <van-dialog v-model="delStudentDialog" show-cancel-button title="删除人员" class="mealContent" :before-close="StudentDel">
      <div class="successBox">
        <div class="fieldText">姓名：<span>{{studentModel.name}}</span></div>
        <div class="fieldText">手机号：<span>{{studentModel.phone}}</span></div>
      </div>
    </van-dialog>
  </li>
</template>

<script>
import API from 'api/groupcontrol'
export default {
  name: 'treeItem',
  props: ['model', 'num', 'nodes', 'root'],
  data () {
    return {
      treeDataSource: [],
      studentList: [],
      studentshow: false,
      organizationId: null,
      delStudentDialog: false,
      studentModel: {
        name: null,
        phone: null
      },
      userName: null,
      schoolName: null
    }
  },
  watch: {
    model: {
      handler () {
        // console.log('监听子组件：', this.model.children)
      },
      deep: true
    }
  },
  computed: {
    HasChild () {
      return this.model.children.length > 0
    },
    isOpenOrClose () {
      return this.model.isExpand ? 'open' : 'close'
    }
  },
  created () {
    this.userName = localStorage.getItem('userName')
    this.schoolName = localStorage.getItem('schoolName')
  },
  methods: {
    openExpand (m) {
      // if (!m.HasChild) return
      this.$emit('openExpand', m)
      if (m.type === 1) {
        this.studentshow = true
      }
      this.organizationId = m.id
      this.getStudentOrganizationsStudent(m.id)
    },
    getStudentOrganizationsStudent (id) {
      const organizationId = id
      API.apiStudentOrganizationsStudent(organizationId).then(res => {
        if (res.resultCode === 0) {
          this.studentList = res.data
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 删除学生
    delClick (row) {
      this.delStudentDialog = true
      this.studentModel.name = row.name
      this.studentModel.phone = row.phone
      this.studentModel.studentId = row.id
    },
    StudentDel (action, done) {
      if (action === 'confirm') {
        const data = {
          name: this.studentModel.name,
          phone: this.studentModel.phone,
          studentId: this.studentModel.studentId
        }
        API.apiStudentDel(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('删除成功！')
            this.delStudentDialog = false
            this.getStudentOrganizationsStudent(this.organizationId)
            done()
          } else {
            this.$toast(res.resultInfo)
          }
        })
      } else {
        done()
      }
    },
    // 发送申请
    sendApply (row) {
      // console.log(this.model)
      const data = {
        phone: row.phone,
        url: `http://xbk.xuebaka.cn/#/ParentalControl?name=${row.name}&phone=${row.phone}&school=${this.schoolName}&teacher=${this.userName}&studentId=${row.id}`
      }
      API.apiStudentControlapply(data).then(res => {
        if (res.resultCode === 0) {
          this.$toast('发送申请成功，请等待家长同意！')
          this.getStudentOrganizationsStudent(this.organizationId)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.flex {
  display: flex;
  justify-content: flex-start;
}
.contanier {
  padding-left: 26px;
  padding-right: 10px;
  flex-direction: column;
  .body-panel {
    height: 30px;
    flex-direction: row;
    justify-content: space-between;
    .title {
      position: relative;
      .arrow {
        position: absolute;
        width: 0;
        height: 0;
        left: -13px;
        border-style: solid;
        z-index: 1;
        &.close {
          border-width: 6px 0 6px 6px;
          border-color: transparent transparent transparent #aaa;
          top: 10px;
        }
        &.open {
          top: 4px;
          border-width: 6px 6px 0;
          border-color: #aaa transparent transparent;
          top: 12px;
          left: -18px;
        }
      }
    }
  }
  .textPanel {
    font-size: 12px;
    box-shadow: #f8e7bf 0px 0px 10px 1px;
    border-radius: 4px;
    margin-bottom: 0.2rem;
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
</style>
