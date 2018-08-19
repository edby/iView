<template>
  <div class="rel">
    <div class="release">
      <div class="bonus_body">
        <Row class="bank">
          <router-link to="/maker/release/alipay">
            <Col span="12">释放到</Col>
            <Col span="12" v-if="account != ''">{{account}}</Col>
            <Col span="12" v-if="account == ''" v-cloak>请绑定支付宝账号</Col>
          </router-link>
        </Row>
        <Row class="bouns">
          <Col span="12">释放纳豆</Col>
          <Col span="12" v-cloak>可释放{{balance}}</Col>
        </Row>
        <Row class="money">
          <Col span="24">
          <input placeholder="0.00" v-model="num" type='text'></input>
          </Col>
          <Col span="24" v-cloak> 本次释放{{num}} 服务费{{retu}}纳豆
          </Col>
        </Row>
      </div>

      <div class="clause">
        <p>纳豆释放条款</p>
        <p>1. 请确保填写的姓名和支付宝信息正确无误，否则造成的一切后果由用户本人承担</p>
        <p>2. 释放服务费10%，满50纳豆起提并且为10的整数倍</p>
        <p>3. 到账时间为T+3 工作日，具体到账时间根据业务处理流程时间</p>
        <p>4. 个人账户信息仅供平台转账使用，不会泄漏至任何第三方</p>
      </div>

     <Row class="btn">
      <Col span="24">
      <Button long @click="release()">确认释放</Button>
      </Col>
      <Col span="24">
      <router-link to="/maker/release/releaselist">释放明细</router-link>
      </Col>
    </Row>


    </div>
    
  </div>
  </div>

</template>
<script>
import "vue-awesome-mui/mui/dist/css/mui.css";
export default {
  name: "release",
  data() {
    return {
      balance: "",
      account: "",
      num: ""
    };
  },
  created() {
    this.$axios
      .get("/user/aliinfo/alipay-info") //支付宝信息
      .then(res => {
        console.log(res);
        this.balance = res.data.data.balance;
        this.account = res.data.data.ali_account;
      });
  },
  computed: {
    retu() {
      return this.num * 0.1;
    }
  },
  methods: {
    ban(id, bank_name) {
      //传参数
      this.bank = bank_name;
      this.id = id;
    },
    release() {
      //点击进行绑定
      if (this.num == "") {
        mui.alert("请填写释放的纳豆数量！");
        return;
      }
      if ((this.account = "")) {
        mui.alert("请填写支付宝信息！");
        return;
      }
      // if (this.num < 50 || this.num % 10) {
      //   mui.alert("满50纳豆起提并且为10的整数倍！");
      // }
      const Qs = require("qs");
      this.$axios //进行释放
        .post(
          "/user/withdrawal/balance",
          Qs.stringify({
            withdraw_money: this.num
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 2000) {
            layer.msg(res.data.message);
            setTimeout(() => {
              this.$router.push({ name: "maker" });
            }, 2000);
          } else if (res.data.code == 3000) {
            layer.msg(res.data.message);
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
body{
      background-color:#efeff4 !important;
      }

[v-cloak] {
  display: none;
}
div {
  color: #666;
}
.rel{
  background-color:#efeff4;
}
.release {
  padding: 10px 15px;
  background-color: #efeff4;
  .bonus_body {
    background-color: #fff;
    padding: 20px;
    .bank {
      padding-bottom: 20px;
      border-bottom: 1px solid #f2f2f2;
      div:first-child {
        font-size: 14px !important;
        color: #666;
      }
      div:last-child {
        text-align: right;
        font-size: 15px !important;
      }
    }
    .bouns {
      line-height: 28px;
      margin: 10% 0 8% 0;
      .ivu-col-span-12:last-child {
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
      input {
        font-weight: 100 !important;
        font-size: 2rem !important;
        width: 80% !important;
      }
    }
    .ivu-col-span-24:last-child {
      line-height: 28px;
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
    height: 40px;
    color: #ffffff;
    margin: 5% 0;
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
input[type='text']{
   border:none;
}
</style>
