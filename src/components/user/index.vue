// 个人中心
<template>
  <div v-title="title">
    <div class="top">
      <!-- 头部 -->
      <p class="setting">
        <img src="http://img.hena360.cn/_pic35.png" alt="" @click="inform()">
      </p>
      <!-- 信息 -->
      <Row class="top_img">
        <Col span="5" class="name_img">
          <img :src="mess.avatar" alt="">
        </Col>
        <Col span="19" class="grader">
          <p class="nickname" v-cloak>{{mess.nickname}}</p>
          <p class="dengji" v-if="mess.level==1">
            <img src="http://img.hena360.cn/V0.png" alt="">
            <span>盟友</span>
          </p>
          <p class="dengji" v-if="mess.level==2">
            <img src="http://img.hena360.cn/V1.png" alt="">
            <span>店主</span>
          </p>
          <p class="dengji" v-if="mess.level==3">
            <img src="http://img.hena360.cn/V2.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==4">
            <img src="http://img.hena360.cn/V3.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==5">
            <img src="http://img.hena360.cn/V4.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==6">
            <img src="http://img.hena360.cn/V5.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==7">
            <img src="http://img.hena360.cn/V6.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==8">
            <img src="http://img.hena360.cn/V7.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==9">
            <img src="http://img.hena360.cn/V8.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==10">
            <img src="http://img.hena360.cn/V9.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==11">
            <img src="http://img.hena360.cn/V10.png" alt="">
            <span>微咖</span>
          </p>
          <p class="dengji" v-if="mess.level==12">
            <img src="http://img.hena360.cn/V11.png" alt="">
            <span>创咖</span>
          </p>
          <p class="dengji" v-if="mess.level==13">
            <img src="http://img.hena360.cn/V12.png" alt="">
            <span>董咖</span>
          </p>
        </Col>
      </Row>

    </div>
    </Row>
    <!-- 盟豆纳豆 -->
    <Row class="top_dou">
      <router-link to="/user/nadou/natto">
        <Col span="12" class="meng">
          <img src="http://img.hena360.cn/nadou.png" alt="">
          <span>纳豆</span>
        </Col>
      </router-link>
      <router-link to="/user/meng/paradise">
        <Col span="12">
          <img src="http://img.hena360.cn/my_head%20%281%29.png" alt="">
          <span>盟豆</span>
        </Col>
      </router-link>
    </Row>
    <!-- 我的订单 -->
    <!-- <div class="order" @click="order()">
        <span>我的订单</span>
        <Icon type="chevron-right"></Icon>
    </div> -->
    <!-- 发货 -->

    <Row class="deliver">
      <router-link to="/user/order/orderpending">
        <Col span="8">
          <img src="http://img.hena360.cn/_pic56.png" alt="">
          <span>待付款</span>
        </Col>
      </router-link>
      <router-link to="/user/order/orderdelivergoods">
        <Col span="8">
          <img src="http://img.hena360.cn/_pic50.png" alt="">
          <span>待发货</span>
        </Col>
      </router-link>
      <router-link to="/user/order/ordergoodstobereceived">
        <Col span="8">
          <img src="http://img.hena360.cn/_pic44.png" alt="">
          <span>已发货</span>
        </Col>
      </router-link>

    </Row>
    <!-- 功能区 -->
    <Row class="func">
      <router-link to="/user/address/addressList">
        <Col span="8">
          <img src="http://img.hena360.cn/_pic52.png" alt="">
          <span>地址管理</span>
        </Col>
      </router-link>
      <router-link to="/user/content/generalize">
        <Col span="8">
          <img src="http://img.hena360.cn/_pic43.png" alt="">
          <span>邀请好友</span>
        </Col>
      </router-link>
      <router-link to="/user/content/welfare">
        <Col span="8">
          <img src="http://img.hena360.cn/_pic64.png" alt="">
          <span>我的福利</span>
        </Col>
      </router-link>
      <router-link to="/user/content/collect">
        <Col span="8">
          <img src="http://img.hena360.cn/user_02.png" alt="">
          <span>我的收藏</span>
        </Col>
      </router-link>
      <router-link to="/user/helpcenter/help">
        <Col span="8">
          <img src="http://img.hena360.cn/user_01.png" alt="">
          <span>帮助中心</span>
        </Col>
      </router-link>
      <router-link to="/coupon">
        <Col span="8">
          <img src="http://img.hena360.cn/_pic13.png" alt="">
          <span>优惠券 </span>
        </Col>
      </router-link>
    </Row>
    <img src="http://img.hena360.cn/footerLogo.jpg" alt="" class="img">
    <follow></follow>
    <v-footer></v-footer>
  </div>
   
