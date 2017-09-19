<template>
  <div class="about-five">
    <h3>保险条款</h3>
    <p><router-link to="/reuse_left/car_insurance">车辆保险</router-link></p>
    <p><router-link to="/reuse_left/travel_insurance">旅游保险</router-link></p>
  </div>
</template>


<script>
  export default {
    name: 'about-five',
    data () {
    return {

    }
  }
  }
</script>
<style>
  .about-five h3{
    width: 100%;
    text-align: center;
    padding: 20px 0 30px 0;
  }
  .about-five p{
    padding: 5px 0;
    line-height: 30px;
    font-size: 14px;
    color: #757575;
    text-indent: 15px;
    border-bottom: 1px dashed #b4b8ba;
  }
  .about-five p a{
    color: black;
    text-decoration: none;
  }
</style>
