<template>
  <div class="rhotel">
    <!--文字标题begin-->
    <div class="rhotel-title">
      <h3>更换酒店</h3>
      <!--换酒店信息begin-->
      <div class="rhotel-info">
        <!--换酒店地址begin-->
        <div class="rhotel-address">
          <span class="pick-address">入住时间</span>
          <span class="pick-address2">{{city_name}}</span>
          <span class="return-address">离开时间</span>
        </div>
        <!--换酒店地址end-->
        <!--租赁起始日期begin-->
        <div class="rhotel-date">
          <span class="checkin-date">{{start_date}}</span>
          <span class="days">{{get_day_num}}晚</span>
          <span class="checkout-date">{{end_date}}</span>
        </div>
        <!--租赁起始日期end-->
      </div>
      <!--换酒店信息end-->
    </div>
    <!--文字标题end-->
    <!--更换酒店begin-->
    <div class="hotel-img" style="position:relative;overflow:hidden;height:380px;" >
      <!--酒店少于3居中容器begin-->
      <div :style="`position:absolute;top: `+topnum+`px`" class="wrapter">
        <div class="img-center" v-for="(ite, j) in list">
          <span class="rhotel-replace" v-for="(item, i) in ite">
            <router-link class="change-button" :to="{name:'grogshop',params:{pid:res_data.pid,hid:item.hotel_id,step:res_data.step,start_date:res_data.start_date,idx:res_data.idx,adult:res_data.adult,child:res_data.child}}" tag="a">
              <!--被选中状态框begin-->
              <img width="384" height="254" v-if="j == 0 && i == 0" class="selected" src="../assets/comfirm-selected01.png" alt="">
              <!--被选中状态框end-->
              <!--酒店图片begin-->
              <p><img :src="item.image_url" alt="" width="384" height="254"></p> <!-- 255 -->
              <!--酒店图片end-->
              <p class="hotel-name" style="margin-left:15px;margin-top:15px;color:#000000;font-size:18px;">{{item.hotel_name}}</p>
              <p class="hotel-rate" style="margin-left:15px;margin-top:10px;">
                <el-rate
                  v-model="hotel_rate[i]"
                  :max="hotel_rate[i]"
                  disabled
                  show-text
                  :colors="['#dc1111', '#dc1111', '#dc1111']"
                  text-color="#dc1111"
                  text-template>
                </el-rate>
              </p>
              <!--酒店价格begin-->
              <span class="hotel-price"><span style="font-size: 20px">¥</span><span style="font-size: 24px">{{item.price}}</span><span style="color: #666;font-size: 18px;margin-left: 5px;">起</span></span>
              <!--酒店价格end-->
            </router-link>
          </span>
        </div>
      </div>
      <img @click.stop="changepage('zuo')" v-if="show_zuo" style="z-index:999;position:absolute;left:12px;top:75px;" src="../assets/hotel_zuo.png">
      <img @click.stop="changepage('you')" v-if="show_you" style="z-index:999;position:absolute;right:12px;top:75px;" src="../assets/hotel_you.png">
      <!--酒店少于3居中容器end-->
    </div>
    <!--更换酒店辆end-->
  </div>
</template>
<script>
  import { onlyid,times,getNewDay } from '../comment/public'
  import { get_hotel_list } from '../data/api/api'
  import md5 from 'js-md5';   // md5引入
  export default {
    data() {
      return {
        pid: 10000050, //产品id
        hid: 10000031, //酒店id
        step: 2,//第几个酒店
        start_date: "2017-06-22",//入住时间
        idx: 0,// 酒店下标
        adult: 1,
        child: 2,


        day_num: 0,//总的入住时间
        end_date: "",//离开时间
        list: [],// 酒店列表
        hotel_rate: [],//星级
        city_name: '',

        item_length: 0,
        show_zuo: false,
        show_you: true,
        curlen: 1,
        topnum: 0
      }
    },
    computed: {
      res_data(){
        return {pid:this.pid,hid:this.hid,step:this.step,start_date:this.start_date,idx:this.idx,adult:this.adult,child:this.child}
      },
      get_day_num(){
        this.day_num = this.$store.state.nget_details.trip_hotels[this.idx].day_num
        this.city_name = this.$store.state.nget_details.city_name
        this.end_date = getNewDay(this.start_date, this.day_num)
        return this.day_num
      }
    },
    mounted () {
      // 组件创建完后获取数据，
      this.hid = this.$route.params.hotel_id
      this.pid = this.$route.params.id
      this.idx = this.$route.params.index
      this.step = this.$route.params.step
      this.adult = this.$route.params.adult
      this.child = this.$route.params.child
      this.start_date = this.$route.params.start_date
      this.fetchData()
    },
    methods:{
      fetchData: function(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        // console.log(this.pid)
        let param = "{\"product_id\":"+this.pid+",\"step\":"+this.step+",\"start_date\":\""+this.start_date+"\",\"image_size\":\"L\"}";
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+param+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          // appkey: 'b3b01c69cc8408593f708514a211b09f',
          nonce: nonce,
          timestamp: timestamp,
          params: param
        }
        console.log(para)
        // 访问接口
        get_hotel_list(para).then((res) => {
          // 设置data
          console.log(res.data)
          if(res.data.code != 0){
            alert(res.data.code+' '+res.data.msg)
          }else{
            let tmp_list = []
            if(res.data.list[0].hotel_id != this.hid){
              // console.log(res.data)
              tmp_list[0] = {}
              for(let i = 1; i < res.data.list.length; i++){
                tmp_list[i] = {}
                if(res.data.list[i].hotel_id == this.hid){
                  tmp_list[i] = res.data.list[0]
                  tmp_list[0] = res.data.list[i]
                }else{
                  tmp_list[i] = res.data.list[i]
                }
              }
            }else{
              tmp_list = res.data.list
            }

            let page_list = []
            let n,m
            for(let i = 0; i < tmp_list.length; i++){
              n = i%3
              m = parseInt(i/3)
              if(n == 0){
                page_list[m] = []
              }
              page_list[m][n] = tmp_list[i]
            }
            this.list = page_list
            console.log(this.list)
            this.item_length = this.list.length
            for(let i = 0; i < this.list.length; i++){
              for(let j = 0; j < this.list[i].length; j++){
                this.hotel_rate[3*i+j] = this.checkrate(this.list[i][j].level)
              }
            }
            this.checklength(this.curlen)
          }
        })
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
      changepage(direction){
        if(direction == 'zuo'){
          this.checklength(--this.curlen)
        }else{
          this.checklength(++this.curlen)
        }
      },
      checklength(len){
        if(this.item_length == 1){
          this.show_zuo = false
          this.show_you = false
        }else if(len == 1){
          this.show_zuo = false
          this.show_you = true
        }else if(len == this.item_length){
          this.show_zuo = true
          this.show_you = false
        }else{
          this.show_zuo = true
          this.show_you = true
        }
        len--
        this.topnum = len*(-380)
      }
    }
  }
