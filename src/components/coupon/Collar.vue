<template>
  <div
    v-title="title"
    class="CollarContent"
  >
    <div
      class="FreeColumn"
    >
      <img src="http://img.hena360.cn/voucher_0.png" alt="" width="100%">
      <Row
        class="fixedFreeColumn"
      >
        <img src="http://img.hena360.cn/voucher_1.png" alt="" class="fixedFreeColumnIMG">
        <Col span="12" v-for="(v,k) in fixedFree" :key="this">
          <h1 class="fixedTitle"><span class="substring" ref="substring">{{v.coupon.title}}</span></h1>
          <h3>{{v.coupon.disc_price}}元</h3>
          <p v-show="v.coupon.type==1">满{{v.coupon.meet_price}}元减{{v.coupon.disc_price}}元</p>
          <p v-show="v.coupon.type==2">满{{v.coupon.meet_price}}元打{{v.coupon.disc_price}}折<br> <small>最高可减{{v.coupon.high_price}}元</small>
          </p>
          <span class="fixedLeft"></span>
          <span class="fixedRight"></span>
          <img src="http://img.hena360.cn/_pic17.png" alt="" class="fixedFreeColumnBG">
          <button
            type="button"
            @click="Receive(v.coupon_id)"
          >立即领取
          </button>
        </Col>
        <img src="http://img.hena360.cn/voucher_banner.png" alt="" class="CollarUrl" @click="CollarUrl">
        <img src="http://img.hena360.cn/voucher_2.png" alt="" class="ExchangeColumnIMG">
        <Row class="ExchangeColumn" v-for="(v,k) in Exchange" :key="k">
          <Col span="9">
            <span>{{v.coupon.title}}</span>
            <h1 v-show="v.coupon.type==1">{{v.coupon.disc_price}}
              <small>元</small>
            </h1>
            <h1 v-show="v.coupon.type==2">{{v.coupon.disc_price}}
              <small>折</small>
            </h1>
          </Col>
          <Col span="9" v-show="v.coupon.type==1"><p>满{{v.coupon.meet_price}}元减{{v.coupon.disc_price}}元</p></Col>
          <Col span="9" v-show="v.coupon.type==2"><p>满{{v.coupon.meet_price}}元打{{v.coupon.disc_price}}折 <br> <small>最高可减{{v.coupon.high_price}}元</small>
          </p></Col>
          <Col span="6">
            <i class="ExchangeColumnTop"></i>
            <i class="ExchangeColumnBottom"></i>
            <img src="http://img.hena360.cn/_pic18.png" alt="" class="ExchangeColumnBG">
            <span @click="exchange(v.coupon_id)">{{v.point_conv}}盟豆<br>兑换</span></Col>

        </Row>

      </Row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Collar",
    data() {
      return {
        title: '领卷中心',
        fixedFree: [],
        Exchange: [],
      }
    },
    created() {
      this.fixedFreeColumn()
      this.ExchangeColumn()

    },
    mounted() {
      this.$nextTick(() => {
        this.substr()
      })

    },
    methods: {
      fixedFreeColumn() {
        this.$axios.get('/coupon/coupon/index?type=0')
          .then(res => {
            console.log(res)
            this.fixedFree = res.data.data.items
          })
      },
      ExchangeColumn() {
        this.$axios.get('/coupon/coupon/index?type=1')
          .then(res => {
            console.log(res)
            this.Exchange = res.data.data.items
          })
      },
      Receive(coupon_id) {
        this.$axios.get('/coupon/coupon/get-coupon?id=' + coupon_id)
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              layer.msg(res.data.message)
            }
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
            }
          })
      },
      exchange(coupon_id) {
        let r = confirm("确定要兑换吗？");
        if (r == true) {
          this.$axios.get('/coupon/coupon/get-coupon?id=' + coupon_id)
            .then(res => {
              console.log(res)
              if (res.data.code == 2000) {
                layer.msg(res.data.message)
              }
              if (res.data.code == 3000) {
                layer.msg(res.data.message)
              }
            })
        }
        else {
          layer.msg('您取消了兑换')
        }


      },
      CollarUrl() {
        this.$router.push({name: 'paradise'})
      },
      substr() {

      }
    }
  }
