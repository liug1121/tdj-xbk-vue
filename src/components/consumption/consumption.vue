<template>
  <!-- 学霸卡用量 -->
  <div class="consumption_info">
    <!-- <v-header :headerName="headerName"></v-header> -->

    <div class="g-card" v-show="isShowAll">
      <div class="card-change" @click="xbkChange">切换学霸卡<span></span></div>
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

    <div class="usage-box" v-show="isShowAll">
      <div class="usage-item-box">
        <div class="usage-item" v-show="voiceShow">
          <van-circle v-model="currentRate" :rate="Number(voicePercent)" :speed="Number(voiceB)" layer-color="#ebedf0" size="90px" :color="bodyColor">
            <div class="progressBox">
              <div class="progressSurplus">{{OrdersDetails.voiceRemain}}</div>
              <div class="progressTxt">剩余语音</div>
            </div>
          </van-circle>
        </div>
        <div class="usage-item" v-show="smsShow">
          <van-circle v-model="currentRate1" :rate="Number(smsPercent)" :speed="Number(smsB)" layer-color="#ebedf0" size="90px" :color="bodyColor">
            <div class="progressBox">
              <div class="progressSurplus">{{OrdersDetails.smsRemain}}</div>
              <div class="progressTxt">剩余短信</div>
            </div>
          </van-circle>
        </div>
        <div class="usage-item" v-show="netWorkShow">
          <van-circle v-model="currentRate2" :rate="Number(flowPercent)" :speed="Number(netWorkB)" layer-color="#ebedf0" size="90px" :color="bodyColor">
            <div class="progressBox">
              <div class="progressSurplus">{{OrdersDetails.networkRemain}}</div>
              <div class="progressTxt">剩余{{OrdersDetails.networkTypeName}}</div>
            </div>

          </van-circle>
        </div>
      </div>
      <div class="tips">
        *温馨提示：语音、短信、上网流量本月27号零点清零
      </div>
    </div>
    <div class="limit" v-show="isShowAll"></div>
    <div class="usage-tab-box" v-show="isShowAll">
      <van-tabs v-model="active" swipeable line-width="20%" :color="bodyColor" title-active-color="#E4C951" @click="handleClick">
        <van-tab title="当前套餐" name="package">
          <div class="package-box" v-for="ValidItem in UsageinfosValid" :key="ValidItem.cardAddPackageBalanceId">
            <div class="package-current">
              <div class="package-xx">{{ValidItem.packageName}}</div>
              <div v-if="ValidItem.packageType === 1" class="package-T-data">生效日期：{{ValidItem.startDate}}</div>
              <div v-if="ValidItem.payType === 1 " class="package-zdxq">自动续期</div>
              <div v-if="ValidItem.payType === 1" class="package-ts" @click="RenewalDescriptionShow">!</div>
            </div>
            <div class="package-data" v-if="ValidItem.packageType === 0">
              <div class="package-data-text">
                <p>生效时间</p>
                <p>{{ValidItem.startDate}}</p>
              </div>
              <div class="package-data-center">至</div>
              <div class="package-data-text">
                <p>失效时间</p>
                <p>{{ValidItem.endDate}}</p>
              </div>
            </div>
            <div class="package-item" v-if="ValidItem.dataTotal !==0">
              <div class="package-surplus-box">
                <div class="package-total" v-if="ValidItem.areaType === 1  && ValidItem.packageType ===0">全国流量共{{ValidItem.dataTotal}}M/{{ValidItem.clearCycle}}个月<span> (已用{{ValidItem.dataUsed}}M)</span></div>
                <div class="package-total" v-if="ValidItem.areaType === 1 && ValidItem.packageType ===1">全国流量共{{ValidItem.dataTotal}}M<span> (已用{{ValidItem.dataUsed}}M)</span></div>
                <div class="package-total" v-if="ValidItem.areaType === 0 && ValidItem.packageType ===0">{{ValidItem.province}}省内流量共{{ValidItem.dataTotal}}M/{{ValidItem.clearCycle}}个月<span>
                    (已用{{ValidItem.dataUsed}}M)</span></div>
                <div class="package-total" v-if="ValidItem.areaType === 0  && ValidItem.packageType ===1">{{ValidItem.province}}省内流量共{{ValidItem.dataTotal}}M<span> (已用{{ValidItem.dataUsed}}M)</span></div>
                <div class="package-surplus">剩余<span>{{ValidItem.dataTotal - ValidItem.dataUsed}}M</span></div>
              </div>
              <van-progress :percentage="ValidItem.dataUsedPercentage" :color="bodyColor" pivot-text="" stroke-width="5" />
            </div>

            <div class="package-item" v-if="ValidItem.voiceTotal !== 0">
              <div class="package-surplus-box">
                <div class="package-total" v-if="ValidItem.packageType ===0">语音共{{ValidItem.voiceTotal}}分钟/{{ValidItem.clearCycle}}个月<span> (已用{{ValidItem.voiceUsed}}分钟)</span></div>
                <div class="package-total" v-if="ValidItem.packageType ===1">语音共{{ValidItem.voiceTotal}}分钟<span> (已用{{ValidItem.voiceUsed}}分钟)</span></div>
                <div class="package-surplus">剩余<span>{{ValidItem.voiceTotal - ValidItem.voiceUsed}}分钟</span></div>
              </div>
              <van-progress :percentage="ValidItem.voiceUsedPercentage" :color="bodyColor" pivot-text="" stroke-width="5" />
            </div>

            <div class="package-item" v-if="ValidItem.smsTotal !== 0">
              <div class="package-surplus-box">
                <div class="package-total">短信共{{ValidItem.smsTotal}}条/{{ValidItem.clearCycle}}个月<span> (已用{{ValidItem.smsUsed}}条)</span></div>
                <div class="package-surplus">剩余<span>{{ValidItem.smsTotal - ValidItem.smsUsed}}条</span></div>
              </div>
              <van-progress :percentage="0" :color="bodyColor" pivot-text="" stroke-width="5" />
            </div>
          </div>
          <div class="limit" v-show="isShowAll" style="padding:0 15px;box-sizing: border-box;"></div>
          <div class="replace-package">
            <div class="replace-title">
              <span>未生效已订购套餐</span>
            </div>
            <div class="noPackage" v-if="UsageinfosValidNo.length === 0 && longTermPackage.length === 0">暂无未生效套餐，如需要可以去<span class="goPackage" @click="goPackageAdd">订购套餐</span></div>
            <div class="noPackageList" v-for="validListItem in longTermPackage" :key="validListItem.cardAddPackageBalanceId" v-show="UsageinfosValidNo.length === 0">
              <div class="package-current">
                <div class="package-xx">{{validListItem.packageName}}</div>
                <div class="package-zdxq">自动续期</div>
                <div class="package-ts" @click="RenewalDescriptionShow">!</div>
              </div>
              <div class="package-data">
                <div class="package-data-text">
                  <p>生效时间</p>
                  <p>{{validListItem.startDate}}</p>
                </div>
                <div class="package-data-center">至</div>
                <div class="package-data-text">
                  <p>失效时间</p>
                  <p>{{validListItem.endDate}}</p>
                </div>
              </div>
              <div class="package-SM">语音：{{validListItem.voiceTotal}} 分钟/{{validListItem.clearCycle}}个月</div>
              <div class="package-SM" v-if="validListItem.areaType === 0">{{validListItem.province}}省内流量：{{validListItem.dataTotal}} M/{{validListItem.clearCycle}}个月</div>
              <div class="package-SM" v-if="validListItem.areaType === 1">全国流量：{{validListItem.dataTotal}} M/{{validListItem.clearCycle}}个月</div>
              <!-- <div class="s-change" @click="onClick_changeMeal(validListItem.cardAddPackageBalanceId)">
                <span></span>
                更换套餐
              </div> -->
              <div class="buttonBox">
                <div class="changeButoon" @click="onClick_changeMeal(validListItem.cardAddPackageBalanceId)">更换套餐</div>
                <div class="delButton" @click="onClick_del(validListItem.cardAddPackageBalanceId)">取消订购</div>
              </div>
            </div>
            <div class="noPackageList" v-for="ValidNoItem in UsageinfosValidNo" :key="ValidNoItem.cardAddPackageBalanceId">
              <div class="package-current">
                <div class="package-xx">{{ValidNoItem.packageName}}</div>
                <div v-if="ValidNoItem.payType === 1" class="package-zdxq">自动续期</div>
                <div v-if="ValidNoItem.payType === 1" class="package-ts" @click="RenewalDescriptionShow">!</div>
              </div>
              <div class="package-data">
                <div class="package-data-text">
                  <p>生效时间</p>
                  <p>{{ValidNoItem.startDate}}</p>
                </div>
                <div class="package-data-center">至</div>
                <div class="package-data-text">
                  <p>失效时间</p>
                  <p>{{ValidNoItem.endDate}}</p>
                </div>
              </div>
              <div class="package-SM">语音：{{ValidNoItem.voiceTotal}} 分钟/{{ValidNoItem.clearCycle}}个月</div>
              <div class="package-SM" v-if="ValidNoItem.areaType === 0">{{ValidNoItem.province}}省内流量：{{ValidNoItem.dataTotal}} M/{{ValidNoItem.clearCycle}}个月</div>
              <div class="package-SM" v-if="ValidNoItem.areaType === 1">全国流量：{{ValidNoItem.dataTotal}} M/{{ValidNoItem.clearCycle}}个月</div>
              <div class="buttonBox">
                <div v-if="ValidNoItem.payType === 1" class="changeButoon" @click="onClick_changeMeal(ValidNoItem.cardAddPackageBalanceId,ValidNoItem.payType)">更换套餐</div>
                <div v-if="ValidNoItem.payType === 1" class="delButton" @click="onClick_del(ValidNoItem.cardAddPackageBalanceId)">取消订购</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="套餐订购" name="editPackage">
          <div class="change-package-box">
            <div class="usage-tx">当月1号至26号更换套餐当月27号0点生效，27至月底更换套餐下月27号0点生效</div>
            <div class="tab-tilte">
              <span v-if="packageListSN.length !== 0" @click="cur=0" :class="{active:cur==0}">省内月套餐</span>
              <span v-if="packageListQG.length !== 0" @click="cur=1" :class="{active:cur==1}">全国月套餐</span>
            </div>
            <div v-show="cur==0 && packageListSN.length !== 0">
              <div class="usage-item" v-for="(item,key) in packageListSN" :key="key" @click="onClick_selectPackage(item)">
                <div class="usage-item-con">
                  <span class="usage-flowrate">{{item.name}}</span>
                  <span v-if="item.payType === 1" class="package-zdxq">自动续期</span>
                  <span v-if="item.payType === 1" class="package-ts" @click="RenewalDescriptionShow">!</span>
                  <span class="usage-money-box">
                    <span v-if="item.payType === 1 && item.validMonth === 1" class="money-new">￥{{item.price}}/月</span>
                    <span v-if="item.payType === 1 && item.validMonth !== 1" class="money-new">￥{{item.price}}/{{item.validMonth}}个月</span>
                    <span v-if="item.payType === 0" class="money-new">￥{{item.price}}</span>
                    <span v-if="item.payType === 1 && item.validMonth === 1" class="money-old">￥{{item.origPrice}}/月</span>
                    <span v-if="item.payType === 1 && item.validMonth !== 1" class="money-old">￥{{item.origPrice}}/{{item.validMonth}}个月</span>
                    <span v-if="item.payType === 0" class="money-old">￥{{item.origPrice}}</span>
                  </span>
                </div>
                <div>语音：<span class="usage-num">{{item.voiceBalance}}</span> 分钟/{{item.clearCycle}}个月</div>
                <div v-if="item.areaType === 0">省内流量：<span class="usage-num">{{item.netBalance}}</span> M/{{item.clearCycle}}个月 ({{item.province}})</div>
                <div v-if="item.areaType === 1">全国流量：<span class="usage-num">{{item.netBalance}}</span> M/{{item.clearCycle}}个月</div>
                <div>套餐有效期：<span class="usage-num">{{item.validMonth}}</span> 月</div>
                <!-- <div class="packageTip">本套餐有效期为当月27号0点至次月26号23点59分59秒</div> -->
              </div>
              <div class="noPackage" v-if="packageListSN.length === 0">暂无省内流量套餐</div>
            </div>
            <div v-show="cur==1 && packageListQG.length !== 0">
              <div class="usage-item" v-for="(item,key) in packageListQG" :key="key" @click="onClick_selectPackage(item)">
                <div class="usage-item-con">
                  <span class="usage-flowrate">{{item.name}}</span>
                  <span v-if="item.payType === 1" class="package-zdxq">自动续期</span>
                  <span v-if="item.payType === 1" class="package-ts" @click="RenewalDescriptionShow">!</span>
                  <span class="usage-money-box">
                    <span v-if="item.payType === 1 && item.validMonth === 1" class="money-new">￥{{item.price}}/月</span>
                    <span v-if="item.payType === 1 && item.validMonth !== 1" class="money-new">￥{{item.price}}/{{item.validMonth}}个月</span>
                    <span v-if="item.payType === 0" class="money-new">￥{{item.price}}</span>
                    <span v-if="item.payType === 1 && item.validMonth === 1" class="money-old">￥{{item.origPrice}}/月</span>
                    <span v-if="item.payType === 1 && item.validMonth !== 1" class="money-old">￥{{item.origPrice}}/{{item.validMonth}}个月</span>
                    <span v-if="item.payType === 0" class="money-old">￥{{item.origPrice}}</span>
                  </span>
                </div>
                <div>语音：<span class="usage-num">{{item.voiceBalance}}</span> 分钟/{{item.clearCycle}}个月</div>
                <div v-if="item.areaType === 0">省内流量：<span class="usage-num">{{item.netBalance}}</span> M/{{item.clearCycle}}个月({{item.province}})</div>
                <div v-if="item.areaType === 1">全国流量：<span class="usage-num">{{item.netBalance}}</span> M/{{item.clearCycle}}个月</div>
                <div>套餐有效期：<span class="usage-num">{{item.validMonth}}</span> 月</div>
                <!-- <div class="packageTip">本套餐有效期为当月27号0点至次月26号23点59分59秒</div> -->
              </div>
              <div class="noPackage" v-if="packageListQG.length === 0">暂无全国流量套餐</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="余额充值" name="rechargeTab">
          <div class="amount-recharge-box">
            <div class="priceItem" v-for="(item,id) in priceList" :key="id" @click="recharge(item)">
              <span class="item">￥{{item.price}}元</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="加油包" name="refueling">
        </van-tab>
      </van-tabs>
    </div>
    <!-- 切换学霸卡 弹框 -->
    <van-dialog v-model="showCardDialog" class="mealContent">
      <div class="cardChangeBox">
        <div class="cardChangeItem" v-for="item in cardList" :key="item.iccid" @click="cardChange(item.cardNo,item.province)">
          <div class="cardImg">
            <img v-if="item.iconUrl === ''" :src="imageUrls" alt="用户头像">
            <img v-else :src="item.iconUrl" alt="">
          </div>
          <div class="cardName">
            <span>{{item.studentName}} </span>
            <span v-if="item.status === 0">未实名</span>
            <span v-else-if="item.status === 1">已实名</span>
            <span v-else>已激活</span>
          </div>
          <div class="cardNumber">
            <!-- <div>{{item.iccid}}</div> -->
            <div>{{item.cardNo}}</div>
          </div>
        </div>
      </div>
    </van-dialog>
    <!-- 更换套餐确认弹出框 -->
    <van-dialog v-model="isCheckChange" show-cancel-button class="mealContent" :beforeClose="onClick_buyPkg">
      <div class="packageChangeBox">
        <div class="packageTitle">更换套餐确认</div>
        <div class="g_meal">
          <div class="change-pak-title">是否确认更换为</div>
          <div class="set-meal-title">{{selectePackage.name}}</div>
        </div>
      </div>
    </van-dialog>
    <div v-show="!isShowAll" style="text-align: center;height:100%;margin-top: 3rem;font-size: .4rem;line-height: .6rem">
      <div>您当前暂无学霸卡,</div>
      <div>
        现在去<span style="color: rgb(255, 186, 40)" @click="onClick_goPage2('applyCard')">申请</span>或<span style="color: rgb(255, 186, 40);" @click="onClick_goPage2('activation')">激活</span>。
      </div>
    </div>
    <!-- 自动续期说明弹出框 -->
    <el-dialog title="" :visible.sync="RenewalDescription" width="90%">
      <div class="RenewalDescription">
        <p class="RenewalDescriptionTitle">自动续期套餐规则说明</p>
        <p class="RenewalDescriptionText">1. 当用户无其它任何未生效套餐时，自动续期套餐当期有效期结束后系统会按照本套餐内容自动订购下一个计费周期，并在新一期套餐开始生效时扣除对应的套餐费用；</p>
        <p class="RenewalDescriptionText">2. 请注意账户余额，避免由于余额不足导致欠费；</p>
        <p class="RenewalDescriptionText">3. 用户可以在”套餐订购“页面更换下一期自动续期套餐的内容；</p>
        <p class="RenewalDescriptionText">4. 当用户的未生效套餐中同时包含普通套餐及自动续期套餐时，自动续期套餐会在所有普通套餐失效后才生效；</p>
        <p class="RenewalDescriptionText">5. 用户所有未生效套餐中最多只能有一个自动续期套餐；</p>
        <p class="RenewalDescriptionText">6. 如用户当前未生效套餐中有普通套餐时，则未生效的自动续费套餐生效时间为所有普通套餐结束后的第二天；</p>
        <p class="RenewalDescriptionText">7. 如用户当前未生效套餐中没有普通套餐，则未生效的自动续费套餐生效时间为当前套餐计费周期结束后的第二天；</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RenewalDescriptionClose" type="goon">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
