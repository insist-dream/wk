<template>
  <div class="homepage_recommend">
    <div class="h-r-main">
      <div class="sh-list">
        <h3>自助自驾</h3>
        <p>感悟生命本源，自在畅游旷野美景。</p>
        <router-link to="/self">更多></router-link>
        <ul class="sh-nav-list">
          <li v-for="(item, i) in products1">
            <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a">
              <span  style="display: none"  v-model="types">{{ item.product_id }}</span>
              <div class="vessel-img">
                <img :src="item.image_url" alt=""/>
                <span :class="zizhu_arr[i]" v-if="item.special_tags.title"><span class="test">{{ item.special_tags.title }}</span></span>
              </div>
              <div class="mess-border">
                <span class="name">{{item.product_name}}</span>
                <p class="message"><i class="qizi"></i><span>{{item.type_name}}</span><i class="weizhi"></i><span>{{item.city_name}}出发</span></p>
                <p class="money"><span>¥<span class="money2">{{ item.min_price }}</span></span>起</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="sh-list">
        <h3>车队自驾</h3>
        <p>因专业领队，你只需专注自然之美。</p>
        <router-link to="/motorcade">更多></router-link>
        <ul class="sh-nav-list">
          <li v-for="(item, i) in products2">
            <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a">
              <span  style="display: none"  v-model="types">{{ item.product_id }}</span>
              <div class="vessel-img">
                  <img :src="item.image_url" alt=""/>
                  <span :class="chedui_arr[i]" v-if="item.special_tags.title"><span class="test">{{ item.special_tags.title }}</span></span>
              </div>
              <div class="mess-border">
                <span class="name">{{item.product_name}}</span>
                <p class="message"><i class="qizi"></i><span>{{item.type_name}}</span><i class="weizhi"></i><span>{{item.city_name}}出发</span></p>
                <p class="money"><span>¥<span class="money2">{{ item.min_price }}</span></span>起</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="sh-list">
        <h3>奢华自驾</h3>
        <p>品味极致路线，肆意体验非凡旅程。</p>
        <router-link to="/classify">更多></router-link>

        <ul class="sh-nav-list">
          <li v-for="(item, index) in products">
            <!--获取当前ID-->
            <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a">
              <span style="display: none" v-model="types">{{ item.product_id }}</span>
              <div class="vessel-img">
                <img :src="item.image_url" alt=""/>
                <span :class="shehua_arr[index]" ><span class="test">{{ item.special_tags.title }}</span></span>
              </div>
              <div class="mess-border">
                <span class="name">{{item.product_name}}</span>
                <p class="message"><i class="qizi"></i><span>{{item.type_name}}</span><i class="weizhi"></i><span>{{item.city_name}}出发</span></p>
                <p class="money"><span>¥<span class="money2">{{ item.min_price }}</span></span>起</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="sh-list">
        <h3>悟空匠心打造</h3>
        <div class="jxdz">
          <ul>
            <li class="jxdz-left">
              <router-link to="/about_jxdz">
                <img src="../assets/jxdz01.png" alt="">
              </router-link>
            </li>
            <li class="jxdz-center">
              <router-link to="/about_jxdz">
                <img src="../assets/jxdz02.png" alt="">
              </router-link>
            </li>
            <li  class="jxdz-right">
              <router-link to="/about_jxdz">
                <img src="../assets/jxdz03.png" alt="">
              </router-link>
            </li>
            <li class="jxdz-left">
              <router-link to="/about_jxdz">
                <img src="../assets/jxdz04.png" alt="">
              </router-link>
            </li>
            <li class="jxdz-center">
              <router-link to="/about_jxdz">
                <img src="../assets/jxdz05.png" alt="">
              </router-link>
            </li>
            <li  class="jxdz-right">
              <router-link to="/about_jxdz">
                <img src="../assets/jxdz06.png" alt="">
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 悟空小美begin -->
    <div class="wkxm">
      <!-- top begin -->
      <div class="top">
        <a href="javascript:void(0)" class="customService">
          <img src="../assets/wkxm1.png" alt="">
        </a>
      </div>
      <!-- top end -->

      <!-- bottom begin -->
      <div class="bottom">

        <!-- 客户端容器begin -->
        <div class="wkxm-client">
          <a href="javascript:void(0);">
            <img src="../assets/wkxm2.png" alt="">
          </a>
          <div class="appc">
            <img src="../assets/appc.png" alt="">
          </div>
        </div>
        <!-- 客户端容器end -->

        <!-- 微信容器begin -->
        <div class="wkxm-wx">
          <a href="javascript:void(0)">
            <img src="../assets/wkxm3.png" alt="">
          </a>
          <div class="wxc">
            <img src="../assets/wxc.jpg" alt="">
          </div>
        </div>
        <!-- 微信容器end -->
      </div>
      <!-- bottom end -->

    </div>
    <!-- 悟空小美end -->
  </div>
