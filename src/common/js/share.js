import wx from 'weixin-js-sdk'
//微信分享
let wxSDk = {

  _wxSDk(_this) {
    _this.$axios.get('/user/index/wx-share-info?url=' + encodeURIComponent(window.location.href))
      .then(res => {
        this.wxlink = encodeURIComponent(window.location.href) + '&mid=' + res.data.data.mid
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
            title: '自用省钱，躺着赚钱！福利0元抢，爆品限时抢，海量折扣单品……',
            link: this.wxlink,
            desc: '生态化布局，亮点多多，收益多多，总能留住你的心！ ，人生不将就！', // 分享描述
            imgUrl: 'http://img.hena360.cn/wxshare.jpg',
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
            title: '自用省钱，躺着赚钱！福利0元抢，爆品限时抢，海量折扣单品……',
            link: this.wxlink,
            desc: '生态化布局，亮点多多，收益多多，总能留住你的心！ ，人生不将就！', // 分享描述
            imgUrl: 'http://img.hena360.cn/wxshare.jpg',
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
            title: '自用省钱，躺着赚钱！福利0元抢，爆品限时抢，海量折扣单品……',
            link: this.wxlink,
            desc: '生态化布局，亮点多多，收益多多，总能留住你的心！ ，人生不将就！', // 分享描述
            imgUrl: 'http://img.hena360.cn/wxshare.jpg',
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
            title: '自用省钱，躺着赚钱！福利0元抢，爆品限时抢，海量折扣单品……',
            link: this.wxlink,
            desc: '生态化布局，亮点多多，收益多多，总能留住你的心！ ，人生不将就！', // 分享描述
            imgUrl: 'http://img.hena360.cn/wxshare.jpg',
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
  }
}

//
export default wxSDk
