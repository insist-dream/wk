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
            <li class="step-2" style="color: #ffffff;background-color: #d00000;">
              <p>2.确认行程</p>
              <img class="l-img" src="../assets/steps.png" alt="">
              <img class="r-img" src="../assets/step-j.png" alt="">
            </li>
            <li class="step-3">
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
          <p class="type">{{ this.$route.params.start_date }}出发　　　{{ this.$route.params.adult }}成人　　　{{ this.$route.params.child }}儿童</p>
        </div>
        <!--路线名称内容end-->
      </div>
      <!--路线名称end-->
      <!--自驾用车begin-->
      <div class="self-driving-car">
        <img src="../assets/selfdriving-car.png" alt="">
        <h3>自驾用车</h3>
        <div class="content">
          <p class="title">{{ details.site_products.product_name }}</p>
          <p class="type">
            <span>{{details.site_products.transmission_name}} | {{details.site_products.displacement}} | {{ details.site_products.carriage }} | {{details.site_products.capacity}}座</span>
            <span class="calculate-number" >
              <span style="display: inline-block;"><counter fmin="1" :fmax="inventorynum" :fdef="carsnum" ftype="car" forder="1" fitem="1" @changenum="getnum"></counter></span>&nbsp;&nbsp;&nbsp;
              <span style="clear: both"  class="content-number">辆</span>
            </span>
          </p>
          <router-link v-if="car_more" class="change-button" :to="{name:'tranship',params:{id:details.product_id,start_date:this.$route.params.start_date,car_id:details.site_products.product_id,adult:this.$route.params.adult,child:this.$route.params.child,day_num:details.day_num}}">更换</router-link>
        </div>
      </div>
      <!--自驾用车end-->
      <!--酒店房间begin-->
      <div class="hotel" style="border-bottom: 0">
        <img src="../assets/hotel.png" alt="">
        <h3>酒店房间</h3>
        <span style="display:none;">{{inDate}}</span>
        <div class="content" v-for="(item, i) in details.trip_hotels">
          <div v-for="(hotelitem, k) in item.hotels">
            <p class="title"><router-link style="color:#333333;display:inline-block;margin-right:20px;" :to="{name:'grogshop',params:{pid:details.product_id,hid:hotelitem.hotel_id,step:item.step,start_date:in_date[i],idx:i,adult:person.adult,child:person.child}}">{{ hotelitem.hotel_name }}</router-link>   <span style="position: absolute;top:0;"><span class="time-tag"><span class="tag-date">{{in_date[i]}}</span>&nbsp;<span class="tag-inout">住</span></span><span class="time-tag"><span class="tag-date">{{out_date[i]}}</span>&nbsp;<span class="tag-inout">离</span></span></span></p>
            <p class="type" v-for="(subitem, j) in hotelitem.hotel_products">{{ subitem.product_name }} | {{subitem.breakfast_name}} | {{subitem.size}}平米
              <span class="calculate-number" >
                <span style="display: inline-block;"><counter fmin="0" :fmax="h_inentorynum(i, k, j)" :fdef="h_residencynum(i,k,j)" ftype="hotel" :forder="i" :fitem="j"  @changenum="getnum"></counter></span>&nbsp;&nbsp;&nbsp;
                <span style="clear: both"  class="content-number">间</span>
              </span>
            </p>
            <router-link v-if="item.hotels[0].has_other" class="change-button" :to="{name:'replace_hotel',params:{id:details.product_id,start_date:in_date[i],step:item.step,hotel_id:hotelitem.hotel_id,index:i,adult:person.adult,child:person.child,day_num:item.day_num}}">更换</router-link>
          </div>
        </div>
      </div>
      <!--酒店房间end-->
      <!--景点门票begin-->
      <div v-if="sight_length > 0" class="attractions-tickets">
        <img src="../assets/attractions-tickets.png" alt="">
        <h3>景点门票 <span style="margin-right: 20px;float: right;"><span style="float:left;margin-right:10px;font-size:14px;">买门票</span><el-switch @change="default_ticket" v-model="value1" on-text="" on-color="#13ce66" off-text></el-switch></span></h3>
        <!--<div v-if="value1" id="sight">-->
        <div v-if="true" id="sight">
          <div class="content" v-for="(item,i) in details.trip_sights">
            <div v-for="(sight,k) in item.sights">
            <p class="title"><span style="display:inline-block;width:260px;">{{ sight.sight_name }}</span> <span class="time-tag"><span class="tag-date">{{ in_date[i] }}</span></span></p>
            <p class="type" v-for="(product,j) in sight.sight_products">{{ product.product_name }}
              <span class="calculate-number" >
                <span style="display: inline-block;"><counter  fmin="0" :fmax="maxsightnum(product.ticket_type)" :fdef="defsightnum(i,k,j,-1)" ftype="ticket" :forder="i" :fwho="k" :fitem="j" :fdisaled="value1" @changenum="getnum"></counter></span>&nbsp;&nbsp;&nbsp;
                <span style="clear: both"  class="content-number">张</span>
              </span>
            </p>
            </div>
          </div>
        </div>
      </div>
      <!--景点门票end-->
      <!--下一步-->
      <div class="next">
        <a href="javascript:void(0);"><span class="next-button" @click="next">下一步</span></a>
      </div>
      <div style="height: 60px;"></div>
    </div>
      <!--确认行程end-->
    <!--p>{{ details }}</p-->
    <!--p>{{ this.res }}</p-->
     <!--p>{{ this.res.data.trip_sights[0].sights[0].sight_products }}</p-->

  </div>
    </div>
