<template>
  <div class="administer_info">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="g-personal" v-show="isShowAll">
      <div class="p-changer-card" @click="xbkChange">
        <img src="../../common/images/icon-switch.png" alt="">
        切换学霸卡
      </div>
      <div class="p-changer-card1" @click="settingHC">
        <img src="../../common/images/icon-switch.png" alt="">
        设置呼出号码
      </div>
      <div class="p-logo">
        <img v-if="OrdersDetails.iconUrl === ''" :src="imageUrls" alt="用户头像">
        <img v-else :src="OrdersDetails.iconUrl" alt="用户头像">
      </div>
      <p class="p-name">{{OrdersDetails.studentName}}</p>
      <div class="p-info">
        <div class="phone-num">
          <a href="#" style="color: #000000">
            <p class="phone-title">手机号</p>
            <p class="phone-dtl" @click="callPhone(OrdersDetails.cardNo)">{{OrdersDetails.cardNo}}</p>
          </a>
        </div>
        <span class="split-line"></span>

        <div class="money">
          <p class="money-title">余额</p>
          <p class="money-dtl" @click="goRechargeYE">{{OrdersDetails.remainPrice}}</p>
        </div>
      </div>
    </div>

    <div class="mode-switching" v-show="isShowAll">
      <div class="mode-switching-left">
        <span class="jjms" v-if="controlType ===1 || controlType ===null">家长控制</span>
        <span v-else @click="controlButton">家长控制</span>
      </div>
      <div class="mode-switching-right">
        <span class="jjms" v-if="controlType ===0">学校控制</span>
        <span class="gjms" v-else>学校控制</span>
      </div>
    </div>
    <!-- <div class="mode-switching" v-show="isShowAll && controlType !==0">
      <div class="mode-switching-left">模式切换</div>
      <div class="mode-switching-right">
        <span class="jjms">极简模式</span>
        <span class="line">|</span>
        <span class="gjms">高级模式</span>
      </div>
    </div> -->
    <div class="limit" v-show="isShowAll"></div>
    <div class="admin-card" v-show="isShowAll">
      <div class="card-list">
        <div class="mode-img">
          <img src="../../common/images/tel-logo.png">
        </div>
        <span class="mode-title">
          <span class="mode-lb">语音通话</span>
          <span class="mode-surplus">剩余时间：{{OrdersDetails.voiceRemain}}</span>
        </span>
        <div v-if="minusPrice < 0">
          <div class="mode-switch">
            <van-switch v-model="minusPriceStatus" size="16px" active-color="#7ED024" inactive-color="#fff" @click="goRecharge" disabled />
            <span class="switch-edit">{{switchVoiceContentNo}}</span>
          </div>
        </div>
        <div v-else>
          <div class="mode-switch" v-if="minusVoiceRemainNew <= 0">
            <van-switch v-model="minusPriceStatus" size="16px" active-color="#7ED024" inactive-color="#fff" @click="goRefueling('语音')" disabled />
            <span class="switch-edit">{{switchVoiceContentNo}}</span>
          </div>
          <div class="mode-switch" v-else>
            <van-switch v-if="controlType ===0" v-model="cardStatus.voiceEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @change="voiceEnabledClick" disabled />
            <van-switch v-else-if="CardStatusNO ===0" v-model="cardStatus.voiceEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @click="goRealname" disabled />
            <van-switch v-else v-model="cardStatus.voiceEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @change="voiceEnabledClick" />
            <span class="switch-edit" v-if="cardStatus.voiceEnabled ===true">{{switchVoiceContent}}</span>
            <span class="switch-edit" v-else>{{switchVoiceContentNo}}</span>
          </div>
        </div>
      </div>

      <div class="card-list">
        <div class="mode-img">
          <img src="../../common/images/internet-logo.png">
        </div>
        <span class="mode-title">
          <span class="mode-lb">网络服务</span>

          <span class="mode-surplus">当前使用{{OrdersDetails.networkTypeName}}</span>
          <span class="mode-surplus">剩余总流量：{{OrdersDetails.networkRemain}}</span>
        </span>
        <div v-if="minusPrice < 0">
          <div class="mode-switch">
            <van-switch v-model="minusPriceStatus" size="16px" active-color="#7ED024" inactive-color="#fff" @click="goRecharge" disabled />
            <span class="switch-edit">{{switchNetworkContentNo}}</span>
          </div>
        </div>
        <div v-else>
          <div class="mode-switch" v-if="minusNetworkRemainNew <= 0">
            <van-switch v-model="minusPriceStatus" size="16px" active-color="#7ED024" inactive-color="#fff" @click="goRefueling('流量')" disabled />
            <span class="switch-edit">{{switchNetworkContentNo}}</span>
          </div>
          <div class="mode-switch" v-else>
            <van-switch v-if="controlType ===0" v-model="cardStatus.netWorkEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @change="netWorkEnabledClick" disabled />
            <van-switch v-else-if="CardStatusNO ===0" v-model="cardStatus.netWorkEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @click="goRealname" disabled />
            <van-switch v-else v-model="cardStatus.netWorkEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @change="netWorkEnabledClick" />
            <span class="switch-edit" v-if="cardStatus.netWorkEnabled === true">{{switchNetworkContent}}</span>
            <span class="switch-edit" v-else>{{switchNetworkContentNo}}</span>
          </div>
        </div>
      </div>

    </div>
    <div class="limit" v-show="isShowAll"></div>
    <div class="position-card" v-show="isShowAll">
      <van-cell center title="位置功能开关">
        <template #right-icon>
          <van-switch v-if="CardStatusNO ===0" v-model="cardStatus.positionEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @click="goRealname" disabled />
          <van-switch v-else v-model="cardStatus.positionEnabled" size="16px" active-color="#7ED024" inactive-color="#fff" @change="positionFunctionClick" />
        </template>
      </van-cell>
      <div class="manage-grid" v-show="positionFuctionIsShow">
        <div class="manage-grid-item">
          <div class="grid-icon">
            <img src="../../common/images/home.png">
          </div>
          <div class="grid-text">
            <div @click="address(OrdersDetails.cardNo,OrdersDetails)">常用地址设置</div>
          </div>
        </div>

        <div class="manage-grid-item">
          <div class="grid-icon">
            <img src="../../common/images/trajectory.png">
          </div>
          <div class="grid-text">
            <div @click="trajectory(OrdersDetails.cardNo)">历史轨迹</div>
          </div>
        </div>

        <div class="manage-grid-item">
          <div class="grid-icon">
            <img src="../../common/images/position.png">
          </div>
          <div class="grid-text">
            <div @click="position(OrdersDetails.cardNo)">当前位置</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="comanagement">
      共同管理设置
    </div> -->

    <!-- 切换学霸卡 弹框 -->
    <van-dialog v-model="showCardDialog" class="mealContent">
      <div class="cardChangeBox">
        <div class="cardChangeItem" v-for="item in cardList" :key="item.iccid" @click="cardChange(item.cardNo,item)">
          <div class="cardImg">
            <img v-if="item.iconUrl === ''" :src="imageUrls" alt="用户头像">
            <img v-else :src="item.iconUrl" alt="">
          </div>
          <div class="cardName">
            <div>{{item.studentName}}</div>
            <div v-if="item.status === 0">未实名</div>
            <div v-else-if="item.status === 1">已实名</div>
            <div v-else-if="item.status === 4">无套餐</div>
            <div v-else>已激活</div>
          </div>
          <div class="cardNumber">
            <!-- <div>{{item.iccid}}</div> -->
            <div>{{item.cardNo}}</div>
          </div>
        </div>
      </div>
    </van-dialog>
    <div v-show="!isShowAll" style="text-align: center;height:100%;margin-top: 3rem;font-size: .4rem;line-height: .6rem">
      <div>您当前暂无学霸卡,</div>
      <div>
        现在去<span style="color: rgb(255, 186, 40)" @click="onClick_goPage2('applyCard')">申请</span>或<span style="color: rgb(255, 186, 40);" @click="onClick_goPage2('activation')">激活</span>。
      </div>
    </div>
    <!-- <div v-show="!isHasPackage" style="text-align: center;height:100%;margin-top: 3rem;font-size: .4rem;line-height: .6rem">
      <div>您当前卡无套餐,</div>
      <div>
        现在去<span style="color: rgb(255, 186, 40)" @click="onClick_goPage2('applyCard')">申请</span>或<span style="color: rgb(255, 186, 40);" @click="onClick_goPage2('activation')">激活</span>。
      </div>
    </div> -->
    <!-- <van-loading color="#FDAB16" /> -->
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
    <!-- 实名认证提示弹框 -->
    <van-dialog v-model="RealnameDialog" show-cancel-button class="mealContent" :beforeClose="RealnameButton">
      <div class="realnameBox">
        您的当前学霸卡还没有实名，请您前往联通官方小程序，进行实名认证，<span style="color:red">若已完成实名认证，请耐心等待系统处理！</span>
      </div>
    </van-dialog>
    <van-dialog v-model="noPackage" show-confirm-button='false' class="mealContent" :beforeClose="toBuyPackage">
      <div class="realnameBox">
        您的当前学霸卡还没有购买套餐，请先购买套餐。
      </div>
    </van-dialog>
  </div>
