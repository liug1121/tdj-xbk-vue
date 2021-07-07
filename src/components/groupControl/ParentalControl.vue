<template>
  <div class="parentalControlBox">
    <div class="bannerBox"><img :src="bannerImg" width="100%"></div>
    <div class="explainBox"><span class="school">{{datainfo.school}}</span>学校的<span class="teacher">{{datainfo.teacher}}</span>老师向您申请管理<span class="student">{{datainfo.name}}</span>同学的超级学霸卡，您同意后将<span
        class="teacher">{{datainfo.teacher}}</span>老师接管<span class="student">{{datainfo.name}}</span>同学的学霸卡通讯功能管理权限</div>
    <div class="studentBox">
      <img :src="imageUrls" alt="学生头像">
      <div class="studentItem">
        <div class="name">
          <span>学生姓名：</span>
          <span>{{datainfo.name}}</span>
        </div>
        <div class="name">
          <span>手机号：</span>
          <span>{{datainfo.phone}}</span>
        </div>
      </div>
    </div>
    <div class="agreementTYBox">
      <van-checkbox v-model="ischecked" checked-color="#FFB525" icon-size="14px"></van-checkbox>
      我已同意并阅读<span style="color: #ffba26" @click="onClick_openAgreeBox">《学霸卡控权管理服务协议》</span>
    </div>
    <div class="bottonTarbar">
      <div class="b_Button" @click="consent">同意</div>
      <div class="b_Button">拒绝</div>
    </div>
    <!-- 入网协议组件 -->
    <card-agreement ref="agreementRef"></card-agreement>
  </div>
</template>

<script>
import bannerImg from 'common/images/invite.jpg'
// import bannerImg from 'common/images/banner1.png'
import imageUrls from 'common/images/icon-user.png'
import cardAgreement from './cardAgreement'
import API from './../../api/QKlogin'
export default {
  data () {
    return {
      bannerImg: bannerImg,
      imageUrls: imageUrls,
      // 协议选择
      ischecked: true,
      datainfo: {}
    }
  },
  created () {
    // 自动获取地址栏链接带？以及后面的字符串
    var url = decodeURI(window.location.href)
    // console.log(url)
    // 定义一个空对象
    var obj = {}
    // 如果字符串里面存在?
    var arr1 = url.split('?')
    var arr2 = arr1[1].split('&')
    for (var i = 0; i < arr2.length; i++) {
      var res = arr2[i].split('=')
      obj[res[0]] = res[1]
    }
    // console.log(obj)
    this.datainfo = obj
  },
  components: {
    cardAgreement
  },
  methods: {
    onClick_openAgreeBox () {
      this.$refs.agreementRef.showAgreement = true
    },
    consent () {
      const data = {
        studentId: Number(this.datainfo.studentId)
      }
      // console.log(data)
      API.apiStudentControltypeModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$toast('已同意学校管控！')
        } else {
          this.$toast('学校管控失败!')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.parentalControlBox {
  font-family: 'Microsoft YaHei';
  font-size: 16px;
  background: #f2f2f2;
  height: 100%;
  .explainBox {
    padding: 0.4rem 0.2rem;
    color: #3d3d3d;
    letter-spacing: 0.2px;
    line-height: 26px;
    .school {
      color: #035fbd;
      // padding: 0 5px;
    }
    .teacher {
      color: #035fbd;
      // padding: 0 5px;
    }
    .student {
      color: #035fbd;
      // padding: 0 5px;
    }
  }
  .studentBox {
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    background: #fff;
    margin: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    img {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      margin: 0 0.4rem;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      padding: 2px;
      box-sizing: border-box;
    }
    .studentItem {
      color: #3d3d3d;
      line-height: 26px;
      font-size: 16px;
    }
  }

  .agreementTYBox {
    position: fixed;
    bottom: 40px;
    left: 0;
    background: #fff;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 10px;
    text-align: center;
    z-index: 2000;
    .van-checkbox {
      display: inline-block;
      font-size: 10px;
      vertical-align: middle;
    }
    a {
      color: #ffb525;
    }
  }
  .bottonTarbar {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffb525;
    height: 40px;
    line-height: 40px;
    width: 100%;
    display: flex;
    z-index: 2000;
    .b_Button {
      color: #fff;
      font-size: 16px;
      flex: 1;
      border-right: 1px solid #fff;
      text-align: center;
    }
    .b_Button:last-child {
      border-right: 0;
      color: red;
    }
  }
}
</style>
