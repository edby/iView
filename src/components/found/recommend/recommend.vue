<template>
  <div>
    <div class="recommend" v-if="dataList.length != 0">
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <v-loadmore :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
          <panel-list :dataList="dataList"
                      @changeDetails="changeDetails"
                      @changeFocus="changeFocus"
                      @changeLike="changeLike"
                      @changePersonal="changePersonal"
          ></panel-list>
        </v-loadmore>
      </div>
    </div>
    <noData v-if="dataList.length == 0"></noData>
  </div>
</template>

<script type="text/ecmascript-6">
  import PanelList from 'base/panelList/panelList'
  import Loading from 'base/loading/loading'
  import {getLogin} from "common/js/isLogin";
  import {mapGetters, mapMutations} from 'vuex'
  import {Loadmore} from 'mint-ui';
  // import {commonShare,shareUrl} from "common/js/share";
  import wx from 'weixin-js-sdk'
  import noData from 'base/noData/noData'

  export default {
    name: "recommend",
    data() {
      return {
        dataList: [],
        count: 1,
        meta: {},
        allLoaded: false,
        scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      }
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'loginUrl'
      ])
    },
    created() {
      getLogin(this);
      this.loadPageList();
    },
    mounted() {
      this.$nextTick(() => {
        // let shareUrl = window.location.href;
        // commonShare(this,shareUrl)
         // this.getConfig()
      })
    },
    methods: {
      // 微信分参数
      getConfig() {
        alert();
        let url = location.href.split('#')[0]; //获取锚点之前的链接
        this.$axios.get('/user/index/wx-share-info',{
          url: url
        }).then(response => {
          alert(JSON.stringify(response));
          if (response.status == 1) {
            this.isLogin = false;
            if (data.status != 1000) {
              this.isLogin = true;
            }
            let res = response.data;
            this.wxInit(res);
          }
        })
          .catch(err => {
            alert(err)
          })
      },
      wxInit(res){
        // let url = location.href.split('#')[0] //获取锚点之前的链接
        //去除url中不必要参数
        let shareUrl = shareUrl.replace(/\?from=groupmessage/, '');
        shareUrl = shareUrl.replace(/\?amp;from=groupmessage/, '');
        shareUrl = shareUrl.replace(/&amp;mid=\d+/, '');
        if (shareUrl.indexOf('mid') == -1) {
          if (shareUrl.indexOf('?') == -1) {
            shareUrl += '?mid=' + res.data.mid;
          } else {
            shareUrl += '&mid=' + res.data.mid;
          }
        } else {
          if (shareUrl.indexOf('?') == -1) {
            shareUrl = shareUrl.replace(/\?mid=\d+/, '?mid=' + res.data.mid);
          } else {
            shareUrl = shareUrl.replace(/&mid=\d+/, '&mid=' + res.data.mid);
          }
        }

        let links = shareUrl;
        let title = '自用省钱，躺着赚钱！福利0元抢，爆品限时抢，海量折扣单品……';
        let desc = '生态化布局，亮点多多，收益多多，总能留住你的心！加入合纳，人生不将就！';
        let imgUrl = 'http://img.hena360.cn/wxshare.jpg';
        alert(JSON.stringify(res))
        wx.config({
          debug: true,
          appId: res.signPackage.appId,
          timestamp: res.signPackage.timestamp,
          nonceStr: res.signPackage.nonceStr,
          signature: res.signPackage.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        });

        wx.ready(function () {
          alert(JSON.stringify(links))
          wx.onMenuShareTimeline(
            alert('1111'),
            {
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              if (this.isLogin) {
                mui.alert("分享成功");
              } else {
                mui.alert("未登录，分享无效");
              }
            },
            cancel: function () {
              alert('你没有分享到朋友圈');
            }
          });
          //微信分享菜单测试
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              if (this.isLogin) {
                mui.alert("分享成功");
              } else {
                mui.alert("未登录，分享无效");
              }
            },
            cancel: function () {
              alert('你没有分享到朋友圈');
            }
          });
          wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              if (this.isLogin) {
                mui.alert("分享成功");
              } else {
                mui.alert("未登录，分享无效");
              }
            },
            cancel: function () {
              alert('你没有分享到朋友圈');
            }
          });
          wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              if (this.isLogin) {
                mui.alert("分享成功");
              } else {
                mui.alert("未登录，分享无效");
              }
            },
            cancel: function () {
              alert('你没有分享到朋友圈');
            }
          });
          wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: links, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              if (this.isLogin) {
                mui.alert("分享成功");
              } else {
                mui.alert("未登录，分享无效");
              }
            },
            cancel: function () {
              alert('你没有分享到朋友圈');
            }
          });
        });
        wx.error(function(err) {
          alert(JSON.stringify(err))
        });
      },
      loadTop () {
        window.event.preventDefault()
        console.log( window.event)
        this.count = 1
        this.dataList = []
        this.loadPageList();
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom () {
        window.event.preventDefault();
        this.more();
        this.$refs.loadmore.onBottomLoaded();
      },
      loadPageList () {
        this.getRecList()
      },
      more () {
        this.count = parseInt(this.count) + 1;
        this.getRecList()
      },
      getRecList() {
        this.$axios.get('/social/index/rec-list?per-page=5&page=' + this.count)
          .then((res) => {
            if (res.data.code == 2000) {
              this.meta = res.data.data
              let zLen = res.data.data.items.length
              if (zLen === 0) {
                this.dataList = res.data.data.items
              } else {
                for (let i = 0; i < zLen; i++) {
                  let imgArr = []
                  if (res.data.data.items[i].img.length > 9) {
                    for (let j = 0; j < 9; j++) {
                      imgArr.push(res.data.data.items[i].img[j])
                    }
                    res.data.data.items[i].img = imgArr
                  }
                }
                if (this.dataList.length === 0) {
                  this.dataList = res.data.data.items
                }
                else {
                  this.dataList = this.dataList.concat(res.data.data.items)
                }
              }
              this.scrollMode = "touch";
              this.isHaveMore(this.meta._meta.currentPage < this.meta._meta.pageCount);
            }
          })
      },
      isHaveMore (isHaveMore) {
        if (isHaveMore) {
          this.allLoaded = false;
        }else {
          this.allLoaded = true;
        }
      },
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      }),
      changeFocus(item) {
        if (!this.isLogin || this.isLogin == 1000) {
          layer.msg('您尚未登录，请登录！');
          this.$router.push({
            path: '/login?callBack=' + encodeURIComponent(window.location.href)
          })
        }
        if (item.is_focus === 1) {
          layer.confirm("取消关注后，您将看不到对方发布的实时动态，确认取消？", {title: "取消确认"}, () => {
            this.$axios.get('/social/index/focus-off?id=' + item.user_id)
              .then((res) => {
                console.log(res.data)
                if (res.data.code == 2000) {
                  this.loadTop()
                  console.log(res.data.message)
                  layer.msg('取消关注成功')

                } else if (res.data.code == 3000) {
                  layer.msg(res.data.message)
                } else {
                  layer.msg(res.data.message)
                }
              })
          })
        } else {
          this.$axios.get('/social/index/focus?id=' + item.user_id)
            .then((res) => {
              if (res.data.code == 2000) {
                this.loadTop()
                console.log(res.data.message)
                layer.msg(res.data.message)
              } else if (res.data.code == 3000) {
                layer.msg(res.data.message)
              } else {
                layer.msg(res.data.message)
              }
            })
        }
      },
      changeLike(id) {
        if (!this.isLogin || this.isLogin == 1000) {
          layer.msg('您尚未登录，请登录！');
          this.$router.push({
            path: '/login?callBack=' + encodeURIComponent(window.location.href)
          })
        }
        this.$axios.get('/social/index/like?id=' + id)
          .then((res) => {
            if (res.data.code == 2000) {
              console.log(res.data.message)
              layer.msg('点赞成功')
              this.loadTop()
            } else if (res.data.code == 3000) {
              layer.msg(res.data.message)
            } else {
              layer.msg(res.data.message)
            }
          })
      },
      changeDetails(item) {
        // window.location.href = '/html/view/details/details.html?id=' + item.goods_id + '&mid=' + item.user_id
        this.$router.push({
          path: '/CommodityDetails',
          query: {
            id: item.goods_id,
            mid: item.user_id
          }
        })
      },
      isCloseTotals() {
        this.isShowTotals = false
      },
      changePersonal(item) {
        console.log(item.user_id)
        this.$router.push({
          query: {
            id: item.user_id
          },
          name: 'Personal'
        })
      },
    },
    components: {
      PanelList,
      'v-loadmore': Loadmore,
      Loading,
      noData
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .recommend{
    position: absolute;
    width: 100%;
    z-index: 9;
    top: 40px;
    bottom: 52px;
    background-color: #fff;
  }
  .main-body {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

</style>
