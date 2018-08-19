<template>
  <div v-title="title">
     <router-link :to="{name:'index'}">
         <img src="http://img.hena360.cn/gohome.png" alt="" class="index">
          </router-link>
    <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
        <router-link to="/user/order/orderlist" class="mui-control-item " replace>全部</router-link>
        <router-link to="/user/order/orderpending" class="mui-control-item" replace>待付款</router-link>
        <router-link to="/user/order/orderdelivergoods" class="mui-control-item" replace>待发货</router-link>
        <router-link to="/user/order/ordergoodstobereceived" class="mui-control-item" replace>待收货</router-link>
        <router-link to="/user/order/ordercompleted" class="mui-control-item mui-active" replace>已完成</router-link>
        <router-link to="/user/order/orderrefund" class="mui-control-item " replace>退款订单</router-link>
      </div>
    </div>
    <div>
      <img :src="imgs" class="img_one" v-show="shows" />
      <Row class="order_list" v-for="(v,k) in items" :key="k" :id="v.id" v-show="showss">
        <router-link :to="{name:'orderdatails',query:{id:v.id}}">
          <Col span="24" class="delivery_sn"> 订单编号{{v.order_sn}}
          </Col>
          <Col span="6">
          <img :src="v.orderGoods.goods_img" alt="" width="100%"></Col>
          <Col span="18">
          <h4>{{v.orderGoods.goods_name}}</h4>
          <p class="spec" v-if="v.orderGoods.spec.length">规格:{{v.orderGoods.spec}}</p>
          <p class="num">X {{v.num}}</p>
          </Col>
        </router-link>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: "ordercompleted",
  data() {
    return {
      items: [],
      title: "已完成",
      shows: false,
      imgs: "",
      showss: true
    };
  },
  created() {
    mui("body").on("tap", "a", function() {
      document.location.href = this.href;
    });
    this.$axios.get("/user/order/index?status=4").then(res => {
      // console.log(res)
      //this.items = res.data.data.items
      if (res.data.data.items.length == 0) {
        this.shows = true;
        this.imgs = "http://img.hena360.cn/no_data_img.png";
      } else {
        this.shows = false;
        this.showss = true;
        this.items = res.data.data.items;
      }
      // this.items.reverse();
    });
  },
  mounted() {
    setTimeout(() => {
      this.scroll();
    }, 20);
  },
  methods: {
    scroll() {
      mui(".mui-scroll-wrapper").scroll();
    },
    index() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
* {
  font-size: 14px;
}

.order_list {
  padding: 0 15px 7px;
  border-bottom: 10px solid #f5f5f5;

  a {
    color: #000000;
  }

  img {
    padding: 5px;
  }

  .ivu-col-span-18 {
    padding: 5px 10px;
  }

  .ivu-col-span-24:last-child {
    border-top: 1px solid #cccccc;
    padding-top: 2%;
  }

  .ivu-col-span-24 button {
    display: inline-block;
    float: right;
    border: none;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    background: #000;
    color: #fff;
    padding: 6px 11px;
  }

  .cancel {
    background: #fff !important;
    border: 1px solid #cccccc !important;
    color: #000000 !important;
    margin-right: 5%;
  }
}

.slide-box {
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}

.slide-box::-webkit-scrollbar {
  display: none;
}

.slide-item {
  width: 60px;
  height: 40px;
  line-height: 40px;
  margin-right: 30px;
  text-align: center;

  a {
    display: block;
  }
}

.delivery_sn {
  line-height: 40px;
  color: #000000;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 5px;
}

.num,
.spec {
  line-height: 28px;
}
.img_one {
  width: 25%;
  margin: 40%;
}
.index {
  position: fixed;
  bottom: 10%;
  right: 0px;
  z-index: 999;
  width: 11%;
}
</style>
