<template>
  <div style="background: rgba(163, 163, 163, 0.07); padding-bottom: 100px">

    <!-- 左侧导航begin -->
    <div class="reuse_left">
    <div class="reuse_left_content">

      <div class="tab-left">
        <div class="two-title">关于我们</div>
        <p class="tab"><router-link to="/about_jxdz">匠心打造</router-link></p>
        <p class="tab"><router-link to="/reuse_left/about_two">媒体报道</router-link></p>
        <p class="tab"><router-link to="/reuse_left/about_one">悟空故事</router-link></p>
        <p class="tab"><router-link to="/reuse_left/about_three">联系我们</router-link></p>
        <p class="tab"><router-link to="/reuse_left/about_four">加入我们</router-link></p>
        <div class="two-title">帮助中心</div>
        <p class="tab"><router-link to="/reuse_left/about_five">保险条款</router-link></p>
        <p class="tab"><router-link to="/reuse_left/about_six">人工服务</router-link></p>
        <p class="tab"><router-link to="/reuse_left/about_sever">常见问题</router-link></p>
        <div class="two-title">服务协议</div>
        <p class="tab"><router-link to="/reuse_left/user_agreement">用户服务协议</router-link></p>
        <p class="tab"><router-link to="/reuse_left/car_agreement">车辆服务协议</router-link></p>
        <p class="tab"><router-link to="/reuse_left/select_travel_agreement">旅游协议</router-link></p>
      </div>
      <div class="tab-right">

        <wk_jxdz></wk_jxdz>
        <!--<about_one></about_one>-->
        <!--<about_two></about_two>-->
        <!--<about_three></about_three>-->
        <!--<about_four></about_four>-->
        <!--<about_five></about_five>-->
        <!--<about_six></about_six>-->
        <!--<about_sever></about_sever>-->
      </div>
    </div>
  </div>
    <!-- 左侧导航end -->

    <!-- 高端车型begin -->
    <div class="car_type">
      <div class="center">
        <h3>高端车型</h3>
        <div class="carc">
          <div class="carl">
            <div class="carcontent">
              <p class="c1">舒适温馨、安全舒适、宽敞温馨</p>
              <p class="c2">车型：北京奔驰GLC / 奥迪A4 / 奥迪Q5</p>
              <p class="c2" style="padding-left: 45px">丰田RAV4 / 别克GL8等</p>
            </div>
            <div class="carimg">
              <img src="../assets/carimg.png" alt="">
            </div>
          </div>
          <div class="carr">
            <div class="carcontent">
              <p class="c1">硬派越野、越野利器、配置强悍</p>
              <p class="c2">车型：大切诺基 / 北汽BJ80 / Jeep牧马人</p>
              <p class="c2" style="padding-left: 45px">Jeep自由光 / 丰田普拉多等</p>
            </div>
            <div class="carimg">
              <img src="../assets/carimg1.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 高端车型end -->

    <!-- 全能装备begin -->
    <div class="equip">
      <div class="center">
        <h3>全能装备</h3>
        <div class="equip-c">
          <ul>
            <li>
              <div class="equipcontent">
                <p class="c1">摄影器材</p>
                <p class="c2">单反相机、三脚架</p>
                <p class="c2">大疆无人机、gopro hero。</p>
              </div>
              <div class="equipimg">
                <img src="../assets/equip-01.png" alt="">
              </div>
            </li>
            <li>
              <div class="equipcontent">
                <p class="c1">野营用具</p>
                <p class="c2">烧烤架、帐篷、望远镜、睡袋</p>
              </div>
              <div class="equipimg">
                <img src="../assets/equip-02.png" alt="">
              </div>
            </li>
            <li>
              <div class="equipcontent">
                <p class="c1">儿童用品</p>
                <p class="c2">儿童座椅、婴儿推车</p>
                <p class="c2">温奶器、消毒锅。</p>
              </div>
              <div class="equipimg">
                <img src="../assets/equip-03.png" alt="">
              </div>
            </li>
            <li>
              <div class="equipcontent">
                <p class="c1">老年人用品</p>
                <p class="c2">血压仪、轮椅、拐杖。</p>
              </div>
              <div class="equipimg">
                <img src="../assets/equip-04.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 全能装备end -->

    <!-- 全能装备begin -->
    <div class="quality-service">
      <div class="center">
        <h3>品质服务</h3>
        <div class="qs-content">
          <div class="qs-left">
            <img src="../assets/service01.png" alt="">
          </div>

          <div class="qs-right">
            <p>专业服务</p>
            <p>司机、导游、领队、专属管家、7×24小时客服、美食、运动达人、动植物、民俗专家、摄影摄像专家。</p>
          </div>
          <div></div>
        </div>
        <div class="qs-content">
          <div class="qs-left">
            <img src="../assets/service02.png" alt="">
          </div>
          <div class="qs-right">
              <p>私人定制</p>
              <p>团建、拓展、订婚求婚场景设计、低空飞行体验、快速安检通道、VIP通道接机服务。</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 全能装备end -->

    <!-- 安全保障begin -->
    <div class="security">
      <div class="center">
        <h3>安全保障</h3>
        <p class="c1">一、保  险</p>
        <p class="c2">囊括车辆损失险、第三者责任险、高保额的附加险（座位险120万元/座），确保客户驾驶车辆途中发生的损失、伤亡，均能获得省心、简单、快速的理赔。</p>
        <p class="c1">二、保险覆盖</p>
        <p class="c2">中国大陆境内除香港、澳门、台湾以外，我方车辆发生事故的，均可按正常保险流程进行理赔。</p>
        <p class="c1">三、换境外国家车辆方式</p>
        <p class="c2">车辆在国内进行切换，我方车辆交由合作酒店的停车场进行保管，并为出境客户单独投保境外旅游组合险、意外险、国际救援险。</p>
      </div>
    </div>
    <!-- 安全保障end -->

    <!-- 自由选择begin -->
    <div class="freedom">
      <div class="center">
        <h3>自由选择</h3>
        <p style="margin-top: 25px" class="c2">基于悟空给您的专业品质推荐，自由选择：旅行线路、旅途时长、您想要的车型、你想住的酒店、您想去的景点、您想用的装备，自由搭配，随心选择，随时出发。</p>
        <p style="margin-top: 20px">
          <img src="../assets/semicircle.png" alt="">
        </p>

      </div>
    </div>
    <!-- 自由选择end -->
  </div>
