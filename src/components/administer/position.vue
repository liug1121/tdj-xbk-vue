<template>
  <div style="height: 100%">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div style="height: 100%" v-show="!isShutdown">
      <div id="container" style="width:100%;min-height:16rem;"></div>
      <div class="pop">
        注：系统获取的位置和实际位置有一定误差；
      </div>

      <div class="footer" v-show="isLoad">
        <div class="el-icon-refresh refresh" @click="onClick_refresh"></div>
        <div class="name">{{positionInfo.description}}</div>
        <div class="address">{{positionInfo.dateTime}}</div>
      </div>
    </div>

    <div style="height: 100%;text-align: center;line-height: 100%;font-size: .4rem;line-height: 10rem" v-show="isShutdown">
      当前卡处于关机状态
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
// import vHeader from '../header.vue'
import API from 'api/administer'
import { TMap } from './TMap'
export default {

  data () {
    return {
      // headerName: '当前位置',
      isShutdown: false,
      isLoad: false,
      description: '',
      address: '',
      orderNo: '',
      positionInfo: {}
    }
  },
  created () {
    this.orderNo = JSON.parse(sessionStorage.getItem('orderNo'))
    this.init()
  },
  components: {
    // vHeader
  },
  methods: {
    init () {
      // 创建marker
      this.getCurrAddr(($point) => {
        // console.log($point)
        TMap('2CHBZ-RTMRX-OJL4W-TL56C-W4235-SJFXY').then(qq => {
          const center = new qq.maps.LatLng($point.latitude, $point.longitude)
          var map = new qq.maps.Map(document.getElementById('container'), {
            // 地图的中心地理坐标。
            center: center,
            zoom: 13,
            zoomControl: true,
            // 设置缩放控件的位置和样式
            zoomControlOptions: {
              // 设置缩放控件的位置为相对左方中间位置对齐.
              position: qq.maps.ControlPosition.LEFT_CENTER,
              // 设置缩放控件样式为仅包含放大缩小两个按钮
              style: qq.maps.ZoomControlStyle.SMALL
            },
            mapTypeControl: false
          })
          var marker = new qq.maps.Marker({ // eslint-disable-line no-unused-vars
            position: center,
            map: map
          })
          this.description = $point.description
          // console.log(map)
          this.isLoad = true
        })
      })
    },
    getCurrAddr ($fun) {
      const cardNo = this.orderNo
      API.apiCurrAddr(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.positionInfo = res.data
          // console.log(this.positionInfo)
          $fun && $fun(this.positionInfo)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },

    onClick_refresh () {
      // 刷新位置
      this.init()
    }

  }
}

</script>
<style type="text/css" lang="less" scoped>
#container {
  height: 100%;
}

.pop {
  position: fixed;
  top: 0;
  width: 100%;
  background: #ffffff;
  font-size: 0.25rem;
  color: #ffba26;
  padding: 0.2rem;
  box-sizing: border-box;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #ffffff;
  .name {
    font-size: 0.4rem;
    font-weight: 600;
    margin: 0.2rem;
  }
  .address {
    width: 6rem;
    font-size: 0.3rem;
    margin: 0.2rem;
  }
  .refresh {
    float: right;
    font-size: 0.8rem;
    margin: 0.3rem 0.3rem;
    color: #febb16;
  }
}
</style>
