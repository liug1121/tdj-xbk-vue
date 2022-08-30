<template>
  <div class="page">
    <div class="head">
      <img class="head-img" src="../../common/images/bigflow-head.png" />
    </div>
    <div class="iccid">
      <table class="table">
        <tr>
          <td class="col-iccid-input">
            <input class="iccid-input" />
          </td>
          <td class="col-iccid-scan">
            <img class="scan" src="../../common/images/scan.jpeg"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="button" >确 定</div>
    <div class="note">
      温馨提示：请根据下图提示完成开卡激活流程
    </div>
    <div class="card"></div>
  </div>
</template>
<style lang="less" scoped>
.page{
    height:100%
}
.head{
    background:gray;
    height:30%
}
.head-img{
    height:100%;
    width:100%
}
.iccid{
    background:white;
    height:10%;
    width:90%;
    margin-left:5%;
    margin-top:10%;
    margin-bottom:10%;
    border-radius:15px;;
    box-shadow :#666 0px 0px 10px;
}
.table{
    width:100%
}
.col-iccid-input{
    width:70%;
    text-align:left;
}
.col-iccid-scan{
    width:20%;
    text-align:center;
    font-size: 20px;
    color: gray;
}
.iccid-input{
    width:99%;
    height:50px;
    margin-top:1px;
    margin-left:5px;
    border:0px solid #dadada;
    font-size: 22px;
    color: gray;
}
.scan{
    width:40px;
    height:40px;
    margin-top:5px;

}
.button{
    background:#4388de;
    width:90%;
    height:6%;
    border-radius:15px;
    margin-left:5%;
    color:white;
    font-size:20px;
    align-items:center;
    display:-webkit-flex;
    justify-content:center;
    display:-webkit-flex;
}
.note{
    margin:35px;
    background: white;
    height:10px;
    font-size:20px;
}
.card{
    margin:60px;
    width: 5.8rem;
    height: 4.3rem;
    display:block;
    background:url(../../common/images/card-demo.png) no-repeat 100% 100%;
    background-size:contain;
}
</style>
