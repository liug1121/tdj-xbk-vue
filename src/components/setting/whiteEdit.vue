<template>
  <div>
    <div v-if="fwAcccount === 'taojiaming4982'">
      <white-Child :WhiteList="oneWhiteList" :numId=1 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="twoWhiteList" :numId=2 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="threeWhiteList" :numId=3 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="fourWhiteList" :numId=4 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="fiveWhiteList" :numId=5 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="sixWhiteList" :numId=6 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="sevenWhiteList" :numId=7 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="eightWhiteList" :numId=8 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="nineWhiteList" :numId=9 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
      <white-Child :WhiteList="tenWhiteList" :numId=10 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </white-Child>
    </div>
    <div v-else>
      <whiteChildNew :WhiteList="oneWhiteList" :numId=1 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </whiteChildNew>
      <whiteChildNew :WhiteList="twoWhiteList" :numId=2 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </whiteChildNew>
      <whiteChildNew :WhiteList="threeWhiteList" :numId=3 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </whiteChildNew>
      <whiteChildNew :WhiteList="fourWhiteList" :numId=4 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </whiteChildNew>
      <whiteChildNew :WhiteList="fiveWhiteList" :numId=5 @addSucess="addSucess" :deletesLength="deletesLength" @deleteChild='deleteChild'>
      </whiteChildNew>
    </div>

    <div class="whiteTip">
      <div class="whiteTitle">呼出白名单功能说明：</div>
      <div class="tip">超级学霸卡提供 “呼出白名单” 功能，协助家长加强对学生呼出电话行为的管理，学生只能拨打家长设置的白名单号码，具体规则如下：</div>
      <div class="text" v-if="fwAcccount === 'taojiaming4982'">1、每张卡最多可同时设置10个呼出白名单号码；</div>
      <div class="text" v-else>1、每张卡最多可同时设置5个呼出白名单号码；</div>
      <div class="text">2、每格只可设置一个白名单号码，该格仅有一次删除机会，30天内最多可删除5个已设置的白名单；可删除时，通过左侧滑动，可唤出删除按钮进行删除！</div>
      <div class="text">3、设置的呼出白名单号码为11位手机号码，或者带区号的固定电话号码，输入示例：02566661234；</div>
      <div class="text">4、呼入号码不受呼出白名单限制。</div>
    </div>
  </div>
</template>

