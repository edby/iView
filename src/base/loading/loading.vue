<template>
  <div class="loading" v-if="false">
   <div class="box">
     <div class="imgs">
       <img src="../../common/images/loading1.gif" alt="">
       <div class="text">加载中…</div>
     </div>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "loading",
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">
  .loading {
    position: fixed;
    width: 100%;
    top: 40px;
    left: 0;
    bottom: 50px;
    right: 0;
    z-index: 9999;
    overflow: hidden;
    display: none;
    .box{
      position: relative;
      width: 100%;
      height: 100%;
      .imgs{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-110%,0);
      }
    }
    .text{
      text-align: center;
      margin-top: 25px;
      font-size: 15px;
      color: rgb(158,171,182);
    }
    img{
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }
</style>
