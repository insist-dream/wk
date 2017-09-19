<template>
  <div class="wx_pay">
      <div class="top">
          <p class="tit">微信扫码支付</p>
          <p class="time">请于 <span> {{cur_time}} </span> 前完成支付</p>
          <p class="money">支付金额： <span>￥{{rf.total_amount}}</span></p>
      </div>
      <div class="content">
          <div class="code1">
          	<!--Causion: test <-> normal !!!-->
            <img :src="`http://test-www.wktrip.com/wxpayv3/my/qrcode.php?data=`+rf.code_url" alt="" width="242" height="242">
            <!--img :src="`http://www.wktrip.com/wxpayv3/my/qrcode.php?data=`+rf.code_url" alt="" width="242" height="242"-->
          </div>
          <div class="sao"></div>
          <div class="zfb"></div>
      </div>
    <p class="other" @click="closewin">选择其他支付方式</p>
  </div>
</template>

<script>
  import { onlyid,times } from '../comment/public'
  import md5 from 'js-md5';
  import { loopwx,pay_query } from '../data/api/api'
  import moment from 'moment';

  export default {
    name: 'wx_pay',
    data () {
      return {
        rf: {},
        token:'',
        cur_time: ''
      }
    },
    mounted(){
      console.log('mounted')
      this.cur_time = moment().add('hours',2).format('YYYY/MM/DD HH:mm');
      console.log('localStorage.wxpay---',localStorage.wxpay)
      if(localStorage.wxpay){
        this.rf = JSON.parse(localStorage.wxpay)
      }else{
        return false
      }
      this.token = JSON.parse(localStorage.data).token
      let out_t = 1800
      let time = setInterval(()=>{
        out_t -= 2
        if(out_t <= 0){
          clearInterval(time)
        }else{
          let nonce = onlyid(32, 52);   //  生成唯一ID
	        let timestamp = times(); 
	        let pap = "{\"out_trade_no\":\""+this.rf.out_trade_no+"\",\"pay_method\":6,\"uid\":\""+JSON.parse(localStorage.data).uid+"\"}"
	        let params ={
	          appid: '5101',
	          sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
	          nonce: nonce,
	          timestamp: timestamp,
	          params:pap,
	          token:JSON.parse(localStorage.data).token,
	        };
	        console.log('wx_pay try to call pay_query params:', params);
	        pay_query(params).then((res) =>{
	        		console.log('res=', res);
		        	if(res.data.status == 'SUCCESS'){
			            clearInterval(time);
			            //Causion: test <-> normal !!!
			            setTimeout("location.href='http://test-www.wktrip.com/bookedSuccess?WIDout_trade_no="+this.rf.out_trade_no+"'", 3000);
//			            setTimeout("location.href='http://www.wktrip.com/bookedSuccess?WIDout_trade_no="+this.rf.out_trade_no+"'", 3000);
	          }
	        })
	      }
      },2000)
     
    },
    methods: {
      closewin(){
        window.close()
      }
    }
  }
</script>

<style scoped>
  .wx_pay{
    width: 1200px;
    min-height: 500px;
    margin:0 auto;
    margin-top: 65px;
  }
  .top{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid red;
    padding: 0 30px;
  }
  .top p{
    display: inline-block;
    line-height: 35px;
  }
  .tit{
    font-size: 20px;
  }
  .time{
    margin-left: 20px;
    color: #a2a2a2;
    font-size: 15px;
  }
  .time span{
    color: red;
  }
  .money{
    float: right;
    font-size: 18px;
  }
  .money span{
    color: red;
    font-weight: bold;
  }
  .content{
    overflow: hidden;
  }
  .code1{
    width: 242px;
    height: 242px;
    background: black;
    float: left;
    margin-top: 180px;
    margin-left: 300px;
  }
  .sao{
    background: url("../assets/sao.png") no-repeat;
    width: 242px;
    height: 48px;
    float: left;
    margin-top: 290px;
    margin-left: 300px;
  }
  .zfb{
    background: url("../assets/zfb.png") no-repeat;
    width: 270px;
    height: 349px;
    float: right;
    margin-right: 300px;
    margin-top: 15px;
  }
  .other{
    padding: 0 30px;
    margin-top: 50px;
    font-size: 15px;
    color: #6d76ff;
    margin-bottom: 50px;
  }
</style>