<script>
import API from 'api/setting'
import whiteChild from './whiteChild'
import whiteChildNew from './whiteChildNew'
export default {
  data () {
    return {
      // headerName: '呼出白名单设置',
      whiteList: [],
      numId: 1,
      deletesLength: 0,
      oneWhiteList: [],
      twoWhiteList: [],
      threeWhiteList: [],
      fourWhiteList: [],
      fiveWhiteList: [],
      sixWhiteList: [],
      sevenWhiteList: [],
      eightWhiteList: [],
      nineWhiteList: [],
      tenWhiteList: [],
      whitePhoneNum: '',
      nickName: '',
      TipsAddDialog: false,
      addWhileDialog: false,
      addNoWhileDialog: false,
      delTime: '',
      delTimeNew: '',
      countTime: '',
      fwAcccount: this.$route.query.fwAcccount
    }
  },
  components: {
    whiteChild,
    whiteChildNew
  },
  created () {
    this.getWhiteList()
    this.oneWhiteList = this.whiteList.slice(0, 1)
    this.twoWhiteList = this.whiteList.slice(1, 2)
  },
  methods: {
    // 获取呼出号码
    getWhiteList () {
      const data = {
        cardNo: this.$route.query.cardNo,
        page: 0,
        pageSize: 10
      }
      API.apiWhiteList(data).then(res => {
        if (res.resultCode === 0) {
          // this.whiteList = res.data.reverse()
          this.whiteList = res.data
          this.oneWhiteList = this.whiteList.slice(0, 1)
          this.twoWhiteList = this.whiteList.slice(1, 2)
          this.threeWhiteList = this.whiteList.slice(2, 3)
          this.fourWhiteList = this.whiteList.slice(3, 4)
          this.fiveWhiteList = this.whiteList.slice(4, 5)
          this.sixWhiteList = this.whiteList.slice(5, 6)
          this.sevenWhiteList = this.whiteList.slice(6, 7)
          this.eightWhiteList = this.whiteList.slice(7, 8)
          this.nineWhiteList = this.whiteList.slice(8, 9)
          this.tenWhiteList = this.whiteList.slice(9, 10)

          this.deletesLength = this.whiteList[0].whiteDeletes.length
          if (this.whiteList[0].whiteDeletes.length !== 0) {
            this.delTime = this.whiteList[0].whiteDeletes[0].create_time
            const createTime = Object.values(this.whiteList[0].whiteDeletes).map(function (e) {
              return e.create_time
            })
            let ary = createTime
            // console.log(ary)
            ary = ary.sort() // 排序

            var newDate = ary[ary.length - 1]
            // console.log('数组中最新日期：' + newDate + '<br/>')
            this.delTimeNew = this.handleTime(newDate)
            // 获取当前年月日
            var date = new Date()
            var nowMonth = date.getMonth() + 1
            if (nowMonth >= 1 && nowMonth <= 9) {
              nowMonth = '0' + nowMonth
            }
            var nowDate = date.getFullYear() + '-' + nowMonth
            // console.log('当前日期：' + nowDate + '<br/>')

            var count = 0 // 记录年月出现次数
            for (let i = 0; i < ary.length; i++) {
              if (ary[i].substring(0, 7) === nowDate) {
                count++
              }
            }
            this.countTime = count
            // console.log(this.delTimeNew) // 最新日期
            // console.log(this.countTime) // 一个月内的次数
          }
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 不可更改
    addShow () {
      this.addNoWhileDialog = true
    },
    // 可更改
    addShow1 () {
      this.addWhileDialog = true
    },
    // 可更改提交
    addClick (action, done) {
      if (action === 'confirm') {
        var reg = 11 && /^[1][3,4,5,7,8,9][0-9]{9}$/ | /^(0[0-9]{2,3})?([2-9][0-9]{6,7})+([0-9]{1,4})?$/
        if (!this.whitePhoneNum) {
          this.$toast('申请人手机不能为空，请输入您的手机号!')
          return false
        }
        if (!reg.test(this.whitePhoneNum)) {
          this.$toast('号码格式不正确')
          return false
        } else {
          this.getAdd()
          this.addWhileDialog = false
        }
      } else {
        done()
      }
    },
    // 不可更改提交
    TipsAdd (action, done) {
      if (action === 'confirm') {
        var reg = 11 && /^[1][3,4,5,7,8,9][0-9]{9}$/
        if (!this.whitePhoneNum) {
          this.$toast('申请人手机不能为空，请输入您的手机号!')
          return false
        }
        if (!reg.test(this.whitePhoneNum)) {
          this.$toast('手机号格式不正确')
          return false
        } else {
          this.TipsAddDialog = true
        }
        this.addWhileDialog = false
      } else {
        done()
      }
    },
    // 提交不可更改号码弹框
    TipsAddDialogButton (action, done) {
      if (action === 'confirm') {
        this.getAdd()
        this.TipsAddDialog = false
        this.addWhileDialog = false
      } else {
        done()
      }
    },
    getAdd () {
      const config = {
        cardNo: this.$route.query.cardNo,
        nickName: this.nickName,
        whitePhoneNum: this.whitePhoneNum
      }
      API.apiAddWhite(config).then(res => {
        if (res.resultCode === 0) {
          this.$toast('新增成功')
          this.getWhiteList()
          this.whitePhoneNum = ''
          this.nickName = ''
          this.addNoWhileDialog = false
          this.addWhileDialog = false
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 删除
    deleteChild ($item) {
      const delTime = this.handleTime(this.delTimeNew)
      const startTime = this.handleTime30(31, delTime)
      const Total = this.getTotalDate(startTime)
      const newDate = this.handleTime(new Date())
      if (this.countTime === 5) {
        this.$dialog.confirm({
          title: '温馨提醒',
          message: `<div style="color:red">最近30天内您已经删除超过5个白名单号码，请 ${Total} 天后再进行删除操作，谢谢！</div>`
        }).then(() => {
        }).catch(() => {
        })
      } else if (newDate === startTime) {
        this.deleteSubmit($item)
      } else {
        this.deleteSubmit($item)
      }
    },
    // 删除提交
    deleteSubmit ($item) {
      this.$dialog.confirm({
        title: '温馨提醒',
        message: '每行只能删除一次，您确定要删除此呼出号码吗？'
      }).then(() => {
        const config = {
          cardNo: this.$route.query.cardNo,
          id: $item.id,
          nickName: $item.nickName,
          whitePhoneNum: $item.phone
        }
        API.apiDelWhite(config).then(res => {
          if (res.resultCode === 0) {
            this.$toast('删除成功')
            this.getWhiteList()
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    // 时间处理 Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间) 2020-08-03 15:15:15
    handleTime ($data) {
      const dt = new Date($data)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      // const hh = (dt.getHours() + '').padStart(2, '0')
      // const mm = (dt.getMinutes() + '').padStart(2, '0')
      // const ss = (dt.getSeconds() + '').padStart(2, '0')
      // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      return `${y}-${m}-${d}`
    },
    // 获取30天后的日期
    handleTime30 (num, time) {
      const n = num
      const d = new Date(time)
      let year = d.getFullYear()
      let mon = d.getMonth() + 1
      let day = d.getDate()
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1
        } else {
          year = year - 1
          mon = 12
        }
      }
      d.setDate(d.getDate() + n)
      year = d.getFullYear()
      mon = (d.getMonth() + 1 + '').padStart(2, '0')
      day = (d.getDate() + '').padStart(2, '0')
      return `${year}-${mon}-${day}`
    },
    // 30天后的日期 倒计时
    getTotalDate (sDate) {
      // 将-转换成/，避免ios显示NaN
      sDate = sDate.replace(/-/g, '/')
      // 结束时间
      var endDate = new Date(sDate)
      // 当前时间
      var nowDate = new Date()
      // 相差的总秒数
      var totalSeconds = parseInt((endDate - nowDate) / 1000)
      // 天数
      var days = Math.floor(totalSeconds / (60 * 60 * 24))
      return days
    },
    addSucess () {
      this.getWhiteList()
    }
  }
}
</script>

<style lang="less" scoped>
.whiteTip {
  font-size: 14px;
  padding: 10px;
  // position: fixed;
  // bottom: 0;
  display: inline-block;
  border-width: 0px 0px 0px 8px;
  border-style: solid;
  border-left-color: #fdab16;
  border-radius: 5px 0px 0px 5px;
  box-shadow: rgb(153, 153, 153) 0px 3.2px 3px;
  background-color: rgb(239, 239, 239);
  box-sizing: border-box;
  margin: 10px;
  .whiteTitle {
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
  }
  .tip {
    padding: 10px 0;
    text-indent: 2em;
    line-height: 25px;
  }
  .text {
    text-indent: 2em;
    line-height: 25px;
  }
}
</style>
