<template>
  <div class="IndividualOrders">
      <div class="have-indent">
          <h4>
              <span>最新订单</span>
              <router-link to="/personalCenter/allOrders">查看全部订单></router-link>
          </h4>
          <p>
            <span>订单编号</span><span></span><span>订单状态</span><span>类型</span><span>订单金额</span><span>操作</span>
          </p>
          <ul class="indent-list">
              <li v-for="(item,i) in user_list">
                  <div class="indent-images">
                    <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a">
                        <div class="encase-img"><img :src="item.image_url" alt=""/></div>
                        <span class="wih">{{item.product_name}}</span>
                    </router-link>
                  </div>
                  <div class="indent-number">{{ item.order_id }}</div>
                  <div class="indent-state">{{ item.status_name }}</div>
                  <div class="indent-type">{{ type[i] }}</div>
                  <div class="indent-time">￥{{ item.total_amount }}</div>
                  <div class="indent-operation">
                        <span class="operation" v-if="status[i]" @click="addition_pay(status[i],item.order_id)">{{ status[i] }}</span>
                        <span class="indent-cancel" v-if="fig[i]" @click="cancel_order(item.order_id,item.product_type,status[i])">
                            <span >取消订单</span>
                        </span>
                        <div class="check" v-if="btn[i]" @click="view_details(item.order_id,item.product_type,status[i],fig[i])">查看详情> </div>
                  </div>
              </li>

          </ul>
      </div>
  </div>
</template>

