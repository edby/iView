<template>
  <div v-title="title">
    <!--推广二维码-->
    <div class="genenr_img">
      <!-- 海报展示部分 -->
      <img :src="imgurl" alt="">
    </div>
    <div class="slide-box">
      <!--底部 -->
      <div class="slide-item" v-for="(v,k) in items" :key="k" @click="dia(k,v.id)" :id=v.id>
        <img :src="v.img_src" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "generalize",
  data() {
    return {
      title: "推广二维码",
      items: [], //二维码海报
      imgurl: "http://img.hena360.cn/inviation_bg1.png"
    };
  },

  created() {
    this.$axios
      .get("/user/collection/code") //二维码海报
      .then(res => {
        //console.log(res)
        this.items = res.data.data;
      });
  },
  methods: {
    dia(k, id) {
      //点击相应的图片生成相应的海报
      this.$axios
        .get("/user/qrcode/check-power") //校验用户生成二维码权限
        .then(res => {
          // console.log(res)
          if (res.data.data.flag == 0) {
            //用户没有权限
            alert("没有推广权限，请先购买520");
          } else {
            //用户有推广权限
            this.$axios
              .get("/user/qrcode/qrcode") //生成二维码
              .then(res => {
                //console.log(res)
              });
            this.$axios
              .get("/user/qrcode/build-poster?id=" + id) //合成代二维码的海报
              .then(res => {
                // console.log(res.data.data.url)
                this.imgurl = res.data.data.url;
              });
          }
        });
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.genenr_img {
  margin: 14% auto;
  margin-top: 13%;
  margin-bottom: 8%;
  width: 80%;
  text-align: center;
  img {
    width: 90%;
  }
}
.slide-box {
  padding-left: 5%;
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}

.slide-box::-webkit-scrollbar {
  display: none;
}

.slide-item {
  width: 100px;
  height: 101px;
  margin-right: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