</template>

<script>
  import listProduct from '@/components/List-product'
  import { homeList,get_detail} from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'
  export default {
    name: 'homepage_recommend',
    data () {
      return {
        products:[],
        products1:[],
        products2:[],
        // 奢华自驾，自助自驾，车队自驾
        types:'',
        app:'123',
        special_tags:{},
        shehua_arr: [],
        chedui_arr: [],
        zizhu_arr: []
      }
    },
    mounted () {
      this.get_list()
      this.get_list1()
      this.get_list2()
//      console.log('--1 mounted---');
//      if(this.loadtimes > 0)
      this.reloadAbleJSFn('zhichiload', 'http://www.sobot.com/chat/pc/pc.min.js?sysNum=396941c1414e4cdba5aea0c0f9c58261');
    },
    created(){
 //     console.log('--1 created---');
    },
    destroyed(){
        var zhichiloadObj = document.getElementById('zhichiload');
        if(zhichiloadObj)
          zhichiloadObj.parentNode.removeChild(zhichiloadObj);
//        console.log('zhichiloadObj 2=', document.getElementById('zhichiload'));

        var zhichiIframeBoxObj = document.getElementById('zhichiIframeBox');
//        console.log('zhichiIframeBoxObj 1=',zhichiIframeBoxObj);
//        console.log('zhichiIframeBoxObj 1.5 parent=', zhichiIframeBoxObj.parentNode);
        if(zhichiIframeBoxObj)
          zhichiIframeBoxObj.parentNode.removeChild(zhichiIframeBoxObj);

//        console.log('zhichiIframeBoxObj 2=', document.getElementById('zhichiIframeBox'));

    },
    computed: {
      details() {
        return this.$store.state.nget_details;
      }
    },
    methods:{
      // 小美客服显示控制
      reloadAbleJSFn(id,newJS)
      {
        var oldjs = null;
        var t = null;
        var oldjs = document.getElementById(id);
        console.log('id=', id);
        console.log('oldjs=', oldjs);
        if(oldjs)
          oldjs.parentNode.removeChild(oldjs);
        var scriptObj = document.createElement("script");
        scriptObj.src = newJS;
//        scriptObj.type = "text/javascript";
        scriptObj.id   = id;
        scriptObj.setAttribute('class', 'customService');
        console.log('scriptObj=', scriptObj);
        document.getElementsByTagName("head")[0].appendChild(scriptObj);

//        document.body.appendChild(scriptObj);

      },

      // 浏览器类型判断
      myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
        if (isIE) {
          var IE5 = IE55 = IE6 = IE7 = IE8 = false;
          var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
          reIE.test(userAgent);
          var fIEVersion = parseFloat(RegExp["$1"]);
          IE55 = fIEVersion == 5.5;
          IE6 = fIEVersion == 6.0;
          IE7 = fIEVersion == 7.0;
          IE8 = fIEVersion == 8.0;
          if (IE55) {
            return "IE55";
          }
          if (IE6) {
            return "IE6";
          }
          if (IE7) {
            return "IE7";
          }
          if (IE8) {
            return "IE8";
          }
        }//isIE end
        if (isFF) {
          return "FF";
        }
        if (isOpera) {
          return "Opera";
        }
      },//myBrowser() end
      //以下是调用上面的函数
      showxm() {
        this.wkxm = true
      },
      get_list:function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let params ={
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params={\"channel_code\":\"LUXURY\",\"page\":1,\"page_size\":4,\"image_size\":\"L\"}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params:{
            channel_code: "LUXURY",
            page: 1,
            page_size: 4,
            image_size:"L"
          }
        }
        homeList(params).then((res) => {
          this.products = res.data.products
        console.log(res.data)
        let tag = ''
        for(let i = 0; i < this.products.length; i++){//class="tags"
          this.shehua_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
          if(!this.products[i].special_tags) {
            this.products[i].special_tags = {}
            this.products[i].special_tags.title = ''
            this.products[i].special_tags.color = ''
          }
          tag = this.getclassbycolor(this.products[i].special_tags.color,this.products[i].special_tags.title)
          if(tag){
            this.shehua_arr[i][tag] = true
          }
        }
        })
      },
      getclassbycolor:function(c,t){
        let tag = ''
        if(c == ''){
          return tag;
        }
        if(c == 'f06257') tag = 'tags_1'
        else if(c == 'ee8c4a') tag = 'tags_2'
        else if(c == 'dfcd32' && t == "黄-妙得禅文") tag = 'tags_3'
        else if(c == '9ed243') tag = 'tags_4'
        else if(c == '5ac5c0') tag = 'tags_5'
        else if(c == '619bdc') tag = 'tags_6'
        else if(c == '8e77e1') tag = 'tags_7'
        else tag = 'tags_8'
        return tag
      },
      // 自助自驾
      get_list1:function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let params ={
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params={\"channel_code\":\"SELFHELP\",\"page\":1,\"page_size\":4,\"image_size\":\"L\"}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params:{
            channel_code: "SELFHELP",
            page: 1,
            page_size: 4,
            image_size:"L"
          }
        };
        homeList(params).then((res) => {
          this.products1 = res.data.products
          console.log(res.data)
        let tag = ''
        for(let i = 0; i < this.products1.length; i++){//class="tags"
          this.zizhu_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
          if(!this.products1[i].special_tags) {
            this.products1[i].special_tags = {}
            this.products1[i].special_tags.title = ''
            this.products1[i].special_tags.color = ''
          }
          tag = this.getclassbycolor(this.products1[i].special_tags.color,this.products1[i].special_tags.title)
          if(tag){
            this.zizhu_arr[i][tag] = true
          }
        }
      })
      },
      // 获取车队自驾列表
      get_list2:function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let params = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params={\"channel_code\":\"MOTORCADE\",\"page\":1,\"page_size\":4,\"image_size\":\"L\"}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params:{
            channel_code: "MOTORCADE",
            page: 1,
            page_size: 4,
            image_size:"L"
          }
        }
        homeList(params).then((res) => {
          this.products2 = res.data.products
        let tag = ''
        for(let i = 0; i < this.products2.length; i++){//class="tags"
          this.chedui_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
          if(!this.products2[i].special_tags) {
            this.products2[i].special_tags = {}
            this.products2[i].special_tags.title = ''
            this.products2[i].special_tags.color = ''
          }
          tag = this.getclassbycolor(this.products2[i].special_tags.color,this.products2[i].special_tags.title)
          if(tag){
            this.chedui_arr[i][tag] = true
          }
        }
      })
    },
  },
    components:{listProduct},
    }
