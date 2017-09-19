<template>
  <!--支付失败状态begin-->
  <div class="payment-failed">
    <!--左侧图片容器beging-->
    <div class="img">
      <span><img src="../assets/payment-failed.png" alt=""></span>
    </div>
    <!--左侧图片容器beging-->
    <!--右侧文字容器begin-->
    <div class="content">
      <p class="red">支付失败</p>
      <p><span>为避免重复支付，请勿在此操作！实际支付结果可联系客服</span>
        <span class="phone-red">400-0515-507</span>进行确认
      </p>
      <!--查看订单容器begin-->
      <p>
        <span class="check-order">查看订单</span>
      </p>
      <!--查看订单容器end-->
    </div>
    <!--右侧文字容器begin-->
  </div>
  <!--支付失败状态end-->
</template>
<style scoped>
  *{
    font-family: "Microsoft YaHei UI Light";
  }
  /*红色字体*/
  .red{
    color: #d62b1f;
    font-weight: 900;
    font-size: 22px;
  }
  /*灰色文字说明*/
  .gray-desc{
    color: #6e6e6e;
    font-weight: bold;
    font-size: 16px;
  }
  /*电话号码红色字体*/
  .phone-red{
    color: #d62b1f;
    font-weight: 900;
    font-size: 16px;
  }
  /*支付失败容器*/
  .payment-failed{
    width: 100%;
    height: 260px;
    background-color: #ffffff;
    padding-top: 31px;
    padding-left: 31px;
  }
  /*左侧图片容器*/
  .payment-failed .img{
    float: left;
    width: 120px;
  }
  /*右侧文字内容容器*/
  .payment-failed .content{
    float: left;
    width: 1040px;
    height: 100%;
    /*background-color: pink;*/
  }
  /*查看订单按钮样式*/
  .check-order{
    margin-top: 10px;
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
