import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 首页
const IndexPage = ()  => import('components/home/index')  // 首页
const Shared = ()  => import('components/home/pagefile/shared/shared')  // 首页-shared  共享库
const Detonation = () => import('components/home/pagefile/detonation/detonation') // 首页-detonation  爆品库
const Librarie = () => import('components/home/pagefile/libraries/librarie') // 首页-librarie 福利库 0元购
const Libraries = () => import('components/home/pagefile/libraries/libraries') // 首页-libraries 福利库 0元购
const balrog = () => import('components/home/pagefile/libraries/balrog') // 首页 福利库免费领取
// 发现
const FoundPage = () => import('components/found/FoundPage') // 发现公共路由
const Focus = () => import('components/found/focus/focus') // 发现关注路由
const Recommend = () => import('components/found/recommend/recommend') // 发现推荐路由
const CommodityDetails = () => import('components/found/CommodityDetails/CommodityDetails')  // 发现商品详情路由
const Personal = () => import('components/found/Personal/Personal')  // 发现个人中心路由
const Dynamic = () => import('components/found/dynamic/dynamic') // 发现动态路由
const Publish = () => import('components/found/publish/publish') // 发现发布动态路由
const SelectGoods = () => import('components/found/selectGoods/selectGoods') // 发现选择商品路由
const CofTres = () => import('components/found/selectGoods/childPage/CofTres') // 发现收藏的宝贝路由
const BtBaby = () => import('components/found/selectGoods/childPage/BtBaby') // 发现买到的宝贝路由
// 消息
const Message = () => import('components/message/message') // 消息首页路由
const Chitchat = () => import('components/message/public/chitchat') // 消息聊天路由
// 登录、
const Login = () => import('components/login/login') // 登录
const Binding = () => import('components/login/binding') // 绑定一键
const BindTel = () => import('components/login/bindTel') // 绑定手机号码
// 我的
const orderlist = () => import('components/user/order/orderlist') // 个人中心全部订单列表
const orderpending = () => import('components/user/order/orderpending') // 个人中心待付款订单
const ordercompleted = () => import('components/user/order/ordercompleted') // 个人中心已完成订单
const orderdelivergoods = () => import('components/user/order/orderdelivergoods') // 个人中心待发货订单
const ordergoodstobereceived = () => import('components/user/order/ordergoodstobereceived') // 个人中心待收货订单
const orderrefund = () => import('components/user/order/orderrefund') // 个人中心退款订单
const orderdatails = () => import('components/user/order/orderdatails') // 订单详情
const userindex = () => import('components/user/index') //个人中心的页面
const maker = () => import('components/maker/maker') //创客中心
const collect = () => import('components/user/content/collect') //个人中心收藏列表
const welfare = () => import('components/user/content/welfare')  //个人中心福利
const help = () => import('components/user/helpcenter/help') //个人中心帮助中心
const helpcont = () => import('components/user/helpcenter/helpcont') //个人中心帮助中心答案
const natto = () => import('components/user/nadou/natto') //个人中心纳豆
const nattodetails = () => import('components/user/nadou/nattodetails') //个人中心纳豆明细
const paradise = () => import('components/user/meng/paradise') //个人中心盟豆
const menglist = () => import('components/user/meng/menglist') //个人中心盟豆明细
const information = () => import('components/user/information/information') //个人资料部分
const recommend = () => import('components/user/recommend/recommend') //绑定推荐人
const Businessorder = () => import('components/maker/Businessorder/index') //业务订单 已结算订单
const ToBeConfirmed = () => import('components/maker/Businessorder/ToBeConfirmed') //业务订单  待确认订单
const allyGreatAlly = () => import('components/maker/ally/GreatAlly') //创客中心 大盟友列表
const allyjuniorAlly = () => import('components/maker/ally/juniorAlly') //创客中心 小盟友列表
const BonusEmbody = () => import('components/maker/exchange/Bonus/BonusEmbody') //创客中心 奖金提现
const Bonuslist = () => import('components/maker/exchange/Bonus/Bonuslist') //创客中心 奖金明细
const addbank = () => import('components/maker/exchange/Bonus/addbank') //创客中心 绑定银行卡
const ExchangeOfBeans = () => import('components/maker/exchange/Exchange/ExchangeOfBeans') //创客中心 兑换纳豆
const Exchangelist = () => import('components/maker/exchange/Exchange/Exchangelist') //创客中心 兑换明细
const geek = () => import('components/maker/geek') //GEEK
const order = () => import('components/order/order') //确认订单
const addressList = () => import('components/user/address/addressList') //地址列表
const AddTheAddress = () => import('components/user/address/AddTheAddress') //添加地址
const editAddress = () => import('components/user/address/editAddress') //编辑地址
const ispay = () => import('components/order/ispay') //选择支付方式
const generalize = () => import('components/user/content/generalize') //推广二维码
const isBrowser = () => import('components/order/isBrowser') //判断浏览器
// 优惠券coupon
const Coupon = () => import('components/coupon/coupon') //优惠券
// 优惠券coupon
const Collar = () => import('components/coupon/Collar') //领取优惠券
const CouponList = () => import('components/coupon/couponList') // 优惠券 查看是否使用或者失效
const Exhibition = () => import('components/home/Exhibition') // 展示页
const release = () => import('components/maker/release/release') // 释放纳豆
const releaselist = () => import('components/maker/release/releaselist') // 释放纳豆明细
const alipay = () => import('components/maker/release/alipay') // 绑定支付宝
const chuangke = () => import('components/home/pagefile/chuangke/chuangke') // 520
const ranking = () => import('components/maker/ranking/ranking') //创客中心 奖金排名


