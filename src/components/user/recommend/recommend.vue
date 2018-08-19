<template>
  <div v-title="title">  <!--绑定推荐人 -->
     <h4>绑定推荐人</h4>
     <div class="recom">
          <input type="text" placeholder="请输入推荐人手机号"  v-model="phone">
          <button @click="affirm">确定</button>
     </div>
    <!-- 推荐人符合要求 -->
     <div class="setBinding_pos" v-show="flag1" >
        <h4>推荐人</h4>
        <img :src="imgurl" alt="">
        <p class="nickname">{{name}}</p>
        <p><span class="cancel" @click="queding">取消</span><span style="color: #000" @click="recom">确定</span></p>
    </div> 
    <!-- 推荐人不符合要求的 -->
    <div class="setBinding_sure" v-show="flag">
        <img src="http://img.hena360.cn/no.png" alt="">
        <p class="nickname">{{reminder}}</p>
        <p @click="queding"><span style="color: #000000" class="sure_cance" >确定</span></p>
    </div>
   
    </div>
</template>
<script>
export default {
  name: "recommend",
  data() {
    return {
      title:"绑定推荐人",
      phone: "",
      flag: false,
      flag1: false,
      name: "",
      imgurl: "http://img.hena360.cn/head_img.png",
      reminder: ""
    };
  },
  created() {},
  methods: {
    affirm() {
      //输入手机号点击确定
      let tel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!tel.test(this.phone)) {
        layer.msg("请输入正确的手机号!");
        return false;
      } else {
        // console.log (this.phone)
        this.$axios
          .get("/user/index/get-binding?tel=" + this.phone) //获取推荐人信息
          .then(res => {
            //console.log(res);
            if (res.data.code == 2000) {
              this.flag1 = true;
              this.name = res.data.data.nickname;
              this.imgurl = res.data.data.avatar;
            }
            if (res.data.code == 3000) {
              this.flag = true;
              this.phone = "";
              this.reminder = res.data.message;
            }
          });
      }
    },
    recom() {
      this.$axios
        .get("/user/index/set-binding?tel=" + this.phone) //绑定推荐人
        .then(res => {
         // console.log(res);
          if (res.data.code == 2000) {
            // 绑定成功返回
            layer.msg("绑定成功!");
             setTimeout(() => {
              this.$router.push({ name: "userindex" });
            }, 2000);
          }
          if (res.data.code == 3000) {
            this.phone = "";
            this.flag1 = false;
            layer.msg(res.data.message);
          }
        });
    },
    queding() {
      (this.flag = false), (this.flag1 = false), (this.phone = "");
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
[v-cloak] {
  display: none;
}
h4 {
  font-size: 29px !important;
  font-weight: 600 !important;
  margin: 34px auto;
  padding: 0px 15px;
}
.recom {
  padding: 0 15px;
  margin: 70px 0;
  input[type="text"] {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0px;
  }
  button {
    width: 100%;
    background-color: #000;
    color: #fff;
    margin-top: 10px;
    padding: 12px 0px;
  }
}
.setBinding_sure {
  //推荐人不符合要求

  width: 60%;
  height: 170px;
  background-color: #fff;
  position: fixed;
  top: 22%;
  left: 20%;
  text-align: center;
  border-radius: 10px;
  -webkit-box-shadow: #dddee1 0px 0px 10px;
  -moz-box-shadow: #dddee1 0px 0px 10px;
  box-shadow: #dddee1 0px 0px 10px;
  img {
    margin-top: 10%;
    width: 25%;
  }
  .nickname {
    margin-top: 10px;
    color: #000;
    font-size: 14px !important;
  }
  p:last-child {
    padding: 10px 0px;
    width: 100%;
    color: #000;
    position: absolute;
    bottom: 0px;
    border-top: 1px solid #f5f5f5;
  }
}
.setBinding_pos {
  //推荐人符合要求
  width: 60%;
  height: 220px;
  background-color: #fff;
  position: fixed;
  top: 22%;
  left: 20%;
  text-align: center;
  border-radius: 10px;
  -webkit-box-shadow: #dddee1 0px 0px 10px;
  -moz-box-shadow: #dddee1 0px 0px 10px;
  box-shadow: #dddee1 0px 0px 10px;
  h4 {
    font-size: 20px !important;
    margin: 20px auto;
  }
  img {
    width: 24%;
    border-radius: 50%;
    margin-bottom: 5%;
  }
  p:last-child {
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
    span {
      display: inline-block;
      border-top: 1px solid #f2f2f2;
      border-right: 1px solid #f2f2f2;
      width: 50%;
    }
  }
}
</style>

