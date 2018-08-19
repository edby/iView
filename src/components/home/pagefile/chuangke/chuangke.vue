<template>
     <div class="detonation">  <!-- 520 -->
         <router-link :to="{name:'index'}">
         <img src="http://img.hena360.cn/gohome.png" alt="" class="index">
          </router-link>
        <img src="http://img.hena360.cn/giftbag_1.jpg" alt="">
       <Row type="flex" justify="space-between"  class="deton_list">
        <!-- 进行详情页面的跳转   -->
            <Col span="12" class="list"  v-for="(detons ,k ) in deton " :key="k"  v-lazy="detons.goods_logo">
             <router-link :to="{name:'CommodityDetails',query:{id:detons.id}}">
                <img :src="detons.goods_logo" alt="">
                 <div>
                      <p class="name">{{detons.goods_name}}</p>
                      <p class="many">
                          <span>¥{{detons.goods_price}}</span> 
                          <span class="lingqu">领取</span>
                      </p>
                  </div>
             </router-link>
             </Col>
         
        </Row>
        
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "chaungke",
  data() {
    return {
      deton: []
    };
  },
  created() {
    this.$axios.get("/goods/goods/index?acttype=1").then(res => {
      console.log(res);
      this.deton = res.data.data.items;
    });
  },
  methods: {
    index() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.lingqu{
          display: inline-block;
          line-height: 22px;
          float: right;
          font-size: 12px !important;
          background-image: url("http://img.hena360.cn/giftbag_3.png");
          background-position: center;
          background-size: 100% 100%;
          color: #fff;
          padding: 0px 12px;
          margin-top: -2%;
          border-radius: 5px;
}
p {
  color: #000;
}
.index {
  position: fixed;
  bottom: 10%;
  right: 0px;
  z-index: 999;
  width: 11%;
}
.deton_list {
  padding: 0 10px;
  background-color: #000;
  margin-top: -3px;
  padding-top: 7px;
  .list {
    background-image: url("http://img.hena360.cn/giftbag_2.png");
    background-position: center;
    background-size: cover;
    color: #fff;
    width: 49%;
    margin-bottom: 7px;
    padding:13px;
    border-radius: 5px;
    img {
      width: 100%;
      vertical-align: middle;
    }
    div {
      padding: 10px 5px;
      .name {
        font-size: 14px !important;
        margin-top: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .many {
        padding-top: 10px;
        span:first-child {
          color: #8A6A3B;
          font-size: 14px !important;
         font-weight:600;
        }
      }
    }
  }
}
</style>
