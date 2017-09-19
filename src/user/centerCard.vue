<template>
  <div class="centerCard">
      <div class="card-message">
          <span class="v-num">{{ user2.rolename }}</span>
          <div class="mes-img">
            <img v-if="user2.headimg_url" :src="user2.headimg_url"  alt=""/>
            <img v-else src="../assets/headimg.png" alt=""/>
          </div>
          <div class="mes-two">
            <p v-if="user2.name">{{ user2.name }}</p>
            <p v-else>您的姓名</p>
            <p>{{ user2.uid }}</p>
            <span v-if="user2.auth.status_code == 0" class="red">{{ user2.auth.status_name }}</span>
            <span v-if="user2.auth.status_code == 1" class="blue">{{ user2.auth.status_name }}</span>
            <span v-if="user2.auth.status_code == 2" class="green">{{ user2.auth.status_name }}</span>
          </div>
          <div class="mes-account">
            <div class="mes-acc-balance">
              <p>账户余额</p>
              <p>¥{{ user2.account.total_amount }}</p>
              <p>冻结:<span>¥{{ user2.account.frozen_amount }}</span>可用:<span>¥{{ user2.account.available_amount }}</span></p>
            </div>
            <div class="mes-acc-diy">
              <p>悟空币</p>
              <p>¥{{ user2.account.wkcoin }}</p>
            </div>
            <div class="mes-acc-coupon">
              <p >优惠券</p>
              <p>0张</p>
            </div>
          </div>
      </div>
      <IndividualOrders  :loggingStatus="this.user" v-if="this.hasOrder"></IndividualOrders>
      <noOrder v-else></noOrder>
  </div>
</template>

<script>
  import IndividualOrders from '@/user/Individual-orders'
  import noOrder from "@/user/no-order"
  import {get_user_list} from '../data/api/api'
  import {get_user_detail} from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'
  export default {
    name: 'centerCard',
    data () {
        return {
            user:{},
            user2:{},
            user_list:{},
            hasOrder:true,

        }
    },
		created(){
    	console.log('centerCard -> created');
	  },
    mounted(){
        var jsonObj=JSON.parse(localStorage.data);
        this.user = jsonObj;
        this.get_user_list();
        this.get_user_detail();
        this.$store.commit('setUser', this.user);
  },
    methods:{
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
              this.user2 = res.data;
              console.log("11",this.user2)
              console.log(res.data);
        });
      },




      get_user_list:function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let pap = "{\"user_id\":"+this.user.id+",\"page\":1,\"page_size\":3}"
        let params ={
          token:this.user.token,
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.user.token+"&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params:pap
        };
        get_user_list(params).then((res) => {
            this.user_list = res.data.orders
            if(this.user_list.length == 0 ||this.user_list.length==undefined){
              this.hasOrder = false;
            }else{
              this.hasOrder = true;
            }
        });
      },
    },
    components:{
        IndividualOrders,
        noOrder,
    }
  }
</script>

<style scoped>
  .centerCard{
    min-height: 500px;
  }
.card-message{
    background: url("../assets/center-bg.png") no-repeat;
    width: 979px;
    height: 171px;
    padding: 0 20px;
    position: relative;
}
  .mes-img{
    border: 1px solid #FFF;
    box-shadow: 0 0 10px #b6b5bd;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
    margin-top: 25px;
    overflow: hidden;
    background: #b1afad;
    /*background: url("../assets/headimg.png") no-repeat;*/
    /*display: inline-block;*/
  }
  .v-num{
    position: absolute;
    top: 20px;
    left: 95px;
    width: 25px;
    height: 25px;
    display: inline-block;
    background: red;
    border-radius: 50%;
    line-height: 28px;
    text-align: center;
    color: #FFF;
    font-size: 12px;
  }
  .mes-img img{
    width: 100%;
  }
  .mes-two{
    display: inline-block;
    margin-left:20px;
    font-size: 14px;
    margin-top: 35px;
    float: left;
  }
  .mes-two p{
    margin-bottom: 10px;
  }
  .blue{
    border: 1px solid #3158ff;
    /*width: 55px;*/
    text-align: center;
    border-radius: 7px;
    color: #3158ff;
    padding: 2px 5px;
  }
  .red{
    border: 1px solid red;
    /*width: 55px;*/
    text-align: center;
    border-radius: 7px;
    color: red;
    padding: 2px 5px;
  }
  .green{
    border: 1px solid #47ff11;
    /*width: 55px;*/
    text-align: center;
    border-radius: 7px;
    color: #49ff20;
    padding: 2px 5px;
  }
  .mes-account{
    width: 680px;
    height: 100px;
    background: rgba(229, 233, 231, 0.41);
    float: right;
    margin-top: 30px;
    padding: 20px 20px;
  }
  .mes-acc-balance{
    border-right: 1px solid #e6e4ea;
    width: 170px;
    float: left;
    height: 100%;
  }
  .mes-account p{
    margin: 0;
    text-align: center;
  }
  .mes-acc-balance p:nth-child(1){
    /*margin-top: 10px;*/
  }
.mes-acc-balance p:nth-child(2){
  color: red;
  font-weight: bold;
}
.mes-acc-balance p:nth-last-child(1){
  font-size: 12px;
}
  .mes-acc-balance p:nth-last-child(1) span{
    display: inline-block;
    margin-right: 8px;
  }
  .mes-acc-diy{
    width: 170px;
    border-right: 1px solid #e6e4ea;
    float: left;
    height: 100%;
  }
  .mes-acc-diy p:nth-child(2){
    color: red;
    font-weight: bold;
  }
  .mes-acc-coupon{
    width: 170px;
    height: 100%;
    float: left;
  }
  .mes-acc-coupon p:nth-child(2){
    color: red;
    font-weight: bold;
  }
</style>
