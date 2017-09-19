<template>
  <div class="tranship">
    <!--文字标题begin-->
    <div class="tranship-title">
      <h3 style="font-size: 24px;font-weight: 500">更换车辆</h3>
      <!--换车信息begin-->
      <div class="tranship-info">
        <!--换车地址begin-->
        <div class="tranship-address">
          <span class="pick-address">{{get_city_name}}取车</span>
          <span class="return-address">{{get_city_name}}还车</span>
        </div>
        <!--换车地址end-->
        <!--租赁起始日期begin-->
        <div class="tranship-date">
          <span class="pick-date">{{start_date}}</span>
          <span class="days">{{day_num}}天</span>
          <span class="return-date">{{get_day_num}}</span>
        </div>
        <!--租赁起始日期end-->
      </div>
      <!--换车信息end-->
    </div>
    <!--文字标题end-->
    <!--更换车辆begin  background-color:red; -->
    <div class="car-img" style="position:relative;overflow:hidden;height:380px;">
      <!--车辆少于3居中容器begin-->
      <div :style="`position:absolute;top: `+topnum+`px`" class="wrapter">
        <div class="img-center" v-for="(ite, j) in list">
          <span style="height:345px;" v-for="(item,i) in ite" @click="selected_car(j*3+i)" class="tranship-replace">
            <!--车辆图片begin-->
            <img width="384" height="254" v-if="self_selected[j*3+i]" class="selected" src="../assets/comfirm-selected01.png" alt="">
            <p style="margin: 0"><img :src="item.image_url" alt="" width="384" height="254"></p>
            <!--车辆图片end-->
            <p style="margin-left:15px;margin-bottom:0px;" class="car-name">{{item.product_name}}</p>
            <p style="margin-left:15px;margin-bottom:5px;" class="car-type">{{item.transmission_name}}{{item.displacement}} | {{item.carriage}} | {{item.capacity}}座</p>
            <p style="margin-left:15px;margin-bottom:5px;" class="car-address">取车地点：{{item.site.address}}</p>
            <!--租车价格begin-->
            <span style="background-color: pink;">
            <span style="top:264px;" class="car-price"><span style="font-size: 20px">¥</span><span style="font-size: 24px">{{item.price}}</span><span style="color: #999;font-size: 18px">起</span></span>
            <!--租车价格end-->
            <!--费用说明begin-->
            <span class="cost-desc"  @click="getDialogVisible(i)">费用说明</span>
            <!--费用说明end-->
            <!--费用说明弹出层begin-->
            <el-dialog title="费用说明" :visible.sync="dialogVisible[i]">
              <div style="padding: 20px 40px; color: #333333;">
                <p style="font-size:22px;font-weight:bold;margin-bottom:50px;">{{item.product_name}}</p>
                <p style="padding-bottom:15px;border-bottom:1px solid #e5e5e5;font-weight:bold;font-size:22px;">费用包含</p>
                <p style="height:35px;line-height:35px;font-size:16px;" v-for="in_item in item.include_fee">{{in_item}}</p>
                <p style="padding-bottom:15px;border-bottom:1px solid #e5e5e5;margin-top:35px;font-weight:bold;font-size:22px;">费用不包含</p>
                <p style="height:35px;line-height:35px;font-size:16px;" v-for="not_in_item in item.exclude_fee">{{not_in_item}}</p>
                <p style="height:35px;line-height:35px;font-size:16px;">车辆押金 ¥{{item.car_deposit}} (门店支付，可退)</p>
                <p style="height:35px;line-height:35px;font-size:16px;">违章押金 ¥{{item.illegal_deposit}} (门店支付，可退)</p>
              </div>
            </el-dialog>
            <!--费用说明弹出层end-->
              </span>
          </span>

        </div>
      </div>
      <img @click.stop="changepage('zuo')" v-if="show_zuo" style="z-index:999;position:absolute;left:12px;top:75px;cursor: pointer" src="../assets/hotel_zuo.png">
      <img @click.stop="changepage('you')" v-if="show_you" style="z-index:999;position:absolute;right:12px;top:75px;cursor: pointer" src="../assets/hotel_you.png">
      <!--车辆少于3居中容器end-->
    </div>
    <!--更换车辆end-->
    <!--确认按钮容器begin-->
    <div class="confirm" style="margin-bottom:70px;">
      <span class="confirm-button" @click="changecar">
        确认更换
      </span>
    </div>
    <!--确认按钮容器end-->
  </div>
