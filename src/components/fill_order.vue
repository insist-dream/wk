<template>
  <div class="confirm-itinerary">
    <div class="top">
      <!--步骤条begin-->
      <div class="steps">
        <div class="s-center">
          <ul>
            <li class="step-1" >
              <p>1.选择产品</p>
              <img class="r-img" src="../assets/step-j.png" alt="">
            </li>
            <li class="step-2" >
              <p>2.确认行程</p>
              <img class="l-img" src="../assets/steps.png" alt="">
              <img class="r-img" src="../assets/step-j.png" alt="">
            </li>
            <li class="step-3" style="color: #ffffff;background-color: #d00000;">
              <p>3.填写订单</p>
              <img class="l-img" src="../assets/steps.png" alt="">
              <img class="r-img" src="../assets/step-j.png" alt="">
            </li>
            <li class="step-4">
              <p>4.支付完成</p>
              <img class="l-img" src="../assets/steps.png" alt="">
              <img class="r-img" src="../assets/step-j.png" alt="">
            </li>
          </ul>
        </div>
      </div>
      <!--步骤条end-->
    </div>
    <!--确认行程begin-->
    <div class="btm">
      <div class="b-center">
        <!--路线名称begin-->
        <div class="route-name">
          <img src="../assets/route-name.png" alt="">
          <h3>路线名称</h3>
          <!--路线名称内容begin-->
          <div class="content">
            <p class="title">{{ details.product_name }}</p>
            <p class="type">{{ order_calc.start_date }}出发　　　{{ order_calc.adult_num }}成人　　　{{ order_calc.children_num }}儿童</p>
          </div>
          <!--路线名称内容end-->
        </div>
        <!--路线名称end-->
        <!--自驾用车begin-->
        <div class="self-driving-car">
          <img src="../assets/selfdriving-car.png" alt="">
          <h3>自驾用车</h3>
          <div class="content">
            <p class="title">{{ order_calc.bill.site_product.product_name }}</p>
            <p class="type">{{ details.site_products.transmission_name }} | {{ details.site_products.displacement }} | {{ details.site_products.carriage }} | {{ details.site_products.capacity }}座
              <span class="content-number">{{ order_calc.bill.site_product.description }}</span>
            </p>
          </div>
        </div>
        <!--自驾用车end-->
        <!--酒店房间begin-->
        <div class="hotel">
          <img src="../assets/hotel.png" alt="">
          <h3>酒店房间</h3>
          <div class="content" v-for="item in this.order_calc.bill.hotels">
            <p class="title">{{ item.hotel_name }}</p>
            <div v-for="pitem in item.hotel_products">
            <p class="type">{{ pitem.product_name }}
              <span class="content-number">{{ pitem.description }}</span>
            </p>
            </div>
          </div>
        </div>
        <!--酒店房间end-->
        <!--景点门票begin-->
        <div v-if="sight_length > 0" class="attractions-tickets">
          <img src="../assets/attractions-tickets.png" alt="">
          <h3>景点门票 <span style="margin-right: 20px;float: right;"></span></h3>
          <div class="content" v-for="sight in this.order_calc.bill.sights">
            <p class="title">{{ sight.sight_name }}</p>
            <p class="type" v-for="psight in sight.sight_products">{{ psight.product_name }}
              <span class="content-number">{{ psight.description }}</span>
            </p>
            <!--<p class="type">西双版纳傣族儿童票（当天下单后1小时生效）-->
              <!--<span class="content-number">1 张</span>-->
            <!--</p>-->
          </div>
          <!--<div class="content">-->
            <!--<p class="title">卧龙中华大熊猫神树坪基地</p>-->
            <!--<p class="type">西双版纳傣族成人票-->
              <!--<span class="content-number">1 张</span>-->
            <!--</p>-->
            <!--<p class="type">西双版纳傣族儿童票（当天下单后1小时生效）-->
              <!--<span class="content-number">1 张</span>-->
            <!--</p>-->
          <!--</div>-->
        </div>
        <!--景点门票end-->
        <!--联系人信息begin-->
        <div class="contact-information">
          <img src="../assets/contact-information.png" alt="">
          <h3>联系人信息<span style="font-size: 14px;color: gray"></span></h3>
          <div class="cinfo-content">
            <!--表单容器begin-->
            <div class="table-box" style="width:680px;">
              <!--请求地址-->
              <form action="" method="post" @submit.prevent="submit">
                <table class="tables">
                  <tr style="height:48px;">
                    <td class="tds"><label for="contact_name" style="overflow: hidden;"><span class="red-star">*</span><span class="font">姓名：</span></label></td>
                    <td style="width:585px;"><input maxlength="10" style="font-size:14px;padding-left:14px;" placeholder="请填写联系人姓名" type="text" v-model="order.name" @blur="checkname" name="contact_name" id="contact_name"/> <span style="color:red; font-size:14px;">{{namehint}}</span></td>
                  </tr>
                  <tr style="height:48px;">
                    <td class="tds"><label for="contact_number"><span class="red-star">*</span><span class="font">手机：</span></label></td>
                    <td style="width:585px;"><input maxlength="11" style="font-size:14px;padding-left:14px;" placeholder="请填写联系人手机号" type="text" v-model="order.phone" @blur="checkphone" name="contact_number" id="contact_number" /> <span style="color:red; font-size:14px;">{{phonehint}}</span></td>
                  </tr>
                  <tr style="height:48px;">
                    <td class="tds"><label for="id_card"><span class="font">身份证：</span></label></td>
                    <td style="width:585px;"><input maxlength="18" style="font-size:14px;padding-left:14px;" placeholder="请填写联系人身份证号" type="text" v-model="order.idcard_no" @blur="checkcardid" name="id_card" id="id_card" /> <span style="color:red; font-size:14px;">{{cardhint}}</span></td>
                  </tr>
                </table>
              </form>
            </div>
            <!--表单容器end-->
          </div>
        </div>
        <!--联系人信息end-->
        <!--折扣优惠begin-->
        <div class="discount">
          <img src="../assets/discount.png" alt="">
          <h3>折扣优惠</h3>
          <!--折扣优惠内容容器begin-->
          <div class="discount-content">
            <span>
              <label class="coin_no_selected" :class="{coin_is_selected:coinisselected}" >
              <span>
                <input style="display:none;" v-if="islogin" id="wkcoin" type="checkbox" checked="checked" @click="changewkcoin()">
                <input style="display:none;" v-else id="wkcoin" type="checkbox" @click="changewkcoin()">
              </span>
              <span class="wkmoney">悟空币</span></label>
              <span v-if="order_calc.bill.wkcoin_avai_pay == 0" class="offset">（无可用）</span>
              <span v-else-if="!islogin" class="offset">（可抵{{order_calc.bill.wkcoin_avai_pay}}元使用）</span>
              <span v-else class="offset">（可抵{{order_calc.bill.wkcoin_avai_pay}}元使用）</span>
            </span>
          </div>
          <!--折扣优惠内容容器begin-->
        </div>
        <!--折扣优惠end-->
        <div class="agree">
          <span>
            <label class="no_selected" :class="{is_selected:isselected}" ><input style="display:none;" type="checkbox" id="potrol" checked="ckecked" @click="changepotrol()">
            <span style="color: #333333">我已阅读并接受</span></label>
            <span ><a target="_blank" href="/reuse_left/inner_travel_agreement">《旅游协议》</a> 及 <a target="_blank" href="/reuse_left/car_agreement">《车辆服务协议》</a></span>
          </span>
        </div>
        <!--下一步 ispotrolyes -->
        <div class="next">
          <a v-if="getpaybool" style="text-decoration:none;" class="next-button" href="javascript:void(0)" @click="submit_order">确认并支付</a>
          <a v-else style="background-color:#666666;text-decoration:none;cursor:default;" class="next-button" href="javascript:void(0)">确认并支付</a>
          <!--订单金额信息begin-->
          <span class="order-money">
            <span style="color: gray;font-size: 14px;">订单金额：</span>
            <span style="color: #df0900;font-size: 30px;"><span style="font-size:18px;margin-right: 5px;">¥</span>{{ total_amount }}</span>
            <span style="color: gray;font-size: 14px;cursor: pointer;border-bottom:1px solid #666666;padding-bottom:2px;"   @click="dialogTableVisible = true">费用明细 </span>
              <!--费用明细弹出层begin-->
              <el-dialog title="费用明细" :visible.sync="dialogTableVisible" style="color:#333333;">
                <div style="padding: 20px 10px;color:#333333;">
                  <h4 style="width:100%; font-size: 22px;">租车</h4>
                  <span style="display:block;line-height:2; font-size:16px;">{{order_calc.bill.site_product.product_name}} {{ details.site_products.carriage }} 车辆租金 <span style="display:block;float:right;text-align:right;margin-right:85px;">{{order_calc.bill.site_product.description}}</span></span>
                  <span style="display:block;line-height:2; font-size:16px;">{{order_calc.bill.site_product.insurance_name}} <span style="display:block;float:right;text-align:right;margin-right:85px;">{{order_calc.bill.site_product.insurance_description}}</span></span>
                  <h4 style="width:100%; font-size: 22px;">酒店</h4>
                  <div v-for="item in order_calc.bill.hotels">
                    <span style="font-weight:bold;font-size:16px;display:block;line-height:3;">{{item.hotel_name}}</span>
                    <span style="display:block;line-height:2; font-size:16px;" v-for="product in item.hotel_products">{{product.product_name}} <span style="display:block;float:right;text-align:right;margin-right:85px;">{{product.description}}</span></span>
                  </div>
                  <h4 v-if="sight_length > 0" style="width:100%; font-size: 22px;">门票</h4>
                  <div v-if="sight_length > 0" v-for="item in order_calc.bill.sights">
                    <span style="font-weight:bold;font-size:16px;display:block;line-height:3;">{{item.sight_name}}</span>
                    <span style="display:block;line-height:2; font-size:16px;" v-for="product in item.sight_products">{{product.product_name}} <span style="display:block;float:right;text-align:right;margin-right:85px;">{{product.description}}</span></span>
                  </div>
                  <h4 style="width:100%; font-size: 22px;">保险</h4>
                  <div v-for="item in order_calc.bill.insurances">
                    <span style="display:block;line-height:2; font-size:16px;">{{item.name }} <span style="display:block;float:right;text-align:right;margin-right:85px;">{{item.description}}</span></span>
                  </div>
                  <div style="border-top:1px solid #e6e6e6;margin-top:25px;padding-top:25px;">
                    <span style="text-decoration:line-through;margin-top:10px;display:block;line-height:1.5;text-align:right;margin-right:85px;">原价: ¥{{order_calc.bill.origin_amount}}</span>
                    <span style="display:block;line-height:1.5;text-align:right;margin-right:85px;">折扣价: ¥{{order_calc.bill.preferential_amount}}</span>
                    <span style="display:block;line-height:1.5;text-align:right;margin-right:85px;">悟空币: -¥{{use_wxcoin}}</span><!-- order_calc.bill.wkcoin_pay -->
                    <span style="margin-top:5px;display:block;line-height:1.5;text-align:right;color:red;font-size:16px;margin-right:70px;"><span style="color:#333333">订单总价:</span> ¥<span style="font-size:24px;">{{total_amount}}</span></span>
                  </div>
                </div>
              </el-dialog>
            <!--费用明细弹出层end-->
          </span>
          <!--订单金额信息end-->
        </div>
      </div>
    </div>
    <!--确认行程end-->
  </div>
