<template>
  <div class="page">
    <div class="head">
      <div class="head-img">
        <img class="head-img-image" src="../../common/images/bigflow-person.jpeg" />
      </div>
      <div class="head-card">
        <div>号码：</div>
        <div>ICCID：{{ cardDetails.iccid }}</div>
      </div>
    </div>
    <div class="detail">
      <div class="detail-title">套餐详情</div>
      <div class="detail-button">剩余{{ cardDetails.flowSurplusUsed }}</div>
      <div class="detail-note">
        <div>您的套餐：{{ cardDetails.currentMeal }}</div>
        <div>
          有效期：{{ cardDetails.mealStartDate }}-{{ cardDetails.mealEndDate }}
        </div>
      </div>
    </div>
    <div class="buys">
      <div class="buys-menus">
        <div :class="tabAddPackageClass">购买套餐</div>
        <div :class="tabPackageClass">加油包</div>
      </div>
      <div class="buys-products" v-if="tabIndex == 1">
        <div
          :class="getRowClass(index)"
          v-for="(addpackage, index) in addPackages"
          :key="index"
          @click="selRow(index, addpackage.productCode)"
        >
          <div class="product-icon">
            <img
              class="product-icon-image"
              src="../../common/images/bigflow-buys.jpeg"
            />
          </div>
          <div class="product-info">
            <div>{{ addpackage.viewName }}</div>
            <div>{{ addpackage.memo }}</div>
          </div>
          <div class="product-price">
            <div>
              <span class="price">现价：¥{{ addpackage.price }}</span>
            </div>
            <div class="old-price">原价：¥{{ addpackage.originalPrice }}</div>
          </div>
        </div>
      </div>
      <div class="buys-products" v-if="tabIndex == 0">
        <div
          :class="getRowClass(index)"
          v-for="(pkg, index) in packages"
          :key="index"
          @click="selRow(index, pkg.productCode)"
        >
          <div class="product-icon">
            <img
              class="product-icon-image"
              src="../../common/images/bigflow-buys.jpeg"
            />
          </div>
          <div class="product-info">
            <div>{{ pkg.productName }}</div>
            <div>{{ pkg.memo }}</div>
          </div>
          <div class="product-price">
            <div class="price">现价：¥{{ pkg.price }}</div>
            <div class="old-price">原价：¥{{ pkg.originalPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buy-btn">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addPackages: [],
      packages: [],
      showComfirmDlg: 0,
      showAlertDlg: 0,
      selectedRow: -1,
      tabIndex: 0,
      tabAddPackageClass: 'buys-menu-selected',
      tabPackageClass: 'buys-menu',
      product2Buy: null,
      cardDetails: [
        {
            phone_number: '',
            iccid: '',
            flowSurplusUsed: '',
            currentMeal: '',
            mealStartDate: '',
            mealEndDate: ''
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: #f6f6f6;
    height: 110%;
    width: 100%;
    padding-bottom: 300px;
    // font-size: 20px;
}
.head{
    height: 14%;
    margin: 30px;
    border-radius: 15px;
    background: white;
    display: flex;
    background: #4388de;
}
.head-img{
    flex: 1;
}
.head-img-image{
    width: 60px;
    height: 60px;
    margin: 20px;
    margin-left: 15px;
    border-radius: 100px;
}
.head-card{
    flex: 2;
    padding-top: 30px;
    color: white;
    font-size: 18px;
}
.detail{
    height: 30%;
    margin: 30px;
    border-radius: 15px;
    background: white;
    font-size: 18px;
    padding-top:5px;
}
.buys{
    height: 70%;
    margin: 30px;
    border-radius: 15px;
    background: white;
}
.detail-button{
    margin: 30px;
    margin-left: 10%;
    width: 80%;
    background: #4388de;
    border-radius: 15px;
    height: 50px;
    line-height: 50px;
    text-align: center;
}
.detail-title{
    // font-size: 40px;
    margin: 30px;
}
.detail-note{
    margin: 30px;
    padding-top: 5px;
}
.buys-menus{
    display: flex;
    text-align: center;
    // font-size: 30px;
    margin: 30px;
}
.buys-menu{
    flex: 1;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
}
.buys-menu-selected{
    flex: 1;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
}
.buys-products{
    margin: 5px;
}
.buys-product{
    margin: 5px;
    height: 110px;
    border-bottom: 1px solid #ddd;
    display: flex;
}
.buys-product-selected{
    margin: 5px;
    height: 110px;
    border-bottom: 1px solid #ddd;
    display: flex;
    background: #fafddb;
}
.product-icon{
    flex: 1;
}
.product-info{
    flex: 4;
    border-right: 1px solid #ddd;

}
.product-price{
    flex: 2;
    margin-left: 20px;
}
.product-icon-image{
    width: 80px;
    height: 80px;
}
.footer{
    position: fixed;
    width: 100%;
    bottom: 2%;

}
.buy-btn{
    width: 90%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    margin-left: 5%;
    background: #4388de;
    border-radius: 15px;
    color: white;
    font-size: 25px;
}
.price{
    color: red;
}
.old-price{
    text-decoration:line-through;
    color: gray;
}
</style>
