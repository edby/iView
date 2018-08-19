<template>
  <div v-title="title">
    <img :src="isAndroidurl" alt="" width="100%" v-show="is==1">
    <img :src="iosurl" alt="" width="100%" v-show="is==2">
  </div>
</template>

<script>
  export default {
    name: "isBrowser",
    data() {
      return {
        title: '请在浏览器打开支付',
        isAndroidurl: 'http://img.hena360.cn/pay_1.jpg',
        iosurl: 'http://img.hena360.cn/pay_2.jpg',
        is: 1
      }
    },
    created() {
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid == 1) {
        this.is = 1
      } else {
        this.is = 2
      }

      window.location.href= '/#/order/isBrowser?id='+this.$route.query.id+'&uid='+this.$route.query.uid+'&_sign='+this.$route.query._sign+'&_time='+this.$route.query._time
      this.$axios.get('/order/index/alipay', {
        params: {
          id: this.$route.query.id,
          uid: this.$route.query.uid,
          _sign: this.$route.query._sign,
          _time: this.$route.query._time,
        }
      })
        .then(res=>{
          console.log(res)
          alert( window.location.href)
        })
      // this.$axios.get('/order/index/alipay?id=' + this.$route.query.id+'uid='+this.$route.query.uid+'_sign='+this.$route.query._sign+'_time='+this.$route.query._time)
      //   .then(res => {
      //     if (res.data.code == 2000) {
      //       window.location.href = res.data.data.url
      //     }
      //   })
    }
  }
</script>

<style scoped>

</style>
