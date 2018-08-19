<template>
  <div class="releaseModule">
    <div class="releaseModule_icon" @click="releaseModule">
      <Icon type="ios-send" size="30"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "releaseModule",
    methods: {
      releaseModule() {
        this.$router.push({
          path: '/publish'
        })
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .releaseModule{
    position: fixed;
    width: 50px;
    height: 50px;
    background-color: #b462ff;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    right: 15px;
    bottom: 70px;
    z-index: 9;
    .releaseModule_icon{
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }
</style>
