<template>
  <div v-title="title" style="height:100%">
    <ally :dataList="nav"></ally>
    <div class="BonusEmbody">
      <div class="bonus_body">

        <Row class="bank">
          <router-link :to="{name:'addbank'}">
            <Col span="8">提现到</Col>
            <Col span="16" v-if="this.bank == null ">请填写银行卡
            <Icon type="ios-arrow-forward" />
            </Col>
            <Col span="16" v-if="this.bank !=  null " :id="id">{{num}}
            <Icon type="ios-arrow-forward" />
            </Col>
          </router-link>
        </Row>
        <Row class="bouns">
          <Col span="8">提现金额</Col>
          <Col span="16" v-cloak>可提现金额{{bonu.bonus}}元</Col>
        </Row>
        <Row class="money">
          <Col span="24"> ￥
          <input v-model="value" placeholder="0.00" type="text"></input>
          </Col>
          <Col span="24" v-cloak> 本次提现手续费{{retu |numFilter}}元
          </Col>
        </Row>
      </div>

      <div class="clause">
        <p>提现条款</p>
        <p>1. 请确保填写的姓名和银行卡（储蓄卡）信息正确无误，否则造成的一切后果由用户本人承担</p>
        <p>2. 提现手续费为提现金额的3%，满100起提并且为100的整数倍</p>
        <p>3. 到账时间为T+1 工作日，具体到账时间根据银行业务处理流程时间</p>
        <p>4. 个人账户信息仅供平台转账使用，不会泄漏至任何第三方</p>
      </div>
      <Row class="btn">
        <Col span="24">
        <Button long @click="bonusem()">确认提现</Button>
        </Col>
        <Col span="24">
        <router-link to="/maker/exchange/Bonus/Bonuslist">提现明细</router-link>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import ally from "base/user/ally";

export default {
  name: "BonusEmbody",
  data() {
    return {
      title: "奖金提现",
      nav: [
        { url: "ExchangeOfBeans", title: "兑换纳豆" },
        { url: "BonusEmbody", title: "奖金提现" }
      ],
      bonu: {},
      bank: {},
      value: "", // 输入的金额
      expense: "0",
      id: "",
      num: ""
    };
  },
  components: {
    ally
  },
  created() {
    this.$axios
      .get("/user/bonus/get-code-info") //奖金提现界面
      .then(res => {
        // console.log(res)
        this.bonu = res.data.data;
        this.bank = res.data.data.bank_info;
        if (this.bank == null) {
          return;
        } else {
          this.num = this.bank.bank_num;
          this.id = res.data.data.bank_info.id;
          //console.log(this.num)
          this.num = "************" + this.num.substr(-4);
        }
      });
  },
  computed: {
    retu() {
      return this.value * 0.03;
    }
  },
  methods: {
    bonusem() {
      //点击提现按钮
      //alert(this.value)
      if (this.value == "") {
        mui.alert("请填写提现金额！");
        return;
      }
      if (!/^-?\d+$/.test(this.value)) {
        mui.alert("请输入100的整数倍！");
        return;
      }
      if (this.bank == null) {
        mui.alert("请先填写银行卡信息！");
        return;
      }
      const Qs = require("qs"); //点击确定访问提现接口
      this.$axios
        .post("/user/bonus/get-cash", Qs.stringify({ money: this.value }))
        .then(res => {
          //console.log(res)
          if (res.data.code == 2000) {
            layer.msg(res.data.message);
            setTimeout(() => {
              this.$router.push({ name: "maker" });
            }, 2000);
          }
          if (res.data.code == 3000) {
            layer.msg(res.data.message);
          }
        });
    }
  },
  filters: {
    numFilter(value) {
      let transformVal = Number(value).toFixed(2);
      let realVal = transformVal.substring(0, transformVal.length);
      return realVal;
    }
  }
};
</script>

<style scoped lang="less">
div {
  color: #8c8c8c;
}
.BonusEmbody {
  padding: 10px 15px;
  background-color: #efeff4;
  .bonus_body {
    padding: 0 15px;
    background-color: #fff;
    .bank {
      padding: 20px 0px;
      border-bottom: 1px solid #f2f2f2;
      overflow: hidden;
      div:first-child {
        font-size: 14px !important;
        color: #b7b7b7;
      }
      div:last-child {
        text-align: right;
        color: #adadad;
        font-size: 15px !important;
        i {
          float: right;
          margin-top: -3%;
          color: #adadad;
          font-size: 24px !important;
          margin-left: 10px;
        }
      }
    }
    .bouns {
      line-height: 28px;
      margin-top: 44px;
      margin-bottom: 45px;
      div:last-child {
        text-align: right;
        color: #cccccc;
      }
    }
  }
  .clause {
    margin-top: 15%;
    p {
      font-size: 14px !important;
      line-height: 22px;
    }
  }

  .money {
    .ivu-col-span-24:first-child {
      font-weight: 100 !important;
      font-size: 2rem !important;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 5%;
      color: #000;
      input {
        font-weight: 100 !important;
        font-size: 2rem !important;
        width: 80% !important;
        color: #000;
      }
    }
    .ivu-col-span-24:last-child {
      line-height: 30px;
      color: #cccccc;
      text-align: center;
      font-size: 14px !important;
    }
  }
}

.btn .ivu-col-span-24 {
  button {
    background: #000000;
    border: none !important;
    height: 50px;
    color: #ffffff;
    margin: 4% 0;
    font-size: 14px !important;
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
