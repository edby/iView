<template>
  <div v-title="title">    <!--大盟友  -->
    <allyNav></allyNav>
    <img :src="imgs" class="img_one" v-show="items.length == 0"/>
    <div class="ally"
         v-if="items.length != 0"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0"
         v-show="showss"
    >
      <Row v-for="(v,k) in items" :key="k">
        <Col span="6" class="avatar"><img :src="v.avatar" alt=""/></Col>
        <Col span="18">
          <div class="level">
            <img v-if="v.level==1" src="http://img.hena360.cn/V0.png" alt="">
            <img v-if="v.level==2" src="http://img.hena360.cn/V1.png" alt="">
            <img v-if="v.level==3" src="http://img.hena360.cn/V2.png" alt="">
            <img v-if="v.level==4" src="http://img.hena360.cn/V3.png" alt="">
            <img v-if="v.level==5" src="http://img.hena360.cn/V4.png" alt="">
            <img v-if="v.level==6" src="http://img.hena360.cn/V5.png" alt="">
            <img v-if="v.level==7" src="http://img.hena360.cn/V6.png" alt="">
            <img v-if="v.level==8" src="http://img.hena360.cn/V7.png" alt="">
            <img v-if="v.level==9" src="http://img.hena360.cn/V8.png" alt="">
            <img v-if="v.level==10" src="http://img.hena360.cn/V9.png" alt="">
            <img v-if="v.level==11" src="http://img.hena360.cn/V10.png" alt="">
            <img v-if="v.level==12" src="http://img.hena360.cn/V11.png" alt="">
            <img v-if="v.level==13" src="http://img.hena360.cn/V12.png" alt="">
            {{v.nickname}}
          </div>
          <div>手机：{{v.tel}}</div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import allyNav from '../../../base/user/allyNav'

  export default {
    name: "GreatAlly",
    components: {
      allyNav
    },
    data() {
      return {
        title: "我的盟友",
        items: '',
        nav: [
          {url: 'GreatAlly', title: '大盟友'},
          {url: 'juniorAlly', title: '小盟友'},
        ],
        page: 1,
        loading: false,
        shows: false,
        imgs: "",
        showss: true
      }
    },
    created() {
      this.getUserCoupon()
    },
    methods: {
      loadMore() {
        this.page = parseInt(this.page) + 1;
        this.getUserCoupon()
      },
      getUserCoupon() {
        this.$axios.get('/guest/level-rel/lower-o?per-page=10&page=' + this.page)
          .then(res => {
            console.log(res)
            if (this.items.length === 0) {
              this.items = res.data.data.items
              this.shows = true;
              this.imgs = "http://img.hena360.cn/no_data_img.png";
            } else {
              this.shows = false;
              this.showss = true;

              this.items = this.items.concat(res.data.data.items)
            }
            this.isHaveMore(res.data.data._meta.currentPage < res.data.data._meta.pageCount);
          })
      },
      isHaveMore(isHaveMore) {
        if (isHaveMore) {
          this.loading = false;
        } else {
          this.loading = true;
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .ally {
    padding: 5px 15px;
    margin-top: 45px;
    .ivu-row {
      padding: 5px;
      border-bottom: 1px solid #f2f2f2;
    }
    .ivu-col-span-18 {
      line-height: 200%;
      img {
        display: inline-block;
        float: left;
      }
    }
  }

  .avatar img {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    width: 70%;

  }

  .level img {
    width: 11%;
  }

  .level {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .img_one {
    width: 25%;
    margin: 40%;
  }
</style>
