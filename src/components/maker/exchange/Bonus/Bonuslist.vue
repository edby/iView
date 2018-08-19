<template>
  <div v-title="title">
    <img :src="imgs" class="img_one" v-show="shows" />
    <Row class="list" v-for=" (lis,k) in list " :key="k" v-show="showss">
      <Col span="16">
      <p v-cloak>{{lis.title}}</p>
      <p v-cloak>{{lis.created_at}}</p>
      </Col>
      <Col span="8" v-cloak> -{{lis.bonus}}
      </Col>
    </Row>
  </div>

</template>

<script>
export default {
  name: "Bonuslist",
  data() {
    return {
      title: "提现明细",
      list: [],
      shows: false,
      imgs: "",
      showss: true
    };
  },
  created() {
    this.$axios.get("/user/bonus/bonus-with-detail").then(res => {
      //console.log(res);
      if (res.data.data.items.length == 0) {
        this.shows = true;
        this.imgs = "http://img.hena360.cn/no_data_img.png";
      } else {
        this.shows = false;
        this.showss = true;
        this.list = res.data.data.items;
      }
    });
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
.list {
  height: 65px;
  line-height: 20px;
  margin-left: 15px;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 4%;
  div:first-child {
    p:first-child {
      color: #333;
      font-size: 14px !important;
      font-weight: 600 !important;
    }
    p:last-child {
      padding-top: 5px;
      color: #a1a1a1;
    }
  }
  div:last-child {
    padding-top: 2%;
    padding-right: 2%;
    text-align: right;
    font-size: 24px !important;
    font-weight: 500 !important;
  }
}

.img_one {
  width: 25%;
  margin: 40%;
}
</style>
