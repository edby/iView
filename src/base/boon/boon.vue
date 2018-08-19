<template>  
  <div class="sweiper fuki">
    <!-- 头部 -->
    <Row class="top">
      <Col span="12" :class="{'top_last':isactiveIndex==0}"> 免费领取
      </Col>
      <Col span="12" :class="{'top_first':isactiveIndex==1}"> 0元福利
      </Col>
    </Row>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(lis,k) in list" :key="k" :id=" lis.id">
        <img :src="lis.url" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>


<script type="text/ecmascript-6">
export default {
  name: "boon",
  data() {
    return {
      isactiveIndex:'',
      swiperOption: {
        loop: false,
        grabCursor: true,
        autoplay: false,
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          slideChangeTransitionEnd: () => {

            this.isactiveIndex = this.$refs.mySwiper.swiper.activeIndex
            this.isshow(this.isactiveIndex)

          }
        }
      },
      list: [
        { url: "http://img.hena360.cn/bpk_01.png", id: 1 },
        { url: "http://img.hena360.cn/bpk_02.png", id: 2 }
      ]
      // swiper-pagination-bullet-active
    };
  },
 
  created() {
  },
  computed: {},
  methods: {
    isshow(isactiveIndex) {
      // console.log(isactiveIndex)
      if (isactiveIndex == "0") {
        this.$router.replace({
          name: "libraries"
        });
      }
      if (isactiveIndex == "1") {
        +this.$router.replace({
          name: "balrog"
        });
      }

    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.top {
  padding-top: 10%;

  div:first-child {
    padding-right: 10px;
    text-align: right;
    color: #fff;
    font-size: 14px;
  }
  div:last-child {
    padding-left: 10px;
    text-align: left;
    color: #fff;
    font-size: 14px;
  }
}
.sweiper {
  height: 390px;
  background: url("http://img.hena360.cn/bpk_00.png") no-repeat center center;
  background-size: 100% 100%;
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0%;
}
.top_last {
  font-size: 18px !important;
  font-weight: 600;
}
.top_first {
  font-size: 18px !important;
  font-weight: 600;
}
</style>
