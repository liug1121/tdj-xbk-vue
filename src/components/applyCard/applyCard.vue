<template>
  <div class="applyCard_info">
    <!-- form 表单 -->
    <div class="box-card">
      <van-form :model="applyCardForm" ref="applyCardForm">
        <van-field v-model="applyCardForm.orderName" label="申请人姓名" placeholder="请输入申请人姓名" />
        <van-field v-model="applyCardForm.orderPhone" label="申请人手机" placeholder="请输入申请人手机号" />

        <van-field v-model="applyCardForm.contactAreaCode" readonly clickable name="area" :value="value" label="配送区域" placeholder="请选择配送区域" @click="showArea = true" right-icon="arrow" />
        <van-popup v-model="showArea" position="bottom">
          <van-picker show-toolbar title="配送区域" :columns="areaList" @confirm="onAddrAreaConfirm" @change="onAreaChange" @cancel="onAreaCancel" :item-height="28" visible-item-count="12" />
        </van-popup>

        <van-field v-model="applyCardForm.postAddrInfo" label="收货地址" placeholder="请输入收货地址" />
        <van-field readonly clickable name="picker" :value="value" label="套餐归属地" placeholder="请选择套餐归属地" v-model="applyCardForm.packageProvince" @click="showPicker = true" right-icon="arrow" />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar title="套餐归属地" :columns="TCprovincesList" value-key="name" @confirm="onConfirmTC" @cancel="onPackageCancel" :item-height="28" visible-item-count="12" />
        </van-popup>
        <div v-show="isShow">
          <van-field readonly v-model="applyCardForm.packageId" label="选择套餐" placeholder="请选择套餐" @focus="chooseMeal" />
          <van-field v-model="applyCardForm.mealMoney" label="月套餐金额" :disabled="true" />
          <van-field v-model="applyCardForm.cardMoney" label="卡片费用" :disabled="true" />
        </div>
      </van-form>
    </div>
    <div class="limit"></div>

    <!-- 余额充值 -->
    <div class="recharge-content">
      <div class="tit"><span class="borders"></span>余额充值</div>
      <div class="flex_content">
        <div class="priceItem" v-for="(item,id) in priceList" :key="id">
          <span v-show="!packagePrice || Number(item.price) >= Number(packagePrice)" class="item" :class="{'activeClass':chooseIndex === item.id}" @click="chooseIt(item)">￥{{item.price}}元</span>
          <span v-show="packagePrice && Number(item.price) < Number(packagePrice)" class="itemNo">￥{{item.price}}元</span>
        </div>
      </div>
    </div>
    <!-- <van-icon style="font-size: 14px;" name="cross" @click="clearXH" /> -->
    <!-- 支付 -->
    <div class="bottom_content">
      <div class="import_info">
        <van-checkbox v-model="ischecked" checked-color="#FFB525" icon-size="14px"></van-checkbox>
        我已同意并阅读<span style="color: #ffba26" @click="onClick_openAgreeBox">《学霸卡入网服务协议》</span>
      </div>
      <div class="pay_content">
        <span class="pay_text" :class="{chooseItActive:chooseMoneyText == '合计'}">
          {{chooseMoneyText}}
        </span>
        <span class="money">{{Number(chooseMoney)}}.00元 </span>
        <span class="pay_button" @click="payIt()" :class="{payItActive:chooseMoneyText == '合计'}">立即支付</span>
      </div>
    </div>

    <!-- 选择套餐弹出框 -->
    <van-dialog v-model="showPackageDialog" show-cancel-button class="mealContent" style="max-height: 500px;
    overflow-y: auto;" :beforeClose="beforeClose">
      <div class="tab-tilte">
        <span @click="cur=0" :class="{active:cur==0}">省内月套餐</span>
        <span @click="cur=1" :class="{active:cur==1}">全国月套餐</span>
      </div>
      <div class="tab-content">
        <div class="TabC" v-show="cur==0">
          <div v-if="packageListSN.length === 0">该省份无省内月套餐</div>
          <div class="tabItem" v-for="(item,key) in packageListSN" v-show="item.areaType ===0" :key="'A' + key" :class="{'activeList':chooseMealIndex === key}" @click="chooseMealList(item,key)">
            <div class=" list">
              <span class="text">{{item.name}}</span>
              <div class="price">
                <div class="newP">￥{{item.price}}/月</div>
                <div class="oldP">￥{{item.origPrice}}/月</div>
              </div>
            </div>
            <div class="packageTip">本套餐有效期为当月27号0点至次月26号23点59分59秒</div>
            <div class="borders" v-show="chooseMealIndex === key"></div>
          </div>
        </div>
        <div class="TabC" v-show="cur==1">
          <div v-if="packageListQG.length === 0">该省份无全国月套餐</div>
          <div class="tabItem" v-for="(item,key) in packageListQG" v-show="item.areaType ===1" :key="'B' + key" :class="{'activeList':chooseMealIndex === key}" @click="chooseMealList(item,key)">
            <div class=" list">
              <span class="text">{{item.name}}</span>
              <div class="price">
                <div class="newP">￥{{item.price}}/月</div>
                <div class="oldP">￥{{item.origPrice}}/月</div>
              </div>
            </div>
            <div class="packageTip">本套餐有效期为当月27号0点至次月26号23点59分59秒</div>
            <div class="borders" v-show="chooseMealIndex === key"></div>
          </div>
        </div>
      </div>
    </van-dialog>
    <!-- 成功之后 弹框提示 -->
    <van-dialog v-model="successDialog" title="温馨提示" class="mealContent" :before-close="successDialogButton">
      <div class="successBox">
        <p style="padding-bottom:5px;">您的学霸卡已申请成功，我们将会以最快的速度为您发货，请注意查收！</p>
        <p>非常感谢您的购买，收到学霸卡之后，请您 <span style="color:#F59A23" @click="activation">绑定学霸卡</span>并作<span style="color:#F59A23" @click="activateCard">实名认证</span>如有疑问，可随时联系客服，我们将会24小时为您服务。</p>
      </div>
    </van-dialog>
    <!-- 入网协议组件 -->
    <card-agreement ref="agreementRef"></card-agreement>
  </div>