</template>
<script>
  import { onlyid,times,getNewDay } from '../comment/public'
  import { get_car_list } from '../data/api/api'
  import md5 from 'js-md5';   // md5引入

  export default {
    data () {
      return {
        list: [],
        pid: 10000002,
        car_id: 0,
        start_date: '2017-06-22',
        dialogTableVisible: false,
        dialogVisible: [],
        self_selected: [],
        select_item: 0,
        adult: 0,
        child: 0,
        day_num: 0,

        changelist: [],
        item_length: 0,
        show_zuo: false,
        show_you: true,
        curlen: 1,
        topnum: 0
      }
    },
    mounted () {
      // 组件创建完后获取数据，
      this.car_id = this.$route.params.car_id
      this.pid = this.$route.params.id
      this.adult = this.$route.params.adult
      this.child = this.$route.params.child
      this.start_date = this.$route.params.start_date
      this.day_num = this.$route.params.day_num
      this.fetchData()
    },
    computed: {
      get_day_num(){
        let end_t = parseInt(this.day_num) - 1
        return getNewDay(this.start_date, end_t)
        // return getNewDay(this.start_date, this.day_num)
      },
      get_city_name(){
        return this.$store.state.nget_details.city_name
      }
    },
    methods: {
      changecar(){
        this.$store.commit('changecar', this.changelist[this.select_item])
        this.$router.push({name:'confirm_itinerary',params:{id:this.pid,adult:this.adult,child:this.child,start_date:this.start_date,flag:2}})
      },
      selected_car(j){
        console.log(j)
        for(let i = 0; i < this.self_selected.length; i++){
          this.$set(this.self_selected, i, false)
          if(i == j){
            this.$set(this.self_selected, i, true)
            this.select_item = i
          }
        }
        console.log(this.self_selected)
      },
      getDialogVisible(i){
        for(let j = 0; j < this.dialogVisible.length; j++){
          if(i == j){
            this.$set(this.dialogVisible, j, true)
            continue;
          }
          this.$set(this.dialogVisible, j, false)
        }
      },
      fetchData(){
        let nonce = onlyid(32, 52);   //  生成唯一ID
        let timestamp = times();   // 生成时间戳
        let param = "{\"product_id\":"+this.pid+",\"start_date\":\""+this.start_date+"\"}";
        let para = {
          appid: '5101',
          sign: md5("appid=5101&nonce=" + nonce + "&params="+param+"&timestamp=" + timestamp + "&b3b01c69cc8408593f708514a211b09f"),
          nonce: nonce,
          timestamp: timestamp,
          params: param
        }
        //console.log(para)
        // 访问接口
        get_car_list(para).then((res) => {
          // 设置data
          console.log(res.data)
          let k = 0
          if(res.data.code != 0){
            alert(res.data.msg)
          }else{
            let tmp_list = []
            if(res.data.list[0].product_id != this.car_id){
              // console.log(res.data)
              tmp_list[0] = {}
              for(let i = 1; i < res.data.list.length; i++){
                tmp_list[i] = {}
                if(res.data.list[i].product_id == this.car_id){
                  tmp_list[i] = res.data.list[0]
                  tmp_list[0] = res.data.list[i]
                }else{
                  tmp_list[i] = res.data.list[i]
                }
              }
              // tmp_list[2] = res.data.list[0]
              // tmp_list[3] = res.data.list[0]
              // tmp_list[4] = res.data.list[1]
              // tmp_list[5] = res.data.list[1]
              // tmp_list[6] = res.data.list[0]
              // console.log('tmp_list----->',tmp_list)
            }else{
              tmp_list = res.data.list
              // tmp_list[2] = res.data.list[0]
              // tmp_list[3] = res.data.list[0]
              // tmp_list[4] = res.data.list[1]
              // tmp_list[5] = res.data.list[1]
              // tmp_list[6] = res.data.list[0]
              // console.log('tmp_list22222----->',tmp_list)
            }
            this.changelist = tmp_list

            let three_list = []
            let page_list = []
            let n,m
            for(let i = 0; i < tmp_list.length; i++){
              k++
              n = i%3
              m = parseInt(i/3)
              if(n == 0){
                page_list[m] = []
              }
              page_list[m][n] = tmp_list[i]
            }
            this.list = page_list
            this.item_length = this.list.length
            for(let j = 0; j < k; j++){
              this.$set(this.dialogVisible, j, false)
              if(j == 0){
                this.$set(this.self_selected, j, true)
                continue;
              }
              this.$set(this.self_selected, j, false)
            }
            this.checklength(this.curlen)
          }
        })
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
        this.topnum = len*(-390)
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
  /*更换车辆容器*/
  .tranship{
    margin: 0 auto;
    padding-top: 90px;
    width: 1218px;
    height: auto;
    /*background-color: pink;*/
  }
  /*更换车辆文字标题*/
  .tranship .tranship-title{
    margin: 0 auto;
    width: 375px;
    height: 132px;
    margin-bottom: 5px;
    /*background-color: yellow;*/
  }
  /*更换车辆大标题*/
  .tranship .tranship-title h3{
    width: 100%;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin-bottom: 35px;
  }
  /*换车信息容器*/
  .tranship .tranship-title .tranship-info{
    width: 364px;
    height: 74px;
    font-weight: 500;
    text-align: center;
    /*background-color: red;*/
  }
  /*换车信息地址*/
  .tranship .tranship-title .tranship-info .tranship-address{
    width: 100%;
    height: 37px;
    font-size: 16px;
    /*background-color: blue;*/
  }
  .pick-date,.return-date{
    width: 106px;
    height: 37px;
    line-height: 37px;
    font-size: 18px;
    color: #333;
  }
  .pick-address,.return-address{
    font-size: 16px;
    width: 106px;
    height: 37px;
    line-height: 37px;
    color: #666;
  }
  .pick-address,.pick-date{
    float: left;
  }
  .return-address,.return-date{
    float: right;

  }
  .days{
    /*width: 155px;*/
    height: 100%;
    color: #d00000;
    font-size: 18px;
  }
  /*更换车辆图*/
  .tranship .car-img{
    width: 100%;
    height: 380px;
    text-align: center;
    /*background-color: pink;*/
  }
  .wrapter{
    width: 1218px;
    /* background-color: red; */
    height: 380px;
    /* overflow:hidden; */
  }
  .tranship .car-img .img-center{
    display: inline-block;
    margin: 0 auto;
    /*width: 406px;*/
    /*height: 100%;*/
    text-align: left;
    /*background-color: red;*/
    height: 380px;
  }
  /*每个车辆图片及样式信息*/
  .tranship .car-img .img-center .tranship-replace{
    position: relative;
    display: inline-block;
    float: left;
    margin: 10px;
    width: 386px;
    height: 345px;
    border:1px solid #e6e6e6;
    cursor: pointer;
    /*background-color: yellow;*/
  }
  /*更换车辆图片*/
  .tranship .car-img .img-center .tranship-replace img{
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
  }
  /*车辆名称*/
  .tranship .car-img .img-center .tranship-replace .car-name{
    font-size: 16px;
    /*font-weight: 900;*/
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    color: #000;
  }
  /*车辆配置类别*/
  .tranship .car-img .img-center .tranship-replace .car-type{
    font-size: 14px;
    /*font-weight: 700;*/
    /*height: 25px;*/
    color: #666;
  }
  /*取车地点*/
  .tranship .car-img .img-center .tranship-replace .car-address{
    font-size: 12px;
    color: #666;
  }
  /*租车价格*/
  .tranship .car-img .img-center .tranship-replace .car-price{
    position: absolute;
    right: 0;
    /*bottom: 45px;*/
    width: 120px;
    height: 50px;
    color: #dc1111;
    /*font-weight: 700;*/
    text-align: center;
  }
  /*费用说明*/
  .tranship .car-img .img-center .tranship-replace .cost-desc{
    position: absolute;
    bottom: -33px;
    left: 15px;
    width: 85px;
    height: 33px;
    line-height: 33px;
    color: #666;
    /*font-weight: 700;*/
    font-size: 12px;
    cursor: pointer;
  }
  /*确认更换按钮容器*/
  .tranship .confirm{
    margin-top: 30px;
    padding-right: 42px;
    width: 100%;
    height: 45px;
    /*background-color: pink;*/
  }
  /*确认更换按钮*/
  .tranship .confirm .confirm-button{
    display: inline-block;
    width: 170px;
    height: 45px;
    background-color: #dc1111;
    color: #fff;
    font-size: 22px;
    /*font-weight: 700;*/
    float: right;
    line-height:45px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