</template>
<script>
  import counter from '@/components/counter_confirm'
  import { get_detail,calculate_order } from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times,getNewDay,setDataToLocal } from '../comment/public'
  export default {
    data() {
      return {
        res:{},
        start_day: '',
        value1: true,
        in_date:[],
        out_date:[],
        car_more: true,
        ticket_def: 1,
        sight_length: 0,
        wkcoin: 0,
        userid: 0
      }
    },
    computed: {
      // 人数
      person (){
        return {"adult":this.$route.params.adult,"child":this.$route.params.child}
      },
      // 默认车辆数
      carsnum() {
        // console.log('--------------')
        // console.log((parseInt((parseInt(this.$route.params.adult) + parseInt(this.$route.params.child) + 5)/5)))
        let car_num
        // console.log(this.$store.state.carnum)
        if(this.$store.state.carnum){
          car_num = this.$store.state.carnum
        }else{
          car_num = parseInt((parseInt(this.$route.params.adult) + parseInt(this.$route.params.child) + 4)/5);
          this.$store.commit('addcarnum', car_num)
          setDataToLocal("carnum", {"carnum":car_num})
        }
        return car_num
      },
      // 车辆库存数
      inventorynum() {
        // console.log(this.details.site_products.inventory)
        return parseInt(this.details.site_products.inventory)
      },
      // 产品详情
      details() {
        // console.log('--=========');
        // console.log(this.$store.state.nget_details.site_products);
        return this.$store.state.nget_details;
      },
      // 订单计算
      order() {
        return this.$store.state.norder_calc;
      },
      inDate(){
        // console.log("this.details.trip_hotels.length="+this.details.trip_hotels.length);
        for(var i=0; i < this.details.trip_hotels.length; i++){
          // console.log("loop="+i);
          this.in_date[i] = this.h_indate(i);
          this.out_date[i] = this.h_outdate(i);

          // console.log("indate="+this.in_date[i]);
          // console.log("outdate="+this.out_date[i]);
        }

        // console.log("indate.length="+this.in_date.length);
        // console.log("outdate.length="+this.out_date.length);
        return this.in_date;
      }
    },
    mounted() {
      if(localStorage.data){
        this.wkcoin = JSON.parse(localStorage.data).account.wkcoin
        this.userid = JSON.parse(localStorage.data).id
      }
      // console.log(this.$route.params.flag)
      if(this.$route.params.flag==1) {
        this.fetchData()
      }else{
        if(JSON.stringify(this.$store.state.nget_details) == "{}"){// 页面刷新了
          this.res = this.set_init_data(JSON.parse(localStorage.nget_details))
          this.$store.commit('nget_details', this.res.data)
          this.$route.params.flag = 1
        }else{
          this.sight_length = this.details.trip_sights.length
        }
      }
      // console.log('mounted=='+this.$store.state.witdhvalue)
      this.value1 = this.$store.state.witdhvalue
      this.start_day = this.$route.params.start_date
      // console.log('mounted= '+this.value1)
    },
    methods: {
      default_ticket: function(){//买不买门票
        this.$store.commit('changeswitdhvalue', !this.value1)
        // console.log('default_ticket value1==='+this.value1)
        // console.log('default_ticket switch==='+this.$store.state.witdhvalue)
        let ns_trip_sights = this.$store.state.nget_details.trip_sights;
        for(let i=0;i<ns_trip_sights.length;i++){
          for(let j=0;j<ns_trip_sights[i].sights.length;j++){
            let sight_products = ns_trip_sights[i].sights[j].sight_products;
            for(let k = 0; k < sight_products.length; k++){
              if(this.value1){//不买
                this.$store.commit('addticketnum', {sh:i,ss:j,sp:k,sm:0})
                this.defsightnum(i,j,k,0);
              }else{//买
                this.defsightnum(i,j,k,1);
              }
            }
          }
        }
      },
      defsightnum: function (i,k,j,num){
        if(num == 1){//购买门票
          let crnum = parseInt(this.$route.params.adult)
          let etnum = parseInt(this.$route.params.child)
          if(this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].ticket_type == 'TICKET_ADULT'){
            this.$store.commit('addticketnum', {sh:i,ss:k,sp:j,sm:crnum})
            return crnum
          }else{
            this.$store.commit('addticketnum', {sh:i,ss:k,sp:j,sm:etnum})
            return etnum
          }
        }else if(num == -1){//从详情页进入或加减
          // console.log('line: 227-----'+this.value1)
          // console.log('line: 228-----i=='+i+' k=='+k+' j=='+j+' num=='+num)
          // console.log('line: 229-----'+this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].num)
          if(!this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].num){//从详情页进入或加减
            if(parseInt(this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].num) === 0){//减到0后不再改变
              // console.log('defsightnum= '+this.value1)
              return 0
            }else{//从详情页进入
              // console.log('line: 235-----adult= '+this.$route.params.adult+'  child=='+this.$route.params.child)
              let crnum = parseInt(this.$route.params.adult)
              let etnum = parseInt(this.$route.params.child)
              if(this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].ticket_type == 'TICKET_ADULT'){
                // console.log('line: 239---crnum==='+crnum+'--ticket_type=='+this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].ticket_type)
                this.$store.commit('addticketnum', {sh:i,ss:k,sp:j,sm:crnum})
                return crnum
              }else{
                // console.log('line: 243---etnum==='+etnum+'-----ticket_type=='+this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].ticket_type)
                this.$store.commit('addticketnum', {sh:i,ss:k,sp:j,sm:etnum})
                return etnum
              }
            }
          }else{
            // console.log('line: 249-----defsightnum= '+this.value1)
            if(this.value1){
              return this.$store.state.nget_details.trip_sights[i].sights[k].sight_products[j].num
            }else{
              return 0
            }
          }
        }else{//不买门票
          return 0
        }
      },
      maxsightnum: function (tickettype){
      	return 99;	//just to fix bug:http://10.18.0.100/bugfree/index.php/bug/969(【门票无法添加数量】即点击门票+无效)
        let crnum = parseInt(this.$route.params.adult)
        let etnum = parseInt(this.$route.params.child)
        if(tickettype == 'TICKET_ADULT'){
          return crnum
        }else{
          return etnum
        }

      },
      // 酒店库存数
      h_inentorynum: function(step, i, j) {
        // console.log(step+"|"+i+"|"+j);
        // console.log(parseInt(this.details.trip_hotels[parseInt(step)].hotels[parseInt(i)].hotel_products[parseInt(j)].inventory));
        return parseInt(this.details.trip_hotels[parseInt(step)].hotels[parseInt(i)].hotel_products[parseInt(j)].inventory)
      },
      //  入住酒店时间
      h_indate: function(step) {
        // console.log(step+"<==h_indate");
        var days = 0;
        step = parseInt(step);
        for (var i = 0; i < step; i++) {
          days += this.details.trip_hotels[i].day_num;
        }
        // console.log(getNewDay(this.$route.params.start_date, days));
        return getNewDay(this.$route.params.start_date, days);
      },
      //  离开酒店时间
      h_outdate: function(step) {
        // console.log(step+"<==h_outdate");
        var days = 0;
        step = parseInt(step) + 1;
        for (var i=0; i < step; i++){
          days += this.details.trip_hotels[i].day_num;
        }
        // console.log(getNewDay(this.$route.params.start_date, days));
        return getNewDay(this.$route.params.start_date, days);
      },
      // 默认床位数
      h_residencynum: function(i,k,j) {
        if(this.$route.params.flag == 0){//换酒店
          return parseInt(this.$store.state.nget_details.trip_hotels[i].hotels[k].hotel_products[j].num)
        } else if (this.$route.params.flag == 2){//换车
          let nums = this.$store.state.nget_details.trip_hotels[i].hotels[k].hotel_products[j].num
          if(nums){
            return nums
          }else{
            nums = parseInt((parseInt(this.$route.params.adult) + parseInt(this.$route.params.child) + 1)/2);
            this.$store.state.nget_details.trip_hotels[i].hotels[k].hotel_products[j].num = nums;
            return nums
          }
        } else {//详情进入确认订单页
          var nums = 0;
          if(j == 0)
            nums = parseInt((parseInt(this.$route.params.adult) + parseInt(this.$route.params.child) + 1)/2);
          else
            nums = 0;
          this.$store.state.nget_details.trip_hotels[i].hotels[k].hotel_products[j].num = nums;
          return nums;
        }
      },
      getnum: function(ftype,forder,fwho,fitem,num){
          // console.log(ftype+'  '+forder+'  '+fwho+'  '+fitem+'  '+num)
          if(ftype == 'car'){
            this.$store.commit('addcarnum', num)
            setDataToLocal("carnum", {"carnum":num})
          }else if(ftype == 'hotel'){
            this.$store.commit('addhotelnum', {th:forder,hp:fitem,hm:num})
          }else if(ftype == 'ticket'){
            this.$store.commit('addticketnum', {sh:forder,ss:fwho,sp:fitem,sm:num})
          }
        },
      // 确认行程数据更新
      fetchData: function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params={\"product_id\":" + parseInt(this.$route.params.id) + ",\"start_date\":\""+ this.$route.params.start_date +"\",\"version\":{\"appVersion\":\"1.0.0\",\"deviceType\":\"WKTRIP PC\"}}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          // appkey: 'b3b01c69cc8408593f708514a211b09f',
          nonce: nonce,
          timestamp: timestamp,
          params: {
            product_id: parseInt(this.$route.params.id),
            start_date: this.$route.params.start_date,
            version: {
              appVersion:'1.0.0',
              deviceType:'WKTRIP PC'
            }
          }
        }
        console.log(para)
        get_detail(para).then((res1) => {
          console.log('res1=', res1.data)
          if(res1.data.code != 0){
            alert(res1.data.msg)
          }else{
            this.res = this.set_init_data(res1)
            setDataToLocal("nget_details", this.res)
            this.$store.commit('nget_details', this.res.data)
          }
        })

      },
      set_init_data(res1){
        for(let i = 0; i < res1.data.trip_hotels.length; i++){
          res1.data.trip_hotels[i].hotels[0].hotel_products.splice(1,res1.data.trip_hotels[i].hotels[0].hotel_products.length - 1)
        }
        this.sight_length = res1.data.trip_sights.length
        if(this.sight_length > 0){
          if(this.$route.params.child <= 0){
            for(let i = 0; i < res1.data.trip_sights.length; i++){
              for(let j = 0; j < res1.data.trip_sights[i].sights.length; j++){
                for(let k = 0; k < res1.data.trip_sights[i].sights[j].sight_products.length; k++){
                  var ticket_obj = res1.data.trip_sights[i].sights[j].sight_products[k];
                  if(res1.data.trip_sights[i].sights[j].sight_products[k].ticket_type == 'TICKET_CHILDREN'){
                    res1.data.trip_sights[i].sights[j].sight_products.splice(k, 1)
                  }
                }
                if(res1.data.trip_sights[i].sights[j].sight_products.length == 0){
                  res1.data.trip_sights[i].sights.splice(j, 1)
                }
              }
              if(res1.data.trip_sights[i].sights.length == 0){
                res1.data.trip_sights.splice(i, 1)
              }
            }
          }
        }
        this.sight_length = res1.data.trip_sights.length
        if(res1.data.site_products.has_other == 1){
          this.car_more = true
        }else{
          this.car_more = false
        }
        return res1
      },
      // 下一步
      next: function () {
        // console.log('nextnextnext=='+this.value1)
        // console.log(this.$store.state.nget_details.trip_hotels)
        let hotel_params_str='', hotel_info_str='';
        let hotel_arr = [];
        let res = {};
        let ns = this.$store.state.nget_details.trip_hotels;
        let n = 0;
        for(let i=0;i<ns.length;i++){
          hotel_params_str == '';
          n = 0;
          // console.log('loop1==');
          for(let j = 0; j < ns[i].hotels.length; j++){
            // console.log('loop2==');
            res.hotel_id = ns[i].hotels[j].hotel_id;
            res.step = ns[i].step;
            let rooms = ns[i].hotels[j].hotel_products;
            let rooms_str='';
            hotel_info_str = '';
            for(let k = 0; k < rooms.length; k++){
              if(rooms[k].num == 0){
                  continue;
              }
              if(rooms_str == ''){
                  rooms_str = rooms[k].product_id +'_'+ rooms[k].num;
              }else{
                rooms_str += '|'+rooms[k].product_id +'_'+ rooms[k].num;
              }
              // console.log(rooms_str)

              if(hotel_info_str == ''){
                  hotel_info_str = '['+'{"id":"'+rooms[k].product_id+'","num":'+rooms[k].num+'}';
              }else{
                  hotel_info_str += ','+'{"id":"'+rooms[k].product_id+'","num":'+rooms[k].num+'}';
              }
              n++;
              // console.log(res)
            }
            if(n>0){
                hotel_info_str += ']';
                if(hotel_params_str == ''){
                  hotel_params_str = '[' +'{"step":'+res.step+',"hotel_id":"'+res.hotel_id+'","products":'+hotel_info_str+'}';
                }else{
                  hotel_params_str += ',' +'{"step":'+res.step+',"hotel_id":"'+res.hotel_id+'","products":'+hotel_info_str+'}';
                }
              hotel_arr.push({hotel_id:res.hotel_id, step:res.step, roomsinfo:rooms_str});
            }
          }
        }
        if(hotel_params_str != ''){
          hotel_params_str += ']';
        }
        if(hotel_params_str === ''){
          hotel_params_str = '[]'
        }

        let sight_param_str
        if(!this.value1){
          sight_param_str='[]';
        }else{
          sight_param_str='';
          let sights_arr = [];
          let sights_res = {};
          let sights_str='';
          let ns_trip_sights = this.$store.state.nget_details.trip_sights;
          let n_flag = 0;
          for(let i=0;i<ns_trip_sights.length;i++){
            n_flag = 0;
            // console.log('loop1==');
            for(let j = 0; j < ns_trip_sights[i].sights.length; j++){
              // console.log('loop2==');
              sights_res.sight_id = ns_trip_sights[i].sights[j].sight_id;
              sights_res.step = ns_trip_sights[i].step;
              let sight_products = ns_trip_sights[i].sights[j].sight_products;
              sights_str='';
              for(let k = 0; k < sight_products.length; k++){
                if(sights_str == ''){
                  sights_str = '['+'{"id":"'+sight_products[k].product_id+'","num":'+sight_products[k].num+'}';
                }else{
                  sights_str += ','+'{"id":"'+sight_products[k].product_id+'","num":'+sight_products[k].num+'}';
                }
                // console.log(sights_str)
                n_flag++;
                // console.log(sights_res)
              }
              if(n_flag>0){
                sights_str += ']';
                if(sight_param_str == ''){
                  sight_param_str = '[' +'{"step":'+sights_res.step+',"sight_id":"'+sights_res.sight_id+'","products":'+sights_str+'}';
                }else{
                  sight_param_str += ',' +'{"step":'+sights_res.step+',"sight_id":"'+sights_res.sight_id+'","products":'+sights_str+'}';
                }
              }
            }
          }
          if(sight_param_str != ''){
            sight_param_str += ']';
          }
        }
        if(sight_param_str === ''){
          sight_param_str = '[]'
        }
        // console.log("sight_param_str"+sight_param_str);
        // console.log("hotel_params_str"+sight_param_str);
        this.$store.commit('sight_param_str',sight_param_str)
        this.$store.commit('hotel_param_str',hotel_params_str)
        setDataToLocal("hotel_sight_param", {sight_param_str:sight_param_str,hotel_param_str:hotel_params_str})
        // console.log(sight_param_str);
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();
        let param
        if(localStorage.data){
          param = "{\"user_id\":" + this.userid + ",\"wkcoin_pay\":" + this.wkcoin + ",\"product_id\":" + this.$route.params.id + ",\"start_date\":\""+ this.$route.params.start_date +"\",\"adult_num\":"+ this.$route.params.adult +",\"children_num\":"+ this.$route.params.child +",\"site_products\":[{\"site_product_id\":"+this.$store.state.nget_details.site_products.product_id+",\"num\":"+this.$store.state.carnum+"}],\"hotels\":"+ hotel_params_str +",\"sights\":" + sight_param_str+ "}"
        }else{
          param = "{\"product_id\":" + this.$route.params.id + ",\"start_date\":\""+ this.$route.params.start_date +"\",\"adult_num\":"+ this.$route.params.adult +",\"children_num\":"+ this.$route.params.child +",\"site_products\":[{\"site_product_id\":"+this.$store.state.nget_details.site_products.product_id+",\"num\":"+this.$store.state.carnum+"}],\"hotels\":"+ hotel_params_str +",\"sights\":" + sight_param_str+ "}"
        }
        // console.log(param)
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params=" + param + "&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: param
        }
        console.log(para)
        calculate_order(para).then((res) =>{
          console.log('confirm_itinerary next calculate_order', res.data)
          if(res.data.code == 0){
            this.$store.commit('norder_calc', res.data)
            setDataToLocal("norder_calc", res.data)
            this.$router.push('/fill_order')
          }else{
            alert(res.data.msg)
          }
        })
      }
    },
    components: {
      counter
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
/*每项内容信息*/
.content{
  padding-top: 28px;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-left: 15px;
  /*background-color: pink;*/
  padding-bottom: 29px;
}
.content p{
  width: 690px;
  min-height: 30px;
  /*line-height: 30px;*/
  /*background-color: pink;*/
}
.content p .calculate-number{
  /* line-height:30px; */
  float: right;
}
/*用车或酒店数量信息*/
.content-number{
  float: right;
}
/*标题全称*/
.title{
  position: relative;
  font-size: 16px;
  font-weight: 900;
}

/*所含服务*/
.type{
  font-size: 14px;
  /*font-weight: 700;*/
  color: #666;
}
/*容器p*/
.type p{
  height: 30px;
  line-height: 30;
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
  line-height: 26px;
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
  padding-top:1px;
  /*background-color: yellow;*/
}
.btm .b-center p{
  width: 702px;
}
/*确认行程的每项*/
.btm .b-center .route-name,.self-driving-car,.hotel,.attractions-tickets,.contact-information{
  position: relative;
  width: 100%;
  margin-top: 30px;
  border: 1px solid #e5e5e5;
  border-bottom: 2px;
  border-top: 1px;
  background-color: #ffffff;
}
.btm .b-center .route-name p{
  width: 100%;
}
.hotel{
  border-bottom: 0;
}
/*确认行程的每项标题*/
.btm .b-center .route-name  h3,.self-driving-car  h3,.hotel  h3,.attractions-tickets h3,.contact-information h3{
  width: 100%;
  height: 44px;
  line-height: 44px;
  background-color: #f3f3f3;
  border-top: 1px solid #e5e5e5;
  font-weight: 900;
  padding-left: 50px;
}
/*确认形成的标题图*/
.btm .b-center .route-name  img,.self-driving-car  img,.hotel  img,.attractions-tickets img,.contact-information img{
  position: absolute;
  left: 15px;
  top: 7px;
  width: 29px;
  height: 29px;
}
/*下一步样式*/
.btm .b-center .next{
  margin-top: 30px;
  width: 100%;
  height: 40px;
  border:1px solid #e5e5e5;
  border-radius: 3px;
  background-color: #fff;
}
/*下一步按钮*/
.btm .b-center .next .next-button{
  display: block;
  float: right;
  width: 146px;
  height: 100%;
  background-color: #df0900;
  font-size: 20px;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
/*开始结束时间标签*/
.time-tag{
  width: 98px;
  height: 28px;
  border: 1px solid #dddddd;
  margin-left: 10px;
  line-height: 28px;
  padding: 3px 10px;
  padding-right: 10px;
}
.tag-date{
  width: 70px;
  font-family: "Microsoft YaHei UI";
  font-size: 12px;
  color: gray;
  font-weight: normal;
}
.tag-inout{
  width: 20px;
  height: 100%;
  color: #df0900;
  font-size: 13px;
  margin-left: 5px;
  font-weight: normal;
}
/*.contact-information .cinfo-content{*/
  /*width: 100%;*/
  /*height: 198px;*/
/*}*/
</style>
