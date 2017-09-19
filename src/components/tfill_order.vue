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
            <li class="step-3" style="color: #ffffff;background-color: #d00000;">
              <p>2.填写订单</p>
              <img class="l-img" src="../assets/steps.png" alt="">
              <img class="r-img" src="../assets/step-j.png" alt="">
            </li>
            <li class="step-4">
              <p>3.支付完成</p>
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
            <p class="type">{{ torder_calc.start_date }}出发　　　{{ torder_calc.adult_num }}成人　　　{{ torder_calc.children_num }}儿童</p>
          </div>
          <!--路线名称内容end-->
        </div>
        <!--路线名称end-->
        <!--联系人信息begin-->
        <div class="contact-information">
          <img src="../assets/contact-information.png" alt="">
          <h3>联系人信息</h3>
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
              <span v-if="torder_calc.bill.wkcoin_avai_pay == 0" class="offset">（无可用）</span>
              <span v-else-if="!islogin" class="offset">（可抵{{torder_calc.bill.wkcoin_avai_pay}}元使用）</span>
              <span v-else class="offset">（可抵{{torder_calc.bill.wkcoin_avai_pay}}元使用）</span>
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
        <!--提交订单-->
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
                  <h4 style="width:100%; font-size: 22px;">出游费用</h4>
                  <div v-for="item in torder_calc.bill.travels">
                    <span style="display:block;line-height:2; font-size:16px;">{{item.name }} <span style="display:block;float:right;text-align:right;margin-right:85px;">{{item.description}}</span></span>
                  </div>
                  <h4 style="width:100%; font-size: 22px;">附加项目</h4>
                  <div v-for="item in torder_calc.bill.additional">
                    <span style="display:block;line-height:2; font-size:16px;">{{item.name }} <span style="display:block;float:right;text-align:right;margin-right:85px;">{{item.description}}</span></span>
                  </div>
                  <div style="border-top:1px solid #e6e6e6;margin-top:25px;padding-top:25px;">
                    <span style="text-decoration:line-through;margin-top:10px;display:block;line-height:1.5;text-align:right;margin-right:85px;">原价: ¥{{torder_calc.bill.origin_amount}}</span>
                    <span style="display:block;line-height:1.5;text-align:right;margin-right:85px;">折扣价: ¥{{torder_calc.bill.preferential_amount}}</span>
                    <span style="display:block;line-height:1.5;text-align:right;margin-right:85px;">悟空币: -¥{{use_wxcoin}}</span>
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
    <!--<p>{{ torder_calc.bill.additional }}</p>-->
    <!--确认行程end-->
  </div>
