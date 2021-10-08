<template>
  <!-- 绑定学霸卡 -->
  <div class="activate_content">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="box-card">
      <van-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <div class="avatar-box">
          <div class="avatar-label">学生头像</div>
          <van-uploader :after-read="onRead">
            <img :src="ruleForm.iconUrl" ref="usersImg" class="avatar" v-show="oldIconUrl">
            <img :src="ruleForm.iconUrlNew" ref="usersImgNew" class="avatar" v-show="newIconUrl">
          </van-uploader>
        </div>
        <van-field v-model="ruleForm.studentName" label="学生姓名" placeholder="请输入学生姓名" />
        <van-field v-model="ruleForm.orderPhone" label="家长手机号" placeholder="请输入家长手机号" />
        <van-field v-model="ruleForm.iccid" label="ICCID" placeholder="请输入19位ICCID号，或者点击扫描">
          <template #button>
            <van-button icon="scan" type="primary" color="#FFBA27" style="width:20px;height:30px; positon:absolute;right:0;" @click="startRecognize" />
          </template>
        </van-field>
        <div class="ts">根据下图提示输入或扫描</div>
      </van-form>
    </div>

    <div class="activate_con">
      <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" @click="activationButton">绑定</van-button>
    </div>
    <div class="wrap-card-demo">
      <p class="title">您收到的学霸卡</p>
      <div class="card-demo"></div>
    </div>
  </div>
</template>

