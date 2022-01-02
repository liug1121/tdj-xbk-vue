<template>
  <div class="trajectory_info">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div style="height: 100%;" v-show="!isShutdown && !isTrajectoryNo">

      <div class="pop">
        <div class="start_time">
          <div>开始时间:</div>
          <div v-show="startTime==''" class="input_box" @click="onClick_setStartTime">请选择开始时间</div>
          <div v-show="startTime!=''" class="value_box" @click="onClick_setStartTime">{{startTime}}
          </div>
          <div class="el-icon-circle-close-outline clear_btn" v-show="startTime!=''" @click="onClick_clearTime(1)"></div>
          <!-- <div style="margin-right: .4rem;color:#ffba26;float: right;" >须知</div> -->
          <van-button type="primary" size="small" color="#ffba26" @click="onClick_showPop">须知</van-button>
        </div>
        <div class="end_time">
          <div>结束时间:</div>
          <div class="input_box" v-show="endTime==''" @click="onClick_setEndTime">请选择结束时间</div>
          <div v-show="endTime!=''" class="value_box" @click="onClick_setEndTime">{{endTime}}</div>
          <div class="el-icon-circle-close-outline clear_btn" v-show="endTime!=''" @click="onClick_clearTime(2)"></div>
          <!-- <div class="begin_btn" >开始</div> -->
          <van-button type="primary" size="small" color="#ffba26" @click="onClick_getPointes">查询</van-button>
        </div>
      </div>
      <div id="container" style="width:100%;height:16rem;"></div>
    </div>

    <div style="height: 100%;text-align: center;font-size: .4rem;line-height: 10rem" v-show="isShutdown">
      当前卡处于关机状态
    </div>

    <div style="height: 100%;text-align: center;font-size: .4rem;line-height: 10rem" v-show="isTrajectoryNo">
      当前卡无历史轨迹
    </div>

    <van-datetime-picker class="dateTimePicker" v-model="pickerValue" item-height="20" ref="picker" type="datetime" v-show="pickerVisible" :min-date="startDate" :max-date="endDate" @confirm="handleConfirm"
      @cancel="handleCancel" visible-item-count="10"  :formatter="formatter"/>
    <van-datetime-picker class="dateTimePicker" v-model="pickerValue2" item-height="20" ref="picker" type="datetime" v-show="pickerVisible2" :min-date="startDate" :max-date="endDate" @confirm="handleConfirm2"
      @cancel="handleCancel2" visible-item-count="10" :formatter="formatter"/>

    <div :title="'须知'" class="xuzhi" v-show="isShowXZPop" @click="onClick_closePop">
      <div style="margin-left: .2rem;margin-top: .3rem">1.只提供查询48小时内位置数据。</div>
      <div style="margin-left: .2rem">2.系统提供位置为LBS数据，与实际位置会有一定偏差。</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import vHeader from '../header.vue'