</script>
<style>
  .test{
    margin-right: 38px;
  }
  .tags_1{
    background: url("../assets/home_tags/tags-1.png") no-repeat;
    background-position: 47px;
    width: 153px;
    height: 31px;
  }
  .tags_2{
    background: url("../assets/home_tags/tags-2.png") no-repeat;
    background-position: 47px;
    width: 153px;
    height: 31px;
  }
  .tags_3{
    background: url("../assets/home_tags/tags-3.png") no-repeat;
    background-position: 47px;
    width: 153px;
    height: 31px;
  }
  .tags_4{
    background: url("../assets/home_tags/tags-4.png") no-repeat;
    background-position: 47px;
    width: 153px;
    height: 31px;
  }
  .tags_5{
    background: url("../assets/home_tags/tags-5.png") no-repeat;
    background-position: 47px;
    width: 153px;
    height: 31px;
  }
  .tags_6{
    background: url("../assets/home_tags/tags-6.png") no-repeat;
    background-position: 47px;
    width: 153px;
    height: 31px;
  }
  .tags_7{
    background: url("../assets/home_tags/tags-7.png") no-repeat;
    background-position: 47px;
    width: 153px;
    height: 31px;
  }
  .tags_8{
    background: url("../assets/home_tags/tags-8.png") no-repeat;
    width: 200px;
    height: 30px;
  }
  .h-r-main {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  .vessel-img{
    position: relative;
  }
  .tags{
    position: absolute;
    top: -1px;
    right: -23px;
    color: #FFF;
    width: 200px;
    height: 30px;
    text-align: right;
    line-height: 30px;
    font-size: 15px;
  }
  .sh-list{
    margin-top: 50px;
  }
  .sh-list > h3 {
    display: inline-block;
    border-bottom: 2px solid #d00000;
    margin: 20px 0 20px 0;
    font-size: 22px;
    padding-bottom: 5px;
    font-weight: bold;
  }

  .sh-list > p {
    display: inline-block;
    margin-left: 15px;
    font-size: 15px;
    color: #787878;
  }

  .sh-list > a {
    display: inline-block;
    text-decoration: none;
    color: #d00000;
    float: right;
    margin-top: 30px;
  }


  /*------------*/
  p{
    padding: 0;
    margin: 0;
  }
  .sh-nav-list {
    list-style: none;
  }

  .sh-nav-list li {
    width: 287px;
    display: inline-block;
    margin-right: 17px;
    transition: all 0.5s;
  }
  .sh-nav-list li:hover{
    transition: all 0.5s;
    box-shadow:0px 0px 15px rgba(53, 0, 0, 0.30);
  }
  .sh-nav-list li:hover .vessel-img img{
    transition: all 0.5s;
    transform:translateZ(0) scale(1.2);
  }
  .sh-nav-list > li:nth-child(4) {
    margin-right: 0;
  }

  .sh-nav-list li a {
    text-decoration: none;
    color: black;
  }
  .sh-nav-list li .vessel-img{
    overflow: hidden;
    width: 100%;
    height: 200px;
  }
  .sh-nav-list li img {
    width: 100%;
    height:100%;
    transition: all 0.5s;
    transform:translateZ(0) scale(1);
  }

  .sh-nav-list li .name {
    display: inline-block;
    width: 100%;
    height: 41px;
    padding:0 7px;
    font-size: 15px;
    font-weight: bold;
    margin-top: 15px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: all 0.5s;
  }
  .sh-nav-list li:hover .name{
    transition: all 0.5s;
    color: #d00000;
  }
  .sh-nav-list li .message{
    position: relative;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .qizi{
    background: url("../assets/qizi.png") no-repeat;
    width: 10px;
    height: 14px;
    display: inline-block;
    position: absolute;
    left: 9px;
    top: 4px;
  }
  .weizhi{
    background: url("../assets/weizhi.png") no-repeat;
    width: 10px;
    height: 14px;
    position: absolute;
    display: inline-block;
    left: 82px;
    top: 4px;
  }
  .sh-nav-list li .message span {
    font-size: 12px;
    display: inline-block;
    margin-left: 25px;
    color: #9f9f9f;
  }

  .sh-nav-list li .money {
    padding:0 5px 10px 5px;
    /*font-weight: bold;*/
    color: #848484;
    font-size: 13px;
  }
  .money2{
    font-size: 25px!important;
  }
  .sh-nav-list li .money span {
    color: #d00000;
    font-size: 18px;
  }

  .mess-border {
    border: 1px solid #e8e5ec;
    margin: 0;
    padding: 0;
    /*margin-top: -5px;*/
  }
  /*悟空小美*/
  .wkxm{
    position: fixed;
    right: 0;
    bottom: 200px;
    width: 42px;
    height: 248px;
    background-color: gray;
  }
  /*上部分客户服务*/
  .wkxm .top{
    position: relative;
    width: 42px;
    height: 125px;
  }
  /*客户端容器*/
  .wkxm-client{
    width: 42px;
    height: 58px;
    position: relative;
    border-bottom: 1px solid #fad699;
  }
  /*客户端二维码显示位置*/
  .wkxm-client:hover .appc{
    left: -130px;
  }

  /*客户端二维码容器*/
  .appc{
    cursor: pointer;
    width: 130px;
    height: 130px;
    position: absolute;
    z-index: -10;
    top: -10px;
    left: 0px;
    background-color: pink;
    transition: left .5s; /*增*/

  }
  /*客户端二维码容器图片*/
  .appc img,.wxc img{
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  /*微信容器*/
  .wkxm-wx{
    /*margin-top: 1px;*/
    position: relative;
    width: 42px;
    height: 64px;

  }
  /*微信二维码显示位置*/
  .wkxm-wx:hover .wxc{
    left: -130px;
    /*top: -58px;*/
  }
  /*微信二维码容器*/
  .wxc{
    width: 130px;
    height: 130px;
    position: absolute;
    top: -66px;
    left: 0;
    z-index: -11;
    transition: left .5s; /*增*/
  }
  /*悟空匠心打造*/
  .jxdz{
    width: 100%;
    height: 354px;
    /*background-color: pink;*/
  }
  .jxdz ul{
    float: left;
    list-style: none;
  }
  .jxdz ul li{
    float: left;
    width: 400px;
    height: 177px;
    line-height: 177px;
    /*background-color: yellow;*/
  }
  /*文本左中右对齐*/
  .jxdz-left{
    text-align: left;
  }
  .jxdz-center{
    text-align: center;
  }
  .jxdz-right{
    text-align: right;
  }
</style>
