<template>
  <div v-title="title">
    <Row class="order_details_head">
      <Col span="16">
      <h3 v-if="status_now=='1'">等待买家付款</h3>
      <h3 v-if="status_now=='2'">等待卖家发货</h3>
      <h3 v-if="status_now=='3'">等待买家收货</h3>
      <h3 v-if="status_now=='4'">订单已完成</h3>
      <h3 v-if="status_now=='22'">退款处理中</h3>
      <h3 v-if="status_now=='24'">退款已完成</h3>
      <h3 v-if="status_now=='21'">退款处理中</h3>
      <p>订单金额（含运费）：￥{{money}}</p>
      </Col>
      <Col span="8" v-if="status_now=='1'">
      <img src="http://img.hena360.cn/_pic49.png" alt="">
      </Col>
      <Col span="8" v-if="status_now=='2'">
      <img src="http://img.hena360.cn/_pic46.png" alt="">
      </Col>
      <Col span="8" v-if="status_now=='3'">
      <img src="http://img.hena360.cn/_pic47.png" alt="">
      </Col>
      <Col span="8" v-if="status_now=='4'">
      <img src="http://img.hena360.cn/_pic51.1.png" alt="">
      </Col>
      <Col span="8" v-if="status_now=='22'||status_now=='21'||status_now=='24'">
      <img src="http://img.hena360.cn/_pic51.2.png" alt="">
      </Col>
    </Row>

    <Row class="order_details_address">
      <Col> 收货人：{{name}}
      <span>{{phone}}</span>
      </Col>
      <Col> 收货地址：{{pcaaddress}} {{detail}}
      </Col>
    </Row>
    <Row class="order_details_list">
      <Col span="24"> 订单详情
      </Col>
      <Row class="">
        <Col span="6">
        <img :src="goods_img" alt="" width="100%"></Col>
        <Col span="12">
        <h4>{{goods_name}}</h4>
        <p class="spec" v-if="spec.length">规格：{{spec}}</p>
        <p>数量：X {{num}}</p>
        </Col>
        <Col span="6">
        <h4>￥{{price}}</h4>
        </Col>

      </Row>
      <Col span="24" style="line-height: 28px;margin-top: 10px" v-if="balance.length"> 纳豆抵扣：
      <span style="color: #F24646;">￥{{balance}}</span>
      </Col>
      <Col span="24" style="line-height: 28px" v-if="use_points.length"> 盟豆抵扣：
      <span style="color: #F24646;">{{use_points}}</span>
      </Col>
      <Col span="24" style="line-height: 28px"> 实付款（含运费）
      <span style="color: #F24646;float: right;padding-right: 15px">￥{{money}}</span>
      </Col>
    </Row>
    <Row class="logistics_number">
      <div class="expdatails">
        <Button type="primary" @click="modal1 = true" v-if="status_now=='3'" class="exp">查看物流</Button>
        <Modal v-model="modal1" title="物流详情" String="">
          <Timeline>
            <TimelineItem v-for="(v,k) in goodsexp" :key="k">
              <p class="time">{{v.datetime}}</p>
              <p class="content">{{v.remark}}</p>
            </TimelineItem>
          </Timeline>
        </Modal>
      </div>
      <Col> 订单编号：{{order_sn}}
      </Col>
      <Col> 下单时间：{{created_at}}
      </Col>
      <Col v-if="status_now=='2'||status_now=='3'||status_now=='4'||status_now=='22'||status_now=='26'||status_now=='21'||status_now=='24'"> 付款时间：{{pay_at}}
      </Col>
      <Col v-if="status_now=='3'||status_now=='4'||status_now=='26'||status_now=='21'||status_now=='24'"> 发货时间：{{delivery_at}}
      </Col>
      <Col v-if="status_now=='4'"> 收货时间：{{receiving_at}}</Col>
      <Col v-if="status_now=='1'||status_now=='2'||status_now=='3'||status_now=='4'||status_now=='22'||status_now=='26'||status_now=='24'"> 订单状态：{{status_text}}
      </Col>
      <Col v-if="status_now=='21'">订单状态：退款处理中</Col>
    </Row>
    <a :href="url" class="pay" v-show="status_now=='1'" :id="this.id">去付款</a>
    <button class="confirm" v-show="status_now=='3'" :id="this.id" @click="confirm()">确认收货</button>
  </div>
</template>

