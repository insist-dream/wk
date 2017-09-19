<template>
  <!--提交订单总容器begin-->
  <div class="box">
    <div class="submit-order">
      <div class="payment-success">
        <!--左侧图片容器beging-->
        <div class="img">
          <span><img src="../assets/payment-window.png" alt=""></span>
        </div>
        <!--左侧图片容器beging-->
        <!--右侧文字容器begin-->
        <div class="content">
          <p class="gray">订单提交成功，我们会为您保留48个小时</p>
          <p class="gray-desc">
            请于 <span class="red-desc-date">{{ this.dateString | formatdate }} 前</span>完成支付<!--   -->
          </p>
          <p>
            <span class="gray-desc">支付金额：</span>
            <span class="red">￥{{ total_amount2 }}</span>
          </p>
        </div>
        <!--右侧文字容器begin-->
      </div>
      <div class="payment-method">
        <!--支付方式标题-->
        <h3>支付方式</h3>
        <!--选择支付方式容器begin-->
        <div class="pay-method-box">
          <ul>
            <li>
              <!--被选中状态begin-->
              <div class="pay-selected " @click="pitchOn1" :class="{ show: isshow(this.pay_method)}"></div>
              <!--被选中状态end-->
              <img src="../assets/pay-wx.png" alt="">
            </li>
            <li>
              <div class="pay-selected" @click="pitchOn2" :class="{ show: isshow2(this.pay_method)}"></div>
              <img src="../assets/pay-zfb.png" alt="">
            </li>
            <!--
            <li>
              <div class="pay-selected" @click="pitchOn3" :class="{ show: isshow3(this.pay_method)}"></div>
              <img src="../assets/pay-yl.png" alt="">
            </li>
            -->
            <li v-if="this.show">
              <div class="pay-selected" @click="pitchOn4" :class="{ show: isshow4(this.pay_method)}"></div>
              <img src="../assets/pay-ye.png" alt="">
              <span class="balance">(￥{{ this.balance }}可用)</span>
            </li>
            <li v-if="this.show2">
              <div class="pay-selected"></div>
              <img src="../assets/pay-ye2.png" alt="">
              <span class="balance">(￥{{ this.balance }}可用)</span>
            </li>
          </ul>
        </div>
        <!--选择支付方式容器end-->
        <form id="pay_form" method="post" target="_blank">
				</form>
        <!--确认支付容器begin-->
        <div class="confirm-pay">
        	<!--Causion: test <-> normal !!!-->
          <a id="pay_action" href='javascript:void(0);' onclick='window.open("http://test-www.wktrip.com/wx_pay")' >
          	<span class="confirm-pay-button" @click="open2">立即支付</span>
          	</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import payment_failed from '@/order_status/payment_failed'
