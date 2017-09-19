<template>
  <!--订单提交成功容器begin-->
  <div class="payment-success">
    <!--左侧图片容器beging-->
    <div class="img">
      <span><img src="../assets/payment-window.png" alt=""></span>
    </div>
    <!--左侧图片容器beging-->
    <!--右侧文字容器begin-->
    <div class="content">
      <p class="gray">订单提交成功，我们会为您保留2个小时</p>
      <p class="gray-desc">
        请于 <span class="red-desc-date">2017-5-30  21:00 前</span>完成支付
      </p>
      <p>
       <span class="gray-desc">支付金额：</span>
        <span class="red">¥3000</span>
      </p>
    </div>
    <!--右侧文字容器begin-->
  </div>
  <!--订单提交成功容器end-->
</template>
<style scoped>
  *{
    font-family: "Microsoft YaHei UI Light";
  }
  /*红色文字*/
  .red{
    color: #d00000;
    font-weight: bold;
    font-size: 26px;
  }
  /*标题字体*/
  .gray{
    font-weight: 900;
    font-size: 22px;
  }
  /*灰色文字说明*/
  .gray-desc{
    color: #6e6e6e;
    font-weight: bold;
    font-size: 18px;
  }
  /*红色时间说明*/
  .red-desc-date{
    color: #D62B1F;
    font-weight: bold;
    font-size: 18px;
  }
  /*电话号码红色字体*/
  .phone-red{
    color: #d62b1f;
    font-weight: 900;
    font-size: 16px;
  }
  /*支付失败容器*/
  .payment-success{
    width: 100%;
    height: 260px;
    background-color: #ffffff;
    padding-top: 31px;
    padding-left: 31px;
  }
  /*左侧图片容器*/
  .payment-success .img{
    float: left;
    width: 120px;
  }
  /*右侧文字内容容器*/
  .payment-success .content{
    float: left;
    width: 1040px;
    height: 100%;
    /*background-color: pink;*/
  }
  .payment-success .content p{
    height: 35px;
    line-height: 35px;
  }
</style>
