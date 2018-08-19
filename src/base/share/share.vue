<template>
  <div class="share"></div>
</template>

<script type="text/ecmascript-6">
  import 'common/js/jquery.min'
  import wx from 'weixin-js-sdk'
  import _qs from 'qs'

  export default {
    name: "share",
    data() {
      return {
        url: '',
        nowurl: '',
        baseUrl: 'http://t.test.qc1680.cn/home/index/getShareInfo'
      }
    },
    created() {
      this.url = this.nowurl = decodeURIComponent(window.location.href);
      this.getShareInf()
    },
    mounted() {
      setTimeout(() => {
        this.getShareInf()
      }, 20)
    },
    methods: {
      getShareInf() {
        let menu_list;
        if (this.url.indexOf('Goods') != -1 || this.url.indexOf('Goods') != -1 || this.url.indexOf('details') != -1 || window.location.href.indexOf('tb') != -1) {
          menu_list = ['menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:favorite',
            'menuItem:share:facebook',
            'menuItem:copyUrl', // 复制链接:
            'menuItem:originPage', // 原网页
            'menuItem:share:email',
            'menuItem:share:QZone'];
        } else {
          menu_list = ['menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:favorite',
            'menuItem:share:facebook',
            'menuItem:copyUrl', // 复制链接:
            'menuItem:originPage', // 原网页
            'menuItem:share:appMessage',
            'menuItem:openWithQQBrowser',
            'menuItem:share:timeline',
            'menuItem:openWithSafari',
            'menuItem:share:email',
            'menuItem:share:QZone'];
        }
        let data = {
          'url': window.location.href
        };
        this.$axios.post(this.baseUrl, _qs.stringify(data))
          .then(res => {
            let isLogin = false;
            if (res.data.status != 1000) {
              isLogin = true;
            }
            console.log(res.data.code);

            if (res.data.code == 2000) {
              wx.config({
                debug: false,
                appId: res.data.signPackage.appId,
                timestamp: res.data.signPackage.timestamp,
                nonceStr: res.data.signPackage.nonceStr,
                signature: res.data.signPackage.signature,
                jsApiList: [
                  'onMenuShareAppMessage', 'onMenuShareTimeline',
                  'onMenuShareQQ', 'onMenuShareQZone'
                ],
              });
              wx.error(function (res) {
                alert('验证失败返回的信息:' + JSON.stringify(res));
              });
              wx.ready(() => {
                if (this.nowurl.indexOf('tb') != -1) {
                  this.nowurl = "tao.hena360.com"
                } else {
                  this.nowurl = this.url;
                }
                //去除url中不必要参数
                this.nowurl = this.nowurl.replace(/\?from=groupmessage/, '');
                this.nowurl = this.nowurl.replace(/\?amp;from=groupmessage/, '');
                this.nowurl = this.nowurl.replace(/&amp;mid=\d+/, '');
                if (this.nowurl.indexOf('mid') == -1) {
                  if (this.nowurl.indexOf('?') == -1) {
                    this.nowurl += '?mid=' + res.data.mid;
                  } else {
                    this.nowurl += '&mid=' + res.data.mid;
                  }
                } else {
                  if (this.nowurl.indexOf('?') == -1) {
                    this.nowurl = this.nowurl.replace(/\?mid=\d+/, '?mid=' + res.data.mid);
                  } else {
                    this.nowurl = this.nowurl.replace(/&mid=\d+/, '&mid=' + res.data.mid);
                  }
                }

                //分享功能
                wx.onMenuShareTimeline({
                  title: goods_name,
                  link: this.nowurl,
                  desc: f_title, // 分享描述
                  imgUrl: $('.name-goods>.mui-col-xs-4>img').attr('src'),
                  success: function () {
                    if (isLogin) {
                      mui.alert("分享成功");
                    } else {
                      mui.alert("未登录，分享无效");
                    }
                  },
                  cancel: function () {
                    alert('你没有分享到朋友圈');
                  }
                });
                wx.onMenuShareAppMessage({
                  title: goods_name, // 分享标题
                  desc: f_title, // 分享描述
                  link: this.nowurl, // 分享链接，该链接域名必须与当前企业的可信域名一致
                  imgUrl: $('.name-goods>.mui-col-xs-4>img').attr('src'), // 分享图标
                  success: function () {
                    if (isLogin) {
                      mui.alert("分享成功");
                    } else {
                      mui.alert("未登录，分享无效");
                    }

                    // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                    alert('你没有分享给朋友');
                    // 用户取消分享后执行的回调函数
                  }
                });

                //QQ接口
                wx.onMenuShareQQ({
                  title: goods_name, // 分享标题
                  desc: f_title, // 分享描述
                  link: this.nowurl, // 分享链接
                  imgUrl: $('.name-goods>.mui-col-xs-4>img').attr('src'), // 分享图标
                  success: function () {
                    if (isLogin) {
                      mui.alert("分享成功");
                    } else {
                      mui.alert("未登录，分享无效");
                    }
                  },
                  cancel: function () {
                    alert('你没有分享给朋友');
// 用户取消分享后执行的回调函数
                  }
                });
                //QQ空间接口
                wx.onMenuShareQZone({
                  title: goods_name, // 分享标题
                  desc: f_title, // 分享描述
                  link: this.nowurl, // 分享链接
                  imgUrl: $('.name-goods>.mui-col-xs-4>img').attr('src'), // 分享图标
                  success: function () {
                    if (isLogin) {
                      mui.alert("分享成功");

                    } else {
                      mui.alert("未登录，分享无效");
                    }
                  },
                  cancel: function () {
                    alert('你没有分享给朋友');
// 用户取消分享后执行的回调函数
                  }
                });
              })
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err))
          })

      }
    }
  }
</script>