<script>
import imageUrls from 'common/images/person.png'
// import FileSelect from './selectFileBtn.vue'
import wx from 'weixin-jsapi'
import { Toast } from 'vant'
import API from 'api/activation'
export default {
  data () {
    return {
      ruleForm: {
        studentName: '',
        orderPhone: '',
        iccid: '',
        iconUrl: imageUrls,
        iconUrlNew: ''
      },
      oldIconUrl: true,
      newIconUrl: false,
      isShowUpload: true,
      childrenImage: ''
    }
  },
  components: {
    // FileSelect
  },
  created () {
    API.apiSigin({ url: window.location.href.split('#')[0] }).then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx92971625eac3ce35', // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
        })
        wx.hideAllNonBaseMenuItem()
      })
    }, $error => {
      // Toast({message: $error.resultView});
    })
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  methods: {
    getSelectedFile ($data) {
      const icon = {
        file: $data.files[0],
        name: $data.name
      }
      var fileSize = $data.files[0].size
      if (fileSize / 1024 / 1024 < 10) {
        $($data).localResizeIMG({
          quality: 0.1,
          success: (result) => {
            this.childrenImage = result.base64
            this.isShowUpload = false
          }
        })
      }
      const data = new FormData()
      data.append('icon', icon.file)
      // API.apiUploadIcon(data).then(res => {
      //   if (res.resultCode === 0) {
      //     // this.oldIconUrl = false
      //     // this.newIconUrl = true
      //     // this.ruleForm.iconUrlNew = res.data.pathName
      //   } else {
      //     this.$toast(res.resultInfo)
      //   }
      // })
    },
    getSelectedError ($error) {
    },
    startRecognize () {
      var _self = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          // alert(JSON.stringify(res))
          var iccid = res.resultStr.split('CODE_128,')[1]
          if (!iccid) {
            iccid = res.resultStr
          }
          if (!iccid && iccid.length !== 19) {
            return Toast('获取数据错误，请重新扫描')
          }
          // alert(iccid)
          _self.ruleForm.iccid = iccid
        }
      })
    },
    onRead (file) {
      if (file.file.size / 1024 > 1024) {
        // 创建Canvas对象(画布)
        const canvas = document.createElement('canvas')
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        const context = canvas.getContext('2d')
        // 创建新的图片对象
        const img = new Image()
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          // 指定canvas画布大小，该大小为最后生成图片的大小
          canvas.width = 300
          canvas.height = 300
          /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，300，300是将图片按给定的像素进行缩小。
        如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。 */
          context.drawImage(img, 0, 0, 300, 300)
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 0.92)
          // base64转blob
          const base64ToBlob = function (base64Data) {
            const arr = base64Data.split(',')
            const fileType = arr[0].match(/:(.*?);/)[1]
            const bstr = atob(arr[1])
            let l = bstr.length
            const u8Arr = new Uint8Array(l)
            while (l--) {
              u8Arr[l] = bstr.charCodeAt(l)
            }
            return new Blob([u8Arr], {
              type: fileType
            })
          }
          // blob转file
          const blobToFile = function (newBlob, fileName) {
            newBlob.lastModifiedDate = new Date()
            newBlob.name = fileName
            return newBlob
          }
          const blob = base64ToBlob(file.content)
          const fileNew = blobToFile(blob, '123.jpeg')
          const formData = new FormData()
          formData.append('icon', fileNew)
          this.GetUploadIcon(formData)
        }
      } else {
        const data = new FormData()
        data.append('icon', file.file)
        this.GetUploadIcon(data)
      }
    },
    GetUploadIcon (data) {
      API.apiUploadIcon(data).then(res => {
        if (res.resultCode === 0) {
          this.oldIconUrl = false
          this.newIconUrl = true
          this.ruleForm.iconUrlNew = res.data.pathName
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    activationButton () {
      var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
      var stuCardReg = /^[0-9]{19}/
      if (!this.ruleForm.studentName) {
        this.$toast('学生姓名不能为空，请输入学生姓名!')
        return false
      }
      if (!this.ruleForm.orderPhone) {
        this.$toast('申请人手机不能为空，请输入您的手机号!')
        return false
      }
      if (!reg.test(this.ruleForm.orderPhone)) {
        this.$toast('手机号格式不正确')
        return false
      }
      if (!this.ruleForm.iccid) {
        this.$toast('ICCID不能为空，请输入或扫描您的ICCID号')
      }
      if (!stuCardReg.test(this.ruleForm.iccid)) {
        this.$toast('您输入的ICCID号不足19位，请重新输入')
        return false
      } else {
        if (this.oldIconUrl) {
          const config = {
            studentName: this.ruleForm.studentName,
            orderPhone: this.ruleForm.orderPhone,
            iccid: this.ruleForm.iccid,
            iconUrl: ''
          }
          API.apiAddaActivation(config).then(res => {
            if (res.resultCode === 0) {
              this.$toast('学霸卡绑定成功！')
              const cardNo = res.data.cardNo
              sessionStorage.setItem('cardNo', JSON.stringify(cardNo))
              if (res.data.realStatus === 0) {
                this.$router.push({
                  path: '/activateCard'
                })
              } else {
                this.$router.push({
                  path: '/administer'
                })
              }
            } else {
              this.$toast(res.resultInfo)
            }
          })
        } else {
          const config = {
            studentName: this.ruleForm.studentName,
            orderPhone: this.ruleForm.orderPhone,
            iccid: this.ruleForm.iccid,
            iconUrl: this.ruleForm.iconUrlNew
          }
          API.apiAddaActivation(config).then(res => {
            if (res.resultCode === 0) {
              this.$toast('学霸卡绑定成功！')
              const cardNo = res.data.cardNo
              sessionStorage.setItem('cardNo', JSON.stringify(cardNo))
              if (res.data.realStatus === 0) {
                this.$router.push({
                  path: '/activateCard'
                })
              } else {
                this.$router.push({
                  path: '/administer'
                })
              }
            } else {
              this.$toast(res.resultInfo)
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/activation.less);
.user-icon {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.08rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    font-size: 0.12rem;
  }
  .user-icon-deafult {
    width: 100%;
    height: 100%;
    background: url(../../common/images/icon-user.png) no-repeat 100% 100%;
    background-size: cover;
  }
  .upload-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    color: #ffffff;
    cursor: pointer;
    .wrap-upload-tip {
      background-color: rgba(0, 0, 0, 0.25);
      height: 100%;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      p:first-child {
        font-size: 0.3rem;
        line-height: initial;
      }
      p:nth-child(2) {
        font-size: 0.24rem;
        margin-top: 0.1rem;
        line-height: initial;
      }
    }
    .wrap-upload-btn {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
    }
  }
}
</style>