</template>
<script>

  // import {getLogin} from "common/js/isLogin";
  import {mapGetters, mapMutations} from 'vuex'
  import follow from 'base/follow/follow'

  export default {
    name: "center",
    data() {
      return {
        title: '个人中心',
        mess: {},
        imgurl: "http://img.hena360.cn/head_img.png"
      };
    },
    components: {
      follow
    },

    created() {
      // getLogin(this);
      this.$axios.get('/common/is-login')
        .then(res => {
          if (res.data.code == 1000) {
            let baseUrl = '/login?callBack='
            this.$storage.set('isLogin', res.data.code)
            this.setLoginUrl(baseUrl)
            this.setLoginCode(res.data.code)
            this.$router.push({
              path: '/login?callBack=' + encodeURIComponent(window.location.href)
            })
          }
          if (res.data.code == 2000) {
            this.$storage.set('isLogin', res.data.code)
            this.setLoginCode(res.data.code)
          }
        })
      this.$axios.get("/user/index/view") //获取信息
        .then(res => {
          this.mess = res.data.data;
          this.imgurl = res.data.data.avatar;
        });
      this.$wxSDK._wxSDk(this)
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'loginUrl'
      ])
    },
    methods: {
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      }),
      inform() {
        this.$router.push({name: "information"});
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  [v-cloak] {
    display: none;
  }

  * {
    padding: 0px;
    margin: 0px;
  }

  // 顶部开始
  .top {
    overflow: hidden;
    width: 100%;
    background-color: #000;
    background: url("http://img.hena360.cn/mypic.png") no-repeat center;
    background-size: 100% 100%;
    color: #fff;
    padding: 0 15px 25px 15px;
    .setting {
      height: 35px;
      img {
        width: 9%;
        float: right;
        padding-top: 10px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .top_img {
      .name_img {
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .grader {
        padding-left: 5%;
        .nickname {
          font-size: 16px !important;
          color: #fff;
        }
        .dengji {
          width: 24%;
          border-radius: 10px;
          background-color: #333;
          margin-top: 4%;
          img {
            width: 36%;
            vertical-align: middle;
            padding-left: 6px;
          }
          span {
            font-size: 13px !important;
          }
        }
      }
    }
  }

  //盟豆纳豆
  .top_dou {
    background-color: #1c1c1c;
    padding: 5px 0px;
    .meng {
      border-right: 1px solid #ccc;
    }
    div {
      font-size: 14px;
      text-align: center;
      img {
        vertical-align: middle;
        width: 20%;
      }
      span {
        color: #fff;
        font-size: 12px !important;
      }
    }
  }

  // 顶部结束
  .order {
    width: 100%;
    height: 44px;
    line-height: 42px;
    border-bottom: 1px solid #e4e3e6;

    span {
      padding-left: 4%;
      float: left;
      color: #000;
      font-size: 14px;
    }
    i {
      color: #bbb;
      float: right;
      font-size: 15px;
      padding: 15px 10px 0 0;
    }
  }

  // 订单结束
  .deliver {
    text-align: center;

    div {
      padding: 10px;

      img {
        width: 36%;
      }
      span {
        font-size: 12px !important;
        color: #333;
        display: block;
        padding: 3px;
      }
    }
  }

  // 发货结束
  .func {
    border-top: 10px solid #f2f2f2;
    border-bottom: 10px solid #f2f2f2;
    text-align: center;
    div {
      padding: 28px;
      border-right: 1px solid #f2f2f2;
      border-bottom: 1px solid #f2f2f2;

      img {
        width: 65%;
      }
      span {
        font-size: 12px !important;
        color: #333;
        display: block;
        padding: 5px;
      }
    }
  }

  //功能区结束
  .img {
    width: 100%;
  }

</style>
