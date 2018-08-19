<template>
  <div v-title="title">
    <div class="mui-content addBankCard">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>银行卡</label>
          <input type="text" class="mui-input-clear" id="bank_num" placeholder="请输入银行卡卡号" v-model="num">
        </div>
        <div class="mui-input-row">
          <label>持卡人</label>
          <input type="text" class="mui-input-clear" id="bank_username" placeholder="请输入持卡人姓名" v-model="username">
        </div>
        <div class="mui-input-row " @click="select">
          <label>银行名称</label>
          <input type="text" id="bank_id" placeholder="选择银行" readonly="readonly" value="" v-model="bank" :moeryId="moeryId">
        </div>
      </form>
      <p>注意：请绑定持卡人本人储蓄卡！（不支持信用卡）</p>
      <input type="button" class="" id="addbank" placeholder="确认添加" value="确认" @click="addbank">
      <ul class="mui-table-view" v-show="show">
        <h4>请选择银行</h4>
        <div v-for="(classify,k) in category" :key="k" @click="ban(classify.id,classify.bank_name )">
          {{classify.bank_name}}
        </div>

      </ul>
      <div class="box" v-show="shows" @click="hide"></div>
    </div>
  </div>

</template>
<script>
import "vue-awesome-mui/mui/dist/css/mui.css";
export default {
  name: "addbank",
  data() {
    return {
      title: "绑定银行卡",
      num: "",
      username: "",
      bank: "",
      id: "",
      show: false,
      shows: false,
      category: [],
      moeryId: ""
    };
  },
  created() {
    this.$axios
      .get("/user/bonus/get-bank-code") //获取银行
      .then(res => {
        //console.log(res);
        this.category = res.data.data;
      });
    this.$axios
      .get("/user/bonus/get-code-info") //获取银行卡信息
      .then(res => {
        //console.log(res)
        // console.log(res.data.data.bank_info);
        if (res.data.data.bank_info == null) {
          return;
        } else {
          this.num = res.data.data.bank_info.bank_num;
          this.username = res.data.data.bank_info.bank_username;
          this.moeryId = res.data.data.bank_info.bank_id;
          this.bank = res.data.data.bank_info.Bank_Name.bank_name;
        }
      });
  },
  methods: {
    select() {
      //点击显示银行信息
      this.show = true;
      this.shows = true;
    },
    hide() {
      //点击着找进行页面的隐藏
      this.show = false;
      this.shows = false;
    },
    ban(id, bank_name) {
      //传参数
      this.bank = bank_name;
      this.moeryId = id;
    },
    addbank() {
      //点击进行绑定
      if (this.num == "") {
        mui.alert("请输入银行卡卡号！");
        return;
      } else if (
        !/^\w+$/.test(this.num) ||
        this.num.length <= 15 ||
        this.num.length >= 20
      ) {
        mui.alert("银行卡格式不正确，请重新输入");
        return;
      }
      if (this.username == "") {
        mui.alert("请输入持卡人姓名");
        return;
      } else if (!/^[\u4E00-\u9FA5]{1,6}$/.test(this.username)) {
        mui.alert("请输入2-6位中文姓名");
        return;
      }
      if (this.bank == "") {
        mui.alert("请选择开户行");
        return;
      }
      const Qs = require("qs");
      this.$axios
        .post(
          "/user/bonus/add-bank-code",
          Qs.stringify({
            bank_num: this.num,
            bank_username: this.username,
            bank_id: this.moeryId
          })
        )
        .then(res => {
          //console.log(res);
          if (res.data.code == 2000) {
            layer.msg(res.data.message);
            setTimeout(() => {
              this.$router.push({ name: "BonusEmbody" });
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
.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.addBankCard > form {
  background: #ffffff;
  padding: 15px;
  padding-bottom: 0px;
}

.addBankCard .mui-input-group:before,
.addBankCard .mui-input-group .mui-input-row:after,
.addBankCard .mui-input-group:after {
  background-color: #ffffff;
}

.addBankCard > form > div {
  border-bottom: 1px solid #f5f5f5;
}

.addBankCard > form > div > input {
  font-size: 14px;
}

.addBankCard > p {
  text-align: center;
  margin-top: 5%;
}

.addBankCard > input {
  width: 90%;
  margin-left: 5%;
  border: none;
  background: #000000;
  color: #ffffff;
  height: 40px;
  margin-top: 10%;
}

.addBankCard > ul {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: scroll;
  overflow-y: hidde;
  height: 65%;
  z-index: 3;
}

.addBankCard > ul > h4 {
  text-align: center;
  padding: 4% 0;
  border-bottom: 1px solid #f2f2f2;
  margin: 0;
}

.addBankCard .mui-table-view:before {
  background-color: #ffffff;
}

.addBankCardUlAddColro {
  background: #f2f2f2 !important;
}
ul {
  div {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
  }
}
.mui-table-view:after {
  background-color: #fff;
}
</style>
