<template>
  <div class="payment-method">
    <!--支付方式标题-->
    <h3>支付方式</h3>
    <!--选择支付方式容器begin-->
    <div class="pay-method-box">
      <ul>
        <li>
          <!--被选中状态begin-->
          <img class="pay-selected" src="../assets/pay-selected.png" alt="">
          <!--被选中状态end-->
          <img src="../assets/pay-wx.png" alt="">
        </li>
        <li>
          <img src="../assets/pay-zfb.png" alt="">
        </li>
        <li>
          <img src="../assets/pay-yl.png" alt="">
        </li>
        <li>
          <img src="../assets/pay-ye.png" alt="">
        </li>
     </ul>
    </div>
    <!--选择支付方式容器end-->
    <!--确认支付容器begin-->
    <div class="confirm-pay">
      <span class="confirm-pay-button">立即支付</span>
    </div>
    <!--确认支付容器end-->
  </div>
</template>
<script>

</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  /*支付方式容器*/
  .payment-method{
    width: 100%;
    height: 260px;
    background-color: #ffffff;
    /*padding-top: 31px;*/
    padding-left: 31px;
  }

  /*被选中状态的支付框*/
  .pay-method-box .pay-selected{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  /*支付方式文字标题h3*/
  .payment-method h3{
    color: #6e6e6e;
    width: 100%;
    height: 47px;
    line-height: 47px;
    /*background-color: pink;*/
    border-bottom: 1px solid #d4d4d4;
    font-weight: bold;
  }
  /*左侧图片容器*/
  .payment-method .img{
    float: left;
    width: 120px;
  }
  /*右侧文字内容容器*/
  .payment-method .content{
    float: left;
    width: 1040px;
    height: 100%;
    /*background-color: pink;*/
  }
  .payment-method .content p{
    height: 35px;
    line-height: 35px;
  }
  /*支付方式容器*/
  .pay-method-box{
    width: 100%;
    height: 134px;
    /*line-height: 134px;*/
    /*background-color: pink;*/
  }
  .pay-method-box ul{
    list-style: none;
  }
  .pay-method-box ul li{
    position: relative;
    margin-top: 37px;
    float: left;
    width: 180px;
    height: 60px;
    line-height:60px;
    /*background-color: yellow;*/
    border:1px solid black;
    margin-left: 30px;
  }
  /*立即支付容器*/
  .confirm-pay{
    width: 100%;
    /*background-color: pink;*/
    padding-left: 27px;
  }
  /*立即支付按钮样式*/
  .confirm-pay-button{
    display: inline-block;
    width: 170px;
    height: 47px;
    background-color: #d62b1f;
    color: white;
    line-height:47px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
