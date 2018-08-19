<template>
     <div class="detonation">  <!-- 爆品库 -->
         <router-link :to="{name:'index'}">
         <img src="http://img.hena360.cn/gohome.png" alt="" class="index">
          </router-link>
        <img src="http://img.hena360.cn/baopinku.jpg" alt="">
       <Row type="flex" justify="space-between"  class="deton_list">
        <!-- 进行详情页面的跳转   -->
            <Col span="12" class="list"  v-for="(detons ,k ) in deton " :key="k"  v-lazy="detons.goods_logo">
             <router-link :to="{name:'CommodityDetails',query:{id:detons.id}}">
                <img :src="detons.goods_logo" alt="">
                 <div>
                      <p class="name">{{detons.goods_name}}</p>
                      <p class="many"><span>¥{{detons.goods_price}}</span> </p>
                  </div>
             </router-link>
             </Col>
         
        </Row>
        
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "detonation",
  data() {
    return {
      deton: []
    };
  },
  created() {
    this.$axios.get("/goods/goods/index?acttype=4").then(res => {
      //console.log(res);
      this.deton = res.data.data.items;
    });
    this.$wxSDK._wxSDk(this)
  },
  methods: {
    index() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
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
  padding-top: 10px;
  .list {
    background-color: #fff;
    color: #fff;
    width: 49%;
    margin-bottom: 7px;
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
          color: #8f47ff;
          font-size: 14px !important;
        }
      }
    }
  }
}
</style>
