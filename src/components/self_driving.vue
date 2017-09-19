<template>
  <div class="self-driving">
    <!-- 加载动画begin -->
    <div class="animation" v-if="animation">
      <!-- 动画容器begin -->
      <div class="animation-box">
        <img src="../assets/car.gif" alt="">
      </div>
      <!-- 动画容器end -->
    </div>

    <!--<div class="animation" v-if="animation1">-->
      <!--&lt;!&ndash; 动画容器begin &ndash;&gt;-->
      <!--<div class="animation-box">-->
        <!--<img src="../assets/crash.png" alt="">-->
      <!--</div>-->
      <!--&lt;!&ndash; 动画容器end &ndash;&gt;-->
    <!--</div>-->
    <!-- 加载动画end -->
    <!--详情及选项begin-->
    <div class="sd-form-select" v-if="page">
      <!--详情上部分begin-->
      <div class="form-top">
        <!--详情左侧轮播begin-->
        <div class="left-silder">
          <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="2000">
            <!-- Indicators -->
            <ol class="carousel-indicators">
              <!--added by jxz, 2017-06-24-->
              <li v-for="(imageitem,i) in this.res.images" v-if="i == 0" data-target="#carousel-example-generic"  :data-slide-to="i" class="active">
                <img :src="imageitem" alt=""/>
              </li>

              <li v-for="(imageitem,i) in this.res.images" v-if="i != 0" data-target="#carousel-example-generic"  :data-slide-to="i">
                <img :src="imageitem" alt=""/>
              </li>
              <!--ended add-->
            </ol>
            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
              <!--added by jxz, 2017-06-24-->
              <div class="item active" v-for="(imgitem,i) in this.res.images" v-if="i == 0">
                <img :src="imgitem" alt=""/>
              </div>
              <div class="item" v-for="(imgitem,i) in this.res.images" v-if="i != 0">
                <img :src="imgitem" alt=""/>
              </div>
              <!--ended add-->
            </div>
            <!-- Controls -->
            <!--<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">-->
              <!--<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>-->
              <!--<span class="sr-only">Previous</span>-->
            <!--</a>-->
            <!--<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">-->
              <!--<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>-->
              <!--<span class="sr-only">Next</span>-->
            <!--</a>-->
          </div>
        </div>
        <!--详情左侧轮播end-->
        <!--详情右侧信息begin-->
        <div class="right-silder">

          <p class="titles">{{ res.product_name }}</p>
          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td colspan="2" height="70">
                <span class="price_box">

                <span class="pop" v-if="pop">
                  <img src="../assets/pop-arrow.png" alt="">
                  <p>1、本产品价格按4个成人出行，使用2间房1辆车核算的单人价格</p>
                  <p>2、产品价格会根据您所选择的出发日期、出行人数入住酒店房型、车辆或交通以及所选附加服务的不同而有所差别</p>
                  <p>3. 人均价格计算默认为以普通成人住宿、购票、乘车所计算价格为准，未考虑持有特殊证件人群，如：学生、军人、残疾人，老年人等可享受优惠票价的情况，如同行人员中有持有效证件者，建议携带证件原件至景区门口按景区规定购买优惠票</p>
                </span>

                <span style="font-size: 20px;color: red;">¥</span>&nbsp;<span style="font-size: 30px;color: red;">{{res.min_price }}</span>
                <span style="font-size: 14px;">起</span>
                <span class="start-desc">
                  <a href="javascript:void(0)" @mouseenter="enter" @mouseleave="leave">起价说明</a>
                </span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="w82"  width="4em" height="35">
                <span class="category w3">出发地</span>：
              </td>
              <td>
                <span class="content">{{ this.res.city_name }}</span>
              </td>
            </tr>
            <tr>
              <td class="w82" height="35">
                <span class="category">类<span style="width: 28px;height: 22px;display: inline-block"></span>型</span>：
                <!--<span class="category w2">类型</span>-->
              </td>
              <td>
                <span class="content">{{ this.res.type_name }}</span>
              </td>
            </tr>
            <tr>
              <td height="35">
                <span class="category w4">行程天数</span>：
              </td>
              <td>
                <span class="content">{{ this.res.day_num}}天{{ this.res.night_num }}晚</span>
              </td>
            </tr>
          </table>
          <div class="advantage">
            <div class="atitle category">产品亮点：</div>

            <!--<div class="adesc"><textarea style="resize:none;background:#FFF;" class="desc" id="" cols="60" rows="14" readonly="readonly" disabled="disabled" v-html="this.res.advantage"></textarea></div>-->

            <!--<div class="adesc"><textarea style="resize:none;background: #FFF; " class="desc" id="" cols="60" rows="14" readonly="readonly" disabled="disabled" v-html="this.res.advantage"></textarea></div>-->


            <div class="adesc"><textarea style="resize:none;background: #FFF; " class="desc" id="" cols="60" rows="14" readonly="readonly" disabled="disabled" v-html="this.res.advantage"></textarea></div>
          </div>
        </div>
        <!--详情右侧信息end-->
      </div>
      <!--详情上部分end-->
      <!--详情下部分begin-->
      <div class="form-bottom">
        <!--左侧日历插件begin-->
        <div class="calendar">
          <full-calendar class="test-fc" :events="fcEvents"
                        :currentMonthStr="fcCurrentMonthStr"
                         first-day='1' locale="zh"
                         @changeMonth="changeMonth"
                         @eventClick="eventClick"
                         @dayClick="dayClick"
                         @moreClick="moreClick">
            <template slot="fc-event-card" scope="p">
              <p style="color:#e1061c">{{ p.event.title }}</p>
            </template>
          </full-calendar>
        </div>

        <!--左侧日历插件end-->
        <!--右侧选择预定begin-->
        <div class="booked">
          <p class="titles" style="margin-top: 110px;">选择出游日期及人数</p>
          <p class="category" style="color: #666;font-size: 14px">出发日期&nbsp;&nbsp;&nbsp;  <span style="color: #333;">{{ this.stime }}</span></p>
          <p style="color: #666;font-size: 14px;position: relative;" class="category num_cal" v-if="showcar">出发人数&nbsp;&nbsp;&nbsp;
            <span class="adult-box" >
              <!--  class="acounter_class" -->
              <counter class="adult-counter"  ftype="1" fmin="1"  fdef="1" @changenum="getnum"></counter>&nbsp;&nbsp;&nbsp;
              <span class="adult-word" >成人</span>
          &nbsp;&nbsp;</span>
            <!-- class="ccounter_class" style="margin-left: 90px; -->
            <span class="child-box" >
              <counter class="child-counter" ftype="2" fmin="0"  fdef="0" @changenum="getnum"></counter>&nbsp;&nbsp;&nbsp;
              <span class="child-word">儿童</span>
              <span class="child-note desc"> 2-12周岁(不含)</span>
            </span>
          </p>
          <p v-if="showcar"><!-- <router-link :to="{name:'confirm_itinerary',params:{id:res.product_id,adult:this.adult,child:this.child,start_date:this.stime,flag:1}}">立即预订</router-link> -->
            <button v-if="hastime" class="booked-btn" @click="book_now">立即预订</button>
            <button v-else class="booked-btn" style="background-color: gray;">立即预订</button>
          </p>
          <div class="teambox" v-if="showdiff">
            <p style="position: relative;color: #666;font-size: 14px" class="category num_cal">出发人数
              <span class="adult-box" style="margin-left: 14px;">
                <counter class="adult-counter" ftype="1" fmin="1"  fdef="2"  fcount="0" :fmax="maxp.adult"  @changenum="getnum" @changecount="getfcount"></counter>&nbsp;&nbsp;&nbsp;
                <span class="adult-word">成人</span>
              </span>
              <span class="child-box">
                <counter class="child-counter" ftype="2" fmin="0"  fdef="0" :fmax="maxp.child"  @changenum="getnum" @changecount="getfcount"></counter>&nbsp;&nbsp;&nbsp;
                <span class="child-word">儿童</span>
                <span class="child-note desc"> 2-12周岁(不含)</span>
              </span>
              <!-- 提示弹出层begin -->
              <span class="pop1" v-if="pop1">
                <img src="../assets/pop-arrow.png" alt="">
                为保证用车体验，此车型最多可坐{{ this.pop1_value }}人
              </span>
              <!-- 提示弹出层end -->
            </p>
            <p style="position: relative;color: #666;font-size: 14px" class="category">单房差<span class="pding"><img style="cursor: pointer" @mouseenter="enter1" @mouseleave="leave1" src="../assets/wenhao.png" alt=""></span>&nbsp;&nbsp;&nbsp;  <counter style="margin-left: -15px" class="acounter_class" ftype="3" :fmin="room_dif_default" :fdef="room_dif_default" :fmax="this.adult" @changenum="getnum"></counter>

              <span class="roomdif" v-if="roomdif">
              <img src="../assets/tarrow.png" alt="">
                本产品价格是按2人共住1间房核算的单人价格，默认2成人住1间房，儿童不占床，因出游过程中的住宿一般是2个床位的标准间，而费用是根据1名成人占1张床计算，所以当出游成人数为奇数时，需要补足另外1个床位的费用
              </span>

            </p>
            <p style="position: relative;color: #666;font-size: 14px" class="category">车位差<span class="pding"><img style="cursor: pointer" @mouseenter="enter2" @mouseleave="leave2" src="../assets/wenhao.png" alt=""></span>&nbsp;&nbsp;&nbsp;  <counter style="margin-left: -15px" class="acounter_class" ftype="4" :fmin="park_dif_default" :fdef="park_dif_default" :fmax="park_dif_default"></counter>

              <span class="cardif" v-if="cardif">
              <img src="../assets/tarrow.png" alt="" >
              本产品价格是按4人使用1辆车核算的单人价格，默认4人使用1辆车，儿童占车位，因出游过程中的车辆一般是4个座位的车型，而费用是根据1人占1座位计算，所以当出游总人数小于座位数时，需要补足剩余的座位费用
            </span>
            </p>
            <p>
              <!-- 车位差不能手动选择 -->
              <button v-if="hastime" class="booked-btn" @click="team_book_now">立即预订</button>
              <button v-else class="booked-btn" style="background-color: gray;">立即预订</button>
              <!--<button @click="abc1">look</button>-->
            </p>
          </div>
        </div>
        <!--右侧选择预定end-->
      </div>
      <!--详情下部分begin-->
    </div>
    <!--详情信息及其选择end-->
    <!--行程安排begin-->
    <div v-if="page">
      <!--行程安排导航begin-->

      <!--行程安排导航end-->
      <!--行程安排须知begin-->
      <div>
        <div class="travel1">
          <ul>
            <li v-for="(item,i) in this.res.tabs"><a  @click="pos(i)"  :class="{actived:changeclass(i)}">{{ item.title }}</a></li>
          </ul>
        </div>
          <Iframe :src="this.res.web_url" frameborder="0" width="100%" scrolling="no" id="external-frame" onload="console.log('this', this);if (this) {var iframeWin = this.contentWindow || this.contentDocument.parentWindow; console.log('iframeWin', iframeWin);if (iframeWin.document.body) {this.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;console.log('this.height', this.height);}}"></Iframe>
      </div>
      <div class="travel-desc">

        <!--用车推荐begin-->
        <div v-if="showcar" class="car-recommended">
          <!-- 新加用车推荐样式begin -->
          <div class="car-center">
            <p><span class="car-title">用车推荐</span></p>
            <div class="img-info">
            <!--左侧图片begin-->
            <div class="l-img">
              <img :src="this.res.site_products.image_url" alt="">
            </div>
            <!--左侧图片begin-->
            <!--右侧信息begin-->
            <div class="r-info">
              <p style="font-size: 20px; margin-bottom: 15px">{{ this.res.site_products.car_type_name }} <span class="content">(或同级车型)</span></p>
              <ul>
                <li>
                  <dl>
                    <dd>档位 : {{this.res.site_products.transmission_name}}</dd>
                    <dd>型号 : {{ this.res.site_products.carriage }}厢</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dd>排量 : {{this.res.site_products.displacement}}</dd>
                    <dd>载客 : {{this.res.site_products.capacity}}座</dd>
                  </dl>
                </li>
              </ul>
            </div>
            <!--右侧信息end-->
          </div>
          </div>
          <!-- 新加用车推荐样式end -->
        </div>
        <!--用车推荐end-->
        <!--费用说明begin-->
        <div class="cost-description" id="1">
          <div style="width: 100%;height: 35px;"></div>
          <!--导航图片begin-->
          <span class="slogo">
            <img src="../assets/cost.png" width="34" height="34" alt="">
          </span>
          <!--导航图片end-->
          <!--<div v-html="res.cost_explain"></div>-->
          <p style="margin-bottom: 10px"><a class="red-title" name="cost-description" id="cost-description">费用说明</a></p>

          <div v-if="costexplain" v-html="this.notice.cost_explain"></div>
          <div v-if="!costexplain">暂无内容</div>
        </div>
        <!--费用说明end-->
        <!--预订须知begin-->
        <div id="2" class="booking-information">
          <div style="width: 100%;height: 35px;"></div>
          <!--导航图片begin-->
          <span class="slogo">
            <img src="../assets/booked.png" width="34" height="34" alt="">
          </span>
          <!--导航图片end-->
          <p style="margin-bottom: 10px"><a class="red-title">预订须知</a></p>
          <div v-if="booknotice" v-html="this.notice.book_notice"></div>
          <div v-if="!booknotice">暂无内容</div>
        </div>
        <!--预订须知end-->
        <!--退改政策begin-->
        <div id="3" class="change-policy">
          <!--导航图片begin-->
          <span class="slogo">
            <img src="../assets/change.png" width="34" height="34" alt="">
          </span>
          <!--导航图片end-->
          <p style="margin-bottom: 10px" class="red-nav"><a class="red-title">退订政策</a></p>
          <div v-if="cancelpolicy" v-html="this.notice.cancel_policy"></div>
          <div v-if="!cancelpolicy">暂无内容</div>
        </div>
        <!--退改政策end-->
      </div>
      <!--行程安排须知end-->
    </div>
    <span class="return" @click="return_top" v-if="this.return_tops"></span>

    <!--{{ this.res.prices }}-->
    <!--{{ details}}-->

  </div>