</template>


<script>
  import about_one from '@/about_me/about_one'
  import about_two from '@/about_me/about_two'
  import about_three from '@/about_me/about_three'
  import about_four from '@/about_me/about_four'
  import about_five from '@/about_me/about_five'
  import about_six from '@/about_me/about_six'
  import about_sever from '@/about_me/about_sever'
  import wk_jxdz from '@/about_me/wk_jxdz'
  export default {
    name: 'reuse_left',
    data () {
      return {

      }
    },
    components:{
      about_one,
      about_two,
      about_three,
      about_four,
      about_five,
      about_six,
      about_sever,
      wk_jxdz
    }
  }
</script>
<style scoped>
  p{
    padding: 0;
    margin: 0;
  }
  .reuse_left{
    width: 100%;
    min-height: 500px;
    /*background: rgba(163, 163, 163, 0.07);*/
    margin-top: 55px;
    padding: 20px 0 30px 0;
    overflow: hidden;
  }
  .reuse_left_content{
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    background: #FFF;
    min-height: 450px;
    overflow: hidden;
  }
  .tab-left{
    width: 170px;
    border-right: 1px solid rgba(178, 176, 183, 0.49);
    padding: 10px 0 10px 0;
    display: inline-block;
  }
  .two-title{
    background: url("../assets/about_me.png") no-repeat;
    width: 170px;
    height: 44px;
    color: #FFF;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
  }
  .tab{
    text-align: center;
    padding: 15px 0 15px 0;
  }
  .tab a{
    text-decoration: none;
    color: black;
  }
  .tab-right{
    width: 1029px;
    height: 100%;
    float: right;
    padding: 10px 50px 20px 50px ;
  }
  /*子标题*/
  h3{
    border-left: 4px solid #d00000;
    font-size: 16px;
    height: 16px;
    font-weight: 700;
    padding-left: 5px;
  }
  /*高端车型容器*/
  .car_type{
    width: 1200px;
    height: 506px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 20px;
  }
  /*高端车型内容*/
  .car_type .center{
    padding-top: 50px;
    width: 920px;
    height: 100%;
    margin-left: 228px;
    /*background-color: yellow;*/
  }
  .carc{
    margin-top: 10px;
    width: 100%;
    height: 350px;
    /*background-color: pink;*/
  }
  /*左右容器位置*/
  .carc .carl,.carr{
    float: left;
    width: 450px;
    height: 100%;
    /*background-color: gray;*/
  }
  /*右侧车型介绍容器*/
  .carc .carr{
    margin-left: 20px;
  }
  /*共有内容样式*/
  .carc .carl .carcontent,.carc .carr .carcontent{
    width: 100%;
    height: 105px;
    /*background-color: blue;*/
  }
  /* 右侧车型文字内容左侧填充*/
  .carc .carr .carcontent{
    padding-left: 40px;
  }
  /*车型图片*/
  .carc .carl .carimg,.carc .carr .carimg{
    width: 100%;
    height: 245px;
    background-color: red;
  }
  /*车型文字内容*/
  .c1{
    font-size: 16px;
    color: #333;
    height: 40px;
    line-height:40px;
  }
  .c2{
    font-size: 14px;
    color: #666;
  }

  /*全能装备*/
  .equip{
    width: 1200px;
    height: 540px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 40px;
  }
  /*全能装备内容容器*/
  .equip .center{
    padding-top: 50px;
    width: 920px;
    height: 100%;
    margin-left: 228px;
    /*background-color: yellow;*/
  }
  /*全能装备内容*/
  .equip .center .equip-c{
    width: 100%;
    height: 300px;
    /*background-color: pink;*/
    padding-top: 10px;
  }
  .equip .center .equip-c .equipcontent{
    width: 100%;
    height: 80px;
    /*background-color: gray;*/
  }
  .equip .center .equip-c ul{
    list-style: none;
  }
  .equip .center .equip-c ul li{
    float: left;
  }
  .equip .center .equip-c ul li:nth-child(1){
    width: 180px;
    height: 300px;
    /*background-color: green;*/
  }
  .equip .center .equip-c ul li:nth-child(2){
    margin-left: 50px;
    width: 215px;
    height: 300px;
    /*background-color: blue;*/
  }
  .equip .center .equip-c ul li:nth-child(3){
    margin-left: 60px;
    width: 160px;
    height: 300px;
    /*background-color: magenta;*/
  }
  .equip .center .equip-c ul li:nth-child(4){
    margin-left: 60px;
    width: 155px;
    height: 300px;
    /*background-color: magenta;*/
  }
  /*品质服务容器*/
  .quality-service{
    width: 1200px;
    height: 320px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 40px;
  }
  /*高端车型内容*/
  .quality-service .center{
    padding-top: 50px;
    width: 920px;
    height: 100%;
    margin-left: 228px;
    /*background-color: yellow;*/
  }
  /*内容容器*/
  .qs-content{
    width: 100%;
    height: 100px;
    /*background-color: #666;*/
  }
  .qs-left,.qs-right{
    float: left;
    width: 66px;
    width: 66px;
    height: 100px;
    line-height: 100px;
  }
  /*左侧图片容器*/
  .qs-left{
    /*background-color: blue;*/
  }
  /*右侧文字内容容器*/
  .qs-right{
    width: 850px;
    height: 100px;
    padding-left: 15px;
    /*background-color: pink;*/
  }
  .qs-right p:nth-child(1){
    font-size: 16px;
    color: #333;
    height: 16px;
    margin-bottom: 5px;
  }
  .qs-right p:nth-child(2){
    font-size: 14px;
    color: #666;
    height: 14px;
  }
  /*安全保障*/
  .security{
    width: 1200px;
    height: 350px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 40px;
  }
  .security .center {
    padding-top: 50px;
    width: 920px;
    height: 100%;
    margin-left: 228px;
    /*background-color: yellow;*/
  }

  /*自由选择*/
  .freedom{
    width: 1200px;
    height: 640px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 40px;
  }
  .freedom .center {
    padding-top: 50px;
    width: 920px;
    height: 100%;
    margin-left: 228px;
    /*background-color: yellow;*/
  }
</style>
