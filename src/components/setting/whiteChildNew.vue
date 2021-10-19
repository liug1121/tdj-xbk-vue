<template>
  <div>
    <div class="whiteList">
      <div class="whiteItem" @click="addShow" v-show="WhiteList.length === 0">
        <p class="xuhao">{{numId}}</p>
        <span style="color: #aeaeae;flex: 1; line-height:18px;">{{Whitetext}}</span>
        <span class="ts">!</span>
        <span style="text-align: right;">
          <span style="line-height:20px; padding:5px 0;color: #aeaeae;">
            <p v-if="deletesLength == 0 || (deletesLength == 1 && numId !=5)||(deletesLength == 2 && numId < 4)||(deletesLength == 3 && numId < 3)||(deletesLength == 4 && numId < 2)||(deletesLength == 5 && numId < 1)">
              剩余删除次{{surplusNum}}次</p>
            <p v-else>{{delTextZero}}</p>
          </span>
        </span>
      </div>
      <van-swipe-cell v-for=" (item, index) in WhiteList" :key="index">
        <div class="whiteItem">
          <p class="xuhao">{{numId}}</p>
          <span style="line-height:20px; padding:5px 0;flex: 1;">
            <p>{{item.phone}}</p>
            <p style="color: #aeaeae">{{item.nickName}}</p>
          </span>
          <span class="ts">!</span>
          <span style="text-align: right;">
            <span style="line-height:20px; padding:5px 0;color: #aeaeae;">
              <p v-if="deletesLength == 0 || (deletesLength == 1 && numId !=5)||(deletesLength == 2 && numId < 4)||(deletesLength == 3 && numId < 3)||(deletesLength == 4 && numId < 2)||(deletesLength == 5 && numId < 1)">
                剩余删除次{{surplusNum}}次</p>
              <p v-else>{{delTextZero}}</p>
            </span>
          </span>
        </div>
        <template #right
          v-if="deletesLength == 0 || (deletesLength == 1 && numId !=5)||(deletesLength == 2 && numId < 4)||(deletesLength == 3 && numId < 3)||(deletesLength == 4 && numId < 2)||(deletesLength == 5 && numId < 1)">
          <div style="margin-top:-15px">
            <van-button square type="danger" text="删除" @click="delClick(item,numId)" />
          </div>
        </template>
        <template #right v-else>
        </template>
      </van-swipe-cell>
    </div>
    <!-- 弹框提示 -->
    <van-dialog v-model="TipsAddDialog" title="温馨提示" showCancelButton class="mealContent" :before-close="TipsAddDialogButton">
      <div class="successBox">
        <p class="red">您确认要设置此呼出号码？如无异议，请确认！</p>
      </div>
    </van-dialog>
    <van-dialog v-model="addWhileDialog" show-cancel-button title="设置呼出白名单号码" class="mealContent" :before-close="TipsAdd">
      <div class="successBox">
        <van-field v-model="whitePhoneNum" label="呼出号码" placeholder="请输入呼出白名单号码" />
        <van-field v-model="nickName" label="称谓" placeholder="请输入称谓" />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import API from 'api/setting'
export default {
  props: ['WhiteList', 'numId', 'deletesLength'],
  data () {
    return {
      whitePhoneNum: '',
      nickName: '',
      bodyColor: '#FDAB16',
      TipsAddDialog: false,
      addWhileDialog: false,
      surplusNum: 1,
      surplusNum0: 0,
      Whitetext: '请设置呼出白名单号码',
      delTextOne: '剩余删除次1次',
      delTextZero: '剩余删除次0次'
    }
  },
  components: {
  },
  created () {
  },
  watch: {
  },
  methods: {
    // 点击设置呼出白名单
    addShow () {
      this.addWhileDialog = true
    },

    // 提交
    TipsAdd (action, done) {
      if (action === 'confirm') {
        var reg = 11 && (/^([1][3,4,5,7,8,9][0-9]{9}) || (0\\d{2,3}\\d{7,8}) $/)
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
        done()
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
        whitePhoneNum: this.whitePhoneNum,
        id: this.numId
      }
      API.apiAddWhite(config).then(res => {
        if (res.resultCode === 0) {
          this.$toast('新增成功')
          this.whitePhoneNum = ''
          this.nickName = ''
          this.addWhileDialog = false
          this.$emit('addSucess')
        } else {
          this.$toast('失败:' + res.resultInfo)
          this.whitePhoneNum = ''
          this.nickName = ''
          this.addWhileDialog = false
          this.$emit('addSucess')
        }
      })
    },
    // 删除
    delClick ($item, numId) {
      this.$emit('deleteChild', $item)
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
    font-size: 14px;
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
</style>
