<template>
  <!-- 修改密码 -->
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="groupLoginTitle">修改密码</div>
    <div class="box-card">
      <form action="" class="loginForm">
        <div class="loginField">
          <img class="loginIcon" :src="phoneIcon" alt="">
          <input v-model="grouppwdForm.phone" class="loginInput" type="text" placeholder="请输入您的群控账号（手机号）" />
        </div>
        <div class="loginField">
          <img class="loginIcon" :src="pawIcon" alt="">
          <input v-model="grouppwdForm.oldPwd" class="loginInput" type="password" placeholder="请输入您的原密码" />
        </div>
        <div class="loginField">
          <img class="loginIcon" :src="pawIcon" alt="">
          <input v-model="grouppwdForm.newPwd" class="loginInput" type="password" placeholder="请输入您的新密码" />
        </div>
        <div class="loginButton">
          <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" @click.native.prevent="pwdModify">确 认</van-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import VHeader from './../header'
import pawIcon from './../../common/images/QK_paw_icon.png'
import phoneIcon from './../../common/images/QK_phone_icon.png'
import API from './../../api/QKlogin'
export default {
  data () {
    return {
      // headerName: '修改密码',
      grouppwdForm: {
        newPwd: null,
        oldPwd: null,
        phone: null
      },
      pawIcon: pawIcon,
      phoneIcon: phoneIcon
    }
  },
  components: {
    // VHeader
  },
  methods: {
    pwdModify () {
      if (!this.grouppwdForm.phone) {
        this.$toast('手机号不能为空，请输入您的群控手机号!')
        return false
      }
      if (!this.grouppwdForm.oldPwd) {
        this.$toast('原始密码不能为空，请输入您的原密码!')
        return false
      }
      if (!this.grouppwdForm.newPwd) {
        this.$toast('新密码不能为空，请输入您的需要修改的密码!')
        return false
      } else {
        const data = {
          phone: this.grouppwdForm.phone,
          oldPwd: this.grouppwdForm.oldPwd,
          newPwd: this.grouppwdForm.newPwd
        }
        API.apiGroupcontrolpwdModify(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('修改成功，请重新登录！')
            this.$router.push({
              path: '/QKLogin'
            })
          } else {
            this.$toast('原密码或者帐号有误')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.groupLoginTitle {
  font-size: 0.48rem;
  text-align: center;
  padding: 1.6rem 0 0.8rem 0;
  box-sizing: border-box;
}
.box-card {
  width: 100%;
}
.loginForm {
  width: 100%;
  .loginField {
    display: flex;
    border-bottom: 1px solid #d7d7d7;
    margin: 0 15px;
    align-items: center; /*垂直居中*/
    line-height: 45px;
    font-size: 14px;
    .loginIcon {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
    }
    .loginInput {
      border: 0;
      font-size: 14px;
      flex: 1;
      margin-left: 15px;
    }
    .loginChecking {
      font-size: 16px;
      color: #ffba27;
    }
  }
  .checkedPawField {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    margin: 0 0.3rem;
  }
  .van-button--round {
    border-radius: 4px;
  }
  .loginButton {
    margin: 0.3rem;
  }
}
.modifyPassword {
  font-size: 16px;
  color: #ffba27;
  text-align: center;
  margin-top: 1rem;
}
.van-button {
  font-size: 18px;
}
</style>
