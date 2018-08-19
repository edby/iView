<template>
  <div>
      <Row class="list"  v-for=" (lis,k) in list " :key="k">
         <Col span="24" >
             <p v-cloak v-if="lis.status == 9"><span>提现状态：</span>{{lis.status_text}}<span class="resone" >({{lis.reason}})</span></p>
              <p v-cloak v-if="lis.status != 9"><span>提现状态：</span>{{lis.status_text}} </p>
             <p v-cloak><span>提现金额：</span>{{lis.withdraw_money}}</p>
             <p v-cloak><span>提现时间：</span>{{lis.created_at}}</p>
          </Col>
      </Row>
  </div> 

</template>

<script>
export default {
  name: "releaselist",
  data() {
    return {
      list: [],
      show:true,
      hide:false
    };
  },
  created() {
    this.$axios.get("/user/withdrawal/balance-detail").then(res => {
      //console.log(res);
      this.list = res.data.data.items;
     
    });
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
} 

.list {
  border-bottom: 1px solid #e5e5e5;
  margin-left: 20px;
  padding: 15px 0px;
  div {
    line-height: 24px;
    p{
      font-size:13px !important;
       .resone{
          color:red;
       }
      span{
         font-size:13px !important; 
         color:#000;
         
      }
    }
     
  }
  
}
</style>
