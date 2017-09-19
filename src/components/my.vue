// 注册
<div  v-bind:class="[(isActive == 0) ? activeClass : '', itemClass]"> <img src="url" alt=""/></div>

export default {
  props: {
    url: '',
    isActive: 0,
    activeClass: 'active',
    itemClass: 'item'
  })
}
