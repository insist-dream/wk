<template>
  <div class="counter">
    <span :class="{light:islight}" @click="sub" class="sub">-</span>
    <span class="number-input" style="color: #333">{{ ipt }}</span>
    <span @click="add" class="add">+</span>
  </div>
</template>
<script>
  export default {
    props: ['ftype','forder','fitem','fmin','fmax','fdef','fcount'],
    data () {
      return {
        ipt: 1,
        disabled: true,
        rtype: 0,
        rorder: 0,
        ritem: 0,
        rmin: 1,
        rmax: 99,
        rdef: 1,
        islight: false,
        rcount: 0

      }
    },
    created() {
      this.rtype = this.ftype
      this.rorder = this.forder
      this.ritem = this.fitem
      this.rmin = parseInt(this.fmin)
      this.rcount = parseInt(this.fcount)
      if(this.fmax >= 99){
        this.fmax = 99
      }
      this.ipt = parseInt(this.fdef)


    },
    watch:{
      fdef: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        this.ipt = val
      },

    },
    computed: {

    },
    mounted() {
      this.ipt = this.fdef
    },

    methods: {
      // 减少数量
      sub: function () {
        // console.log(this.fdef);
        // 最小值
        if (this.ipt <= this.fmin) {
          // this.ipt = this.fmin
          return false
        }
        if(this.rtype == 'hotel'){
          // console.log(this.$store.state.hotel_total_num)
          if(this.$store.state.hotel_total_num <= 1) return false
          else this.$store.state.hotel_total_num--
          // console.log(this.$store.state.nget_details.trip_hotels[this.ritem].hotels[0].hotel_products)
          // let num = this.gethotelnum(this.$store.state.nget_details.trip_hotels[this.ritem].hotels[0].hotel_products)
          // if(num <= 1){
          //   return false
          // }
        }
        this.ipt = parseInt(this.ipt) - 1
        this.$emit('changenum', this.rtype, this.rorder, this.ritem, this.ipt)
      },
      // 增加数量
      add: function () {
        this.count++
        this.$emit('changecount', this.count)
        if (this.ipt >= this.fmax || this.ipt >= 99) {
          // this.ipt = this.fmax
          return false
        }
        if(this.rtype == 'hotel'){
          this.$store.state.hotel_total_num++
        }
        this.ipt = parseInt(this.ipt) + 1
        this.$emit('changenum', this.rtype, this.rorder, this.ritem, this.ipt)
      },
      // gethotelnum:function(products){
      //   let num = 0
      //   for(let i = 0; i < products.length; i++){
      //     num += parseInt(products[i].num)
      //   }
      //   return num
      // }
    }
  }
</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  /*计数器容器*/
  .counter{
    display: inline-block;
    width: 87px;
    height: 24px;
    border: 1px solid #e6e6e6;
  }
  /*计数器下的span*/
  .counter span{
    display: inline-block;
    color:#666666;
  }
  /*全部span样式*/
  .counter .sub,.number-input,.add,.number-input {
    font-size: 16px;
    float: left;
    width: 28px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    /*background-color: pink;*/
  }
  .number-input{
    color: #333;
  }
  /*输入框样式*/
  .counter .number-input input{
    width: 100%;
    height: 100%;
    border: 0;
  }
  /*加减共有样式*/
  .counter .sub,.add{
    background-color: #fff;
    cursor: pointer;

  }

  /*中间线样式*/
  .counter .sub,.number-input{
    border-right: 1px solid #e6e6e6;
  }
  .light{
    color:#bdbdbd;
  }
</style>
