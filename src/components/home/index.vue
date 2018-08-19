<template>
  <div class="index fixedB" v-title="title">
    <banner :bannerList="banner"></banner>
    <nav-ber></nav-ber>
    <!--520-->
    <router-link :to="{name:'chuangke'}">
      <div class="loves loves_bg" v-if="loves.length">
        <img src="http://img.hena360.cn/m_520.png" alt="" width="100%">
      </div>
    </router-link>
    <!--520产品-->
    <div class="v_scrolls">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(v,k) in bannerList" :key="k" v-lazy="v.goods_logo">
          <router-link :to="{name:'CommodityDetails',query:{id:v.id}}">
            <img :src="v.goods_logo"/>
            <p>{{v.goods_name}}</p>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
    <div class="hr"></div>
    <!--福利库-->
    <router-link to="/libraries/libraries" >
      <div class="libra loves libra_bg" v-if="libraList.length">
        <!--<slide :slideList="libraList"></slide>-->
        <img src="http://img.hena360.cn/m_flk.png" alt="" width="100%" ref="libraries"/>
      </div>
    </router-link>
    <!--<div class="loves" v-if="loves.length" >-->
    <!--<img src="http://img.hena360.cn/m_520.png" alt="" width="100%">-->
    <!--</div>-->
    <!--福利库产品-->
    <div class="libra_public">
      <div class="public_items">
        <div class="items" v-for="(v,k) in social" :key="k" v-lazy="v.goods_logo">
          <router-link :to="{name:'CommodityDetails',query:{id:v.id}}">
            <div class="item_img">
              <img :src="v.goods_logo" class="mui-slider" >
            </div>
            <div class="item_content">
              <h3 class="title1"><span>{{v.goods_name}}</span></h3>
              <p class="dec">
                <span>{{v.pre_sale_start_date}}-{{v.pre_sale_end_date}}</span>
                <span>限时抢购</span>
              </p>
              <div class="price_lq">
                <span class="price_lt">￥{{v.goods_price}}</span>
                <button type="button" class="btn">领取</button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!--爆品库-->
    <router-link to="/detonation">
      <div class="detonation loves detonation_bg">
        <img src="http://img.hena360.cn/m_bpk.png" alt="">
      </div>
    </router-link>
    <!--爆品库产品-->
    <div class="detonationList">
      <div v-for="(v,k) in exp" :key="k" v-lazy="v.bg_img">
        <router-link :to="{name:'CommodityDetails',query:{id:v.id}}">
          <img :src="v.bg_img" alt="" class="mui-slider" style="padding: 0 10px 5px 10px;">
        </router-link>
      </div>
    </div>
    <a href="http://jd.hena360.com" style="    display: block; background: #f2f2f2;padding-top: 15px">
      <img src="http://img.hena360.cn/JD1.png" alt="" class="mui-slider" style="padding: 0 10px 5px 10px;">
    </a>
    <!--共享库-->
    <router-link to="/shared">
      <div class="shared loves shared_bg">
        <img src="http://img.hena360.cn/m_gxk.png" alt="">
      </div>
    </router-link>
    <!--共享库开始-->
    <div class="shared_list">
      <ul class="shared_item">
        <router-link :to="{name:'CommodityDetails',query:{id:v.id}}" v-for="(v,k) in Share" :key="k" v-lazy="v.goods_logo">
          <li class="item">
            <div class="item_list">
              <img :src="v.goods_logo" alt="" width="100%">
              <h3 class="name">{{v.goods_name}}</h3>
              <p class="price_i">￥{{v.goods_price}}</p>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
    <!-- 公告栏-->
    <div class="notice">
      <img src="http://img.hena360.cn/footerLogo.jpg" alt="" class="mui-slider">
    </div>
    <div class="Mask" @click="Mask" v-show="isShow" v-if="Notice !=null"></div>
    <div class="Notice" v-show="isShow" v-if="Notice !=null">
      <img src="http://img.hena360.cn/x.png" alt="" style="width: 5%; display: block; float: right;margin-bottom: 5%;"
           @click="Mask" v-show="isShow">
      <a :href="Notice.jump_url">
        <img :src="Notice.file" alt="">
      </a>
    </div>
    <follow></follow>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as config from 'common/js/config'
  import NavBer from './index/navBer'
  import Banner from 'base/banner/banner'
  import Slide from './index/slide'
  import follow from 'base/follow/follow'
  export default {
    name: "index",
    data() {
      return {
        title: '合纳共享',
        swiperOptions: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
        bannerList: [],
        loves: ['http://img.hena360.cn/i_520.png', 'http://img.hena360.cn/i_520.png'],
        libraList: ['http://img.hena360.cn/i_flk.png', 'http://img.hena360.cn/i_flk.png'],
        social: [],
        exp: [],
        Share: [],
        banner: [],
        Notice: {},
        isShow: false,
        fullHeight: document.documentElement.clientHeight
      }
    },
    watch: {
      'Notice'() {
        this.isShow = this.Notice != null
      }
    },
    created() {
// 推荐人绑定关系
      let url = window.location.href
      let str = url.split('mid=')
      let _mid = 0
      if (str[1]) {
        let minStr = str[1].split('#/')
        _mid = minStr[0]
      }

      console.log(_mid)
      this.$axios.get('common/set-inv-id?mid=' + _mid)
        .then(res => {
          console.log(res)
        })

      // this.$axios.get('/goods/goods/index?acttype=2')
      this.$axios.get('/home/index/index?acttype=2')
        .then(res => {

          this.social = res.data.data.items
        })
      // this.$axios.get('/goods/goods/index?acttype=4')
      this.$axios.get('/home/index/index?acttype=4')
        .then(res => {
          this.exp = res.data.data.items
        })
      // this.$axios.get('/goods/goods/index?acttype=5')
      this.$axios.get('/home/index/index?acttype=5')
        .then(res => {
          this.Share = res.data.data.items
        })
      // this.$axios.get('/goods/goods/index?acttype=1')
      this.$axios.get('/home/index/index?acttype=1')
        .then(res => {
          this.bannerList = res.data.data.items
        })
      this.$axios.get('/home/index/banner')
        .then(res => {
          this.banner = res.data.data
        })
      this.$axios.get('/app/notice/one-bulletin')
        .then(res => {
          this.Notice = res.data.data
        })


    },
    mounted() {
      this.$wxSDK._wxSDk(this)
      //获取滚动条高度
      // window.addEventListener('scroll', this.handleScroll)
      // this.init()
    },
    methods: {
      Mask() {
        this.isShow = !this.isShow
      },
      follow(){
       this.isfollowMask = !this.isfollowMask
      }
      // //获取滚动条高度
      // handleScroll () {
      //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   console.log(scrollTop)
      // },
      // init(){
      //   librariesHeight = this.$refs.libraries.offsetTop+this.fullHeight/2
      //    console.log(this.$refs.libraries.scrollTop)
      // }
    },
    components: {
      NavBer,
      Banner,
      Slide,
      follow
    }

  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .loves_bg {
    background: url("http://img.hena360.cn/m_520.jpg") no-repeat center;
    background-size: 100% 100%;
  }

  .libra_bg {
    background: url("http://img.hena360.cn/m_flk.jpg") no-repeat center;
    background-size: 100% 100%;
  }

  .detonation_bg {
    background: url("http://img.hena360.cn/m_bpk.jpg") no-repeat center;
    background-size: 100% 100%;
  }

  .shared_bg {
    background: url("http://img.hena360.cn/m_gxk.jpg") no-repeat center;
    background-size: 100% 100%;
  }

  .loves {
    width: 100%;
    padding: 10% 0;
    animation: myfirst 3s;
    -moz-animation: myfirst 3s; /* Firefox */
    -webkit-animation: myfirst 3s; /* Safari and Chrome */
    -o-animation: myfirst 3s; /* Opera */
    animation-fill-mode: forwards;
    margin-bottom: 2%;
    img {
      width: 68%;
      display: block;
      margin: 0 auto;
    }
  }

  @keyframes myfirst {
    from {
      background-size: 100% 100%;
    }
    to {
      background-size: 155% 155%;
    }
  }

  .v_scrolls {
    padding: 0 10px 10px;
    a p {
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 300%;
      color: #000000;
    }
  }

  .libra {
    width: 100%;
  }

  .libra_public {
    width: 100%;
    padding: 0 10px;
    .public_items {
      width: 100%;
      display: block;
    }
    .items {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #f2f2f2;
      a {
        display: block;
        width: 100%;
      }
      .item_img {
        width: 33%;
        flex: 0 0 auto;
        max-height: 200px;
        float: left;
        .mui-slider {
          position: relative;
          z-index: 1;
          overflow: hidden;
          width: 100%;
        }
      }
      .item_content {
        flex: 1;
        padding-left: 10px;
        overflow: hidden;
        width: 67%;
        float: left;
        .title1 {
          font-size: 15px;
          font-weight: normal;
          line-height: 24px;
          span {
            display: inline-block;
            width: 95%;
            overflow: hidden;
            white-space: nowrap;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            text-align: left;
          }
        }
        .dec {
          width: 100%;
          font-size: 0;
          padding-bottom: 10px;
          span {
            display: inline-block;
            font-size: 12px;
            padding: 4px 8px;
            border:1px solid #ff8618;
            &:nth-child(1) {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
              color: #e18c47;
            }
            &:nth-child(2) {
              background: #ff8618;
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
              color: #fff;
            }
          }
        }
        .price_lq {
          width: 100%;
          margin-top: 5px;
          overflow: hidden;
          .price_lt {
            float: left;
            font-size: 17px;
            line-height: 30px;
            color: #ff8618;
            font-weight:600;
          }
          .btn {
            float: right;
            margin-right: 10px;
            font-size: 14px;
          background-image: -webkit-linear-gradient(0deg, #a148ff, #ad6cfb);
            color: white;
            border: none;
            outline: none;
            padding: 8px 20px;
            border-radius: 4px;
          }
        }
      }
    }
  }

  .detonation, .shared {
    display: block;
    width: 100%;
    img {
      display: block;
    }
  }

  .shared {
    margin-top: 10px;
  }

  .shared_list {
    width: 100%;
    padding: 10px 5px;
    .shared_item {
      width: 100%;
      overflow: hidden;
    }
    .item {
      width: 50%;
      float: left;
      padding: 5px;
      .item_list {
        width: 100%;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          max-height: 200px;
        }
        .name {
          font-size: 14px;
          line-height: 26px;
          width: 98%;
          overflow: hidden;
          white-space: nowrap;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }
        .price_i {
          color: #8e49f7;
          font-size: 16px;
        }
      }
    }
  }

  .notice {
    width: 100%;
    img {
      width: 100%;
    }
  }

  .Mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, .3);
  }

  .Notice {
    position: fixed;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 100%;
    z-index: 3;
  }
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    border-radius: 100%;
  }
.follow {
  position: fixed;
  bottom: 55px;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,.5);
  color: #ffffff;
  z-index: 999;
  line-height: 40px;
  padding: 0 15px;
  font-size: 12px;
  display: inline-block;
  img {
    width: 16%;
    vertical-align: middle;
    display: inline-block;
    float: right;
    margin-top: 2.7%;
  }
}
  .followMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: #000000;
    padding: 10%;
    color: #ffffff;
    img {
      width: 75%;
      margin: 5% auto 0;
      display: block;
    }
    h3 {

      font-size: 16px;
      text-align: center;
      line-height: 400%;
      border-bottom: 1px solid #666666;
    }
    h4 {
      line-height: 400%;
      text-align: center;
    }
    div{
      width: 80%;
      margin: 0 auto;
      p {
        line-height: 150%;
        font-size: 14px;
        color: #ffffff;
      }
      img {
        width: 15%;
        margin-top: 15%;
      }
    }
  }

</style>
