<template>
  <div class="librarie">
    <boon></boon>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import boon from "base/boon/boon";
  export default {
    name: "librarie",
    components: {
      boon
    },
    created(){
      this.$wxSDK._wxSDk(this)
    }
  }
</script>

<style scoped lang="less" type="text/less" rel="stylesheet/less">

</style>
