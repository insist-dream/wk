<template>
  <div class="allOrders">
      <h4>
        <span>我的订单</span>
        <template>
          <el-select v-model="value" placeholder="请选择" @change="ttt">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </template>
      </h4>
    <p>
      <span>订单编号</span><span></span><span>订单状态</span><span>类型</span><span>订单金额</span><span>操作</span>
    </p>
    <ul class="indent-list">
      <li v-for="(item,i) in user_list">
        <div class="indent-images">
          <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a">
              <div class="encase-img"><img :src="item.image_url" alt=""/></div>
              <span>{{ item.product_name }}</span>
          </router-link>
        </div>
        <div class="indent-number">{{ item.order_id }}</div>
        <div class="indent-state">{{ item.status_name }}</div>
        <div class="indent-type">{{ type[i] }}</div>
        <div class="indent-time">￥{{ item.total_amount }}</div>
        <div class="indent-operation">
          <span class="operation" v-if="status[i]" @click="addition_pay(status[i],item.order_id)">{{ status[i] }}</span>
          <span class="indent-cancel" v-if="fig[i]" @click="cancel_order(item.order_id,item.product_type,status[i])"><span>取消订单</span></span>
          <div class="check" v-if="btn[i]" @click="view_details(item.order_id,item.product_type,status[i],fig[i])"> 查看详情> </div>
        </div>
      </li>
      <p id="more-order">
        <span v-if="show_more" @click="get_more_list">查看更多 >></span>
        <span v-if="show_noMore" class="no-more">没有更多了</span>
      </p>
    </ul>
  </div>
</template>

