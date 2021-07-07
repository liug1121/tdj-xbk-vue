<template>
  <div>
    <white-Child :WhiteList="oneWhiteList" :numId=1 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="twoWhiteList" :numId=2 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="threeWhiteList" :numId=3 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="fourWhiteList" :numId=4 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="fiveWhiteList" :numId=5 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="sixWhiteList" :numId=6 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="sevenWhiteList" :numId=7 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="eightWhiteList" :numId=8 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="nineWhiteList" :numId=9 @addSucess="addSucess"></white-Child>
    <white-Child :WhiteList="tenWhiteList" :numId=10 @addSucess="addSucess"></white-Child>
    <!-- <white-Child :WhiteList="whiteList" :numId=5></white-Child> -->
    <!-- <white-Child :WhiteList="whiteList" :numId=6></white-Child> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" @click="addShow">
        <p class="xuhao">1</p>
        <span style="color: #aeaeae;flex: 1;">请设置呼出白名单号码</span>
        <span class="ts">!</span>
        <span style="text-align: right;">
          <span style="line-height:20px; padding:5px 0;color: #aeaeae;">
            <p>剩余删除次1次</p>
          </span>
        </span>
      </div>
      <van-swipe-cell v-for=" (item, index) in oneWhiteList" :key="'A' + index">
        <div class="whiteItem">
          <p class="xuhao">1</p>
          <span style="line-height:20px; padding:5px 0;flex: 1;">
            <p>{{item.phone}}</p>
            <p style="color: #aeaeae">{{item.nickName}}</p>
          </span>
          <span class="ts">!</span>
          <span style="text-align: right;">
            <span style="line-height:20px; padding:5px 0;color: #aeaeae;">
              剩余删除次1次
            </span>
          </span>
        </div>
        <template #right>
          <div style="margin-top:-15px">
            <van-button square type="danger" text="删除" @click="delClick(item.phone)" />
          </div>
        </template>
      </van-swipe-cell>
      <div class="whiteItem" @click="addShow">
        <p class="xuhao">1</p>
        <span style="color: #aeaeae;flex: 1;">请设置呼出白名单号码</span>
        <span class="ts">!</span>
        <span style="text-align: right;">
          <span style="line-height:20px; padding:5px 0;color: #aeaeae;">
            <p>剩余删除次0次</p>
          </span>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in oneWhiteList" :key="'A1' + index">
        <p class="xuhao">1</p>
        <span style="line-height:20px; padding:5px 0;flex: 1;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span class="ts">!</span>
        <span style="text-align: right;">
          <span style="line-height:20px; padding:5px 0;color: #aeaeae;">
            <p>剩余删除次0次</p>
          </span>
        </span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="oneWhiteList.length ===0 ">
        <p class="xuhao">1</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in oneWhiteList" :key="'A' + index">
        <p class="xuhao">1</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;"></span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="twoWhiteList.length ===0 ">
        <p class="xuhao">2</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in twoWhiteList" :key="'B' + index">
        <p class="xuhao">2</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;"></span>
      </div>
    </div> -->

    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="threeWhiteList.length ===0 ">
        <p class="xuhao">3</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in threeWhiteList" :key="'C' + index">
        <p class="xuhao">3</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;"></span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="fourWhiteList.length ===0 ">
        <p class="xuhao">4</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in fourWhiteList" :key="'D' + index">
        <p class="xuhao">4</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;"></span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="fiveWhiteList.length ===0 ">
        <p class="xuhao">5</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in fiveWhiteList" :key="'E' + index">
        <p class="xuhao">5</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;"></span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="sixWhiteList.length ===0 ">
        <p class="xuhao">6</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow1">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in sixWhiteList" :key="'E' + index">
        <p class="xuhao">6</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;">
          <van-button size="small" color="#D9001B" type="primary" @click="delClick(item.phone)">仅可删除一次</van-button>
        </span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="sevenWhiteList.length ===0 ">
        <p class="xuhao">7</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow1">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in sevenWhiteList" :key="'E' + index">
        <p class="xuhao">7</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;">
          <van-button size="small" color="#D9001B" type="primary" @click="delClick(item.phone)">仅可删除一次</van-button>
        </span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="eightWhiteList.length ===0 ">
        <p class="xuhao">8</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow1">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in eightWhiteList" :key="'E' + index">
        <p class="xuhao">8</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;">
          <van-button size="small" color="#D9001B" type="primary" @click="delClick(item.phone)">仅可删除一次</van-button>
        </span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="nineWhiteList.length ===0 ">
        <p class="xuhao">9</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow1">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in nineWhiteList" :key="'E' + index">
        <p class="xuhao">9</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;">
          <van-button size="small" color="#D9001B" type="primary" @click="delClick(item.phone)">仅可删除一次</van-button>
        </span>
      </div>
    </div> -->
    <!-- <div class="whiteList">
      <div class="whiteItem" v-show="tenWhiteList.length ===0 ">
        <p class="xuhao">10</p>
        <span style="color: #aeaeae;">请设置呼出白名单号码</span>
        <span style="text-align: right;">
          <van-button size="small" :color="bodyColor" type="primary" @click="addShow1">设置</van-button>
        </span>
      </div>
      <div class="whiteItem" v-for=" (item, index) in tenWhiteList" :key="'E' + index">
        <p class="xuhao">10</p>
        <span style="line-height:20px; padding:5px 0;">
          <p>{{item.phone}}</p>
          <p style="color: #aeaeae">{{item.nickName}}</p>
        </span>
        <span style="text-align: right;">
          <van-button size="small" color="#D9001B" type="primary" @click="delClick(item.phone)">仅可删除一次</van-button>
        </span>
      </div>
    </div> -->
    <div class="whiteTip">
      <div class="whiteTitle">呼出白名单功能说明：</div>
      <div class="tip">超级学霸卡提供 “呼出白名单” 功能，协助家长加强对学生呼出电话行为的管理，学生只能拨打家长设置的白名单号码，具体规则如下：</div>
      <div class="text">1、每张卡最多可同时设置10个呼出白名单号码；</div>
      <div class="text">2、每格只可设置一个白名单号码，该格仅有一次删除机会，30天内最多可删除5个已设置的白名单；可删除时，通过左侧滑动，可唤出删除按钮进行删除！</div>
      <div class="text">3、设置的呼出白名单号码为11位手机号码，或者带区号的固定电话号码，输入示例：02566661234；</div>
      <div class="text">4、呼入号码不受呼出白名单限制。</div>
    </div>

    <!-- 弹框提示 -->
    <!-- <van-dialog v-model="TipsAddDialog" title="温馨提示" showCancelButton class="mealContent" :before-close="TipsAddDialogButton">
      <div class="successBox">
        <p class="red">您输入的手机号不可更改！如无异议，请确认！</p>
      </div>
    </van-dialog>
    <van-dialog v-model="addNoWhileDialog" show-cancel-button title="设置呼出白名单号码" class="mealContent" :before-close="TipsAdd">
      <div class="successBox">
        <van-field v-model="whitePhoneNum" v-show="whiteList.length < 5" label="呼出号码" placeholder="请输入呼出白名单号码" />
        <van-field v-model="nickName" v-show="whiteList.length < 5" label="称谓" placeholder="请输入称谓" />
      </div>
    </van-dialog>
    <van-dialog v-model="addWhileDialog" show-cancel-button title="设置可更改的呼出号码" class="mealContent" :before-close="addClick">
      <div class="successBox">
        <van-field v-model="whitePhoneNum" v-show="whiteList.length >= 5" label="呼出号码" placeholder="请输入可更改的号码" />
        <van-field v-model="nickName" v-show="whiteList.length >= 5" label="称谓" placeholder="请输入称谓" />
      </div>
    </van-dialog> -->

  </div>
