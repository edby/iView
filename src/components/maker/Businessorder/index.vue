<template>
  <div v-title="title">
    <!-- <Business></Business> -->
    <ally :dataList="nav"></ally>
    <img :src="imgs" class="img_one" v-show="shows" />
    <div class="ToBeConfirmed" v-for="(v,k) in items" :key="k" v-show="showss">
      <Row>
        <Col span="8">收益类别：</Col>
        <Col span="16">{{v.title}}</Col>
      </Row>
      <Row>
        <Col span="8">订单编号：</Col>
        <Col span="16">{{v.order_sn}}</Col>
      </Row>
      <Row>
        <Col span="8">下单时间：</Col>
        <Col span="16">{{v.order_time}}</Col>
      </Row>
      <Row>
        <Col span="8">下单人昵称：</Col>
        <Col span="16">{{v.order_user_nickname}}</Col>
      </Row>
      <Row>
        <Col span="8">订单金额：</Col>
        <Col span="16">{{v.order_total_price}}</Col>
      </Row>
      <Row>
        <Col span="8">状态：</Col>
        <Col span="16">{{v.status_text}}</Col>
      </Row>
      <Row>
        <Col span="24" style="text-align: right">奖金：
        <span style="color: #C1A368;font-size: 16px">{{v.money}}</span>
        </Col>
      </Row>
    </div>
  </div>

</template>

<script>
import Business from "../../../base/user/Business";
import ally from "../../../base/user/ally";

export default {
  name: "index",
  components: {
    ally,
    Business
  },
  data() {
    return {
      title: "业务订单",
      items: [],
      nav: [
        { url: "Businessorder", title: "已结算" },
        { url: "ToBeConfirmed", title: "待确认" }
      ],
      shows: false,
      imgs: "",
      showss: true
    };
  },
  created() {
    this.$axios.get("/guest/bonus/detail").then(res => {
      //console.log(res)

      if (res.data.data.items.length == 0) {
        this.shows = true;
        this.imgs = "http://img.hena360.cn/no_data_img.png";
      } else {
        this.shows = false;
        this.showss = true;
        this.items = res.data.data.items;
      }
    });
  }
};
</script>

<style scoped lang="less">
.ToBeConfirmed {
  line-height: 200%;
  padding: 10px 30px;
  border-bottom: 10px solid #f2f2f2;
  font-size: 14px !important;
}
.img_one {
  width: 20%;
  margin: 40%;
}
</style>
