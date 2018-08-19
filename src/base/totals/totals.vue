<template>
  <div class="totals" v-if="isShowTotals">
    <div class="msg">{{msg}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "totals",
    props: {
      msg: {
        type: String,
        default: ''
      },
      isShowTotals: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isShowTotals() {
        this.iscClose()
      }
    },
    methods: {
      iscClose() {
        if (this.isShowTotals) {
          setTimeout(() => {
            this.$emit('isCloseTotals')
          }, 1500)
        }
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .totals {
    position: fixed;
    width: auto;
    height: auto;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    bottom: 100px;
    background-color: #ffffff;
    z-index: 99999;
    .msg {
      display: inline-block;
      border: 1px solid #bfbfbf;
      padding: 8px 15px;
      border-radius: 4px;
      font-size: 14px;
    }
  }
</style>