</template>
<script>
  import moment from 'moment';
  import counter from '@/components/counter'
  import { get_detail,calculate_order,get_tab_detail, appVersionStr, deviceTypeStr } from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times,setDataToLocal } from '../comment/public'
  import mycarousel from '@/components/mycarousel'
  var demoEvents = [];
  var curMonStr = '';
  export default {
    data() {
      return {
        // 获取产品详情
        res:[],   // 产品数据
        mun1:'',
        adult: 2,   // 成人数
        child: 0,   // 儿童数
        type: true,   // 车队自驾用车推荐显示控制
        dif: false,  // 车队自驾房差计算
        room_dif: 0,   // 房间差
        park_dif: 2,   // 车位差
        fcEvents : [],   //日历数据
        allow: false,
        stime: '请选择出行时间',   // 选择时间值
        fcCurrentMonthStr : '',
        hastime: false,
        animation: true,   // 动画控制
        animation1: false,   // 网络崩溃展示
        page: false,   // 页面控制
        pop: false,   // pop弹出层控制
        roomdif: false,
        cardif: false,
        maxa: 6,
        maxc: 6,
        idx: 0,
        tags:'<p>paaaaaaaa</p>',
        notice: [],
        pop1: false, // 成人计算最大值弹出提示
        batch_id: 0,   // 产品批次ID
        pop1_value: 0,   // 车位差弹出层提示人数
        wkcoin: 0,
        userid: 0,
        shownote: true,
        booknotice: true,
        cancelpolicy: true,
        costexplain: true,
//        total: 0

        advantage: '',
        return_tops: false,   // 返回顶部
        scroll: ''   // 滚动条高度

      };
    },
    computed: {


      order_calc () {
        return this.$store.state.norder_calc;
      },
      // 产品详情
      details() {
        return this.$store.state.nget_details;
      },
      // 车队自驾用车推荐显示控制
      showcar() {
        return this.type
      },
      // 车队房差车位差显示控制
      showdiff() {
        return this.dif
      },
      // 成人数
      adult_dif() {
        // console.log(this.adult);
        this.room_dif_default()
      },
      // 单房差默认值
      room_dif_default() {
        if(this.adult % 2 == 0){
          // this.room_dif = 0
          return 0;
        }else{
//          this.room_dif= 1
          return 1;
        }
      },
      // 车位差默认值
      park_dif_default() {

        // 五座与七座都有
        if(this.res.motorcade.car_a_capacity == 4 && this.res.motorcade.car_b_capacity == 6) {
          this.pop1_value = 6

          if (( parseInt(this.adult) + parseInt(this.child) ) < 4) {
            // 车位差提示层
            this.pop1 = false
            this.park_dif = 4 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用A型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) ) == 4) {
            // 车位差提示层
            this.park_dif = 0
            return this.park_dif
            // 推荐使用A型车
          }
          if (( parseInt(this.adult) + parseInt(this.child)) > 4 && ( parseInt(this.adult) + parseInt(this.child)) < 6) {
            // 车位差提示层
            this.pop1 = false
            this.park_dif = 6 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用B型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) == 6 )) {
            // 车位差提示层
            this.park_dif = 0
            return this.park_dif
            // 推荐使用B车型
          }
        }

        // 只有五座没有七座
        if(this.res.motorcade.car_a_capacity == 4 && this.res.motorcade.car_b_capacity !== 6){
          this.pop1_value = 4

          if (( parseInt(this.adult) + parseInt(this.child) ) < 4) {
            this.pop1 = false
            this.park_dif = 4 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用A型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) ) == 4) {
            this.park_dif = 0
            return this.park_dif
            // 推荐使用A型车
          }
        }

        // 只有七座没有五座
        if(this.res.motorcade.car_a_capacity !== 4 && this.res.motorcade.car_b_capacity == 6){
          this.pop1_value = 6

          if (( parseInt(this.adult) + parseInt(this.child)) < 6) {
            // 车位差提示层
            this.pop1 = false
            this.park_dif = 6 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用B型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) == 6 )) {
            this.park_dif = 0
            return this.park_dif
            // 推荐使用B车型
          }
        }
      },
      maxp () {
        if(this.res.motorcade){

          if(this.res.motorcade.car_a_capacity == 4 && this.res.motorcade.car_b_capacity == 6){
            // console.log('有4有6');
            if(( parseInt(this.adult) + parseInt(this.child) ) == 6 ){
              let a = {
                adult:this.adult,
                child:this.child
              }
              return a
            }
            if(( parseInt(this.adult) + parseInt(this.child) ) < 6 ){
              let a = {
                adult:6,
                child:6
              }
              return a
            }
          }

          if(this.res.motorcade.car_a_capacity == 4 && this.res.motorcade.car_b_capacity !== 6){
            // console.log('有4没6');
            if(( parseInt(this.adult) + parseInt(this.child) ) == 4){

              let a = {
                adult:this.adult,
                child:this.child
              }
               return a
            }
            if(( parseInt(this.adult) + parseInt(this.child) ) < 4 ){
              let a = {
                adult:4,
                child:4
              }
               return a
            }
          }
          if(this.res.motorcade.car_a_capacity !== 4 && this.res.motorcade.car_b_capacity == 6){
            // console.log('有6没4');
            if(( parseInt(this.adult) + parseInt(this.child) ) == 6){
              let a = {
                adult:this.adult,
                child:this.child
              }
              return a
            }
            if(( parseInt(this.adult) + parseInt(this.child) ) < 6 ){
              let a = {
                adult:6,
                child:6
              }
              return a
            }
          }
        }
      }
    },
    created () {
      this.animation = true
      console.log('----created res data-----');
      console.log(this.res);
      demoEvents = []
//      console.log('clear demo event');
      // 组件创建完后获取数据，
        this.fetchData()
    },
    mounted(){
      if(localStorage.data){
        this.wkcoin = JSON.parse(localStorage.data).account.wkcoin
        this.userid = JSON.parse(localStorage.data).id
      }
//    this.setIframeHeight(document.getElementById('external-frame'));
      window.addEventListener('scroll', this.menu)
      console.log('----mounted res data-----');
      // console.log(this.res);
//      this.initiate_coursoul();
      setTimeout(() => {
        this.animation = false
        this.page = true

      },1500)
    },
    updated(){
    if(this.res.type == 'PRODUCT_TYPE_MOTORCADE') {
//       alert('车队自驾')
      this.type = false
      this.dif = true
    }

    this.initiate_coursoul();
      $("#carousel-example-generic").carousel();
      console.log('----updated res data-----');
      console.log(this.res);
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData',
    },
    methods: {
        // js定位
        pos(i) {
          javascript:document.getElementById(i).scrollIntoView()
        },
      // 滚动条判断
      menu() {
        this.scroll = document.body.scrollTop || document.documentElement.scrollTop
        if(this.scroll>1000){
          this.return_tops = true
        }
        if(this.scroll<=1000){
          this.return_tops = false
        }
      },
      // 返回顶部
      return_top() {
        var time = setInterval(function () {
          console.log(123);
          document.body.scrollTop = document.body.scrollTop - 50
          document.documentElement.scrollTop = document.documentElement.scrollTop - 50
          if (document.body.scrollTop === 0) {
            clearInterval(time);
          }
        }, 0.8);
      },
      changeclass(i){
          if(i == this.idx) return true
        else return false
      },
      // 显示pop弹出层
      enter () {
        this.pop = true
      },
      // 关闭弹出层
      leave () {
        this.pop = false
      },
      // 显示单房差
      enter1 () {
        this.roomdif = true
      },
      // 隐藏单房差
      leave1 () {
        this.roomdif = false
      },
      //
      enter2 () {
        this.cardif = true
      },
      leave2 () {
        this.cardif = false
      },
      // 日历数据
      getcalendar (outData) {
        console.log('demoEvents.length---------'+demoEvents.length);

        this.fcEvents = [];
        var hasStart = 0;
        var today = moment(moment().format("YYYY-MM-DD"));
        for(var i=0; i < outData.length; i++){
          var priceData = outData[i];
          var start_date = moment(priceData.start_time);
          var start_date_str = start_date.format("YYYY-MM-DD");
          var end_date = moment(priceData.end_time);
          var price = '¥' + priceData.day;
          var interval = end_date.diff(start_date, 'day');
          for(var j = 0; j <= interval; j++){
            var item;
            var dateStr = moment(start_date_str).add(j, 'day').format("YYYY-MM-DD");
            var diffDays = today.diff(moment(dateStr), 'day');
            console.log('dateStr='+dateStr+' | diffDays='+diffDays);
            if(diffDays >= 0)
              continue;
            item = {
              title : price,
              start : dateStr,
              end : dateStr
            }
            if(hasStart == 0){
              this.fcCurrentMonthStr = dateStr;
              console.log('[2]this.fcCurrentMonthStr=', this.fcCurrentMonthStr);
              hasStart++;
            }
            this.fcEvents.push(item);
          }
        }
        console.log('res demo:');
      },
      // 导航切换
      navs (i) {
        this.idx = i
      },
      // 测试时间转换
      dw: function(){
        var stringTime = this.res.prices[0].start_time;
        var timestamp2 = Date.parse(new Date(stringTime));
        timestamp2 = timestamp2 / 1000;
        // console.log(timestamp2);
        var stringTime1 = this.res.prices[0].end_time;
        var timestamp3 = Date.parse(new Date(stringTime1));
        // console.log((timestamp3));
      },
      'changeMonth' (start, end, current) {
        console.log('changeMonth', start.format(), end.format(), current.format())
      },
      'eventClick' (event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
        this.stime = event.start
        this.hastime = true
      },
      'dayClick' (day, jsEvent) {
        // console.log('hi')
        console.log('dayClick', day, jsEvent)
      },
      'moreClick' (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      },
      initiate_coursoul:function(){
      },
      // 判断人数最大值控制显示弹窗提示信息
      getfcount: function (num) {
//          this.fcount = num
        // console.log('getfcount')
//        park_dif_default()
        // 五座与七座都有
        if(this.res.motorcade.car_a_capacity == 4 && this.res.motorcade.car_b_capacity == 6) {
          this.pop1_value = 6

          if (( parseInt(this.adult) + parseInt(this.child) ) < 4) {
            // 车位差提示层
            this.pop1 = false
            this.park_dif = 4 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用A型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) ) == 4) {
            // 车位差提示层
            this.pop1 = true
            setTimeout((res) => {
              this.pop1 = false
            },3000)
            this.park_dif = 0
            return this.park_dif
            // 推荐使用A型车
          }
          if (( parseInt(this.adult) + parseInt(this.child)) > 4 && ( parseInt(this.adult) + parseInt(this.child)) < 6) {
            // 车位差提示层
            this.pop1 = false
            this.park_dif = 6 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用B型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) == 6 )) {
            // 车位差提示层
            this.pop1 = true
            setTimeout((res) => {
              this.pop1 = false
            },1500)

            this.park_dif = 0
            return this.park_dif
            // 推荐使用B车型
          }
        }

        // 只有五座没有七座
        if(this.res.motorcade.car_a_capacity == 4 && this.res.motorcade.car_b_capacity !== 6){
          this.pop1_value = 4

          if (( parseInt(this.adult) + parseInt(this.child) ) < 4) {
            this.pop1 = false
            this.park_dif = 4 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用A型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) ) == 4) {
          	this.pop1 = true
            setTimeout((res) => {
              this.pop1 = false
            },1500)

            this.park_dif = 0
            return this.park_dif
            // 推荐使用A型车
          }
        }

        // 只有七座没有五座
        if(this.res.motorcade.car_a_capacity !== 4 && this.res.motorcade.car_b_capacity == 6){
          this.pop1_value = 6

          if (( parseInt(this.adult) + parseInt(this.child)) < 6) {
            // 车位差提示层
            this.pop1 = false
            this.park_dif = 6 - ( parseInt(this.adult) + parseInt(this.child) )
            return this.park_dif
            // 推荐使用B型车
          }
          if (( parseInt(this.adult) + parseInt(this.child) == 6 )) {
          	this.pop1 = true
            setTimeout((res) => {
              this.pop1 = false
            },1500)
            this.park_dif = 0
            return this.park_dif
            // 推荐使用B车型
          }
        }
      },
      getnum: function(ftype,forder,fitem,num){

        // 成人数量
        if(ftype == 1){
          this.adult = num
           console.log('adult'+num);
        }
        // 儿童数量
        if(ftype == 2){
          this.child = num
          // console.log(this.child);
        }
        // 房间差
        if(ftype == 3){
          this.room_dif = num
        }
        // 车位差
        if(ftype == 4){
          this.park_dif = num
        }
      },
      // 自助自驾立即预订
      book_now () {
        console.log('------click book_now res data -----')
        // console.log(this.res)
        // console.log(this.adult);
        // console.log('------- end -------');
        this.$router.push({name:'confirm_itinerary',params:{id:this.res.product_id,adult:this.adult,child:this.child,start_date:this.stime,flag:1}})
      },
      // 车队自驾立即预订
      team_book_now() {
        console.log(this.room_dif)
        // 当选择出行日期后对应找到相应产品批次ID
        for( let i=0;i<this.res.batchs.length;i++){
          if(this.stime == this.res.batchs[i].start_date){
            this.batch_id = this.res.batchs[i].product_batch_id
          }
        }
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let param = ''
        if(localStorage.data){
          param = "{\"user_id\":" + this.userid + ",\"wkcoin_pay\":" + this.wkcoin + ",\"product_id\":" + this.$route.params.id + ",\"start_date\":"+ this.stime +",\"adult_num\":"+ this.adult +",\"children_num\":"+ this.child +",\"motorcade\":{\"product_batch_id\":"+ this.batch_id +",\"car_miss_num\": "+ this.park_dif +",\"room_miss_num\":"+  this.room_dif+"},\"version\":{\"appVersion\":\"" + appVersionStr +"\",\"deviceType\":\"" + deviceTypeStr + "\"}}"
        }else{
          param = "{\"product_id\":" + this.$route.params.id + ",\"start_date\":"+ this.stime +",\"adult_num\":"+ this.adult +",\"children_num\":"+ this.child +",\"motorcade\":{\"product_batch_id\":"+ this.batch_id +",\"car_miss_num\": "+ this.park_dif  +",\"room_miss_num\":"+ this.room_dif +"},\"version\":{\"appVersion\":\"" + appVersionStr +"\",\"deviceType\":\"" + deviceTypeStr + "\"}}"
        }
        //let param = "{\"product_id\":" + this.$route.params.id + ",\"start_date\":"+ this.stime +",\"adult_num\":"+ this.adult +",\"children_num\":"+ this.child +",\"motorcade\":{\"product_batch_id\":"+ this.batch_id +",\"car_miss_num\": "+ this.room_dif +",\"room_miss_num\":"+ this.park_dif +"}}"

        //let param = "{\"product_id\":" + this.$route.params.id + ",\"start_date\":"+ this.stime +",\"adult_num\":"+ this.adult +",\"children_num\":"+ this.child +",\"motorcade\":{\"product_batch_id\":"+ this.batch_id +",\"car_miss_num\": "+ this.room_dif +",\"room_miss_num\":"+ this.park_dif +"},\"version\":{\"appVersion\":\"" + appVersionStr +"\",\"deviceType\":\"" + deviceTypeStr + "\"}}"

        /*
        sign: md5("appid=5101&nonce=" + nonce + "&params={\"product_id\":" + parseInt(this.$route.params.id) + ",\"start_date\":\""+ this.$route.params.start_date +"\",\"version\":{\"appVersion\":\"1.0.0\",\"deviceType\":\"WKTRIP PC\"}}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
        */

        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+ param +"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          // appkey: 'b3b01c69cc8408593f708514a211b09f',
          nonce: nonce,
          timestamp: timestamp,
          params: param
        }
        console.log('--- >>>para<<< ---');
        console.log(para);
        console.log('--- >>>para end<<< ---');
        calculate_order(para).then((res) => {
          if(res.data.code == 0){
            console.log('--- return data ---');
            console.log(res.data)
            console.log('--- return data end---');
            let person = {"adultnum":this.adult,"childnum":this.child,"room_dif":this.room_dif,"park_dif":this.park_dif,"batch_id":this.batch_id}
            this.$store.commit('team_order_calc', res.data)  // 变更vuex中产品详情数据
            this.$store.commit('team_person', person)  // 变更vuex中产品详情数据
            console.log('---person---');
            console.log(person);
            setDataToLocal("line_product", {"product_name":this.res.product_name})
            setDataToLocal("team_order_calc", res.data)
            setDataToLocal("team_person", person)
            this.$router.push('/tfill_order')
          }
        })
      },
      // 获取详情数据
      fetchData: function(){
        let self = this
       // console.log();
        this.res = []
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
//        let param = "{\"product_id\":" + this.$route.params.id + "}"
        let param = "{\"product_id\":" + this.$route.params.id + ",\"image_size\":\"L\",\"version\":{\"appVersion\":\"" + appVersionStr +"\",\"deviceType\":\"" + deviceTypeStr + "\"}" +"}"
        //",\"version\":{\"appVersion\":\"" + appVersionStr +"\",\"deviceType\":\"" + deviceTypeStr + "\"}" +
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+param+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          // appkey: 'b3b01c69cc8408593f708514a211b09f',
          nonce: nonce,
          timestamp: timestamp,
          params: param
        }
        // console.log(para);
        get_detail(para).then((res) => {
          if(res.data.code != 0){
          //  alert(res.data.code+' '+res.data.msg);
          }else{
            this.res = res.data
            if(this.res.type == 'PRODUCT_TYPE_SELFHELP'){
              this.adult = 1
            }
            let outDate = res.data.prices
            this.getcalendar(outDate)
            console.log('------res.data-------');
            this.advantage = this.res.advantage
            this.advantage = this.advantage.replace(/\n/g,'<br>')
            this.$store.commit('nget_details', res.data)  // 变更vuex中产品详情数据
            console.log('------fetchData res data-------');
          }
           console.log('数据接口函数调用完毕');
        })
        // 获取指定ID的路线的费用说明、预订须知、退改政策
        //let param1 = "{\"product_id\":" + this.$route.params.id + ",\"tabs\": [\"cost_explain\", \"book_notice\", \"cancel_policy\"]}"
        let param1 = "{\"product_id\":" + this.$route.params.id + ",\"tabs\": [\"cost_explain\", \"book_notice\", \"cancel_policy\"]"+",\"version\":{\"appVersion\":\"" + appVersionStr +"\",\"deviceType\":\"" + deviceTypeStr + "\"}" + "}";
        let para1 = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+param1+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: param1
        }
        get_tab_detail(para1).then((res) => {
           console.log('--------费用说明数据--------');
           console.log(res);
          this.notice = res.data
          if(res.data.book_notice){
            this.booknotice = true
          }else{
            this.booknotice = false
          }

          if(res.data.cancel_policy){
            this.cancelpolicy = true
          }else{
            console.log('不存在啊---------');
            this.cancelpolicy = false
          }

          if(res.data.cost_explain){
            this.costexplain = true
          }else{
            this.costexplain = false
          }

        })
      }
    },
    components: {
      counter,
      mycarousel,

      'full-calendar': require('vue-fullcalendar')
    }
  };
