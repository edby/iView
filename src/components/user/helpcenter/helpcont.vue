<template>
  <div class="helpcont" v-title="title">
    <p>{{cont.question}}</p>
    
       <div v-html="cont.answer"  class="ans"> 
          <!-- {{cont.answer}}  -->
        </div> 
    
  </div>
    
</template>
<script>
export default {
  name: "helpcont",
  data() {
    return {
      title:"帮助中心",
      cont: {}
    };
  },
  created() {
    this.$axios
      .get("/user/collection/get-answer?id=" + this.$route.query.id)
      .then(res => {
       // console.log(res);
        this.cont = res.data.data;
      });
  },
  methods: {}
};
</script>
<style scoped lang="less">
.helpcont {
  padding: 0 15px;
}

p {
  line-height: 30px;
  font-size: 16px !important;
  margin: 10px 0px 10px 0px;
   color:#000;
  border-bottom: 1px solid #f2f2f2;
}
div {
  font-size: 14px !important;
  line-height: 28px;
  color: #000000;
  font-weight: 100 !important;
 
}
</style>

