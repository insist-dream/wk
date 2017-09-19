<template>
  <div class="self-driving">
    <!--详情及选项begin-->
    <div class="sd-form-select">
      <!--详情上部分begin-->
      <div class="form-top">
        <!--详情左侧轮播begin-->
        <div class="left-silder">
          <!--<img width="100%" height="100%" src="../assets/sliders.png" alt="">-->
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!--详情左侧轮播end-->
        <!--详情右侧信息begin-->
        <div class="right-silder">
          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td colspan="2" height="70">
                <span class="titles">景洪市-勐罕镇-勐腊县-磨憨口岸5日自驾游全程约350公里，全程约350公里景洪市-勐</span>
              </td>
            </tr>
            <tr>
              <td colspan="2" height="70">
                <span style="font-size: 25px;color: red;font-weight: 900">¥</span>&nbsp;<span style="font-size: 40px;color: red;font-weight: 500">1999</span>
                <span style="font-size: 14px;">起</span>
                <span style="font-size: 12px;color: #d1d1d1;font-family: 'Microsoft YaHei UI Light';text-decoration: dashed">&nbsp;&nbsp;&nbsp;起价说明</span>
              </td>
            </tr>
            <tr>
              <td width="83" height="35">
                <span class="category">&nbsp;出&nbsp;发&nbsp;地 : </span>
              </td>
              <td>
                <span class="content">昆明</span>
              </td>
            </tr>
            <tr>
              <td height="35">
                <span class="category">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型 : </span>
              </td>
              <td>
                <span class="content">自助自驾</span>
              </td>
            </tr>
            <tr>
              <td height="35">
                <span class="category">行程天数 : </span>
              </td>
              <td>
                <span class="content">6天7晚</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="category">产品亮点 : </span>
              </td>
              <td>
                <span class="desc">汇聚北京高消费人群的高档别墅区和公寓区东方普罗旺斯、麦卡伦地、温哥华森林、名佳花园、渡上等遍布于此，去往奥运村、首都国际机场第三航站楼、新国际会展中心，以及北京最大的亚运村汽车交易市场十分便利。去往奥运村、首都国际机场第三航站楼、新国际会展中心，以及北京最大的亚运村汽车交易市场十分便利。</span>
              </td>
            </tr>

          </table>
        </div>
        <!--详情右侧信息end-->
      </div>
      <!--详情上部分end-->
      <!--详情下部分begin-->
      <div class="form-bottom">
        <!--左侧日历插件begin-->
        <div class="calendar">
          <img width="100%" src="../assets/calendar.png" alt="">
        </div>
        <!--左侧日历插件end-->
        <!--右侧选择预定begin-->
        <div class="booked">
          <p class="titles" style="margin-top: 40px;">选择出游日期及人数</p>
          <p class="category">出发日期&nbsp;&nbsp;&nbsp;  2017-06-18</p>
          <p class="category num_cal">出发人数&nbsp;&nbsp;&nbsp;
            成人
            <counter></counter>
            &nbsp;&nbsp;儿童
            <!--<el-input-number size="small" v-model="num2" @change="handleChange" :min="1" :max="10"></el-input-number>-->
            <counter></counter>
            <span class="desc"> 2-12周岁不含</span></p>
          <p class="category">单房差&nbsp;&nbsp;&nbsp;  <counter></counter></p>
          <p class="category">车位差&nbsp;&nbsp;&nbsp;  <counter></counter></p>
          <p>
            <button class="booked-btn">立即预订</button>
          </p>
        </div>
        <!--右侧选择预定begin-->
      </div>
      <!--详情下部分begin-->
    </div>
    <!--详情信息及其选择end-->
    <!--行程安排begin-->
    <div>
      <!--行程安排导航begin-->
      <div class="travel">
        <ul>
          <li><a href="javascript:void0">5日行程</a></li>
          <li><a href="#cost-description">费用说明</a></li>
          <li><a href="#booking-information">预订须知</a></li>
          <li><a href="#change-policy">退改政策</a></li>
        </ul>
      </div>
      <!--行程安排导航end-->
      <!--行程安排须知begin-->
      <div class="travel-desc">
        <!--用车推荐begin-->
        <div class="car-recommended">
          <p>用车推荐</p>
          <div class="img-info">
            <!--左侧图片begin-->
            <div class="l-img">
              <img src="../assets/car-recommended.png" alt="">
            </div>
            <!--左侧图片begin-->
            <!--右侧信息begin-->
            <div class="r-info">
              <p>大众斯柯达明锐 <span class="content">(或同级车型)</span></p>
              <ul>
                <li>
                  <dl>
                    <dd>档位 : 自动</dd>
                    <dd>型号 : 3箱</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dd>排量 : 1.6L</dd>
                    <dd>载客 : 5座</dd>
                  </dl>
                </li>
              </ul>
            </div>
            <!--右侧信息end-->
          </div>

        </div>
        <!--用车推荐end-->
        <!--费用说明begin-->
        <div class="cost-description">
          <!--导航图片begin-->
          <span class="slogo">
            <img src="../assets/fysm.png" width="40" height="40" alt="">
          </span>
          <!--导航图片end-->
          <p><a class="red-title" name="cost-description" id="cost-description">费用说明</a></p>
          <p>费用包含</p>
          <p>1、交通：往返团队经济舱机票含税；（团队机票将统一出票，如遇政府或航空公司政策性调整燃油税费，在未出票的情况下将        进行多退少补，敬请谅解）当地旅游巴士</p>
          <p>2、小交通：机场当地旅游巴士服务</p>
          <p>3、签证：无</p>
          <p>4、住宿：行程所列酒店</p>
          <p>5、用餐：行程中团队标准用餐， （中式餐或自助餐或特色餐，自由活动期间用餐请自理；如因自身原因放弃用餐.</p>
          <p>费用不包含</p>
          <p>1、小交通：机场服务</p>
          <p>2、签证：无</p>
          <p>3、单房差：无</p>
          <p>4、门票： 行程中注明需要另行支付的自费景点（①九寨沟沟内中餐78元/人起；②都江堰熊猫乐园观光车15元/人、讲解费10元/人）</p>
        </div>
        <!--费用说明end-->
        <!--预订须知begin-->
        <div class="booking-information">
          <!--导航图片begin-->
          <span class="slogo">
            <img src="../assets/fysm.png" width="40" height="40" alt="">
          </span>
          <!--导航图片end-->
          <p><a class="red-title">预订须知</a></p>
          <p>须知说明</p>
          <p>为了确保您能够按时出行，产品确认后请在（24 ）小时内付款，同时请按要求尽快提供出游所需的材料并签订出境旅游合同团队游览中不允许擅自离团（自由活动除外），如有不便敬请谅解。</p>
          <p>注意事项</p>
          <p>四川的大部份景区内，包括5A景区九寨沟，都有其景区的配套商业服务，即每个景点都会有当地特色的旅游纪念品、朝佛纪念品、和当地特产、当地小吃等商店或摊贩在出售相关商品，有些景区的讲解员还会为游客推荐解说，此类景区配套商业活动并非我旅行社指定的购物场所，请您根据自身所需谨慎选购，记得索要发票</p>
          <p>温馨提示</p>
          <p>1、12周岁以下儿童收费标准：只含目的地用餐、旅游车费及导游服务 </p>
          <p>2、因此团是散客拼团，客人到达当地后可能存在不同车次前往客人互相等待的情况，请听从导游安排</p>
          <p>3、行程中所列的餐食，早餐为酒店内，午餐、晚餐为中式桌餐</p>
        </div>
        <!--预订须知end-->
        <!--退改政策begin-->
        <div class="change-policy">
          <!--导航图片begin-->
          <span class="slogo">
            <img src="../assets/fysm.png" width="40" height="40" alt="">
          </span>
          <!--导航图片end-->
          <p><a class="red-title">退改政策</a></p>
          <p>出发前3天取消可以退</p>
          <p>1、单订单出游人数超过10人，需先询确认</p>
          <p>2、出游人年龄超过70岁（含），不接收</p>
          <p>3、出游人年龄低于2岁（不含），不接收</p>
        </div>
        <!--退改政策end-->
      </div>
      <!--行程安排须知end-->
    </div>
  </div>
