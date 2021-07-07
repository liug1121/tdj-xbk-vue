<template>
  <div class='levelLinkage' v-show='chooseshow'>
    <div class='mask' @click="close"></div>
    <div class='maskLevel'>

      <!-- 热门城市 -->
      <div class='middle'>
        <p class='font16'>热门城市 <img src="../assets/quxiao.png" style='float:right;' alt="" @click="close" width=22 height=22></p>
        <div>
          <span v-for="(list,index) in hotCityData" :key="index" @click="clickProvince(list,index)" :class="{'active':currIndex===index}" class='hotCity'>{{list.name}}</span>
        </div>
      </div>
      <!-- 控件 -->
      <div class='control'>
        <div>
          <span class='tittle'> 省份</span>
          <span class='tittle'> 城市</span>
          <span class='tittle'> 区县</span>
        </div>
        <van-area :area-list="areaList" ref='area' :visible-item-count='5' :value='value' :defaultIndex='defultIndex' confirm-button-text='' @change='onChange' @confirm="onAddrConfirm" />
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    chooseshow: {
      type: Boolean
    },
    clickNo: {
      type: String,
      default () {
        return '';
      }
    },
    defultCode: {
      type: Object
    }
  },
  data () {
    return {
      provinceCityD: '请选择',
      currIndex: '',
      hotCityData: [
        { code: '110100', name: '北京', parentCode: '110000', checked: false },
        { code: '310100', name: '上海', parentCode: '310000', checked: false },
        { code: '330100', name: '杭州', parentCode: '330000', checked: false },
        { code: '440100', name: '广州', parentCode: '440000', checked: false },
        { code: '440300', name: '深圳', parentCode: '440000', checked: false },
        { code: '441900', name: '东莞', parentCode: '440000', checked: false },
        { code: '420100', name: '武汉', parentCode: '420000', checked: false },
        { code: '510100', name: '成都', parentCode: '510000', checked: false },
      ],
      value: '1100000',
      show: false,
      isVisible: true,
      defultIndex: 0,
      province_list: {},
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      province: '',
      city: '',
      district: ''
    };
  },
  created () {
    this.vueAjaxProvince();
  },
  watch: {
    defultCode: function (val) {
      if (val.provinceCode && val.cityCode && val.districtCode) {
        this.value = val.provinceCode;
        this.vueAjaxCity(val.provinceCode, val.cityCode);
        this.value = val.districtCode;
      }
    }
  },
  methods: {
    locationProvince () {
      this.value = this.locationCodeList.code;
      this.vueAjaxCity(this.locationCodeList.parentCode, this.locationCodeList.code);
    },
    clickProvince (list, index) {
      this.currIndex = index;
      this.value = list.code;
      this.vueAjaxCity(list.parentCode, list.code);
    },
    click () {
      this.show = true;
    },
    vueAjaxProvince () {
      let that = this;
      this.$API.queryProvincesCityAreaByCode({ parentCode: 100000 }).then(res => {
        let result = res.data.data.data;
        let province_list = {};
        for (let i = 0; i < result.length; i++) {
          province_list[result[i].code] = result[i].name;
        }
        that.areaList['province_list'] = province_list;
        if (that.clickNo === 'send' && that.locationCodeList) {//如果是寄件
          that.vueAjaxCity(that.locationCodeList.parentCode, that.locationCodeList.code);
        } else {
          let parentCode = 110000;
          that.vueAjaxCity(parentCode);
        }

      });
    },
    vueAjaxCity (parentCode, code) {
      let that = this;
      // this.loading = this.$toast.loading();
      this.$API.queryProvincesCityAreaByCode({ parentCode: parentCode }).then(res => {
        let result = res.data.data.data;
        let city_list = {};
        for (let i = 0; i < result.length; i++) {
          city_list[result[i].code] = result[i].name;
        }
        that.areaList['city_list'] = city_list;
        if (code) {
          parentCode = code;
        } else {
          parentCode = Object.keys(city_list)[0];
        }
        that.vueAjaxdirect(parentCode);
      });
    },
    vueAjaxdirect (parentCode) {
      let that = this;
      // this.loading = this.$toast.loading();
      this.$API.queryProvincesCityAreaByCode({ parentCode: parentCode }).then(res => {
        let result = res.data.data.data;
        let county_list = {};
        for (let i = 0; i < result.length; i++) {
          county_list[result[i].code] = result[i].name;
        }
        that.hotCityData.map(function (value, index) {
          if (value.code === parentCode) {
            that.currIndex = index;
          }
        });
        that.areaList['county_list'] = county_list;
      });
    },
    //点击确定按钮
    onAddrConfirm (e) {
      if (e[0] && e[1] && e[2] && e[1]) {
        this.province = e[0].name;
        this.city = e[1].name;
        this.district = e[2].name;
        this.provinceCityD = e[0].name + '-' + e[1].name + '-' + e[2].name;
        if (this.clickNo === 'addressBook') {//地址薄页面
          this.$emit('provinceData', e);
        } else if (this.clickNo === 'send') {
          this.$emit('func', this.provinceCityD, e[1].code, e[2].code);
        } else {
          this.$emit('funcild', this.provinceCityD, e[1].code, e[2].code);
        }
        this.$emit('update:chooseshow', false);
      } else {
        this.$refs.area.reset();
      }

    },
    //value=0改变省，1改变市，2改变区
    onChange (picker, index, value) {
      let val = picker.getValues();
      if (value === 0) {
        let parentCode = val[0].code;
        this.value = parentCode;
        this.vueAjaxCity(parentCode);
      } else if (value === 1) {
        let parentCode = val[value].code;
        this.value = parentCode;
        this.vueAjaxdirect(parentCode);
      }
    },
    close () {
      this.$emit('update:chooseshow', false);
    }
  }
};
</script>
<style lang='less' scoped>
.levelLinkage {
  width: 100%;
  height: 100vh;
  .font16 {
    font-size: 16px;
  }
  .mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
  }
  .maskLevel {
    background-color: #fff;
    position: fixed;
    bottom: 70px;
    width: 100%;
    z-index: 1;
    .header {
      width: 100%;
      height: 93px;
      padding: 15px 20px 10px 20px;
      border-bottom: 1px solid #e8e8e8;
      p {
        line-height: 30px;
        img {
          vertical-align: middle;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .middle {
      margin: 10px 0 20px 0;
      p {
        padding: 5px 20px 15px 20px;
        border-bottom: 1px solid #e8e8e8;
      }
      .center {
        text-align: center;
      }
      .hotCity {
        display: inline-block;
        margin-left: 5%;
        margin-top: 10px;
        width: 18%;
        height: 30px;
        background-color: #f0f0f0;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
      }
      .active {
        background: rgba(255, 250, 236, 1);
        border: 1px solid #fdb60c;
        color: #fda20c;
      }
    }
  }
  .control {
    .tittle {
      display: inline-block;
      margin-left: 3%;
      margin-top: 10px;
      width: 30%;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
  .footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 70px;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);
    .operaBtn {
      width: 90%;
      height: 50px;
      background-color: #fdb60c;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 50px;
      color: #fff;
      border-radius: 4px;
    }
  }
  /deep/.van-picker__toolbar {
    width: 100%;
    height: 70px;
    position: absolute;
    bottom: -70px;
    background-color: #fff;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);
  }
  /deep/ .van-picker__cancel {
    display: none;
  }
  /deep/.van-picker__confirm {
    text-align: center;
    line-height: 50px;
    width: 90%;
    height: 50px;
    background-color: #fdb60c;
    color: #fff;
    margin-left: 5%;
    border-radius: 4px;
  }
  /deep/.van-ellipsis {
    white-space: normal;
  }
  /deep/.van-picker-column__item--selected {
    color: #fdb60c;
  }
}
</style>
