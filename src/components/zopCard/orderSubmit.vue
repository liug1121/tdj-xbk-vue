<template>
  <div class="page">
    <div class="custom">
        <div class="title">入网信息</div>
        <table>
            <tr>
                <td class="label"><span>*</span>入网人姓名：</td>
                <td><input/></td>
            </tr>
            <tr>
                <td><span>*</span>身份证：</td>
                <td><input/></td>
            </tr>
            <tr>
                <td><span>*</span>联系电话：</td>
                <td><input type="tel"/></td>
            </tr>
            <tr>
                <td><span>*</span>收货地址：</td>
                <td>
                    <van-field v-model="postAreaCode" readonly clickable name="area" :value="value" label="" placeholder="请选择配送区域" @click="showArea = true" right-icon="arrow" />
                    <van-popup v-model="showArea" position="bottom">
                    <van-picker show-toolbar title="配送区域" :columns="areaList" @confirm="onAddrAreaConfirm" @change="onAreaChange" @cancel="onAreaCancel" :item-height="28" visible-item-count="12" />
                    </van-popup>
                </td>
            </tr>
            <!-- <tr>
                <td><span>*</span>收货地市：</td>
                <td><input/></td>
            </tr>
            <tr>
                <td><span>*</span>收货区县：</td>
                <td><input/></td>
            </tr> -->
        </table>
         <table>
            <tr>
                <td><span>*</span>订购号码：</td>
                <td class="cardNum"></td>
                <td @click="toCardSel">选择号码</td>
            </tr>
        </table>
    </div>
    <div class="pay-btn">提交</div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
    <div class="card-sel-dlg" @touchmove.prevent v-if="selCardNumDlgShow">
        <div class="sel-title">选择号码</div>
        <table>
            <tr>
                <td>号码</td>
            </tr>
            <tr>
                <td>18676767676</td>
            </tr>
            <tr>
                <td>18676767676</td>
            </tr>
        </table>
        <div class="sel-btn" @click="cardSelOk">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
        areaList: [
        {
          values: '',
          className: 'column1'
        },
        {
          values: '',
          className: 'column2',
          defaultIndex: 0
        },
        {
          values: '',
          className: 'column3',
          defaultIndex: 0
        }
      ],
        postAreaCode: '',
        value: '',
        showArea: false,
        loadingShow: false,
        selCardNumDlgShow: false
    }
  },
  created() {
  },
  methods: {
    cardSelOk: function() {
        this.selCardNumDlgShow = false
    },
    toCardSel: function() {
        this.selCardNumDlgShow = true
    },
    onAreaChange: function(picker, index, value) {
    },
    onAddrAreaConfirm: function(e) {
        this.showArea = false
    },
    onAreaCancel: function() {
        this.showArea = false
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: silver;
    padding-top: 10px;
    font-size: 15px;
    color: #aaa;
}
.custom{
    margin-top:2.5%;
    border: 1px solid white;
    border-radius:15px;
    background: white;
    height: 95%;
    width: 95%;
    margin-left: 2.5%;
}
.card{
    border: 1px solid white;
    border-radius:15px;
    background: white;
}
.label{
    width: 30%;
}
table{
    margin: 5%;
    // border: 1px solid black;
    width: 93%;
}
tr{
    height: 70px;
}
td{
    text-align: left;
    // border: 1px solid black;
}
.cardNum{
    width: 40%;
}
input{
    height: 35px;
    width: 98%;
    border: 1px solid #FDAB16;
    border-radius:10px;

}
span{
    color: red;
}
.pay-btn{
    position: fixed;
    width: 60%;
    bottom: 5%;
    border: 1px solid #FDAB16;
    text-align: center;
    font-size: 25px;
    border-radius:15px;
    margin-left: 20%;
    background: #FDAB16;
    padding: 10px;
    color: white;
}
.title{
    margin-top: 20px;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    font-size: 30px;
}
.loading {
  position: fixed;
  padding-top: 75%;
  padding-left: 48%;
  z-index: 999;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  margin: 0;
}
.card-sel-dlg{
    position: fixed;
    // z-index: 999;
    top: 10%;
    left: 10%;
    background: white;
    border: 1px solid #aaa;
    border-radius:15px;
    width: 80%;
    height: 80%;

}
.card-sel-dlg table{
    margin-top: 10%;
}
.card-sel-dlg tr{
    height: 50px;
}
.sel-btn{
    border: 1px solid #FDAB16;
    background: #FDAB16;
    border-radius:15px;
    color: white;
    width: 50%;
    font-size: 25px;
    text-align: center;
    margin-left: 25%;
    margin-top: 90%;
    padding: 10px;
}
.sel-title{
    margin-top: 20px;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    font-size: 30px;
}
</style>
