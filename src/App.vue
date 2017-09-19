<template>
  <div id="app">
    <reuse_top></reuse_top>
    <router-view></router-view>
    <reuse_bottom></reuse_bottom>

  </div>
</template>

<script>

  import reuse_top from '@/reuse/reuse_top'
  import reuse_bottom from '@/reuse/reuse_bottom'
  import teamByCar from '@/components/teambycar'

  import 'babel-polyfill'


export default {
  name: 'app',
  data(){
    return{

    }
  },
  methods:{

  },
  components:{
    reuse_top,
    reuse_bottom,
    teamByCar,
  }

}


</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</style>
