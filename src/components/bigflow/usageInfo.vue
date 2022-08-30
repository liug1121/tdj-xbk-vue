<template>
  <div class="page">
    <div v-if="bindStatus == 1">
      <div class="useage" v-for="(record, index) in getCardInfos" :key="index">
        <table>
          <tr>
            <td>设备名称：</td>
            <td class="order-info">{{ record.phoneNumber }}</td>
          </tr>
          <tr>
            <td>MSISDN：</td>
            <td class="order-info">{{ record.phoneNumber }}</td>
          </tr>
          <tr>
            <td>ICCID：</td>
            <td class="order-info">{{ record.iccid }}</td>
          </tr>
          <tr>
            <td>当前套餐：</td>
            <td class="order-info">{{ record.currentMeal }}</td>
          </tr>
          <tr>
            <td>当月剩余：</td>
            <td class="order-info">{{ record.flowSurplusUsed }}</td>
          </tr>
        </table>

        <div class="buttons">
          <div class="button-unbind">
            解绑
          </div>
          <div class="button-detail">
            详情
          </div>
        </div>
      </div>
      <div class="addcard" >+</div>
    </div>
    <div class="addcardpage" v-else>
      <div class="note">当前没有绑定任何卡</div>
      <div class="addcard" >+</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bindStatus: 1,
      getCardInfos: [
        {
            phoneNumber: '',
            iccid: '',
            currentMeal: '',
            flowSurplusUsed: ''
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background:#f6f6f6;
    height:100%;
    width:100%;
}
.useage{
    height:30%;
    border-radius:15px;
    background:white;
    margin:20px;
    font-size: 20px;
}
table{
    margin:30px;
    width:90%;
}
tr{
    height:50px
}
.order-info{
    text-align:right;
}
.buttons{
    display:flex;
    text-align:center;
    color:white;
}
.button-unbind{
    flex:1;
    background: #e9975a;
    height: 60px;
    margin: 20px;
    line-height: 60px;
}
.button-detail{
    flex: 1;
    background: #5388df;
    height: 60px;
    margin: 20px;
    line-height: 60px;
}
.note{
    text-align: center;
    font-size: 30px;
    color: gray;
}
.addcard{
    text-align: center;
    font-size: 80px;
    color: gray;
}
.addcardpage{
    padding-top: 20%;
}
</style>
