<template>
  <div class="coupon" v-title="title">
    <div v-if="UserCouponList.length != 0">
      <ass-coupon
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
        :dataList="UserCouponList"
        @contentFn="contentFn"></ass-coupon>
    </div>
    <div class="footers">
      <div class="box">
        <div class="f_items" @click="Invalid">查看已失效的优惠券</div>
        <div class="f_items" @click="Receive">领取更多优惠券</div>
      </div>
    </div>
    <detail-list
      :dataList="detailData"
      :isDetail="isDetail"
      @isCloseDetail="isCloseDetail"
      @Immediate="Immediate"
    ></detail-list>
    <noData v-if="UserCouponList.length == 0"></noData>
  </div>
</template>

<script type="text/ecmascript-6">
  import assCoupon from './assembly/assCoupon'
  import DetailList from './assembly/detailList'
  import noData from 'base/noData/noData'

  export default {
    name: "coupon",
    data() {
      return {
        UserCouponList: [],
        detailData: {},
        isDetail: false,
        title: '优惠券',
        page: 1,
        loading: false,
      }
    },
    created() {
      this.getUserCoupon();
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      loadMore() {
        this.more()
      },
      getUserCoupon() {
        this.$axios.get('/user/index/user-coupon?page='+this.page)
          .then(res => {
            if (res.data.code == 2000) {
              console.log(res.data);
              if (this.UserCouponList.length === 0) {
                this.UserCouponList = res.data.data.items
              } else {
                this.UserCouponList = this.UserCouponList.concat(res.data.data.items)
              }
              this.isHaveMore(res.data.data._meta.currentPage < res.data.data._meta.pageCount);
            }
          })
      },
      more(){
        this.page = parseInt(this.page) + 1;
        this.getUserCoupon()
      },
      isHaveMore(isHaveMore) {
        if (isHaveMore) {
          this.loading = false;
        } else {
          this.loading = true;
        }
      },
      Invalid() {
        this.$router.push({
          path: '/couponList',
          query: {
            curIndex: 1
          }
        })
      },
      Receive() {
        // layer.msg('暂未开放，敬请期待！')
        this.$router.push({name:'Collar'})
      },
      contentFn(item) {
        console.log(item.coupon_id);
        this.$axios.get('/user/coupon/detail?id=' + item.id)
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              console.log(res.data.data);
              this.detailData = res.data.data;
              this.isDetail = true
            }
          })
      },
      isCloseDetail() {
        this.isDetail = false
      },
      Immediate(item) {
        console.log(item)
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    components: {
      assCoupon,
      DetailList,
      noData
    }
  }
</script>


<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  $abs = 100%
  .ToLoadMore
    width 100%
    height: 45px
    line-height 45px
    font-size 16px
    color #333
    text-align center
  .coupon
    padding: 10px;
    padding-bottom 50px
  .footers
    position: fixed
    width $abs
    height: 48px
    line-height 48px
    bottom: 0;
    left: 0
    border-top: 1px solid #ccc
    background-color: #fff
    z-index: 9999;
    .box
      width $abs
      overflow: hidden;
      .f_items
        width 50%
        float: left
        text-align center
        font-size 14px
        cursor: pointer;
        &:first-of-type
          position: relative
          &:after
            content: ''
            height 20px
            width: 1px;
            background #8D8D8D
            position: absolute
            top: 14px
            right: 0
        &:last-of-type
          color rgb(138, 76, 237)
</style>
