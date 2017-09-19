<template>
  <div class="selected">
    <h2>旅游协议</h2>
    <p><router-link to="/reuse_left/outer_travel_agreement">出境旅游合同范文</router-link></p>
    <p><router-link to="/reuse_left/inner_travel_agreement">境内旅游合同范文</router-link></p>
  </div>
</template>
<script></script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
/*协议容器*/
.selected {
  padding-left: 51px;
  padding-right: 51px;
  margin-bottom: 30px;
  background-color: #fff;
}
/*协议标题*/
h2{
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  /*background-color: pink;*/
  height: 50px;
  line-height: 50px;
}
/*选择协议段落*/
p{
  padding-left: 12px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  /*background-color: pink;*/
  border-bottom: 2px dashed #c4c4c4;
}
/*选择协议文字*/
a{
  text-decoration: none;
  color: #000000;
  font-size: 14px;
  font-weight: 700;
}
</style>
