<template>
  <div>
    <div class="whiteList" v-for=" (item, index) in whiteList.slice(0, 5)" :key="'A' + index">
      <div v-if="item.phone === item.phone" class=" whiteItem">
        <span>{{item.phone}}</span>
        <span style="text-align: right;">{{item.nickName}}</span>
      </div>
    </div>
    <div class="whiteList" v-for=" (item, index) in whiteList.slice(5, 10)" :key="'B' + index">
      <van-swipe-cell v-if="item.phone === item.phone">
        <div class="NoItemList">
          <span class="phone">{{item.phone}}</span>
          <span style="text-align: right;">{{item.nickName}}</span>
          <span class="ts">i</span>
        </div>
        <template #right>
          <div style="margin-top:-15px">
            <van-button v-show="whiteList.length > 5" square type="danger" text="删除" @click="delClick(item.phone)" />
          </div>
        </template>
      </van-swipe-cell>
    </div>
    <van-button size="small" :color="bodyColor" type="primary" @click="addShow" v-show="whiteList.length < 5" style="margin:10px 10px 0 0; float:right;">设置</van-button>

    <van-button size="small" :color="bodyColor" type="primary" @click="addShow1" v-show="whiteList.length >= 5 && whiteList.length !== 10" style="margin:10px 10px 0 0; float:right;">设置</van-button>

    <!-- 弹框提示 -->
    <van-dialog v-model="TipsAddDialog" title="温馨提示" showCancelButton class="mealContent" :before-close="TipsAddDialogButton">
      <div class="successBox">
        <p class="red">您输入的手机号不可更改！如无异议，请确认！</p>
      </div>
    </van-dialog>
    <van-dialog v-model="addNoWhileDialog" show-cancel-button title="设置不可更改的呼出号码" class="mealContent" :before-close="TipsAdd">
      <div class="successBox">
        <van-field v-model="whitePhoneNum" v-show="whiteList.length < 5" label="呼出号码" placeholder="请输入不可更改的号码" />
        <van-field v-model="nickName" v-show="whiteList.length < 5" label="称谓" placeholder="请输入称谓" />
      </div>
    </van-dialog>
    <van-dialog v-model="addWhileDialog" show-cancel-button title="设置可更改的呼出号码" class="mealContent" :before-close="addClick">
      <div class="successBox">
        <van-field v-model="whitePhoneNum" v-show="whiteList.length >= 5" label="呼出号码" placeholder="请输入可更改的号码" />
        <van-field v-model="nickName" v-show="whiteList.length >= 5" label="称谓" placeholder="请输入称谓" />
      </div>
    </van-dialog>
    <div class="whiteTip">
      <div class="whiteTitle">电话呼出白名单管理说明：</div>
      <div class="tip">为加强对学生打出电话的管理，超级学霸卡业务使用呼出白名单管理功能，学生只能给家长设置的白名单号码打出电话，具体规则如下：</div>
      <div class="text">1、每张卡最多可设置使用10个呼出白名单号码；</div>
      <div class="text">2、最多只能删除之前设置的呼出白名单号码后重新设置（替换）新的呼出白名单号码10个；</div>
      <div class="text">3、设置的呼出白名单号码为11位手机号码，或者带区号的固定电话号码，输入示例：02566661234；</div>
      <div class="text">4、呼入号码不受呼出白名单限制。</div>
    </div>
  </div>
</template>

<script>
import API from 'api/setting'
export default {
  data () {
    return {
      // headerName: '呼出白名单设置',
      whiteList: [],
      whitePhoneNum: '',
      nickName: '',
      bodyColor: '#FDAB16',
      TipsAddDialog: false,
      addWhileDialog: false,
      addNoWhileDialog: false
    }
  },
  components: {
  },
  created () {
    this.getWhiteList()
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
          this.whiteList = res.data.reverse()
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
        var reg = 11 && /^[1][3,4,5,7,8,9][0-9]{9}$/
        if (!this.whitePhoneNum) {
          this.$toast('申请人手机不能为空，请输入您的手机号!')
          return false
        }
        if (!reg.test(this.whitePhoneNum)) {
          this.$toast('手机号格式不正确')
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
        title: '提醒',
        message: '您确定要删除此呼出号码吗？'
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
    span {
      flex: 1;
    }
  }
  .NoItemList {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    font-size: 16px;
    padding: 0 15px;
    .phone {
      flex: 1;
    }
    .ts {
      font-size: 14px;
      color: #fdab16;
      border: 1px solid #fdab16;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      margin: 15px 0 15px 5px;
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
  position: fixed;
  bottom: 0;
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
  }
  .text {
    text-indent: 2em;
  }
}
</style>
