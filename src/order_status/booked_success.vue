<template>
  <div class="booked-success">
    <!--左侧图片容器beging-->
    <div class="img">
      <span><img src="../assets/payment-window.png" alt=""></span>
    </div>
    <!--左侧图片容器beging-->
    <!--右侧文字容器begin-->
    <div class="content">
      <p class="green">预订成功</p>
      <p class="gray-desc">
        订单支付成功，我们的客服正在帮您确认订单
      </p>
      <p>
        <span>支付金额：</span>
        <span class="red">¥&nbsp;{{ this.total_amount }}</span>
      </p>
      <!--查看订单容器begin-->
      <p>
        <span class="check-order" @click="go">查看订单</span>
      </p>
      <!--查看订单容器end-->
    </div>
    <!--右侧文字容器begin-->
  </div>
</template>
<script>
  import { pay_query, order_pay } from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'

  export default {
    data(){
        return{
          orderId:'',
          total_amount:0,
          type:'',
          out_trade_no:'',
          code_url:'',
          pay_method:'',
          token:'',
          uid:'',
          tn:'',
          screenHeight:$(window).height()-350,
        }
    },
    created: function () {
      this.tn = this.$route.query.tn;
      this.orderId = JSON.parse(localStorage.wxpay).order_id;
      this.total_amount = JSON.parse(localStorage.wxpay).total_amount;
      this.type = JSON.parse(localStorage.wxpay).type;
      this.out_trade_no = JSON.parse(localStorage.wxpay).out_trade_no;
      this.code_url = JSON.parse(localStorage.wxpay).code_url;
      this.pay_method = JSON.parse(localStorage.wxpay).pay_method;
      this.token = JSON.parse(localStorage.data).token
      this.uid = JSON.parse(localStorage.data).uid
    },
    mounted() {
      $('.booked-success').css('min-height',this.screenHeight + 'px');
    	if(this.pay_method != 8 &&this.pay_method != 6 && this.pay_method != 7 &&this.pay_method != 5){
         return false
      }
      if(this.pay_method == 5){
	      let nonce = onlyid(32, 52);   //  生成唯一ID
	      let timestamp = times();   // 生成时间戳
				let date = this.out_trade_no.substr(0,14);
	      let pap;
	      if(this.pay_method == 5){
	      		pap = "{\"tn\":\""+ this.tn +"\",\"order_id\":"+this.orderId+",\"pay_method\":"+this.pay_method+",\"amount\":"+this.total_amount*100 +",\"order_time\":"+date+",\"trade_type\":\"NATIVE\"}";
	    	}else{
	    			pap = "{\"tn\":\""+ this.out_trade_no +"\",\"order_id\":"+this.orderId+",\"pay_method\":"+this.pay_method+",\"amount\":"+this.total_amount +",\"order_time\":"+date+",\"trade_type\":\"NATIVE\"}";
	    	}
	      let newparams ={
	          appid: '5101',
	          sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
	          nonce: nonce,
	          timestamp: timestamp,
	          params:pap,
	          token:this.token,
	      };
	      console.log('bookSuccess try to call order_pay newparams:', newparams);
	      order_pay(newparams).then((res) => {
	          console.log('bookSuccess order_pay=', res.data);
	          this.res = res.data
	          this.tn = res.data.tn;
	      });
			}

      let nonce = onlyid(32, 52);   //  生成唯一ID
      let timestamp = times();   // 生成时间戳
      let date = new Date().Format("yyyyMMddhhmmss");
      let pap
      if(this.pay_method == 5){
          pap = "{\"out_trade_no\":"+this.tn+",\"pay_method\":"+this.pay_method+",\"uid\":"+this.uid+"}"
      }else{
          pap = "{\"out_trade_no\":"+this.$route.query.WIDout_trade_no+",\"pay_method\":"+this.pay_method+",\"uid\":"+this.uid+"}"
      }
      console.log('bookedSuccess  WIDout_trade_no ====',this.$route.query.WIDout_trade_no);
      let params ={
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params:pap,
          token:this.token,
      };

		  if(this.pay_method != 8){
      	console.log('bookSuccess try to call pay_query params:', params);
	      pay_query(params).then((res) =>{
	        console.log(res.data)
	      })
    	}
    },
    methods:{
    	  go:function(){
          if(this.type == "PRODUCT_TYPE_SELFHELP"){
            this.$router.push({path:'/selfDetails',query:{orderId:this.orderId}});
          }else{
            this.$router.push({path:'/motorcade_details',query:{orderId:this.orderId}});
          }
        }
    }
  }
</script>
<style scoped>
  *{
    font-family: "Microsoft YaHei UI Light";
  }
  /*红色字体*/
  .booked-success{
    margin-top: 55px;
  }
  .red{
    color: #d00000;
    font-weight: bold;
    font-size: 26px;
  }
  /*绿色字体*/
  .green{
    color: #83c44e;
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
  .booked-success{
    width: 100%;
    /*height: 260px;*/
    background-color: #ffffff;
    padding-top: 31px;
    padding-left: 31px;
  }
  /*左侧图片容器*/
  .booked-success .img{
    float: left;
    width: 120px;
  }
  /*右侧文字内容容器*/
  .booked-success .content{
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
