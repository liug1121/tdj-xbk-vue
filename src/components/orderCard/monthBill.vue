<template>
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="g-card">
      <div class="card-info">
        <div class="person-box">
          <div class="person-logo">
            <img v-if="currChild.iconUrl === ''" :src="imageUrls" alt="用户头像">
            <img v-else :src=" currChild.iconUrl" alt="用户头像">
          </div>
          <div class="person-name">{{currChild.studentName}}</div>
        </div>

        <div class="info-box">
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">手机号:</div>
            <span>{{currChild.cardNo}}</span>
          </div>
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">ICCID:</div>
            <span>{{currChild.iccid}}</span>
          </div>
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">账单月份:</div>
            <span>{{currChild.date}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="table_title" >帐单金额</div>
      <!-- <div class="table_title" v-show="currDate == this.currChild.date ">未出账金额</div> -->
      <!-- <div v-show="currDate == this.currChild.date ">

        <div style="width: 100%;height: .4rem;"></div>

        <div style="margin: 0 .3rem;" v-for="(item,index) in orderDtlList" v-show="item.type===2" :key="'c' + index">
          <div style="height: .3rem;margin-bottom: .2rem">
            <div style="float: left;font-size: .35rem;font-weight: 600;color: #ffba26;">当前余额</div>
            <div style="float: right;color: red;font-size: .3rem;">{{item.total}}元</div>
          </div>
        </div>

      </div> -->

      <div style="width: 100%;height: .2rem;"></div>
      <div >
        <div class="monthBillList" v-for="(item,index) in orderDtlList" :key="'A' + index">
          <div class="mothbillItemTop">
            <div class="MBTopLeft">扣费合计</div>
            <div class="MBTopRight">合计 -{{item.total}}元</div>
          </div>
          <div class="mothbillItemCon">
            <div class="mothbillItemConList">
              <div class="MBIConLeft">月套餐费</div>
              <div class="MBIConRight">-{{item.packageBilling}}元</div>
            </div>
            <div class="mothbillItemConList">
              <div class="MBIConLeft">用量超套费用</div>
              <div class="MBIConRight">-{{item.overBilling}}元</div>
            </div>
            <div class="mothbillItemConList">
              <div class="MBIConLeft">加油包购买费用</div>
              <div class="MBIConRight">-{{item.addPackageBilling}}元</div>
            </div>
            <div class="mothbillItemConList">
              <div class="MBIConLeft">卡费</div>
              <div class="MBIConRight">-{{item.cardFee}}元</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-show="currDate == this.currChild.date ">
        <div class="monthBillList" v-for="(item,index) in orderDtlList" v-show="item.type===2" :key="'d' + index">
          <div class="mothbillItemTop">
            <div class="MBTopLeft">扣费合计</div>
            <div class="MBTopRight">合计 - 0 元</div>
          </div>
          <div class="mothbillItemCon">
            <div class="mothbillItemConList">
              <div class="MBIConLeft">月套餐费</div>
              <div class="MBIConRight">- 0 元</div>
            </div>
            <div class="mothbillItemConList">
              <div class="MBIConLeft">用量超套费用</div>
              <div class="MBIConRight">- 0 元</div>
            </div>
            <div class="mothbillItemConList">
              <div class="MBIConLeft">加油包购买费用</div>
              <div class="MBIConRight">- 0 元</div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- <div class="MBline"></div>

      <div class="monthBillList" v-for="(item,index) in orderDtlList" v-show="item.type===1" :key="'b' + index">
        <div class="mothbillItemCon">
          <div class="mothbillItemConList">
            <div class="MBIConLeft">余额充值</div>
            <div class="MBIConRight">{{item.total}}元</div>
          </div>
        </div>
      </div> -->

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import imageUrls from 'common/images/icon-user.png'
// import vHeader from '../header.vue'
export default {
  created () {
    this.currChild = JSON.parse(sessionStorage.getItem('currChild'))
    document.title = '月账单(' + this.currChild.date + ')'
    this.$axios({
      method: 'POST',
      url: 'wechat/v1.0/users/billings',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        cardNo: this.currChild.cardNo,
        date: this.currChild.date
      })
    }).then(res => {
      if (res.data.resultCode === 0) {
        this.orderDtlList = res.data.data
        this.orderDtl = this.orderDtlList[0]
        // console.log(this.orderDtl)
      } else {
        this.$toast(res.data.resultInfo)
      }
    })

    var data = new Date()
    var year = data.getFullYear()
    var mon = data.getMonth() + 1
    if (mon < 10) {
      mon = 0 + '' + mon
    }

    this.currDate = year + mon
  },
  data () {
    return {
      orderDtlList: [],
      orderDtl: {},
      currChild: {},
      imageUrls
      // headerName: '月账单'
    }
  },
  components: {
    // vHeader
  },
  methods: {}
}

</script>
<style type="text/css" lang="less" scoped>
.g-card {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
  font-size: 14px;

  .card-change {
    float: right;
    margin-right: 0rem;
    /*margin-top: .5rem;*/
    position: absolute;
    right: 0.3rem;
    top: 0.31rem;
    color: #ffba26;
    span {
      display: inline-block;
      width: 0.15rem;
      height: 0.24rem;
      margin-left: 0.2rem;
      background: url('./../../common/images/next-btn-yellow.png') no-repeat;
      background-size: 0.15rem 0.24rem;
    }
  }
}
.table_title {
  margin: 0 0.3rem;
  margin-top: 0.3rem;
  font-size: 0.25rem;
  color: #aaa;
}
.table {
  width: 100%;
  /*height: 3rem;*/
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  overflow: hidden;
  border-bottom: none;
  font-size: 0.25rem;
  .tr {
    width: 100%;
    text-align: center;
    .td {
      width: 33%;
      height: 0.7rem;
      line-height: 0.7rem;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      float: left;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.monthBillList {
  margin: 0 0.3rem;
  padding: 0.3rem 0;
  .mothbillItemTop {
    height: 0.5rem;
    margin-bottom: 0.2rem;
    display: flex;
    .MBTopLeft {
      flex: 1;
      font-size: 0.35rem;
      font-weight: 600;
      color: #ffba26;
    }
    .MBTopRight {
      color: red;
      font-size: 0.3rem;
    }
  }
  .mothbillItemCon {
    .mothbillItemConList {
      height: 0.5rem;
      font-size: 0.3rem;
      display: flex;
      .MBIConLeft {
        flex: 1;
      }
      .MBIConRight {
        text-align: right;
      }
    }
  }
}
.MBline {
  width: 100%;
  height: 0.2rem;
  background: #eee;
}
</style>
