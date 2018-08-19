<template>
  <div>
     <div class="mui-content addBankCard">
    <form class="mui-input-group">
        <div class="mui-input-row">
            <label>姓名</label>
            <input type="text" class="mui-input-clear" id="ali_realname" placeholder="请输入姓名" v-model="name">
        </div>
        <div class="mui-input-row">
            <label>支付宝账号</label>
            <input type="text" class="mui-input-clear" id="ali_account" placeholder="请输入支付宝账号" v-model="account">
        </div>

    </form>
      <p>注意：请绑定本人支付宝！</p>
       <input type="button" class="" id="addbank" placeholder="确认添加" value="确认" @click="alipy">
    </div>
</div>

</template>
<script>
import "vue-awesome-mui/mui/dist/css/mui.css";
export default {
  name: "alipay",
  data() {
    return {
       name:"",
       account:""
    };
  },
  created(){
    this.$axios
      .get("/user/aliinfo/alipay-info") //支付宝信息
      .then(res => {
       //console.log(res);
         this.name = res.data.data.ali_realname;
         this.account = res.data.data.ali_account;
      });
  },
  methods: {
   alipy(){
      //点击进行绑定
     if (this.name == '') {
            mui.alert("请输入姓名");
            return
        } else if (!/^[\u4E00-\u9FA5]{1,6}$/.test(this.name)) {
            mui.alert("请输入2-6位中文姓名");
            return
        }
        if (this.account == '') {
            mui.alert("请输入支付宝账号！");
            return
        }
      const Qs = require("qs");
      this.$axios
        .post(
          "/user/aliinfo/create-info",
          Qs.stringify({
          ali_account:this.account,
          ali_realname:this.name
          })
        )
        .then(res => {
         // console.log(res);
          if (res.data.code == 2000) {
            layer.msg("绑定成功");
            setTimeout(() => {
              this.$router.push({ name: "release" });
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
</style>
