<template>
  <div class="VHeader">
    <div class="back" @click="back">
      <Icon type="ios-arrow-back" />
    </div>
    <h3 class="title">{{title}}</h3>
    <div class="right" @click="go" v-if="isRight">
      <Icon type="md-android-home"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "VHeader",
    props: {
      title: {
        type: String,
        default: ''
      },
      isRight: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      go() {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .VHeader {
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #000;
    font-size: 18px;
    color: white;
    position: relative;
    .back {
      display: inline-block;
      float: left;
      width: 44px;
      height: 44px;
      position: relative;
      z-index: 1;
    }
    .title{
      position: absolute;
      width: 100%;
      text-align: center;
      line-height: 44px;
      z-index: 0;
      margin: 0 auto;
      font-weight: normal;
      font-size: 17px;
    }
    .right{
      display: inline-block;
      float: right;
      width: 44px;
      height: 44px;
      position: relative;
      z-index: 1;
    }
  }
</style>