<script>
export default {
  name: "orderdatails",
  data() {
    return {
      title: "订单详情",
      name: "",
      phone: "",
      pcaaddress: "",
      goods_img: "",
      goods_name: "",
      money: "",
      total_money: "",
      num: "",
      created_at: "",
      status_now: "",
      order_sn: "",
      delivery_at: "",
      pay_at: "",
      receiving_at: "",
      data_id: "",
      goodsexp: [],
      modal1: false,
      status_text: "",
      id: "",
      price: "",
      spec: "",
      balance: "",
      use_points: "",
      detail: "",
      url: "/#/order/ispay?id=" + this.$route.query.id
    };
  },
  created() {
    this.data_id = this.$route.query.id;
    this.$axios("/user/order/view?id=" + this.data_id).then(res => {
      console.log(res);
      this.name = res.data.data.orderAddr.name;
      this.id = res.data.data.id;
      this.phone = res.data.data.orderAddr.phone;
      this.pcaaddress = res.data.data.orderAddr.pcaaddress;
      this.detail = res.data.data.orderAddr.detail;
      this.spec = res.data.data.orderGoods.spec;
      this.goods_img = res.data.data.orderGoods.goods_img;
      this.goods_name = res.data.data.orderGoods.goods_name;
      this.money = res.data.data.money;
      this.balance = res.data.data.balance;
      this.use_points = res.data.data.use_points;
      this.total_money = res.data.data.orderGoods.total_money;
      this.price = res.data.data.orderGoods.price;
      this.num = res.data.data.num;
      this.created_at = res.data.data.created_at;
      this.status_now = res.data.data.status_now;
      this.order_sn = res.data.data.order_sn;
      this.pay_at = res.data.data.pay_at;
      this.delivery_at = res.data.data.delivery_at;
      this.receiving_at = res.data.data.receiving_at;
      this.status_text = res.data.data.status_text;
    });
    this.$axios.get("/user/order/exp?id=" + this.$route.query.id).then(res => {
      console.log(res);
      this.goodsexp = res.data.data;
    });
  },
  methods: {
    go() {
      window.history.go(-1);
    },
    confirm() {
      //询问框
      let mymessage = confirm("亲爱的,你的宝贝收到了吗？");
      if (mymessage == true) {
        this.$axios
          .get("/user/order-goods/receipt?id=" + this.$route.query.id)
          .then(res => {
            if (res.data.code == 2000) {
              layer.msg(res.data.message);
              setTimeout(() => {
                this.$router.push({ path: "/user/order/ordercompleted" });
              }, 2000);
              return;
            }
          });
      } else {
        layer.msg("你点击了取消！");
      }
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
* {
  font-size: 14px;
}

.title {
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #f2f2f2;

  i {
    float: left;
    line-height: 40px;
    width: 40px;
    font-weight: bold;
  }
}

.order_details_head {
  background: #c0a369;
  padding: 20px 15px;

  h3 {
    color: #ffffff;
    font-weight: 100;
    font-size: 24px;
  }

  p {
    color: #f2f2f2;
    margin: 10px 0 0 0;
  }

  img {
    width: 40%;
    float: right;
  }
}

.order_details_address {
  padding: 5px 15px;
  border-bottom: 10px solid #f2f2f2;

  div {
    line-height: 28px;

    span {
      float: right;
    }
  }
}

.order_details_list {
  padding: 0 15px;
  border-bottom: 10px solid #f2f2f2;

  .ivu-row {
    border-bottom: 1px solid #f2f2f2;
    padding: 10px 0;

    div {
      margin-top: 2%;
    }

    .ivu-col-span-12 {
      padding-left: 2%;

      h4,
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 28px;
      }
    }
    .ivu-col-span-6 h4 {
      font-size: 14px;
      color: #f24646;
      text-align: center;
      margin-top: 50%;
    }
  }
}

.order_details_list > div:first-child {
  font-size: 16px;
  font-weight: 100;
  padding: 10px 0;
  border-bottom: 1px solid #f2f2f2;
}

.order_details_list > div:last-child {
  padding: 10px 0;
}

.logistics_number {
  padding: 10px 15px;
  border-bottom: 10px solid #f2f2f2;
  padding-bottom: 50px;

  div {
    line-height: 28px;
    color: #c8c8c8;
  }
}

.pay,
.confirm {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #000000;
  height: 40px;
  border: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  z-index: 99999;
}

.confirm {
  position: fixed;
  line-height: 0;
}

.exp {
  background: none;
  position: absolute;
  top: 44%;
  right: 5%;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 2;
  color: #000000;
}

.ivu-modal .ivu-modal-content .ivu-modal-footer {
  display: none;
}

.layui-layer-btn a {
  background: #000000 !important;
}
</style>
