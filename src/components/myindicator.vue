<template>
		<li class="myindicator"  data-target="#carousel-example-generic"  :data-slide-to="seq" v-bind:class="[seq == 0 ? 'active' : '']">
			<img data-v-19119db6 :src="url" alt="" />
		</li>
</template>

<script>
export default {
  props: {
  	seq: Number,
  	url: String
  },
  data:{
  	activeClass: 'active'
  }
}
</script>