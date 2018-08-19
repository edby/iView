<template>
  <div class="CommodityDetails" v-title="title">
    <div class="banner">
      <Carousel v-model="value1"
                :autoplay="setting.autoplay"
                :loop="setting.loop"
                :arrow="setting.arrow">
        <CarouselItem v-for="(item,index) in swiper" :key="index">
          <div class="demo-carousel">
            <a href="javascript:;" :id="item.id" style="display:block;">
              <img :src="item" alt="" width="100%" style="display:block; margin: 0;padding: 0;">
            </a>
            <img src="http://img.hena360.cn/goods_.png" alt="" class="qrCode" @click="qrCode">
          </div>
        </CarouselItem>
      </Carousel>
      <!-- v-if="goodsList.pre_sale == 1"  -->
      <div class="flash_sale" v-if="preStatus">
        <div class="sale_list">
          <div class="sale_price"><span>￥</span>{{goodsList.goods_price}}</div>
          <div class="prompt">
            <p class="sxq">
              <!--  -->
              <span v-if="goodsList.use_points == '0'">限时抢</span>
              <span v-if="goodsList.use_points != '0'">+{{goodsList.use_points}}盟豆</span>
            </p>
            <p>原价：{{goodsList.original_price}}</p>
          </div>
          <div class="time">
            <div>{{snapVal}}<i v-if="day != 0"> {{day}} 天</i></div>
            <p v-if="goodsList.pre_status != 3"> <span>{{hour}}</span> : <span>{{minute}}</span>: <span>{{second}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="goods_tit_dels">
      <div class="goods_title" v-html="goodsList.goods_name">{{goodsList.goods_name}}</div>
      <div class="collect">
        <div class="spans" @click.stop="attention">
          <img class="z_img" src="http://img.hena360.cn/collect_1.png" alt="" v-if="isAttent">
          <img class="z_img" src="http://img.hena360.cn/collect_0.png" alt="" v-else>
        </div>
      </div>
      <div class="goods_dels" v-html="goodsList.f_title">{{goodsList.f_title}}</div>
    </div>
    <!-- v-if="goodsList.pre_sale == 0" -->
    <div class="goods_price" v-if="!preStatus">
      <div class="price">
        <span>￥{{goodsList.goods_price}}</span>
        <span style="font-size: 13px;" v-if="goodsList.use_points != 0">+{{goodsList.use_points}}盟豆</span>
        <i>￥{{goodsList.original_price}}</i>
      </div>
    </div>
    <div class="take_cost" v-if="isTake" v-show="goodsList.attr.price != goodsList.original_price">
      <div class="takes">
        <span class="dls">￥</span>
        <span class="costs">{{goodsList.attr.price}}</span>
        <span class="icons"><img src="http://img.hena360.cn/vip_price.png" alt=""></span>
      </div>
    </div>
    <div class="stock">
      <div class="stock_stock">库存：{{goodsList.goods_num}}{{goodsList.goods_unit}}</div>
      <div class="stock_xl">销量：{{goodsList.sale_num}}</div>
      <div class="stock_delivery">快递：{{goodsList.express_fee}}</div>
    </div>
    <div class="expect" v-if="isExpect"><p><span>!</span>{{goodsList.send_time}}</p></div>
    <div class="hr"></div>
    <div class="select_specific" @click.stop="openSpec">
      <div class="title1">选择商品规格数量</div>
      <Icon type="ios-arrow-forward" size="20"/>
    </div>
    <div class="select_specific tbor activity" v-if="isPointsShow">
      <p class="title1">活动<span>盟豆</span>获得<i>{{goodsList.goods_points}}</i>盟豆</p>
    </div>
    <div class="select_specific tbor activity" v-if="isNattoShow">
      <div class="title1">活动<span>福利</span>获得<i>{{goodsList.attr.return_price}}</i>纳豆</div>
    </div>
    <div class="hr"></div>
    <!--Recommended Commodities 推荐商品-->
    <div class="rec_com">
      <div class="title1">推荐商品</div>
      <v-sweiper :vswiper="referrerList" @changeGoods="changeGoods"></v-sweiper>
    </div>
    <div class="details_img">
      <img src="http://img.hena360.cn/title.png" alt="">
    </div>
    <div class="goods_det_img">
      <div class="item_img goodsListDetailimgs" v-html="goodsList.detailimgs"></div>
    </div>
    <div class="btn">
      <div class="btn_group">
        <div class="homes" @click.stop="homes">
          <img src="../../../common/images/s_11.png" alt="">
          首页
        </div>
        <Button type="default" long @click.stop="BuyNow" :class="{'dis': isDis}">{{btnVal}}</Button>
      </div>
    </div>
    <div class="getGoodsSpec" @click.stop="closeSpec" v-show="isSpecShow">
      <div class="getGoodsSpec_content">
        <div class="getGoodsSpec_cont">
          <get-goods-spec
            @changeSpec="changeSpec"
            :SpecLists="SpecLists"
            :Specification="Specification"
            :amount="amount"
            @countNum="countNum"
            :goodsList="goodsList"
            :isChecked="isChecked"
          >
          </get-goods-spec>
          <div class="repertory" @click.stop>
            <div class="title1">库存:{{stock}}{{goodsList.goods_unit}}</div>
            <div class="group-form">
              <div class="minus" @click.stop="countNum('minus')">
                <Icon type="md-remove"/>
              </div>
              <div class="input-num">
                <input type="number" v-model="amount">
              </div>
              <div class="add" @click.stop="countNum('add')">
                <Icon type="md-add"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="qrCodeurl" v-show="isShow" @click="isqrCodeurl">
      <img :src="qrCodeurl" alt="">
    </div>
    <totals :msg="msg" :isShowTotals="isShowTotals" @isCloseTotals="isCloseTotals"></totals>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/VHeader/VHeader'
  import GetGoodsSpec from 'base/getGoodsSpec/getGoodsSpec'
  import * as config from 'common/js/config'
  import VSweiper from 'base/sweiper/sweiper'
  import {patch} from 'common/js/dom'
  import {getLogin} from "common/js/isLogin";
  import {mapGetters, mapMutations} from 'vuex'
  import wx from 'weixin-js-sdk'

  export default {
    name: "CommodityDetails",
    data() {
      return {
        title: '商品详情',
        value1: 0,
        day: '', // 天
        hour: '',// 时
        minute: '',// 分
        second: '',// 秒
        swiper: [],
        goodsList: [],
        referrerList: [],
        setting: {
          autoplay: false,
          loop: true,
          arrow: 'always'
        },
        id: null,
        acttype: null,
        SpecLists: [],
        msg: 'fdfdgdgdfgdfh',
        isShowTotals: false,
        specId: [],
        isSpecShow: false,
        Specification: [],
        amount: 1,
        isAttent: false,
        timer: null,
        isChecked: false,
        // 库存
        stock: 0,
        qrCodeurl: '',
        isShow: false,
        wxlink: '',
        wxgoods_name: '',
        wxf_title: '',
        wxgoods_detail_img: '',
        isDis: false,
        isBindingP: false,
      }
    },
    created() {
      getLogin(this);
      this.getGoodsBanner();
      this.getGoodsLists();
      this.id = this.$route.query.id
      this.acttype = this.$route.query.acttype
      this.count()
      this.isBinding();


    },
    computed: {
      btnVal(){
        if (this.goodsList.length == 0) {
          return '立即购买'
        }
        if (this.goodsList.acttype == 1) {
          return '立即开通领取'
        }else if (this.goodsList.acttype == 2) {
          return '立即领取'
        }else {
          return '立即购买'
        }
      },
      isTake() {
        return this.goodsList.attr != null && this.goodsList.acttype == 4
      },
      isExpect() {
        return this.goodsList.send_time != '' && this.goodsList.send_time != null
      },
      preStatus() {
        // 预售
        return this.goodsList.pre_sale === 1
        // return true
      },
      isPointsShow() { // 活动盟豆
        return this.goodsList.goods_points != 0;   //  盟豆
      },
      isNattoShow() { // 活动纳豆
        return this.goodsList.acttype == 2 && this.goodsList.attr.return_price != 0   //  纳豆
      },
      snapVal() {
        //pre_status: 预售状态(1.未开始, 2.正在进行, 3.已结束)

        if (this.goodsList.pre_status == 1) {
          return '距离开抢'
        } else if (this.goodsList.pre_status == 2) {
          return '距离结束'
        } else {
          return '活动已结束'
        }
      },
      ...mapGetters([
        'mid',
        'isLogin',
        'loginUrl'
      ])
    },
    watch: {
      id() {
        this.getGoodsBanner();
        this.getGoodsLists();
        this.getSpecList();
        this.count()
      },
      Specification(val) {
        if (val.length === 0) {
          this.isChecked = false
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        //生成二维码海报
        let url = encodeURIComponent(window.location.href)
        // this.$axios.get('goods/goods/goods-qrcode?gid=' + this.$route.query.id + '&url=http://'+window.location.host+'/CommodityDetails?id=' + this.$route.query.id)
        this.$axios.get('goods/goods/goods-qrcode?gid=' + this.$route.query.id + '&url=' + url)
          .then(res => {
          })
        //微信分享
        this.$axios.get('/user/index/wx-share-info?url=' + window.location.href)
          .then(res => {

            this.wxlink = window.location.href + '&mid=' + res.data.data.mid

            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.signature,// 必填，签名，见附录1
              jsApiList: [
                'onMenuShareAppMessage', 'onMenuShareTimeline',
                'onMenuShareQQ', 'onMenuShareQZone',
              ],
            });
            wx.ready(() => {
              wx.onMenuShareTimeline({
                title: this.wxgoods_name,
                link: this.wxlink,
                desc: this.wxf_title,
                imgUrl: this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享到朋友圈');
                }
              });
              wx.onMenuShareAppMessage({
                title: this.wxgoods_name,
                link: this.wxlink,
                desc: this.wxf_title,
                imgUrl: this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享给朋友');
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareQQ({
                title: '' + this.wxgoods_name,
                link: this.wxlink,
                desc: '' + this.wxf_title,
                imgUrl: '' + this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享给朋友');
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareQZone({
                title: '' + this.wxgoods_name,
                link: this.wxlink,
                desc: '' + this.wxf_title,
                imgUrl: '' + this.wxgoods_detail_img,
                success: function () {
                  if (res.data.data.mid == null) {
                    alert("未登录，分享无效");
                  } else {
                    alert("分享成功");
                  }
                },
                cancel: function () {
                  alert('你没有分享到朋友圈');
                  // 用户取消分享后执行的回调函数
                }
              });

            })
          })
//
        // 推荐人绑定关系
        this.$axios.get('common/set-inv-id?mid=' + this.$route.query.mid)
          .then(res => {
            console.log(res)
          })

      })
    },
    methods: {
      qrCode() {
        this.$axios.get('goods/goods/goods-poster-qrcode?gid=' + this.$route.query.id)
          .then(res => {
            if (res.data.code == 2000) {
              this.qrCodeurl = res.data.data.url
              this.isShow = !this.isShow
            }
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
            }
            if (res.data.code == 1000) {
              layer.msg("尚未登录")
            }
          })
      },
      isqrCodeurl() {
        this.isShow = !this.isShow
      },
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL',
      }),
      homes() {
        this.$router.replace({
          path: '/'
        })
      },
      attention() {
        if (this.isLogin == 1000) {
          layer.msg('请登录');
          this.$router.push({
            path: '/login?callBack=' + encodeURIComponent(window.location.href)
          });
          return
        }
        this.$axios.get('/user/collection/collection-goods', {
          params: {
            id: this.id,
            mid: this.mid
          }
        }).then(res => {
          console.log(res)
          if (res.status == config.status) {
            if (res.data.code == config.code) {
              layer.msg(res.data.message);
              this.getGoodsBanner()
            } else if (res.data.code == 2001) {
              this.isAttent = true
              layer.msg(res.data.message);
              this.getGoodsBanner()
            } else if (res.data.code == 2009) {
              this.isAttent = false;
              layer.msg(res.data.message);
              this.getGoodsBanner()
            } else if (res.data.code == 3000) {
              layer.msg(res.data.message);
              this.getGoodsBanner()
            }
          }
        })
      },
      countNum(nature) {
        if (nature === 'minus') {
          if (this.amount <= 1) {
            return
          }
          this.amount -= 1
        }
        if (nature === 'add') {
          if (this.amount >= Number(this.goodsList.goods_num)) {
            return
          }
          this.amount += 1
        }
      },
      openSpec() {
        this.isSpecShow = true
      },
      isCloseTotals() {
        this.isShowTotals = false
      },
      getGoodsBanner() {
        this.$axios.get('/goods/goods/view?id=' + this.id).then((res) => {
          if (res.status == config.status) {
            if (res.data.code == config.code) {
              this.swiper = res.data.data.goods_detail_img
              this.goodsList = res.data.data;
              this.stock = res.data.data.goods_num;
              this.wxgoods_name = res.data.data.goods_name
              this.wxf_title = res.data.data.f_title
              this.wxgoods_detail_img = res.data.data.goods_detail_img[0]
              console.log(this.goodsList)
              this.checkCollection()
            }
          }
        })
      },
      ///user/collection/check-collection?id= + this.id
      checkCollection() {
        this.$axios.get('/user/collection/check-collection?id=' + this.id)
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              if (res.data.data.status == 1) {
                this.isAttent = true
              }
            }
          })
      },
      getSpecList() {
        this.$axios.get('goods/goods/get-goods-spec?id=' + this.id).then(res => {
          if (res.status == config.status) {
            if (res.data.code == config.code) {
              this.SpecLists = res.data.data
            }
          }
        })
      },
      closeSpec() {
        this.isSpecShow = false
      },
      getGoodsLists() {
        this.$axios.get('/home/index/goods-type?goods_type=1').then((res) => {
          if (res.status == config.status) {
            if (res.data.code == config.code) {
              this.referrerList = res.data.data
            }
          }
        })
      },
      CountDownTime() {
        let orign_time = 0, leftTime = 0;
        let dataTiem = new Date().getTime() / 1000;  // 当前时间
        if (this.goodsList.pre_sale == 1) {
          if (this.goodsList.pre_status == 1) {
            //pre_sale_start
            // let s = this.goodsList.pre_sale_start;
            let e = this.goodsList.pre_sale_start;
            orign_time = new Date(e.replace(/-/g, '/')).getTime() / 1000;// 预售开启时间
            leftTime = dataTiem;// 当前时间
          } else if (this.goodsList.pre_status == 2) {
            let e = this.goodsList.pre_sale_end
            orign_time = new Date(e.replace(/-/g, '/')).getTime() / 1000;// 距离预售结束时间
            leftTime = dataTiem;// 当前时间
          } else if (this.goodsList.pre_status == 3) {
            orign_time = 0;// 距离预售开始时间
            leftTime = 0;// 距离预售结束时间
            this.isDis = true
          }
          // console.log(orign_time - leftTime)
          let maxTime = orign_time - leftTime;
          if (maxTime >= 0) {
            let days = parseInt(maxTime / 60 / 60 / 24, 10); //计算剩余的天数
            let hours = parseInt(maxTime / 60 / 60 % 24, 10); //计算剩余的小时
            let minutes = parseInt(maxTime / 60 % 60, 10); //计算剩余的分钟
            let seconds = parseInt(maxTime % 60, 10); //计算剩余的秒数

            this.day = days;
            this.hour = patch(hours);
            this.minute = patch(minutes);
            this.second = patch(seconds);
            --maxTime
          } else {
            clearInterval(this.timer);
          }
        } else {
          this.isDis = false
        }
      },
      count() {
        this.timer = setInterval(this.CountDownTime, 1000);
      },
      changeGoods(item) {
        this.id = item.id;
        this.$router.push({
          name: 'CommodityDetails',
          query: {
            id: item.id,
            acttype: item.acttype
          }
        });
        this.Specification = []
      },
      changeSpec(specId) {
        this.Specification = specId;
        let cid = this.Specification;
        if (this.Specification.length !== this.SpecLists.length) {
          return
        }
        this.specId = cid;
        this.getPriceAndNum(cid.join(','))
      },
      isBinding() {
        this.$axios.get('/user/index/is-bind-tel')
          .then(res => {
            if (res.data.code == 2000) {
              this.isBindingP = true
            }
            if (res.data.code == 3000) {
              this.isBindingP = false
            }
          })
      },
      BuyNow() {
        if (this.isDis) {
          layer.msg('活动已结束');
          return
        }
        if (this.isLogin == 1000) {
          layer.msg('请登录');
          this.$router.push({
            path: '/login?callBack=' + encodeURIComponent(window.location.href)
          });
          return
        }
        // 是否绑定手机号
        if (!this.isBindingP) {
          layer.msg('请绑定手机号');
          this.$router.push({
            path: '/bindTel?callBack=' + window.location.href
          });
          return
        }
        if (this.SpecLists.length > 0) {
          if (this.specId === null) {
            this.isSpecShow = true;
            return
          }
          if (this.specId.length !== this.SpecLists.length) {
            if (!this.isSpecShow) {
              this.isSpecShow = true
              return
            }
            layer.msg('请选择规格！');
            return
          }
        }
        // console.log(this.SpecLists.length)
        if (this.SpecLists.length !== 0) {
          if (this.Specification.length === 0) {
            this.specId = '';
            layer.msg('请选择规格！');
            return
          }
        }

        this.$router.push({
          name: 'order',
          query: {
            specId: this.specId.join(','),
            num: this.amount,
            goods_id: this.goodsList.id
          },
        })
      },
      getPriceAndNum(specId) {
        this.$axios.get('goods/goods/get-price-and-num', {
          params: {
            specId: specId,
            id: this.id,
            mid: this.mid,
            num: this.amount
          }
        }).then(res => {
          console.log(res)
          if (res.data.code == 2000) {
            this.stock = res.data.data.number
          } else if (res.data.code == 3000) {
            this.getSpecList();
            layer.msg(res.data.message);
            this.Specification = []
          }
        })
      }
    },
    components: {
      VHeader,
      VSweiper,
      GetGoodsSpec
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .take_cost {
    padding: 1px 10px 8px;
    .takes {
      display: block;
      overflow: hidden;
      span {
        display: inline-block;
        font-weight: bold;
        line-height: 36px;
        vertical-align: middle;
      }
      .dls {
        font-size: 16px;
        vertical-align: sub;
        margin-right: -6px;
      }
      .costs {
        font-size: 26px;
      }
      .icons {
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        img{

          width: auto;
          height: 100%;
        }
      }
    }
  }

  .demo-carousel {
    position: relative;
  }

  .ivu-carousel-arrow-always {
    display: none !important;
  }

  .qrCode {
    position: absolute;
    top: 2%;
    right: 2%;
    z-index: 999;
    width: 10%;
    cursor: pointer;
  }

  .qrCodeurl {
    position: fixed;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 0 5%;
    z-index: 999;
    vertical-align: middle;
    cursor: pointer;
    img {
      display: inline-block;
      width: 100%;
      vertical-align: middle;
      margin-top: 27%;
    }
  }

  .CommodityDetails {
    padding-bottom: 50px;
    overflow-x: hidden;
  }

  .getGoodsSpec_content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .repertory {
    position: relative;
    overflow: hidden;
    width: 100%;
    .title1 {
      padding: 5px 0;
      font-size: 15px;
      line-height: 30px;
    }
    .group-form {
      width: 100%;
      overflow: hidden;
      .minus, .input-num, .add {
        display: inline-block;
        float: left;
        height: 32px;
        line-height: 28px;
      }
      .minus, .add {
        width: 33px;
        border: 1px solid #ccc;
        text-align: center;
        border-radius: 0px;
      }
      .input-num {
        width: 60px;
        border-radius: 0px;
        input {
          text-align: center;
          width: 100%;
          height: 32px;
          border: 1px solid #ccc;
          border-left: none;
          border-right: none;
          padding: 0;
          border-radius: 0px;
        }
      }

    }
  }

  .dis.ivu-btn {
    background: #999;
  }

  .getGoodsSpec {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 50px;
    background-color: rgba(0, 0, 0, .6);
    z-index: 10010;
  }

  .getGoodsSpec_cont {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    max-height: 80%;
    overflow: hidden;
    overflow-y: auto;
    background-color: #fff;
    padding: 10px;
  }

  .ivu-carousel-arrow-always {
    display: none;
  }

  .goods_tit_dels {
    padding: 10px 10px 5px;
    position: relative;
    .goods_title {
      font-size: 16px;
      font-weight: normal;
      color: #333;
      line-height: 24px;
      margin-bottom: 10px;
      width: 85%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .collect {
      position: absolute;
      right: -12px;
      top: 9px;
      padding-right: 30px;
      .spans {
        display: inline-block;
        padding: 3px;
      }
      .z_img {
        width: 34px;
      }
    }
    .goods_dels {
      font-size: 13px;
      color: #7e8c8d;
      line-height: 20px;
    }
  }

  .goods_price {
    padding: 10px;
    overflow: hidden;
    .price {
      float: left;
      color: #a146ff;
      font-size: 18px;
      i {
        font-style: normal;
        font-size: 12px;
        text-decoration: line-through;
        color: #ddd;
        margin-left: 15px;
      }
    }
  }

  .expect {
    width: 100%;
    padding: 0 10px;
    p {
      padding: 10px 0;
      font-size: 12px;
      color: rgba(224, 193, 122, 1);
      border-top: 1px solid #eee;
      line-height: 18px;
      span {
        display: inline-block;
        width: 14px;
        height: 14px;
        line-height: 14px;
        font-size: 10px;
        text-align: center;
        border: 1px solid rgba(224, 193, 122, 1);
        border-radius: 50%;
        margin-right: 2px;
      }
    }
  }

  .stock {
    width: 100%;
    padding: 3px 12px 15px;
    overflow: hidden;
    font-size: 14px;
    margin-top: 2px;
    div {
      float: left;
      width: 33.333%;
      text-align: left;
    }
    .stock_xl {
      text-align: center;
    }
    .stock_delivery {
      float: right;
      text-align: right;
    }
  }

  .select_specific {
    padding: 0 18px;
    overflow: hidden;
    display: flex;
    align-items: center;
    .title1 {
      float: left;
      flex: 1;
      padding: 14px 0;
      vertical-align: middle;
    }
    .ivu-icon {
      float: right !important;
      margin-top: 4px;
      flex: 0 0 auto;
    }
  }

  .tbor {
    border-top: 1px solid #eee;
  }

  .activity {
    color: #333;
    .title1 {
      font-size: 14px;
      font-weight: normal;
    }
    span {
      display: inline-block;
      padding: 1px 2px;
      border: 1px solid rgba(224, 193, 122, 1);
      margin: 0 3px;
      border-radius: 2px;
      color: rgba(224, 193, 122, 1);
    }
    i {
      font-style: normal;
      font-weight: bold;
      color: rgba(224, 193, 122, 1);
      padding: 0 3px;
      font-size: 15px;
    }
  }

  .rec_com {
    width: 100%;
    padding-top: 10px;
    .title1 {
      font-size: 15px;
      border-left: 3px solid #c1a368;
      padding: 5px 0 5px 10px;
    }
  }

  .details_img {
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
  }

  .goods_det_img {
    width: 100%;
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    img {
      display: block;
      width: 100%;
    }
    .item_img {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
      p {
        width: 100%;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }

  .btn {
    position: fixed;
    height: 50px;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99999;
    .btn_group {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .homes {
        flex: 0 0 auto;
        width: 50px;
        height: 50px;
        line-height: 25px;
        text-align: center;
        background-color: #fff;
        font-size: 13px;
        img {
          width: 20px;
          display: block;
          margin: 6px auto 0;
        }
      }
    }
  }

  .ivu-btn {
    flex: 1;
    height: 50px;
    background: linear-gradient(to right, #9939f2, #a146ff);;
    color: white;
    font-size: 15px;
    border-radius: 0;
    border: none;
    margin: 0;
  }

  .flash_sale {
    padding: 5px;
    width: 100%;
    background: url("../../../common/images/count_bg.png") no-repeat left top;
    background-size: cover;
    color: rgba(224, 193, 122, 1);
    .sale_list {
      width: 100%;
      display: flex;
      align-items: center;
      .sale_price {
        font-size: 30px;
        font-weight: bold;
        flex: 0 0 auto;
        color: rgba(224, 193, 122, 1);
        padding-right: 10px;
        span {
          font-size: 12px;
          font-weight: normal;
        }
      }
      .prompt {
        flex: 0 0 auto;
        font-size: 12px;
        padding: 6px 0;
        p {
          font-weight: normal;
          line-height: 1.4;
          color: #acacac;
        }
        .sxq {
          color: rgba(224, 193, 122, 1);
        }
      }
      .time {
        flex: 1;
        text-align: right;
        font-size: 12px;
        line-height: 24px;
        i{
          font-style: normal;
        }
        p {
          display: inline-block;
          margin-bottom: 0;
        }
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          background-color: rgba(224, 193, 122, 1);
          color: #000;
          font-size: 12px;
          text-align: center;
          border-radius: 4px;
        }
      }
    }
  }

  .ivu-carousel-dots-inside {
    display: none;
  }
</style>
