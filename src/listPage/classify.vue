<template>
  <div class="classify">
    <div class="cf-top" ></div>
    <div class="classify-cf">
      <div class="cf cf-one">
        <div class="tit">游玩城市:</div>
          <span @click="city_all" :class="{ selected: isAllSelected(this.destinations)}">全部</span>
          <span v-for="city in page" @click="getName(city.name)" :class="{ selected: isSelected(city.name)}">{{ city.name }}</span>
      </div>
      <div class="cf">
        <div class="tit">出行天数:</div>
          <span @click="day_all" :class="{ selected: isAllDay(this.max_day_num,this.min_day_num)}">全部</span>
          <span v-for="day in days" @click="getDay(day.max_day_num,day.min_day_num)" :class="{ selected: isDay(day.max_day_num,day.min_day_num)}">{{ day.content }}</span>
      </div>
      <div class="cf">
        <div class="tit">价格区间:</div>
          <span @click="price_all" :class="{ selected: isAllPrice(this.min_price,this.max_price)}">全部</span>
          <span v-for="price in price" @click="getPrice(price.min_price,price.max_price)" :class="{ selected: isPrice(price.min_price,price.max_price)}">{{ price.content }}</span>
      </div>
      <div class="cf">
        <div class="tit">适合人群:</div>
        <span @click="type_all" :class="{ selected: isAllType(this.themes)}">全部</span>
        <span v-for="type in type" @click="getType(type.category_id)" :class="{ selected: isType(type.category_id)}">{{ type.description }}</span>
      </div>
    </div>
    <div class="cf-sort">
      <div class="hover" @click="Default_sort">默认排序</div>
      <div>价格
        <p class="arrows">
          <span class="arr-top hover" @click="sortPrice_max"></span>
          <span class="arr-bottom hover" @click="sortPrice_min"></span>
        </p>
      </div>
      <!--<div>发布日期-->
      <!--<p class="arrows">-->
      <!--<span class="arr-top"></span><span class="arr-bottom"></span>-->
      <!--</p>-->
      <!--</div>-->
    </div>
  <div v-if="no_haslist">
    <div class="all-list">
      <div class="classify-list">
        <div v-for="(item,index) in classify" class="classify-li">
          <div class="cd-list-img">
            <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a">
              <img :src="item.image_url" alt=""/>
            </router-link>
            <span :class="shehua_arr[index]" ><span class="test">{{ item.special_tags.title }}</span></span>
            <div></div>
          </div>
          <div class="cd-list-text">
            <p class="cd-list-title">
              <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a">
                {{ item.product_name }}
              </router-link>
            </p>
            <p class="cd-list-type">
              <span>{{item.type_name}}</span>
              <span>{{item.city_name}}出发</span>
              <span>{{item.day_num}}天{{item.night_num}}夜</span>
            </p>
            <p class="advantage">{{ item.advantage }}</p>
            <p class="cd-list-label"><span v-for="label in item.tags">{{ label }}</span></p>
            <p class="cd-list-money"><span>¥<b>{{ item.min_price }}</b></span>起</p>
            <router-link :to="{name:'self_driving',params:{id:item.product_id}}" tag="a"><div class="cd-list-btn">查看详情</div></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="classify-more">
        <span v-if="show_more" @click="get_more_list">查看更多 >></span>
        <span v-if="show_noMore" @click="get_more_list" class="no-more">没有更多了</span>
    </div>
  </div>
    <div class="no-list" v-if="no_list">
      <img src="../assets/no-list.png" alt=""/>
    </div>
  </div>
</template>

<script>
  import { homeList,get_detail, order_add_api, get_list_api} from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  import { onlyid,times } from '../comment/public'

