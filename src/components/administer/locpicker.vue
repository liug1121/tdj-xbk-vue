<template>
  <div class="locpicker_info">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <iframe id="mapPage" width="100%" height="100%" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=2CHBZ-RTMRX-OJL4W-TL56C-W4235-SJFXY&referer=myapp">
    </iframe>
  </div>
</template>
<script>
// import vHeader from '../header.vue'
import API from 'api/administer'
export default {
  created () {
    this.$nextTick(() => {
      window.addEventListener('message', this.addLBS, false)
    })
  },
  data () {
    return {
      // headerName: '地图选点',
      isLoad: false
    }
  },
  components: {
    // vHeader
  },
  methods: {
    addLBS (event) {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      var loc = event.data
      if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        if (this.$route.query.status === 'add') {
          const config = {
            cardNo: this.$route.query.cardNo,
            type: this.$route.query.type,
            latitude: loc.latlng.lat,
            longitude: loc.latlng.lng,
            address: loc.poiaddress + loc.poiname,
            addressTitle: '',
            isApartAlert: true,
            isBackAlert: true
          }
          // console.log(data)
          this.$dialog.confirm({
            title: '提醒',
            message: '您确定要新增当前地址吗？'
          }).then(() => {
            API.apiAddAddress(config).then(res => {
              if (res.resultCode === 0) {
                this.$toast('新增成功')
                this.$router.replace({
                  path: '/commonAddress',
                  query: {
                    token: window.token
                  }
                })
              } else {
                this.$toast(res.resultInfo)
              }
            })
          }).catch(() => {
          })
        } else {
          const config = {
            cardNo: this.$route.query.cardNo,
            id: this.$route.query.id,
            type: this.$route.query.type,
            latitude: loc.latlng.lat,
            longitude: loc.latlng.lng,
            address: loc.poiaddress + loc.poiname,
            addressTitle: this.$route.query.addressTitle,
            isApartAlert: true,
            isBackAlert: true
          }
          // console.log(data)
          this.$dialog.confirm({
            title: '提醒',
            message: '您确定要编辑当前地址吗？'
          }).then(() => {
            API.apiEditAddress(config).then(res => {
              if (res.resultCode === 0) {
                this.$toast('编辑成功！')
                this.$router.replace({
                  path: '/commonAddress',
                  query: {
                    token: window.token
                  }
                })
              } else {
                this.$toast(res.resultInfo)
              }
            })
          }).catch(() => {
          })
        }
      }
    }
  },
  destroyed () {
    window.removeEventListener('message', this.addLBS, false)
  }
}

</script>
<style lang="less"  scoped>
.locpicker_info {
  width: 100%;
  height: 100%;
  position: relative;
  #mapPage {
    background: #fff;
    height: 600px;
  }
}
</style>
