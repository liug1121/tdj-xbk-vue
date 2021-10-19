<template>
  <!-- 加油包 -->
  <div class="refueling_info">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="g-tips" style="position: fixed;z-index:10;top:0;">当月1号至26号购买加油包当月27号0点失效，27号至月底购买加油包下月27号0点失效。</div>

    <div class="g-card">
      <div class="card-info">
        <div class="person-box">
          <div class="person-logo">
            <img v-if="OrdersDetails.iconUrl === ''" :src="imageUrls" alt="用户头像">
            <img v-else :src="OrdersDetails.iconUrl" alt="用户头像">
          </div>
          <div class="person-name">{{OrdersDetails.studentName}}</div>
        </div>

        <div class="info-box">
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">手机号:</div>
            <span>{{OrdersDetails.cardNo}}</span>
          </div>
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">ICCID:</div>
            <span>{{OrdersDetails.iccid}}</span>
          </div>
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">当前余额:</div>
            <span>{{OrdersDetails.remainPrice}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 语音、短信、全国流量等列表 -->
    <div class="refueling-box">
      <!-- <div class="refueling-item" v-show="typeVoiceShow === 1 && packList.length!==0">
        <div class="refueling-title">语音</div>
        <div class="refueling-list" v-for="(item,index) of packList" v-show="item.type===3" :key="index">
          <div class="package-category">{{item.packageName}}</div>
          <div class="package-price">
            <span class="price-new">￥{{item.price}}</span>
            <span class="price-old">￥{{item.originalPrice}}</span>
          </div>
          <div class="choice-num" v-if="isreload">
            <span class="subtract" v-show="packNumObj[index]" @click="onClick_del(index,item)"></span>
            <span class="num">{{packNumObj[index]?packNumObj[index].num:''}}</span>
            <span class="add" @click.stop="onClick_add(index,item)"></span>
          </div>
        </div>
      </div> -->

      <!-- <div class="refueling-item" v-show="typeShow === 2 && packList.length!==0">
        <div class="refueling-title">短信</div>
        <div class="refueling-list" v-for="(item,index) of packList" v-show="item.type===2" :key="index">
          <div class="package-category">{{item.packageName}}</div>
          <div class="package-price">
            <span class="price-new">￥{{item.price}}</span>
            <span class="price-old">￥{{item.originalPrice}}</span>
          </div>
          <div class="choice-num" v-if="isreload">
            <span class="subtract" v-show="packNumObj[index]" @click="onClick_del(index,item)"></span>
            <span class="num">{{packNumObj[index]?packNumObj[index].num:''}}</span>
            <span class="add" @click.stop="onClick_add(index,item)"></span>
          </div>
        </div>
      </div> -->

      <div class="refueling-item" v-show="packList.length!==0">
        <div class="refueling-title">可订购的加油包</div>
        <div class="refueling-list" v-for="(item,index) of packList" :key="index">
          <div class="package-category">{{item.packageName}}</div>
          <div class="package-price">
            <span class="price-new">￥{{item.price}}</span>
            <span class="price-old">￥{{item.originalPrice}}</span>
          </div>
          <div class="choice-num" v-if="isreload">
            <span class="subtract" v-show="packNumObj[index]" @click="onClick_del(index,item)"></span>
            <span class="num">{{packNumObj[index]?packNumObj[index].num:''}}</span>
            <span class="add" @click.stop="onClick_add(index,item)"></span>
          </div>
        </div>
      </div>

      <!-- <div class="refueling-item" v-show="typeProvinceDataShow === 1 && packList.length!==0">
        <div class="refueling-title">省内流量</div>
        <div class="refueling-list" v-for="(item,index) of packList" v-show="item.type===0" :key="index">
          <div class="package-category">{{item.packageName}}</div>
          <div class="package-price">
            <span class="price-new">￥{{item.price}}</span>
            <span class="price-old">￥{{item.originalPrice}}</span>
          </div>
          <div class="choice-num" v-if="isreload">
            <span class="subtract" v-show="packNumObj[index]" @click="onClick_del(index,item)"></span>
            <span class="num">{{packNumObj[index]?packNumObj[index].num:''}}</span>
            <span class="add" @click.stop="onClick_add(index,item)"></span>
          </div>
        </div>
      </div> -->

    </div>

    <!-- 支付 -->
    <div class="refueling-bottom">
      <div class="refualing-tx" v-show="notEnough">当前余额不够购买当前所选商品，请前去充值</div>
      <div class="pay_content">
        <div class="price-total" @click="onClick_showAllPkg">
          <span class="price-new">￥{{xAllAmount.toFixed(2)}}</span>
          <span class="price-old">￥{{yAllAmount.toFixed(2)}}</span>
        </div>
        <div class="shoppingCart">
          <van-icon class="shoppingIcon" name="shopping-cart" :badge="allNum" size="35" @click="onClick_showAllPkg" />
        </div>
        <span class="pay_button" @click="onClick_pay" v-show="!notEnough">立即订购</span>
        <div class="pay_button" style="background:#ff5e4b" @click="onClick_goRecharge" v-show="notEnough">立即充值</div>
      </div>
    </div>
    <!-- 点击购物车 -->
    <van-popup v-model="isShowallPkg" round position="bottom" :style="{ height: '300px' }">
      <div style="margin:.3rem 0;height: .5rem;width: 95%;text-align: right;padding-right: .3rem;font-size: .3rem;color: red;">
        <span @click="onClick_removeCar">
          <van-icon name="delete" />清空购物车
        </span>
      </div>
      <div class="next-month-box" v-for="(item,index) of packNumObj" v-show="isreload" :key="index">
        <div class="refueling-list" v-if="isreload">
          <div class="package-category">{{item.packageName}}</div>
          <div class="package-price">
            <span class="price-new">￥{{item.price}}</span>
            <span class="price-old">￥{{item.originalPrice}}</span>
          </div>
          <div class="choice-num" v-if="isreload">
            <span class="subtract" v-show="packNumObj[index]" @click="onClick_del(index,item)">-</span>
            <span class="num">{{packNumObj[index]?packNumObj[index].num:''}}</span>
            <span class="add" @click="onClick_add(index,item)">+</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
// import BuyPackgeModle from './buyPackgeModle.js'
// import residueModel from './residue.js'
import imageUrls from 'common/images/icon-user.png'
import API from 'api/consumption'
let addPackageIds = []
export default {
  data () {
    return {
      // headerName: '加油包',
      // 卡详情
      OrdersDetails: {},
      imageUrls,
      // 加油包列表
      packList: [],
      addPackageIds: [],
      // 购物车列表
      packNumObj: {
        packageName: '',
        price: '',
        originalPrice: ''
      },
      notEnough: false,
      isreload: true,
      xAllAmount: 0,
      yAllAmount: 0,
      voiceTotal: 0,
      allNum: 0,
      isShowallPkg: false
    }
  },
  components: {
    // vHeader
  },
  created () {
    this.OrdersDetails = JSON.parse(sessionStorage.getItem('OrdersDetails'))
    this.remainPrice = this.OrdersDetails.remainPrice
    const remainPriceNum = this.remainPrice.replace(/[^-0-9\\.\\^0-9]/ig, '')
    this.remainPriceNum = Number(remainPriceNum)
    // console.log(this.remainPriceNum)
    if (Number(this.xAllAmount) <= Number(this.remainPriceNum)) {
      this.notEnough = false
    } else {
      this.notEnough = true
    }
    this.getPackList(() => {
      var currCar = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('currIccid'))) || {}

      this.packNumObj = currCar.packNumObj || {}
      this.xAllAmount = currCar.xAllAmount || 0
      this.yAllAmount = currCar.yAllAmount || 0
      this.allNum = currCar.allNum || 0

      if (Number(this.xAllAmount) <= Number(this.remainPriceNum)) {
        this.notEnough = false
      } else {
        this.notEnough = true
      }
    })
  },
  methods: {
    // 获取加油包列表 packList
    getPackList () {
      const params = {
        cardNo: this.OrdersDetails.cardNo
      }
      API.apiPackList(params).then(res => {
        if (res.resultCode === 0) {
          this.packList = res.data
          this.packNumObj = {}
          this.addPackageIds = []
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    trimSpace (array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === '' || typeof (array[i]) === 'undefined') {
          array.splice(i, 1)
          i = i - 1
        }
      }
      return array
    },
    // 减去
    onClick_del ($index, $item) {
      if (this.packNumObj[$index].num !== 1) {
        this.packNumObj[$index].num--
      } else {
        delete this.packNumObj[$index]
      }
      this.packNumObj = this.trimSpace(this.packNumObj)
      // console.log(this.packNumObj)
      addPackageIds.shift($item.goodId)
      // console.log(addPackageIds)
      this.xAllAmount = this.xAllAmount - Number($item.price)
      this.voiceTotal = this.voiceTotal - Number($item.voiceTotal)
      this.yAllAmount = this.yAllAmount - Number($item.originalPrice)
      if (this.xAllAmount === 0) {
        this.isShowallPkg = false
      }
      this.isreload = false
      this.isreload = true
      this.allNum--
      // console.log(this.remainPriceNum)
      if (this.xAllAmount <= this.remainPriceNum) {
        this.notEnough = false
      } else {
        this.notEnough = true
      }
      var storageObj = {
        packNumObj: this.packNumObj,
        xAllAmount: this.xAllAmount,
        yAllAmount: this.yAllAmount,
        allNum: this.allNum,
        iccid: sessionStorage.getItem('currIccid')
      }
      sessionStorage.setItem(sessionStorage.getItem('currIccid'), JSON.stringify(storageObj))
    },
    // 增加
    onClick_add ($index, $item) {
      // console.log($index)
      if (Number($item.voiceTotal) > 0) {
        const voiceTotal = this.voiceTotal + Number($item.voiceTotal)
        if (voiceTotal + this.OrdersDetails.intVoiceBalance > 100) {
          this.$toast('语音可用总量不能超过100分钟')
          return
        }
        this.voiceTotal = this.voiceTotal + Number($item.voiceTotal)
      }
      if (!this.packNumObj[$index]) {
        $item.num = 0
        this.packNumObj[$index] = $item
      }
      if (this.packNumObj[$index].num) {
        this.packNumObj[$index].num++
      } else {
        this.packNumObj[$index].num = 1
      }
      this.packNumObj = this.trimSpace(this.packNumObj)
      addPackageIds.unshift($item.goodId)
      this.allNum++
      this.xAllAmount = this.xAllAmount + Number($item.price)
      this.yAllAmount = this.yAllAmount + Number($item.originalPrice)
      this.isreload = false
      this.isreload = true
      if (this.xAllAmount > this.remainPriceNum) {
        this.notEnough = true
      } else {
        this.notEnough = false
      }
      var storageObj = {
        packNumObj: this.packNumObj,
        xAllAmount: this.xAllAmount,
        yAllAmount: this.yAllAmount,
        allNum: this.allNum,
        iccid: sessionStorage.getItem('currIccid')
      }
      sessionStorage.setItem(sessionStorage.getItem('currIccid'), JSON.stringify(storageObj))
    },
    // 点击购物车，出现选中套餐列表
    onClick_showAllPkg () {
      if (this.xAllAmount !== 0) {
        this.isShowallPkg = !this.isShowallPkg
      }
    },
    // 清空购物车
    onClick_removeCar () {
      this.packNumObj = {}
      addPackageIds = []
      this.xAllAmount = 0
      this.yAllAmount = 0
      this.allNum = 0
      this.isShowallPkg = false
      this.notEnough = false
      sessionStorage.removeItem('packNumObj')
      sessionStorage.removeItem('xAllAmount')
      sessionStorage.removeItem('yAllAmount')
      sessionStorage.removeItem('allNum')
    },
    onClick_goRecharge () {
      this.$dialog.confirm({
        title: '提醒',
        message: '余额不足，请您前往用量中心-余额充值中充值'
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
    // 提交加油包
    onClick_pay () {
      if (this.allNum !== 0) {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确认要购买此加油包！'
        }).then(() => {
          const config = {
            cardNo: this.OrdersDetails.cardNo,
            addPackageIds: addPackageIds,
            price: this.xAllAmount
          }
          // console.log(config)
          API.apiRefuelingAdd(config).then(res => {
            if (res.resultCode === 0) {
              this.$toast('加油包购买成功！')
              this.onClick_removeCar()
              this.$router.push({
                path: '/consumption'
              })
            } else {
              this.$toast(res.resultInfo)
            }
          })
        }).catch(() => {
        })
      } else {
        this.$toast('您当前还没有选购加油包哦，快去选购吧～')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/refueling.less);
</style>
