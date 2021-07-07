<template>
  <!-- 受控策略管理 -->
  <div class="QKbg">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="QKHarderTitle">{{userName}}<div class="switchAccount" @click="switchAccountButton">退出</div>
    </div>
    <div class="FunctionBoxItem" v-for="item in ControlgroupsStragegys" :key="item.id">
      <div class="FunctionItemTop">
        <div class="strategyName">策略：{{item.name}}</div>
        <!-- <van-icon class="strategyIcon" name="chat-o" size="20px" color="#ffb525" /> -->
        <span class="strategyStatus" v-if="item.status === 0" @click="strategyStatusClick(item.id,1)">未生效</span>
        <span class="strategyStatus" v-else @click="strategyStatusClick(item.id,0)">已生效</span>
        <div class="strategyButton">
          <div class="CLButton colorConfirm" @click="modifyStragegry(item.id)">编辑</div>
          <div class="CLButton colorCancel" @click="delStragegry(item.id)">删除</div>
        </div>
      </div>
      <div class="currentState" v-show="item.details.length ===0">暂无状态</div>
      <div class="FunctionBox" v-show="item.details.length ===0">
        <!-- 语音 -->
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
        <!-- 短信 -->
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
        <!-- 流量  -->
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
      <div v-for="itemDetail in item.details" :key="itemDetail.id">
        <div v-if="itemDetail.current=== true">
          <div class="currentState">当前状态</div>
          <div class="FunctionBox">
            <function-item v-if="itemDetail.card_voice_statue === true" :functionImg="telLogo" :functionTitle="voiceTitle" :functionSwitch="itemDetail.card_voice_statue" :functionExplain="voiceExplain" :noEdit="noEdit">
            </function-item>
            <function-item v-else :functionImg="telLogo" :functionTitle="voiceTitle" :functionSwitch="itemDetail.card_voice_statue" :functionExplain="NOvoiceExplain" :noEdit="noEdit"></function-item>
            <function-item v-if="itemDetail.card_sms_statue === true" :functionImg="smsIcon" :functionTitle="smsTitle" :functionSwitch="itemDetail.card_sms_statue" :functionExplain="smsExplain" :noEdit="noEdit">
            </function-item>
            <function-item v-else :functionImg="smsIcon" :functionTitle="smsTitle" :functionSwitch="itemDetail.card_sms_statue" :functionExplain="NOsmsExplain" :noEdit="noEdit"></function-item>
            <function-item v-if="itemDetail.card_data_statue === true" :functionImg="networkIcon" :functionTitle="networkTitle" :functionSwitch="itemDetail.card_data_statue" :functionExplain="networkExplain"
              :noEdit="noEdit"></function-item>
            <function-item v-else :functionImg="networkIcon" :functionTitle="networkTitle" :functionSwitch="itemDetail.card_data_statue" :functionExplain="NOnetworkExplain" :noEdit="noEdit">
            </function-item>
          </div>
        </div>
      </div>
    </div>

    <div class="plusBox" style="padding-bottom:60px">
      <van-icon class="strategyIcon" name="plus" size="40px" color="#ffb525" @click="plusSKCL" />
      <div class="plusExplain">亲爱的 XXX 老师，请设置受控策略</div>
    </div>
  </div>
</template>

<script>
// import VHeader from './../header'
import telLogo from 'common/images/voiceIcon.png'
import smsIcon from 'common/images/smsIcon.png'
import networkIcon from 'common/images/networkIcon.png'
import FunctionItem from './base/functionItem'
import API from 'api/groupcontrol'
export default {
  data () {
    return {
      // headerName: '受控策略管理',
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
      ControlgroupsStragegys: [],
      StragegryId: '',
      userName: null
    }
  },
  components: {
    // VHeader,
    FunctionItem
  },
  created () {
    this.getControlgroupsStragegys()
    this.userName = localStorage.getItem('userName')
  },
  methods: {
    // 获取策略信息
    getControlgroupsStragegys () {
      API.apiControlgroupsStragegys().then(res => {
        if (res.resultCode === 0) {
          const stragegyData = res.data.reverse()
          if (stragegyData !== null) {
            for (let i = 0; i < stragegyData.length; i++) {
              const detailArr = stragegyData[i].details
              var detailArrNew = detailArr.filter((item) => {
                if (item.current) {
                  return item
                }
              })
              stragegyData[i].details = detailArrNew
            }
            this.ControlgroupsStragegys = stragegyData
          }
        } else {
          const resultInfo = this.stringHandle(res.resultInfo)
          this.$toast(resultInfo)
        }
      })
    },
    // 点击新增策略
    plusSKCL () {
      const StragegryId = null
      localStorage.setItem('StragegryId', JSON.stringify(StragegryId))
      this.$router.push({
        path: '/SKCLAdd'
      })
    },
    // 编辑
    modifyStragegry (StragegryId) {
      localStorage.setItem('StragegryId', JSON.stringify(StragegryId))
      this.$router.push({
        path: '/SKCLAdd',
        query: { StragegryId: StragegryId }
      })
    },
    // 删除策略
    delStragegry (id) {
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要删除吗!'
      }).then(() => {
        API.apiStragegysDel(id).then(res => {
          if (res.resultCode === 0) {
            this.$toast('删除成功！')
            this.getControlgroupsStragegys()
          } else {
            const resultInfo = this.stringHandle(res.resultInfo)
            this.$toast(resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    // 修改状态 有效/无效
    strategyStatusClick (id, type) {
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要修改状态吗!'
      }).then(() => {
        const data = {
          id: id,
          status: type
        }
        API.apiStragegysModify(data).then(res => {
          if (res.resultCode === 0) {
            this.getControlgroupsStragegys()
            this.$toast('状态修改成功！')
          } else {
            const resultInfo = this.stringHandle(res.resultInfo)
            this.$toast(resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    // 退出登录
    switchAccountButton () {
      localStorage.clear('QKtoken')
      this.$router.push({
        path: '/QKLogin'
      })
    },
    // 截取字
    stringHandle (handleData) {
      var str = handleData
      var newString = str.split(':')
      return newString[1]
    }
  }
}
</script>

<style lang="less" scoped>
.QKbg {
  background: #f2f2f2;
  height: 100%;
}
.FunctionBoxItem {
  background: #fff;
  margin: 15px;
  border-radius: 4px;
  -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Firefox */
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Safari 和 Chrome */
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
  .currentState {
    height: 30px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    background: #ffb525;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .FunctionItemTop {
    display: flex;
    padding: 0 15px;
    height: 40px;
    border-bottom: 1px solid #f0f0f0;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    .strategyName {
      flex: 1;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // width: 4rem;
    }
    .strategyIcon {
      width: 50px;
    }
    .strategyStatus {
      border-radius: 4px;
      color: #fff;
      padding: 0 10px;
      line-height: 24px;
      background: #ffb525;
    }
    .strategyButton {
      display: flex;
      .CLButton {
        border-radius: 4px;
        color: #fff;
        margin-left: 10px;
        padding: 0 10px;
        line-height: 24px;
      }
      .colorConfirm {
        background: #ffb525;
      }
      .colorCancel {
        background: #7f7f7f;
      }
    }
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
</style>
