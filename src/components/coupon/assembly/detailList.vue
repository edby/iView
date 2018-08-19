<template>
  <div class="detailList" v-if="isDetail" @click.stop="isCloseDetail">
    <div class="detail_cont">
      <div class="content" ref="detailItems">
        <div class="detail_item" @click.stop>
          <div class="header" ref="headers">
            <h3 class="title">{{dataList.title}}</h3>
            <h1 class="prc" v-if="dataList.coupon_type == 1">￥{{dataList.meet_price}}<span>元</span></h1>
            <h1 class="prc" v-if="dataList.coupon_type == 2">{{dataList.disc_price}}<span>折</span></h1>
            <p class="subtraction" v-if="dataList.coupon_type == 1">满{{dataList.meet_price}}元减{{dataList.disc_price}}元</p>
            <p class="subtraction" v-if="dataList.coupon_type == 2">满{{dataList.meet_price}}元打{{dataList.disc_price}}折</p>
            <button class="btn"
                    type="button"
                    :disabled="disabled"
                    @click.stop="homeIndex"
                    v-if="dataList.coupon_type == 1"
                    :class="{'disabled': disabled}"
            >立即使用
            </button>
            <button class="btn"
                    type="button"
                    :disabled="disabled"
                    @click.stop="homeIndex"
                    v-if="dataList.coupon_type == 2"
                    :class="{'disabled': disabled}"
            >立即使用
            </button>
            <p class="dec">有效期:{{dataList.start_time}}-{{dataList.end_time}}</p>
          </div>
          <div class="detail_body" ref="detailBody">
            <div class="body_cont" ref="bodyCont">
              <div class="range">
                <div class="range_name">使用范围：</div>
                <div class="range_title">
                  <span v-for="(item,i) in dataList.use_name" :key="i">{{item}} <em v-if="i != dataList.use_name.length - 1">、</em></span>
                </div>
              </div>
              <div class="explain">
                <div>使用说明：{{dataList.descript}}</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "detailList",
    props: {
      dataList: {
        type: [Array, Object],
        default: {}
      },
      isDetail: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
      }
    },
    computed:{
      disabled(){
        return this.dataList.status != 1
      }
    },
    created() {
    },
    watch:{
      isDetail(){
        setTimeout(() => {
          this.itemsH()
        },500)

        console.log('123456')
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.itemsH()
      });
      window.addEventListener('resize', this.itemsH)
    },
    methods: {
      itemsH() {
        console.log(this.$refs.detailItems)
        if (this.$refs.detailItems != undefined && this.$refs.headers != undefined) {
          let items_h = this.$refs.detailItems.offsetHeight;
          let headers_h = this.$refs.headers.offsetHeight;
          this.$refs.detailBody.style.maxHeight = items_h - headers_h + 'px'
          this.$refs.bodyCont.style.maxHeight = items_h - headers_h - 20 + 'px'
        }
      },
      isCloseDetail() {
        this.$emit('isCloseDetail')
      },
      homeIndex(){
        this.$router.push({
          path: '/'
        })
      },
      Immediate(item){
        if (this.disabled) {
          return
        }
        this.$emit('Immediate',item)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  $abs = 100%
  .detailList
    position: fixed
    width $abs
    height: $abs
    background-color: rgba(0, 0, 0, .5)
    top: 0
    left: 0
    bottom: 0;
    right: 0
    z-index: 9999;

  .detail_cont
    width 100%
    height: 100%
    position: relative
    overflow: hidden;

  .content
    position: absolute
    top: 5%
    width: $abs;
    height: 90%
    overflow: hidden;

  .detail_item
    width 90%
    height: auto
    max-height 100%
    position: absolute
    left: 5%
    top: 50%
    overflow: hidden;
    transform translate3d(0, -50%, 0)
    background-color: #fff
    border-radius 6px
    z-index: 99999;
    .header
      text-align center
      padding: 15px 0;
      .title
        font-size 16px
      .prc
        font-size 30px
        color rgb(255, 139, 16)
        margin: 8px auto;
        vertical-align middle
        span
          font-size 24px
          vertical-align middle
      .subtraction
        font-size 13px
      .dec
        font-size 13px
      .btn
        color white
        font-size 14px
        padding 10px 0
        width 50%
        border: none
        display inline-block
        background rgb(255, 139, 16)
        margin: 10px auto;
        outline: none
        border-radius 0
      .disabled
        background-color: #888

  .detail_body
    width $abs
    padding: 10px
    border-top: 1px dotted #eee
    overflow: hidden
    width :95%
    margin-left 2.5%
    .body_cont
      width: $abs;
      height: auto
      overflow-y auto
    .range, .explain
      width $abs
      overflow: hidden;
      font-size 14px
      padding: 5px 0 0;
      line-height 22px
      .range_name
        width: 70px;
        display: inline-block;
        overflow: hidden;
        float: left
      .range_title
        width calc(100% - 90px)
        display: inline-block;
        font-size 14px

</style>
