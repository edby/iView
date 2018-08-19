<template>
  <div class="panelList">
    <div class="bcg" v-for="(item,i) in dataList" :key="i">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" @click.stop="go(item)">
          <img class="mui-media-object" :src="item.avatar" data-preview-src="" data-preview-group="1">
          <div class="mui-media-body">
            <b>{{item.nickname}}</b>
            <p class="mui-ellipsis">{{item.created_at}}</p>
          </div>
          <div class="right " @click.stop="focusFn(item)" v-if="isFouc"
               v-show="item.user_id != item.s_user_id || item.is_focus == 3">
            <span class="gz" v-show="item.is_focus === 0">+关注</span>
            <span class="ygz" v-show="item.is_focus === 1">已关注</span>
          </div>
        </li>
      </ul>
      <div class="hot"><span v-if="item.status == 1">精选</span> <span v-if="item.like_info.is_hot === 1">Hot</span></div>
      <div class="panel_show">
        <router-link :to="{name: 'dynamic', query: {uid: item.user_id, id: item.id}}" class="panel_show_title"
                     v-text="item.content" tag="div"></router-link>
        <div class="img_show">
          <div class="row">
            <ul class="img_item">
              <li v-for="(v,k) in item.img" :key="k" v-preview="v">
                <img class="mui-media-object" :src="v" >
              </li>
            </ul>
          </div>
        </div>
        <div class="panel_show_view-cell" v-show="item.goods_name != null ">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell" @click.stop="Details(item)">
              <img class="mui-media-object" :src="item.goods_img">
              <div class="mui-media-body">
                {{item.goods_name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="fot_zp">
        <ul>
          <li @click.stop="likeFn(item)" :class="{'actives' : item.like_info.is_like ===1}">
            <Icon type="md-thumbs-up" size="16"/>
            <span v-show="item.like_info.is_like ===0" style="color: #8c8c8c" v-if="item.like_info.count != 0">{{item.like_info.count}}</span>
            <span v-show="item.like_info.is_like ===1">{{item.like_info.count}}</span>
          </li>
          <router-link tag="li" :to="{name: 'dynamic', query: {id : item.id}}">
            <Icon type="md-chatbubbles" size="15"/>
            <span v-if="item.comment.count != 0">{{item.comment.count}}</span>
            <span v-else>评论</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "panelList",
    props: {
      dataList: {
        type: [Array, Object],
        default: []
      },
      isFouc: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        ImageBlowUrl: '',
        isImageBlow: false,
        ShowWIsShowH: null,
        surviveV: null
      }
    },
    watch: {
      dataList(v) {
        return this.dataList = v
      }
    },
    computed: {},
    methods: {
      go(item) {
        this.$emit('changePersonal', item)
      },
      Details(item) {
        this.$emit('changeDetails', item)
      },
      focusFn(item) {
        this.$emit('changeFocus', item)
      },
      likeFn(item) {
        this.$emit('changeLike', item.id)
      },
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

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
    &:before {
      height: 0;
    }
    li {
      padding: 0;
    }
  }

  .mui-table-view::after {
    height: 0 !important;
  }

  .mui-table-view-cell {
    display: flex;
    align-items: center;
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
        margin-top: 3px
      }
      b {
        display: block;
        font-weight: bold;
        font-size: 15px;
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
      line-height: 1.7;
      word-wrap: break-word;
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
        height: 110px;
        padding: 5px 5px 2.5px;
        overflow: hidden;
        img {
          width: 100%;
          min-height: 100%;
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
      align-items: center;
      li {
        flex: 1;
        text-align: center;
        line-height: 38px;
        color: #989898;
        font-size: 14px;
      }
      .ivu-icon {
        clear: both !important;
        float: none !important;
        text-align: center !important;
        width: auto !important;
        font-size: 17px;
      }
    }
    .actives {
      color: rgb(231, 149, 63);
    }
  }


</style>
