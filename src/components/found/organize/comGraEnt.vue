<template>
  <div class="comGraEnt">
    <div class="panel_show_view-cell">
      <ul class="mui-table-view" v-for="(item,index) in dataList" :key="index">
        <li class="mui-table-view-cell" @click="details(item)">
          <img class="mui-media-object" :src="item.goods_logo">
          <div class="mui-media-body">
            {{item.goods_name}}
          </div>
          <button v-show="isClose"
                  @click.stop="delClose(index)"
                  type="button" class="btn-close">
            <span><Icon type="md-close" size="24"/></span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "comGraEnt",
    props: {
      isClose: {
        type: Boolean,
        default: false
      },
      dataList: {
        type: [Array,Object],
        default: []
      }
    },
    methods: {
      delClose(i) {
        // 需要参数过去
        // 发布动态是需要
        this.$emit('deleteItems',i)
      },
      details(item) {
        this.$emit('changeDetails', item)
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .mui-table-view {
    padding: 5px 10px;
    background-color: rgb(245,245,245);
    margin: 10px auto;
    position: relative;
    &:before{
      height: 0;
    }
  }
  .mui-table-view:after {
    height: 0
  }
  .mui-table-view-cell {
    display: flex;
    align-items: center;
    overflow: hidden;
    background-color: transparent;
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
        width: 80%;
        font-size: 12px;
        margin-top: 5px;
        p{
          overflow: hidden;
          white-space: nowrap;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }

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
        color: rgba(248, 211, 17, 1);
        border: 1px solid rgba(248, 211, 17, 1);
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
    background-color: transparent;
    position: relative;
    &:before{
      height: 0;
    }
    .mui-media-object {
      flex: 0 0 auto;
      width: 50px;
      height: 50px;
      max-width: 50px;
      border-radius: 0;
    }
    .btn-close{
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: transparent;
      outline: none;
      border: none;
      span{
        display: block;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
      }
    }
  }
</style>
