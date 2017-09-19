<template>
  <div class="bcDatum">
    <div class="datum-main">
      <div class="datum-title">
        <h3>补充出游人信息</h3>
        <p class="baoxian">请填写真实的出游人信息，取车时核验证件</p>
        <p class="tishi">您已经订购{{ this.order_people.driver_num }}辆车，请从出游人中选择{{ this.order_people.driver_num }}位驾驶人去提车</p>
      </div>
      <div class="add-datum" v-for="(item,index) in this.order_people.driver_num" :key="item.id">
        <h2><span></span>出游人{{index+1}}</h2>
        <div class="add-input">
          <p class="add-inp1">
            <span class="add-name"><span>*</span>姓名：</span>
            <input type="text" v-on:input="inputFun1(index)" maxlength="30" placeholder="请输入真实姓名"  v-model="user_name[index]" @blur="get_dName(index)"/>
            <i class="glyphicon glyphicon-remove" v-if="nameshow[index]" @click="clear(index)"></i>
            <span class="hint">{{ hint[index] }}</span>
          </p>
          <p class="add-inp2">
            <span class="add-id"><span>*</span>身份证号：</span>
            <input type="text" v-on:input="inputFun2(index)" maxlength="18" placeholder="请输入身份证号" v-model="user_id[index]" @blur="get_dId(index)"/>
            <i class="glyphicon glyphicon-remove" v-if="idshow[index]" @click="clear1(index)"></i>
            <span class="hint">{{ hintId[index] }}</span>
          </p>
          <p class="add-inp3">
            <span class="add-tel"><span>*</span>手机：</span>
            <input type="text" v-on:input="inputFun3(index)" maxlength="11" placeholder="请输入手机号" v-model="user_tel[index]" @blur="get_dTel(index)"/>
            <i class="glyphicon glyphicon-remove" v-if="telshow[index]" @click="clear2(index)"></i>
            <span class="hint">{{ hintTel[index] }}</span>
          </p>
          <p class="add-driver">
            <span class="driver"><span>*</span>驾驶人：</span>
            <span class="yes">是</span>
          </p>
        </div>
      </div>
      <div class="add-datum" v-for="(item,index) in this.people_num">
        <h2><span></span>出游人{{ index+driver_num }}</h2>
        <div class="add-input">
          <p class="add-inp1">
            <span class="add-name"><span>*</span>姓名：</span>
            <input type="text" v-on:input="inputFunc(index)" maxlength="30" placeholder="请输入真实姓名" v-model="Tuser_name[index]" @blur="get_tName(index)"/>
            <i class="glyphicon glyphicon-remove"  v-if="Tnameshow[index]" @click="clear3(index)"></i>
            <span class="hint">{{ Thint[index] }}</span>
          </p>
          <p class="add-inp2">
            <span class="add-id"><span>*</span>身份证号：</span>
            <input type="text" v-on:input="inputFunc1(index)" maxlength="18" placeholder="请输入身份证号" v-model="Tuser_id[index]" @blur="get_tId(index)"/>
            <i class="glyphicon glyphicon-remove" v-if="Tidshow[index]" @click="clear4(index)"></i>
            <span class="hint">{{ ThintId[index] }}</span>
          </p>
          <p class="add-inp3">
            <span class="add-tel">手机：</span>
            <input type="text" v-on:input="inputFunc2(index)" maxlength="11" placeholder="请输入手机号" v-model="Tuser_tel[index]" @blur="get_tTel(index)"/>
            <i class="glyphicon glyphicon-remove" v-if="Ttelshow[index]" @click="clear5(index)"></i>
            <span class="hint">{{ ThintTel[index] }}</span>
          </p>
        </div>
      </div>
      <div class="box">
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {get_order_people, order_traveler_add_api} from '../data/api/api'
  import {add_traveler} from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'
    export default {
        name: 'bcDatum',
        data () {
            return {
                user_name:'',
                user_id:'',
                user_tel:'',

                is_driver:0,      //是否是司机  是：1，否：0

                Tuser_name:'',
                Tuser_id:'',
                Tuser_tel:'',

                hint:[],
                hintId:[],
                hintTel:[],
                nameshow:false,
                idshow:false,
                telshow:false,

                Thint:[],
                ThintId:[],
                ThintTel:[],
                Tnameshow:false,
                Tidshow:false,
                Ttelshow:false,

                orderId:0,               //订单id
                token:"",                 //token
                order_people:{},          //订单人数列表
                people_num:0,              //除去司机剩余的出游人
                driver_num:0,               //司机人数+1
                driver_data:'',
                travelers_data:'',
                travelers:[],
                fig:false,
            }
        },
        created:function(){
            this.orderId = this.$route.query.orderId;
            window.onunload = this.onunload_handler;
            console.log('window.onunload');
            window.onbeforeunload = this.onbeforeunload_handler;
            console.log('window.onbeforeunload');
        },
        mounted(){
            var jsonObj=JSON.parse(localStorage.data);
            this.token = jsonObj.token;
            this.get_order_people();
            // window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
//            window.onbeforeunload = function(){
//              return "quit?";
//            }
        },
        destroyed(){
          console.log('submit_order destroyed');
          window.onbeforeunload ='';
          window.onunload = '';

        },
        methods:{

            onbeforeunload_handler: function(){
              var warning="确认退出?";
              return warning;
            },
            onunload_handler: function(){
              var warning="确认离开?";
              return warning;
            },

            inputFunc:function(i){
              this.Tnameshow[i] = true;
              if(this.Tuser_name[i] == ''){
                this.Tnameshow[i] = false;
              }
            },
            inputFunc1:function(i){
              this.Tidshow[i] = true;
              if(this.Tuser_id[i] == ''){
                this.Tidshow[i] = false;
              }
            },
            inputFunc2:function(i){
              this.Ttelshow[i] = true;
              if(this.Tuser_tel[i] == ''){
                this.Ttelshow[i] = false;
              }
            },
            inputFun1:function(i){
              this.nameshow[i] = true;
              if(this.user_name[i] == ''){
                this.nameshow[i] = false;
              }
            },
            inputFun2:function(i){
              this.idshow[i] = true;
              if(this.user_id[i] == ''){
                this.idshow[i] = false;
              }
            },
            inputFun3:function(i){
              this.telshow[i] = true;
              if(this.user_tel[i] == ''){
                this.telshow[i] = false;
              }
            },
            clear:function(i){
              this.$set(this.user_name,i,'');
              this.$set(this.hint,i,'');
              this.nameshow[i] = false;
            },
            clear1:function(i){
              this.$set(this.user_id,i,'');
              this.$set(this.hintId,i,'');
              this.idshow[i] = false;
            },
            clear2:function(i){
              this.$set(this.user_tel,i,'');
              this.$set(this.hintTel,i,'');
              this.telshow[i] = false;
            },
            clear3:function(i){
              this.$set(this.Tuser_name,i,'');
              this.$set(this.Thint,i,'');
              this.Tnameshow[i] = false;
            },
            clear4:function(i){
              this.$set(this.Tuser_id,i,'');
              this.$set(this.ThintId,i,'');
              this.Tidshow[i] = false;
            },
            clear5:function(i){
              this.$set(this.Tuser_tel,i,'');
              this.$set(this.ThintTel,i,'');
              this.Ttelshow[i] = false;
            },



            insert:function(i){                            //插值判空
              if(!this.user_name[i] || !this.user_id[i] || !this.user_tel[i]){
                return false
              }
              this.driver_data[i]="{\"name\": \""+this.user_name[i]+"\", \"phone\": "+this.user_tel[i]+", \"idcard_no\": "+this.user_id[i]+", \"is_driver\": 1}"
            },
            insert2:function(i){                            //插值判空
              if(!this.Tuser_name[i] || !this.Tuser_id[i]){
                return false
              }
              if(!this.Tuser_tel[i]){
                this.travelers_data[i]="{\"name\": \""+this.Tuser_name[i]+"\", \"idcard_no\": "+this.Tuser_id[i]+", \"is_driver\": 0}"
              }else{
                this.travelers_data[i]="{\"name\": \""+this.Tuser_name[i]+"\", \"phone\": "+this.Tuser_tel[i]+", \"idcard_no\": "+this.Tuser_id[i]+", \"is_driver\": 0}"
              }
            },



            get_dName:function(i){                      //获取司机名字
              var reg=/^([\u4e00-\u9fa5]){2,7}$/;
              if (reg.test(this.user_name[i])) {
                this.$set(this.hint,i,'')
                this.fig = true;
              }else {
                this.$set(this.hint,i,'请输入真实姓名')
                this.fig = false;
                }
              this.insert(i);
            },
            get_dId:function(i){                        //获取司机身份证
              var re=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
              if (re.test(this.user_id[i])) {
                for(var j =0;j<this.user_id.length;j++){
                  if(j == i){
                    this.$set(this.hintId,i,'')
                    continue;
                  }
                  if(this.user_id[j]==this.user_id[i]){
                    this.$set(this.hintId,i,'身份证号重复')
                    this.fig = false;
                    return false;
                  }else{
                    this.$set(this.hintId,i,'')
                    this.fig = true;
                    console.log("111",this.fig)
                  }
                }
                for(var k=0;k<this.Tuser_id.length;k++){
                  if(this.user_id[i] == this.Tuser_id[k]){
                    this.$set(this.hintId,i,'身份证号重复')
                    this.fig=false;
                    return false;
                  }else{
                    this.$set(this.hintId,i,'')
                    this.fig = true;
                    console.log("222",this.fig)
                  }
                }
              }else {
                this.$set(this.hintId,i,'请输入真实身份证号')
                this.fig = false;
                console.log("000",this.fig);
              }
              this.insert(i);
            },
            get_dTel:function(i){                       //获取司机手机号
              var re=/^1(3|4|5|7|8)\d{9}$/;
              if (re.test(this.user_tel[i])) {
                for(var j =0;j<this.user_tel.length;j++){
                  if(j==i){
                    this.$set(this.hintTel,i,'')
                    continue;
                  }
                  if(this.user_tel[j]==this.user_tel[i]){
                    this.$set(this.hintTel,i,'手机号重复')
                    this.fig = false;
                    return false;
//                    return this.user_tel[i]="";
                  }else{
                    this.$set(this.hintTel,i,'')
                    this.fig = true;
                  }
                }
                for(var k=0;k<this.Tuser_tel.length;k++){
                  if(this.user_tel[i] == this.Tuser_tel[k]){
                    this.$set(this.hintTel,i,'手机号重复')
                    this.fig = false;
                    return false;
                  }else{
                    this.$set(this.hintTel,i,'')
                    this.fig = true;
                  }
                }
              }else {
                  this.$set(this.hintTel,i,'请输入正确手机号')
                  this.fig = false;
              };
                this.is_driver = 1;
                this.insert(i);
            },
            get_tName:function(i){                      //获取乘客名字
              var reg=/^([\u4e00-\u9fa5]){2,7}$/;
                if (reg.test(this.Tuser_name[i])) {
                    this.$set(this.Thint,i,'')
                    this.fig = true;
                }else {
                    this.$set(this.Thint,i,'请输入真实姓名')
                    this.fig = false;
                }
              this.insert2(i);
            },
            get_tId:function(i){                        //获取乘客身份证
              var re=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
              if (re.test(this.Tuser_id[i])) {
                  for(var j=0;j<this.Tuser_id.length;j++){
                    if(j==i){
                      this.$set(this.ThintId,i,'')
                      continue;
                    }
                    if(this.Tuser_id[i] == this.Tuser_id[j]){
                      this.$set(this.ThintId,i,'身份证号重复')
                      this.fig = false;
                      return false;
                    }
                  }
                  for(var k=0;k<this.user_id.length;k++){
                    if(this.Tuser_id[i] == this.user_id[k]){
                      this.$set(this.ThintId,i,'身份证号重复')
                      this.fig = false;
                      return false;
                    }else{
                      this.$set(this.ThintId,i,'')
                      this.fig = true;
                    }
                  }

              }else {
                this.$set(this.ThintId,i,'请输入真实身份证号')
                this.fig = false;
              }
              this.is_driver = 0;
              this.insert2(i);
            },
            get_tTel:function(i){                       //获取乘客手机号
              var re=/^1(3|4|5|7|8)\d{9}$/;
              if (re.test(this.Tuser_tel[i])) {
                for(var j=0;j<this.Tuser_tel.length;j++){
                  if(j==i){
                    this.$set(this.ThintTel,i,'');
                    continue;
                  }
                  if(this.Tuser_tel[i] == this.Tuser_tel[j]){
                    this.$set(this.ThintTel,i,'手机号重复')
                  }
                }
                for(var k=0;k<this.user_tel.length;k++){
                  if(this.Tuser_tel[i] == this.user_tel[k]){
                    this.$set(this.ThintTel,i,'手机号重复')
                  }else{
                    this.$set(this.ThintTel,i,'')
                  }
                }
              }else {
                if(this.Tuser_tel[i] == "" || this.Tuser_tel[i] == undefined){
                  this.$set(this.ThintTel,i,'')
                }else{
                  this.$set(this.ThintTel,i,'请输入正确手机号')
                  this.fig = false;
                }
              };
//              this.insert2(i);
            },
            get_order_people:function(){           //获取订单出游人列表
                let nonce = onlyid(32, 52);   //  生成唯一ID
                let timestamp = times();   // 生成时间戳
                let pap = "{\"order_id\":"+this.orderId+"}"
                let params ={
                    token:this.token,
                    appid: '5101',
                    sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
                    nonce: nonce,
                    timestamp: timestamp,
                    params:pap
                };
                get_order_people(params).then((res) => {
                    this.order_people = res.data;
                    this.people_num = this.order_people.traveler_num - this.order_people.driver_num;
                    this.driver_num = this.order_people.driver_num+1

                    this.user_name = new Array(this.order_people.driver_num);
                    this.Tuser_name = new Array(this.people_num);

                    this.nameshow = new Array(this.order_people.driver_num);
                    this.Tnameshow = new Array(this.people_num);

                    this.user_id = new Array(this.order_people.driver_num);
                    this.Tuser_id = new Array(this.people_num);

                    this.idshow = new Array(this.order_people.driver_num);
                    this.Tidshow = new Array(this.people_num);

                    this.user_tel = new Array(this.order_people.driver_num);
                    this.Tuser_tel = new Array(this.people_num);

                    this.telshow = new Array(this.order_people.driver_num);
                    this.Ttelshow = new Array(this.people_num);

                    this.driver_data = new Array(this.order_people.driver_num);
                    this.travelers_data = new Array(this.people_num);
                });
            },
             open() {
                this.$alert('添加出游人信息成功', {
                    confirmButtonText: '确定',
                    callback: action => {
                    this.$router.push('/personalCenter/centerCard');
                    }
                  });
                },
             open2() {
                  this.$alert('提交失败，请认真填写出游人信息', {
                      confirmButtonText: '确定',
                      callback: action => {
                    }
                  });
             },
            submit:function(){          //提交补充出游人信息
              console.log(this.fig);
              for(var i=0;i<this.user_name.length;i++){
                this.get_dName(i);
                if(this.fig == false){
                  this.open2();
                  return false;
                };
                this.get_dId(i);
                if(this.fig == false){
                  this.open2();
                  return false;
                };
                this.get_dTel(i);
                if(this.fig == false){
                  this.open2();
                  return false;
                }
              };
              for(var j =0;j<this.Tuser_name.length;j++){
                this.get_tName(j);
                if(this.fig==false){
                  this.open2();
                  return false;
                };
                this.get_tId(j);
                if(this.fig == false){
                  this.open2();
                  return false;
                };
                this.get_tTel(j);
                if(this.fig == false){
                  this.open2();
                  return false;
                }
              };
              console.log("111111",this.fig);
              this.travelers = [];
              for(var i=0;i<this.driver_data.length;i++){
                this.travelers.push(this.driver_data[i])
              };
              for(var j=0;j<this.travelers_data.length;j++){
                this.travelers.push(this.travelers_data[j])
              };
                let nonce = onlyid(32, 52);   //  生成唯一ID
                let timestamp = times();   // 生成时间戳
                let pap = "{\"order_id\":"+this.orderId+",\"travelers\":["+this.travelers+"]}"
                let params ={
                    token:this.token,
                    appid: '5101',
                    sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&token="+this.token+"&b3b01c69cc8408593f708514a211b09f"),
                    nonce: nonce,
                    timestamp: timestamp,
                    params:pap
                };
              var qs = require('qs');
              var self = this;
              //
//              this.$http.post('http://api.wktrip.com/order/traveler/add',
              this.$http.post(order_traveler_add_api,
                qs.stringify(params)
              ).then(function (res) {
                    if(res.data.code==0){
                      console.log(res)
                      self.open();
                    }else{
                      self.open2();
                      console.log(res);
                    }
                }).catch(function (error) {
                },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            },
        },
  computed:{

  },
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .bcDatum{
    width: 100%;
    min-height: 500px;
    background: rgba(229, 233, 231, 0.41);
    margin-top: 55px;
  }
  .datum-main{
    width: 1000px;
    margin: 0 auto;

  }
  .datum-title{
    overflow: hidden;
  }
  .datum-title h3{
    padding: 20px 0 20px 15px;
    background: #FFF;
    width: 100%;
    float: left;
    margin-top: 20px;
  }
  .baoxian{
    width: 100%;
    float: left;
    padding:15px 0 0 15px;
  }
  .tishi{
    width: 100%;
    float: left;
    padding:5px 0 15px 15px;
  }
  .add-datum{
    padding-bottom: 30px;
    border-top: 1px solid rgba(218, 222, 220, 0.9);
  }
  .add-datum h2{
    font-weight: bold;
    font-size: 22px;
    padding: 12px 0 10px 15px;
  }
  .add-datum h2 span{
    display: inline-block;
    width: 5px;
    height:23px;
    background: #ba594f;
    float: left;
    margin-right: 5px;
  }
  .add-datum1{
    padding-bottom: 30px;
    border-top: 1px solid rgba(218, 222, 220, 0.9);
  }
  .add-datum1 h2{
    font-weight: bold;
    font-size: 22px;
    padding: 12px 0 10px 15px;
  }
  .add-datum1 h2 span{
    display: inline-block;
    width: 5px;
    height:23px;
    background: #ba594f;
    float: left;
    margin-right: 5px;
  }
  .add-input{
    width: 100%;
    min-height: 180px;
    background: #FFF;
    border-bottom: 1px solid rgba(218, 222, 220, 0.9);

  }
  .add-inp1{
    width: 100%;
    padding: 30px 15px 0 15px;
    position: relative;
  }
  .add-inp1 i{
    position: absolute;
    left: 360px;
    top: 36px;
    color: rgba(181, 185, 183, 0.9);
    cursor: pointer;
  }
  .add-name{
    display: inline-block;
    margin-left: 50px;
    font-weight: bold;
    position: relative;
  }
  .add-name span{
    position: absolute;
    left: -15px;
    top: -3px;
    font-size: 25px;
    color: red;
  }
  .add-inp1 input{
    margin-left: 15px;
    width:250px;
    border: 2px solid rgba(218, 222, 220, 0.9);
  }
  .add-inp2{
    width: 100%;
    padding: 20px 15px 0 15px;
    position: relative;
  }
  .add-inp2 i{
    position: absolute;
    left: 360px;
    top: 27px;
    color: rgba(181, 185, 183, 0.9);
    cursor: pointer;
  }
  .add-id{
    display: inline-block;
    margin-left: 18px;
    font-weight: bold;
    position: relative;
  }
  .add-id span{
    position: absolute;
    left: -15px;
    top: -3px;
    font-size: 25px;
    color: red;
  }
  .add-inp2 input{
    margin-left: 15px;
    width:250px;
    border: 2px solid rgba(218, 222, 220, 0.9);
  }
  .add-inp3{
    width: 100%;
    padding: 20px 15px 0 15px;
    position: relative;
  }
  .add-inp3 i{
    position: absolute;
    left: 360px;
    top: 27px;
    color: rgba(181, 185, 183, 0.9);
    cursor: pointer;
  }
  .add-tel{
    display: inline-block;
    margin-left: 49px;
    font-weight: bold;
    position: relative;
  }
  .add-tel span{
    position: absolute;
    left: -15px;
    top: -3px;
    font-size: 25px;
    color: red;
  }
  .add-inp3 input{
    margin-left: 15px;
    width:250px;
    border: 2px solid rgba(218, 222, 220, 0.9);
  }
  .add-driver{
    width: 100%;
    padding: 20px 15px 25px 15px;
  }
  .driver{
    display: inline-block;
    margin-left: 32px;
    font-weight: bold;
    position: relative;
  }
  .driver span{
    position: absolute;
    left: -15px;
    top: -3px;
    font-size: 25px;
    color: red;
  }
  .yes{
    font-weight: bold;
    display: inline-block;
    margin-left: 17px;
  }
  .hint{
    display: inline-block;
    margin-left: 20px;
    color: red;
  }
  .box{
    width: 100%;
    height: 70px;
  }
  .submit{
    width: 130px;
    height:40px;
    background: red;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    color: #FFF;
    font-weight: bold;
    border-radius: 7px;
    float: right;
    cursor: pointer;
  }
</style>
