<template>
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <!-- logo 区域 -->
    <div class="logo">
      <img class="img-logo" :src="suningimg" alt="">
    </div>
    <!-- <div class="sn-xx">今天已有<span class="important">7</span>人免费领卡</div> -->
    <!-- form 表单区域 -->
    <div class="box-card">
      <van-form :model="openingCardForm" ref="openingCardForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <van-field v-model="openingCardForm.name" label="姓名" required placeholder="请输入姓名" />
        <van-field v-model="openingCardForm.contactAreaCode" readonly clickable name="area" :value="value" label="配送区域" placeholder="请选择配送区域" @click="showArea = true" right-icon="arrow" />
        <van-popup v-model="showArea" position="bottom">
          <van-picker show-toolbar title="配送区域" :columns="areaList" @confirm="onAddrAreaConfirm" @change="onAreaChange" @cancel="onAreaCancel" :item-height="28" visible-item-count="12" />
        </van-popup>
        <van-field v-model="openingCardForm.address" label="详细地址" placeholder="请输入详细地址" />
        <van-field v-model="openingCardForm.phone" label="手机号码" required placeholder="请输入手机号码">
          <template #button>
            <van-button type="primary" color="#FFBA27" style="height:30px; positon:absolute;right:0;" @click="btnClick">{{btnTitle}}</van-button>
          </template>
        </van-field>
        <van-field v-model="openingCardForm.verCode" maxlength="6" label="验证码" required placeholder="请输入短信验证码" />
      </van-form>
    </div>
    <!-- 按钮 区域 -->
    <div class="activate_con">
      <van-button type="info" size="large" color="#FFBA27" style="height:42px;" @click="useButton">提 交</van-button>
    </div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>

<script>
// import VHeader from './../header'
import suningimg from 'common/images/suning.png'
import API from '../../api/suningCard'
export default {
  data () {
    return {
      // headerName: '苏宁99学霸卡',
      suningimg: suningimg,
      openingCardForm: {
        contactAreaCode: null,
        name: null,
        address: null,
        phone: null,
        verCode: null
      },
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
        }
      ],
      loadingShow: false,
      btnTitle: '获取验证码'
    }
  },
  components: {
    // VHeader,
  },
  created () {
    // 获取省列表
    this.getProvincesList()
  },
  methods: {
    // 获取省    ----刘 20200802 省市县 级联，后台数据
    getProvincesList () {
      API.apiSNProvincesList().then(res => {
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
      API.apiSNCitiesList(provinceId).then(res => {
        if (res.resultCode === 0) {
          this.areaList[1].values = Object.values(res.data).map(function (e) {
            return { text: e.name, code: e.id }
          })
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // value=0改变省，1改变市   ----刘 20200802 省市县 级联，后台数据
    onAreaChange (picker, index, value) {
      const val = picker.getValues()
      if (value === 0) {
        const parentCode = val[value].code
        this.getCitiesList(Number(parentCode))
      }
    },
    // 点击确定按钮   ----刘 20200802 省市县 级联，后台数据
    onAddrAreaConfirm (e) {
      this.openingCardForm.contactAreaCode = `${e[0].text}${e[1].text}`
      this.showArea = false
      this.postProvince = e[0].code
      this.postCity = e[1].code
      // console.log(e)
    },
    // 点击取消按钮   ----刘 20200802 省市县 级联，后台数据
    onAreaCancel () {
      this.showArea = false
    },
    // 点击 验证码 倒计时
    btnClick () {
      var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
      if (!this.openingCardForm.phone) {
        this.$toast('手机不能为空，请输入您的手机号!')
        return false
      } else if (!reg.test(this.openingCardForm.phone)) {
        this.$toast('手机号格式不正确')
        return false
      } else {
        // 倒计时
        let time = 60
        const timer = setInterval(() => {
          if (time === 0) {
            clearInterval(timer)
            this.disabled = false
            this.btnTitle = '获取验证码'
          } else {
            this.btnTitle = time + '秒后重试'
            this.disabled = true
            time--
          }
        }, 1000)
        const data = {
          phone: this.openingCardForm.phone
        }
        API.apiRegisterSendvercode(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('验证码发送成功！')
          } else {
            this.$toast('手机号有误!')
          }
        })
      }
    },
    // 立即使用
    useButton () {
      var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
      if (!this.openingCardForm.name) {
        this.$toast('姓名不能为空，请输入姓名!')
        return false
      } else if (!this.openingCardForm.phone) {
        this.$toast('手机不能为空，请输入您的手机号!')
        return false
      } else if (!reg.test(this.openingCardForm.phone)) {
        this.$toast('手机号格式不正确')
        return false
      } else {
        const OrderForm = {
          phone: this.openingCardForm.phone,
          address: this.openingCardForm.address,
          name: this.openingCardForm.name,
          verCode: this.openingCardForm.verCode,
          city: this.postCity
        }
        // console.log(OrderForm)
        API.apiRegister(OrderForm).then(res => {
          if (res.resultCode === 0) {
            this.$toast('您的申请已提交成功，我们将尽快处理！')
            window.close()
            this.$router.replace({ path: '/suningCardSuccess' })
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  display: flex;
  .img-logo {
    width: 100%;
  }
}
.sn-xx {
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  font-weight: 500;
  color: #15273c;
  .important {
    color: #aa1f18;
  }
}
.box-card {
  width: 100%;
  border-top: 1px solid #ebedf0;
}
.van-cell {
  font-size: 14px;
  line-height: 30px;
  padding: 10px 10px 10px 20px;
}
.van-cell::after {
  border-bottom: 1px solid #ebedf0;
}

.activate_con {
  padding: 0 10px 20px 10px;
}
</style>
