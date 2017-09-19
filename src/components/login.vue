<template>
  <div class="login">
      <div class="login-bg">
        <!--<img src="../assets/login-logo02.png" alt=""/>-->
        <div class="login-frame">
            <h4>验证手机号</h4>
          <div class="padding">
            <p class="prompt">{{ hint }}</p>
            <div class="login-phone">
                <span></span>
                <input type="text" maxlength="11" v-on:input="inputFunc" placeholder="手机号" value="" v-model="phone" @blur="aaaa" @obtain="setUser"/>
                <i v-if="show" @click="clear1"></i>
            </div>
            <div class="login-verify">
              <span></span>
              <input type="text" v-on:input="inputFun" placeholder="验证码" maxlength="4" value="" v-model="vcode" @blur="bbbb"/>
              <i v-if="show1" @click="clear2"></i>
            </div>
            <daojishi v-if="this.change1" class="count"  @timeover="overtime" @click.native='sendCode'>获取验证码</daojishi>
            <daojishi v-else class="count" :start='start' @countDown ='start=true' @timeover="overtime"> </daojishi>
            <div class="voice"><p v-if="hide">收不到验证码. <span @click="sendVoiceCode">点击接受语音验证码</span></p></div>
            <div class="confirm" @click="dologin">确定</div>
            <p class="login-tips">小贴士：未注册悟空自驾游的手机号，点击确定时代表您已 阅读并同意 <router-link to="/reuse_left/user_agreement">《悟空自驾游用户协议》</router-link>，系统将自动注册。</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import daojishi from '@/components/daojishi'
  import { send_code,login } from '../data/api/api'
