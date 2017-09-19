<template>
  <div class="reuse_top">
    <!--time:2017.06.30  name:cpx-->
    <div class="top-main">
      <div class="top-logo">
        <!--router-link to="/home"--><a href="/home">
          <img src="../assets/logo.png" alt=""/>
        <!--/router-link-->
        </a>
      </div>
      <div class="nav">
        <ul>
          <li class="active">
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link to="/self">自助自驾</router-link>
          </li>
          <li>
            <router-link to="/motorcade">车队自驾</router-link>
          </li>
          <li>
            <router-link to="/classify">奢华自驾</router-link>
          </li>
          <li>
            <a href="http://www.wkzuche.com" target="_blank">自驾租车</a>
          </li>
        </ul>
        <span hidden>{{ user_login }}</span>
        <div class="user" v-if="this.fig">
          <router-link to="/login">登录 | 注册</router-link>
        </div>
        <div class="user" v-else>
          <router-link to="/personalCenter/centerCard" class="black">
          	<!--<a href="/personalCenter/centerCard" class="black">-->
              <span class="user-icon"><span class="glyphicon glyphicon-user" aria-hidden="true">
              </span></span>{{ user_loginx }}</router-link>
          <span @click="clear" class="clear">[退出]</span>
        </div>
        <div class="top-code">
          <!--<div class="code1"><div class="top-sj"><img src="../assets/code/appcode.png" alt=""/></div></div>-->
          <!--<div class="code2"><div class="top-wx"><img src="../assets/code/wxcode.jpg" alt=""/></div></div>-->
        </div>

        <div class="phone">
          <span></span>
          400-0515-507
        </div>
      </div>
    </div>
  </div>
</template>


<script>
    export default {
      name: 'reuse_top',
      data () {
        return {
          user_loginx:"",
          fig:true,
          phone1:"",
        }
      },
      methods:{
        clear:function(){
          localStorage.clear();
          this.fig = true;
          this.$router.push('/home');
          this.$router.go('/home');
          window.onbeforeunload ='';
          window.onunload = '';
        }
      },
      computed: {
        // 路线信息
        user_login() {
          if(this.$store.state.userlogin.user_login){
            this.fig = false;
            this.user_loginx = this.$store.state.userlogin.user_login;
            console.log(this.user_loginx);
          }
          if (!this.user_loginx)
          {
            var json=window.localStorage.data;
            if (!json)
            {
                return;
            }
            var jsonObj=JSON.parse(json);
            if (jsonObj.name)
            {
              this.user_loginx = jsonObj.name;
            }
            else
            {
              this.phone1 = jsonObj.uid;
              this.user_loginx = this.phone1.substr(0, 3) + '****' + this.phone1.substr(7);
            }
          }
          return this.$store.state.userlogin.user_login;
        }
      },
      mounted(){
          if (!localStorage.data)
          {
              return;
          }
        var jsonObj=JSON.parse(localStorage.data);
        if(jsonObj.id){
          this.fig = false;
          this.user_loginx = jsonObj.name;
        }else{
          this.fig = true;
        }
      }
    }
</script>
<style>
  .clear{
    cursor: pointer;
  }
  .top-sj{
    width: 100px;
    height: 0;
    /*border: 1px solid red;*/
    position: absolute;
    top: 52px;
    left: -43px;
    transition: all 1s;
    z-index: -100;
    opacity: 0;
  }
  .top-sj img{
    width: 100%;
    height: 100%;
  }
  .top-wx{
    width: 100px;
    height: 0;
    /*border: 1px solid red;*/
    position: absolute;
    top: 52px;
    left: -35px;
    transition: all 1s;
    z-index: -100;
    opacity: 0;
  }
  .top-wx img{
    width: 100%;
    height: 100%;
  }
  .code1:hover .top-sj{
    transition: all 1s;
    opacity: 1;
    height: 100px;

  }
  .code2:hover .top-wx{
    transition: all 1s;
    opacity: 1;
    height: 100px;

  }
  .black{
    color: black !important;
  }
  .router-link-active{
    color: #d00000 !important;
  }
  .reuse_top{
    border-bottom: 1px solid #d00000;
    position: fixed;
    top: 0;
    z-index: 500;
    width: 100%;
    height: 55px;
    background: #FFF;
  }
  .top-main{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
  .top-logo{
    float: left;
    width: 350px;
    margin-top: 15px;
  }
  .top-logo img{
    width: 100%;
    height: 100%;
  }
  .nav{
    float: right;
  }
  .nav ul{
    display: inline-block;
    line-height: 55px;
    /*font-size: 15px;*/
  }
  .nav ul li{
    list-style: none;
    display: inline-block;
    /*margin: 0 5px;*/
    margin-right:20px;
    font-size: 16px;
  }
  .nav>ul>li>a{
    text-decoration: none;
    color: black;
    font-size: 16px;
  }
  .nav>ul>li>a:focus {
      outline: none;
    }
  .nav>ul>li:hover{
    color: #d00000;
  }
  .nav>ul>li>a:hover{
    color: #d00000;
  }
  .user{
    display: inline-block;
    margin-right: 10px;
    font-size: 15px;
  }
  .user a{
    color: black;
    /*font-weight: bold;*/
    font-size: 15px;
    text-decoration: none;
  }
  .user a:hover{
    color:#d00000;
  }
  .top-code{
    width: 20px;
    display: inline-block;
    position: relative;
  }
  .code1{
    position: absolute;
    background: url("../assets/icon.png") no-repeat;
    width: 20px;
    height: 41px;
    top: -29px;
  }
  .code2{
    position: absolute;
    background: url("../assets/icon.png") no-repeat -25px 0;
    width: 30px;
    height: 41px;
    top: -29px;
    left: 30px;
  }
  .phone{
    display: inline-block;
    line-height: 55px;
    color: #d00000;
    font-weight: bold;
    font-size: 15px;
    position: relative;
  }
  .phone span{
    display: inline-block;
    background: url("../assets/phone.png") no-repeat;
    width: 24px;
    height: 24px;
    position: absolute;
    left: -30px;
    top: 15px;
  }
</style>
