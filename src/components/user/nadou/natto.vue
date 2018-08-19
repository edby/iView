<template>
 <div v-title="title" >   <!--我的纳豆-->
     <div class="nadou">
          <h4>纳豆</h4>
          <p>{{bonu}}</p>
     </div>
     <router-link to="/user/nadou/nattodetails">
        <p class="details">
            纳豆明细
        </p>
     </router-link>
</div>
</template>
<script>
export default {
  name: "natto",
  data() {
    return {
      title:"我的纳豆",
      bonu:''
      
    };
  },
  created() {
      this.$axios
      .get("/user/balance/total") //获取信息
      .then(res => {
       // console.log(res);
       this.bonu=res.data.data.balance
       
      });
  },
  methods: {}
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.nadou {
  width: 350px;
  height: 180px;
  margin: 20px auto;
  background: url("http://img.hena360.cn/_pic15.png")
    no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  h4 {
    padding-top: 20%;
    color: #fff;
  }
  p {
    padding-top: 5%;
    color: #fff;
    font-size: 34px !important;
    font-weight: 600 !important;
  }
}
.details {
  color: #000;
  height: 44px;
  line-height: 44px;
  margin: 0px 20px;
  border-bottom: 1px solid #f6f6f6;
}
</style>

