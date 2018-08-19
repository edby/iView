<template>
  <div class="pageHeads">
   <!-- <div class="info_chat">
      <div class="chat_item">
        <Icon type="chatbubble-working" size="24"></Icon>
        <span></span>
      </div>
    </div>-->
    <div class="avatar"><img :src="dataList.avatar" alt=""></div>
    <div class="titles">{{dataList.nickname}}</div>
    <div class="vip_cl_ion">
      <span>
        <img :src="imgUrl" alt="">
        <em>{{dataList.levelname}}</em>
      </span>
    </div>
    <ul class="page_info">
      <li>
        <p>{{dataList.focus_num}}</p>
        <p>被关注</p>
      </li>
      <li>
        <p>{{dataList.like_num}}</p>
        <p>被赞</p>
      </li>
      <li>
        <p>{{dataList.social_num}}</p>
        <p>动态</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "pageHeads",
    data(){
      return{

      }
    },
    props:{
      dataList: {
        type: Object,
        default: {}
      }
    },
    computed: {
      imgUrl() {
        return 'http://img.hena360.cn/V'+(this.dataList.level - 1)+'.png'
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .pageHeads {
    padding: 10px;
    color: white;
    background: url("../../../common/images/grzyBg.jpg") no-repeat left top;
    background-size: 100% 100%;
    text-align: center;
    position: relative;
    .info_chat{
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 2;
      .chat_item{
        position: relative;
        .ivu-icon{
          cursor: pointer;
        }
        span{
          position: absolute;
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #ff0000;
          top: 0;
          right: 0;
          z-index: 3;
        }
      }
    }
    .avatar{
      text-align: center;
      margin: 5px auto;
      img{
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .titles{
      font-size: 17px;
      line-height: 30px;
    }
    .vip_cl_ion{
      display: block;
      color: #b09752;
      vertical-align: middle;
      margin-bottom: 10px;
      span{
        display: inline-block;
        border: 1px solid #b09752;
        border-radius: 30px;
        padding: 2px 15px;
        em{
          font-style: normal;
          display: inline-block;
          font-size: 12px;
          vertical-align: middle;
          width: auto;
        }
      }
      img{
        display: inline-block;
        width: 24px;
        vertical-align: middle;
        margin-top: -2px;
      }
      .ivu-icon{
        font-style: normal;
        width: auto;
        font-size: 17px;
        vertical-align: top;
      }
    }
    .page_info{
      display: flex;
      width: 100%;
      li{
        flex: 1;
        text-align: center;
        padding: 5px 0;
        p{
          line-height: 18px;
          font-size: 14px;
          color: white;
          margin-bottom: 0;
        }
      }
    }
  }
</style>
