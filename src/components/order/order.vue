<template>
  <div v-title="title" class="order">
    <Row class="order_address">
      <Icon type="ios-arrow-forward" size="20"/>
      <router-link :to="{name:'addressList',query:{specId:specId,num,num,goods_id:goods_id}}">
        <Col span="22" v-show="address_view_id==0">
          <Col span="4"><img src="http://img.hena360.cn/gps.png" alt=""
                             style="width: 40%;display: block;margin: 0 auto;margin-top: 13%;">
          </Col>
          <Col span="20">
            <p style="line-height: 300%">{{address_message}}</p>
          </Col>

        </Col>
        <Col span="22" v-show="address_view_id==1">
          <Col span="4"><img src="http://img.hena360.cn/gps.png" alt=""
                             style="width: 40%;display: block;margin: 0 auto;margin-top: 10%;">
          </Col>
          <Col span="20" :id="address_id" v-if="address_box != null">
            <h4>收货人：{{address_realname}} <span style="float: right">{{address_tel}}</span></h4>
            <p>收货地址：{{address_pcaaddress}} {{address_detail}}</p>
          </Col>
          <Col span="20" :id="address_id" v-else style="line-height: 36px">
            请添加收货人地址
          </Col>
        </Col>
      </router-link>
    </Row>
    <Row class="goods">
      <Col span="6">
        <img :src="goodsLogo" alt="" width="100%">
      </Col>
      <Col span="18">
        <h4>{{goodsName}}</h4>
        <p v-if="goodsSpec.length">规格：{{goodsSpec}}</p>
        <div>￥{{relPrice}} <span v-if="points==0"></span>
          <small v-else="">+{{use_points}}盟豆</small>
          <span
            :data-num="goodsNum">X {{goodsNum}}</span></div>
      </Col>
    </Row>
    <Row class="order_total">
      <Col span="24"><b>快递费用</b> <span style="color: #666666">{{totalExpress}}</span></Col>
      <Col span="24"><b>订单合计</b> <span style="font-weight: bold;color: #b491dc">{{totalPrice}}</span></Col>
    </Row>
    <Row class="order_points">
      <div v-if="points==0"></div>
      <Col span="24" v-else=""><b>盟豆</b> <span>使用{{points}}盟豆兑换</span></Col>
      <div class="ivu-col ivu-col-span-24" @click.stop="SYCoupon"><b>优惠券</b> <span :style="{'color': colorText}"
                                                                                   v-html="couponTit"></span></div>
      <Col span="24"><b>纳豆</b> <span class="balance">使用{{balance/10}}个纳豆抵扣{{balance}}元</span>
        <Switch v-model="switch1" @on-change="change"></Switch>
      </Col>
    </Row>
    <Row class="order_pay">
      <Col span="16" v-if="deduc==1"><b>实付</b>&nbsp; <span style="color: #b491dc">{{totalPayPrice}}</span> <span
        style="color: #f5b150; font-size: 12px"
        v-if="deduc==1">&nbsp;&nbsp;&nbsp;纳豆抵扣{{balance | numFilter}}元</span>
      </Col>
      <Col span="16" v-if="deduc==0"><b>实付</b>&nbsp;<span style="color: #b491dc">{{totalPayPrice}}</span> <span
        style="color: #f5b150" v-if="deduc==0"></span>
      </Col>
      <Col span="8">
        <button @click="pay()">立即付款</button>
      </Col>
    </Row>
    <div class="coupon_box" v-if="isCouponList" @click="closeCoupon">
      <div class="tables">
        <div class="cell" @click.stop>
          <div class="title">可使用优惠券</div>
          <div class="noCoupon">
            <div class="right_box">
              不使用优惠券
            </div>
            <div class="NOcChanges">
              <input class="changes_input" name="RCoupon1" type="radio"
                     @change.stop="changesRC('-1')">
              <div class="changes_span"></div>
            </div>
          </div>
          <div class="coupon_cent">
            <div class="item_list" v-for="(item,index) in couponList" :key="index">
              <div class="item" :class="{'library': item.coupon_type == 1,'rebate': item.coupon_type == 2}">
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
              <div class="changes">
                <input class="changes_input" name="RCoupon1" type="radio"
                       @change.stop="changesRC(item)">
                <div class="changes_span"></div>
              </div>
            </div>
          </div>
          <div class="coupon_btn">
            <button type="button" class="con_btn" @click="determine">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "order",
    data() {
      return {
        title: '确认订单',
        address_id: '',
        address_user_id: '',
        address_realname: '',
        address_tel: '',
        address_status: '',
        address_pcaaddress: '',
        address_detail: '',
        address_created_at: '',
        address_update_at: '',
        address_message: '',
        address_view_id: 0,
        //商品信息
        goodsName: '',
        goodsSpec: '',
        goodsLogo: '',
        status: '',
        goodsSpecIds: '',
        goodsNum: '',
        relPrice: '',
        balance: '',
        points: '',
        use_points: '',
        totalExpress: '',
        totalPrice: '',
        totalPayPrice: '',
        userId: '',
        goodsId: '',
        acttype: '',
        userPoints: '',
        goodsBalance: '',
        switch1: false,
        deduc: 0,
        specId: {},
        num: "",
        goods_id: "",
        isCouponList: false,
        couponList: [],
        userCId: 0,
        couponTit: '请选择',
        colorText: '#495060',
        bcT: '',
        address_box: {},
        determines: [],
        coupon_cut: ''
      }
    },
    created() {
      // alert('确认订单测试跳转')
      this.specId = this.$route.query.specId
      this.num = this.$route.query.num
      this.goods_id = this.$route.query.goods_id
      //获取地址
      if (this.$route.query.address_id == undefined) {
        this.$route.query.address_id = ''
        this.$axios.get('user/address/view?id=' + this.$route.query.address_id)
          .then(res => {
            if (res.data.code == 2000) {
              this.address_box = res.data.data
              this.address_view_id = 1
              this.address_id = res.data.data.id
              this.address_user_id = res.data.data.user_id
              this.address_realname = res.data.data.realname
              this.address_tel = res.data.data.tel
              this.address_status = res.data.data.status
              this.address_pcaaddress = res.data.data.pcaaddress
              this.address_detail = res.data.data.detail
              this.address_created_at = res.data.data.created_at
              this.address_update_at = res.data.update_at
            }
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
              this.address_view_id = 0
              this.address_message = res.data.message
            }
          })
      } else {
        this.$axios.get('user/address/view?id=' + this.$route.query.address_id)
          .then(res => {
            if (res.data.code == 2000) {
              this.address_box = res.data.data
              this.address_view_id = 1
              this.address_id = res.data.data.id
              this.address_user_id = res.data.data.user_id
              this.address_realname = res.data.data.realname
              this.address_tel = res.data.data.tel
              this.address_status = res.data.data.status
              this.address_pcaaddress = res.data.data.pcaaddress
              this.address_detail = res.data.data.detail
              this.address_created_at = res.data.data.created_at
              this.address_update_at = res.data.update_at
            }
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
              this.address_view_id = 0
              this.address_message = res.data.message
            }
          })
      }

      //获取商品信息
      this.getConfirmOrder();
      //获取可用优惠券
      this.getCouponList()
    },
    computed: {
      sun() {
        return this.totalPrice - this.balance - this.coupon_cut
      }
    },
    filters: {
      numFilter(value) {
        let transformVal = Number(value).toFixed(2)
        let realVal = transformVal.substring(0, transformVal.length)
        return realVal
      }
    },
    methods: {
      SYCoupon() {
        if (this.couponList.length === 0) {
          layer.msg('您还没有优惠券');
          return
        }
        this.isCouponList = true
      },
      changesRC(item) {
        this.bcT = item
      },
      determine() {
        this.isCouponList = false;
        if (this.bcT === '-1') {
          this.couponTit = '请选择';
          this.colorText = '#495060';
          this.userCId = 0;
          this.determineFS();
        } else {
          this.userCId = this.bcT.id;
          this.determineFS();
          this.colorText = '#e4b17a';
          this.$axios.get('/order/index/confirm-order?id=' + this.goods_id + '&specId=' + this.specId + '&num=' + this.num + '&user_c_id=' + this.userCId + '&deduc=' + this.deduc)
            .then(res => {
              this.coupon_cut = res.data.data.coupon_cut
              if (res.data.code == 2000) {
                if (this.bcT.coupon_type == 1) {
                  this.couponTit = '使用优惠券可减' + this.coupon_cut +'元';
                }
                if (this.bcT.coupon_type == 2) {
                  this.couponTit = '使用优惠券可减' + this.coupon_cut + '元';
                }
              }
            })
        }

      },
      closeCoupon() {
        this.isCouponList = false
      },
      getConfirmOrder() {
        this.$axios.get('/order/index/confirm-order?id=' + this.goods_id + '&specId=' + this.specId + '&num=' + this.num + '&user_c_id=' + this.userCId + '&deduc=' + this.deduc)
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              this.goodsName = res.data.data.goodsName
              this.goodsSpec = res.data.data.goodsSpec
              this.goodsLogo = res.data.data.goodsLogo
              this.status = res.data.data.status
              this.goodsSpecIds = res.data.data.goodsSpecIds
              this.goodsNum = res.data.data.goodsNum
              this.relPrice = res.data.data.relPrice
              this.balance = res.data.data.balance
              this.points = res.data.data.points
              this.use_points = res.data.data.use_points
              if (res.data.data.totalExpress == '0.00') {
                res.data.data.totalExpress = '包邮'
                this.totalExpress = res.data.data.totalExpress
              } else {
                this.totalExpress = res.data.data.totalExpress + '元'
              }
              this.totalPrice = res.data.data.totalPrice
              this.totalPayPrice = res.data.data.totalPayPrice
              this.userId = res.data.data.userId
              this.goodsId = res.data.data.goodsId
              this.acttype = res.data.data.acttype
              this.userPoints = res.data.data.userPoints
              this.goodsBalance = res.data.data.goodsBalance
            }
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
              this.userCId = 0
              setTimeout(() => {
                this.$router.push({name: 'orderpending'})
              }, 1000)
            }
          })
      },
      determineFS() {
        this.$axios.get('/order/index/confirm-order?id=' + this.goods_id + '&specId=' + this.specId + '&num=' + this.num + '&user_c_id=' + this.userCId + '&deduc=' + this.deduc)
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              this.determines = res.data.data
              console.log(this.determines)
              this.goodsName = res.data.data.goodsName
              this.goodsSpec = res.data.data.goodsSpec
              this.goodsLogo = res.data.data.goodsLogo
              this.status = res.data.data.status
              this.goodsSpecIds = res.data.data.goodsSpecIds
              this.goodsNum = res.data.data.goodsNum
              this.relPrice = res.data.data.relPrice
              this.balance = res.data.data.balance
              this.points = res.data.data.points
              this.use_points = res.data.data.use_points
              if (res.data.data.totalExpress == '0.00') {
                res.data.data.totalExpress = '包邮'
                this.totalExpress = res.data.data.totalExpress
              } else {
                this.totalExpress = res.data.data.totalExpress + '元'
              }
              this.totalPrice = res.data.data.totalPrice
              this.totalPayPrice = res.data.data.totalPayPrice
              this.userId = res.data.data.userId
              this.goodsId = res.data.data.goodsId
              this.acttype = res.data.data.acttype
              this.userPoints = res.data.data.userPoints
              this.goodsBalance = res.data.data.goodsBalance
            }
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
              this.couponTit = '请选择';
              this.colorText = '#495060';
              this.userCId = 0
            }
          })
      },
      // 请求可用的优惠券
      getCouponList() {
        this.$axios.get('/order/index/get-coupon?id=' + this.goods_id)
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              this.couponList = res.data.data.items
              console.log(res.data.data.items)
            }
          })
      },

      change(status) {
        if (status == true) {
          this.deduc = 1;
          this.determineFS()
        }
        if (status == false) {
          this.deduc = 0;
          this.determineFS()
        }
      },
      pay() {
        if (this.address_realname == '') {
          layer.msg('请先选择地址！')
          return;
        } else {
          if (this.deduc == 1) {
            if (this.sun > 0) {
              this.$axios.get('/order/index/create-order?id=' + this.goods_id + '&specId=' + this.specId + '&num=' + this.num + '&user_c_id=' + this.userCId + '&addressId=' + this.address_id + '&deduc=' + this.deduc)
                .then(res => {
                  console.log(res)
                  if (res.data.code == 2000) {
                    this.$router.push({name: 'ispay', query: {id: res.data.data.id}})
                  }
                  if (res.data.code == 3000) {
                    this.$router.push({name: 'orderdelivergoods', query: {id: res.data.data.id}})
                  }
                })
            } else {
              this.$axios.get('/order/index/create-order?id=' + this.goods_id + '&specId=' + this.specId + '&num=' + this.num + '&user_c_id=' + this.userCId + '&addressId=' + this.address_id + '&deduc=' + this.deduc)
                .then(res => {
                  console.log(res)
                  if (res.data.code == 2000) {
                    this.$router.push({name: 'orderdelivergoods', query: {id: res.data.data.id}})
                  }
                  if (res.data.code == 3000) {
                    layer.msg(res.data.message)
                  }
                })
            }

          }
          if (this.deduc == 0) {
            this.$axios.get('/order/index/create-order?id=' + this.goods_id + '&specId=' + this.specId + '&num=' + this.num + '&user_c_id=' + this.userCId + '&addressId=' + this.address_id + '&deduc=' + this.deduc)
              .then(res => {
                console.log(res)
                if (res.data.code == 2000) {
                  this.$router.push({name: 'ispay', query: {id: res.data.data.id}})
                }
                if (res.data.code == 3000) {
                  layer.msg(res.data.message)

                }
              })
          }
        }
      }
    }
  }

