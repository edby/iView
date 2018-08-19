<template>
    <div class="libraries">
      <router-link :to="{name:'index'}">
         <img src="http://img.hena360.cn/gohome.png" alt="" class="index">
          </router-link>
      <div class="body">
        <div class="goods">
           <Row  class="librar_list" v-for="(boon,k) in boons " :key="k" v-if="boon.goods_price == '0.00'" v-show="sho" v-lazy="boon.goods_logo">
            <router-link :to="{name:'CommodityDetails',query:{id:boon.id}}">
             <Col span="8" class="list_img">
                <img :src="boon.goods_logo" alt="">
                 <img v-if="boon.pre_status == '3'" src="http://img.hena360.cn/overdue.png" alt="" class="overdue">
             </Col>
            <Col span="16" class="list_goods">
                <p class="list_name">{{boon.goods_name}}</p>
                <p class="list_time"><span>{{boon.pre_sale_start_date}}-{{boon.pre_sale_end_date}}</span><span>限时领取</span></p>
                <p><span>¥{{boon.goods_price}}</span>
                  <span v-if="boon.pre_status == '1'||boon.pre_status == '2' "class="lingqu">领取</span>
                  <span v-if="boon.pre_status == '3'" class="end">结束</span>
                  </p>
             </Col>
            </router-link>
         </Row>
        </div>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">

 import boon from "base/boon/boon";
export default {
  name: "libraries",
 components: {
    boon
  },
  data() {
    return {
        boons:[],
        sho: true,
        hide: false,
         isactiveIndex:'',
       swiperOption: {
        loop: false,
        grabCursor: true,
        autoplay: false,
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          slideChangeTransitionEnd: () => {
            this.isactiveIndex = this.$refs.mySwiper.swiper.activeIndex
            this.isshow(this.isactiveIndex)
          }
        }
      },
    };
  },
  created() {
    this.$axios.get("/goods/goods/index?acttype=2").then(res => {
      console.log(res);
      this.boons = res.data.data.items;
    });
  },
  methods: {
    index() {
      this.$router.push({ name: "index" });
      
    },
     isshow(isactiveIndex){
       console.log(isactiveIndex)
        if(isactiveIndex=='0'){
        this.$router.push({
                 name: 'balrog'
               })
        }
          if(isactiveIndex=='1'){
        this.$router.push({
                 name: 'libraries'
               })
        }
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.goods .librar_list .list_img .overdue{ //结束图片
width:93px;
height:93px;

   position: absolute;
    top:10%;
   left:12%;
   z-index:999;
   border:none;
}

.boon_title a {
  div {
    float: left !important;
  }
}
.libraries{
 
  position: relative;
  z-index: 999;
  margin-top:-52px;
}
.body {
  position: relative;

}

.biaoqian {
  width: 40%;
  margin: 0 auto;
  span:first-child {
    display: inline-block;
    width: 40%;
    background-color: #fff;
    height: 3px;
    margin-right: 5px;
  }
  span:last-child {
    height: 3px;
    display: inline-block;
    width: 40%;
    background-color: #000;
  }
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
.goods {
  padding: 0 12px;
  margin-top: 0%;
  .librar_list {
    padding: 15px 10px 15px 0px;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;

    .list_img {
      img {
        position: relative;
        border: 1px solid #f5f5f5;
        width:115px;
        height:115px;
      }
    }
    .list_goods {
      padding-left: 15px;
     
      .list_name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px !important;
        padding-top:7px;
      }
      .list_time {
        display: inline-block;

        border-radius: 10px;
        height:22px;
        margin:14px 0px;
      
        span:first-child {
          color: #ff8618;
          font-size: 10px !important;
          padding: 5px 12px;
          border: 1px solid #ff8618;
          border-radius: 15px 0 0 15px;
        }
        span:last-child {
          color: #fff;
          background-color: #ff8618;
          font-size: 10px !important;
          border-radius: 0px 15px 15px 0;
          padding: 6px 15px;
        }
      }
      p:last-child {
         height:45px;
         line-height: 45px;
        span:first-child {
          color: #ff8618;
          font-size: 20px !important;
        }
        .lingqu {
          line-height: 30px;
          height:30px;
          float: right;
          font-size: 12px !important;
          // background-color: #a148ff;
          background-image: -webkit-linear-gradient(0deg, #a148ff, #ad6cfb);
          color: #fff;
          padding: 0px 18px;
          margin-top: 15px;
          border-radius: 3px;
        }
        .end{
          background-color:#666;
          color:#fff;
           line-height: 30px;
           height:30px;
          float: right;
          font-size: 12px !important;
          background-color: #666;

          color: #fff;
          padding: 0px 18px;
          margin-top: 6%;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
