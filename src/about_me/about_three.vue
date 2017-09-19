<template>
  <div class="about-three">
    <h3>联系我们</h3>
    <div class="map"></div>
    <p>地址：北京市东城区东直门外大街39号院航空服务楼2#B517</p>
    <p>服务热线：400-0515-507</p>

  </div>
</template>


<script>
  export default {
    name: 'about-three',
    data () {
    return {

    }
  }
  }
</script>
<style>
  .about-three h3{
    width: 100%;
    text-align: center;
    padding: 20px 0 30px 0;
  }
  .about-three p{
    padding: 5px 0;
    line-height: 20px;
    font-size: 14px;
    color: #757575;
    text-indent: 20px;
  }
  .map{
    background: url("../assets/01.png") no-repeat;
    width: 878px;
    height: 444px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
</style>
