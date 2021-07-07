<template>
  <div class="portraitEdit">
    <van-uploader :after-read="onRead">
      <img v-if="this.$route.query.iconUrl ===''" :src="imageUrls" v-show="oldIconUrl">
      <span v-else>
        <img :src="iconUrl" ref="usersImg" v-show="oldIconUrl">
        <img :src="iconUrlNew" ref="usersImgNew" v-show="newIconUrl">
      </span>
    </van-uploader>
    <span class="ts">点击图片可更换头像</span>
  </div>
</template>

<script>
import API from 'api/setting'
import imageUrls from 'common/images/icon-user.png'
export default {
  data () {
    return {
      cardNo: this.$route.query.cardNo,
      bodyColor: '#FDAB16',
      imageUrls,
      iconUrl: this.$route.query.iconUrl,
      iconUrlNew: '',
      oldIconUrl: true,
      newIconUrl: false
    }
  },
  components: {},
  methods: {
    onRead (file) {
      const data = new FormData()
      data.append('icon', file.file)
      API.apiUploadIcon(data).then(res => {
        if (res.resultCode === 0) {
          this.$dialog.confirm({
            title: '提醒',
            message: '您确定要修改头像？',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.oldIconUrl = false
            this.newIconUrl = true
            this.iconUrlNew = res.data.pathName
            const config = {
              cardNo: this.$route.query.cardNo,
              iconUrl: this.iconUrlNew,
              userName: this.$route.query.studentName
            }
            // console.log(JSON.stringify(config))
            API.apiStudentName(config).then(res => {
              if (res.resultCode === 0) {
                this.$toast('修改成功')
                this.$router.push({
                  path: '/setting'
                })
              } else {
                this.$toast(res.resultInfo)
              }
            })
          }).catch(() => {
            this.oldIconUrl = true
            this.newIconUrl = false
          })
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    addClick () {

    }
  }
}
</script>

<style lang="less" scoped>
.portraitEdit {
  margin: 10px;
  img {
    width: 100%;
    display: block;
  }
  .van-uploader {
    position: relative;
    display: block;
  }
  .ts {
    font-size: 18px;
    color: red;
  }
}
</style>
