webpackJsonp([57],{"+Lw1":function(t,s){},"12Ge":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=o(e("a3Yh")),n=o(e("JjJq"));function o(t){return t&&t.__esModule?t:{default:t}}s.default={name:"balrog",components:{boon:n.default},data:function(){var t,s=this;return{boons:[],sho:!0,hide:!1,isactiveIndex:"",swiperOption:(t={loop:!1,grabCursor:!0,autoplay:!1,autoplayDisableOnInteraction:!1,pagination:".swiper-pagination",paginationClickable:!0,observer:!0,observeParents:!0},(0,a.default)(t,"pagination",{el:".swiper-pagination"}),(0,a.default)(t,"on",{slideChangeTransitionEnd:function(){s.isactiveIndex=s.$refs.mySwiper.swiper.activeIndex,s.isshow(s.isactiveIndex)}}),t)}},created:function(){var t=this;this.$axios.get("/goods/goods/index?acttype=2").then(function(s){console.log(s),t.boons=s.data.data.items})},methods:{index:function(){this.$router.push({name:"index"})},isshow:function(t){console.log(t),"0"==t&&this.$router.push({name:"balrog"}),"1"==t&&this.$router.push({name:"libraries"})}}}},RZTv:function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"balrog"},[e("router-link",{attrs:{to:{name:"index"}}},[e("img",{staticClass:"index",attrs:{src:"http://img.hena360.cn/gohome.png",alt:""}})]),t._v(" "),e("div",{staticClass:"body"},[e("div",{staticClass:"goods"},t._l(t.boons,function(s,a){return"0.00"!=s.goods_price?e("Row",{directives:[{name:"show",rawName:"v-show",value:t.sho,expression:"sho"},{name:"lazy",rawName:"v-lazy",value:s.goods_logo,expression:"boon.goods_logo"}],key:a,staticClass:"librar_list"},[e("router-link",{attrs:{to:{name:"CommodityDetails",query:{id:s.id}}}},[e("Col",{staticClass:"list_img",attrs:{span:"8"}},[e("img",{attrs:{src:s.goods_logo,alt:""}}),t._v(" "),"3"==s.pre_status?e("img",{staticClass:"overdue",attrs:{src:"http://img.hena360.cn/overdue.png",alt:""}}):t._e()]),t._v(" "),e("Col",{staticClass:"list_goods",attrs:{span:"16"}},[e("p",{staticClass:"list_name"},[t._v(t._s(s.goods_name))]),t._v(" "),e("p",{staticClass:"list_time"},[e("span",[t._v(t._s(s.pre_sale_start_date)+"-"+t._s(s.pre_sale_end_date))]),e("span",[t._v("限时领取")])]),t._v(" "),e("p",[e("span",[t._v("¥"+t._s(s.goods_price))]),t._v(" "),"1"==s.pre_status||"2"==s.pre_status?e("span",{staticClass:"lingqu"},[t._v("领取")]):t._e(),t._v(" "),"3"==s.pre_status?e("span",{staticClass:"end"},[t._v("结束")]):t._e()])])],1)],1):t._e()}))])],1)},staticRenderFns:[]};s.a=a},vP9v:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("12Ge"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(s,t,function(){return a[t]})}(o);var i=e("RZTv");var r=function(t){e("+Lw1")},l=e("vSla")(n.a,i.a,!1,r,"data-v-e48bdd9c",null);s.default=l.exports}});
//# sourceMappingURL=57.c4a473be2ca459c31172.js.map