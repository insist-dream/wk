<template>
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
          <p class="tab"><router-link to="/reuse_left/select_travel_agreement">旅游协议</router-link></p>
          <p class="tab"><router-link to="/reuse_left/car_agreement">车辆服务协议</router-link></p>
          <p class="tab"><router-link to="/reuse_left/user_agreement">用户服务协议</router-link></p>
        </div>
      <div class="tab-right">
        <router-view></router-view>
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
</template>


<script>
    import about_one from '@/about_me/about_one'
    import about_two from '@/about_me/about_two'
    import about_three from '@/about_me/about_three'
    import about_four from '@/about_me/about_four'
    import about_five from '@/about_me/about_five'
    import about_six from '@/about_me/about_six'
    import about_sever from '@/about_me/about_sever'
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
        }
    }
</script>
<style>
  p{
    padding: 0;
    margin: 0;
  }
  .reuse_left{
    width: 100%;
    min-height: 500px;
    background: rgba(163, 163, 163, 0.07);
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
</style>
