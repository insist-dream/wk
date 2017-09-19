<template>
  <div>
    <div>{{time | change}}</div>
  </div>
</template>

<script>
  let flag = false
  export default {
    data () {
    return {
      time : '获取验证码',
      timeover:true,
    }
  },
  props : {
    start : {
      type : Boolean
    }
  },
  watch : {
    start (value,oldvalue) {
      if(value == true){
        this.countDown();
      }
    }
  },
  methods: {
    countDown () {
      console.log('countDown')
      this.time = 60;
      this.$emit('timeover',0)
      let time = setInterval(()=>{
          this.time --
      if(this.time == 0){
        this.$emit('timeover',1)
        this.$emit('countDown')
        this.time = '获取验证码'
        flag = true
        clearInterval(time)
      }
    },1000)
  }
  },
  filters : {
    change (value) {
      if(!value) return ""
      if(!isNaN(value)){
        if(flag == true){
        }
        return value+'S后重发'
      }else{
        return value
      }
    }
  }

  }
</script>