</script>

<style scoped lang="less">
  * {
    font-family: '微软雅黑';
  }

  .CollarContent {
    background: #f5f5f5;
    padding-bottom: 3%;
  }

  .FreeColumn {
    position: relative;
    .fixedFreeColumn {
      position: absolute;
      width: 100%;
      left: 0;
      top: 50%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
      .fixedFreeColumnIMG {
        width: 50%;
        display: block;
        margin: 0 auto;
        margin-top: -10%;
        margin-bottom: 5%;
      }
      .ivu-col-span-12 {
        position: relative;
        background: #ffffff;
        margin: 1.5%;
        width: 47%;
        border-radius: 5px;
        overflow: hidden;
        .fixedTitle {
          position: absolute;
          left: -11%;
          top: -11%;
          background: #CE71E9;
          color: #ffffff;
          padding: 5%;
          width: 80px;
          height: 80px;
          display: block;
          border-radius: 50%;
          span {
            margin-top: 46%;
            display: block;
            margin-left: 25%;
            font-size: 11px;
            color: #FFFEFE;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 13px;
          }
        }
        h3 {
          font-size: 34px;
          color: #FFD200;
          text-align: center;
          font-weight: 500;
          margin-top: 37%;
        }
        p {
          font-size: 12px;
          line-height: 150%;
          color: #666666;
          text-align: center;
          margin-bottom: 25%;
          min-height: 38px;
          margin-top: 5%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          display: block;
        }
        .fixedLeft {
          width: 15px;
          height: 15px;
          background: #f5f5f5;
          position: absolute;
          bottom: 19%;
          left: -4%;
          z-index: 2;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
        .fixedRight {
          width: 15px;
          height: 15px;
          background: #f5f5f5;
          position: absolute;
          bottom: 19%;
          right: -4%;
          z-index: 2;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
        button {
          width: 100%;
          border: none;
          height: 51px;
          background: #CE71E9;
          color: #000000;
          border-radius: 0px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }

  
  .CollarUrl {
    width: 95%;
    display: block;
    margin: 0 auto;
    padding-top: 5%;
  }

  .ExchangeColumnIMG {
    width: 50%;
    display: block;
    margin: 0 auto;
    padding: 2% 0;
  }

  .ExchangeColumn {
    min-height: 116px;
    background: #ffffff;
    margin: 2%;
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
    .ivu-col-span-9:first-child {
      h1 {

        text-align: center;
        font-size: 37px;
        color: #333333;
        font-weight: 500;
        padding-top: 35%;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #FFD05B;
        font-size: 12px;
        padding: 9px;
        border-top-left-radius: 5px;
        border-bottom-right-radius: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      small {
        font-size: 19px;
        margin-left: -8%;
      }
    }
    .ivu-col-span-9:nth-child(2),.ivu-col-span-9:nth-child(3)  {
      p {
        margin-top: 30%;
        font-size: 12px;
        color: #666666;
        text-align: center;
      }

    }
    .ivu-col-span-6:last-child {
      background: #FFD05B;
      min-height: 116px;
      text-align: center;
      border-radius: 5px;
      position: relative;
      span {
        display: block;
        margin-top: 40%;
        line-height: 150%;
      }
      .ExchangeColumnTop {
        width: 13px;
        height: 13px;
        background: #f5f5f5;
        position: absolute;
        top: -6%;
        right: 91%;
        z-index: 2;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
      .ExchangeColumnBottom {
        width: 13px;
        height: 13px;
        background: #f5f5f5;
        position: absolute;
        bottom: -6%;
        right: 91%;
        z-index: 2;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
    }
  }

  .fixedFreeColumnBG {
    position: absolute;
    width: 22%;
    right: -3%;
    bottom: 25%;
    z-index: 3;
  }

  .ExchangeColumnBG {
    position: absolute;
    width: 76%;
    right: 163%;
    bottom: -12%;
    z-index: 3;
  }
</style>