</template>
<script>
  import { order_add, order_add_api, get_list_api,calculate_order,appVersionStr,deviceTypeStr, get_user_detail } from '../data/api/api'
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
        coinisselected: false,
        isselected: true,
        use_wxcoin: 0,
        calcInfo:{},
        batch_id:0,
        room_dif:0,
        park_dif:0,
        teamperson:{}
      }
    },
    created(){
      if(JSON.stringify(this.$store.state.team_order_calc) == "{}"){
        this.calcInfo = JSON.parse(localStorage.team_order_calc)
      }else{
        this.calcInfo = this.$store.state.team_order_calc
      }
      if(JSON.stringify(this.$store.state.team_person) == "{}"){
        this.teamperson = JSON.parse(localStorage.team_person)
      }else{
        this.teamperson = this.$store.state.team_person
      }
    },
    mounted(){
      if(localStorage.data){
        this.getcalcinfo()
      }else{
        this.total_amount = this.torder_calc.total_amount
        this.wkcoin_avai_pay = this.torder_calc.bill.wkcoin_avai_pay
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
        return JSON.parse(localStorage.line_product)
      },
      // 车队订单计算结果
      torder_calc() {
        return this.calcInfo
      },
      person() {
        return this.teamperson
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
          this.torder_calc.bill.wkcoin_avai_pay = this.user2.account.wkcoin;
          this.wkcoin_avai_pay = this.user2.account.wkcoin;
        });
      },
      getcalcinfo(){
        let timestamp = times();
        let nonce = onlyid(32, 52);
        // 用户token
        let token = JSON.parse(localStorage.data).token
        // 用户ID
        let userid = JSON.parse(localStorage.data).id
        let param = "{\"user_id\":" + userid + ",\"wkcoin_pay\":" + JSON.parse(localStorage.data).account.wkcoin + ",\"product_id\":" + this.torder_calc.product_id + ",\"start_date\":\""+ this.torder_calc.start_date +"\",\"adult_num\":"+ this.torder_calc.adult_num +",\"children_num\":"+ this.torder_calc.children_num +",\"motorcade\":{\"product_batch_id\":"+ this.person.batch_id +",\"car_miss_num\": "+ this.person.park_dif +",\"room_miss_num\":"+ this.person.room_dif +"},\"version\":{\"appVersion\":\"" + appVersionStr +"\",\"deviceType\":\"" + deviceTypeStr + "\"}}"
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+ param +"&timestamp=" + timestamp + "&token="+ token +"&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: param,
          token: token
        }
        console.log(para)
        calculate_order(para).then((res) =>{
          console.log(res.data)
          this.$store.commit('team_order_calc', res.data)
          this.calcInfo = res.data
          this.total_amount = res.data.total_amount
          this.total_amount = this.torder_calc.total_amount
          console.log('torder_calc===',this.torder_calc)
          this.use_wxcoin = this.torder_calc.bill.wkcoin_pay
          this.wkcoin_avai_pay = this.torder_calc.bill.wkcoin_avai_pay
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
        	this.get_user_detail();
          if(document.getElementById("wkcoin").checked){// 选中悟空币，重新计算价格
            this.coinisselected = true
            this.use_wxcoin = this.torder_calc.bill.wkcoin_pay
            this.total_amount = this.total_amount - this.use_wxcoin
          }else{
            this.total_amount = this.use_wxcoin + this.total_amount
            this.coinisselected = false
            this.use_wxcoin = 0
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
      // 生成唯一ID nonce
      uuid: function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
          // Compact form
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
          // rfc4122, version 4 form
          var r;
          // rfc4122 requires these characters
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random() * 16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return uuid.join('');
      },
      // 车队
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
          let token = JSON.parse(localStorage.data).token
          let userid = JSON.parse(localStorage.data).id
          let param = "{\"product_id\":"+ this.torder_calc.product_id +",\"start_date\":\""+ this.torder_calc.start_date +"\",\"adult_num\":"+ this.torder_calc.adult_num +",\"children_num\":"+ this.torder_calc.children_num +",\"motorcade\": {\"product_batch_id\":"+ this.person.batch_id +",\"car_miss_num\":"+ this.person.park_dif +",\"room_miss_num\":"+ this.person.room_dif +"},\"contact\":{\"name\":\""+ this.order.name +"\",\"phone\":\""+ this.order.phone +"\",\"idcard_no\":\""+ this.order.idcard_no +"\"},\"user_id\":"+ userid +",\"wkcoin_pay\":"+this.use_wxcoin+"}";

          console.log('order_add_api param2 [/order/add]=', param)
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
          console.log('order_add_api=', para)
					this.$http.post(order_add_api,
            qs.stringify(para)
          ).then(function (res) {
            console.log(res.data);
            if(res.data.code == 0){
              if(res.data.status == 'ORDER_SUBMITTED'){
                self.$router.push({path:'/submit_order',query:{orderId:res.data.order_id}})
              }else{
                setDataToLocal("wxpay",{out_trade_no:'',code_url:'',pay_method:'wkcoin',total_amount:res.data.total_amount,order_id:res.data.order_id,type:res.data.product_type})
                self.$router.push({path:'/bookedSuccess',query:{total_amount:res.data.total_amount,order_id:res.data.order_id,type:res.data.product_type}});
              }
            }
          }).catch(function (error) {
          },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        }
      },
      gotologin:function(){// 页面暂时存储起来，跳转至登录，之后调回来
        setDataToLocal("refer",{name:this.order.name,phone:this.order.phone,idcard_no:this.order.idcard_no,urlrefer:'tfill_order'})
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
    width: 1030px;
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
    /*height: 29px;*/
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