</template>
<script>
  import { order_add, order_add_api, get_list_api,calculate_order, get_user_detail  } from '../data/api/api'
  import { onlyid,times,setDataToLocal,getDataFromLocal } from '../comment/public'
  import md5 from 'js-md5';

  export default {
    data() {
      return {
        value1: true,
        dialogTableVisible: false,
        dialogFormVisible: false,
        order: {
          name: '',
          phone: '',
          idcard_no: ''
        },
        ispotrolyes: true,
        wkcoin_avai_pay: 0,
        islogin: false,
        user_id: 0,
        total_amount: 0,
        flag: false,
        phonehint: '',
        cardhint: '',
        namehint: '',
        sight_length: 0,
        isselected: true,
        coinisselected: false,
        use_wxcoin: 0,
        calcInfo:{},
        carInfo:{}
      }
    },
    created(){
      if(JSON.stringify(this.$store.state.norder_calc) == "{}"){
        this.calcInfo = JSON.parse(localStorage.norder_calc)
      }else{
        this.calcInfo = this.$store.state.norder_calc
      }
      if(JSON.stringify(this.$store.state.nget_details) == "{}"){
        this.carInfo = JSON.parse(localStorage.nget_details).data
      }else{
        this.carInfo = this.$store.state.nget_details
      }
      if(this.$store.state.sight_param_str == ""){
        this.$store.commit('sight_param_str',JSON.parse(localStorage.hotel_sight_param).sight_param_str)
      }
      if(this.$store.state.hotel_param_str == ""){
        this.$store.commit('hotel_param_str',JSON.parse(localStorage.hotel_sight_param).hotel_param_str)
      }
      if(!this.$store.state.carnum){
        this.$store.commit('addcarnum', JSON.parse(localStorage.carnum).carnum)
      }
    },
    mounted(){
      if(localStorage.data){
        console.log('localStorage.data userinfo', localStorage.data)
        this.getcalcinfo()
      }else{
        this.sight_length = this.order_calc.bill.sights.length
        this.total_amount = this.order_calc.total_amount
        this.wkcoin_avai_pay = this.order_calc.bill.wkcoin_avai_pay
        
        this.islogin = false
        this.coinisselected = false
        this.use_wxcoin = 0
      }
    },
    computed: {
      getpaybool(){
        if(this.ispotrolyes && this.flag){
          return true
        }else{
          return false
        }
      },
      // 路线信息
      details () {
        return this.carInfo
      },
      order_calc () {
        return this.calcInfo
      }
    },
    methods: {
      get_user_detail:function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let pap = "{\"user_id\":"+ this.user_id +",\"category\":\"ZIJIAYOU\",\"version\":{\"appVersion\":\"1.0.0\",\"deviceOSVersion\":\"WKTRIP PC\"}}";
        let token = JSON.parse(localStorage.data).token;

        let params ={
          token:token,
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+token+"&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params:pap
        };
        get_user_detail(params).then((res) => {
          this.user2 = res.data;
          console.log("this.user2=", this.user2);
          this.wkcoin_avai_pay = this.user2.account.wkcoin;
          this.order_calc.bill.wkcoin_avai_pay  = this.wkcoin_avai_pay;
        });
      },
      getcalcinfo(){
        let timestamp = times();
        let nonce = onlyid(32, 52);
        // 用户token
        let token = JSON.parse(localStorage.data).token
        // 用户ID
        let userid = JSON.parse(localStorage.data).id
        let param = "{\"product_id\":"+ this.order_calc.product_id +",\"start_date\":\""+ this.order_calc.start_date +"\",\"adult_num\":"+ this.order_calc.adult_num +",\"children_num\":"+ this.order_calc.children_num +",\"site_products\":[{\"site_product_id\":"+this.details.site_products.product_id+",\"num\":"+this.$store.state.carnum+"}],\"hotels\":"+ this.$store.state.hotel_param_str +",\"sights\":" + this.$store.state.sight_param_str+ ",\"user_id\":" + userid + ",\"wkcoin_pay\":" + JSON.parse(localStorage.data).account.wkcoin + "}"
        // console.log('typeof(param2)=', typeof(param))
        // console.log('param1=', param)
        //param = param.replace(/"/g, '\'');
        console.log('param2=', param)

        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+ param +"&timestamp=" + timestamp + "&token="+ token +"&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: param,
          token: token
        }
        calculate_order(para).then((res) =>{
          console.log(res.data)
          this.$store.commit('norder_calc', res.data)
          this.calcInfo = res.data
          this.total_amount = res.data.total_amount

          this.sight_length = this.order_calc.bill.sights.length
          this.total_amount = this.order_calc.total_amount
          this.use_wxcoin = this.order_calc.bill.wkcoin_pay
          this.wkcoin_avai_pay = this.order_calc.bill.wkcoin_avai_pay
          if(localStorage.data){
            this.islogin = true
            this.coinisselected = true
            this.user_id = JSON.parse(localStorage.data).id
            let referdata = getDataFromLocal('refer')
            if(referdata.phone){
              this.order.name = referdata.name
              this.order.phone = referdata.phone
              this.order.idcard_no = referdata.idcard_no
            }else if(localStorage.data){
              this.order.phone = JSON.parse(localStorage.data).uid
              this.order.name = JSON.parse(localStorage.data).name
              this.order.idcard_no = JSON.parse(localStorage.data).id_no
            }
            this.checkitem()
          }else{
            this.islogin = false
            this.coinisselected = false
            this.use_wxcoin = 0
          }
        })
      },
      checkitem(){
        this.checkname()
        if (!this.flag) {
          return false
        }
        this.checkphone()
        if (!this.flag) {
          return false
        }
        this.checkcardid()
        if (!this.flag) {
          return false
        }
      },
      changewkcoin(){
        if(!this.checklogin()){
          this.gotologin()// 登录
        }else{
        	this.get_user_detail();		//获取最新悟空币
          if(document.getElementById("wkcoin").checked){// 选中悟空币，重新计算价格
            this.coinisselected = true
            this.use_wxcoin = this.order_calc.bill.wkcoin_pay
            this.total_amount = this.total_amount - this.use_wxcoin
          }else{
            this.total_amount = this.use_wxcoin + this.total_amount
            this.use_wxcoin = 0
            this.coinisselected = false
          }
        }
      },
      changepotrol(){
        if(document.getElementById("potrol").checked){
          this.ispotrolyes = true
          this.isselected = true
        }else{
          this.ispotrolyes = false
          this.isselected = false
        }
      },
      // 提交订单
      submit_order: function () {
        if(!this.checklogin()){// 检查登录
          this.gotologin()
        }else{
          this.checkname()
          if (!this.flag) {
            return false
          }
          this.checkphone()
          if (!this.flag) {
            return false
          }
          this.checkcardid()
          if (!this.flag) {
            return false
          }
          let timestamp = times();
          let nonce = onlyid(32, 52);
          // 用户token
          let token = JSON.parse(localStorage.data).token
          // 用户ID
          let userid = JSON.parse(localStorage.data).id
          let param = "{\"product_id\":"+ this.order_calc.product_id +",\"start_date\":\""+ this.order_calc.start_date +"\",\"adult_num\":"+ this.order_calc.adult_num +",\"children_num\":"+ this.order_calc.children_num +",\"site_products\":[{\"site_product_id\":"+this.details.site_products.product_id+",\"num\":"+this.$store.state.carnum+"}],\"hotels\":"+ this.$store.state.hotel_param_str +",\"sights\":"+ this.$store.state.sight_param_str +",\"contact\":{\"name\":\""+ this.order.name +"\",\"phone\":\""+ this.order.phone +"\",\"idcard_no\":\""+ this.order.idcard_no +"\"},\"user_id\":"+ userid +",\"wkcoin_pay\":"+this.use_wxcoin+"}";
          // console.log('typeof(param2)=', typeof(param))
          // console.log('param1=', param)
          //param = param.replace(/"/g, '\'');
          console.log('param2=', param)

          let para = {
            appid: '5101',
            sign: md5("appid=5101&nonce=" + nonce + "&params="+ param +"&timestamp=" + timestamp + "&token="+ token +"&b3b01c69cc8408593f708514a211b09f"),
            nonce: nonce,
            timestamp: timestamp,
            params: param,
            token: token
          }
          var qs = require('qs');
          var self = this;
          console.log(para)
          // this.$http.post('http://api.wktrip.com/order/add',
					this.$http.post(order_add_api,
            qs.stringify(para)
          ).then(function (res) {
            console.log(res);
            if(res.data.code == 0){
              if(res.data.status == 'ORDER_SUBMITTED'){
                self.$router.push({path:'/submit_order',query:{orderId:res.data.order_id}})
              }else{// 悟空币大于总金额，支付成功
                setDataToLocal("wxpay",{out_trade_no:'',code_url:'',pay_method:'wkcoin',total_amount:res.data.total_amount,order_id:res.data.order_id,type:res.data.product_type})
                self.$router.push({path:'/bookedSuccess',query:{total_amount:res.data.total_amount,order_id:res.data.order_id,type:res.data.product_type}});
              }
            }
          }).catch(function (error) {
          },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        }
      },
      gotologin:function(){// 页面暂时存储起来，跳转至登录，之后调回来
        setDataToLocal("refer",{name:this.order.name,phone:this.order.phone,idcard_no:this.order.idcard_no,urlrefer:'fill_order'})
        this.$router.push('/login')
      },
      checklogin:function(){
        return this.islogin
      },
      checkname: function(){
        if(!this.order.name){
          this.flag = false
          this.namehint = '请填写联系人姓名!'
          return ''
        }
        var reg=/^([\u4e00-\u9fa5]|[a-zA-Z]){2,10}$/;
        if (reg.test(this.order.name)) {
          this.namehint = ''
          this.flag = true
          return this.order.name
        }else {
          this.flag = false
          if(!this.order.name){
            this.namehint = '请填写联系人姓名!'
            return ''
          }else{
            this.namehint = '姓名填写不正确，只支持中文或英文!'
            return this.order.name
          }
        }
      },
      checkcardid:function(){
        var re=/^\d{18}$|^\d{17}(\d|X|x)$/;
        if (re.test(this.order.idcard_no)) {
          console.log(this.order.idcard_no)
          this.cardhint = ''
          this.flag = true
          return this.order.idcard_no
        } else {
          if (this.order.idcard_no == '' || this.order.idcard_no == undefined) {
            this.cardhint = ''
            this.order.idcard_no = ''
            this.flag = true
            return ''
          }else{
            this.cardhint = '请输入正确的身份证格式!'
            this.flag = false
            return this.order.idcard_no
          }
        }
      },
      checkphone: function () {
        var re = /^1(3|4|5|7|8)\d{9}$/;
        if (re.test(this.order.phone)) {
          this.phonehint = ''
          this.flag = true
          return this.order.phone
        } else {
          this.flag = false
          if (this.order.phone != '') {
            this.phonehint = '请填写正确的手机号'
            return ''
          } else {
            this.phonehint = '请输入手机号！'
            return this.order.phone
          }
        }
      }
    }
  }
