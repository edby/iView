<template>
  <div class="slide">
    <div class="slideImg" ref="slideImg">
      <div class="bannerActive" v-for="(item,index) in slideList" :key="index" :class="{'active' : index === n}">
        <a ><img :src="item" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "slide",
    props: {
      slideList: {
        type: [Array, Object],
        default: []
      }
    },
    data(){
      return{
        n: 0,　　　　　　　// 图片的index。
        bFlag: true,      // 锁定
        timer1: '',　　　　// 这是bFlag定时器的数据
        timer2: '',　　　　// 这是自动播放（next（））定时器的数据
        timer3: '',　　　　// 这是打开浏览器时，初始运动定时器的数据
      }
    },
    methods: {
      heightFn() {
        let slideImg = this.$refs.slideImg;
        let child = slideImg.children[0];
        let height = 0;
        height = child.offsetHeight;
        slideImg.style.height = height + 'px'
      },
      next() {
        // 下一张　　　
        // 为了避免连续点击。让bFlag运动结束后再变为true。　　　　　　　　　　　　　　
        if (this.bFlag) {
          this.bFlag = false;
          this.clearT();　　　　　　　　　   // 运动之前，清除所有定时器。
          this.n = this.n + 1 === this.slideList.length ? 0 : this.n + 1;　  // 下一张，如果是第4张，就返回第一张。
          // 调用timeout函数，延迟进入下一次轮播，以便可以点击切换。
          this.timeout();
        }
      },
      clearT() {
        // 清除所有定时器　　　　　　　　　　　　　　　
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
      },
      timeout() {
        // 运动结束后设置bFlag为true，并且3秒后调用next，进行下一次运动。
        // 运动时间是1s。
        this.timer2 = setTimeout(() => {
          this.bFlag = true
        }, 1500);
        this.timer1 = setTimeout(() => {
          this.next()
        }, 3000);
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.heightFn();
        window.addEventListener('resize', () => {
          this.heightFn();
        })
      });
      this.timer3 = setTimeout(this.next, 0);
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .slide{
    width: 100%;
    position: relative;
    .slideImg{
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .bannerActive{
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      transform: scale(0.1);
      opacity: 0;
      transition: all 1s;
      a{
        display: block;
      }
      img{
        display: block;
        width: 100%;
      }
      &.active{
        transform: scale(1) !important;
        opacity: 1 !important;
      }
    }
  }
</style>