</template>

<script>
// import { Dialog } from 'vant'
// import vHeader from '../header.vue'
import imageUrls from 'common/images/icon-user.png'
import API from 'api/administer'
export default {
  data () {
    return {
      // headerName: '管理中心',
      // 卡列表
      cardList: [],
      // 单条卡信息
      cardInfo: {},
      orderNo: '',
      imageUrls,
      // 卡状态
      cardStatus: {},
      // 卡详情
      OrdersDetails: {},
      switchVoiceContent: '允许语音通话',
      switchVoiceContentNo: '禁止语音通话',
      switchShortMessageContent: '允许发短信',
      switchShortMessageContentNo: '禁止收发短信',
      switchNetworkContent: '允许上网',
      switchNetworkContentNo: '禁止上网',
      // 位置信息开的情况，显示
      positionFuctionIsShow: true,
      // 切换学霸卡 模态框
      showCardDialog: false,
      isShowAll: true,
      noPackage: false,
      loadingShow: false,
      CardStatus: null,
      controlType: null,
      minusPrice: null,
      minusPriceStatus: false,
      minusVoiceRemainNew: null,
      minusNetworkRemainNew: null,
      CardStatusNO: null,
      RealnameDialog: false
    }
  },
  components: {
    // vHeader
  },
  created () {
    this.getCardList()
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  methods: {
    // 获取卡列表数据
    getCardList () {
      API.apiCardList().then(res => {
        if (res.resultCode === 0) {
          this.cardList = res.data
          if (this.cardList.length === 0) {
            this.isShowAll = false
          } else {
            this.isShowAll = true
            const cardNo = JSON.parse(sessionStorage.getItem('cardNo'))
            const studentName = JSON.parse(sessionStorage.getItem('studentName'))
            const fwAcccount = JSON.parse(sessionStorage.getItem('fwAcccount'))
            if (cardNo === '' || cardNo === null || cardNo === undefined || studentName === '' || studentName === null || studentName === undefined || fwAcccount === '' || fwAcccount === null || fwAcccount === undefined) {
              sessionStorage.setItem('studentName', JSON.stringify(res.data[0].studentName))
              sessionStorage.setItem('cardNo', JSON.stringify(res.data[0].cardNo))
              sessionStorage.setItem('fwAcccount', JSON.stringify(res.data[0].fwAcccount))
              const cardNo = JSON.parse(sessionStorage.getItem('cardNo'))
              this.getCardStatus(cardNo)
              this.getOrdersDetails(cardNo)
            } else {
              this.getCardStatus(cardNo)
              this.getOrdersDetails(cardNo)
            }
            if (res.data[0].status === 4) {
              this.noPackage = true
            } else {
              this.noPackage = false
            }
            this.CardStatusNO = JSON.parse(sessionStorage.getItem('CardStatusNO'))
            if (this.CardStatusNO === '' || this.CardStatusNO === null) {
              sessionStorage.setItem('CardStatusNO', JSON.stringify(res.data[0].status))
              this.CardStatusNO = JSON.parse(sessionStorage.getItem('CardStatusNO'))
            }
            if (this.CardStatusNO === 0) {
              this.RealnameDialog = true
            }
            this.controlType = JSON.parse(sessionStorage.getItem('controlType'))
            if (this.controlType === '') {
              sessionStorage.setItem('controlType', JSON.stringify(res.data[0].controlType))
              this.controlType = JSON.parse(sessionStorage.getItem('controlType'))
            }
          }
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 点击切换学霸卡
    xbkChange () {
      this.showCardDialog = true
    },
    // 拨打电话
    callPhone (val) {
      window.location.href = 'tel:' + val
    },
    // 点击卡列表
    cardChange (id, $item) {
      if ($item.status === 4) {
        this.noPackage = true
      } else {
        this.noPackage = false
      }
      sessionStorage.setItem('studentName', JSON.stringify($item.studentName))
      sessionStorage.setItem('cardNo', JSON.stringify(id))
      sessionStorage.setItem('fwAcccount', JSON.stringify($item.fwAcccount))
      const cardNo = JSON.parse(sessionStorage.getItem('cardNo'))
      this.showCardDialog = false
      this.getCardStatus(cardNo)
      this.getOrdersDetails(cardNo)

      sessionStorage.setItem('CardStatusNO', JSON.stringify($item.status))
      this.CardStatusNO = JSON.parse(sessionStorage.getItem('CardStatusNO'))
      if (this.CardStatusNO === 0) {
        this.RealnameDialog = true
      }
      sessionStorage.setItem('controlType', JSON.stringify($item.controlType))
      this.controlType = JSON.parse(sessionStorage.getItem('controlType'))
    },
    // 卡状态为未实名时，去实名
    goRealname () {
      if (this.CardStatusNO === 0) {
        this.RealnameDialog = true
      }
    },

    RealnameButton (action, done) {
      if (action === 'confirm') {
        this.$router.push({
          path: '/activateCard'
        })
        done() // 关闭
      } else if (action === 'cancel') {
        done() // 关闭
      }
    },
    toBuyPackage (action, done) {
      if (action === 'confirm') {
        this.$router.push({
          path: '/consumption',
          query: {
            status: 3
          }
        })
        done() // 关闭
      } else if (action === 'cancel') {
        done() // 关闭
      }
    },
    // 点击家长控制
    controlButton () {
      const data = {
        controlType: 1,
        phone: JSON.parse(sessionStorage.getItem('cardNo'))
      }
      this.$dialog.confirm({
        title: '提醒',
        message: '您确认要修改当前学霸卡的群控状态吗？'
      }).then(() => {
        API.apiStudentControltype(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('更改成功！')
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    // 获取卡状态信息
    getCardStatus ($cardNo) {
      const orderNo = $cardNo
      API.apiCardInfo(orderNo).then(res => {
        if (res.resultCode === 0) {
          this.cardStatus = res.data
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取详情数据
    getOrdersDetails ($cardNo) {
      const cardNo = $cardNo
      API.apiOrdersDetails(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.OrdersDetails = res.data
          const Price = this.OrdersDetails.remainPrice
          // const Price = '-20.00元'
          this.minusPrice = Number(Price.replace(/[^-0-9\\.\\^0-9]/ig, ''))
          // const minusVoiceRemain = '-1分钟'
          const minusVoiceRemain = this.OrdersDetails.voiceRemain
          this.minusVoiceRemainNew = Number(minusVoiceRemain.replace(/[^-0-9\\.\\^0-9]/ig, ''))
          // const minusNetworkRemain = '-12M'
          const minusNetworkRemain = this.OrdersDetails.networkRemain
          this.minusNetworkRemainNew = Number(minusNetworkRemain.replace(/[^-0-9\\.\\^0-9]/ig, ''))
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 语音、流量为负时，点击状态 进入 加油包
    goRefueling (data) {
      this.$dialog.confirm({
        title: '提醒',
        message: `您好，您当前的${data}不足，请点击 确认 前往<span style="color:red">加油包</span>。`
      }).then(() => {
        const OrdersDetails = this.OrdersDetails
        sessionStorage.setItem('OrdersDetails', JSON.stringify(OrdersDetails))
        this.$router.push({
          path: '/refueling',
          query: {
            token: window.token,
            OrdersDetails: OrdersDetails
          }
        })
      }).catch(() => {
      })
    },
    // 充值金额为负时，点击状态 进入 充值
    goRecharge () {
      this.$dialog.confirm({
        title: '提醒',
        message: '您好，您当前的余额不足，请前往<span style="color:red">学霸卡用量</span>进行充值。'
      }).then(() => {
        this.$router.push({
          path: '/consumption',
          query: {
            status: 2
          }
        })
      }).catch(() => {
      })
    },
    // 切换 语音通话
    voiceEnabledClick (voiceEnabled) {
      if (this.cardStatus.voiceEnabled === false) {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要关闭语音通话吗？'
        }).then(() => {
          this.loadingShow = true
          this.voiceEnabledSuccess(() => {
            this.cardStatus.voiceEnabled = false
          })
        }).catch(() => {
          this.cardStatus.voiceEnabled = true
        })
      } else {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要开启语音通话吗？'
        }).then(() => {
          this.loadingShow = true
          this.voiceEnabledSuccess(() => {
            this.cardStatus.voiceEnabled = true
          })
        }).catch(() => {
          this.cardStatus.voiceEnabled = false
        })
      }
    },
    // 切换 语音业务提交
    voiceEnabledSuccess ($fun) {
      const data = {
        cardNo: JSON.parse(sessionStorage.getItem('cardNo')),
        modifyType: 0,
        status: this.cardStatus.voiceEnabled
      }
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/cards/status/modify',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.$toast('更改成功！')
          this.getCardList()
          $fun()
          this.loadingShow = false
        } else {
          this.$toast(res.data.resultInfo)
          this.getCardList()
          this.loadingShow = false
        }
      })
    },
    // 切换 短信业务
    smsEnabledClick (smsEnabled) {
      if (this.cardStatus.smsEnabled === false) {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要关闭短信业务吗？'
        }).then(() => {
          this.loadingShow = true
          this.smsEnabledSuccess()
          this.cardStatus.smsEnabled = false
        }).catch(() => {
          this.cardStatus.smsEnabled = true
        })
      } else {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要开启短信业务吗？'
        }).then(() => {
          this.loadingShow = true
          this.smsEnabledSuccess()
          this.cardStatus.smsEnabled = true
        }).catch(() => {
          this.cardStatus.smsEnabled = false
        })
      }
    },
    // 切换 短信业务提交
    smsEnabledSuccess () {
      const data = {
        cardNo: JSON.parse(sessionStorage.getItem('cardNo')),
        modifyType: 1,
        status: this.cardStatus.smsEnabled
      }
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/cards/status/modify',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.$toast('更改成功！')
          this.getCardList()
          this.loadingShow = false
        } else {
          this.$toast(res.data.resultInfo)
          this.getCardList()
          this.loadingShow = false
        }
      })
    },
    // 切换 网络服务
    netWorkEnabledClick (netWorkEnabled) {
      if (this.cardStatus.netWorkEnabled === false) {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要关闭网络服务吗？'
        }).then(() => {
          this.loadingShow = true
          this.netWorkEnabledSuccess()
          this.cardStatus.netWorkEnabled = false
        }).catch(() => {
          this.cardStatus.netWorkEnabled = true
          this.getCardList()
        })
      } else {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要开启网络服务吗？'
        }).then(() => {
          this.loadingShow = true
          this.netWorkEnabledSuccess()
          this.cardStatus.netWorkEnabled = true
        }).catch(() => {
          this.cardStatus.netWorkEnabled = false
        })
      }
    },
    // 切换 网络服务提交
    netWorkEnabledSuccess () {
      const data = {
        cardNo: JSON.parse(sessionStorage.getItem('cardNo')),
        modifyType: 3,
        status: this.cardStatus.netWorkEnabled
      }
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/cards/status/modify',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.$toast('更改成功！')
          this.getCardList()
          this.loadingShow = false
        } else {
          this.$toast(res.data.resultInfo)
          this.getCardList()
          this.loadingShow = false
        }
      })
    },
    // 位置功能 切换
    positionFunctionClick () {
      if (this.cardStatus.positionEnabled === true) {
        this.positionFuctionIsShow = true
      } else {
        this.positionFuctionIsShow = false
      }
      this.loadingShow = true
      const data = {
        cardNo: JSON.parse(sessionStorage.getItem('cardNo')),
        modifyType: 4,
        status: this.cardStatus.positionEnabled
      }
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/cards/status/modify',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.$toast('更改成功！')
          this.getCardList()
          this.loadingShow = false
        } else {
          this.$toast(res.data.resultInfo)
          this.loadingShow = false
          this.getCardList()
        }
      })
    },

    // 点击常用地址
    address (orderNo, row) {
      if (this.CardStatusNO === 0) {
        this.RealnameDialog = true
      } else {
        const OrdersDetails = row
        // sessionStorage.setItem('orderNo', JSON.stringify(orderNo))
        sessionStorage.setItem('OrdersDetails', JSON.stringify(OrdersDetails))
        this.$router.push({
          path: '/commonAddress',
          query: {
            // orderNo: orderNo,
            OrdersDetails: OrdersDetails
          }
        })
      }
    },
    // 点击历史轨迹
    trajectory (orderNo) {
      if (this.CardStatusNO === 0) {
        this.RealnameDialog = true
      } else {
        sessionStorage.setItem('orderNo', JSON.stringify(orderNo))
        this.$router.push({
          path: '/trajectory',
          query: { orderNo: orderNo }
        })
      }
    },
    // 点击当前位置
    position (orderNo) {
      if (this.CardStatusNO === 0) {
        this.RealnameDialog = true
      } else {
        sessionStorage.setItem('orderNo', JSON.stringify(orderNo))
        this.$router.push({
          path: '/position',
          query: { orderNo: orderNo }
        })
      }
    },
    onClick_goPage2 ($router) {
      this.$router.push({
        path: '/' + $router
      })
    },
    settingHC () {
      if (this.CardStatusNO === 0) {
        this.RealnameDialog = true
      } else {
        this.$router.push({
          path: '/settingWhite',
          query: {
            cardNo: JSON.parse(sessionStorage.getItem('cardNo')),
            studentName: JSON.parse(sessionStorage.getItem('studentName')),
            fwAcccount: JSON.parse(sessionStorage.getItem('fwAcccount'))
          }
        })
      }
    },
    goRechargeYE () {
      this.$router.push({
        path: '/consumption',
        query: {
          status: 2
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/administer.less);
.loading {
  position: fixed;
  padding-top: 75%;
  padding-left: 48%;
  z-index: 999;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  margin: 0;
}
.realnameBox {
  padding: 20px 20px 10px 20px;
  line-height: 26px;
}
</style>
