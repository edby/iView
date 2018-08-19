<template>
  <div class="binding">
    <log-bun @submitFn="submitFn"></log-bun>
    <p style="text-align: center;color: #ffffff;width: 100%;position: absolute;top: 90%;" @click="noBind">微信一键登录</p>
  </div>
</template>

<script>
  import LogBun from './logBin'

  export default {
    name: "binding",
    data() {
      return {
        str: ''
      }
    },
    created(){
      this.str = this.$route.query.callBack;
      this.isBindTel();
    },
    methods: {
      // 判断是否已绑定手机号码
      isBindTel() {
        // this.$axios.get('/user/index/is-bind-tel')
        this.$axios.get('/user/index/is-login')
          .then(res => {
            console.log(res)
            if (res.data.code == 2000){
              this.$router.replace({
                path: '/'
              })
            }
          })
      },
      submitFn(obj) {
        // /user/login/bind-phone
        this.$axios.post('/user/login/first-bind', {
          tel: obj.tel,
          telcode: obj.codes
        })
          .then(res => {
            console.log(res)
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
            }
            if (res.data.code == 2000) {
              let callBack = window.location.href;
              let str = callBack.split('?callBack=')
              str = str[1];
              window.location.href = decodeURIComponent(str)
            }
          })
      },
      noBind(){
        // /user/login/not-bind
        this.$axios.get('/user/login/not-bind')
          .then(msg => {
            if (msg.data.code == 2000) {
              // 设置暂不绑定连接
              let callBack = window.location.href;
              let str = callBack.split('?callBack=')
              let _str = decodeURIComponent(str[1])
              window.location.href = _str
            } else if (msg.data.code == 3000) {
              layer.msg(msg.data.message)
            }
          })
      }
    },
    components: {
      LogBun
    }
  }
</script>