// import API from 'api/administer'
export default {
  data () {
    return {
      // headerName: '历史轨迹',
      isShowXZPop: false,
      isShutdown: false,
      isTrajectoryNo: false,
      pickerValue: '',
      pickerVisible: false,
      startTime: '',
      endTime: '',
      startDate: new Date(new Date().getTime() - 20 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      pickerValue2: '',
      pickerVisible2: false,
      startTimeDate: '',
      endTimeDate: '',
      orderNo: ''
    }
  },
  components: {
    // vHeader
  },
  created () {
    this.orderNo = JSON.parse(sessionStorage.getItem('orderNo'))
    this.init()
  },

  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      } else if (type === 'hour') {
        return `${val}时`
      } else if (type === 'minute') {
        return `${val}分`
      } else if (type === 'second') {
        return `${val}秒`
      }
      return val
    },
    init () {
      this.getCurrAddr(($point) => {
        if ($point.length !== 0) {
          // this.isTrajectoryNo = true
          this.TPosition($point)
        } else {
          this.$dialog.alert({
            message: '系统默认显示当天的历史轨迹'
          }).then(() => {
            // on close
          })
        }
      })
    },
    getPoint ($point) {
      if ($point.length !== 0) {
        this.TPosition($point)
      } else {
        this.$dialog.alert({
          message: '当前时间段此卡无历史轨迹'
        }).then(() => {
          // on close
        })
      }
    },

    TPosition ($point) {
      var posiList = $point
      var b = []
      for (var item of posiList) {
        b.push(new qq.maps.LatLng(item.latitude, item.longitude))
      }
      qq.maps.convertor.translate(b, 2, function (res) {
        var map = new qq.maps.Map(document.getElementById('container'), {
          // 地图的中心地理坐标。
          center: res[0],
          zoom: 13,
          mapTypeId: qq.maps.MapTypeId.ROADMAP // 设置地图样式详情参见MapType
        })
        var a = 0
        var marker = new qq.maps.Marker({ // eslint-disable-line no-unused-vars
          position: res[a],
          map: map
        })
        var cssC = {
          color: '#f00',
          fontSize: '2px',
          fontWeight: 'bold'
        }
        var timerId = setInterval(() => {
          var marker = new qq.maps.Marker({ // eslint-disable-line no-unused-vars
            position: res[a],
            map: map
          })
          if (a === 0 || a === res.length - 1) {
            var label = new qq.maps.Label({ // eslint-disable-line no-unused-vars
              // 如果为true，表示可点击，默认true。
              clickable: true,
              // 标签的文本。
              content: posiList[a].description,
              // 显示标签的地图。
              map: map,
              // 相对于position位置偏移值，x方向向右偏移为正值，y方向向下偏移为正值，反之为负。
              offset: new qq.maps.Size(0, 0),
              // 标签位置坐标，若offset不设置，默认标签左上角对准该位置。
              position: res[a],
              // Label样式。
              style: cssC,
              // 如果为true，表示标签可见，默认为true。
              visible: true,
              // 标签的z轴高度，zIndex大的标签，显示在zIndex小的前面。
              zIndex: 1000
            })
          }
          a++
          if (a === res.length) {
            clearInterval(timerId)
          }
        }, 100)
      })
    },
    // 时间处理 Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间) 2020-08-03 15:15:15
    handleTime ($data) {
      const y = $data.getFullYear()
      const m = ($data.getMonth() + 1 + '').padStart(2, '0')
      const d = ($data.getDate() + '').padStart(2, '0')
      const hh = ($data.getHours() + '').padStart(2, '0')
      const mm = ($data.getMinutes() + '').padStart(2, '0')
      const ss = ($data.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    getCurrAddr ($fun) {
      const endTime = this.handleTime(new Date())
      const days = 1
      // 当前时间 -1 天
      const startTime = this.handleTime(new Date(Date.now() - days * 24 * 60 * 60 * 1000))
      const cardNo = this.orderNo
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/address/travels',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          cardNo: cardNo,
          endTime: endTime,
          startTime: startTime
        })
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.positionInfo = res.data.data
          // console.log(this.positionInfo)
          $fun && $fun(this.positionInfo)
        } else {
          this.$toast(res.data.resultInfo)
        }
      })
    },

    onClick_getPointes () {
      if (this.startTime === '') {
        this.$toast('请选择开始时间')
      } else if (this.endTime === '') {
        this.$toast('请选择结束时间')
      } else {
        // console.log(this.startTime)
        // console.log(this.endTime)
        const data = {
          cardNo: this.orderNo,
          endTime: this.endTime,
          startTime: this.startTime
        }

        this.$axios({
          method: 'POST',
          url: 'wechat/v1.0/users/address/travels',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(data)
        }).then(res => {
          if (res.data.resultCode === 0) {
            this.positionInfo = res.data.data
            this.getPoint(this.positionInfo)
            // console.log(this.positionInfo)
          } else {
            this.$toast(res.data.resultInfo)
          }
        })
      }
    },
    onClick_setStartTime () {
      this.pickerVisible2 = false
      this.pickerVisible = true
    },
    onClick_setEndTime () {
      this.pickerVisible = false
      this.pickerVisible2 = true
    },
    onClick_clearTime ($type) {
      if ($type === 1) {
        this.startTimeDate = ''
        this.startTime = ''
      } else if ($type === 2) {
        this.endTimeDate = ''
        this.endTime = ''
      }
    },
    handleConfirm ($data) {
      var date = new Date($data)
      if (this.endTimeDate !== '') {
        if (this.getIntervalHour(date, new Date(this.endTimeDate)) === 0) {
          this.$toast('开始时间不得晚于结束时间')
        } else {
          this.pickerVisible = false
          this.startTimeDate = $data
          this.startTime = this.dateFtt('yyyy-MM-dd hh:mm', date)
        }
      } else {
        this.pickerVisible = false
        this.startTimeDate = $data
        this.startTime = this.dateFtt('yyyy-MM-dd hh:mm', date)
      }
    },
    handleConfirm2 ($data) {
      var date = new Date($data)

      if (this.startTimeDate !== '') {
        if (this.getIntervalHour(new Date(this.startTimeDate), date) === 0) {
          this.$toast('结束时间不得早于开始时间')
        } else {
          this.pickerVisible2 = false
          this.endTimeDate = $data
          this.endTime = this.dateFtt('yyyy-MM-dd hh:mm', date)
        }
      } else {
        this.pickerVisible2 = false
        this.endTimeDate = $data
        this.endTime = this.dateFtt('yyyy-MM-dd hh:mm', date)
      }
    },
    handleCancel () {
      this.pickerVisible = false
    },
    handleCancel2 () {
      this.pickerVisible2 = false
    },
    dateFtt (fmt, date) { // author: meizz
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3) // 季度
        // 'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    getIntervalHour ($startDate, $endDate) {
      var ms = $endDate.getTime() - $startDate.getTime()
      if (ms < 0) {
        return 0
      }
      return Math.floor(ms / 1000 / 60) + 1
    },
    onClick_showPop () {
      this.isShowXZPop = true
    },
    onClick_closePop () {
      this.isShowXZPop = false
    }
  }
}

