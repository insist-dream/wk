<template>
    <div class="change-grogshop">
        <div class="slider">
            <div class="left-silder">
              <!--<img width="100%" height="100%" src="../assets/sliders.png" alt="">-->
              <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="2000">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                  <!--li data-target="#carousel-example-generic" data-slide-to="0" class="active">
                    <img :src="hotel_detail.images[0].small_image_url" alt=""/>
                  </li-->
                  <li v-for="(imageitem,i) in hotel_detail.images" v-if="i == 0" data-target="#carousel-example-generic"  :data-slide-to="i" class="active">
                		<img :src="imageitem.large_image_url" alt=""/>
              		</li>

              		<li v-for="(imageitem,i) in hotel_detail.images" v-if="i != 0" data-target="#carousel-example-generic"  :data-slide-to="i">
                		<img :src="imageitem.large_image_url" alt=""/>
              		</li>
                 </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                  <!--div class="item active">
                    <img :src="hotel_detail.images[0].small_image_url" alt=""/>
                  </div-->
                  <div class="item active" v-for="(imageitem,i) in hotel_detail.images" v-if="i == 0">
                		<img :src="imageitem.large_image_url" alt=""/>
              		</div>
              		<div class="item" v-for="(imageitem,i) in hotel_detail.images" v-if="i != 0">
                		<img :src="imageitem.large_image_url" alt=""/>
              		</div>
                </div>

                <!-- Controls
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
                -->
              </div>
            </div>





          <!--详情左侧轮播end-->
        </div>
        <div class="right-message" style="margin-left: 200px">
            <h3>{{hotel_detail.hotel_name}}<span></span></h3>
            <!--<p class="start"><span></span><span></span><span></span><span></span><span></span></p>-->
            <p class="hotel-rate start">
              <el-rate
                v-model="hotel_detail.level"
                :max="hotel_detail.level"
                disabled
                show-text
                :colors="['#dc1111', '#dc1111', '#dc1111']"
                text-color="#dc1111"
                text-template>
              </el-rate>
            </p>
            <p class="p-two">
                <span class="dizhi">地<span class="nbsp"></span>址：</span>
                <span class="text">{{hotel_detail.address}}</span>
            </p>
            <p class="p-three">
                <span class="dizhi">入住日期：</span>
                <span class="text">{{start_date}}</span>
            </p>
            <p class="p-four">
                <span class="dizhi">离开日期：</span>
                <span class="text">{{end_date}}</span>
            </p>
            <p class="red">
                <span class="dizhi">入住天数：</span>
                <span class="text">共住{{get_day_num}}晚</span>
            </p>
            <p style="width: 455px;position:relative;" class="grogshop-icon" :class="{icon_height:more}">
              <span v-if="icon_length > 6"><span v-if="more" @click="changeheight()" style="cursor:pointer;display:inline-block;position:absolute;top:15px;right:5px;color:#666666;font-size:14px;">展开></span>
              <span v-else @click="changeheight()" style="cursor:pointer;display:inline-block;position:absolute;top:15px;right:5px;color:#666666;font-size:14px;">收起></span></span>
              <img v-for="(myicon, i) in icon" :src="myicon" />
            </p>
        </div>
      <p class="message-title">
        <span>房型</span>
        <span style="width: 240px;">床型</span>
        <span>早餐</span>
        <span>面积</span>
        <span>房间数</span>
        <span>日均价</span>
      </p>
      <p style="position:relative;" class="message-one" v-for="(item,i) in hotel_products">
        <span>{{item.product_name}}</span>
        <span style="width: 240px;">{{item.bed_description}}</span>
        <span>{{item.breakfast_num}}份</span>
        <span>{{item.size}}平米</span>
        <span style="position:relative;top:6px;line-height:25px;"><counter fmin="0" :fmax="item.inventory" :fdef="get_default_room_num[i]" ftype="hotel" forder="1" :fitem="i" @changenum="getnum"></counter></span>
        <!-- <span style="position:relative;top:6px;line-height:25px;" v-if="i == 0" v-if="i != 0"><counter fmin="0" :fmax="item.inventory" fdef="0" ftype="hotel" forder="1" :fitem="i" @changenum="getnum"></counter></span> -->
        <span class="red"><span style="display: inline;font-size:12px;">￥</span><span style="display: inline;font-size:18px;">{{item.price}}</span><span style="display: inline;color:#666666;font-size:12px;">间</span></span>
        <span v-if="roomtypenum" style="width: 110px;float:right;"><div style="margin-right: 100px;margin-top: 15px;" class="btn" @click="changehotelnum">确认更换</div></span>
      </p>
      <p v-if="!roomtypenum" class="btn-p"><div v-if="!roomtypenum" class="btn" @click="changehotelnum">确认更换</div></p>
      <ul class="nav">
          <li style="margin-top: 0px;" class="red"><a style="padding: 0px;" class="li_font_color_gray" :class="{li_font_color_red:changeclass('酒店介绍')}" @click="to('酒店介绍',1)">酒店介绍</a><i :class="{bottom_red:changeclass('酒店介绍')}"></i></li>
          <li><a style="padding: 0px;margin-top: 0px;" class="li_font_color_gray" :class="{li_font_color_red:changeclass('酒店地址')}" @click="to('酒店地址',2)">酒店地址</a><i :class="{bottom_red:changeclass('酒店地址')}"></i></li>
          <li><a style="padding: 0px;margin-top: 0px;" class="li_font_color_gray" :class="{li_font_color_red:changeclass('预订须知')}" @click="to('预订须知',3)">预订须知</a><i :class="{bottom_red:changeclass('预订须知')}"></i></li>
      </ul>
      <div id="1" class="grogshop" style="position: relative;">
          <h4 class="gs-title"><span class="js-icon"></span>酒店介绍</h4>
          <p>{{hotel_detail.summary}}</p>
      </div>
      <div id="2" class="grogshop" style="position: relative;">
          <h4 class="gs-title"><span class="dz-icon"></span>酒店地址</h4>
          <p>{{hotel_detail.address}}</p>
        <!-- 百度地图begin -->
          <div class="baidu-map" v-if="showmap">
            <!--<baidu-map class="map" :zoom="12" :center="{lng: this.lng, lat: this.lat}">-->
            <baidu-map class="map" :zoom="16" :center="getpostion">
              <!-- 地图begin -->
              <bm-marker :position="getpostion" :zoom="22" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://www.wktrip.com/assets/wk_map_flag.png', size: {width: 36, height: 92}}">
              <bm-info-window :position="getpostion" title="" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen" :scroll-wheel-zoom="true">
                <p style="text-align: center">{{ hotel_detail.hotel_name }}</p>
              </bm-info-window>
              </bm-marker>
              <!-- 地图end -->
              <!-- 缩放 -->
              <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
              <!-- 定位 -->
              <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            </baidu-map>
          </div>
        <!-- 百度地图end -->
      </div>
      <div id="3" class="grogshop" style="position: relative;margin-bottom: 50px">
          <h4 class="gs-title"><span class="yd-icon"></span>预订须知</h4>
          <p>{{hotel_detail.book_notice}}</p>
      </div>
      <!--<p>{{ hotel_detail.longitude }}</p>-->
      <!--<p>{{ hotel_detail.latitude }}</p>-->
      </div>
    </div>
