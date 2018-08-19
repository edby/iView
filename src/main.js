import 'babel-polyfill'
import Vue from 'vue'
//引入mui
import VueAwesomeMui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.css'
Vue.use(VueAwesomeMui)
//

//是否开启debug模式
Vue.config.debug = true;
//

// 调试
// import VConsole from 'vconsole'
// new VConsole();


// mint-ui引入
import 'mint-ui/lib/style.css';
import { Picker,InfiniteScroll } from 'mint-ui';
Vue.component(Picker.name, Picker);
Vue.use(InfiniteScroll);
//

//解决点击延迟
import fastclick from 'fastclick'
//


//Axios
import Axios from 'axios'
import {root} from './config/api'
Axios.defaults.withCredentials = true
Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = root
// Axios.defaults.baseURL = 'http://api.dev.qc1680.cn';
 // Axios.defaults.baseURL = 'http:/ /api.test.qc1680.cn/';
Axios.defaults.baseURL = 'http://t.test.qc1680.cn/api/';
// Axios.defaults.baseURL = 'http://test.hena360.com/api/';
// Axios.defaults.baseURL = 'http://api.hena360.com/';
// Axios.defaults.baseURL = 'http://m.hena360.com/api/';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Axios懒加载
Axios.interceptors.request.use((config) => {
  console.log(config)
  Mint.Indicator.open({//打开loading
    text: '加载中...',

    spinnerType: 'fading-circle'
  });
  return config;
}, (err) => {
  return Promise.reject(err)

})
Axios.interceptors.response.use((response) => {
  Mint.Indicator.close();
  return response;
}, (err) => {
  return Promise.reject(err);

})
//

//ES6
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
//

//图片预览
import vuePicturePreview from'vue-picture-preview'
Vue.use(vuePicturePreview)
//

//vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import store from 'store'
//

//标题栏
fastclick.attach(document.body)
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
});
//

//layui
layui.use(['layer', 'form'], function(){
  let layer = layui.layer
    ,form = layui.form;
})


//  本地缓存
import storage from 'common/js/storage'
Vue.use(storage)
Vue.prototype.$storage = storage
//


//公用分享
import wxSDk from 'common/js/share'
Vue.use(wxSDk)
Vue.prototype.$wxSDK = wxSDk
//用法   this.$wxSDK._wxSDk(this)


//Qs
import qs from 'qs'
Vue.use(qs)
//

//muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css' // 加载样式
Vue.use(MuseUI)

//

//iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
//

//Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
//
//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531557268900&di=e2d6db332baa651f52273b5aca6bcde9&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F85%2F90%2F99bOOOPIC25_1024.jpg',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532152047&di=abca05b51091318bb134478547abf564&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132a45975569da8012193a3e6a1e3.gif',
  attempt: 1
});
//

//mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
//

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.matched.length ===0) {
//     from.name ? next({ name:from.name }) : next('/');
//   } else {
//     next();
//   }
// });



// 发布组件
import releaseModule from 'components/found/organize/releaseModule'
import Totals from 'base/totals/totals'
import VFooter from 'base/footer/footer'
// 发布组件 全局注册
Vue.component('releaseModule', releaseModule)
Vue.component('Totals', Totals)
Vue.component('VFooter', VFooter)

// Vue.config.productionTip = false
/* eslint-disable no-new */
import App from './App'
import router from './router'
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
