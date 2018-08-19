<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in bannerList" :key="item.id">
        <a :href="item.jump_url">
          <img :src="item.img_src"/>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "banner",
    props: {
      bannerList: {
        type: [Array, Object],
        default: []
      }
    },
    data() {
      return {
        swiperOption: {
            autoplay: true,
            pagination: {
            el: '.swiper-pagination',
            loop: true
          }
        }
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .banner {
    width: 100%;
  }
</style>
