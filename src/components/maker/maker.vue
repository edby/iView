<template>
  <div v-title="title">
    <!-- 头部 -->
    <div class="maker_top">
      <img :src="maker.avatar" alt="" v-cloak>
      <p v-cloak>{{maker.nickname}}</p>

      <p class="jibie" v-if="maker.level==1">
        <img src="http://img.hena360.cn/V0.png" alt="">
        盟友
      </p>
      <p class="jibie" v-if="maker.level==2">
        <img src="http://img.hena360.cn/V1.png" alt="">
        店主
      </p>
      <p class="jibie" v-if="maker.level==3">
        <img src="http://img.hena360.cn/V2.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==4">
        <img src="http://img.hena360.cn/V3.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==5">
        <img src="http://img.hena360.cn/V4.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==6">
        <img src="http://img.hena360.cn/V5.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==7">
        <img src="http://img.hena360.cn/V6.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==8">
        <img src="http://img.hena360.cn/V7.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==9">
        <img src="http://img.hena360.cn/V8.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==10">
        <img src="http://img.hena360.cn/V9.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==11">
        <img src="http://img.hena360.cn/V10.png" alt="">
        微咖
      </p>
      <p class="jibie" v-if="maker.level==12">
        <img src="http://img.hena360.cn/V11.png" alt="">
        创咖
      </p>
      <p class="jibie" v-if="maker.level==13">
        <img src="http://img.hena360.cn/V12.png" alt="">
        董咖
      </p>
      <Row class="top_invite">
        <Col span="8">
          <p>提现奖金</p>
          <p>{{maker.withdraw_bonus}}</p>
        </Col>
        <Col span="8">
          <p>邀请人</p>
          <p v-cloak v-if="maker.inv_id == '0' ">系统</p>
          <p v-cloak v-if="maker.inv_id != '0' ">{{man}}</p>
        </Col>
        <router-link to="/maker/exchange/Bonus/BonusEmbody">
          <Col span="8">
            <p>销售收益</p>
            <p v-cloak>{{maker.bonus}}</p>
          </Col>
        </router-link>
      </Row>
    </div>
    <!-- 功能区 -->
    <Row class="maker_bottom">
      <router-link to="/maker/exchange/ExchangeOfBeans">
        <Col span="12">
          <img src="http://img.hena360.cn/maker (4).png" alt="">
          <span>销售收益</span>
        </Col>
      </router-link>
      <router-link to="/maker/Businessorder/index">

        <Col span="12">
          <img src="http://img.hena360.cn/maker (5).png" alt="">
          <span>业务订单</span>
        </Col>
      </router-link>
      <router-link to="/maker/ally/GreatAlly">
        <Col span="12">
          <img src="http://img.hena360.cn/maker (2).png" alt="">
          <span>我的盟友</span>
        </Col>
      </router-link>
      <router-link to="/user/content/generalize">
        <Col span="12">
          <img src="http://img.hena360.cn/maker (1).png" alt="">
          <span>推广二维码</span>
        </Col>
      </router-link>
      <router-link to="/user/content/generalize">
        <Col span="12">
          <img src="http://img.hena360.cn/maker (6).png" alt="">
          <span>董事中心</span>
        </Col>
      </router-link>
      <router-link to="/user/content/generalize">
        <Col span="12">
          <img src="http://img.hena360.cn/maker (3).png" alt="">
          <span>城市联盟商</span>
        </Col>
      </router-link>
      <!--<router-link to="/maker/ranking/ranking">-->
        <!--<Col span="12">-->
          <!--<img src="http://img.hena360.cn/maker (3).png" alt="">-->
          <!--<span>奖金排名</span>-->
        <!--</Col>-->
      <!--</router-link>-->
    </Row>
    <img src="http://img.hena360.cn/footerLogo.jpg" alt="" class="img">
    <follow></follow>
    <v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import follow from 'base/follow/follow'

  export default {
    name: "maker",
    data() {
      return {
        title: "创客中心",
        imgurl: "http://img.hena360.cn/head_img.png",
        maker: {},
        man: "系统"
      };
    },
    components: {
      follow
    },
    created() {
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
          // console.log(res)
          this.maker = res.data.data;
          this.imgurl = res.data.data.avatar;
          this.man = res.data.data.inv_nickname
          if (res.data.data.level <= 1) {
            this.$router.push('/home/pagefile/chuangke/chuangke')
          }
        });
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
      })
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  * {
    padding: 0px;
    margin: 0px;
  }

  p {
    color: #fff;
  }

  [v-cloak] {
    display: none;
  }

  .maker_top {
    text-align: center;
    width: 100%;
    background-color: #000;
    color: #fff;
    img {
      width: 20%;

      border-radius: 50%;
      margin-top: 5%;
    }
    p {
      padding: 5px 0px;
    }
    .jibie {
      text-align: center;
      color: #c0a369;
      font-size: 11px;
      img {
        width: 5%;
        border: none;
        margin-top: 0px;
        vertical-align: middle;
      }
    }
    .top_invite {
      border-top: 1px solid #302f2f;
      padding: 7px 0px;
      div {
        border-right: 1px solid #302f2f;
        p:first-child {
          font-size: 14px;
          padding-bottom: 8px;
        }
        p:last-child {
          font-size: 14px;
          color: #c0a369;
        }
      }
    }
  }

  .maker_bottom {
    div {
      text-align: center;
      padding: 6%;
      border-right: 1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
      img {
        width: 38%;
        vertical-align: middle;
      }
      span {
        display: block;
        font-size: 12px;
      }
    }
  }

  .img {
    width: 100%;
  }

  .footer {
    position: fixed;
    height: 55px;
    width: 100%;
    left: 0;
    background: #ffffff;
    border-top: 1px solid #cccccc;
    bottom: 0;
    z-index: 9000;
    li {
      width: 25%;
      color: #000000;
      float: left;
      text-align: center;
      font-size: 12px;
      padding: 0;
      h3 {
        /*line-height: 150%;*/
      }
      img {
        width: 38%;
      }
    }
  }

</style>
