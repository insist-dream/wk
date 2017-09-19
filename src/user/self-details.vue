<template>
  <div class="selfDetails">
    <div class="self-main">
      <h5>
        <span class="order-number">订单号：<span>{{ this.order.order_id }}</span></span>
        <span class="order-type">订单状态：<span>{{ this.order.status_name }}</span></span>
      </h5>
      <div class="details-title">
        <p>{{ this.order.product_name }}</p>
        <p><span>{{ this.order.start_date }}出发</span><span>{{ this.order.adult_num }}成人</span><span>{{ this.order.children_num }}儿童</span></p>
      </div>
      <div class="tour-people" v-if="this.show">
          <h3 class="peo-title"><span></span>出游人信息</h3>
          <div class="peo-message">
            <p v-for="item in this.travelers_list.travelers">
                <span>姓名：{{ item.name }}</span>
                <span>身份证：{{ item.idcard_no }}</span>
                <span>手机：{{ item.phone }}</span>
            </p>
          </div>
      </div>
      <div class="tour-people">
        <h3 class="peo-title"><span></span>联系人信息</h3>
        <div class="peo-message">
          <p>
              <span>姓名：{{ this.order.contact.name }}</span>
              <span>身份证：{{ this.order.contact.idcard_no }}</span>
              <span>手机：{{ this.order.contact.phone }}</span></p>
        </div>
      </div>
      <div class="trip-message">
        <h3 class="trip-title"><span></span>费用明细</h3>
        <div class="messages">
          <div class="message-car">
            <h4>租车</h4>
            <p class="car-type ">
                <span>{{ this.order.bill.site_product.product_name }}</span>
                <span>车辆租金</span>
                <span class="right">{{ this.order.bill.site_product.description }}</span></p>
            <p class="car-other">
                <span>{{ this.order.bill.site_product.insurance_name }} </span>
                <span class="right">{{ this.order.bill.site_product.insurance_description }}</span></p>
          </div>
          <div class="message-grogshop">
            <h4>酒店</h4>
                <!--{{this.order.bill.hotels[0]}}-->
                <p v-for="item in this.order.bill.hotels" >
                    <span>{{ item.hotel_name }}</span>
                    <span class="price" v-for="hotel in item.hotel_products">
                        <span>{{ hotel.product_name }}</span>
                        <span class="right">{{ hotel.description }}</span>
                    </span>
                </p>
          </div>
          <div class="message-ticket">
              <h4>门票</h4>
              <p v-for="item in this.order.bill.sights" >
                  <span>{{ item.sight_name }}</span>
                  <span class="price" v-for="hotel in item.sight_products">
                      <span>{{ hotel.product_name }}</span>
                      <span class="right">{{ hotel.description }}</span>
                  </span>
              </p>
          </div>
          <div class="message-insurance">
            <h4>保险</h4>
            <p v-for="item in this.order.bill.insurances" >
                <span>{{ item.name }}</span>
                <span class="right">{{ item.description }}</span>
            </p>
          </div>
          <div class="message-cancel">
            <p><s class="right " style="font-size: 14px">原价：¥{{ this.order.bill.origin_amount }}</s></p>
            <p><span class="right">折扣价：¥{{ this.order.bill.preferential_amount }}</span></p>
            <p><span class="right">悟空币：- ¥{{ this.order.bill.wkcoin_pay }}</span></p>
            <p class="cancel-btn">
              <span class="right btn" v-if="this.judge" @click="pay_order">确认并支付</span>
              <span class="right btn1" v-if="this.cancel">
                <template>
                  <el-button type="text" @click="open2">取消订单</el-button>
                </template>
              </span>
              <span class="right color">订单总价 : <span>¥{{ this.order.bill.total_amount }}</span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {get_order_detail} from '../data/api/api'
  import {get_order_people} from '../data/api/api'
  import {order_cancel} from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'
  export default {
      name: 'selfDetails',
      data(){
          return {
              id:0,
              token:"",
              order:{},
              hotels:[],
              judge:true,
              cancel:true,
              travelers_list:{},
              show:true,
              type:'',
          }
      },
      created:function(){
          this.id = this.$route.query.orderId;
      },
      mounted(){
          var jsonObj=JSON.parse(localStorage.data);
          console.log('selfDetails  jsonObj++++',jsonObj)
          this.token = jsonObj.token;
          this.get_order_detail();
          this.get_order_people();
      },
      methods:{
          pay_order:function(){
            this.$router.push({path:'/submit_order',query:{orderId:this.id}});
          },
          open2(){
              this.$confirm('确认取消订单',{
                  confirmButtonText: '取消订单',
                  cancelButtonText: '我再想想',
                  type: 'warning'
              }).then(() => {
                  this.order_cancel();
                  this.$router.push('/personalCenter/centerCard');
                  this.$message({
                  type: 'success',
                  message: '取消成功!'
                  });
              });
          },
          order_cancel:function(){             //取消订单
              let nonce = onlyid(32, 52);   //  生成唯一ID
              let timestamp = times();   // 生成时间戳
              let pap = "{\"order_id\":"+this.id+"}"
              let params ={
                  token:this.token,
                  appid: '5101',
                  sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
                  nonce: nonce,
                  timestamp: timestamp,
                  params:pap
              };
              order_cancel(params).then((res) => {
//                  console.log(res)
              });
          },
          get_order_detail:function(){         //获取用户详情 请求
            let nonce = onlyid(32, 52);   //  生成唯一ID
            let timestamp = times();   // 生成时间戳
            let pap = "{\"order_id\":"+this.id+"}"
            let params ={
              token:this.token,
              appid: '5101',
              sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
              nonce: nonce,
              timestamp: timestamp,
              params:pap
            };
            get_order_detail(params).then((res) => {
                console.log('get_order_detail=====',res.data)
                this.order = res.data;
                this.hotels  = this.order.bill.hotels
                this.type = res.data.status
                console.log(this.type)
                if(this.type == "ORDER_PAID"){
                  this.judge = false;
                  this.cancel=true;
                }else if(this.type =="ORDER_SUBMITTED" ){
                  this.judge = true;
                  this.cancel=true;
                }else{
                  this.judge = false;
                  this.cancel=false;
                }
            });
          },
          get_order_people:function(){           //获取订单出游人列表
              let nonce = onlyid(32, 52);   //  生成唯一ID
              let timestamp = times();   // 生成时间戳
              let pap = "{\"order_id\":"+this.id+"}"
              let params ={
                  token:this.token,
                  appid: '5101',
                  sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
                  nonce: nonce,
                  timestamp: timestamp,
                  params:pap
              };
              get_order_people(params).then((res) => {
                  this.travelers_list = res.data;
                  console.log('get_order_people======',this.travelers_list)
                  if(this.travelers_list.travelers.length>0){
                    this.show = true
                  }else{
                    this.show = false
                  }
              });
          },
      },

  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
.selfDetails{
  width: 100%;
  /*height: 800px;*/
  background: rgba(229, 233, 231, 0.41);
  margin-top: 55px;
}
  .self-main{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
  .self-main h5{
    padding:30px 0 10px 20px;
    width: 100%;
    color: red;
    font-weight: bold;
  }
  .order-type{
    margin-left: 100px;
  }
  .details-title{
    width: 100%;
    /*height: 95px;*/
    background: #FFF;
    border: 2px solid rgba(192, 191, 204, 0.61);
    padding: 20px;
  }
  .details-title p:nth-child(1){
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .details-title p:nth-child(2) span{
    margin-right: 50px;
    font-size: 15px;
    color: #918b95;
  }
  .tour-people{
    width: 100%;
    border: 2px solid rgba(192, 191, 204, 0.61);
    margin-top: 20px;
  }
  .peo-title{
    width: 100%;
    padding: 10px 0 10px 20px;
    font-size: 22px;
    font-weight: bold;
  }
  .peo-title span{
    width: 5px;
    height: 23px;
    display: inline-block;
    background: red;
    float: left;
    margin-right: 10px;
  }
  .peo-message{
    padding: 30px 0 20px 20px;
    background: #FFF;
  }
  .peo-message p{
    padding-bottom: 10px;
    font-size: 15px;
  }
  .peo-message>p>span:nth-child(1){
    display: inline-block;
    width: 150px;
    margin-right: 50px;
  }
  .peo-message>p>span:nth-child(2){
    display: inline-block;
    width: 250px;
    margin-right: 50px;
  }
  .trip-message{
    width: 100%;
    border: 2px solid rgba(192, 191, 204, 0.61);
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .trip-title{
    width: 100%;
    padding: 10px 0 10px 20px;
    font-size: 22px;
    font-weight: bold;
  }
  .trip-title span{
    width: 5px;
    height: 23px;
    display: inline-block;
    background: red;
    float: left;
    margin-right: 10px;
  }
  .messages div{
    width: 100%;
    background: #FFF;
    border-bottom: 1px solid rgba(192, 191, 204, 0.61);
    padding: 0 50px 20px 20px;
  }
  .messages div h4{
    font-weight: bold;
    padding: 30px 0 10px 5px;
  }
  .messages div p{
    padding: 10px 0 0 5px;
    font-size: 15px;
    width: 100%;
  }
  .right{
    float: right;
    color: #000000 !important;
  }
  .price{
    color: #afb6b6;
    display: block;
    width: 100%;
    font-size: 14px;
  }
  .message-cancel{
    padding-top: 30px!important;
  }
  .message-cancel p{
    overflow: hidden;
  }
  .cancel-btn{
    margin-top: 30px;
    margin-bottom:80px;
  }
  .cancel-btn .btn{
    display: inline-block;
    padding: 5px 20px 5px 20px;
    background: red;
    color: #FFF !important;
  }
  .cancel-btn .color{
    margin-right: 20px;
    font-weight: bold;
    font-size: 18px;
    color: #999999 !important;
  }
  .cancel-btn .color span{
    color: red;
    font-size: 26px;
  }
  .btn1{
    margin-right: 20px;
    line-height: 40px;
  }
</style>
