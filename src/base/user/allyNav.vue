<template>
  <Row class="Business_title">
    <router-link :to="{name:'GreatAlly'}">
      <Col span="12">大盟友({{GreatAllytotalCount}})</Col>
    </router-link>
    <router-link :to="{name:'juniorAlly'}">
      <Col span="12">小盟友({{juniorAllytotalCount}})</Col>
    </router-link>
  </Row>
</template>

<script>
    export default {
        name: "allyNav",
      data(){
          return{
            GreatAllytotalCount:'',
            juniorAllytotalCount:'',
          }
      },
      created(){
          this.allyNumber()
      },
      methods:{
          allyNumber(){
            this.$axios.get('/guest/level-rel/lower-o')
              .then(res=>{
                console.log(res)
                this.GreatAllytotalCount= res.data.data._meta.totalCount
              })
            this.$axios.get('/guest/level-rel/lower-t')
              .then(res=>{
                this.juniorAllytotalCount= res.data.data._meta.totalCount
              })
          }

      }

    }
</script>

<style scoped lang="less">
  .Business_title {
    // border-bottom: 10px solid #efeff4;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background: #ffffff;
  }

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