//  import submit_success from '@/order_status/submit_success'
//  import payment_method from '@/order_status/payment_method'
//  import booked_success from '@/order_status/booked_success'

	import moment from 'moment';	
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times,setDataToLocal } from '../comment/public'        //时间戳
  import {get_user_detail} from '../data/api/api'
  import { get_list1 } from '../data/api/api'
  import { zfb_pay } from '../data/api/api'
  import {get_order_detail} from '../data/api/api'        //订单详情
  import { order_pay } from '../data/api/api'             //支付订单

  export default {
    name: 'submit_order',
    data() {
        return {
            res:[],
            user:{},
            id:0,
            pay_method:6,
            total_amount:0,
            total_amount2:0,
            tn:'',
            dateString:'',
            type:'',
            code_url: '',
            balance:0,
            show:true,
            show2:false,

        }
    },
    //自定义在实例
    filters: {
        formatdate: function(value) {
        		
        		console.log('formatdate value=', value);
        		var endDate = moment(value);
        		console.log('formatdate endDate=', value);
            console.log('formatdate endDate.format("YYYY-MM-DD")=', endDate.format("YYYY-MM-DD"));
            return endDate.format("YYYY-MM-DD HH:mm:ss");
            
        }
    },    
    created:function(){
        this.id = this.$route.query.orderId;
				window.onunload = this.onunload_handler;
				console.log('window.onunload');
        window.onbeforeunload = this.onbeforeunload_handler;
        console.log('window.onbeforeunload');

    },
    mounted(){
        var jsonObj=JSON.parse(localStorage.data);
        this.user = jsonObj;
        this.get_user_detail();
        this.get_order_detail();
        this.get_date();
        
    },
    beforeDestroy(){
    	console.log('submit_order beforeDestroy');
    	return false;

    	},
    destroyed(){
    	console.log('submit_order destroyed');
    	window.onbeforeunload ='';
    	window.onunload = '';

    },
    watch:{
        balance:function(val, oldVal){
          if(this.balance < this.total_amount2){
            this.show = false;
            this.show2 = true;
          }else{
            this.show = true;
            this.show2 = false;
          }
        },
    },
    methods: {
    	  onbeforeunload_handler: function(){
		        var warning="确认退出?";
		        return warning;
		    },
		    onunload_handler: function(){
		        var warning="确认离开?";
		        return warning;
		    },
        isshow:function(i){
          if(i==6){
            return true
          }else{
            return false
          }
        },
      isshow2:function(i){
        if(i==7){
          return true
        }else{
          return false
        }
      },
      isshow3:function(i){
        if(i==5){
          return true
        }else{
          return false
        }
      },
      isshow4:function(i){
        if(i==8){
          return true
        }else{
          return false
        }
      },
        pitchOn1:function(){
        		this.order_pay1(6);
            return this.pay_method = 6;
        },
        pitchOn2:function(){
        		this.order_pay1(7);
            return this.pay_method = 7;
        },
        pitchOn3:function(){
        		this.order_pay1(5);
            return this.pay_method = 5;
        },
        pitchOn4:function(){
        		 this.order_pay1(8);
        	  	return this.pay_method = 8;
        },
        get_date:function(){
          var dat = new Date;
          var date = new  Date(dat.setHours(dat.getHours()+2));
          this.dateString = date.Format("yyyy-MM-d hh:mm")
        },
      get_user_detail:function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let pap = "{\"user_id\":"+this.user.id+",\"category\":\"ZIJIAYOU\",\"version\":{\"appVersion\":\"1.0.0\",\"deviceOSVersion\":\"WKTRIP PC\"}}"
        let params ={
          token:this.user.token,
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.user.token+"&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params:pap
        };
        get_user_detail(params).then((res) => {
        this.balance=res.data.account.available_amount;
        console.log(this.balance);
      });
    },
        get_order_detail:function(){         //获取用户详情 请求
            let nonce = onlyid(32, 52);   //  生成唯一ID
            let timestamp = times();   // 生成时间戳
            let pap = "{\"order_id\":"+this.id+"}"
            let params ={
                token:this.user.token,
                appid: '5101',
                sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.user.token+"&b3b01c69cc8408593f708514a211b09f"),
                nonce: nonce,
                timestamp: timestamp,
                params:pap
            };
            get_order_detail(params).then((res) => {
                this.type = res.data.product_type;
                console.log('get_order_detail', res.data);
                
								/*
                let dat = new Date(res.data.status_time.order_submitted);
                let date = new  Date(dat.setHours(dat.getHours()+48));
                this.dateString = date.Format("yyyy-MM-d hh:mm:ss")
                console.log('this.dateString=', this.dateString);
                */
                
                let  dat = moment(res.data.status_time.order_submitted); 
                let  newDate = dat.add(48, 'hours');
                this.dateString   = newDate.format("YYYY-MM-DD hh:mm:ss");
                console.log('this.dateString=', this.dateString);
                
                this.total_amount = res.data.total_amount*100;
                this.total_amount2 = this.total_amount/100;
                if(this.balance < this.total_amount2){
                  this.show = false;
                  this.show2 = true;
                }else{
                  this.show = true;
                  this.show2 = false;
                }
                this.order_pay1(6);
            });
        },
        
        order_pay1:function(methodCode){
           if(methodCode != 8 && methodCode != 6 && methodCode != 7 && methodCode != 5){
               return false
            }
            console.log('order_pay1 methodCode=', methodCode);
            let nonce = onlyid(32, 52);   //  生成唯一ID
            let timestamp = times();   // 生成时间戳
            let date = new Date().Format("yyyyMMddhhmmss");
            console.log('order_pay1 1 date=', date);
            //console.log('order_pay1 2 date=', moment().Format("yyyyMMddhhmmss"));
            let pap = "{\"order_id\":"+this.id+",\"pay_method\":"+methodCode+",\"amount\":"+this.total_amount+",\"order_time\":"+date+",\"trade_type\":\"NATIVE\"}"
            let params ={
                appid: '5101',
                sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.user.token+"&b3b01c69cc8408593f708514a211b09f"),
                nonce: nonce,
                timestamp: timestamp,
                params:pap,
                token:this.user.token,
            };
            
            console.log('submit_order try to call order_pay params:', params);
            order_pay(params).then((res) => {
                console.log('order_pay=', res.data);
                this.res = res.data
                this.tn = res.data.tn;
                this.code_url = res.data.code_url;
                setDataToLocal("wxpay",{out_trade_no:this.tn,pay_method:methodCode,total_amount:this.total_amount2,order_id:this.id,code_url:this.res.code_url,type:this.type});
                
                if(this.pay_method == 7 ){
                			//Causion: test <-> normal !!!
                		var pay_url = "http://test-www.wktrip.com/alipay/alipayapi.php?WIDout_trade_no=" + this.tn + "&WIDtotal_fee="+this.total_amount2;
//                		var pay_url = "http://www.wktrip.com/alipay/alipayapi.php?WIDout_trade_no=" + this.tn + "&WIDtotal_fee="+this.total_amount2;
										$("#pay_action").attr('onclick', 'window.open(\"' + pay_url + '\")');
                }else if(this.pay_method == 5){
                			//Causion: test <-> normal !!!
                		var pay_url = "http://test-www.wktrip.com/upacp_demo_b2b/demo/api_02_b2b/Form_6_2_FrontConsume.php?WIDout_trade_no="+this.tn+"&WIDtotal_amount="+this.total_amount;
//                	  var pay_url = "http://www.wktrip.com/upacp_demo_b2b/demo/api_02_b2b/Form_6_2_FrontConsume.php?WIDout_trade_no="+this.tn+"&WIDtotal_amount="+this.total_amount;
                	  $("#pay_action").attr('onclick', 'window.open(\"' + pay_url + '\")');
                }else if(this.pay_method == 6){
                		var pay_url = "http://test-www.wktrip.com/wx_pay";
//										var pay_url = "http://www.wktrip.com/wx_pay";
										$("#pay_action").attr('onclick', 'window.open(\"' + pay_url + '\")');
                }


                if(methodCode == 8){
/*
                  this.$router.push({path:'/bookedSuccess',query:{total_amount:this.total_amount2,order_id:this.id,type:this.type}});
                  return false
*/
									$("#pay_action").attr('onclick', 'return false');
                }
            });
        },
        
        open2() {
        	if(this.pay_method == 8){
        					this.$router.push({path:'/bookedSuccess',query:{total_amount:this.total_amount2,order_id:this.id,type:this.type}});
                  return false
          }
          if(this.pay_method == 7){
            //window.open("http://test-www.wktrip.com/alipay/alipayapi.php?WIDout_trade_no="+this.tn+"&WIDtotal_fee="+this.total_amount2,'newwindow');
            // window.open("http://www.wktrip.com/alipay/alipayapi.php?WIDout_trade_no="+this.tn+"&WIDtotal_fee="+this.total_amount2,'newwindow');
            this.open3();
          }else if(this.pay_method == 6){
            // 
            //Use these lines:
            //window.open("http://test-www.wktrip.com/wx_pay");// ,query:{total_amount:this.total_amount2,order_id:this.id,type:this.type}
            // window.open("http://www.wktrip.com/wx_pay");// ,query:{total_amount:this.total_amount2,order_id:this.id,type:this.type}
            
            //console.log('pay_action onclick 6=', $("#pay_action").attr('onclick'));
            this.open3();
            
          }else if(this.pay_method == 5){
            // window.open("http://www.wktrip.com/upacp_demo_b2b/demo/api_02_b2b/Form_6_2_FrontConsume.php?WIDout_trade_no="+this.tn+"&WIDtotal_amount="+this.total_amount,'newwindow');
            
            //console.log('pay_action onclick 5=', $("#pay_action").attr('onclick'));
            this.open3();
          }
        },
        open3() {
        console.log(1);
          this.$confirm('请您在打开新的页面进行支付，支付完成前请不要关闭该页面', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '其他支付方式',
            type: 'warning'
          })
        },
  },
  }
</script>
<style scoped>
  /*背景容器盒子*/
  .box{
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
  }
  /*提交订单容器*/
  .submit-order{
    margin: 0 auto;
    width: 1200px;
    /*height: 679px;*/
    padding-top: 90px;
    /*background-color: pink;*/
  }
  .submit-order div{
    margin-bottom: 20px;
  }
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
    width: 180px;
    height: 60px;
    top: 2px;
    left: 0;
    z-index: 10;
    cursor: pointer;
  }
  .show{
    background: url("../assets/pay-selected.png") no-repeat;
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
    height: 100px;
    /*line-height: 134px;*/
    /*background-color: pink;*/
  }
  .pay-method-box ul{
    list-style: none;
  }
  .pay-method-box ul li{
    position: relative;
    margin-top: 20px;
    float: left;
    width: 180px;
    height: 60px;
    line-height:60px;
    /*background-color: yellow;*/
    /*border:1px solid black;*/
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
  .balance{
    float: left;
    margin-top: -47px;
    margin-left: 45px;
    font-size: 14px;
    color: #878787;
    width: 135px;
    text-align: center;
  }
</style>