const router = new Router({
  // mode: 'history',
  routes: [
    { // 首页
      path: '/',
      name: 'index',
      component: IndexPage
    },
    { // 登录
      path: '/login',
      name: 'login',
      component: Login
    },
    { // 绑定一键
      path: '/binding',
      name: 'binding',
      component: Binding
    },
    { // 绑定手机号码
      path: '/bindTel',
      name: 'bindTel',
      component: BindTel
    },
    { // 共享库
      path: '/shared',
      name: 'shared',
      component: Shared
    },
    { // 爆品库
      path: '/detonation',
      name: 'Detonation',
      component: Detonation
    },
    {
      path: '/librarie',
      component: Librarie,
      children: [
        {
          path: '/librarie',
          redirect: '/libraries/libraries'
        },
        { // 福利库 0元福利
          path: '/libraries/libraries',
          name: 'libraries',
          component: Libraries
        },
        { // 福利库 免费领取
          path: '/libraries/balrog',
          name: 'balrog',
          component: balrog
        },
      ]
    },
    { // 消息首页路由
      path: '/message',
      name: 'message',
      component: Message
    },
    { // 消息聊天路由
      path: '/chitchat',
      name: 'chitchat',
      component: Chitchat
    },
    { // 发现公共路由
      path: '/FoundPage',
      component: FoundPage,
      children: [
        { // 发现推荐自路由路由（二级路由） 重定向
          path: '/',
          redirect: '/FoundPage/recommend'
        },
        { // 发现推荐自路由路由（二级路由）
          path: '/FoundPage/recommend',
          name: 'recommends',
          component: Recommend,
        },
        { // 发现推关注路由路由（二级路由） 重定向
          path: '/FoundPage/focus',
          name: 'focus',
          component: Focus,
        }
      ]
    },
    { // 发现商品详情路由
      path: '/CommodityDetails',
      name: 'CommodityDetails',
      component: CommodityDetails
    },
    { // 发现个人中心路由
      path: '/Personal',
      name: 'Personal',
      component: Personal
    },
    { // 发现动态
      // 路由
      path: '/dynamic',
      name: 'dynamic',
      component: Dynamic
    },
    { // 发现发布动态路由
      path: '/publish',
      component: Publish,
      children: [
        { // 发现选择商品路由
          path: '/selectGoods',
          component: SelectGoods,
          children: [
            { // 发现发现买到的宝贝路由zi路由路由（二级路由） 重定向
              path: '/',
              redirect: '/selectGoods/BtBaby'
            },
            { // 发现买到的宝贝自路由路由（二级路由）
              path: '/selectGoods/BtBaby',
              name: 'BtBaby',
              component: BtBaby,
            },
            { // 发现收藏的宝贝zi路由路由（二级路由） 重定向
              path: '/selectGoods/CofTres',
              name: 'CofTres',
              component: CofTres,
            }
          ]
        }
      ]
    },
    {
      path: '/user/order/orderlist',//个人全部中心订单
      name: 'orderlist',
      component: orderlist
    },
    {
      path: '/user/order/orderpending',//个人中心待付款订单
      name: 'orderpending',
      component: orderpending
    },
    {
      path: '/user/order/ordercompleted',//个人中心已完成订单
      name: 'ordercompleted',
      component: ordercompleted
    },
    {
      path: '/user/order/orderdelivergoods',//个人中心已完成订单
      name: 'orderdelivergoods',
      component: orderdelivergoods
    },
    {
      path: '/user/order/ordergoodstobereceived',//个人中心待收货订单
      name: 'ordergoodstobereceived',
      component: ordergoodstobereceived
    },
    {
      path: '/user/order/orderrefund',//个人中心退款订单
      name: 'orderrefund',
      component: orderrefund
    },
    {
      path: '/user/order/orderdatails',//订单详情
      name: 'orderdatails',
      component: orderdatails
    },
    {
      path: '/user/index',//个人中心首页
      name: 'userindex',
      component: userindex
    },
    {
      path: '/maker/maker',//创客中心的
      name: 'maker',
      component: maker
    },
    {
      path: '/user/content/generalize',//个人中心推广二维码
      name: 'generalize',
      component: generalize
    },
    {
      path: '/user/content/collect',//个人中心收藏
      name: 'collect',
      component: collect
    },
    {
      path: '/user/content/welfare',//个人中心福利
      name: 'welfare',
      component: welfare
    },
    {
      path: '/user/helpcenter/help',//个人中心帮助中心
      name: 'help',
      component: help
    },
    {
      path: '/user/helpcenter/helpcont',//个人中心帮助中心答案
      name: 'helpcont',
      component: helpcont
    },
    {
      path: '/user/nadou/natto',//个人中心纳豆
      name: 'natto',
      component: natto
    },
    {
      path: '/user/nadou/nattodetails',//个人中心纳豆明细
      name: 'nattodetails',
      component: nattodetails
    },
    {
      path: '/user/meng/paradise',//个人中心盟豆
      name: 'paradise',
      component: paradise
    },
    {
      path: '/user/meng/menglist',//个人中心盟豆明细
      name: 'menglist',
      component: menglist
    },
    {
      path: '/user/information/information',//个人中心资料部分
      name: 'information',
      component: information
    },
    {
      path: '/user/recommend/recommend',//绑定推荐人
      name: 'recommend',
      component: recommend
    },
    {
      path: '/maker/Businessorder/index',//业务订单 已结算订单
      name: 'Businessorder',
      component: Businessorder
    },
    {
      path: '/maker/Businessorder/ToBeConfirmed',//业务订单  待确认订单
      name: 'ToBeConfirmed',
      component: ToBeConfirmed
    },
    {
      path: '/maker/ally/GreatAlly',//创客中心 大盟友列表
      name: 'GreatAlly',
      component: allyGreatAlly
    },
    {
      path: '/maker/ally/juniorAlly',//创客中心 小盟友列表
      name: 'juniorAlly',
      component: allyjuniorAlly
    },
    {
      path: '/maker/exchange/Bonus/BonusEmbody',//奖金提现
      name: 'BonusEmbody',
      component: BonusEmbody
    },
    {
      path: '/maker/exchange/Bonus/Bonuslist',//奖金明细
      name: 'Bonuslist',
      component: Bonuslist
    },
    {
      path: '/maker/exchange/Bonus/addbank',//绑定银行卡
      name: 'addbank',
      component: addbank
    },
    {
      path: '/maker/exchange/ExchangeOfBeans',//兑换纳豆
      name: 'ExchangeOfBeans',
      component: ExchangeOfBeans
    },
    {
      path: '/maker/exchange/Exchange/Exchangelist',//兑换明细
      name: 'Exchangelist',
      component: Exchangelist
    },
    {
      path: '/maker/geek',//GEEK
      name: 'geek',
      component: geek
    },
    {
      path: '/order/order',//确认订单
      name: 'order',
      component: order
    },
    {
      path: '/user/address/addressList',//地址列表
      name: 'addressList',
      component: addressList
    },
    {
      path: '/user/address/AddTheAddress',//添加地址
      name: 'AddTheAddress',
      component: AddTheAddress
    },
    {
      path: '/user/address/editAddress',//编辑地址
      name: 'editAddress',
      component: editAddress
    },
    {
      path: '/order/ispay',//选择支付方式
      name: 'ispay',
      component: ispay
    },
    {
      path: '/order/isBrowser',//判断浏览器
      name: 'isBrowser',
      component: isBrowser
    },
    {
      path: '/coupon',// 优惠券coupon
      name: 'coupon',
      component: Coupon,
    },
    {
      path: '/Collar',
      name: 'Collar',
      component: Collar
    },
    {
      path: '/couponList',// 优惠券 查看是否使用或者失效
      name: 'couponList',
      component: CouponList
    },
    {
      path: '/home/Exhibition',
      name: 'Exhibition',//展示页
      component: Exhibition
    },
    {
      path: '/maker/release/release',
      name: 'release',//释放纳豆
      component: release
    },
    {
      path: '/maker/release/releaselist',
      name: 'releaselist',//释放纳豆明细
      component: releaselist
    },
    {
      path: '/maker/release/alipay',
      name: 'alipay',//绑定支付宝
      component: alipay
    },
    {
      path: '/home/pagefile/chuangke/chuangke',
      name: 'chuangke',//520列表
      component: chuangke
    },
    {
      path: '/maker/ranking/ranking',
      name: 'ranking',//创客中心 奖金排名
      component: ranking
    },
  ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({name: from.name, query: to.query}) : next({
      path: '/',
      query: to.query
    });
  } else {
    next();
  }
});


export default router;