</script>
<style scoped>
  /******
  *字体/公用样式设置
  *category 信息名字体
  *content 信息内容字体
  *desc 亮点描述字体
  *travel 行程安排字体
  *current 当前状态字体
  *************************************************************/
  .w82{
    width: 82px;
  }
  *{
    border: 0;
    padding: 0;
  }
  .actived{
    color: red;
    border-bottom: 3px solid #d00000;
  }
  /*信息名字体*/
  .category{
    font-size: 14px;
    font-family: "Microsoft YaHei UI Light";
    color: #666;
    /*font-weight: 900;*/
  }
  .w2{
    letter-spacing:2em;
    margin-right:-2em;
  }
  .w3 {
    letter-spacing: 0.5em; /*如果需要y个字两端对齐，则为(x-y)/(y-1),这里是（4-3）/(3-1)=0.5em */
    margin-right: -0.5em;
  }
  .w4{
    letter-spacing:0;
    margin-right:0;
  }
  /*车队房间差盒子*/
  .teambox{
    position: relative;
  }
  /*房间差*/
  .roomdif{
    position: absolute;
    padding: 5px;
    width: 299px;
    /*height: 114px;*/
    background-color: #fff;
    top: 47px;
    left: 8px;
    border: 1px solid #999999;
    font-size: 12px;
    color: #8f8f8f;
    z-index: 999;
  }
  /*房间差弹出层图*/
  .roomdif img {
    position: absolute;
    left: 35px;
    top: -15px;
  }
  .cardif{
    position: absolute;
    padding: 5px;
    width: 299px;
    background-color: #fff;
    top: 45px;
    left: 4px;
    border: 1px solid #999999;
    font-size: 12px;
    color: #8f8f8f;
  }
  .cardif img{
    position: absolute;
    left: 42px;
    top: -15px;
  }
  /*信息内容字体*/
  .content{
    color: #999;
    font-size: 14px;
    font-family: "Microsoft YaHei UI Light";
    /*font-weight: 900;*/
  }
  /*产品亮点描述字体*/
  .desc{
    color: #666;
    font-size: 14px;
    /*font-weight: 900;*/
  }
  /*行程安排字体*/
  .travel{
    font-size: 24px;
    font-family: "Microsoft YaHei UI Light";
    font-weight: 700;
  }
  .travel li:hover{
    color: #dc1111;
    border-bottom: 3px solid #dc1111;
  }
  .travel a{
    text-decoration: none;
    color: #000000;
  }
  .travel a:hover{
    color: #dc1111;
  }
  /*行程安排导航被选中状态*/
  .current{
    color: #dc1111;
    border-bottom: 3px solid #dc1111;
  }
  p .red-title{
    color: #dc1111;
    font-size: 18px;
    font-family: "Microsoft YaHei UI Light";
    /*font-weight: 800;*/

  }

  /*成人数计数器容器*/
  .adult-box{
    /*background-color: yellow;*/
    position: relative;
    width: 147px;
  }
  /*成人数计数器*/
  .adult-counter{
    position: absolute;
    top: 5px;
  }
  /*成人文字1*/
  .adult-word{
    /*background-color: gray;*/
    position: absolute;
    left: 97px;
    top: 0;
    width: 50px;
    color: #333;
  }
  /*儿童数计数器容器*/
  .child-box{
    /*background-color: pink;*/
    width: 228px;
    position: relative
  }
  /*儿童书计数器*/
  .child-counter{
    position: absolute;
    top: 5px;
  }
  /*儿童数文字1*/
  .child-word{
    /*background-color: gray;*/
    position: absolute;
    left: 97px;
    top: 0;
    width: 50px;
    color: #333;
  }
  /*儿童数说明*/
  .child-note{
    position: absolute;
    right: 0;
  }
  /*******************************************************************/
  /*立即预定按钮*/
  .booked-btn{
    margin-top: 10px;
    width: 148px;
    height: 41px;
    line-height: 41px;
    background-color: #dc1111;
    color: white;
    font-size: 20px;
    border-radius: 5px;
    font-family: "Microsoft YaHei UI Light";
    /*font-weight: 800;*/
  }
  .booked-btn a{
    text-decoration: none;
    color: white;
  }
  .booked p{
    /*background-color: pink;*/
    height: 35px;
    line-height: 35px;
    margin-bottom: 13px;
    font-size: 18px;
  }

  /*自助自驾组件*/
  .self-driving{
    position: relative;
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    /*background-color: pink;*/
    padding-top: 110px;
  }

  /*详情选项容器*/
  .sd-form-select{
    width: 100%;
    /*height: 900px;*/
    /*background-color: pink;*/
  }
  /*详情上部分*/
  .form-top{
    width: 100%;
    height: 460px;
    /*background-color: pink;*/
  }
  /*左侧轮播图*/
  .left-silder{
    float: left;
    width: 564px;
    height: 455px;
    position: relative;
    /*background-color: red;*/
  }
  .el-input-number input{
    width: 36px;
  }
  /*elelunbo组件*/
  .carousel-inner .item img{
    /*width: 100%;*/
    /*height: 100%;*/
    width: 564px;
    height: 394.8px;
  }
  .carousel-indicators{
    bottom: -95px;
    left: 170px;
    width: 100%;

    margin-bottom: 12px;
  }
  /*轮播小图容器*/
  .carousel-indicators li{
    width: 104px;
    height: 74px;
    /*border: 1px solid #FFF;*/
    border-radius: 0;
    margin-right: 5px;
    text-indent: 0px;
  }
  /*轮播小图*/
  .carousel-indicators li img{
    width: 100%;
    /*margin-left: 999px;*/
    height: 100%;
  }
  .carousel-indicators .active{
   outline: 2px solid red;
  }
  /**/
  /*右侧轮播图*/
  .right-silder{
    position: relative;
    padding-left: 22px;
    float: left;
    width: 636px;
    height: 100%;
    /*background-color: greenyellow;*/
  }
  /*价格及起价说明容器*/
  .price_box{
    position: relative;
    /*background-color: pink;*/
  }
  /*起价说明*/
  .start-desc{
    /*border-bottom: 1px dashed #d1d1d1;*/
    margin-left: 20px
  }
  .start-desc a{
    font-size: 14px;
    color: #666666;
    font-family: 'Microsoft YaHei UI Light';
    text-decoration: dashed;
    border-bottom:1px dashed #d1d1d1;
  }
  /*气泡弹出层*/
  .pop{
    position: absolute;
    width: 296px;
    /*height: 103px;*/
    background-color: #fff;
    right: -325px;
    top: -18px;
    border:1px solid #999999;
    padding: 5px;
  }
  /*气泡弹出层图片*/
  .pop img{
    position: absolute;
    top: 15px;
    left: -15px;
  }
  /*气泡弹出层内容*/
  .pop p{
    font-size: 12px;
    color: #666;
  }

  /*成人计算人数弹出层*/
  .pop1{
    position: absolute;
    width: 200px;
    /*height: 103px;*/
    background-color: #fff;
    left: 500px;
    top: -12px;
    border:1px solid #999999;
    padding: 5px;
    font-size: 16px;
  }
  /*气泡弹出层图片*/
  .pop1 img{
    position: absolute;
    top: 15px;
    left: -15px;
  }
  /*气泡弹出层内容*/
  .pop1 p{
    font-size: 12px;
    color: #8f8f8f;
  }
  /*儿童计算人数弹出层*/
  .pop2{
    position: absolute;
    width: 296px;
    height: 103px;
    background-color: #fff;
    left: 240px;
    top: 50px;
    border:1px solid #999999;
    padding: 5px;
  }
  /*气泡弹出层图片*/
  .pop2 img{
    position: absolute;
    top: 15px;
    left: -15px;
  }
  /*气泡弹出层内容*/
  .pop2 p{
    font-size: 12px;
    color: #8f8f8f;
  }

  /*产品标题*/
  .titles{
    font-family: "Microsoft YaHei UI";
    font-size: 24px;
    /*font-weight: 700;*/
  }
  /*产品亮点*/
  .advantage{
    margin-top: 8px;
    width: 100%;
    /*background-color: pink;*/
  }
  /*亮点标题容器*/
  .advantage .atitle{
    float: left;
    width: 82px;
    height: 200px;
    /*background-color: gray;*/
  }
  /*详情下部分*/
  .form-bottom{
    width: 100%;
    height: 500px;
    /*background-color: yellow;*/
  }
  /*下部分左侧日历*/
  .calendar{
    margin-top:60px;
    float: left;
    width: 564px;
    height: 438px;
    /*background-color: yellow;*/
  }
  .calendar .test-fc{
    width: 100%;
    height: 100%;
  }
  .num_cal{
    width: 700px;
  }
  /*出行人数行*/
  .num_cal > span{
    display: inline-block;
  }
  /*成人，儿童计算样式*/
  .adult_num,.child_num{
    width: 100%;
    height: 100%;
    text-align: center;
  }

  /*计算人数*/
  .calculate{
    height: 100%;
    /*background-color: pink;*/
  }
  .acounter_class{
    position: absolute;
    top: 5px;
    left: 90px;
  }
  .ccounter_class{
    position: absolute;
    top: 5px;
    left: 254px;
  }
  .calculate .add_btn{
    border-right: 1px solid #797979;
  }
  .calculate ul{
    list-style: none;
  }
  .calculate ul li{
    float: left;
    width: 30px;
    height: 24px;
    border-left: 1px solid #797979;
    border-top: 1px solid #797979;
    border-bottom: 1px solid #797979;
    display: inline-block;
    /*background-color: yellow;*/
    text-align: center;
    color: #797979;
    font-size: 12px;
    font-family: "Microsoft YaHei UI Light";
    font-weight: 700;
    line-height: 24px;
  }
  /*预定*/
  .booked{
    float: left;
    /*margin-left: 22px;*/
    width: 615px;
    height: 419px;
    /*background-color: yellow;*/
    padding-left: 22px;
  }
  .travel1{
    /*width: 100%;*/
    height: 61px;
    margin-top: 50px;
    /*background-color: pink;*/
    border-bottom: 1px solid #e6e6e6;
  }
  /*行程导航列表*/
  .travel1 ul{
    list-style: none;
  }
  /*行程列表项*/
  .travel1 ul li{
    float: left;
    margin-right:70px;
    /*width: 120px;*/
    height: 41px;
    line-height: 41px;
  }
  .travel1 ul li a{
    font-size: 24px;
    cursor: pointer;
    text-decoration: none;
    color: #333;
    font-family: "Microsoft YaHei";
  }
  .travel1 ul li a:hover{
    border-bottom: 3px solid #d00000;
    color: #d00000;
  }

  /*行程安排须知*/
  .travel1-desc{
    width: 100%;
    /*height: 500px;*/
    background-color: pink;
    padding-left: 72px;
  }
  /*用车推荐*/
  .car-recommended{
    width: 100%;
    height: 450px;
    padding-left: 100px;
    /*background-color: yellow;*/
  }
  /*新加用车推荐*/
  .car-center{
    height: 450px;
    /*background-color: blue;*/
    border: 1px solid #eee;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    box-shadow: 0 2px 10px rgba(211, 211, 211, 0.27), 0 0 40px rgba(241, 241, 241, 0.06) inset;
    position: relative;
    *zoom: 1;
  }
  /*用车推荐标题容器*/
  .car-recommended p{
    height: 55px;
    /*line-height: 55px;*/
  }
  /*用车推荐容器*/
  .car-title{
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background-color: #dc1111;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;


  }
  .car-recommended .img-info{
    width: 100%;
    /*height: 100%;*/
    /*background-color: pink;*/
    margin-left: 159px;
  }
  /*用车推荐左侧图片*/
  .car-recommended .img-info .l-img{
    float: left;
  }
  /*用车推荐右侧信息*/
  .car-recommended .img-info .r-info{
    float: left;
    padding-top: 110px;
    padding-left: 50px;
    height: 100%;
    /*background-color: pink;*/
  }
  .car-recommended .img-info .r-info ul{
    list-style:none;
  }
  .car-recommended .img-info .r-info ul li{
    float: left;
    width: 120px;
    height: 50px;
    /*background-color: pink;*/
    margin-right: 45px;
    color: #030305;
    font-family: "Microsoft YaHei UI Light";
    /*font-weight: 500;*/
    font-size:16px;
  }
  .car-recommended .img-info .r-info ul li dl dd{
    font-size:16px;
    margin-bottom: 5px;
  }
  /*费用说明*/
  .cost-description{
    padding-left: 100px;
    padding-right: 52px;
    position: relative;
    width: 100%;
    /*height: 500px;*/
    /*background-color: darkgray;*/
    /*e5e5e5*/
    /*border-bottom: 1px solid gray;*/
  }
  .cost-description .slogo{
    position: absolute;
    left: 50px;
    top: 50px;
  }
  .cost-description a{
    text-decoration: none;
    color: #d00000;
  }
  /*子标题*/
  .cost-description ,.booking-information ,.change-policy{
    color: #666666;
   /* background-color: pink;*/
   font-size: 14px;

  }
  /*预订须知*/
  .booking-information{
    position: relative;
    width: 100%;
    padding-left: 100px;
    padding-right: 52px;
    margin-bottom: 0;
    /*height: 500px;*/
    /*background-color: greenyellow;*/
    /*border-bottom: 1px solid gray;*/
  }
  .booking-information .slogo{
    position: absolute;
    left: 50px;
    top: 50px;
  }
  .booking-information a{
    text-decoration: none;
    color: #d00000;
  }
  /*行程须知统一间距*/
  .change-policy,.booking-information,.cost-description {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  /*退改政策*/
  .change-policy{
    padding-left: 100px;
    padding-right: 52px;
    padding-top: 52px;
    padding-bottom: 40px;
    position: relative;
    width: 100%;
    /*margin-top: 15px;*/
    /*height: 500px;*/
    /*background-color:     rosybrown;*/
  }

  .change-policy .slogo{
    position: absolute;
    left: 50px;
    top: 49px;
  }
  .change-policy a{
    text-decoration: none;
    color: #d00000;
  }
  /*问号图标右侧距离调整*/
  .pding{
    margin-right: -2px;
  }
  /*行程须知子标题*/
  .ctitle{
    /*background-color: pink;*/
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(3, 3, 5, 0.73);
  }


  /***** 废弃写法begin *****/
  .small-slider {
    /*width: 100%;*/
    margin: 0 auto;
    height: 70px;
    position: absolute;
    bottom: 90px;
    /*background-color: pink;*/
    margin-left: 12px;
  }
  .small-slider ol{
    width: 100%;
    float: left;
    list-style: none;
    margin-bottom: 12px;	/*added by jxz, 2017-06-25*/
  }

  .small-slider ol li{
    margin: 0 auto;
    float: left;
    width: 100px;
    height: 70px;
    border: 1px solid #FFF;
    border-radius: 0;
    margin-right: 10px;
  }

  .small-slider ol li:focus{
    border: 1px solid red;
  }
  .small-slider ol li img{
    width: 100%;
    /*margin-left: 999px;*/
    height: 100%;
  }
  .small-slider li .active{
    border: 1px solid red;
  }
  /***** 废弃写法end *****/

  /*加载动画容器*/
  .animation {
    width: 100%;
    /*height: 600px;*/
    /*background-color: darkgray;*/
  }
  /*加载动画容器*/
  .animation .animation-box{
    width: 402px;
    height: 236px;
    margin: 0 auto;
    margin-bottom: 100px;
  }
  /*退改政策子标题*/
  .red-nav .ctitle{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(3, 3, 5, 0.73);
  }
  /*回到顶部*/
  .return{
    width: 65px;
    height: 65px;
    background-color: gray;
    position: fixed;
    right: 50px;
    bottom: 357px;
    background: url("../assets/return.png");
    cursor: pointer;
  }
</style>
