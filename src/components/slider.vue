<template>
  <div class="slider">

    <div id="carousel-generic" class="carousel slide" data-ride="carousel" data-interval="5000">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#carousel-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-generic" data-slide-to="1"></li>
        <li data-target="#carousel-generic" data-slide-to="2"></li>
      </ol>

      <!-- 10000048 / 100002 -->
      <div class="carousel-inner" role="listbox">
        <div class="item active">
        	 <!-- Wrapper for slides -->
        	 <!--Causion: test <-> normal !!!-->
          <router-link :to="{name:'self_driving',params:{id:10000048}}" tag="a">
              <img src="../assets/slider1.jpg" alt=""/>
          </router-link>
        </div>
        <div class="item">
        	 <!-- 10000048 / 100004-->

          <router-link :to="{name:'self_driving',params:{id:10000048}}" tag="a">
          <img src="../assets/slider2.jpg" alt=""/>
          </router-link>
        </div>
        <div class="item">
        	 <!-- 10000048 / 100001 -->
          <router-link :to="{name:'self_driving',params:{id:10000048}}" tag="a">
              <img src="../assets/slider3.jpg" alt=""/>
           </router-link>
        </div>
      </div>

      <!-- Controls -->
      <!--<a class="left carousel-control" href="#carousel-generic" role="button" data-slide="prev">-->
        <!--<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>-->
        <!--<span class="sr-only">Previous</span>-->
      <!--</a>-->
      <!--<a class="right carousel-control" href="#carousel-generic" role="button" data-slide="next">-->
        <!--<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>-->
        <!--<span class="sr-only">Next</span>-->
      <!--</a>-->
    </div>
    <homepage_recommend></homepage_recommend>
  </div>
</template>

<script>
  import homepage_recommend from '@/components/homepage_recommend'
  export default {
    name: 'slider',
    data () {
      return {
      }
    },
    created(){
//    	window.onbeforeunload ='';
//    	window.onunload = '';
    	console.log('home -> created');
    },
    mounted(){
      console.log('----mounted---',$("#carousel-generic"));
      $("#carousel-generic").carousel();
    },
  components:{
    homepage_recommend,
  },

  }

</script>
<style>
  .slider{
    margin-top: 55px;
  }
  .carousel-indicators .active{
    background: red;
    border:#d00000;
  }
  .carousel-indicators{
    bottom: 0px ;
  }
</style>
