<template>
  <div v-title="title">
    <ally :dataList="nav"></ally>
    <div class="ExchangeOfBeans">
      <div class="tuihuan">
        <Row class="bouns">
          <Col span="12">兑换纳豆</Col>
          <Col span="12">可用奖金{{bouns}}元</Col>
        </Row>
        <Row class="money">
          <Col span="24"> ￥
          <input v-model="value" placeholder="请输入兑换金额" type="text"></input>
          </Col>
          <Col span="24" v-cloak> 可兑换纳豆{{retu |numFilter}}个

          </Col>
        </Row>
      </div>
      <p class="nan">10元可兑换1个纳豆</p>

      <Row class="btn">
        <Col span="24">
        <Button long @click="bonusToBbalans()">兑换纳豆</Button>
        </Col>
        <Col span="24">
        <router-link to="/maker/exchange/Exchange/Exchangelist">兑换明细</router-link>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import ally from "base/user/ally";

export default {
  name: "ExchangeOfBeans",
  data() {
    return {
      title: "兑换纳豆",
      nav: [
        { url: "ExchangeOfBeans", title: "兑换纳豆" },
        { url: "BonusEmbody", title: "奖金提现" }
      ],
      bouns: "",
      value: ""
    };
  },
  components: {
    ally
  },
  created() {
    this.$axios.get("/user/bonus/total").then(res => {
      //console.log(res)
      this.bouns = res.data.data.bonus;
    });
  },
  computed: {
    retu() {
      return this.value / 10;
    }
  },
  methods: {
    bonusToBbalans() {
      const Qs = require("qs");
      if (this.value == "") {
        layer.msg("兑换数量不能为空！");
      } else {
        this.$axios
          .post(
            "/guest/bonus/bonus-to-balans",
            Qs.stringify({ bonus: this.value })
          )
          .then(res => {
            // console.log(res)
            if (res.data.code == 2000) {
              layer.msg(res.data.message);
              // this.$axios.get("/user/bonus/total").then(res => {
              //   console.log(res);
              //   this.bouns = res.data.data.bouns;
              // });
              setTimeout(() => {
                this.$router.push({ name: "maker" });
              }, 2000);
            }

            if (res.data.code == 3000) {
              layer.msg(res.data.message);
            }
          });
      }
    }
  },
  filters: {
    numFilter(value) {
      let transformVal = Number(value).toFixed(0);
      let realVal = transformVal.substring(0, transformVal.length);
      return realVal;
    }
  }
};
</script>

<style scoped lang="less">
.ExchangeOfBeans {
  padding: 10px 15px;
  background-color: #efeff4;
  padding-bottom: 75%;
  .tuihuan {
    background-color: #fff;
    padding: 0 15px;
    .bouns {
      padding: 25px 0px;
      div:first-child {
        color: #000;
        font-size: 15px !important;
      }
      .ivu-col-span-12:last-child {
        text-align: right;
        color: #cccccc;
        font-size: 15px !important;
      }
    }
  }

  .money {
    .ivu-col-span-24:first-child {
      font-weight: 100 !important;
      font-size: 21px !important;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 6%;
      input {
        font-weight: 100 !important;
        font-size: 21px !important;
        width: 80% !important;
        color: #a1a4ad;
      }
    }
    .ivu-col-span-24:last-child {
      padding: 22px 0px;
      color: #000;
      font-size: 13px !important;
    }
  }
}

.nan {
  padding: 15px 0px;
}
.btn .ivu-col-span-24 {
  button {
    background: #000000;
    border: none !important;
    padding: 15px 0px;
    color: #ffffff;
    margin-top: 25px;
    margin-bottom: 33px;
    font-size: 18px !important;
  }
  a {
    display: block;
    text-align: center;
    line-height: 200%;
    color: #d2cccc;
    font-size: 14px !important;
  }
}
input[type="text"] {
  border: none;
}
</style>
