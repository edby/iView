<template>
  <div v-title="title">
       <router-link v-for="(help,k) in items" :key="k" :to="{name:'helpcont',query:{id:help.id}}">
        <Row class="help_list">
        <Col span="24">{{help.question}}</Col>
         <!--<Icon type="chevron-right"></Icon>-->
        </Row>
       </router-link>
  </div>

</template>
<script>
export default {
  name: "help",
  data() {
    return {
      title:"帮助中心",
      items: []
    };
  },
  created() {
    this.$axios.get("/user/collection/help-center").then(res => {
      // console.log(res)
      this.items = res.data.data.items;
    });
  },
  methods: {}
};
</script>
<style scoped lang="less">
.help_list {

  font-size: 15px;
  padding: 18px 15px;
  padding-right:5px;
  box-sizing: content-box;
  margin-left: 10px;
  border-bottom: 1px solid #e6e6e9;
  color: #000;

  div {
    width: 90%;
  }
  i {
    float: right;
    padding-top: 4%;
    color: #bbb;
  }
}
</style>

