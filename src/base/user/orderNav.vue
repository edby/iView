<template>
  <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
    <div class="mui-scroll">
      <router-link to="/user/order/orderlist" class="mui-control-item ">全部</router-link>
      <router-link to="/user/order/orderpending" class="mui-control-item">待付款</router-link>
      <router-link to="/user/order/orderdelivergoods" class="mui-control-item">待发货</router-link>
      <router-link to="/user/order/ordergoodstobereceived" class="mui-control-item">待收货</router-link>
      <router-link to="/user/order/ordercompleted" class="mui-control-item">已完成</router-link>
      <router-link to="/user/order/orderrefund" class="mui-control-item ">退款订单</router-link>
    </div>
  </div>
</template>

<script>
  import 'vue-awesome-mui/mui/dist/css/mui.css'
    export default {
        name: "orderNav",
      created(){
        mui('body').on('tap', 'a', function () {
          document.location.href = this.href;
        })
      },
      mounted() {
        setTimeout(() => {
          this.scroll()
        }, 20)
      },
      methods: {
        scroll() {
          mui('.mui-scroll-wrapper').scroll();
        },
      },
    }
</script>

<style scoped lang="less">
  .router-link-active {
    border-bottom: 2px solid #000000;
  }
</style>
