<template>
  <div id="app">
    <router-view/>
    <lg-preview></lg-preview>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style lang="less" type="text/less">
  @import url('common/less/reset.less');
  *{
    font-size: 14px;
  }
</style>
