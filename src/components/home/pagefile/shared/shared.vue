<template>
     <div class="shared"> <!--共享库 -->
          <router-link :to="{name:'index'}">
         <img src="http://img.hena360.cn/gohome.png" alt="" class="index">
          </router-link>
        <img src="http://img.hena360.cn/gongxiangku.jpg" alt="">
       <Row type="flex" justify="space-between"  class="shared_list">
           <!-- 跳转对应的详情页 -->
            <!-- <router-link v-for="(shareds ,k ) in share " :key="k" :to="{name:'helpcont',query:{id:shareds.id}}"> -->
           
        <Col span="12" class="list"  v-for="(shareds ,k ) in share " :key="k" v-lazy="shareds.goods_logo" >
        <router-link :to="{name:'CommodityDetails',query:{id:shareds.id}}" >
                <img :src="shareds.goods_logo" alt="">
                 <div>
                      <p class="name">{{shareds.goods_name}}</p>
                      <p class="many"><span>¥{{shareds.goods_price}}</span> </p>
                  </div>
         </router-link> 
        </Col>
       
    </Row>
        
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "shared",
  data() {
    return {
      share: []
    };
  },
  created() {
    this.$axios.get("/goods/goods/index?acttype=5").then(res => {
      //console.log(res);
      this.share = res.data.data.items;
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

.shared_list {
  padding: 0 10px;
  background-color: #000;
  margin-top: -3px;
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
