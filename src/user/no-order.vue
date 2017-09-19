<template>
    <div class="noOrder">
        <div class="no-order">
          <h4>最新订单</h4>
          <div class="no-order-bg">
            <p>您还没有订单哦 ~ <span class="goHome"><router-link to="/home">现在就去看看吧！</router-link></span></p>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'noOrder',
    data () {
    return {
    }
  }
  }
</script>

<style scoped>
  .goHome{
    cursor: pointer;
  }
.noOrder{
  width: 979px;
  min-height: 300px;
  background: #FFF;
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
  .no-order h4{
    border-bottom: 1px solid rgba(229, 233, 231, 0.41);
    padding: 15px 0;
    font-weight: bold;
  }
  .no-order-bg{
    background: url("../assets/no-order-bg.png") no-repeat -600px -380px;
    width: 100%;
    height: 250px;

  }
  .no-order-bg p{
    font-size: 18px;
    font-weight: bold;
    color: #818181;
    float: left;
    margin-left: 387px;
    margin-top: 117px;
  }
.no-order-bg p span a{
    color: #62bdff;
    text-decoration: none;
}
</style>
