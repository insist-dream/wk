<template>
  <div class="counter">
    <span :class="{light:islight}" @click="sub" class="sub">-</span>
    <span class="number-input" >{{ ipt }}</span>
    <span @click="add" class="add">+</span>
  </div>
</template>
<script>
  export default {
    props: ['ftype','forder','fwho','fitem','fdisaled','fmin','fmax','fdef'],
    data () {
      return {
        ipt: 1,
        disabled: true,
        rtype: 0,
        rorder: 0,
        rwho: 0,
        ritem: 0,
        rmin: 1,
        rmax: 99,
        rdef: 1,
        rdisaled: true,
        islight: false
      }
    },
    created() {
      this.rtype = this.ftype
      this.rorder = this.forder
      this.rwho = this.fwho
      this.ritem = this.fitem
      if(this.ftype == 'ticket'){
        this.rdisaled = this.fdisaled
      }
      this.rmin = parseInt(this.fmin)
      if(this.fmax >= 99){
        this.fmax = 99
      }
      this.ipt = parseInt(this.fdef)
    },
    watch:{
      fdef: function (val, oldVal) {
        // console.log('new: %s, old: %s', val, oldVal)
        this.ipt = val
      },
      fdisaled: function (val, oldVal) {
        // console.log('new: %s, old: %s', val, oldVal)
        this.rdisaled = val
      }
    },
    mounted() {
      this.ipt = this.fdef
    },
    methods: {
      // 减少数量
      sub: function () {
        // 最小值
        if (this.ipt <= this.fmin) {
          // this.islight = true
          return false
        }
        if(this.rtype == 'hotel'){
          // console.log(this.$store.state.nget_details.trip_hotels[this.rorder].hotels[0].hotel_products)
          let num = this.gethotelnum(this.$store.state.nget_details.trip_hotels[this.rorder].hotels[0].hotel_products)
          // console.log(num)
          if(num <= 1){// 确保至少有一间
            // this.islight = true
            return false
          }
        }
        this.ipt = parseInt(this.ipt) - 1
        this.$emit('changenum', this.rtype, this.rorder, this.rwho, this.ritem, this.ipt)
      },
      // 增加数量
      add: function () {
        if (this.ipt >= this.fmax || this.ipt >= 99) {
          return false
        }
        // console.log('add   '+this.rdisaled)
        if(!this.rdisaled){
          return false
        }else{
          this.ipt = parseInt(this.ipt) + 1
          this.$emit('changenum', this.rtype, this.rorder, this.rwho, this.ritem, this.ipt)
        }
      },
      gethotelnum:function(products){
        let num = 0
        for(let i = 0; i < products.length; i++){
          num += parseInt(products[i].num)
        }
        return num
      }
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
  .counter .sub,.number-input,.add,.number-input input{
    font-size: 16px;
    float: left;
    width: 28px;
    height: 22px;
    text-align: center;
    /*background-color: pink;*/
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
