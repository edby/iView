<template>
  <div v-title="title">
    <!--签到送盟豆-->
    <div class="paradise_top">
      <img src="http://img.hena360.cn/Integralmall.png" alt="">
      <Row class="number">
        <Col span="12">
        <span v-cloak>{{sum}}</span>盟豆
        </Col>
        <Col span="12">
        <router-link to="/user/meng/menglist">
          <span class="mingxi">盟豆明细</span>
        </router-link>
        </Col>
      </Row>
    </div>
    <div class="sign">
      <span class="first">||</span>
      <span class="last">||</span>
      <h3 v-cloak>连续签到{{pred}}天</h3>
      <Row type="flex" justify="space-between" class="para">
        <Col span="3" v-for="(day,k) in days" :key="k" v-cloak>
        <span>{{day.date}}</span>
        <span v-if="day.status == '1'" class="status">+{{day.add_points}}</span>
        <span v-if="day.status == '0'">未签到</span>
        </Col>
      </Row>
    </div>
    <div class="integralButton">
      <button class="calendarButtonOne" v-if=" state == '0'" @click="sign">立即签到</button>
      <button class="calendarButtonTow " v-else-if=" state == '1'">已签到</button>
      <!-- <p>连续签到几天可额外获得100盟豆</p> -->
    </div>
    <!-- 热卖商品 -->
    <div class="hot">

      <p class="top">
        <img src="http://img.hena360.cn/_rm.png" alt="">
        <span>热卖商品</span>
        <img src="http://img.hena360.cn/_rm.png" alt="">
      </p>
      <Row type="flex" justify="space-between" class="deton_list">
        <!-- 进行详情页面的跳转   -->
        <Col span="12" class="list" v-for="(hot,k) in hots" :key="k">
        <router-link :to="{name:'CommodityDetails',query:{id:hot.id}}">
          <img :src="hot.goods_logo" alt="">
          <div>
            <p class="name">{{hot.goods_name}}</p>
            <p class="many">
              <span>¥{{hot.goods_price}}</span>
            </p>
          </div>
        </router-link>
        </Col>

      </Row>

    </div>

  </div>
</template>
<script>
export default {
  name: "paradise",
  data() {
    return {
      title: "盟豆乐园",
      days: [],
      ponits: "未签到",
      inponits: "已签到",
      pred: "0", //连续签到天数
      sum: "0", //盟豆总数
      state: "", //今日签到状态
      click: {},
      hots: {}
    };
  },
  created() {
    this.change();
    this.view();
    this.$axios.get("/home/index/goods-type?goods_type=1").then(res => {
      //热卖商品
      // console.log(res)
      this.hots = res.data.data
    })
    this.$wxSDK._wxSDk(this)
  },
  methods: {
    change(){
      this.$axios.get("/points/index/change").then(res => {
        //本周签到
        // console.log(res)
        this.days = res.data.data
      })
    },
    view(){
      this.$axios.get("/points/index/view").then(res => {
        //验证签到状态
       // console.log(res)
         if(res.data.data == null){
             this.state = '0'
         }
         else{
         this.pred = res.data.data.days
        this.sum = res.data.data.points
        this.state = res.data.data.status
         }
        
      })
    },
    sign() {
      this.$axios.get("/points/index/click").then(res => {
        //点击签到
        // console.log(res)
        if (res.data.code == 2000) {
          this.change()
          this.view()
        }
        if (res.data.code == 3000) {
          layer.msg(res.data.message)
        }
      })
    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
[v-cloak] {
  display: none;
}
// 签到样式
.status {
  background-color: #edc50b;
  color: #fff;
  border-radius: 5px;
  padding: 2px 10px;
}
.paradise_top {
  //头部
  width: 100%;
  position: relative;
  .number {
    width: 100%;
    position: absolute;
    bottom: 24%;
    padding: 0 20px;
    div:first-child {
      text-align: left;
      color: #000;
      span {
        font-size: 26px !important;
      }
    }
    div:last-child {
      text-align: right;
      padding-top: 10px;
      a {
        padding-top: 10px;
        color: #000;
        font-size: 12px !important;
      }
    }
  }
}
.sign {
  //签到部分
  width: 90%;
  margin: 50px auto;
  position: relative;
  background: #ffffff;
  border-radius: 2px;
  -webkit-box-shadow: #e2e2e2 0px 0px 10px;
  -moz-box-shadow: #e2e2e2 0px 0px 10px;
  box-shadow: #e2e2e2 0px 0px 10px;
   .first {
    position: absolute;
    left: 8%;
    top: -7%;
    color: #d7d6d6;
  }
  .last {
    position: absolute;
    right: 8%;
    top: -7%;
    color: #d7d6d6;
  }

  h3 {
    border-bottom: 1px solid #f2f2f2;
    padding: 20px 10px;
    font-size: 20px !important;
    color: #000;
  }
  .para {
    padding: 10px;
    div {
      span:first-child {
        display: block;
        margin-bottom: 10px;
        font-size: 13px !important;
        text-align: center;
      }
      span:last-child {
        display: inline-block;
        font-size: 12px !important;
      }
    }
  }
}
.integralButton {
  text-align: center;
  margin-top: 30px;
  border-bottom: 10px solid #f5f5f5;
  padding-bottom: 30px;

  .calendarButtonOne {
    background: #edc50b;
    padding: 10px 35px;
    font-size: 16px;
    color: #ffffff;
    border-radius: 3px;
    border: none;
  }
  p {
    padding-top: 10px;
    padding-bottom: 30px;
    font-size: 12px !important;
  }
}
.calendarButtonTow {
  background: #cccccc;
  padding: 10px 35px;
  font-size: 16px;
  color: #ffffff;
  border-radius: 3px;
  border: none;
}
.mingxi {
  display: inline-block;
  position: absolute;
  padding: 10px;
  right: -12%;
  background-color: #f7b524;
  border-radius: 15px 0 0 15px;
}
.hot {
  text-align: center;
  .top {
    padding: 30px 0px;

    img {
      width: 8%;
      vertical-align: middle;
    }
  }
  .deton_list {
    padding: 0 15px;
    margin-top: -3px;
    padding-top: 10px;
    .list {
      background-color: #fff;
      color: #fff;
      width: 49%;
      margin-bottom: 10px;
      img {
        width: 100%;
        vertical-align: middle;
      }
      div {
        padding: 10px 5px;
        text-align: initial;
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
}

</style>