<script>
  import {get_user_list} from '../data/api/api'
  import {order_cancel} from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'
  export default {
    name: 'allOrders',
    data (){
      return {
        options: [{
          value: '["ORDER_SUBMITTED","ORDER_PAID","ORDER_ACCEPTED","ORDER_ONTRIP","ORDER_FINISTHED","ORDER_CANCELED",,"ORDER_REFUSED","ORDER_REFUNDED"]',
          label: '全部'
        }, {
          value: '["ORDER_SUBMITTED"]',
          label: '待支付'
        }, {
          value: '["ORDER_PAID"]',
          label: '待确认'
        }, {
          value: '["ORDER_ACCEPTED"]',
          label: '待出游'
        }, {
          value: '["ORDER_ONTRIP"]',
          label: '出游中'
        },{
          value: '["ORDER_FINISTHED"]',
          label: '已完成'
        },{
          value: '["ORDER_CANCELED","ORDER_REFUSED","ORDER_REFUNDED"]',
          label: '已取消'
        },
        ],
        value: '',
        user:{},
        user_list:{},
        type:[],
        status:[],
        btn:[],
        fig:[],
        orderId:0,
        token:"",
        judge:false,
        cancel:false,
        addPay:"",
        page_num:1,
        more_order_list:[],
        s:'["ORDER_SUBMITTED","ORDER_PAID","ORDER_ACCEPTED","ORDER_ONTRIP","ORDER_FINISTHED","ORDER_CANCELED",,"ORDER_REFUSED","ORDER_REFUNDED"]',
        show_more:true,
        show_noMore:false,
      }
    }
  ,
    mounted(){
    var jsonObj=JSON.parse(localStorage.data);
    this.user = jsonObj;
    console.log(this.user)
    this.get_users_list()
    },
    methods:{
      ttt:function(s){
          this.show_more = true;
          this.show_noMore = false;
          this.s = s;
          let nonce = onlyid(32, 52);   //  生成唯一ID
          let timestamp = times();   // 生成时间戳
          let pap = "{\"user_id\":"+this.user.id+",\"status\":"+s+",\"page\":1,\"page_size\":20}"
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
              if(this.user_list.length<10){
                this.show_more = false;
                this.show_noMore = true;
              }
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
      view_details:function(order_id,product_type,status,fig){           //进入订单详情页
        this.orderId = order_id;
        this.product_type = product_type;
        console.log(product_type);
        if(product_type == "PRODUCT_TYPE_SELFHELP"){
            if(status == "支付订单"){
              this.judge = true;
            };
            if(fig == true){
              this.cancel=true;
            };
            this.$router.push({path:'/selfDetails',query:{orderId:this.orderId}});
        }else{
            this.$router.push({path:'/motorcade_details',query:{orderId:this.orderId}});
        };
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
      cancel_order:function(order_id,product_type,status){        //取消订单
        this.orderId = order_id;
        this.cancel = true;
        this.open2();
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


      get_users_list:function(){                        //请求列表
        this.page_num = 1;
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let pap = "{\"user_id\":"+this.user.id+",\"page\":"+this.page_num+",\"page_size\":20}"
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
        if(this.user_list.length<20){
          this.show_more = false;
          this.show_noMore = true;
        }
        for(var i =0;i<this.user_list.length;i++){
          if(this.user_list[i].product_type == "PRODUCT_TYPE_SELFHELP"){
            this.type[i] = "自助自驾"
          }else{
            this.type[i] = "车队自驾"
          };
          if(this.user_list[i].status == "ORDER_ACCEPTED"){
            if(this.user_list[i].adult_num + this.user_list[i].children_num <= this.user_list[i].traveler_num){
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
      get_more_list:function(){
          this.page_num = this.page_num+1;
          let nonce = onlyid(32, 52);   //  生成唯一ID
          let timestamp = times();   // 生成时间戳
          let pap = "{\"user_id\":"+this.user.id+",\"status\":"+this.s+",\"page\":"+this.page_num+",\"page_size\":20}"
          let params ={
            token:this.user.token,
            appid: '5101',
            sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.user.token+"&b3b01c69cc8408593f708514a211b09f"),
            nonce: nonce,
            timestamp: timestamp,
            params:pap
          };
          get_user_list(params).then((res) => {
            this.more_order_list = res.data.orders;
            console.log(this.more_order_list);
            if(this.more_order_list.length == 0){
              this.show_more = false;
              this.show_noMore = true;
            }else{
              if(this.more_order_list.length < 20){
                this.show_more = false;
                this.show_noMore = true;
              }else{
                this.show_more = true;
                this.show_noMore = false;
              }
              for(var i = 0;i<this.more_order_list.length;i++){
                this.user_list.push(this.more_order_list[i])
              }
            };
            console.log(this.show_more)
            console.log(this.show_noMore)
            for(var i =0;i<this.user_list.length;i++){
              if(this.user_list[i].product_type == "PRODUCT_TYPE_SELFHELP"){
                this.type[i] = "自助自驾"
              }else{
                this.type[i] = "车队自驾"
              };
              if(this.user_list[i].status == "ORDER_ACCEPTED"){
                if(this.user_list[i].adult_num + this.user_list[i].children_num <= this.user_list[i].traveler_num){
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
      }
    },
    created(){
    },
    computed:{
      sony(){
        return this.$store.state.user;
      }
    }
  }


</script>

<style scoped>
  #more-order{
    width: 100%;
    padding: 10px 0 50px 0;
    background: #FFF;
    text-align: center;
  }
  #more-order span{
    color: #6a6a6a;
    cursor: pointer;
  }
  .el-select{
    float: right;
    width: 90px;
    margin-top: -10px;
  }
  *{
    margin: 0;
    /*padding: 0;*/
  }
  .allOrders{
    width: 979px;
    min-height: 300px;
    background: #FFF;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .allOrders h4{
    padding: 15px 0;
    border-bottom: 1px solid rgba(229, 233, 231, 0.41);
    font-size: 15px;
    position: relative;
  }
  .all-nav>li a{
    text-align: center;
  }
  .all-nav>li>a:hover{
    background: #6bb0ff;
  }
  .allOrders p{
    width: 100%;
    height: 30px;
    background: rgba(229, 233, 231, 0.41);
    line-height: 30px;
    font-size: 15px;
    margin-top: 20px;
  }
  .allOrders p span{
    text-align: center;
    display: inline-block;
  }
  .allOrders p span:nth-child(1){
    width: 170px;
  }
  .allOrders p span:nth-child(2){
    width: 149px;
  }
  .allOrders p span:nth-child(3){
    width: 170px;
  }
  .allOrders p span:nth-child(4){
    width: 130px;
  }
  .allOrders p span:nth-child(5){
    width: 170px;
  }
  .allOrders p span:nth-child(6){
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
    color: black;
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
  .indent-images span{
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
    display: block;
  }
  .check{
    display: inline-block;
    margin-top: 25px;
    cursor: pointer;
  }
  /*.no-more{*/
    /*color: red !important;*/
  /*}*/
</style>
