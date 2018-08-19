<template>
  <div>
    <div class="focus" v-if="dataList.length != 0">
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <v-loadmore :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="false"
                    ref="loadmore">
          <panel-list
            :dataList="dataList"
            @changeDetails="changeDetails"
            @changePersonal="changePersonal"
            @changeFocus="changeFocus"
            @changeLike="changeLike"
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
  import {mapGetters, mapMutations} from 'vuex'
  import {Loadmore} from 'mint-ui';
  import noData from 'base/noData/noData'
  export default {
    name: "focus",
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
    watch: {
      dataList(v) {
        return this.dataList = v
      }
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
      this.loadPageList()
    },
    methods: {
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      }),
      loadTop() {
        this.count = 1
        this.dataList = []
        this.loadPageList();
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.more();
        this.$refs.loadmore.onBottomLoaded();
      },
      getFocusList() {
        this.$axios.get('/social/index/focus-list?per-page=5&page=' + this.count)
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
              console.log(res)
              console.log(this.dataList)
            }
          })
      },
      loadPageList() {
        this.getFocusList()
      },
      more() {
        this.count = parseInt(this.count) + 1;
        this.getFocusList()
      },
      isHaveMore(isHaveMore) {
        if (isHaveMore) {
          this.allLoaded = false;
        } else {
          this.allLoaded = true;
        }
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

      changePersonal(item) {
        console.log(item.user_id)
        this.$router.push({
          query: {
            id: item.user_id
          },
          name: 'Personal'
        })
      },
      changeFocus(item) {
        if (item.is_focus == 1) {
          layer.confirm("取消关注后，您将看不到对方发布的实时动态，确认取消？", {title: "取消确认"}, () => {
            this.$axios.get('/social/index/focus-off?id=' + item.user_id)
              .then((res) => {
                if (res.data.code == 2000) {
                  console.log(res.data.message)
                  layer.msg(res.data.message)
                  this.loadTop()
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
                console.log(res.data.message)
                layer.msg(res.data.message)
                this.loadTop()
              } else if (res.data.code == 3000) {
                layer.msg(res.data.message)
              } else {
                layer.msg(res.data.message)
              }
            })
        }
      },
      changeLike(id) {
        this.$axios.get('/social/index/like?id=' + id)
          .then((res) => {
            if (res.data.code == 2000) {
              console.log(res.data.message)
              layer.msg('点赞成功');
              this.loadTop()
            } else if (res.data.code == '3000') {
              layer.msg(res.data.message)
            } else {
              layer.msg(res.data.message)
            }
          })
      }
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
  .focus {
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
