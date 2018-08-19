<template>
  <div v-title="title">
    <!--纳豆明细-->
    <img :src="imgs" class="img_one" v-if="detail.length == 0" />
     <div v-if="detail.length != 0"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0">
          <Row class="list" v-for="(natt,k) in detail" :key="k" >
      <Col span="15">
      <p>{{natt.detail_text}}</p>
      <p>{{natt.created_at}}</p>
      </Col>
      <Col span="9" v-if="natt.type=='0'">+{{natt.money/10 |numFilter}}</Col>
      <Col span="9" v-if="natt.type=='1'" :title="natt.title">-{{natt.money/10 |numFilter}}</Col>
    </Row>
     </div>
   
  </div>
</template>
<script>
export default {
  name: "nattodetails",
  data() {
    return {
      title: "纳豆明细",
      detail: [],
      page: 1,
      imgs: "http://img.hena360.cn/no_data_img.png",
      loading: false,
    };
  },
  created() {
    this.getCollection();
  },
  methods: {
    loadMore() {
      this.page = parseInt(this.page) + 1;
      this.getCollection();
    },
    getCollection() {
      this.$axios
        .get("/user/balance/detail?per-page=10&page=" + this.page)
        .then(res => {
          console.log(res);
          if (this.detail.length == 0) {
            this.detail = res.data.data.items;
          } else {
            this.detail = this.detail.concat(res.data.data.items);
          }
          this.isHaveMore(
            res.data.data._meta.currentPage < res.data.data._meta.pageCount
          );
        });
    },
    isHaveMore(isHaveMore) {
      if (isHaveMore) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    }
  },
  filters: {
    numFilter(value) {
      let transformVal = Number(value).toFixed(2);
      let realVal = transformVal.substring(0, transformVal.length);
      return realVal;
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
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

