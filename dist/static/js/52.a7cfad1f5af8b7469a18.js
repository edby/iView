webpackJsonp([52],{"7JOn":function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}]},[a("ally",{attrs:{dataList:t.nav}}),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:0==t.items.length,expression:"items.length == 0"}],staticClass:"img_one",attrs:{src:t.imgs}}),t._v(" "),0!=t.items.length?a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"ally",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"0"}},t._l(t.items,function(e,n){return a("Row",{key:n},[a("Col",{staticClass:"avatar",attrs:{span:"6"}},[a("img",{attrs:{src:e.avatar,alt:""}})]),t._v(" "),a("Col",{attrs:{span:"18"}},[a("div",{staticClass:"level"},[1==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V0.png",alt:""}}):t._e(),t._v(" "),2==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V1.png",alt:""}}):t._e(),t._v(" "),3==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V2.png",alt:""}}):t._e(),t._v(" "),4==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V3.png",alt:""}}):t._e(),t._v(" "),5==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V4.png",alt:""}}):t._e(),t._v(" "),6==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V5.png",alt:""}}):t._e(),t._v(" "),7==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V6.png",alt:""}}):t._e(),t._v(" "),8==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V7.png",alt:""}}):t._e(),t._v(" "),9==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V8.png",alt:""}}):t._e(),t._v(" "),10==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V9.png",alt:""}}):t._e(),t._v(" "),11==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V10.png",alt:""}}):t._e(),t._v(" "),12==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V11.png",alt:""}}):t._e(),t._v(" "),13==e.level?a("img",{attrs:{src:"http://img.hena360.cn/V12.png",alt:""}}):t._e(),t._v("\n          "+t._s(e.nickname)+"\n        ")]),t._v(" "),a("div",[t._v("手机："+t._s(e.tel))])])],1)})):t._e()],1)},staticRenderFns:[]};e.a=n},RCos:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,i=a("Fc1b"),s=(n=i)&&n.__esModule?n:{default:n};e.default={name:"juniorAlly",components:{ally:s.default},data:function(){return{title:"我的盟友",items:"",nav:[{url:"GreatAlly",title:"大盟友"},{url:"juniorAlly",title:"小盟友"}],imgs:"http://img.hena360.cn/no_data_img.png",page:1,loading:!1}},created:function(){this.getUserCoupon()},methods:{loadMore:function(){this.page=parseInt(this.page)+1,this.getUserCoupon()},getUserCoupon:function(){var t=this;this.$axios.get("/guest/level-rel/lower-t?per-page=10&page="+this.page).then(function(e){console.log(e),0===t.items.length?(t.items=e.data.data.items,t.shows=!0,t.imgs="http://img.hena360.cn/no_data_img.png"):(t.shows=!1,t.showss=!0,t.items=t.items.concat(e.data.data.items)),t.isHaveMore(e.data.data._meta.currentPage<e.data.data._meta.pageCount)})},isHaveMore:function(t){this.loading=!t}}}},a5Kl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("RCos"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);var l=a("7JOn");var r=function(t){a("q6En")},c=a("vSla")(i.a,l.a,!1,r,"data-v-663e24f5",null);e.default=c.exports},q6En:function(t,e){}});
//# sourceMappingURL=52.a7cfad1f5af8b7469a18.js.map