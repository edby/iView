<template>
  <div class="FoundPage" v-title="title">
    <div class="nav">
      <ul>
        <li>
          <router-link :to="{name: 'recommends'}" replace >推荐</router-link>
        </li>
        <li>
          <router-link :to="{name: 'focus'}" replace >关注</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <release-module></release-module>
    <follow></follow>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/VHeader/VHeader'
  import {mapGetters, mapMutations} from 'vuex'
  import follow from 'base/follow/follow'
  export default {
    name: "FoundPage",
    data() {
      return {
        title: '发现'
      }
    },
    computed: {
      ...mapGetters([
        'isLogin'
      ])
    },
    created() {
      this.getLogin()
      this.$wxSDK._wxSDk(this)
    },
    methods: {
      getLogin() {
        this.$axios.get('/common/is-login')
          .then(res => {
            console.log(res)
            if (res.data.code == 1000) {
              let baseUrl = '/html/view/user/login.html?callBack='
              this.$storage.set('isLogin', res.data.code)
              this.setLoginUrl(baseUrl)
              this.setLoginCode(res.data.code)
            }
            if (res.data.code == 2000) {
              this.$storage.set('isLogin', res.data.code)
              this.setLoginCode(res.data.code)
            }
          })
      },
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      })
    },
    components: {
      VHeader,
      follow
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .FoundPage {
    padding-bottom: 55px;
    padding-top: 40px;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 38px;
    line-height: 36px;
    z-index: 999;
    background-color: #fff;
    ul {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      li {
        flex: 1;
        text-align: center;
        line-height: 36px;
      }
      a {
        display: block;
        color: black;
        font-size: 14px;
        border-bottom: 1px solid transparent;
        &.router-link-active {
          border-bottom: 1px solid #b462ff;
          color: #b462ff;
        }
      }
    }
  }

  .foot_nav {
    position: fixed;
    bottom: 0;
    display: table;
    width: 100%;
    height: 50px;
    padding: 0;
    table-layout: fixed;
    border-top: 0;
    border-bottom: 0;
    -webkit-touch-callout: none;
    border-top: 1px solid #ddd;
    background-color: #fff;
    z-index: 999;
    .item {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      color: #929292;
      img {
        display: block;
        margin: -6px auto -10%;
        width: 45%;
      }
      span {
        color: #666;
        font-size: 12px;
      }
      .tabspan {
        color: #a045fd;
      }
    }
  }

  .foot_nav {
    background-color: #fff;
    .item {
      img {
        display: block;
        margin: -6px auto -10%;
        width: 45%;
      }
    }
  }

  a span {
    color: #666;
    font-size: 12px;
  }

  .tabspan {
    color: #a045fd;
  }


</style>