//let base = "http://test-api.wktrip.com";
//var get_list_api = base+'/product/get_list';
//var order_add_api = base + '/order/add';

  export default {
    name: 'classify',
    data () {
    return {
      page:[],
      days:[],
      price:[],
      type:[],
      classify:[],
      destinations:[],
      min_day_num:0,
      max_day_num:999,
      min_price:0,
      max_price:100000000,
      themes:[],
      page_num:1,
      begin_classify:[],
      more_classify:[],
      number:10,
      show_more:true,
      show_noMore:false,
      shehua_arr:[],
      no_list:false,
      no_haslist:true,
    }
  },
	created(){
    	console.log('classify -> created');
  },
  mounted(){
    this.get_type()     //获取排序选项信息
    this.get_list()     //获取默认列表

  },
  methods:{
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
    isSelected:function(ele){
      var arr=this.destinations
      if(arr.toString().indexOf(ele)>-1)
        return true;  //存在
      else
        return false; //不存在
    },
    isAllSelected:function(destinations){
      var arr=destinations
      if(arr.length > 0 ){
        return false
      }else{
        return true
      }
    },
    isDay:function(ele1,ele2){
      if(ele2 ==this.min_day_num && ele1 ==this.max_day_num){
        return true
      }else{
        if(ele2 ==this.min_day_num && ele1 ==undefined){
          return true
        }else{
          return false
        }
      }
    },
    isAllDay:function(ele1,ele2){
      if(ele2 == 0 && ele1 == 999){
        return true
      }else{
        return false
      }
    },
    isPrice:function(min,max){
      if(min == this.min_price && max == this.max_price){
        return true
      }else{
        if(min == this.min_price && max == undefined){
          return true
        }else{
          return false
        }
      }
    },
    isAllPrice:function(min,max){
      if(min == 0 && max == 100000000){
        return true
      }else{
        return false
      }
    },
    isType:function(type){
      var arr = this.themes
      if(arr.toString().indexOf(type)>-1)
        return true;  //存在
      else
        return false; //不存在
    },
    isAllType:function(type){
      var arr = type;
      if(arr.length > 0 ){
        return false
      }else{
        return true
      }
    },
    getName:function(city){                      //目的地筛选
      var arr=this.destinations
      var length=arr.length
      var flag = true
      if(length == 0){
        arr.push("\""+city+"\"");
      }else{
        for(var i= 0;i<length;i++){
          if("\""+city+"\"" == arr[i]){
            flag=false
            arr.splice(i,1)
          }
        }
        if(flag){
          arr.push("\""+city+"\"")
        }else{
        }
      }
      this.get_list();
    },
    city_all:function(){                         //目的地筛选全部
      this.destinations=[];
      this.get_list();
    },
    getDay:function(max_day_num,min_day_num){    //时间筛选
      if(min_day_num ==15){
        this.min_day_num = min_day_num;
        this.max_day_num = 999;
      }else{
        this.min_day_num = min_day_num;
        this.max_day_num = max_day_num;
      }
      this.get_list();
    },
    day_all:function(){                          //时间筛选全部
      this.min_day_num = 0;
      this.max_day_num = 999;
      this.get_list();
    },
    getPrice:function(min_price,max_price){      //价格筛选
      if(min_price == 20000){
        this.min_price = min_price;
        this.max_price = 100000000;
      }else{
        this.min_price = min_price;
        this.max_price = max_price;
      }
      this.get_list();
    },
    price_all:function(){                        //价格筛选全部
      this.min_price = 0,
      this.max_price = 100000000,
      this.get_list();
    },
    getType:function(category_id){                //类型筛选
      var arr=this.themes
      var length=arr.length
      var flag=true
      if(length == 0){
        arr.push("\""+category_id+"\"");
      }else{
        for(var i= 0;i<length;i++){
          if("\""+category_id+"\"" == arr[i]){
            flag=false
            arr.splice(i,1)
          }
        }
        if(flag){
          arr.push("\""+category_id+"\"")
        }else{
        }
      }
//          console.log(arr)
      this.get_list();
    },
    type_all:function(){                        //价格筛选全部
      this.themes = [];
      this.get_list();
    },
    sortPrice_max:function(){                       //按照价格排序 ----max
      this.classify.sort(function (o1, o2) {
        return o2.min_price - o1.min_price;
      })
      let tag = ''
      for(let i = 0; i < this.classify.length; i++){
        this.shehua_arr[i] = {tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false}
        this.shehua_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
        if(!this.classify[i].special_tags) {
          this.classify[i].special_tags = {}
          this.classify[i].special_tags.title = ''
          this.classify[i].special_tags.color = ''
        }
        tag = this.getclassbycolor(this.classify[i].special_tags.color,this.classify[i].special_tags.title)
        if(tag){
          this.shehua_arr[i][tag] = true
        }
      }
    },
    sortPrice_min:function(){                        //按照价格排序 -----min
      this.classify.sort(function (o1, o2) {
        return o1.min_price - o2.min_price;
      })
      let tag = ''
      for(let i = 0; i < this.classify.length; i++){
        this.shehua_arr[i] = {tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false}
        this.shehua_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
        if(!this.classify[i].special_tags) {
          this.classify[i].special_tags = {}
          this.classify[i].special_tags.title = ''
          this.classify[i].special_tags.color = ''
        }
        tag = this.getclassbycolor(this.classify[i].special_tags.color,this.classify[i].special_tags.title)
        if(tag){
          this.shehua_arr[i][tag] = true
        }
      }
    },
    get_type:function(){
      let nonce = onlyid(32, 52);   //  生成唯一ID
      let timestamp = times();   // 生成时间戳
      let params ={
        appid: '5101',
        sign: md5("appid=5101&nonce=" + nonce + "&params={\"channel_code\":\"LUXURY\",\"page\":1,\"page_size\":1}&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
        nonce: nonce,
        timestamp: timestamp,
        params:{
          channel_code: "LUXURY",
          page: 1,
          page_size: 1,
        }
      };
      homeList(params).then((res) => {
      this.page = res.data.condition.destinations
      this.days = res.data.condition.day_nums
      this.price = res.data.condition.prices
      this.type = res.data.condition.categories
    });
  },
  get_list:function(){
    this.page_num = 1;
    let nonce = onlyid(32, 52);   //  生成唯一ID
    let timestamp = times();   // 生成时间戳
    let pap = "{\"max_price\":"+ this.max_price +",\"min_price\":"+ this.min_price +",\"max_day_num\":"+ this.max_day_num +",\"min_day_num\":"+ this.min_day_num +",\"themes\":["+ this.themes +"],\"destinations\": ["+this.destinations+"],\"channel_code\":\"LUXURY\",\"sort\":\"4\",\"page\":1,\"page_size\":20,\"image_size\":\"L\"}"
    let params ={
      appid: '5101',
      sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
      nonce: nonce,
      timestamp: timestamp,
      params:pap
    };
    var qs = require('qs');
    var self = this;
    //get_list_api
//    this.$http.post('http://api.wktrip.com/product/get_list',
    this.$http.post(get_list_api,
      qs.stringify(params)
    ).then(function (res) {
        self.begin_classify = res.data.products;
        self.classify = res.data.products;
        if(self.classify == undefined){
          self.no_list = true;
          self.no_haslist = false;
        }else{
          self.no_list = false;
          self.no_haslist = true;
        }
        if(self.classify.length<20 ||self.classify == undefined){
          self.show_noMore = true;
          self.show_more = false;
        }else{
          self.show_noMore = false;
          self.show_more = true;
        }
        let tag = ''
        for(let i = 0; i < self.classify.length; i++){
          self.shehua_arr[i] = {tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false}
          self.shehua_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
          if(!self.classify[i].special_tags) {
            self.classify[i].special_tags = {}
            self.classify[i].special_tags.title = ''
            self.classify[i].special_tags.color = ''
          }
          tag = self.getclassbycolor(self.classify[i].special_tags.color,self.classify[i].special_tags.title)
          if(tag){
            self.shehua_arr[i][tag] = true
          }
        }
      }).catch(function (error) {
      },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  },





  get_more_list:function(){                //加载更多列表
    this.page_num = this.page_num+1
    console.log(this.page_num);
    let nonce = onlyid(32, 52);   //  生成唯一ID
    let timestamp = times();   // 生成时间戳
    let pap = "{\"max_price\":"+ this.max_price +",\"min_price\":"+ this.min_price +",\"max_day_num\":"+ this.max_day_num +",\"min_day_num\":"+ this.min_day_num +",\"themes\":["+ this.themes +"],\"destinations\": ["+this.destinations+"],\"channel_code\":\"LUXURY\",\"sort\":\"4\",\"page\":"+this.page_num+",\"page_size\":20,\"image_size\":\"L\"}"
    let params ={
      appid: '5101',
      sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
      nonce: nonce,
      timestamp: timestamp,
      params:pap
    };
    var qs = require('qs');
    var self = this;
//    this.$http.post('http://api.wktrip.com/product/get_list',
    this.$http.post(get_list_api,
      qs.stringify(params)
    ).then(function (res) {
        self.more_classify = res.data.products;
        if(self.more_classify != undefined){
          var i;
          for(i=0;i<self.more_classify.length;i++){
            self.classify.push(self.more_classify[i]);
          }
          if(i<20){
            self.show_noMore = true;
            self.show_more = false;
          }else{
            self.show_noMore = false;
            self.show_more = true;
          }
        }else{
          self.show_noMore = true;
          self.show_more = false;
        };
        let tag = ''
        for(let i = 0; i < self.classify.length; i++){//class="tags"
          self.shehua_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
          if(!self.classify[i].special_tags) {
            self.classify[i].special_tags = {}
            self.classify[i].special_tags.title = ''
            self.classify[i].special_tags.color = ''
          }
          tag = self.getclassbycolor(self.classify[i].special_tags.color,self.classify[i].special_tags.title)
          if(tag){
            self.shehua_arr[i][tag] = true
          }
        }
      }).catch(function (error) {
      },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  },
    Default_sort:function(){
        this.number = this.page_num*20
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let pap = "{\"max_price\":"+ this.max_price +",\"min_price\":"+ this.min_price +",\"max_day_num\":"+ this.max_day_num +",\"min_day_num\":"+ this.min_day_num +",\"themes\":["+ this.themes +"],\"destinations\": ["+this.destinations+"],\"channel_code\":\"LUXURY\",\"sort\":\"4\",\"page\":1,\"page_size\":"+this.number+",\"image_size\":\"L\"}"
        let params ={
            appid: '5101',
            sign: md5("appid=5101&nonce=" + nonce + "&params="+pap+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
            nonce: nonce,
            timestamp: timestamp,
            params:pap
        };
      var qs = require('qs');
      var self = this;
//      this.$http.post('http://api.wktrip.com/product/get_list',
	    this.$http.post(get_list_api,
        qs.stringify(params)
      ).then(function (res) {
          self.classify = res.data.products;
          if(self.classify == undefined){
            self.no_list = true;
            self.no_haslist = false;
          }else{
            self.no_list = false;
            self.no_haslist = true;
          };
          if(self.classify.length<20 ||self.classify == undefined){
            self.show_noMore = true;
            self.show_more = false;
          }else{
            self.show_noMore = false;
            self.show_more = true;
          }
          let tag = ''
          for(let i = 0; i < self.classify.length; i++){
            self.shehua_arr[i] = {tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false}
            self.shehua_arr.push({tags:true,tags_1:false,tags_2:false,tags_3:false,tags_4:false,tags_5:false,tags_6:false,tags_7:false,tags_8:false})
            if(!self.classify[i].special_tags) {
              self.classify[i].special_tags = {}
              self.classify[i].special_tags.title = ''
              self.classify[i].special_tags.color = ''
            }
            tag = self.getclassbycolor(self.classify[i].special_tags.color,self.classify[i].special_tags.title)
            if(tag){
              self.shehua_arr[i][tag] = true
            }
          }
        }).catch(function (error) {
        },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    },
  },

  }
</script>

<style scoped>
  .no-list{
    width: 401px;
    height: 250px;
    margin: 0 auto;
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
  .advantage{
    width: 80%;
    height: 20px;
    overflow: hidden;  /*溢出隐藏*/
    text-overflow: ellipsis; /*以省略号...显示*/
    white-space: nowrap;  /*强制不换行*/
    color: #333333;
  }
  .hover{
    cursor: pointer;
  }
  .selected{
    background: #d00000;
    color: #FFF !important;
  }
  .classify{
    width: 100%;
    background: #FFF;
  }
  .cf-top{
    width: 100%;
    background: rgba(221, 221, 221, 0.57);
    height: 55px;
  }
  .classify-cf{
    width: 1200px;
    margin: 0 auto;
  }
  .cf{
    margin:10px 0 10px 0;
  }
  .cf-one{
    margin-top: 40px;
  }
  .tit{
    display: inline-block;
    font-weight: bold;
    margin-left: 20px;
  }
  .cf span{
    display: inline-block;
    padding: 0 5px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 2px;
    color: #333333;
  }
  .cf:nth-last-child(1){
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(177, 177, 177, 0.57);
  }
  .cf-sort{
    width: 1200px;
    margin: 0 auto;
    height: 95px;
    /*border-bottom: 1px solid rgba(177, 177, 177, 0.57);*/
  }
  .cf-sort div{
    display: inline-block;
    margin-top: 40px;
    padding: 0 20px;
    border-right: 1px solid rgba(177, 177, 177, 0.57);
    height: 15px;
    line-height: 15px;
    position: relative;
  }
  .cf-sort>div:nth-last-child(1){
    border-right: 1px solid rgba(255, 255, 255, 0);
  }
  .arrows{
    width: 10px;
    height: 30px;
    position: absolute;
    right: 7px;
    top: -8px;
  }
  .arrows .arr-top{
    display: inline-block;
    border: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid #000000;
  }
  .arrows .arr-bottom{
    display: inline-block;
    border: 5px solid rgba(255, 255, 255, 0);
    border-top: 5px solid #000000;
  }
  .all-list{
    width: 1200px;
    margin: 0 auto;
  }



  /*---------------------*/
  .classify-list{
    margin-bottom: 20px;
  }
  .classify-li {
    padding: 30px 0 30px 0;
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(177, 177, 177, 0.57);
    overflow: hidden;
  }

  .cd-list-img {
    width: 300px;
    height: 210px;
    float: left;
    position: relative;
    overflow: hidden;
  }

  .cd-list-img img {
    width: 100%;
    height: 100%;
  }

  .cd-list-text {
    float: left;
    margin-left: 15px;
    width: 870px;
  }

  .cd-list-title {
    font-size: 20px;
    font-weight: bold;
    width: 80%;
    height: 28px;
    overflow: hidden;  /*溢出隐藏*/
    text-overflow: ellipsis; /*以省略号...显示*/
    white-space: nowrap;  /*强制不换行*/
  }
  .cd-list-title a:hover{
    color: #d00000;
  }
  .cd-list-title a{
    text-decoration: none;
    color: #333333;
  }
  .cd-list-description{
    width: 100%;
    height: 22px;
    overflow: hidden;
  }
  .cd-list-type {
    margin: 20px 0 20px -15px;
    width: 100%;
    height: 22px;
  }

  .cd-list-type span {
    display: inline-block;
    padding: 0 15px;
    line-height: 15px;
    border-right: 1px solid #ada9ad;
    height: 15px;
    color: #333333;
  }

  .cd-list-type span:nth-last-child(1) {
    border: none;
  }

  .cd-list-label {
    margin: 20px 0 12px 0;
    width: 100%;
    height: 25px;
    color: #666;
  }

  .cd-list-label span {
    display: inline-block;
    border: 1px solid rgba(0, 0, 0, 0.10);
    padding: 3px 15px;
    margin-right: 10px;
    font-size: 12px;
  }

  .cd-list-money {
    margin-top: 0px;
    color: #747474;
    font-size:15px;
    width: 100%;
    height: 42px;
  }

  .cd-list-money span {
    color: #d00000;
    font-size: 20px;
  }

  .cd-list-money span b {
    font-size: 34px;
    font-weight: normal !important;
  }

  .cd-list-btn {
    background: #d00000;
    width: 150px;
    color: #FFF;
    text-align: center;
    height: 40px;
    position: absolute;
    right: 50px;
    bottom: 30px;
    line-height: 40px;
    font-size: 20px;
    /*font-weight: bold;*/
    border-radius: 5px;
  }
  .cd-list-btn a{
    text-decoration: none;
    color: white;
  }
  .classify-more{
    padding:20px 0 50px 0;
    text-align: center;
    width: 100%;
  }
  .classify-more span{
    cursor: pointer;
    color: #696969;
  }
</style>