</template>

<script>
import cardAgreement from '../applyCard/cardAgreement'
import API from './../../api/applyCard'
import Vue from 'vue'
import {
  Toast
} from 'vant'
Vue.use(Toast)
// import Dialog from 'vant'

export default {
  data () {
    return {
      // form 表单
      applyCardForm: {
        // 申请人姓名
        orderName: '',
        // 申请人手机
        orderPhone: '',
        // 套餐ID
        packageId: '',
        // 套餐归属省ID
        packageProvince: '',
        // 收货地址
        postAddrInfo: '',
        // 配送区域，只在页面显示 传省ID，市ID，县ID
        contactAreaCode: '',
        // 套餐金额，只在页面显示
        mealMoney: '',
        // 充值金额
        price: '',
        saleId: '',
        orderSource: '',
        channelId: '',
        cardMoney: '10.00元',
        // 商品id
        goodId: ''
      },
      cur: 0,
      value: '',
      // 区域匹配弹出层
      showArea: false,
      // 匹配区域
      areaList: [
        {
          values: '',
          className: 'column1'
        },
        {
          values: '',
          className: 'column2',
          defaultIndex: 0
        },
        {
          values: '',
          className: 'column3',
          defaultIndex: 0
        }
      ],
      // 获取套餐列表
      packageList: [],
      packageListSN: [],
      packageListQG: [],
      // 获取充值金额
      priceList: [],
      // 归属地列表
      TCprovincesList: [],
      chooseMoneyText: '未选择充值金额',
      chooseMoney: null,
      chooseIndex: null, // 充值金额的index
      chooseMealIndex: null, // 套餐选择的index
      chooseMealItem: null,
      // 套餐归属地 弹框
      showPicker: false,
      // 协议选择
      ischecked: true,
      // 套餐弹出框
      showPackageDialog: false,
      // 选择套餐、套餐金额 默认不显示
      isShow: false,
      // 支付成功后，弹框提醒
      successDialog: false,
      packagePrice: 0
    }
  },
  components: {
    cardAgreement
  },
  created () {
    // 获取省列表
    this.getProvincesList()
    // 获取归属地
    this.getProvinces()
    // 获取套餐信息
    this.getPriceList()
  },
  watch: {
    // 监听归属地值
    'applyCardForm.packageProvince': {
      handler (nVal) {
        if (nVal) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      }
    }
  },
  mounted() {
    history.pushState(null, null, document.URL)

    // history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  methods: {
    // 获取省    ----刘 20200802 省市县 级联，后台数据
    getProvincesList () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          const result = res.data
          this.areaList[0].values = Object.values(res.data).map(function (e) {
            return { text: e.name, code: e.id }
          })
          this.getCitiesList(result[0].id)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取市   ----刘 20200802 省市县 级联，后台数据
    getCitiesList (provinceId) {
      API.apiCitiesList(provinceId).then(res => {
        if (res.resultCode === 0) {
          const result = res.data
          this.areaList[1].values = Object.values(res.data).map(function (e) {
            return { text: e.name, code: e.id }
          })
          this.getDistrictsList(result[0].id)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取县/区   ----刘 20200802 省市县 级联，后台数据
    getDistrictsList (districtId) {
      API.apiDistrictsList(districtId).then(res => {
        if (res.resultCode === 0) {
          this.areaList[2].values = Object.values(res.data).map(function (e) {
            return { text: e.name, code: e.id }
          })
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // value=0改变省，1改变市，2改变区   ----刘 20200802 省市县 级联，后台数据
    onAreaChange (picker, index, value) {
      const val = picker.getValues()
      if (value === 0) {
        const parentCode = val[value].code
        this.getCitiesList(Number(parentCode))
      } else if (value === 1) {
        const parentCode = val[value].code
        this.getDistrictsList(Number(parentCode))
      }
    },
    // 点击确定按钮   ----刘 20200802 省市县 级联，后台数据
    onAddrAreaConfirm (e) {
      this.applyCardForm.contactAreaCode = `${e[0].text}${e[1].text}${e[2].text}`
      this.showArea = false
      this.postProvince = e[0].code
      this.postCity = e[1].code
      this.postDistrict = e[2].code
      // console.log(e)
    },
    // 点击取消按钮   ----刘 20200802 省市县 级联，后台数据
    onAreaCancel () {
      this.showArea = false
    },
    // 获取归属地
    getProvinces () {
      API.apiProvinces().then(res => {
        if (res.resultCode === 0) {
          this.TCprovincesList = res.data
          // console.log(this.TCprovincesList)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取套餐
    getPackageList () {
      const params = {
        provinceId: this.applyCardForm.packageProvinceId
      }
      API.apiPackageList(params).then(res => {
        if (res.resultCode === 0) {
          this.packageList = res.data
          // 筛选省内套餐
          this.packageListSN = this.packageList.filter(item => {
            return item.areaType === 0
          }).map(item => {
            return item
          })
          // 筛选全国套餐
          this.packageListQG = this.packageList.filter(item => {
            return item.areaType === 1
          }).map(item => {
            return item
          })
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取充值金额
    getPriceList () {
      API.apiPriceList().then(res => {
        if (res.resultCode === 0) {
          this.priceList = res.data
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 套餐归属地
    onConfirmTC (value) {
      // 将选中的文字和对应的id拿出来使用
      this.village_name = value.name
      this.village_id = value.id
      this.applyCardForm.packageProvince = this.village_name
      this.applyCardForm.packageProvinceId = this.village_id
      this.showPicker = false
      this.getPackageList()
    },
    // 监听归属地
    onPackageCancel () {
      this.showPicker = false
    },
    // 选择充值金额
    chooseIt (item) {
      if (this.applyCardForm.packageProvince === '') {
        this.$toast('请选择套餐归属地')
      } else if (this.applyCardForm.packageId === '') {
        this.$toast('请选择套餐')
      } else {
        this.chooseIndex = item.id
        this.chooseMoneyText = '合计'
        this.chooseMoney = item.price
      }
    },
    //  点击套餐选择input弹出弹框
    chooseMeal () {
      this.showPackageDialog = true
    },
    //  选择套餐
    chooseMealList (item, key) {
      this.chooseMealIndex = key
      this.chooseMealItem = item
    },
    // 套餐 确认 按钮
    beforeClose (action, done) {
      if (action === 'confirm') {
        // setTimeout(done)
        if (this.chooseMealItem === null) {
          this.$toast('请选择套餐')
          done(false)
        } else {
          const packageId = this.packageList.filter((item, index) => { return this.chooseMealIndex === index })
          this.applyCardForm.packageId = packageId[0].name
          this.applyCardForm.packageId1 = packageId[0].id
          this.applyCardForm.mealMoney = `${packageId[0].price}元`
          this.applyCardForm.goodId = packageId[0].goodId
          this.packagePrice = Number(packageId[0].price) + Number(10)
          this.showPackageDialog = false
          done() // 关闭
        }
      } else if (action === 'cancel') {
        done() // 关闭
      }
    },
    // 点击入网协议
    onClick_openAgreeBox () {
      this.$refs.agreementRef.showAgreement = true
    },
    //  立即支付
    payIt () {
      var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
      if (!this.applyCardForm.orderName) {
        this.$toast('申请人姓名不能为空，请输入您的真实姓名!')
        return false
      }
      if (!this.applyCardForm.orderPhone) {
        this.$toast('家长手机不能为空，请输入您的手机号!')
        return false
      }
      if (!reg.test(this.applyCardForm.orderPhone)) {
        this.$toast('手机号格式不正确')
        return false
      }
      if (!this.applyCardForm.contactAreaCode) {
        this.$toast('配送区域不能为空，请选择配送区域!')
        return false
      }
      if (!this.applyCardForm.postAddrInfo) {
        this.$toast('收货地址不能为空，请输入详细的配送地址!')
        return false
      }
      if (!this.applyCardForm.packageProvince) {
        this.$toast('套餐归属性地不能为空，请选择套餐归属地!')
        return false
      }
      if (!this.applyCardForm.packageId) {
        this.$toast('请选择套餐!')
        return false
      }
      if (!this.ischecked) {
        this.$toast('请同意协议！')
      } else {
        const config = {
          orderName: this.applyCardForm.orderName, // 申请人姓名
          orderPhone: this.applyCardForm.orderPhone, // 申请人手机
          postProvince: this.postProvince, // 配送省份
          postCity: this.postCity, // 配送城市
          postDistrict: this.postDistrict, // 配送区县
          postAddrInfo: this.applyCardForm.postAddrInfo, // 配送地址描述
          packageId: this.applyCardForm.packageId1, // 套餐ID
          goodId: this.applyCardForm.goodId,
          packageProvince: this.applyCardForm.packageProvinceId, // 套餐归属地
          price: this.chooseMoney, // 充值金额
          saleId: 1, // 销售人员ID
          orderSource: 1, // 订单来源
          type: 0, // 0为套餐订购 1为购买加油包
          status: 0,
          userId: 1 // 用户ID
        }
        // console.log(config)
        API.apiAddPackage(config).then(res => {
          if (res.resultCode === 0) {
            const uuid = res.data.orderUUid
            API.apiOrderOrderId().then(res => {
              const orderId = res.data
              const data = {
                body: '购买学霸卡',
                out_trade_no: res.data,
                total_fee: Number(this.chooseMoney) * 100
              }
              API.apiWXprepay(data).then(res => {
                if (res.resultCode === 0) {
                  this.weixinTradePay(res.data, orderId, uuid, () => {
                    this.$router.push({
                      path: '/seeOrder'
                    })
                  })
                } else {
                  this.$toast(res.resultInfo)
                  this.weixinTradePay(res.data, () => {
                    this.$router.push({
                      path: '/seeOrder'
                    })
                  })
                }
              })
            })
          } else {
            this.$toast(res.resultInfo)
            this.$dialog.confirm({
              title: '提醒',
              message: '您有未完成的订单，请您前往订单中查看'
            }).then(() => {
              this.$router.push({
                path: '/seeOrder'
              })
            }).catch(() => {
            })
          }
        })
      }
    },
    // 点击绑定学霸卡，跳转
    activation () {
      this.$router.push({
        path: '/activation'
      })
    },
    // 点击实名认证
    activateCard () {
      this.$router.push({
        path: '/activateCard'
      })
    },
    successDialogButton (action, done) {
      if (action === 'confirm') {
        this.$router.push({
          path: '/seeOrder'
        })
        this.successDialog = false
      } else {
        done()
      }
    },
    weixinJSBridgeReady (callback) {
      // 如果jsbridge已经注入则直接调用
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', callback, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', callback)
          document.attachEvent('onWeixinJSBridgeReady', callback)
        }
      } else {
        callback && callback()
      }
    },
    // 发起支付
    weixinTradePay (obj, orderId, uuid, $routerFun) {
      const self = this
      this.weixinJSBridgeReady(function () {
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            appId: obj.appId, // 公众号名称，由商户传入
            timeStamp: obj.timeStamp, // 时间戳，自1970年以来的秒数
            nonceStr: obj.nonceStr, // 随机串
            package: obj.pkg,
            signType: obj.signType, // 微信签名方式:
            paySign: obj.paySign // 微信签名
          },
          function (result) {
            if (result.err_msg === 'get_brand_wcpay_request:ok') {
              const data = {
                uuid: uuid,
                orderId: orderId
              }
              API.apiOrdersPayedStatus(data).then(res => {
                if (res.resultCode === 0) {
                  Toast('支付成功！')
                  $routerFun()
                  self.$router.replace({ path: '/seeOrder' })
                } else {
                  Toast(res.resultInfo)
                }
              })
            } else if (result.err_msg === 'get_brand_wcpay_request:cancel') {
              self.$dialog.confirm({
                title: '提醒',
                message: '是否放弃本次支付？',
                confirmButtonText: '确定',
                cancelButtonText: '继续支付'
              }).then(() => {
                self.$router.replace({ path: '/seeOrder' })
              }).catch(() => {
              })
            } else {
              self.$toast('支付失败')
              const data = {
                uuid: uuid,
                orderId: orderId
              }
              API.apiOrdersPayedfaildStatus(data).then(res => {
                if (res.resultCode === 0) {
                  self.$router.replace({ path: '/seeOrder' })
                } else {
                  self.$toast(res.resultInfo)
                }
              })
            }
          }
        )
      })
    },
    clearXH () {
      sessionStorage.clear('token')
      // const data = {
      //   body: '购买学霸卡',
      //   out_trade_no: '20200803094409805101',
      //   total_fee: 100
      // }
      // API.apiWXprepay(data).then(res => {
      //   if (res.resultCode === 0) {
      //     this.weixinTradePay(res.data, () => {
      //       this.$router.push({
      //         path: '/seeOrder'
      //       })
      //     })
      //   } else {
      //     this.$toast(res.resultInfo)
      //   }
      // })
    }
  }
}
</script>

<style lang="less">
@import url(../../common/css/applyCard.less);
.fieldMoney {
  width: 100px;
  text-align: right;
}
.van-field__control:disabled {
  color: #323233;
}
</style>
