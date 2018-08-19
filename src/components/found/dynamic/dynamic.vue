<template>
  <div class="dynamic" v-title="title">
    <div class="panelList">
      <div class="bcg">
        <ul class="mui-table-view">
          <router-link tag="li" :to="{name: 'Personal', query:{id: detailList.user_id}}" class="mui-table-view-cell">
            <img class="mui-media-object" :src="detailList.avatar">
            <div class="mui-media-body">
              <b>{{detailList.nickname}}</b>
              <p class="mui-ellipsis">{{detailList.created_at}}</p>
            </div>
            <div class="right" @click.stop="focusFn(detailList)"
                 v-show="detailList.user_id != detailList.s_user_id || detailList.is_focus == 3">
              <span class="gz" v-show="detailList.is_focus === 0">+关注</span>
              <span class="ygz" v-show="detailList.is_focus === 1">已关注</span>
            </div>
          </router-link>
        </ul>
        <div class="hot"><span v-if="detailList.status == 1">精选</span> <span v-if="isHot">hot</span></div>
        <div class="panel_show">
          <router-link :to="{name: 'dynamic', query: {uid: detailList.user_id, id: detailList.id}}"
                       class="panel_show_title" tag="div" v-html="detailList.content"></router-link>
          <div class="img_show">
            <div class="row">
              <ul class="img_item">
                <li v-for="(v,k) in detailList.img" :key="k">
                  <img class="mui-media-object" :src="v" v-preview="v">
                </li>
              </ul>
            </div>
          </div>
          <div class="panel_show_view-cell" v-show="detailList.goods_name != null ">
            <ul class="mui-table-view">
              <li @click.stop="changeDetails(detailList)" class="mui-table-view-cell">
                <img class="mui-media-object" :src="detailList.goods_img">
                <div class="mui-media-body">
                  {{detailList.goods_name}}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="fot_zp">
          <ul>
            <li>
              <span>{{count}}人点赞</span>
            </li>
            <li>
              <img v-for="(img,index) in detailList.like_user_avatars" :src="img" :key="index"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="hr"></div>
    <comment
      @dispatch="seedDispatch"
      :placeholderVal="placeholderVal"
      :isFixed="isFixed"
      @revert="revert"
      @likenum="likenum"
      :totalCount="totalCount"
      :dataList="commentList">
      <div class="content" v-if="commentList.length != 0">
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="0">
          <div class="cont_item" v-for="(item,i) in commentList" :key="i">
            <div class="titles" data-id="item.id">
              <Avatar :src="item.avatar"/>
              <span class="name">{{item.nickname}}</span>
            </div>
            <div class="des" @click.stop="revert(item)">
              <span v-show="item.pid != 0"
                    style="color: #9f9f9f">{{item.reply_target}}:</span>
              <span v-html="item.content"></span>
            </div>
            <div class="times">
              {{item.created_at}}
            </div>
          </div>
        </div>
      </div>

    </comment>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/VHeader/VHeader'
  import Comment from '../organize/comment'
  import PanelList from 'base/panelList/panelList'
  import _qs from 'qs'
  import {getLogin} from "common/js/isLogin";
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: "dynamic",
    data() {
      return {
        title: '动态详情',
        uid: null, // 用户id
        id: null,  // 动态id
        detailList: {},
        is_hot: null,
        count: '',
        commentList: [],  // 评论
        isFixed: false,
        comment_id: 0,
        reply_target: '',
        allLoaded: false,
        scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        placeholderVal: '写下你的评论...',
        page: 1,
        loading: false,
        totalCount: 0
      }
    },
    created() {
      this.uid = this.$route.query.uid;
      this.id = this.$route.query.id;
      getLogin(this);
      this.getDetailList();
      this.getCommentList()
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'loginUrl'
      ]),
      isHot() {
        return this.is_hot === 1
      }
    },
    methods: {
      revert(item) {
        this.isFixed = true;
        this.comment_id = item.id;
        this.reply_target = item.nickname;
        this.placeholderVal = '回复' + item.nickname
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
      seedDispatch(val) {
        console.log(val)
        this.page = 1
        this.commentList = []
        let obj = {};
        if (this.isFixed) {
          obj = {
            id: this.id,
            content: val,
            comment_id: this.comment_id,  // 回复时 某个评论列表的id  直接评论是传0
            reply_target: this.reply_target // 回复时 某个用户的用户名 直接评论是为空
          };
        } else {
          obj = {
            id: this.id,
            content: val,
            comment_id: 0,  // 回复时 某个评论列表的id  直接评论是传0
            reply_target: '' // 回复时 某个用户的用户名 直接评论是为空
          };
        }
        this.placeholderVal = '写下你的评论...'
        this.isFixed = false
        if (val === '') {
          layer.msg('回复内容不能为空')
          this.getCommentList()
          return
        }
        this.$axios.post('/social/index/comment', _qs.stringify(obj))
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              if (res.data.code == 2000) {
                layer.msg('评论成功OK!')
                this.getCommentList()
              }
            }
          })
      },
      focusFn(item) {
        if (item.is_focus === 1) {
          layer.confirm("取消关注后，您将看不到对方发布的实时动态，确认取消？", {title: "取消确认"}, () => {
            this.$axios.get('/social/index/focus-off?id=' + item.user_id)
              .then((res) => {
                if (res.status == 200) {
                  console.log(res.data)
                  if (res.data.code == 2000) {
                    this.getDetailList()
                    console.log(res.data.message)
                    layer.msg('取消关注成功')

                  } else if (res.data.code == 3000) {
                    layer.msg(res.data.message)
                  } else {
                    layer.msg(res.data.message)
                  }
                }
              })
          })
        } else {
          this.$axios.get('/social/index/focus?id=' + item.user_id)
            .then((res) => {
              if (res.status == 200) {
                if (res.data.code == 2000) {
                  this.getDetailList()
                  console.log(res.data.message)
                  layer.msg(res.data.message)
                } else if (res.data.code == 3000) {
                  layer.msg(res.data.message)
                } else {
                  layer.msg(res.data.message)
                }
              }
            })
        }
      },
      getDetailList() {
        this.$axios.get('/social/index/detail?id=' + this.id)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.code == 2000) {
                let img = [];
                let len = res.data.data.img.length
                if (len > 9) {
                  for (let i = 0; i < 9; i++) {
                    img.push(res.data.data.img[i])
                  }
                  res.data.data.img = img
                } else {
                  this.detailList = res.data.data
                }
                let zArr = []
                let lens = res.data.data.like_user_avatars.length
                if (lens > 4) {
                  for (let i = 0; i < 4; i++) {
                    zArr.push(res.data.data.like_user_avatars[i])
                  }
                  res.data.data.like_user_avatars = zArr
                } else {
                  this.detailList = res.data.data
                }

                console.log(this.detailList)
                this.is_hot = this.detailList.like_info.is_hot
                this.count = this.detailList.like_info.count
              }
            }
          })
      },
      loadMore() {
        this.more()
      },
      getCommentList() {
        this.$axios.get('/social/index/comment-list?id=' + this.id + '&per-page=10&page=' + this.page)
          .then((res) => {
            if (res.data.code == 2000) {
              let arr = []
              if (this.commentList.length == 0) {
                this.commentList = res.data.data.items
              }
              else {
                arr = res.data.data.items
                this.commentList = this.commentList.concat(arr)
              }
              console.log(res.data.data.items)
              this.totalCount = res.data.data._meta.totalCount
              this.isHaveMore(res.data.data._meta.currentPage < res.data.data._meta.pageCount);
            }
          })
      },
      more() {
        this.page = parseInt(this.page) + 1;
        this.getCommentList()
      },
      isHaveMore(isHaveMore) {
        if (isHaveMore) {
          this.loading = false;
        } else {
          this.loading = true;
        }
      },
      likenum() {
        ///social/index/like?id=1
        this.$axios.get('/social/index/like?id=' + this.id)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.code == 2000) {
                // this.commentList = res.data.message
                this.getDetailList()
                layer.msg('点赞成功')
              } else {
                layer.msg(res.data.message)
              }
            }
          })
      },
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      })
    },
    components: {
      Comment,
      VHeader,
      PanelList
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
        console.log(vm.isLogin)
        setTimeout(() => {
          if (vm.isLogin == 1000) {
            vm.$router.push({
              path: '/login?callBack=' + encodeURIComponent(window.location.href)
            })
          }
        }, 20)
      })
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .dynamic {
    padding-bottom: 44px;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 15px;
    border-bottom: 1px solid #ececec;
    .cont_item {
      margin-bottom: 15px;
      border-bottom: 1px solid #ececec;
      padding-bottom: 12px;
    }
    .titles {
      text-align: left;
    }
    .name {
      display: inline-block;
      line-height: 32px;
      padding-left: 6px;
      font-size: 15px;
      color: #7e8c8d;
    }
    .reply {
      float: right;
      line-height: 33px;
      font-size: 12px;
      span {
        padding: 3px 10px;
        border: 1px solid #7e8c8d;
        border-radius: 4px;
      }
    }
    .des {
      margin: 3px auto;
      font-size: 14px;
      line-height: 1.7;
    }
    .times {
      font-size: 12px;
      color: #7e8c8d;
    }
  }

  .hr {
    height: 10px;
    background-color: rgb(245, 245, 245);
  }

  .panelList {
    background: rgba(245, 245, 245, 1)
  }

  .bcg {
    background-color: #fff;
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .mui-table-view {
    padding: 5px 10px;
    background-color: transparent;
  }

  .mui-table-view:before {
    height: 0
  }

  .mui-table-view:after {
    height: 0
  }

  .mui-table-view-cell {
    display: flex;
    align-items: center;
    padding: 0;
    &:after {
      height: 0;
    }
    .mui-media-object {
      width: 40px;
      height: 40px;
      flex: 0 0 auto;
      border-radius: 50%;
    }
    .mui-media-body {
      flex: 1;
      padding-left: 8px;
      .mui-ellipsis {
        font-size: 12px;
        margin-top: 6px
      }
      b {
        display: block;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 3px;
      }
    }
    .right {
      width: 80px;
      flex: 0 0 auto;
      text-align: right;
      span {
        cursor: pointer;
        font-size: 12px;
        padding: 5px 10px;
      }
      span.gz {
        cursor: pointer;
        color: #b462ff;
        border: 1px solid #b462ff;
        border-radius: 4px
      }
      span.ygz {
        cursor: pointer;
        color: #666
      }
    }
  }

  .panel_show_view-cell {
    margin: 5px auto;
    width: 100%;
    background-color: rgba(245, 245, 245, 1);
    .mui-media-object {
      width: 50px;
      height: 50px;
      max-width: 50px;
      border-radius: 0;
    }
  }

  .hot {
    margin: 0 auto 3px;
    padding: 0 10px;
    span {
      display: inline-block;
      border: 1px solid #b462ff;
      color: #b462ff;
      font-size: 12px;
      padding: 1px 5px;
      border-radius: 2px;
    }
  }

  .panel_show {
    padding: 0 10px;
    .panel_show_title {
      font-size: 14px;
      line-height: 1.7
    }
    .img_show {
      width: 100%;
      .row {
        margin-left: -5px;
        margin-right: -5px;
      }
      .img_item {
        width: 100%;
        overflow: hidden;
      }
      li {
        float: left;
        width: 33.333%;
        height: 120px;
        overflow: hidden;
        padding: 5px 5px 0;
        margin-bottom: 3px;
        img {
          width: 100%;
          border-radius: 0;
        }
      }
      .mui-table-view:before {
        height: 0
      }
    }
  }

  .fot_zp {
    margin-top: 10px;
    background-color: #fff;
    border-top: 1px solid rgba(236, 236, 236, 1);
    ul {
      display: flex;
      padding: 0 15px;
      align-items: center;
      height: 38px;
      justify-content: space-between;
      li {
        color: #e7953f;
        font-size: 14px;
        img {
          width: 20px;
          display: inline-block;
          border-radius: 50%;
        }
      }
    }
  }
</style>
