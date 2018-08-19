<template>
  <div class="assCoupon">
    <div class="content">
      <div class="item"
           v-for="(item,index) in dataList"
           @click="contentFn(item)"
           :key="index"
           :class="{'library': item.coupon_type == 1,'rebate': item.coupon_type == 2}">
        <div class="item_title">
          <div class="prc">
            <h3>{{item.disc_price}}</h3>
            <span v-if="item.coupon_type == 1">元</span>
            <span v-if="item.coupon_type == 2">折</span>
          </div>
          <div class="illus">
            <h4 v-if="item.coupon_type == 1">满{{item.meet_price}}元减{{item.disc_price}}元</h4>
            <h4 v-if="item.coupon_type == 2">满{{item.meet_price}}元打{{item.disc_price}}折</h4>
            <p v-if="item.coupon_type == 2">最高可减{{item.high_price}}元</p>
          </div>
        </div>
        <div class="item_des">
          <div class="item_des_list lt">{{item.title}}</div>
          <div class="item_des_list rt">{{item.start_time}}-{{item.end_time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "assCoupon",
    props:{
      dataList: {
        type: [Array,Object],
        default: []
      }
    },
    methods:{
      contentFn(item){
        this.$emit('contentFn',item)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  $abs = 100%;
  .assCoupon {
    width: $abs;
  }

  .item
    width: $abs;
    position: relative
    color white
    margin-bottom 15px
    overflow: hidden;
    &:before, &:after
      content: ''
      position: absolute
      width 16px
      height: 16px
      background-color: #fff
      border-radius $abs
      z-index: 9;
    &:before
      bottom: 28px
      left: -8px
    &:after
      bottom: 28px
      right: -8px
    &:last-of-type
      margin-bottom: 0;

  .item_title
    padding 15px
    overflow: hidden;
    display flex
    align-items center
    .prc
      width 48%
      flex 0 0 auto
      h3
        display inline-block
        font-size 40px;
      span
        display: inline-block;
        font-size 16px
        font-weight: 600;
    .illus
      flex: 1
      font-size 16px
      h4
        font-size 16px
      p
        color white
        margin-top: 5px
        font-size 14px

  .item_des

    padding: 12px;
    overflow: hidden;
    position: relative

  .item_des_list
    width auto
    font-size 12px

  .lt
    float: left

  .rt
    float: right

  .library
    .item_title
      background-color: #c6a7ea
    .item_des
      background-color: #b491dc

  .rebate
    .item_title
      background-color: #e9be8f
    .item_des
      background-color: #e4b17a
</style>
