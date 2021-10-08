<template>
  <!-- 设置 -->
  <div class="activate_content">
    <!-- <v-header :headerName="headerName"></v-header> -->

    <div class="box-card" v-show="isShowAll">
      <div class="settingList">
        <div class="settingTitle">头像</div>
        <div class="settingContent" @click="onClickEdit('portraitEdit')">
          <img v-if="currCard.iconUrl === '' || currCard.iconUrl === undefined" :src="imageUrls" alt="用户头像">
          <img v-else :src="currCard.iconUrl" alt="">
        </div>
        <van-icon class="settingIcon" name="arrow" :color="bodyColor" />
      </div>
      <div class="settingList">
        <!-- @click="onClickEdit('cardNoEdit')" -->
        <div class="settingTitle">手机号</div>
        <div class="settingContent">{{currCard.cardNo}}</div>
        <!-- <van-icon class="settingIcon" name="arrow" :color="bodyColor" /> -->
      </div>
      <div class="settingList" @click="onClickEdit('studentNameEdit')">
        <div class="settingTitle">学生姓名</div>
        <div class="settingContent">{{currCard.studentName}}</div>
        <van-icon class="settingIcon" name="arrow" :color="bodyColor" />
      </div>
      <div class="settingList" @click="onClickEdit('whiteEdit')">
        <div class="settingTitle">呼出的白名单设置</div>
        <div class="settingContent"></div>
        <van-icon class="settingIcon" name="arrow" :color="bodyColor" />
      </div>
      <div class="changeButtonBox">
        <div class="s-change" @click="xbkChange">
          <van-icon class="vertical_align" name="exchange" :color="bodyColor" />
          切换学霸卡
        </div>
      </div>
      <div class="changeButtonBox">
        <div class="unbindButton" @click="showCardUnbind">
          解绑
        </div>
      </div>
      <div class="certification">
        <img src="../../common/images/certification-logo.png" alt="">
      </div>
      <div class="certificationText">
        <div class="textLarge">长按二维码，进入联通官方小程序，进行实名认证</div>
      </div>
    </div>

    <!-- 切换学霸卡 弹框 -->
    <van-dialog v-model="showCardDialog" class="mealContent">
      <div class="cardChangeBox">
        <div class="cardChangeItem" v-for="item in cardList" :key="item.iccid" @click="cardChange(item)">
          <div class="cardImg">
            <img v-if="item.iconUrl === ''" :src="imageUrls" alt="用户头像">
            <img v-else :src="item.iconUrl" alt="">
          </div>
          <div class="cardName">
            <div>{{item.studentName}}</div>
            <div v-if="item.status === 0">未实名</div>
            <div v-else-if="item.status === 1">已实名</div>
            <div v-else>已激活</div>
          </div>
          <div class="cardNumber">
            <!-- <div>{{item.iccid}}</div> -->
            <div>{{item.cardNo}}</div>
          </div>
        </div>
      </div>
    </van-dialog>
    <!-- 解绑卡 -->
    <van-dialog v-model="showCardUnbindDialog" class="mealContent" show-cancel-button :beforeClose="CardUnbindUnbind">
      <div class="cardChangeBox">
        <p>您确认<span>{{currCard.cardNo}}</span>与超级学霸卡公众号解绑吗？</p>
      </div>
    </van-dialog>
    <div v-show="!isShowAll" style="text-align: center;height:100%;margin-top: 3rem;font-size: .4rem;line-height: .6rem">
      <div>您当前暂无学霸卡,</div>
      <div>
        现在去<span style="color: rgb(255, 186, 40)" @click="onClick_goPage2('applyCard')">申请</span>或<span style="color: rgb(255, 186, 40);" @click="onClick_goPage2('activation')">激活</span>。
      </div>
    </div>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
import imageUrls from 'common/images/icon-user.png'
import API from 'api/setting'
export default {
  data () {
    return {
      // headerName: '设置',
      bodyColor: '#FDAB16',
      // 卡列表
      cardList: [],
      imageUrls,
      currCard: {},
      showCardDialog: false,
      isShowAll: true,
      showCardUnbindDialog: false
    }
  },
  components: {
    // vHeader
  },

  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
    this.getCardList()
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
            this.currCard = this.cardList[0]
            sessionStorage.setItem('currCard', JSON.stringify(this.currCard))
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
    cardChange ($item) {
      sessionStorage.setItem('currCard', JSON.stringify($item))
      this.currCard = JSON.parse(sessionStorage.getItem('currCard'))
      this.showCardDialog = false
    },
    onClickEdit ($router) {
      const currCard = JSON.parse(sessionStorage.getItem('currCard'))
      var currChid = {
        cardNo: currCard.cardNo,
        iconUrl: currCard.iconUrl,
        studentName: currCard.studentName
      }

      sessionStorage.setItem('currChild', '')
      sessionStorage.setItem('currChild', JSON.stringify(currChid))

      this.$router.push({
        path: '/' + $router,
        query: {
          cardNo: currCard.cardNo,
          iconUrl: currCard.iconUrl,
          studentName: currCard.studentName,
          fwAcccount: currCard.fwAcccount
        }
      })
    },
    onClick_goPage2 ($router) {
      this.$router.push({
        path: '/' + $router,
        query: {
          token: window.token
        }
      })
    },
    // 解绑
    showCardUnbind () {
      this.showCardUnbindDialog = true
    },
    CardUnbindUnbind (action, done) {
      if (action === 'confirm') {
        const data = {
          phone: this.currCard.cardNo
        }
        API.apiCardsUnbind(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('成功解绑！')
            this.showCardUnbindDialog = false
            done()
          } else {
            this.$toast(res.resultInfo)
          }
        })
      } else if (action === 'cancel') {
        done() // 关闭
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/setting.less);
</style>