//  import { formatDate } from '../data/date';
  import md5 from 'js-md5';   // md5引入
  import { getDataFromLocal } from '../comment/public'

  export default {
    name: 'login',
    data (){
      return {
        phone: '',
        vcode: '',
        hint: '',
        start: false,
        flag: false,
        confirm: false,
        err_phone:'',
        urlrefer: 'home',
        show:false,
        show1:false,
        hide:false,
        change1:true,
        screenHeight:$(window).height()-150,
      }
    },
    components: {
      daojishi,
    },
    created(){
      this.urlrefer = getDataFromLocal('refer', 'urlrefer')
    },
    mounted (){
      $('.login-bg').css('min-height',510 + 'px');
    },
    methods: {
      overtime(fig){
        if(fig == 0){
          this.start = false;
          this.hide = false;
          this.flag = false;
          this.change1 = false;
        }else{
          this.start = true;
          this.hide = true;
          this.flag = true;
          this.change1 = true;
        }
      },
      // 生成唯一ID nonce
      uuid: function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
          var r;
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
      // 生成时间戳 timestamp
      timestamp: function () {
        // 获取格式化当前时间  Y-m-d H:i:s
        Date.prototype.Format = function (format) {

          var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
          }
          if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
          }
          return format;
        }
        var date = new Date();
        var currentTime = date.Format("yyyy-MM-dd hh:mm:ss");
        return currentTime;
      },
      inputFunc:function(){                          // 输入框中的清空按钮
        this.show = true;
        if(this.phone == ''){
          this.show = false;
        }
      },
      inputFun:function(){
        this.show1 = true;
        if(this.vcode == ''){
          this.show1 = false;
        }
      },
      clear1:function(){
        this.phone = '';
        this.show = false;
        this.hint = '请重新输入手机号'
        this.flag = false;
      },
      clear2:function(){
        this.vcode = '';
        this.show1 = false;
      },                                            //清空按钮结束
      aaaa: function () {
        var re = /^1(3|4|5|7|8)\d{9}$/;
        if (re.test(this.phone)) {
          this.hint = ''
          this.flag = true
        } else {
          if (!this.phone == '') {
            this.hint = '请输入正确的手机号!'
            this.err_phone = this.phone;
            this.flag = false
          } else {
            this.hint = '请先输入手机号！'
            this.flag = false
          }
        }
      },
      bbbb: function () {
        var ma = /^\d{4}$/;
        if (this.phone == '') {
          this.hint = '请先输入手机号！'
        }else if (this.phone == this.err_phone){
          this.hint = '请输入正确的手机号!'
        }else {
          if (ma.test(this.vcode)) {
            this.hint = ''
            return this.confirm = true;
          } else {
            if (!this.vcode == '') {
              this.hint = '请输入正确的验证码！'
            } else {
              this.hint = '请输入验证码！'
            }
          }
        }
      },
      // 发送验证码
      sendCode (value){
        this.aaaa();
        if (!this.flag) {
            return
        }
        this.change1 = false;
        this.start = true;


        // 验证码请求参数
//        console.log(this.flag);
        let nonce = this.uuid(32, 16);
        let timestamp = this.timestamp();
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params={\"phone\":\"" + this.phone + "\",\"category\":\"ZIJIAYOU\",\"version\":{\"appVersion\":\"1.0.0\",\"deviceOSVersion\":\"WKTRIP PC\"}}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: {
            phone: this.phone,
            category:"ZIJIAYOU",
            version: {
              appVersion: "1.0.0",
              deviceOSVersion: "WKTRIP PC"
            }
          }
        }
        send_code(para).then((res) => {           // 请求后执行
            if(res.data.code == 2 && res.data.msg == "您操作太频繁，请稍后再试"){
                this.hint = "您操作太频繁，请稍后再试";
            };
        })
      },
      sendVoiceCode:function(){               //语音验证码
        this.aaaa();
        let nonce = this.uuid(32, 16);
        let timestamp = this.timestamp();
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params={\"phone\":\"" + this.phone + "\",\"category\":\"ZIJIAYOU\",\"type\":2,\"version\":{\"appVersion\":\"1.0.0\",\"deviceOSVersion\":\"WKTRIP PC\"}}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: {
            phone: this.phone,
            category:"ZIJIAYOU",
            type:2,
            version: {
              appVersion: "1.0.0",
              deviceOSVersion: "WKTRIP PC"
            }
          }
        }
        send_code(para).then((res) => {           // 请求后执行
        if(res.data.code==0){
          this.hint = "验证码会以电话形式通知您，请注意接听!"
        }
      })
      },
      setUser: function () {
        this.$emit('transferUser', this.phone)
      },
      // 登录
      dologin:function() {
        this.aaaa();
//        this.bbbb();
        // 登录请求参数
        let nonce = this.uuid(32, 16); // uuid
        let timestamp = this.timestamp(); // timestamp
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params={\"uid\":\"" + this.phone + "\",\"vcode\":\"" + this.vcode + "\",\"category\":\"ZIJIAYOU\",\"version\":{\"appVersion\":\"1.0.0\",\"deviceType\":\"WKTRIP PC\"}}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: {
            uid: this.phone,
            vcode: this.vcode,
            category:"ZIJIAYOU",
            version: {
              appVersion: "1.0.0",
              deviceType: "WKTRIP PC"
            }
          }
        }
        // console.log(md5("appid=5101&nonce=" + nonce + "&params={\"uid\":\"" + this.phone + "\",\"password\":\"" + this.vcode + "\"}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"))

        login(para).then((res) => {
            if(res.data.code == 0){
                const storage=window.localStorage;
                var data=JSON.stringify(res.data);
                storage.setItem("data",data);
                var json=storage.getItem("data");
                var jsonObj=JSON.parse(json);
                if (jsonObj.name)
                {
                  this.$store.commit('userlogin', jsonObj.name);
                }
                else
                {
                  this.$store.commit('userlogin', jsonObj.uid.substr(0, 3) + '****' + jsonObj.uid.substr(7));
                }
                if(this.urlrefer == 'fill_order'){
                  this.$router.push('/fill_order');
                }else if(this.urlrefer == 'tfill_order'){
                  this.$router.push('/tfill_order');
                }else{
                  this.$router.push('/home');
                }
            };
        console.log(res.data);
            if(res.data.code == 1  && res.data.msg == "验证码错误" &&this.vcode == ""){
                this.hint = '请输入验证码！'
            }else if(res.data.code == 1 && res.data.msg == "验证码错误" && this.vcode != ""){
                this.hint = '请输入正确的验证码！'
            }
        })
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .login-bg{
    margin-top: 55px;
    position: relative;
    width: 100%;
    /*margin-bottom: 60px;*/
  }
  .login-bg{
    background: url("../assets/login-logo02.png") no-repeat center;
    background-size: auto 100%;
    width: 100%;
    height: 100%;
  }
  .login-frame{
    width: 370px;
    min-height: 332px;
    background: #FFF;
    position: absolute;
    right: 80px;
    top: 89px;
    /*padding: 0 20px;*/
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(167, 165, 167, 0.6);
  }
  .login-frame h4{
    width: 100%;
    height: 50px;
    background: rgba(226, 221, 231, 0.41);
    line-height: 50px;
    padding: 0 20px ;
    font-size: 18px;
    font-weight: bold;
    color: #6e6e6e;
    /*box-shadow: 0 1px 10px rgba(167, 165, 167, 0.6) ;*/
  }
  .padding{
    padding: 0 20px;
  }
  .prompt{
    width: 100%;
    /*padding: 0 15px;*/
    height: 15px;
    margin: 10px 0;
    font-size: 12px;
    color: #dc0000;
  }
  .login-phone{
    width: 100%;
    height: 40px;
    border: 1px solid rgba(175, 175, 181, 0.64);
    position: relative;
  }
  .login-phone span{
    display: inline-block;
    background: url("../assets/icon-ren.png") no-repeat;
    width: 16px;
    height: 17px;
    position: absolute;
    left: 12px;
    top: 11px;
  }
  .login-phone i{
    position: absolute;
    right: 10px;
    top: 13px;
    cursor: pointer;
    background: url("../assets/xxxxx.png") no-repeat;
    background-size: 100% 100%;
    width: 13px;
    height: 13px;
  }
  .login-phone input{
    height: 40px;
    width: 290px;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0);
    font-size: 14px;
  }
  .login-verify{
    width: 200px;
    height: 40px;
    border: 1px solid rgba(175, 175, 181, 0.64);
    position: relative;
    display: inline-block;
    margin-top: 20px;
  }
  .login-verify span{
    background: url("../assets/icon-suo.png") no-repeat;
    width: 16px;
    height: 17px;
    position: absolute;
    left: 12px;
    top: 11px;
  }
  .login-verify i{
    position: absolute;
    right: 10px;
    top: 13px;
    cursor: pointer;
    background: url("../assets/xxxxx.png") no-repeat;
    background-size: 100% 100%;
    width: 13px;
    height: 13px;
  }
  .login-verify input{
    width: 160px;
    position: absolute;
    height: 40px;
    font-size: 14px;
    right: 0;
    top: 0;
    border: none;
    background: rgba(255, 255, 255, 0);
    outline: none;
  }
  .count{
    float: right;
    height: 39px;
    border: 1px solid red;
    width: 110px;
    margin-top: 20px;
    color: red;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    cursor:pointer
  }
  .confirm {
    text-decoration: none;
    color: #FFF;
    font-size: 22px;
    font-weight: normal !important;
  }
  .confirm{
    width: 100%;
    height: 48px;
    text-align: center;
    line-height: 48px;
    background: #dc0000;
    margin-top: 18px;
    cursor:pointer;
    border-radius: 4px;
  }
  .login-tips{
    width: 100%;
    margin:20px 0;
    font-size: 12px;
  }
  .voice{
    font-size: 14px;
    margin-top: 10px;
    /*height: 17px;*/
  }
  .voice span{
    color: red;
    text-decoration: underline;
    cursor:pointer
  }
</style>