</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  $abs = 100%;
  body
    background-color: #f2f2f2 !important;

  .noCoupon
    width $abs
    padding: 0 0 0 10px;
    position: relative
    margin-top: 10px
    .right_box
      width calc(100% - 40px);
      padding 15px
      text-align center
      color white
      background-color: rgb(204, 204, 204)
      border-radius 6px
    .NOcChanges
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0
      top: 50%;
      transform translate3d(0, -50%, 0);
      .changes_input
        width $abs
        height: $abs
        opacity: 0;
        position: absolute
        z-index: 99;
      .changes_span
        width 28px
        height: 28px
        display: block;
        margin: 6px auto;
        border-radius 50%
        overflow: hidden;
        background url("../../common/images/rc-1.png") no-repeat top center
        background-size $abs $abs
      .changes_input:checked + .changes_span
        background url("../../common/images/rc-2.png") no-repeat top center
        background-size $abs $abs

  .coupon_box
    position: fixed;
    widows: $abs;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, .6);
    .tables
      position: relative;
      width: $abs;
      height: $abs;
    .cell
      position: absolute;
      width: $abs;
      height: auto;
      max-height: 80%;
      background-color: #fff;
      padding-bottom: 45px;
      bottom: 0;
      left: 0;
      .title
        text-align center
        font-size 17px
        overflow: hidden;
        line-height 24px
        margin-top: 10px
        color #333
    .coupon_cent
      width: $abs;
      position: relative
      max-height: 350px
      overflow-y auto
      padding: 10px 0 10px 10px;
      .item_list
        overflow: hidden;
        width: $abs;
        margin-bottom: 15px;
        position: relative
        .item
          width: calc(100% - 40px);
          position: relative;
          color: white;
          overflow: hidden;
          &:before, &:after
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: #fff;
            border-radius: $abs;
            z-index: 9;
          &:before
            bottom: 28px;
            left: -8px;
          &:after
            bottom: 28px;
            right: -8px;
          &:last-of-type
            margin-bottom: 0;
        .item_title
          padding: 15px;
          overflow: hidden;
          display: flex;
          align-items: center;
        .prc
          width: 48%;
          flex: 0 0 auto;
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
      .changes
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0
        top: 50%;
        transform translate3d(0, -50%, 0);
        .changes_input
          width $abs
          height: $abs
          opacity: 0;
          position: absolute
          z-index: 99;
        .changes_span
          width 28px
          height: 28px
          display: block;
          margin: 6px auto;
          border-radius 50%
          overflow: hidden;
          background url("../../common/images/rc-1.png") no-repeat top center
          background-size $abs $abs
        .changes_input:checked + .changes_span
          background url("../../common/images/rc-2.png") no-repeat top center
          background-size $abs $abs
    .coupon_btn
      position: absolute;
      bottom: 0;
      left: 0;
      width: $abs;
      height: 45px;
      line-height: 45px;
      .con_btn
        display: block;
        width: $abs;
        height: $abs;
        text-align: center;
        background-color: #A044FF;
        color: white;
        border: none;
        outline: none;
        border-radius: 0;

  .order_address
    border-bottom: 10px solid #f2f2f2;
    padding: 3% 0;
    background: #ffffff !important;
    .ivu-col-span-20
      line-height: 150%;
      h4
        font-size: 15px !important;
        color: #000000 !important;
        margin-bottom: 2% !important;
      p
        font-size: 14px !important;
        color: #666666 !important;
    i
      position: absolute;
      right: 2%;
      top: 33%;

  .goods
    padding: 10px 15px;
    border-bottom: 1px solid #f2f2f2;
    background: #ffffff !important;
    .ivu-col-span-18
      padding: 0 10px;
      line-height: 200%;
      h4
        font-size: 15px !important;
        color: #000000 !important;
        line-height: 1 !important;
        margin-top: 5px !important;
        margin-bottom: 5px !important;
        font-weight: 300 !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      p
        font-size: 12px;
        color: #8f8f94;
        margin: 10px 0;
      div
        color: #b491dc;
        font-size: 13px;
        span:last-child
          text-align: right;
          float: right;

  .order_total, .order_points
    padding: 10px 15px;
    border-top: 10px solid #f2f2f2;
    background: #ffffff !important;
    .ivu-col-span-24
      line-height: 40px;
      b
        font-size: 15px;
        font-weight: 100;
        font-weight 300;
      span
        text-align: right;
        float: right;

  .order_total b
    font-size: 13px !important;

  .order_points
    background: #ffffff !important;
    .ivu-col-span-24
      .balance
        margin-right: 20%;
      .ivu-switch
        position: absolute;
        top: 20%;
        right: 0;

  .order_pay
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    border-top: 1px solid #f2f2f2;
    line-height: 50px;
    padding-right: 0;
    background: #ffffff !important;
    .ivu-col-span-16
      padding-left: 15px;
      b
        font-size: 15px !important;
        font-weight: 300 !important;
    .ivu-col-span-8
      button
        background: rgb(160, 68, 255);
        color: #ffffff;
        text-align: center;
        width: 100%;
        height: 51px;
        border-radius: 0;
        border: none;

  .ivu-switch-checked
    border-color: #f5b150 !important;
    background-color: #f5b150 !important;

  a
    color: #495060 !important;

</style>
