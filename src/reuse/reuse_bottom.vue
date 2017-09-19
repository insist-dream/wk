<template>
  <div class="reuse_bottom">
      <div class="bottom-main">
          <div class="bottom-ul">
            <ul>
              <li>服务协议</li>
              <li><router-link to="/reuse_left/select_travel_agreement">旅游协议</router-link></li>
              <li><router-link to="/reuse_left/car_agreement">车辆服务协议</router-link></li>
              <li><router-link to="/reuse_left/user_agreement">用户服务协议</router-link></li>
            </ul>
            <ul>
              <li>帮助中心</li>
              <li><router-link to="/reuse_left/about_five">保险条款</router-link></li>
              <li><router-link to="/reuse_left/about_six">人工服务</router-link></li>
              <li><router-link to="/reuse_left/about_sever">常见问题</router-link></li>
            </ul>
            <ul>
              <li>关于我们</li>
              <li><router-link to="/about_jxdz">匠心打造</router-link></li>
              <li><router-link to="/reuse_left/about_two">媒体报道</router-link></li>
              <li><router-link to="/reuse_left/about_one">悟空故事</router-link></li>
              <li><router-link to="/reuse_left/about_three">联系我们</router-link></li>
              <li><router-link to="/reuse_left/about_four">加入我们</router-link></li>
            </ul>
          </div>
          <div class="code">
              <div>
                <p>订阅号</p>
                <img src="../assets/code/wxcode.jpg" alt=""/>
              </div>
              <div>
                <p>APP下载</p>
                <img src="../assets/code/appcode.png" alt=""/>
              </div>
          </div>
          <!--<div class="city">-->
              <!--<p>城市入口 :-->
                 <!--<span v-for="(letter,index) in letters" :key="letter" v-on:click="change"> {{ letter }}</span>-->
              <!--</p>-->
              <!--<p>-->
                <!--<span v-for="item in items">{{ item }}</span>-->
              <!--</p>-->
          <!--</div>-->
        <div class="footer">
          <p>脚印兄弟 ( 北京 ) 信息科技有限责任公司</p>
          <!--p>香格里拉市悟空出行科技有限公司</p-->
          <p>地址：北京市东城区东直门外大街39号院航空服务楼2#B517 电话：400-0515-507</p>
          <p>苏ICP备17014043号-2</p>

        </div>
      </div>
  </div>
</template>

<script>
  export default {
      name: 'reuse_bottom',
      data (){
          return {

      }
      },
      methods:{

      }
  }
</script>
<style>
  .reuse_bottom{
    /*margin-top: 30px;*/
    width: 100%;
    min-height: 350px;
    background: #4f4f4f;
  }
  .bottom-main{
    width: 1200px;
    margin: 0 auto;
  }
  .bottom-ul{
    padding-top: 30px;
    margin-left: 150px;
    float: left;
  }
  .bottom-ul a:hover{
    color: red;
  }
  .bottom-ul ul{
      list-style: none;
    display: inline-block;
    float: left;
    margin-left: 50px;
    color: #FFF;
    font-size: 12px;
  }
  .bottom-ul ul li{
    padding: 5px 0;
  }
  .bottom-ul ul li:nth-child(1){
    font-size: 15px;
    padding-bottom: 15px;
  }
  .bottom-ul li a{
    text-decoration: none;
    color: #FFF;
  }
  .code{
    float: right;
    margin-top: 40px;
    margin-right: 150px;
  }
  .code>div{
    width: 80px;
    float: left;
    margin-right: 100px;
    text-align: center;
    color: #FFF;
  }
  .code>div>img{
    width:80px;
    height: 80px;
  }
  .code>div>p{
    margin-bottom: 20px;
    font-size: 15px;
  }
  .city{
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #FFF;
    border-top: 1px solid #FFF;
    float: left;
    margin-top: 30px;
    color: #FFF;
    font-size: 15px;
  }
  .city p{
    margin: 15px 0;
  }
  .city>p:nth-child(1) span{
    display: inline-block;
    margin-right: 34px;
  }
  .city>p:nth-child(1) span:nth-child(26){
    margin-right: 0;
  }
  .city>p:nth-child(2){
    margin-left: 45px;
  }
  .city>p:nth-child(2) span{
    display: inline-block;
    margin-left: 25px;
  }
  .footer{
    width: 100%;
    float: left;
    margin-top: 20px;
    padding-top: 20px;
    text-align: center;
    font-size: 12px;
    border-top: 1px solid #b9b6bf;
  }
  .footer p{
    margin-top: 12px;
    color: #fff;
  }
</style>
