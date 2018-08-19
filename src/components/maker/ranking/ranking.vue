<template>
    <div v-title="title">
        <!--奖金排名 -->
        <div class="ranking">
            <div class="rank">
                <div v-for="(seconds,i) in second" :key="this">
                    <img :src="seconds.user.avatar" alt="">
                    <img src="http://img.hena360.cn/_pic22.png" alt="" class="tubiao">
                    <p>{{seconds.user.nickname}}</p>
                    <p class="many_fr">{{seconds.money}}</p>
                </div>
                <div class="middle" v-for="(firsts,s) in first" :key="this">
                    <img :src="firsts.user.avatar" alt="">
                    <img src="http://img.hena360.cn/_pic21.png" alt="" class="tubiao">
                    <p>{{firsts.user.nickname}}</p>
                    <p class="many_fr">{{firsts.money}}</p>
                </div>
                <div v-for="(thirds,v) in third" :key="this">
                    <img :src="thirds.user.avatar" alt="">
                    <img src="http://img.hena360.cn/_pic23.png" alt="" class="tubiao">
                    <p>{{thirds.user.nickname}}</p>
                    <p class="many_fr">{{thirds.money}}</p>
                </div>
            </div>
            <Row class="ranking_list" v-for="(lasts,k) in last" :key="k">
                <Col span="2" class="length">{{k+4}}</Col>
                <Col span="4" class="list_img">
                <img :src="lasts.user.avatar" alt="">
                </Col>
                <Col span="10" class="name">{{lasts.user.nickname}}</Col>
                <Col span="8" class="many">{{lasts.money}}</Col>

            </Row>
        </div>
    </div>

</template>
<script>
// import "vue-awesome-mui/mui/dist/css/mui.css";
export default {
  name: "ranking",
  data() {
    return {
      title: "收益排名",
      last: [],
      first: [], // 第一
      second: [], //第二
      third: [] //第三
    };
  },
  created() {
    this.$axios
      .get("/bonus/bonus/get-bonus-list") //获取信息
      .then(res => {
         console.log(res)
        this.last = res.data.data.slice(3, 10);
        this.first = res.data.data.slice(0, 1);
        this.second = res.data.data.slice(1, 2);
        this.third = res.data.data.slice(2, 3);
        // console.log(this.first)
      });
  },
  methods: {}
};
</script>
<style scoped lang="less">
.many_fr {
  margin-top: 10%;
  padding: 2px 0px !important;
  border: 1px solid #f9eed2;
  border-radius: 20px;
}
.ranking {
  .rank {
    width: 100%;
    height: 260px;
    background: url("http://img.hena360.cn/ranking.png") no-repeat center;
    background-size: 100% 100%;
    div:first-child {
      position: absolute;
      top: 10%;
      left: 8%;
      text-align: center;
      img:first-child {
        width: 75px;
        height: 75px;
        border-radius: 50%;
      }
      .tubiao {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 40%;
        bottom: 40%;
        z-index: 999;
      }
      p {
        padding-top: 20%;
        width: 85px;
        color: #000;
        font-weight: 600;
        font-size: 14px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .middle {
      position: absolute;
      top: 5%;
      left: 50%;
      margin-left: -12%;
      text-align: center;
      img {
        width: 95px;
        height: 95px;
        border-radius: 50%;
      }
      .tubiao {
        width: 25px;
        height: 25px;
        position: absolute;
        left: 40%;
        bottom: 36%;
        z-index: 999;
      }
      p {
        padding-top: 20%;
        width: 85px;
        color: #000;
        font-weight: 600;
        font-size: 14px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    div:last-child {
      position: absolute;
      top: 10%;
      right: 8%;
      text-align: center;
      img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
      }
      .tubiao {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 40%;
        bottom: 40%;
        z-index: 999;
      }
      p {
        width: 85px;
        padding-top: 20%;
        color: #000;
        font-weight: 600;
        font-size: 14px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .ranking_list {
    line-height: 75px;
    padding: 0px 24px 0px 16px;
    margin: 0px 10px;
    border-bottom: 1px solid #ccc;

    .length {
      color: #333;
      font-size: 15px !important;
      font-weight: 600;
    }
    .name {
      color: #666;
      font-size: 14px !important;
      text-align: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      padding-left: 5%;
    }
    .many {
      color: #333;
      font-size: 15px !important;
      font-weight: 600;
    }
    .list_img {
      img {
        width: 45px;
        height: 45px;
        vertical-align: middle;
        border-radius: 50%;
      }
    }
    div {
      text-align: center;
    }
  }
}
</style>
