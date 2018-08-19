<template>
  <div class="navBer">
    <ul class="navItem">
      <router-link tag="li" :to="{name: 'paradise'}">
        <img src="http://img.hena360.cn/i_1.png" alt="">
        <h4>每日签到</h4>
      </router-link>
      <router-link tag="li" :to="{path: '/librarie'}">
        <img src="http://img.hena360.cn/i_2.png" alt="">
        <h4>福利库</h4>
      </router-link>
      <router-link tag="li" :to="{name: 'Detonation'}">
        <img src="http://img.hena360.cn/i_3.png" alt="">
        <h4>爆品库</h4>
      </router-link>
      <router-link tag="li" :to="{name: 'shared'}">
        <img src="http://img.hena360.cn/i_4.png" alt="">
        <h4>共享库</h4>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "navBer",
    created() {
    },
    mounted() {
      setTimeout(() => {
      }, 20)
    },
    methods: {

    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .navBer {
    width: 100%;
    padding: 10px;
  }
  .navItem{
    width: 100%;
    display: flex;
    align-items: center;
    li{
      flex: 1;
      text-align: center;
      img{
        width: 42%;
      }
      h4{
        font-size: 12px;
        font-weight: 300;
        color: #333333;
        line-height: 26px;
      }
    }
  }
</style>