import imageUrls from 'common/images/icon-user.png'
import API from 'api/consumption'
import ZFAPI from 'api/applyCard'
import Toast from 'vant'
export default {
  data () {
    return {
      // headerName: '学霸卡用量',
      imageUrls,
      cur: 0,
      cardList: [],
      OrdersDetails: {},
      UsageinfosDetails: [],
      UsageinfosValid: [],
      UsageinfosValidNo: [],
      validList: [],
      longTermPackage: [],
      // 套餐 list
      packageList: [],
      packageListSN: [],
      packageListQG: [],
      voiceT: '',
      voiceR: '',
      voiceB: '',
      voicePercent: '',
      smsT: '',
      smsR: '',
      smsB: '',
      smsPercent: '',
      netWorkT: '',
      netWorkR: '',
      netWorkB: '',
      flowPercent: '',
      currentRate: 0,
      currentRate1: 0,
      currentRate2: 0,
      selectePackage: {},
      smsCode: '',
      smsTime: 60,
      isSecond: false,
      // 金额列表
      priceList: [],
      // 默认绑定第一个 tab 0为1
      active: 0,
      bodyColor: '#FDAB16',
      // 切换学霸卡 模态框
      showCardDialog: false,
      isCheckChange: false,
      isShowAll: true,
      netWorkShow: true,
      voiceShow: true,
      smsShow: true,
      RenewalDescription: false,
      cardChangePackageId: null,
      cardCurrentPackageId: null,
      payType: null,
      UsageinfosValidNoPayType: []
    }
  },
  components: {
    // vHeader
  },
  created () {
    if (this.$route.query.status === 2) {
      this.active = 'rechargeTab'
    }
    this.getCardList()
    this.getPriceList()
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
            const provinceId = JSON.parse(sessionStorage.getItem('provinceId'))
            const cardNo = JSON.parse(sessionStorage.getItem('cardNo'))
            if (cardNo === '' || cardNo === null || cardNo === undefined || provinceId === '' || provinceId === null || provinceId === undefined) {
              sessionStorage.setItem('cardNo', JSON.stringify(res.data[0].cardNo))
              const cardNo = JSON.parse(sessionStorage.getItem('cardNo'))
              this.getOrdersDetails(cardNo)
              this.getUsageinfosDetails(cardNo)
              this.getPackageList(cardNo)
              this.getPriceList(cardNo)
            } else {
              this.getOrdersDetails(cardNo)
              this.getUsageinfosDetails(cardNo)
              this.getPackageList(cardNo)
              this.getPriceList(cardNo)
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
    // 点击卡列表
    cardChange (id, $provinceId) {
      sessionStorage.setItem('cardNo', JSON.stringify(id))
      sessionStorage.setItem('provinceId', JSON.stringify($provinceId))
      // const provinceId = JSON.parse(sessionStorage.getItem('provinceId'))
      const cardNo = JSON.parse(sessionStorage.getItem('cardNo'))
      this.showCardDialog = false
      this.getOrdersDetails(cardNo)
      this.getUsageinfosDetails(cardNo)
      this.getPackageList(cardNo)
      this.getPriceList(cardNo)
    },
    // 获取详情数据
    getOrdersDetails ($cardNo) {
      const cardNo = $cardNo
      API.apiOrdersDetails(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.OrdersDetails = res.data
          this.replaceNum()
          if (this.netWorkB > 0) {
            this.netWorkShow = true
          } else {
            this.netWorkShow = false
          }
          if (this.voiceB > 0) {
            this.voiceShow = true
          } else {
            this.voiceShow = false
          }
          if (this.smsB > 0) {
            this.smsShow = true
          } else {
            this.smsShow = false
          }
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取-用量查询-明细
    getUsageinfosDetails ($cardNo) {
      const cardNo = $cardNo
      API.apiUsageinfosDetails(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.UsageinfosDetails = res.data
          // 筛选已生效数据
          this.UsageinfosValid = this.UsageinfosDetails.filter(item => {
            return item.validType === 1
          }).map(item => {
            return item
          })
          // 以下 给每条数据加语音、流量、短信用量百分比
          for (let index = 0; index < this.UsageinfosValid.length; index++) {
            const element = this.UsageinfosValid[index]
            const dataUsedPercentage = (element.dataUsed / element.dataTotal) * 100
            element.dataUsedPercentage = dataUsedPercentage
            const voiceUsedPercentage = (element.voiceUsed / element.voiceTotal) * 100
            element.voiceUsedPercentage = voiceUsedPercentage
            const smsUsedPercentage = (element.smsUsed / element.smsTotal) * 100
            element.smsUsedPercentage = smsUsedPercentage
          }
          // 筛选当前套餐为自动续期
          this.validList = this.UsageinfosValid.filter(item => {
            return item.payType === 1
          }).map(item => {
            return item
          })
          // 筛选当前套餐的失效时间为长期
          this.longTermPackage = this.validList.filter(item => {
            return item.endDate === '长期'
          }).map(item => {
            return item
          })
          // 筛选当前套餐
          this.currentPackage = this.UsageinfosValid.filter(item => {
            return item.packageType === 0
          }).map(item => {
            return item
          })
          this.cardCurrentPackageId = this.currentPackage[0].cardAddPackageBalanceId
          // 筛选未生效数据
          this.UsageinfosValidNo = this.UsageinfosDetails.filter(item => {
            return item.validType === 0
          }).map(item => {
            return item
          })
          // 筛选未生效套餐中的自动续期的套餐
          this.UsageinfosValidNoPayType = this.UsageinfosValidNo.filter(item => {
            return item.payType === 1
          }).map(item => {
            return item
          })
          if (this.UsageinfosValidNoPayType.length !== 0) {
            this.payType = this.UsageinfosValidNoPayType[0].payType
            this.cardChangePackageId = this.UsageinfosValidNoPayType[0].cardAddPackageBalanceId
          }
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 处理数据
    replaceNum () {
      this.voiceT = replaceNum(this.OrdersDetails.voiceTotail).toFixed(1)
      // this.voiceR = replaceNum(this.OrdersDetails.voiceRemain).toFixed(1)
      this.voiceB = replaceNum(this.OrdersDetails.voiceBalance).toFixed(1)
      this.smsT = replaceNum(this.OrdersDetails.smsTotail).toFixed(1)
      // this.smsR = replaceNum(this.OrdersDetails.smsRemain).toFixed(1)
      this.smsB = replaceNum(this.OrdersDetails.smsBalance).toFixed(1)
      this.netWorkT = replaceNum(this.OrdersDetails.netWorkTotail).toFixed(1)
      // this.netWorkR = replaceNum(this.OrdersDetails.networkRemain).toFixed(1)
      this.netWorkB = replaceNum(this.OrdersDetails.netWorkBalance).toFixed(1)
      function replaceNum ($numVal) {
        if ($numVal !== null || $numVal !== '' || $numVal !== undefined) {
          const num = $numVal.replace(/[^-0-9\\.\\^0-9]/ig, '')
          return Number(num)
        }
      }
      this.smsPercent = percent(this.smsT, this.smsB).toFixed(1)
      this.voicePercent = percent(this.voiceT, this.voiceB).toFixed(1)
      this.flowPercent = percent(this.netWorkT, this.netWorkB).toFixed(1)
      function percent ($surplus, $balance) {
        if ($surplus <= 0) {
          return 0
        } else if (Number($surplus) > Number($balance)) {
          return 100
        } else {
          return (Number($surplus) / Number($balance)) * 100
        }
      }
    },
    // 获取套餐
    getPackageList ($cardNo) {
      const params = {
        cardNo: $cardNo
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
          if (this.packageListSN.length === 0) {
            this.cur = 1
          } else {
            this.cur = 0
          }
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 获取充值金额
    getPriceList ($cardNo) {
      const params = {
        cardNo: $cardNo
      }
      API.apiPriceList(params).then(res => {
        if (res.resultCode === 0) {
          this.priceList = res.data
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },

    onClick_selectPackage ($obj) {
      this.selectePackage = $obj
      this.packageId = $obj.id
      this.isCheckChange = true
    },
    // 发送短信
    onClick_senCode () {
      API.apiSmsAdd().then(res => {
        if (res.resultCode === 0) {
          this.$toast('发送成功！')
          this.isSecond = true
          this.timeId = setInterval(() => {
            this.smsTime--
            if (this.smsTime === 0) {
              this.isSecond = false
              this.smsTime = 60
              clearInterval(this.timeId)
            }
          }, 1000)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 更换套餐 确认 按钮
    onClick_buyPkg (action, done) {
      if (action === 'confirm') {
        // setTimeout(done)
        this.minusPrice = Number(this.OrdersDetails.remainPrice.replace(/[^-0-9\\.\\^0-9]/ig, ''))
        // this.minusPrice = 0
        this.price = Number(this.selectePackage.price)
        if (this.selectePackage.payType === 1) {
          if (this.UsageinfosValidNoPayType.length !== 0) {
            this.cardChangePackageId = this.UsageinfosValidNoPayType[0].cardAddPackageBalanceId
            const config = {
              cardAddPackageBalanceId: this.cardChangePackageId
            }
            API.apiPackagesCancel(config).then(res => {
              if (res.resultCode === 0) {
                this.getApiEditPackage(done)
              } else {
                this.$toast(res.resultInfo)
              }
            })
          } else {
            this.getApiEditPackage(done)
          }
        } else {
          if (this.minusPrice < this.price) {
            ZFAPI.apiOrderOrderId().then(res => {
              const data = {
                body: '订购套餐',
                out_trade_no: res.data,
                total_fee: Number(this.selectePackage.price) * 100
              }
              ZFAPI.apiWXprepay(data).then(res => {
                if (res.resultCode === 0) {
                  this.weixinTradePay(res.data, () => {
                    this.getApiEditPackage(done)
                  })
                } else {
                  this.$toast(res.resultInfo)
                }
              })
            })
          } else {
            this.getApiEditPackage(done)
          }
        }
      } else if (action === 'cancel') {
        done() // 关闭
      }
    },
    getApiEditPackage (done) {
      const config = {
        cardNo: this.OrdersDetails.cardNo,
        packageId: this.packageId,
        cardAddPackageBalanceId: this.cardCurrentPackageId
      }
      API.apiEditPackage(config).then(res => {
        if (res.resultCode === 0) {
          this.$toast('更改成功')
          this.getOrdersDetails(this.OrdersDetails.cardNo)
          this.getUsageinfosDetails(this.OrdersDetails.cardNo)
          this.isCheckChange = false
          this.active = 'package'
          done() // 关闭
        } else {
          this.$toast(res.resultInfo)
          done() // 关闭
        }
      })
    },
    RenewalDescriptionShow () {
      this.RenewalDescription = true
    },
    RenewalDescriptionClose () {
      this.RenewalDescription = false
    },
    // 点击充值
    recharge ($item) {
      this.payPrice = $item.price
      this.$dialog.confirm({
        title: '提醒',
        message: `您确认要充值${this.payPrice}元！`
      }).then(() => {
        ZFAPI.apiOrderOrderId().then(res => {
          const orderId = res.data
          const data = {
            body: '余额充值',
            out_trade_no: res.data,
            total_fee: Number(this.payPrice) * 100
          }
          ZFAPI.apiWXprepay(data).then(res => {
            if (res.resultCode === 0) {
              this.weixinTradePay(res.data, () => {
                const config = {
                  cardNo: this.OrdersDetails.cardNo,
                  payPrice: this.payPrice,
                  orderId: orderId
                }
                API.apipayPrice(config).then(res => {
                  if (res.resultCode === 0) {
                    this.$toast('充值成功！')
                    this.getOrdersDetails(this.OrdersDetails.cardNo)
                    this.getUsageinfosDetails(this.OrdersDetails.cardNo)
                  } else {
                    this.$toast(res.resultInfo)
                  }
                })
              })
            } else {
              this.$toast(res.resultInfo)
            }
          })
        })
      }).catch(() => {
      })
    },
    handleClick (tab, event) {
      const OrdersDetails = this.OrdersDetails
      sessionStorage.setItem('OrdersDetails', JSON.stringify(OrdersDetails))
      if (tab === 'editPackage') {
        this.cardChangePackageId = null
      }

      if (tab === 'refueling') {
        this.$router.push({
          path: '/refueling',
          query: {
            token: window.token,
            OrdersDetails: OrdersDetails
          }
        })
      }
    },
    onClick_goPage2 ($router) {
      this.$router.push({
        path: '/' + $router,
        query: {
          token: window.token
        }
      })
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
    weixinTradePay (obj, $fun) {
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
              $fun()
            } else {
              Toast('支付失败')
            }
          }
        )
      })
    },
    // 点击更换套餐
    onClick_changeMeal ($cardAddPackageBalanceId, $payType) {
      this.cardChangePackageId = $cardAddPackageBalanceId
      this.payType = $payType
      this.active = 'editPackage'
    },
    // 无套餐时，点击到套餐TAB
    goPackageAdd () {
      this.active = 'editPackage'
    },
    // 取消订购套餐
    onClick_del ($cardAddPackageBalanceId) {
      const config = {
        cardAddPackageBalanceId: $cardAddPackageBalanceId
      }
      API.apiPackagesCancel(config).then(res => {
        if (res.resultCode === 0) {
          this.$toast('取消订购成功！')
          this.getOrdersDetails(this.OrdersDetails.cardNo)
          this.getUsageinfosDetails(this.OrdersDetails.cardNo)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/consumption);
.package-current {
  display: flex;
  .package-xx {
    font-size: 16px;
    line-height: 50px;
    color: #f59a23;
    font-weight: bold;
    flex: 1;
  }
  .package-T-data {
    font-size: 12px;
    color: #aaa;
    line-height: 50px;
  }
  .package-zdxq {
    font-size: 16px;
    color: red;
    line-height: 50px;
  }
  .package-ts {
    font-size: 14px;
    color: #fff;
    background: #f59a23;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    margin: 15px 10px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
  }
}
.package-data {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  color: #aaa;
  .package-data-center {
    margin: 0 20px;
  }
  .package-data-text {
    text-align: center;
  }
}
.RenewalDescription {
  .RenewalDescriptionTitle {
    text-align: center;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
  }
  .RenewalDescriptionText {
    line-height: 20px;
    margin-bottom: 5px;
  }
}
.noPackage {
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
}
.package-SM {
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
}
.buttonBox {
  display: flex;
  color: #fff;
  font-size: 14px;
  justify-content: center;
  padding: 10px;
  .changeButoon {
    background: #f59a23;
    margin-right: 10px;
    line-height: 30px;
    flex: 1;
    text-align: center;
    border-radius: 4px;
  }
  .delButton {
    background: #aaa;
    line-height: 30px;
    flex: 1;
    text-align: center;
    border-radius: 4px;
  }
}
.usage-num {
  color: #f59a23;
}
.noPackageList {
  border-bottom: 1px solid #ebedf0;
}
.goPackage {
  color: #f59a23;
}
</style>