</script>
<style lang="less" scoped>
.trajectory_info {
  width: 100%;
  height: 100%;
  position: relative;
}
#container {
  height: 100%;
}
.pop {
  position: fixed;
  top: 50;
  width: 100%;
  line-height: 40px;
  background: #ffffff;
  font-size: 0.3rem;
  z-index: 999;
  padding: 5px 10px;
  box-sizing: border-box;
  .start_time {
    display: flex;
    align-items: center;
    .input_box {
      border: 1px solid #e3e3e3;
      width: 3rem;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #cccccc;
      margin: -0.1rem 0.1rem;
      padding-left: 0.2rem;
      border-radius: 4px;
      flex: 1;
    }
  }
  .end_time {
    display: flex;
    align-items: center;
    .input_box {
      border: 1px solid #e3e3e3;
      width: 3rem;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #cccccc;
      margin: -0.1rem 0.1rem;
      padding-left: 0.2rem;
      border-radius: 4px;
      flex: 1;
    }
  }

  .value_box {
    float: left;
    border: 1px solid #e3e3e3;
    width: 3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    margin: -0.1rem 0.1rem;
    padding-left: 0.2rem;
  }
}

.clear_btn {
  margin-right: 0.1rem;
  margin-top: 0.05rem;
}
.xuzhi {
  font-size: 14px;
  z-index: 999;
  position: fixed;
  background: rgb(255, 255, 255);
  width: 100%;
  top: 81px;
  padding-bottom: 10px;
  box-sizing: border-box;
  line-height: 25px;
}
.dateTimePicker {
  position: absolute;
  bottom: 0px;
  height: 300px;
  width: 100%;
}
</style>
