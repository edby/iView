<template>
  <Row class="Business_title">
    <router-link v-for="(v,k) in dataList" :key="k" :to="{name: v.url}">
      <Col span="12">{{v.title}}</Col>
    </router-link>
  </Row>
</template>

<script>
  export default {
    name: "ally",
    props: {
      dataList: {
        type: [Array, Object,Number],
        default: []
      }
    },
  }
</script>

<style scoped lang="less">
 

  .Business_title a {
    color: #000000;
    display: inline-block;  
    line-height: 40px;
    text-align: center;
    height: 40px;
    width: 50%;
    float: left;
    div {
      text-align: center;
      width: 100%;
    }
  }

  .router-link-active {
    border-bottom: 2px solid #000000;
  }
</style>
