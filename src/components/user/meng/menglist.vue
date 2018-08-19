<template>
  <div v-title="title">  <!--盟豆明细 -->
      
      <div class="meng" >  <!-- 头部 -->
         <img src="http://img.hena360.cn/Integralmall.png" alt="" >
         <p v-cloak>{{number}}盟豆</p>
      </div>
      <!-- 盟豆列表 -->
       <img :src="imgs" class="img_one"  v-show="shows" />
      <Row class="menglist" v-for="(v, k) in meng"  :key="k"  v-show="showss" >
          <Col span="20">
            <p v-cloak>{{v.type_title}}</p>
            <p v-cloak>{{ formatDateTime(v.created_at) }} </p>
          </Col>
           <Col span="4" v-cloak >
              <span v-if="v.add_points > 0 " class="jia">+{{ v.add_points }}</span>
              <span v-if="v.add_points < 0 ">{{ v.add_points }}</span>
          </Col>
      </Row>
  </div>
</template>
<script>
export default {
  name: "menglist",
  data() {
    return {
      title:"盟豆明细",
      meng: [],
      number: "",
      shows: false,
      imgs: "",
      showss: true
    };
  },
  created() {
    this.$axios
      .get("/points/index/detail") //盟豆列表的显示
      .then(res => {
        console.log(res)
        this.meng = res.data.data;
        if (res.data.data.length == 0) {
        this.shows = true;
        this.imgs = "http://img.hena360.cn/no_data_img.png";
      } else {
        this.shows = false;
        this.showss = true;
        this.meng = res.data.data;
      }
      });
    this.$axios
      .get("/points/index/view") //页面加载完成后总数展示
      .then(res => {
        //console.log(res);
        if(res.data.data == null ){
           this.number = 0 
        }else{
          this.number = res.data.data.points;
        }
        
      });
    
  },
  methods: {
    formatDateTime: function(timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.jia{
   color:#ffd05b;
}
[v-cloak] {
  display: none !important;
}
.meng {
  width: 100%;
  position: relative;
  p {
    position: absolute;
    bottom: 25%;
    padding-left: 6%;
    color: #000;
    font-size: 20px !important;
  }
}
.menglist {
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
  div:first-child {
    p:first-child {
      padding: 2px;
      color: #000;
      font-size:14px !important;
      font-weight:600;
    }
    p:last-child {
      padding-top: 5px;
      color: #a1a1a1;
      font-size: 14px !important;
      
    }
  }
  div:last-child {
    text-align: right;
    padding-right: 5px;
    padding-top: 3%;
    span{
      padding-top: 2%;
      padding-right: 2%;
      text-align: right;
      font-size: 24px !important;
      font-weight: 500 !important;
    }
  }
}
.img_one{
   width:25%;
   height:40%;
   position: relative;
   left:40%;
   margin-top:45%;
}
</style>

