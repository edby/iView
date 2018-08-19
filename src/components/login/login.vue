<template>
  <div class="login">
    <log-bun @submitFn="submitFn"></log-bun>
  </div>
</template>

<script type="text/ecmascript-6">
  import LogBun from './logBin'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        str: ''
      }
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'loginUrl'
      ])
    },
    created() {
      this.str = decodeURIComponent(this.$route.query.callBack)
      this.isLoginFn();
      this.isWeiXin();
    },
    mounted() {
      setTimeout(() => {

      }, 20)
    },
    methods: {
      isLoginFn() {
        this.$axios.get('/user/index/is-login')
          .then(res => {
            if (res.data.code == 1000) {
              console.log(res.data.message)
              this.$storage.set('isLogin', res.data.code)
              this.setLoginCode(res.data.code)
            } else if (res.data.code == 2000) {
              console.log(res.data.message)
              window.location.href = this.str
              this.$storage.set('isLogin', res.data.code)
              this.setLoginCode(res.data.code)
            }
          })
      },
      isWeiXin() {
        this.$axios.get('/user/login/get-api?callBack=' + encodeURIComponent(this.str))
          .then(msg => {
            if (msg.data.code == 2002) { //微信端跳转至授权
              window.location.href = msg.data.data.url
              this.$storage.set('isLogin', '2000')
              this.setLoginCode('2000')
            }
          })
      },
      submitFn(obj) {
        this.loginSub(obj)
      },
      loginSub(obj) {
        this.$axios.post('/user/login/browser-login', {
          tel: obj.tel,
          telcode: obj.codes
        })
          .then(res => {
            console.log(res.data);
            if (res.data.code == 2000){
              window.location.href = this.str
              this.$storage.set('isLogin', res.data.code)
              this.setLoginCode(res.data.code)
            } else {
              layer.msg(res.data.message)
            }
          })
      },
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      }),
    },
    components: {
      LogBun
    }
  }
</script>

