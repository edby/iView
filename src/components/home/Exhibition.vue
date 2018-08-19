<template>
  <div v-title="title" class="Exhibition" :v-title="title">
    <div v-html="Exhibition"></div>
    <router-link :to="{name:'index'}">
      <img src="http://img.hena360.cn/gohome.png" alt="" class="index">
    </router-link>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  export default {
    name: "Exhibition",
    data() {
      return {
        Exhibition: '',
        title: '活动详情',
        wxgoods_name:'',
        wxlink:'',
        wxf_title:'',
        wxgoods_detail_img:'',
      }
    },
    created() {
      this.$axios.get('/active/active-html/active-detail?id=' + this.$route.query.id)
        .then(res => {
          console.log(res)
          this.Exhibition = res.data.data.act_text
          this.wxgoods_name = res.data.data.title
          this.wxf_title = res.data.data.desc
          this.wxgoods_detail_img = res.data.data.url
        })
    },
    mounted() {
      this.$nextTick(() => {
        //微信分享
        this.$axios.get('/user/index/wx-share-info?url=' + window.location.href)
          .then(res => {
            this.wxlink = window.location.href + '&mid=' + res.data.data.mid
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.signature,// 必填，签名，见附录1
              jsApiList: [
                'onMenuShareAppMessage', 'onMenuShareTimeline',
                'onMenuShareQQ', 'onMenuShareQZone',
              ],
            });
            wx.ready(() => {
              wx.onMenuShareTimeline({
                title: this.wxgoods_name,
                link: this.wxlink,
                desc: this.wxf_title,
                imgUrl: this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享到朋友圈');
                }
              });
              wx.onMenuShareAppMessage({
                title: this.wxgoods_name,
                link: this.wxlink,
                desc: this.wxf_title,
                imgUrl: this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享给朋友');
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareQQ({
                title: '' + this.wxgoods_name,
                link: this.wxlink,
                desc: '' + this.wxf_title,
                imgUrl: '' + this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享给朋友');
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareQZone({
                title: '' + this.wxgoods_name,
                link: this.wxlink,
                desc: '' + this.wxf_title,
                imgUrl: '' + this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享到朋友圈');
                  // 用户取消分享后执行的回调函数
                }
              });
            })
          })
//
        // 推荐人绑定关系
        this.$axios.get('common/set-inv-id?mid=' + this.$route.query.mid)
          .then(res => {
            console.log(res)
          })

      })
    },
    methods: {
      index() {
        this.$router.push({name: "index"});
      }
    }
  }
</script>

<style scoped lang="less">
  .index {
    position: fixed;
    bottom: 10%;
    right: 0;
    z-index: 999;
    width: 11%;
  }
</style>
