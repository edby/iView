<template>
  <div class="sweiper">
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class="swiper-item" v-for="(item,index) in vswiper" :key="index">
        <div class="items" @click="goToGoods(item)">
          <div class="img"><img :src="item.goods_logo" alt="" class="w100"></div>
          <div class="title">{{item.goods_name}}</div>
          <p class="p">￥{{item.goods_price}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "sweiper",
    props: {
      vswiper:{
        type: [Array, Object],
        default: []
      }
    },
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          loop:true,
          initialSlide:0,
          autoplay: false,
          slidesPerView :3,
          direction : 'horizontal',
          grabCursor : true,
          onSlideChangeEnd: swiper => {}
        }
      }
    },
    mounted() {
      this.swiper.slideTo(0, 0, false);
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      callback() {},
      goToGoods(item) {
        this.$emit('changeGoods', item)
      }
    },

  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .swiper-container{
    margin: 5px auto 10px;
    img{
      display: block;
      width: 100%;
    }
    .swiper-slide{
      padding: 5px;
    }
    .items{
      width: 100%;
      font-size: 14px;
      color: #8f8f94;
      line-height:20px;
      .img{
        min-height: 120px;
      }
      .title{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 3px;
      }
      .p{
        text-align: center;
        color: #a146ff;
        font-weight: 500;
      }
    }
  }
</style>