</script>
<style scoped>
  *{
    border:0;
    padding: 0;
  }
  /*汽车被选中状态框*/
  .selected{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  /*更换酒店辆容器*/
  .rhotel{
    margin: 0 auto;
    padding-top: 90px;
    width: 1218px;
    height: auto;
    /*background-color: pink;*/
  }
  /*更换酒店辆文字标题*/
  .rhotel .rhotel-title{
    margin: 0 auto;
    width: 375px;
    height: 132px;
    /*background-color: yellow;*/
  }
  /*更换酒店辆大标题*/
  .rhotel .rhotel-title h3{
    width: 100%;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin-bottom: 35px;
  }
  /*换酒店信息容器*/
  .rhotel .rhotel-title .rhotel-info{
    min-width: 380px;
    height: 74px;
    font-weight: 500;
    text-align: center;
    /*background-color: red;*/
  }
  /*换酒店信息地址*/
  .rhotel .rhotel-title .rhotel-info .rhotel-address{
    width: 100%;
    height: 37px;
    /*background-color: blue;*/
  }
  .return-address,.checkin-date,.checkout-date{
    width: 106px;
    height: 37px;
    line-height: 37px;
  }
  .pick-address{
    width: 106px;
    height: 37px;
    line-height: 37px;
    text-align:center;
  }
  .pick-address2{
    min-width: 165px;
    height: 37px;
    line-height: 37px;
    text-align:center;
  }
  .pick-address2,.checkin-date{
    float: left;
  }
  .pick-address,.return-address{
    font-size: 16px;
    color: #666;
  }
  /*入住日期*/
  .pick-address,.checkin-date{
    float: left;
  }
  .checkin-date,.checkout-date{
    font-size: 18px;
    color: #333;
  }
  /*离店日期*/
  .return-address,.checkout-date{
    float: right;
  }
  /*天数样式*/
  .days{
    /*width: 155px;*/
    height: 100%;
    color: #d00000;
    font-size: 18px;
  }
  /*更换酒店辆图*/
  .rhotel .hotel-img{
    width: 100%;
    height: 380px;
    text-align:center;
    /* background-color: pink; */
  }
  .rhotel .hotel-img .img-center{
    margin: 0 auto;
    /*width: 100%;*/
    height: 100%;
    /*background-color: red;*/
  }
  /*每个酒店图片及样式信息*/
  .rhotel .hotel-img .img-center .rhotel-replace{
    position: relative;
    display: inline-block;
    float: left;
    margin: 10px;
    width: 386px;
    height: 353px;
    border:1px solid #e6e6e6;
    /*background-color: yellow;*/
  }
  /*更换酒店辆图片*/
  .rhotel .hotel-img .img-center .rhotel-replace img{
    width: 100%;
  }
  /*酒店名称*/
  .rhotel .hotel-img .img-center .rhotel-replace .hotel-name{
    font-size: 23px;
    /*font-weight: 900;*/
    height: 15px;
    /*margin-bottom: 10px;*/
  }
  /*评分星位置*/
  .rhotel .hotel-img .img-center .rhotel-replace .hotel-rate{
    /*background-color: pink;*/
    height: 40px;
    padding-top: 12px;
   }
  .el-rate__icon{
    font-size: 16px;
  }
  /*酒店价格*/
  .rhotel .hotel-img .img-center .rhotel-replace .hotel-price{
    position: absolute;
    right: 0;
    bottom: 54px;
    width: 120px;
    height: 30px;
    color: #dc1111;
    /*font-weight: 700;*/
    text-align: center;
  }
  /*确认更换按钮容器*/
  .rhotel .confirm{
    padding-right: 42px;
    width: 100%;
    height: 45px;
    /*background-color: pink;*/
  }
  /*确认更换按钮*/
  .rhotel .confirm .confirm-button{
    display: inline-block;
    width: 170px;
    height: 45px;
    background-color: #dc1111;
    color: #fff;
    font-size: 22px;
    font-weight: 900;
    float: right;
    line-height:45px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
  .wrapter{
    width: 1218px;
    /* background-color: red; */
    height: 380px;
    /* overflow:hidden; */
  }
  .img-center{
    display: inline-block;
    margin: 0 auto;
    /* height: 100%; */
    text-align: left;
    height: 380px;
  }
  .change-button{
    text-decoration:none;
  }
</style>
