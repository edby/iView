<template>
  <div v-title="title"> <!-- 我的收藏 -->

    <img :src="imgs" class="img_one" v-if="collectlist.length == 0"/>
    <div v-if="collectlist.length != 0"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0">
      <router-link v-for="(items,k) in collectlist" :key="k" :to="{name:'CommodityDetails',query:{id:items.goods_id}}" v-lazy="items.goods_logo">
        <Row class="collect_list">
          <Col span="8">
            <img :src="items.goods_logo" alt="">
          </Col>
          <Col span="16">
            <h4>{{items.goods_name}}</h4>
            <p>
              <span>  ¥ {{items.goods_price}} </span>
              <span> {{qiangou}} </span>
            </p>
          </Col>
        </Row>
      </router-link>
    </div>
  </div>

</template>
<script>
  export default {
    name: "collect",
    data() {
      return {
        title: "我的收藏",
        collectlist: [],
        qiangou: "抢购",
        shows: false,
        imgs: "http://img.hena360.cn/no_data_img.png",
        showss: true,
        page: 1,
        loading: false,
      };
    },
    created() {
      this.getCollection()
    },
    methods: {
      loadMore() {
        this.page = parseInt(this.page) + 1;
        this.getCollection()
      },
      getCollection() {
        this.$axios.get("/user/collection/get-collection?per-page=10&page=" + this.page).then(res => {
          console.log(res)
          if (this.collectlist.length == 0) {
            this.collectlist = res.data.data.items;
          } else {
            this.collectlist = this.collectlist.concat(res.data.data.items)
          }
          this.isHaveMore(res.data.data._meta.currentPage < res.data.data._meta.pageCount);
        });
      },
      isHaveMore(isHaveMore) {
        if (isHaveMore) {
          this.loading = false;
        } else {
          this.loading = true;
        }
      },
    }
  };
</script>
<style scoped lang="less">
  .img_one {
    width: 25%;
    margin: 40%;

  }

  .collect_list {
    padding: 10px 0px;
    margin: 10px 10px;
    border-bottom: 1px solid #f9f9f9;
    border-top: 1px solid #f9f9f9;
    color: #000;
    div:first-child {
      img {
        width: 80%;
      }
    }
    div:last-child {
      padding-top: 20px;
      h4 {
        padding-bottom: 20px;
      }
      p {
        span:first-child {
          font-size: 18px !important;
          float: left;
        }
        span:last-child {
          background-color: #000;
          color: #fff;
          padding: 4px 20px;
          float: right;
        }
      }
    }
  }
</style>