</template>

<script>
import API from 'api/setting'
import whiteChild from './whiteChild'
export default {
  data () {
    return {
      // headerName: '呼出白名单设置',
      whiteList: [],
      numId: 1,
      surplusNum: 1,
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
      bodyColor: '#FDAB16',
      TipsAddDialog: false,
      addWhileDialog: false,
      addNoWhileDialog: false
    }
  },
  components: {
    whiteChild
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
          console.log(this.whiteList)
          this.oneWhiteList = this.whiteList.slice(0, 1)
          // console.log(this.oneWhiteList)
          this.twoWhiteList = this.whiteList.slice(1, 2)
          // console.log(this.twoWhiteList)
          this.threeWhiteList = this.whiteList.slice(2, 3)
          // console.log(this.threeWhiteList)
          this.fourWhiteList = this.whiteList.slice(3, 4)
          // console.log(this.fourWhiteList)
          this.fiveWhiteList = this.whiteList.slice(4, 5)
          // console.log(this.fiveWhiteList)
          this.sixWhiteList = this.whiteList.slice(5, 6)
          // console.log(this.sixWhiteList)
          this.sevenWhiteList = this.whiteList.slice(6, 7)
          // console.log(this.sevenWhiteList)
          this.eightWhiteList = this.whiteList.slice(7, 8)
          // console.log(this.eightWhiteList)
          this.nineWhiteList = this.whiteList.slice(8, 9)
          // console.log(this.nineWhiteList)
          this.tenWhiteList = this.whiteList.slice(9, 10)
          // console.log(this.tenWhiteList)
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
    delClick (phone) {
      this.$dialog.confirm({
        title: '温馨提醒',
        message: '每行只能删除一次，您确定要删除此呼出号码吗？'
      }).then(() => {
        const config = {
          cardNo: this.$route.query.cardNo,
          whitePhoneNum: phone
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
    addSucess () {
      // console.log('aaaaaa')
      this.getWhiteList()
    }
  }
}
</script>

<style lang="less" scoped>
.whiteList {
  border-bottom: 1px solid #ebedf0;
  line-height: 50px;
  background: #fff;
  .whiteItem {
    padding: 0 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    .xuhao {
      width: 20px;
      text-align: right;
      margin-right: 10px;
    }
    .ts {
      font-size: 14px;
      color: #fff;
      border: 1px solid red;
      background: red;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      margin: 15px 10px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
    }
  }
}
.successBox {
  padding: 20px;
  font-size: 14px;
}
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
