<template>
  <div class="personalCenter">
    <div class="center-main">
      <div class="my-indent">
          <p class="indent-title"><router-link to="/personalCenter/centerCard">个人中心</router-link></p>
          <div id="my"><router-link to="/personalCenter/allOrders">我的订单</router-link></div>
      </div>
      <div class="personal-details">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import centerCard from '@/user/centerCard'
  import allOrders from '@/user/all-orders'

  export default {
    name: 'personalCenter',
    data () {
    return {
    }
  },
  methods:{

  },
  components:{
    centerCard,
    allOrders,
  }
  }
</script>

<style scoped>
  .personalCenter{
    background: rgba(229, 233, 231, 0.41);
    margin-top: 55px;
  }
  .center-main{
    width: 1200px;
    min-height: 500px;
    margin: 0 auto;
    padding-top: 30px;
    overflow: hidden;
}
  .my-indent{
    width: 200px;
    height: 300px;
    background: #FFF;
    padding: 0 10px;
    display: inline-block;
  }
  .my-indent a{
    text-decoration: none;
    color: black;
  }
  .my-indent .indent-title{
    width: 100%;
    border-bottom:1px solid #dfe1df;
    padding: 10px 0;
    font-size: 16px;
  }
  .my-indent div{
    font-size: 14px;
    margin-top: 20px;
  }
  .personal-details{
    float: right;
    width: 1000px;
    padding: 0 20px;
  }
</style>