</template>
<script>
  import counter from '@/components/counter'
  export default {
    data() {
      return {

      };
    },
    methods: {

    },
    components: {
      counter
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
  *{
    border: 0;
    padding: 0;
  }
  /*信息名字体*/
  .category{
    font-size: 16px;
    font-family: "Microsoft YaHei UI Light";
    font-weight: 900;
  }
  /*信息内容字体*/
  .content{
    color: gray;
    font-size: 16px;
    font-family: "Microsoft YaHei UI Light";
    font-weight: 900;
  }
  /*产品亮点描述字体*/
  .desc{
    color: gray;
    font-size: 12px;
    font-weight: 900;
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
  .red-title{
    color: #dc1111;
    font-size: 20px;
    font-family: "Microsoft YaHei UI Light";
    font-weight: 800;

  }
  /*******************************************************************/
  /*立即预定按钮*/
  .booked-btn{
    width: 148px;
    height: 41px;
    background-color: #dc1111;
    color: white;
    font-size: 22px;
    border-radius: 5px;
    font-family: "Microsoft YaHei UI Light";
    font-weight: 800;
  }

  /*自助自驾组件*/
  .self-driving{
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    /*background-color: gray;*/
    padding-top: 110px;
  }

  /*详情选项容器*/
  .sd-form-select{
    width: 100%;
    height: 900px;
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
    height: 100%;
    /*background-color: red;*/
  }
  .el-input-number input{
    width: 36px;
  }
  /*elelunbo组件*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /*右侧轮播图*/
  .right-silder{
    padding-left: 22px;
    float: left;
    width: 636px;
    height: 100%;
    /*background-color: greenyellow;*/
  }
  .titles{
    font-family: "Microsoft YaHei UI";
    font-size: 18px;
    font-weight: 700;
  }

  /*详情下部分*/
  .form-bottom{
    width: 100%;
    height: 440px;
    /*background-color: yellow;*/
  }
  /*下部分左侧日历*/
  .calendar{
    float: left;
    width: 564px;
    height: 408px;
    background-color: pink;
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
  .booked p {
    margin-top: 10px;
    height: 32px;
    /*line-height: 32px;*/
  }
  .travel{
    height: 41px;
  }
  /*行程导航列表*/
  .travel ul{
    list-style: none;
  }
  /*行程列表项*/
  .travel ul li{
    float: left;
    margin-right:70px;
    width: 120px;
    height: 41px;
  }


  /*行程安排须知*/
  .travel-desc{
    width: 100%;
    /*height: 500px;*/
    /*background-color: pink;*/
    padding-left: 72px;
  }
  /*用车推荐*/
  .car-recommended{
    width: 100%;
    height: 450px;
    /*background-color: yellow;*/
  }
  /*用车推荐标题*/
  .car-recommended p{
    height: 55px;
    line-height: 55px;
    font-family: "Microsoft YaHei UI Light";
    font-size: 18px;
    font-weight: 700;
  }
  .car-recommended .img-info{
    width: 100%;
    background-color: pink;
  }
  /*用车推荐左侧图片*/
  .car-recommended .img-info .l-img{
    float: left;
  }
  /*用车推荐右侧信息*/
  .car-recommended .img-info .r-info{
    float: left;
    padding-left: 30px;
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
    color: gray;
    font-family: "Microsoft YaHei UI Light";
    font-weight: 700;
  }
  /*费用说明*/
  .cost-description{
    position: relative;
    width: 100%;
    height: 500px;
    /*background-color: darkgray;*/
    /*e5e5e5*/
    border-bottom: 1px solid gray;
  }
  .cost-description .slogo{
    position: absolute;
    left: -40px;
    top: -5px;
  }
  .cost-description a{
    text-decoration: none;
    color: red;
  }
  /*预订须知*/
  .booking-information{
    position: relative;
    width: 100%;
    height: 500px;
    /*background-color: greenyellow;*/
    border-bottom: 1px solid gray;
  }
  .booking-information .slogo{
    position: absolute;
    left: -40px;
    top: -5px;
  }
  .booking-information a{
    text-decoration: none;
    color: red;
  }
  /*退改政策*/
  .change-policy{
    position: relative;
    width: 100%;
    /*height: 500px;*/
    /*background-color: rosybrown;*/
  }
  .change-policy .slogo{
    position: absolute;
    left: -40px;
    top: -5px;
  }
  .change-policy a{
    text-decoration: none;
    color: red;
  }
</style>
