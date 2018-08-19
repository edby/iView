<template> 
 <div  v-title = "title">   <!--我的福利-->
 <img :src="imgs" class="img_one" v-show="shows"/>
    <div v-for="(wel,k) in list" :key="k" class="bod" v-show="showss">
      <Row  class="welfare_list"  >
        <Col span="6"  >
           <img  alt="" :src="wel.goods_log"> 
        </Col>
        <Col span="14" class="list_goods">
           <p>
              {{wel.goods_name}}
           </p>
           <p v-if="wel.status=='1'">
             收货时间:{{wel.receiving_at}}
           </p>
           <p v-if="wel.status=='2'">
             收货时间:{{wel.receiving_at}}
           </p>
           <p v-if="wel.status=='3'" v-show="show" >
             收货时间:{{wel.receiving_at}}
           </p>
           <p v-if="wel.status=='4'" v-show="show" >
             收货时间:{{wel.receiving_at}}
           </p>
        </Col>
       <Col v-if="wel.status=='1'" class="red">{{wel.status_text}}</Col>
       <Col v-if="wel.status=='2'" class="gren">{{wel.status_text}}</Col>
        <Col v-if="wel.status=='3'" class="da">{{wel.status_text}}</Col>
         <Col v-if="wel.status=='4'" class="shixio">{{wel.status_text}}</Col>
      </Row>
     <div class="welfare_bottom">
         <span v-if="wel.status=='1'">剩余{{wel.reday}}天</span>
         <span v-if="wel.status=='2'">剩余{{wel.reday}}天</span>
         <span v-if="wel.status=='3'" v-show="show">剩余{{wel.reday}}天</span>
         <span v-if="wel.status=='4'" v-show="show" >剩余{{wel.reday}}天</span>
         <span>获取纳豆{{wel.money}}个</span>
     </div>
    </div>
</div>
</template>
<script>
export default {
  name: "welfare",
  data() {
    return {
      title:"我的福利",
      list: [],
      show:false,
      shows: false,
      imgs: "",
      showss: true
    };
  },
  created() {
    this.$axios.get("/user/back-purchase/index").then(res => {
      //console.log(res)
       this.list = res.data.data.items;
      if(res.data.data.items.length == 0){
        this.shows = true;
        this.imgs = "http://img.hena360.cn/no_data_img.png";
      }else{
         this.shows = false;
        this.showss = true;
        this.collectlist = res.data.data.items;
      }
     
    });
  },
  methods: {}
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.img_one{
      width: 25%;
  margin: 40%;
  
}
.red {
  color: #ff8518;
}
.gren {
  color: #44df39;
}

.da{
  color:#9939f2;
}
.shixio{
  color:#999;
}
.bod {
  border-bottom: 15px solid #f2f2f2;
}
.welfare_list {
  border-bottom: 1px solid #f4f4f4;
  padding: 15px 10px;
  div:first-child {
  }
  .list_goods {
     padding-left:5%;
    p {
      line-height:20px;
      font-size: 13px !important;
      color: #929294;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  div:last-child {
    padding-left: 2%;
    line-height:88px;
  
  }
}
.welfare_bottom {
  height: 52px;
  line-height: 52px;

  span {
    float: right;
    padding-right: 10px;
  }
}
</style>

