<template>
  <div class="noData">
    <img src="http://img.hena360.cn/no_data_img.png" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "noData"
  }
</script>

<style scoped type="text/less" lang="less">
.noData{
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  z-index: -1;
  img{
    width: 100%;
    display: block;
  }
}
</style>