</template>

<script>
  import { onlyid,times,getNewDay } from '../comment/public'
  import { get_hotel_list,get_hotel_detail,test } from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import counter from '@/components/counter'
  import HOTEL_WIFI from '../assets/HOTEL_WIFI.png'
  import HOTEL_PARK from '../assets/HOTEL_PARK.png'
  import HOTEL_AIRPORT from '../assets/HOTEL_AIRPORT.png'
  import HOTEL_BROADBAND from '../assets/HOTEL_BROADBAND.png'
  import HOTEL_BUSINESS_CENTER from '../assets/HOTEL_BUSINESS_CENTER.png'
  import HOTEL_CONFERENCE from '../assets/HOTEL_CONFERENCE.png'
  import HOTEL_GYM from '../assets/HOTEL_GYM.png'
  import HOTEL_RESTAURANT from '../assets/HOTEL_RESTAURANT.png'
  import HOTEL_SWIMMING_POOL from '../assets/HOTEL_SWIMMING_POOL.png'
  // import HOTEL_PARK from '../assets/HOTEL_PARK.png'

  export default {
    name: 'changeGrogshop',
    data () {
      return {
        pid: 10000050, //产品id
        hid: 10000031, //酒店id
        step: 2,//第几个酒店
        start_date: "2017-06-22",//入住时间
        idx: 0,// 酒店下标
        adult: 1,
        child: 2,
        day_num: 0,
        end_date: "",
        hotel_detail: [],
        hotel_products: [],

        hotel_nums: [],
        res: {},
        icon: [],
        li_a_color: 'red',
        name: '酒店介绍',
        infoWindow: {
          show: true,
          contents: '丽江古城'
        },
        lat: '',   // 纬度
        lng: '',   // 经度
        more: true,
        icon_length: 0,
        prev_num: 0,
        showmap: false,   // 地图显示控制
        roomtypenum:false
      }
    },
    created () {
      // 组件创建完后获取数据，
      this.hid = this.$route.params.hid
      this.pid = this.$route.params.pid
      this.idx = this.$route.params.idx
      this.step = this.$route.params.step
      this.adult = this.$route.params.adult
      this.child = this.$route.params.child
      this.start_date = this.$route.params.start_date
      this.gethoteldetail()
    },
    //added by jxz, 2017-06-24
    updated(){
    	 this.initiate_coursoul();
    	 if(this.lat !== ''){
//        this.lat = this.hotel_detail.latitude
//        this.lng = this.hotel_detail.longitude
        this.showmap = true
       }
      // console.log(this.lat)
      // console.log('数据变化啦');
      //  console.log(this.lng)
    },
    //ended add
    computed: {
      // 经纬度计算
      getpostion() {
        if(this.lat !== '' && this.lng !== ''){
            let pos = {lat:this.lat,lng:this.lng}
          return pos
        }
      },
      get_day_num(){
        this.day_num = this.$store.state.nget_details.trip_hotels[this.idx].day_num
        this.end_date = getNewDay(this.start_date, this.day_num)
        return this.day_num
      },
      get_default_room_num(){
        return this.hotel_nums
      }
    },
    components: {
      counter
    },
    methods:{
      changeheight(){
        if(this.more){
          this.more = false
        }else{
          this.more = true
        }
      },
      infoWindowClose (e) {
        this.infoWindow.show = false
      },
      infoWindowOpen (e) {
        this.infoWindow.show = true
      },
      clear () {
        this.infoWindow.contents = ''
      },
      to:function(name,i){
        this.name = name
        javascript:document.getElementById(i).scrollIntoView()
      },
      changeclass:function(e){
          if(e==this.name){
            return true
          }else{
            return false
          }
      },
      initiate_coursoul:function(){
      		//added by jxz, 2017-06-25
      	  console.log('carousel-example-generic', $("#carousel-example-generic"))
          $("#carousel-example-generic").carousel();
          //ended add

      },
      changehotelnum: function(){//点击更换酒店按钮，更新数量
        let tmp_list = []
        let j = 0
        for(let i = 0; i < this.hotel_products.length; i++){
          if(this.hotel_nums[i] == 0){
            continue
          }else{
            this.$set(this.hotel_products[i], 'num', this.hotel_nums[i])
            tmp_list[j] = this.hotel_products[i]
            j++
          }
        }
        if(j > 0){
          this.$set(this.res, 'hotel_products', tmp_list);// this.hotel_products
          this.$set(this.res, 'hotel_id', this.hid);
          this.$set(this.res, 'hotel_name', this.hotel_detail.hotel_name);
          this.$store.commit('changehotelnum', {'idx':this.idx,'content':this.res})
        }
        //回到确认夜页
        this.$router.push({name:'confirm_itinerary',params:{id:this.pid,adult:this.adult,child:this.child,start_date:this.start_date,flag:0}})

      },
      gethoteldetail: function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let param = "{\"hotel_id\":"+this.hid+",\"product_id\":"+this.pid+",\"step\":"+this.step+",\"start_date\":\""+this.start_date+"\"}"
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+param+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: param
        }
        get_hotel_detail(para).then((res) => {
          console.log(res.data)
          if(res.data.code != 0){
            alert(res.data.msg)
          }else{
            let num = 0
            let products = this.$store.state.nget_details.trip_hotels[this.idx].hotels[0].hotel_products
            for(let i = 0; i < products.length; i++){
              num += parseInt(products[i].num)
            }
            this.prev_num = num
            console.log('total_num====',this.prev_num)
            this.$store.state.hotel_total_num = num // 确保至少有一间

            if(res.data.tags.length > 6){// icon 更多
              this.more = true
            }else{
              this.more = false
            }
            // console.log(res.data.code)
            this.hotel_detail = res.data
            this.hotel_products = res.data.hotel_products
            if(this.hotel_products.length == 1){
              this.roomtypenum = true
            }
            // 百度地图定位
            this.lat = this.hotel_detail.latitude
            this.lng = this.hotel_detail.longitude

//            if(this.hotel_detail.hotel_id != this.hid){
            console.log(this.hotel_detail.hotel_id+'   '+this.hid)
            if(this.hotel_detail.hotel_id != this.$store.state.nget_details.trip_hotels[this.idx].hotels[0].hotel_id){
              for(let i = 0; i < res.data.hotel_products.length; i++){
                if(i == 0){
                  this.hotel_nums[i] = this.prev_num
                  continue
                }
                this.hotel_nums[i] = 0
              }
            }else{
              let prod = this.hotel_detail.hotel_products
              for(let i = 0; i < prod.length; i++){
                this.hotel_nums[i] = 0
                for(let j = 0; j < products.length; j++){
                  if(prod[i].product_id == products[j].product_id){
                    if(products[j].num > 0){
                      this.hotel_nums[i] = products[j].num
                      break;
                    }
                  }
                }
              }
            }

            // console.log(this.hotel_detail.tags)
            this.icon_length = this.hotel_detail.tags.length
            for(let i = 0; i < this.hotel_detail.tags.length; i++){
              this.icon[i] = this.geticon(this.hotel_detail.tags[i])
            }
            this.hotel_detail.level = this.checkrate(this.hotel_detail.level_name)
            console.log(this.hotel_detail)
          }
        })
      },
      getnum: function(type, order, item, num){
        this.hotel_nums[item] = num
      },
      checkrate: function(level){
        let l = 5;
        if(level == '一星级') l = 1; else
        if(level == '二星级') l = 2; else
        if(level == '三星级') l = 3; else
        if(level == '四星级') l = 4; else
        if(level == '五星级') l = 5;
        return l;
      },
      geticon(icon){
        // return HOTEL_WIFI
        let l = ''
        if(icon == 'HOTEL_WIFI') l = HOTEL_WIFI; else
        if(icon == 'HOTEL_PARK') l = HOTEL_PARK; else
        if(icon == 'HOTEL_AIRPORT') l = HOTEL_AIRPORT; else
        if(icon == 'HOTEL_BROADBAND') l = HOTEL_BROADBAND; else
        if(icon == 'HOTEL_BUSINESS_CENTER') l = HOTEL_BUSINESS_CENTER; else
        if(icon == 'HOTEL_CONFERENCE') l = HOTEL_CONFERENCE; else
        if(icon == 'HOTEL_GYM') l = HOTEL_GYM; else
        if(icon == 'HOTEL_RESTAURANT') l = HOTEL_RESTAURANT; else
        if(icon == 'HOTEL_SWIMMING_POOL') l = HOTEL_SWIMMING_POOL; else {}
        // if(icon == 'HOTEL_PARK') l = HOTEL_PARK;
        return l
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .change-grogshop{
      width: 1200px;
      margin: 0 auto;
      margin-top: 90px;
  }
  .slider{
      width:500px;
      min-height: 300px;
      border: 1px solid red;
  }
  .right-message{
      width: 630px;
      height: 400px;
      float: right;
      margin-top: -395px;
      padding:0 20px;
  }
  .right-message p{
    width: 100%;
    overflow: hidden;
  }
  .right-message h3{
    font-size: 24px;
  }
  .right-message h3 span{
    font-size: 15px;
    font-weight: 100;
    color: #a69fa4;
  }
  .start{
    padding:20px 0 0 0;
  }
  .start span{
    display: inline-block;
    background: url("../assets/xing.png") no-repeat;
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  .p-two{
    width: 100%;
    margin-top: 20px;
    /*height: 40px;*/
  }
  .dizhi{
    display: inline-block;
    width: 80px;
    /*height: 35px;*/
    float: left;
    color: #666666;
  }
  .text{
    display: inline-block;
    font-size:18px;
    width:500px;
    /*height: 35px;*/
    float: left;
  }
  .nbsp{
    display: inline-block;
    width: 32px;
  }
  .p-three,.p-four,.red{
    margin-top: 20px;
  }
  .red{
    color: #df0900;
  }
  .grogshop-icon{
    /* height: 70px;
    width: 100%; */
    /* border: 1px solid red; */
    width: 455px;
    margin-top: 20px;
  }
  .grogshop-icon img{
    margin-right:15px;
  }
  .message-title{
    /*width: 100%;*/
    height: 40px;
    background: rgba(214, 210, 214, 0.31);
    margin-top: 195px;
    margin-right: 44px;
    line-height: 40px;
  }
  .message-title span{
    display: inline-block;
    width: 150px;
    text-align: center;
    color: #666666;
    font-size: 14px;
  }
  .message-one{
    width: 100%;
    height: 45px;
    /*line-height: 40px;*/
    overflow: hidden;
  }
  .message-one span{
    display: inline-block;
    width: 150px;
    text-align: center;
    font-size: 14px;
    height: 45px;
  }
  .message-two{
    width: 100%;
    height: 70px;
  }
  .message-two span{
    display: inline-block;
    width: 150px;
    height: 50px;
    /*background: red;*/
    float: left;
    margin-right: 5px;
    text-align: center;
  }
  .lin{
    line-height: 70px;
  }
  .btn-p{
    width: 100%;
    height: 50px;
  }
  .btn{
    width: 100px;
    height: 30px;
    background: #df0900;
    color: #FFF;
    float: right;
    margin-right: 208px;
    margin-top: -40px;
    line-height: 30px;
    text-align: center;
  }
  .nav{
    list-style: none;
    /*width: 100%;*/
    width: 1156px;
    height: 30px;
    border-bottom: 2px solid #929292;
    margin-top: 50px;
    margin-right: 44px;
  }
  .nav li{
    display: inline-block;
    position: relative;
    margin-right: 40px;
    font-size: 20px;
  }
  .nav li i{
    display: block;
    width: 100%;
    height: 2px;
  }
  .bottom_red{
    background: red;
  }
  .grogshop{
    width: 1114px;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0);
    margin: 0 auto;
    margin-top: 80px;
    font-size: 15px;
    color: #828084;
    padding-left: 40px;
    background: url('');
    margin-left: 40px;
  }

  .grogshop h4{
    margin-top: 60px;
  }
  .grogshop p{
    width: 100%;
    padding:20px 0 0 0;
  }
  .grogshop h5{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    color: black;
    font-weight: bold;
  }
  .grogshop span{
    display: block;
    margin: 5px 0;
  }
  .gs-title{
    width: 100%;
    position: relative;
    color: #db1111;
    font-weight: bold;
    margin-top: 50px;
  }
  .js-icon{
    background: url("../assets/jdjs.png") no-repeat;
    width: 38px;
    height: 38px;
    position: absolute;
    display: inline-block;
    left: -45px;
    top: -15px;
  }
  .dz-icon{
    background: url("../assets/jdwz.png") no-repeat;
    width: 38px;
    height: 38px;
    position: absolute;
    display: inline-block;
    left: -45px;
    top: -15px;
  }
  .yd-icon{
    background: url("../assets/jdxz.png") no-repeat;
    width: 38px;
    height: 38px;
    position: absolute;
    display: inline-block;
    left: -45px;
    top: -15px;
  }

  /*左侧轮播图*/
  .left-silder{
    float: left;
    width: 565px;
    height: 100%;
    margin-left: -1px;
    margin-top: -1px;
    /*background-color: red;*/
  }
  .el-input-number input{
    width: 36px;
  }
  /*elelunbo组件*/
  .carousel-inner .item img{
    /*width: 100%;
    height: 100%;*/
    width: 565px;
    height: 395.5px;
  }
  .carousel-indicators{
    bottom: -85px;
    left: -2px;
    width: 100%;
  }
  .carousel-indicators li{
    width: 104px;
    height: 74px;
    /*width: 100px;*/
    /*height: 69px;*/
    border: 1px solid #FFF;
    border-radius: 0;
    margin-right:6px;
    text-indent: 0px;
  }
  .carousel-indicators li img{
    width: 100px;
    /*width: 100%;*/
    /*margin-left: 999px;*/
    /*height: 100%;*/
    height: 70px;
  }
  .carousel-indicators .active{
    border: 2px solid red;
  }
  .li_font_color_gray{
    color:#333333;
  }
  .li_font_color_red{
    color:red;
  }
  .baidu-map{
    width: 994px;
    height: 661px;
    /*background-color: pink;*/
    margin-top: 25px;
  }
  .map {
    width: 994px;
    height: 661px;
    /*background-color: white;*/
  }
  .icon_height{
    height: 52px;
  }
</style>
