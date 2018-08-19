<template>
  <div v-title="title">
     <img :src="imgs" class="img_one" v-show="shows"/>
    <Row v-for="(v,k) in items" :key="k" :id="v.id" class="addAddress" v-show="showss" >
      <div @click="returnOrder(v.id)">
        <Col span="6">{{v.realname}} <span @click.stop="checked(k,v.id)" :class="{isActive:v.status==status}"
                                           :status="v.status">默认</span></Col>
        <Col span="16"><h4>{{v.tel}}</h4>
          <p>{{v.pcaaddress}} {{v.detail}}</p></Col>
        <Col span="2"><img src="http://img.hena360.cn/bianji.png" alt="" @click.stop="edit(v.id)"></Col>
      </div>
    </Row>
    <Row class="send">
      <Button @click="send">新增地址</Button>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "addressList",
    data() {
      return {
        title: '地址列表',
        items: [],
        status: 1,
        specId:{},
        num:"",
        goods_id:"",
         shows: false,
      imgs: "",
      showss: true
      }
    },
    created() {
      this.specId = this.$route.query.specId
      this.num = this.$route.query.num
      this.goods_id = this.$route.query.goods_id
      this.$axios.get('/user/address/index')
        .then(res => {
          console.log(res)
         // this.items = res.data.data
           if(res.data.data == null){
              this.shows = true;
              this.imgs = "http://img.hena360.cn/no_data_img.png";
           }else{
                this.shows = false;
                this.showss = true;
                this.items = res.data.data;
           }

        })
    },
    methods: {
      checked(k, id) {
        this.$axios.get('user/address/default?id=' + id)
          .then(res => {
            layer.msg('地址设置成功！')
            this.$axios.get('/user/address/index')
              .then(res => {
                console.log(res)
                this.items = res.data.data

              })
          })
      },
      edit(id) {
        this.$router.push({name: 'editAddress', query: {editid:id,specId:this.specId,num:this.num,goods_id:this.goods_id}})
      },
      send() {
        this.$router.push({name: 'AddTheAddress',query:{specId:this.specId,num:this.num,goods_id:this.goods_id}})
      },
      returnOrder(id){
        // this.$router.push({name: 'order', query: {addres  s_id: id,specId:this.specId,num:this.num,goods_id:this.goods_id}})
         this.$router.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .addAddress {
    padding: 10px 15px;
    border-bottom: 1px solid #f2f2f2;
    .ivu-col-span-6 {
      text-align: center;
      span {
        padding: 5px 10px;
        border: 1px solid #CCCCCC;
        color: #CCCCCC;
        position: absolute;
        top: 140%;
        font-size: 12px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        width: 60%;
        left: 20%;
      }
    }
    .ivu-col-span-16 {
      line-height: 100%;
      h4 {
        font-size: 18px !important;
      }
      p {
        margin-top: 3%;
        color: #8f8f94;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .ivu-col-span-2 {
      img {
        width: 60%;
        margin-top: 44%;
      }
    }
  }

  .isActive {
    background: #000000;
    color: #ffffff;
  }

  .send {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    button {
      background: #000000;
      border: none;
      display: block;
      width: 100%;
      height: 50px;
      color: #ffffff;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
    }
  ;
  }
  .img_one{
      width: 25%;
  margin: 40%;
  
}
</style>
