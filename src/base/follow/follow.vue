<template>
    <div>
      <div
        class="follow"
        v-if="isfocus==0"
      ><span>关注公众号，实时接收消息提醒，发现更多精彩</span><img src="http://img.hena360.cn/_pic19.png"
                                                                 alt=""
                                                                 @click="follow"

      ></div>
      <div class="followMask" v-show="isfollowMask">
        <img src="http://img.hena360.cn/qr_code.jpg" alt="">
        <h3>长按上图【识别图中二维码】关注公众号</h3>
        <h4>无法识别二维码</h4>
        <div>
          <p>1、打开微信，点击“添加朋友”</p>
          <p>2、点击“公众号”</p>
          <p>3、搜索公众号：合纳共享</p>
          <p>4、点击“关注”，完成</p>
          <img src="http://img.hena360.cn/_pic20.png" alt=""  @click="follow">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "follow",
      data(){
          return{
            isfollowMask:false,
            isfocus:1,
          }
      },
      mounted(){
          this.isfollew()
      },
      methods:{
        follow(){
          this.isfollowMask = !this.isfollowMask
        },
        isfollew(){
            this.$axios.get('/user/index/is-focus')
              .then(res=>{
                this.isfocus = res.data.data
              })
        }
      }
    }
</script>

<style scoped lang="less">
  .follow {
    position: fixed;
    bottom: 55px;
    left: 0;
    width: 100%;
    background: rgba(0,0,0,.5);
    color: #ffffff;
    z-index: 999;
    line-height: 40px;
    padding: 0 15px;
    font-size: 12px;
    display: inline-block;
  img {
    width: 16%;
    vertical-align: middle;
    display: inline-block;
    float: right;
    margin-top: 2.7%;
  }
  }
  .followMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: #000000;
    padding: 10%;
    color: #ffffff;
  img {
    width: 65%;
    margin: 0 auto;
    display: block;
  }
  h3 {

    font-size: 1rem;
    text-align: center;
    line-height: 400%;
    border-bottom: 1px solid #666666;
  }
  h4 {
    line-height: 300%;
    text-align: center;
    font-size: 1rem;
  }
  div{
    width: 80%;
    margin: 0 auto;
  p {
    line-height: 150%;
    font-size: .8rem;
    color: #ffffff;
  }
  img {
    width: 15%;
    margin-top: 10%;
  }
  }
  }
</style>
