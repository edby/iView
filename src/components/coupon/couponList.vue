<template>
  <div class="couponList">
    <ul class="header_nav">
      <li v-for="(nav,i) in navList" :key="i"
          :class="{'active' : curIndex == i}"
          @click="navFn(i)">{{nav.title}}
      </li>
    </ul>
    <div class="content-box">
      <div class="content" >
        <div class="items_list" v-if="curIndex == 0 && userList.length != 0" :key="0">
          <ass-coupon
            v-infinite-scroll="loadMoreL"
            infinite-scroll-disabled="loadingL"
            infinite-scroll-distance="0"
            :dataList="userList" @contentFn="contentFn"></ass-coupon>
        </div>
        <div class="items_list" v-if="curIndex == 1 && expiredList.length != 0" :key="1">
          <ass-coupon
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="0"
            :dataList="expiredList" @contentFn="contentFn"></ass-coupon>
        </div>
      </div>
    </div>
    <div class="heel" @click="Receive">
      领取更多优惠券&gt;
    </div>
    <detail-list
      :dataList="detailData"
      :isDetail="isDetail"
      @isCloseDetail="isCloseDetail"
    ></detail-list>
    <!--<noData v-if="isNoData"></noData>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import assCoupon from './assembly/assCoupon'
  import DetailList from './assembly/detailList'
  // import noData from 'base/noData/noData'

  export default {
    name: "couponList",
    data() {
      return {
        curIndex: 1,
        navList: [
          {
            id: 1,
            title: '已使用'
          },
          {
            id: 2,
            title: '已过期'
          }
        ],
        expiredList: [], // 已过期
        userList: [],
        detailData:[],
        isDetail: false,
        page:1,
        loading: false,
        pageL: 1,
        loadingL: false,
      }
    },
    created() {
      if (this.$route.query.curIndex != undefined) {
        let _index = this.$route.query.curIndex;
        this.curIndex = _index;
      }
      this.getExpiredList();
      this.getUserList();
    },
    computed: {
      isNoData() {
        if (this.curIndex == 1) {
          return this.expiredList.length == 0
        }
        if (this.curIndex == 0) {
          return this.userList == 0
        }
      }
    },
    watch: {
      // curIndex() {
      //   if (this.curIndex === 0) {
      //     this.isNoData = this.userList == 0 ? true : false
      //   }
      //   if (this.curIndex === 1) {
      //     setTimeout(() => {
      //       this.isNoData = this.expiredList.length == 0 ? true : false
      //     }, 100)
      //   }
      // }
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      loadMoreL() {
        this.more()
      },
      getUserList() {
        this.$axios.get('/user/coupon/used-list?page=' + this.pageL)
          .then(res => {
            if (res.data.code == 2000) {
              console.log(res.data.data.items)
              if (this.userList.length === 0) {
                this.userList = res.data.data.items
              } else {
                this.userList = this.userList.concat(res.data.data.items)
              }
              this.isHaveMoreL(res.data.data._meta.currentPage < res.data.data._meta.pageCount);
            }
          })
      },
      more(){
        this.pageL = parseInt(this.pageL) + 1;
        this.getUserList()
      },
      isHaveMoreL(isHaveMore) {
        if (isHaveMore) {
          this.loadingL = false;
        } else {
          this.loadingL = true;
        }
      },
      loadMore(){
        this.page = parseInt(this.page) + 1;
        this.getExpiredList()
      },
      getExpiredList() {
        this.$axios.get('/user/coupon/expired-list?page=' + this.page)
          .then(res => {
            if (res.data.code == 2000) {
              console.log(res.data.data.items)
              if (this.expiredList.length === 0) {
                this.expiredList = res.data.data.items
              }else {
                this.expiredList = this.expiredList.concat(res.data.data.items)
              }
              this.isHaveMore(res.data.data._meta.currentPage < res.data.data._meta.pageCount);
            }
          })
      },
      isHaveMore(isHaveMore) {
        if (isHaveMore) {
          this.loading = false;
        } else {
          this.loading = true;
        }
      },
      navFn(i) {
        this.curIndex = i
      },
      Receive() {
        this.$router.push({name:'Collar'})
      },

      contentFn(item){
        console.log(item)
        alert(item.id)
        this.$axios.get('/user/coupon/detail?id='+item.id)
          .then(res => {
            if (res.data.code == 2000) {
              console.log(res.data.data);
              this.detailData = res.data.data;
              this.isDetail = true
            }
          })
      },
      isCloseDetail(){
        this.isDetail = false
      }
    },
    components: {
      assCoupon,
      DetailList
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  $abs = 100%

  .couponList
    width $abs
    overflow: hidden;
  .content
    width $abs
    position: fixed
    top: 46px
    left: 0
    bottom: 40px;
    overflow: hidden;
    overflow-y auto
    z-index: 99;

  .header_nav
    width 100%
    position: fixed
    height: 45px
    line-height 45px
    overflow: hidden;
    top 0
    left: 0
    background white
    z-index: 9999;
    li
      float: left
      text-align center
      height: 44px
      line-height 44px
      width 50%
      border-bottom: 1px solid #eee;
      &.active
        position: relative
        &:after
          content: ''
          position: absolute
          width $abs
          height: 2px
          bottom: 0;
          left: 0
          background rgb(138, 76, 237);
          z-index: 9999;

  .items_list
    position: absolute
    width $abs
    padding: 10px
    top: 0
    z-index: 9999;

  .heel
    position: absolute
    left: 0
    bottom: 0;
    width $abs
    text-align center
    font-size 14px
    height: 40px
    line-height 40px
</style>
