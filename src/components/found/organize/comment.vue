<template>
  <div class="comment" id="searchBar" :class="{'fixedTY': isFixedTY}">
    <div class="com_title fixedTY_title" v-if="isFixedTY">
      <h3>评论详情 <span>({{num}})</span></h3>
    </div>
    <div class="com_title" v-else>
      <h3>评论详情 <span>({{num}})</span></h3>
    </div>
    <slot></slot>
    <div class="ccr">
      <div class="assist" @click.stop="likenum">
        <Icon type="md-thumbs-up" size="24"/>
      </div>
      <div class="inputs">
        <input class="ivu-input" type="text" maxlength="225" v-model="ccrContent" :placeholder="placeholderVal">
      </div>
      <div class="btn_submits">
        <Button type="text" @click="OnSubmits">发送</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "comment",
    props: {
      dataList: {
        type: [Array, Object, String],
        default: []
      },
      placeholderVal: {
        type: String,
        default: '写下你的评论...'
      },
      loading: {
        type: Boolean,
        default: true
      },
      totalCount:{
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        ccrContent: '',
        isFixedTY: false,
      }
    },
    computed: {
      num() {
        return this.totalCount
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#searchBar').offsetTop
        if (scrollTop > offsetTop) {
          this.isFixedTY = true
        } else {
          this.isFixedTY = false
        }
      },
      OnSubmits() {
        this.$emit('dispatch', this.ccrContent)
        this.ccrContent = ''
      },
      revert(item) {
        this.$emit('revert', item)
      },
      likenum() {
        this.$emit('likenum')
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .comment {
    width: 100%;
    .com_title {
      width: 100%;
      padding: 15px;
      border-bottom: 1px solid #ececec;
      h3 {
        font-weight: normal;
        font-size: 15px;
        color: #333;
        span {
          font-size: 13px;
          color: #7e8c8d;
          padding-left: 5px;
        }
      }
    }
    .ccr {
      position: fixed;
      width: 100%;
      height: 44px;
      left: 0;
      border-top: 1px solid #dddddd;
      background-color: #fff;
      bottom: 0;;
      padding: 0 8px 0 0;
      display: flex;
      align-items: center;
      color: #989898;
      .assist {
        text-align: center;
        width: 40px;
        flex: 0 0 auto;
      }
      .inputs {
        flex: 1;
        .ivu-input {
          border: none;
          height: 32px;
          background: #ececec;
          margin-bottom: 0;
        }
      }
      .btn_submits {
        width: 60px;
        flex: 0 0 auto;
        padding-left: 6px;
        .ivu-btn-text {
          color: #fff;
          background-color: #b462ff;
          span {
            display: block;
            color: #666;
          }
        }
      }
    }
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
  .fixedTY {
    .fixedTY_title {
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 999;
      background-color: #fff;
    }
  }


</style>
