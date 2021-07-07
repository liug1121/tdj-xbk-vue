<template>
  <!-- 群控登录 -->
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="groupLoginTitle">学霸卡群控中心</div>
    <div class="box-card">
      <form action="" class="loginForm">
        <div class="loginField">
          <img class="loginIcon" :src="userIcon" alt="">
          <input v-model="groupLoginForm.userName" class="loginInput" type="text" placeholder="请输入您的群控账号（手机号）" />
        </div>
        <div class="loginField">
          <img class="loginIcon" :src="pawIcon" alt="">
          <input v-model="groupLoginForm.pwd" class="loginInput" type="password" placeholder="请输入您的密码" />
        </div>
        <div class="loginField">
          <img class="loginIcon" :src="imgIcon" alt="">
          <input class="loginInput" type="text" placeholder="请输入图像验证码" />
          <!--验证码组件-->
          <v-sidentify></v-sidentify>
        </div>
        <div class="loginField">
          <img class="loginIcon" :src="phoneIcon" alt="">
          <input v-model="groupLoginForm.verifyCode" class="loginInput" type="text" placeholder="请输入您的验证码" />
          <span class="loginChecking" @click="btnClick">{{btnTitle}}</span>
        </div>
        <!-- <div class="checkedPawField">
          <van-checkbox v-model="checkedPaw" shape="square" style="height:45px" checked-color="#ffba27">记住密码</van-checkbox>
        </div> -->
        <div class="loginButton">
          <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" @click.native.prevent="LoginButton">登 录</van-button>
        </div>
      </form>
    </div>
    <div class="modifyPassword" @click.prevent="QKModifyPwd">修改密码</div>
  </div>
</template>

<script>
// import VHeader from './../header'
import userIcon from './../../common/images/QK_user_icon.png'
import pawIcon from './../../common/images/QK_paw_icon.png'
import imgIcon from './../../common/images/QK_img_icon.png'
import phoneIcon from './../../common/images/QK_phone_icon.png'
import VSidentify from './SIdentify'
import API from './../../api/QKlogin'
export default {
  data () {
    return {
      // headerName: '群控登录',
      groupLoginForm: {
        userName: null,
        pwd: null,
        verifyCode: null
      },
      userIcon: userIcon,
      pawIcon: pawIcon,
      imgIcon: imgIcon,
      phoneIcon: phoneIcon,
      sidentify: '',
      btnTitle: '获取验证码',
      checkedPaw: true
    }
  },
  components: {
    // VHeader,
    VSidentify
  },
  created () {
  },
  methods: {
    // 点击 验证码 倒计时
    btnClick () {
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
        phone: this.groupLoginForm.userName
      }
      API.apiSmsmsgVerifycode(data).then(res => {
        if (res.resultCode === 0) {
          this.$toast('验证码发送成功！')
        } else {
          this.$toast('用户名或者密码错误!')
        }
      })
    },
    LoginButton () {
      if (!this.groupLoginForm.userName) {
        this.$toast('群控账号不能为空，请输入您的群控账号（手机号）!')
        return false
      } else if (!this.groupLoginForm.pwd) {
        this.$toast('密码不能为空，请输入您的密码!')
        return false
      } else if (!this.groupLoginForm.verifyCode) {
        this.$toast('短信验证码不能为空，请输入您的短信验证码!')
        return false
      } else {
        const data = {
          userName: this.groupLoginForm.userName,
          pwd: this.groupLoginForm.pwd,
          verifyCode: this.groupLoginForm.verifyCode
        }
        API.apiGroupcontrolLogin(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('登录成功！')
            localStorage.setItem('QKtoken', res.data.token)
            localStorage.setItem('userName', res.data.userName)
            localStorage.setItem('administratorsType', res.data.type)
            this.$router.push({
              path: '/personnel'
            })
          } else {
            this.$toast('用户名或者密码错误!')
          }
        })
      }
    },
    // 修改密码
    QKModifyPwd () {
      this.$router.push({
        path: '/QKModifyPwd'
      })
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
