<template>
  <div>
    <Row class="title">
      <Col span="24">
        <Icon type="ios-arrow-left" @click="go()"></Icon>
        业务订单
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: "Business",
    methods:{
      go() {
       this.$router.push('/maker/maker')
      },
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less" >
  .title {
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
  }

  i {
    float: left;
    line-height: 40px !important;
    width: 40px;
    font-weight: bold;
    height: 40px !important;
  }
</style>
