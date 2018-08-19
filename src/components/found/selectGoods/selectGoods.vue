<template>
  <div class="selectGoods" v-title="title">

    <nav class="nav-tab">
      <ul class="tabs-nav">
        <router-link tag="li" :to="{name: 'BtBaby'}" replace >买到的宝贝</router-link>
        <!--<li class="active">买到的宝贝</li>-->
        <router-link tag="li" :to="{name: 'CofTres'}" replace >收藏的宝贝</router-link>
      </ul>
    </nav>
    <router-view/>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: "selectGoods",
    data() {
      return {
        title: '选择商品'
      }
    },
    methods: {
      back() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .selectGoods {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow: hidden;
    overflow-y: auto;
    z-index: 999;
  }

  .ivu-tabs-bar {
    margin-bottom: 0;
  }

  .nav-tab {
    width: 100%;
    .tabs-nav {
      display: flex;
      width: 100%;
      line-height: 38px;
      align-items: center;
      li {
        flex: 1;
        text-align: center;
        border-bottom: 2px solid transparent;
        color: #7e8c8d;
        &.router-link-active {
          border-bottom: 2px solid;
          color: #333;
        }
      }
    }
  }
</style>
