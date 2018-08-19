<template>
  <div class="pay" v-title="title">
    <Row class="title">
      <Col span="24">请您在{{expires}}前完成支付，否则订单自动取消！</Col>
      <Col span="24">订单号: {{order_sn}}</Col>
      <Col span="24">支付金额: {{money}}</Col>
    </Row>
    <Row class="is">
      <h4>选择支付方式</h4>
      <Col span="24" @click.native="chooseWXPay"><img src="http://img.hena360.cn/_pic145.png" alt="">微信支付</Col>
      <Col span="24" @click.native="alipay"><img src="http://img.hena360.cn/pay_logo1.png" alt="">支付宝支付</Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "ispay",
    data() {
      return {
        title: '选择支付方式',
        expires: '',
        order_sn: '',
        money: '',
        appId: '',
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: '',
        paySign: '',
      }
    },
    created() {
      //获取订单信息
      this.$axios.get('/order/index/select-pay?id=' + this.$route.query.id)
        .then(res => {

          if (res.data.code == 2000) {
            this.expires = res.data.data.expires
            this.order_sn = res.data.data.order_sn
            this.money = res.data.data.money
          }
          if (res.data.code == 3000) {
            if (res.data.status == 3008) {
              this.$router.push({name: 'orderdatails', query: {id: this.$route.query.id}})
            }
            alert(res.data.message)
            window.location.href = '/'
            // window.location.href = 'http://t.test.qc1680.cn/'
          }
        })
      //微信支付获取信息
      this.$axios.get('/order/index/wechat-pay?id=' + this.$route.query.id)
        .then(res => {
          console.log(res)
          if (res.data.code == 2000) {
            this.appId = res.data.data.appId
            this.timeStamp = res.data.data.timeStamp
            this.nonceStr = res.data.data.nonceStr
            this.package = res.data.data.package
            this.signType = res.data.data.signType
            this.paySign = res.data.data.paySign
          }
          if (res.data.code == 3000) {
          //  layer.msg(res.data.message)
            if (res.data.status == 3006) {
              return;
            }
          }
        })
    },
    methods: {
      //微信支付
      chooseWXPay() {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": this.appId,     //公众号名称，由商户传入
            "timeStamp": this.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": this.nonceStr, //随机串
            "package": this.package,
            "signType": this.signType,         //微信签名方式：
            "paySign": this.paySign //微信签名
          },
          (res => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              layer.msg('支付成功')
              setTimeout(() => {
                this.$router.push({name: 'orderdatails', query: {id: this.$route.query.id}})
              }, 1000)
            }
            if (res.err_msg == "get_brand_wcpay_request:cancel") {
              layer.msg('您取消了支付')
            }
            if (res.err_msg == "get_brand_wcpay_request:fail") {
              layer.msg('支付失败')
            }
          })
        );


        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      },
      //支付宝支付
      alipay() {
        this.$axios.get('/order/index/alipay?id=' + this.$route.query.id)
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              window.location.href = res.data.data.url
            }
            if (res.data.code == 3010) {
              // this.$router.push({
              //   name: 'isBrowser',
              //   query: {
              //     id: res.data.data.id,
              //     uid: res.data.data.uid,
              //     _sign: res.data.data._sign,
              //     _time: res.data.data._time
              //   }
              // })
              //  window.location.href = 'http://t.test.qc1680.cn/#/order/isBrowser?id='+res.data.data.id+'&uid='+res.data.data.uid+'&_sign='+res.data.data._sign+'&_time='+res.data.data._time
               window.location.href = 'http://alipay.hena360.com/alipay.html?id='+res.data.data.id+'&uid='+res.data.data.uid+'&_sign='+res.data.data._sign+'&_time='+res.data.data._time
            }
          })
      }
    }
  }
</script>

<style scoped lang="less">
  .title {
    padding: 15px;
    text-align: left !important;
    div:first-child {
      color: #000000;
      font-weight: 300;
      line-height: 28px;
    }
    div:nth-child(2), div:nth-child(3) {
      color: #CCCCCC;
      line-height: 28px;
      font-size: 14px;
    }
  }

  .is {
    padding: 15px;
    h4 {
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
    }
    div {
      cursor: pointer;
      text-indent: 3em;
      line-height: 40px;
      cursor: pointer;
      border-bottom: 1px solid #f2f2f2;
      img {
        width: 8%;
        position: absolute;
        left: 0;
        top: 14%;
      }
    }
  }
</style>
