<template>
    <div class="mycarousel" v-bind:class="[seq == 0 ? 'active' : '', 'item']">
      <img data-v-19119db6 :src="url" alt=""/>
    </div>
</template>

<script>
export default {
  props: {
  	seq: Number,
  	url: String
  },
  data:{
  	activeClass: 'active',
    itemClass: 'item'
  }
  
  }
</script>