</script>
<style scoped>
  *{
    border:0;
    padding: 0;
    font-family: "Microsoft YaHei UI Light";
  }
  /********公共样式****************/
  .no-btm-border{
    border-bottom: 0;
  }
  /*联系人信息红星*/
  .red-star{
    color: red;
    font-size: 20px;
    display: block;
    padding-top: 10px;
    float:left;
  }
  .font{
    float:left;
    padding-top: 10px;
  }
  /*每项内容信息*/
  .content{
    position: relative;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 15px;
    /*background-color: pink;*/
  }
  .content p{
    width: 690px;
    height: 30px;
    line-height: 30px;
    /*background-color: pink;*/
  }
  /*用车或酒店数量信息*/
  .content-number{
    float: right;
  }
  /*标题全称*/
  .title{
    font-size: 16px;
    font-weight: 900;
  }
  /*所含服务*/
  .type{
    font-size: 14px;
    font-weight: 700;
    color: #bdbdbd;
  }
  /*更换按钮*/
  .change-button{
    position: absolute;
    top: 30%;
    right: 15px;
    width: 40px;
    height: 20px;
    color: #d03f26;
  }
  /******************************/
  /*确认行程*/
  .confirm-itinerary{
    width: 100%;
    height: 100%;
  }
  /*确认行程上部分*/
  .top{
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    /*background-color: pink;*/
    padding-top: 60px;
  }
  /*步骤条*/
  .steps{
    position: relative;
    width: 100%;
    height: 96px;
    /*background-color: yellow;*/
  }
  /*步骤条活动状态*/
  .steps .current{
    background-color: #d00000;
    color: #ffffff;
    font-weight: 700;
  }
  /*步骤条居中*/
  .steps .s-center{
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    height: 26px;
    /*background-color: red;*/
  }
  /*步骤条ul列表*/
  .steps .s-center ul{
    list-style: none;
  }
  /*步骤条ul项*/
  .steps .s-center ul li{
    position: relative;
    float: left;
    width: 292px;
    height: 26px;
    background-color: #f0f0f0;
    margin-right: 8px;
  }
  /*步骤条下的所有img宽高*/
  .steps .s-center ul li img{
    width: 15px;
    height: 26px;
  }
  /*步骤条的每一步名称*/
  .steps .s-center ul li p{
    text-align: center;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
  }
  /*步骤条的左侧贴图*/
  .steps .s-center ul li .l-img{
    position: absolute;
    top: 0;
    left: 0;
  }
  /*步骤条的右侧贴图*/
  .steps .s-center ul li .r-img{
    position: absolute;
    top: 0;
    right: 0;
  }
  /*确认行程*/
  .btm{
    width: 100%;
    /*height: 1000px;*/
    background-color: #f6f6f6;
  }
  /*确认行程居中*/
  .btm .b-center{
    margin: 0 auto;
    width: 1030px;
    height: 100%;
    padding-top: 1px;
    /*background-color: yellow;*/
  }
  .btm .b-center p{
    width: 702px;
  }
  /*确认行程的每项*/
  .btm .b-center .route-name,.self-driving-car,.hotel,.attractions-tickets,.contact-information,.discount{
    position: relative;
    width: 100%;
    margin-top: 30px;
    border: 2px solid #e5e5e5;
    border-top: 0;
    background-color: #ffffff;
  }
  .btm .b-center .route-name p{
    width: 100%;
  }
  /*确认行程的每项标题*/
  .btm .b-center .route-name  h3,.self-driving-car  h3,.hotel  h3,.attractions-tickets h3,.contact-information h3,.discount h3{
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #f3f3f3;
    border-top: 1px solid #e5e5e5;
    font-weight: 900;
    padding-left: 60px;
    color:#333333;
  }
  .attractions-tickets h3{
    padding-left: 55px;
  }
  .contact-information h3{
    padding-left: 70px;
  }
  .btm .b-center .route-name  h3,.self-driving-car  h3,.hotel  h3{
    padding-left: 55px;
  }
  /*确认行程的标题图*/
  .btm .b-center .route-name  img,.self-driving-car  img,.hotel  img,.attractions-tickets img,.contact-information img,.discount img{
    position: absolute;
    left: 15px;
    top: 7px;
    width: 32px; 
    /*width: 38px;
    height: 29px;*/
  }
  .contact-information img{
    top: 3px;
    width: 45px;
  }
  .discount img{
    top: 1px;
    width: 45px;
  }
  .btm .b-center .route-name  img,.self-driving-car  img,.hotel  img{
    width: 29px;
    height: 29px;
    top: 9px;
  }
  /*下一步样式*/
  .btm .b-center .next{
    /*margin-top: 30px;*/
    margin-bottom: 40px;
    width: 100%;
    height: 96px;
    line-height: 96px;
    border:1px solid #e5e5e5;
    border-radius: 3px;
    background-color: #fff;
  }
  /*订单金额容器*/
  .btm .b-center .next .order-money{
    float: right;
    margin-right: 10px;
  }
  .btm .b-center .next .order-money h4{
    /*margin: 0 auto;*/
    font-weight: bold;
    width: 80%;
    height: 50px;
    line-height: 50px;
    /*background-color: pink;*/
    border-bottom: 1px solid #e5e5e5;

  }
  .btm .b-center .next .order-money p{
    height: 35px;
    line-height: 35px;
  }
  /*下一步按钮*/
  .btm .b-center .next .next-button{
    display: inline-block;
    float: right;
    width: 146px;
    height: 40px;
    background-color: #df0900;
    font-size: 18px;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    margin-top: 28px;
    margin-right: 65px;
  }
  /*联系人信息容器*/
  .contact-information{
    height: 246px;
  }
  .contact-information .cinfo-content{
    width: 100%;
    height: 198px;
  }
  /*折扣优惠内容容器*/
  .discount{
    height: 140px;
   }
  .discount .discount-content{
    width: 100%;
    height: 75px;
    padding-left: 24px;
    line-height: 75px;
   }
  /*悟空币文字样式*/
  .discount .discount-content .wkmoney{
    font-size: 18px;
    font-weight: bold;
  }
  /*悟空币抵用金额*/
  .discount .discount-content .offset{
    font-size: 14px;
    color: #666666;
  }
  /*表单容器*/
  .table-box{
    margin-left: 176px;
    width: 405px;
    height: 100%;
    /*background-color: yellow;*/
    padding-top: 20px;
  }
  /*联系人信息表格容器*/
  .tables{
    width: 100%;
    height: 100%;
    /*padding-top: 30px;*/
    padding-bottom: 20px;
  }
  /*输入框样式*/
  .tables input{
    width: 283px;
    height: 26px;
    line-height: 26px;
    border: 2px solid #e5e5e5;
  }
  /*联系人信息td样式*/
  .tds {
    text-align: right;
  }
  /*确认旅游协议*/
  .agree{
    width: 1026px;
    padding-top: 25px;
    padding-bottom: 25px;
    text-align: right;
    font-size: 13px;
    /*background-color: pink;*/
  }
  .agree a{
    color: red;
    text-decoration: none;
  }
  .el-dialog i.el-icon-close{
    background:url('')
  }
  .no_selected{
    background:url('../assets/protrol_no_selected.png') no-repeat;
    padding-left:20px;
    cursor: pointer;
  }
  .is_selected{
    background: url('../assets/protrol_yes_selected.png') no-repeat;
    padding-left:20px;
  }
  .coin_no_selected{
    background:url('../assets/wkcoin_no_selected.png') no-repeat 0 50%;
    padding-left:28px;
    cursor: pointer;
  }
  .coin_is_selected{
    background:url('../assets/wkcoin_yes_selected.png') no-repeat 0 50%;
    padding-left:28px;
  }
</style>