<script>
  import {get_user_list} from '../data/api/api'
  import {order_cancel} from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'
  export default {
    name: 'IndividualOrders',
    data () {
      return {
        user:this.loggingStatus,
        user_list:{},
        type:[],
        status:[],
        btn:[],
        fig:[],
        orderId:0,
        token:"",
        judge:false,
        cancel:false,
        headcount:[],
      }
    },
    props:["loggingStatus"],
    mounted(){
      this.get_user_list();
    },



    methods:{
      view_details:function(order_id,product_type,status,fig){           //进入订单详情页
        this.orderId = order_id;
        this.product_type = product_type;
        console.log(product_type);
        if(product_type == "PRODUCT_TYPE_SELFHELP"){
          this.$router.push({path:'/selfDetails',query:{orderId:this.orderId}});
        }else{
          this.$router.push({path:'/motorcade_details',query:{orderId:this.orderId}});
        };
      },
      cancel_order:function(order_id,product_type,status){        //取消订单
        this.orderId = order_id;
        this.open2();
        this.cancel = true;
      },
      addition_pay:function(status,order_id){                       // 补充出游人信息和支付订单
        this.addPay = status;
        if(status == "补充出游人信息"){
          this.$router.push({path:'/bcDatum',query:{orderId:order_id}});
        }else{
          this.$router.push({path:'/submit_order',query:{orderId:order_id}});
//              this.$router.push('/selfDetails');
        }
      },
      open2(){                                           //取消订单提示框
        this.$confirm('确认取消订单',{
          confirmButtonText: '取消订单',
          cancelButtonText: '我再想想',
          type: 'warning'
        }).then(() => {
          this.order_cancel();
        this.$message({
          type: 'success',
          message: '取消成功!'
        });
      });
    },
    order_cancel:function(){             //取消订单
      let nonce = onlyid(32, 52);   //  生成唯一ID
      let timestamp = times();   // 生成时间戳
      let pap = "{\"order_id\":"+this.orderId+"}"
      let params ={
        token:this.user.token,
        appid: '5101',
        sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.user.token+"&b3b01c69cc8408593f708514a211b09f"),
        nonce: nonce,
        timestamp: timestamp,
        params:pap
      };
      order_cancel(params).then((res) => {
        console.log(res.data)
          if(res.data.code == 0){
              this.$router.go('/personalCenter/centerCard');
          }
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
            this.user_list = res.data.orders;
            console.log(this.user_list);
            for(var i =0;i<this.user_list.length;i++){
              if(this.user_list[i].product_type == "PRODUCT_TYPE_SELFHELP"){
                  this.type[i] = "自助自驾"
              }else{
                  this.type[i] = "车队自驾"
              };
              if(this.user_list[i].status == "ORDER_ACCEPTED"){
                if(this.user_list[i].adult_num + this.user_list[i].children_num <=this.user_list[i].traveler_num){
                  this.status[i] = ''
                }else{
                  this.status[i] = "补充出游人信息"
                }
                  this.btn[i] = "订单详情";
              }else if(this.user_list[i].status == "ORDER_PAID"){
                if(this.user_list[i].adult_num + this.user_list[i].children_num <=this.user_list[i].traveler_num){
                  this.status[i] = ''
                }else{
                  this.status[i] = "补充出游人信息"
                }
                  this.btn[i] = "订单详情";
              }else if(this.user_list[i].status =="ORDER_ONTRIP"){
                if(this.user_list[i].adult_num + this.user_list[i].children_num <=this.user_list[i].traveler_num){
                  this.status[i] = ''
                }else{
                  this.status[i] = "补充出游人信息"
                }
                  this.btn[i] = "订单详情";
              }else if(this.user_list[i].status == "ORDER_SUBMITTED"){
                  this.status[i] = "支付订单";
                  this.btn[i] = "查看详情";
              }else{
                  this.status[i] = ''
                  this.btn[i] = "查看详情"
              };
              if(this.user_list[i].status == "ORDER_SUBMITTED"){
                  this.fig[i] = true;
              }else if(this.user_list[i].status == "ORDER_PAID"){
                  this.fig[i] = true;
              }else{
                  this.fig[i] = false;
              }
            };


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
  .wih{
    display: inline-block;
    width: 100%;
    height: 35px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
.have-indent{
  width: 979px;
  min-height: 300px;
  background: #FFF;
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.have-indent h4{
  border-bottom: 1px solid rgba(229, 233, 231, 0.41);
  padding: 10px 0;
}
  .have-indent h4 a{
    text-decoration: none;
    float: right;
    font-size: 15px;
    margin-top: 4px;
    color: #5d9cff;
  }
  .have-indent p{
    width: 100%;
    height: 30px;
    background: rgba(229, 233, 231, 0.41);
    line-height: 30px;
    font-size: 15px;
    margin-top: 20px;
  }
  .have-indent p span{
    text-align: center;
    display: inline-block;
  }
  .have-indent p span:nth-child(1){
      width: 170px;
  }
  .have-indent p span:nth-child(2){
    width: 149px;
  }
  .have-indent p span:nth-child(3){
      width: 170px;
  }
  .have-indent p span:nth-child(4){
      width: 130px;
  }
  .have-indent p span:nth-child(5){
    width: 170px;
  }
  .have-indent p span:nth-child(6){
    width: 150px;
  }
  .indent-list{
    list-style: none;
    font-size: 13px;
  }
  .indent-list>li{
    height: 156px;
    border-top: 1px solid rgba(229, 233, 231, 0.41);
  }
  .indent-list>li>div{
    float: left;
  }
  .indent-images{
    padding: 15px 15px 10px 15px;
    width: 170px;
    cursor: pointer;
  }
  .indent-images a{
    color: #000000;
    text-decoration: none;
  }
  .encase-img{
    width: 140px;
    height: 70px;
  }
  .encase-img img{
    width: 100%;
    height: 100%;
  }
  .indent-number{
    width: 149px;
    line-height: 155px;
    color: red;
    text-align: center;
  }
  .indent-state{
    width: 170px;
    line-height: 155px;
    text-align: center;
  }
  .indent-type{
    width:130px;
    line-height: 155px;
    text-align: center;
  }
  .indent-time{
    width: 170px;
    line-height: 155px;
    text-align: center;
  }
  .indent-operation{
    width: 150px;
    text-align: center;
    padding-top: 40px;
  }
  .operation{
    border: 1px solid red;
    padding:5px 10px 3px 10px;
    color: red;
    font-weight: bold;
    border-radius: 5px;
    display: block;
    font-size: 15px;
    cursor: pointer;
  }
  .indent-cancel{
    margin-top: 20px;
    color: #808080;
    cursor: pointer;
  }
  .check{
    display: inline-block;
    margin-top: 25px;
    cursor: pointer;
  }
  .indent-cancel{
    color: #808080;
    margin-top: 20px;
    cursor: pointer;
    display: block;
  }
</style>
