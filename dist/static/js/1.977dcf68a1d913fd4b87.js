webpackJsonp([1],{"1p1z":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);e.default=t}(i("W/7t"));var a=o(i("jLiU")),s=o(i("HO46")),n=o(i("RvPd")),r=o(i("Zqi5"));function o(t){return t&&t.__esModule?t:{default:t}}e.default={name:"index",data:function(){return{title:"合纳共享",swiperOptions:{slidesPerView:3.5,spaceBetween:10},bannerList:[],loves:["http://img.hena360.cn/i_520.png","http://img.hena360.cn/i_520.png"],libraList:["http://img.hena360.cn/i_flk.png","http://img.hena360.cn/i_flk.png"],social:[],exp:[],Share:[],banner:[],Notice:{},isShow:!1,fullHeight:document.documentElement.clientHeight}},watch:{Notice:function(){this.isShow=null!=this.Notice}},created:function(){var t=this,e=window.location.href.split("mid="),i=0;e[1]&&(i=e[1].split("#/")[0]);console.log(i),this.$axios.get("common/set-inv-id?mid="+i).then(function(t){console.log(t)}),this.$axios.get("/home/index/index?acttype=2").then(function(e){t.social=e.data.data.items}),this.$axios.get("/home/index/index?acttype=4").then(function(e){t.exp=e.data.data.items}),this.$axios.get("/home/index/index?acttype=5").then(function(e){t.Share=e.data.data.items}),this.$axios.get("/home/index/index?acttype=1").then(function(e){t.bannerList=e.data.data.items}),this.$axios.get("/home/index/banner").then(function(e){t.banner=e.data.data}),this.$axios.get("/app/notice/one-bulletin").then(function(e){t.Notice=e.data.data})},mounted:function(){this.$wxSDK._wxSDk(this)},methods:{Mask:function(){this.isShow=!this.isShow},follow:function(){this.isfollowMask=!this.isfollowMask}},components:{NavBer:a.default,Banner:s.default,Slide:n.default,follow:r.default}}},"3ePf":function(t,e,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"navBer"},[i("ul",{staticClass:"navItem"},[i("router-link",{attrs:{tag:"li",to:{name:"paradise"}}},[i("img",{attrs:{src:"http://img.hena360.cn/i_1.png",alt:""}}),t._v(" "),i("h4",[t._v("每日签到")])]),t._v(" "),i("router-link",{attrs:{tag:"li",to:{path:"/librarie"}}},[i("img",{attrs:{src:"http://img.hena360.cn/i_2.png",alt:""}}),t._v(" "),i("h4",[t._v("福利库")])]),t._v(" "),i("router-link",{attrs:{tag:"li",to:{name:"Detonation"}}},[i("img",{attrs:{src:"http://img.hena360.cn/i_3.png",alt:""}}),t._v(" "),i("h4",[t._v("爆品库")])]),t._v(" "),i("router-link",{attrs:{tag:"li",to:{name:"shared"}}},[i("img",{attrs:{src:"http://img.hena360.cn/i_4.png",alt:""}}),t._v(" "),i("h4",[t._v("共享库")])])],1)])},staticRenderFns:[]};e.a=a},DG6o:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"slide",props:{slideList:{type:[Array,Object],default:[]}},data:function(){return{n:0,bFlag:!0,timer1:"",timer2:"",timer3:""}},methods:{heightFn:function(){var t,e=this.$refs.slideImg;t=e.children[0].offsetHeight,e.style.height=t+"px"},next:function(){this.bFlag&&(this.bFlag=!1,this.clearT(),this.n=this.n+1===this.slideList.length?0:this.n+1,this.timeout())},clearT:function(){clearTimeout(this.timer1),clearTimeout(this.timer2),clearTimeout(this.timer3)},timeout:function(){var t=this;this.timer2=setTimeout(function(){t.bFlag=!0},1500),this.timer1=setTimeout(function(){t.next()},3e3)}},mounted:function(){var t=this;this.$nextTick(function(){t.heightFn(),window.addEventListener("resize",function(){t.heightFn()})}),this.timer3=setTimeout(this.next,0)}}},H6Vf:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("1p1z"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);var r=i("xWvd");var o=function(t){i("RqNB")},l=i("vSla")(s.a,r.a,!1,o,"data-v-70854582",null);e.default=l.exports},HO46:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("d48x"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);var r=i("PU/R");var o=function(t){i("QoiV")},l=i("vSla")(s.a,r.a,!1,o,"data-v-a1dc61d4",null);e.default=l.exports},"PU/R":function(t,e,i){"use strict";var a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("swiper",{attrs:{options:this.swiperOption}},[this._l(this.bannerList,function(t){return e("swiper-slide",{key:t.id},[e("a",{attrs:{href:t.jump_url}},[e("img",{attrs:{src:t.img_src}})])])}),this._v(" "),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1)},staticRenderFns:[]};e.a=a},QcWt:function(t,e){},QoiV:function(t,e){},RqNB:function(t,e){},RvPd:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("DG6o"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);var r=i("niRl");var o=function(t){i("QcWt")},l=i("vSla")(s.a,r.a,!1,o,"data-v-3a6d829c",null);e.default=l.exports},"W/7t":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.status=200,e.code=2e3},alVu:function(t,e){},d48x:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"banner",props:{bannerList:{type:[Array,Object],default:[]}},data:function(){return{swiperOption:{autoplay:!0,pagination:{el:".swiper-pagination",loop:!0}}}}}},dnIi:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"navBer",created:function(){},mounted:function(){setTimeout(function(){},20)},methods:{}}},jLiU:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("dnIi"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);var r=i("3ePf");var o=function(t){i("alVu")},l=i("vSla")(s.a,r.a,!1,o,"data-v-ca1d4e92",null);e.default=l.exports},niRl:function(t,e,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"slide"},[i("div",{ref:"slideImg",staticClass:"slideImg"},t._l(t.slideList,function(e,a){return i("div",{key:a,staticClass:"bannerActive",class:{active:a===t.n}},[i("a",[i("img",{attrs:{src:e,alt:""}})])])}))])},staticRenderFns:[]};e.a=a},xWvd:function(t,e,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}],staticClass:"index fixedB"},[i("banner",{attrs:{bannerList:t.banner}}),t._v(" "),i("nav-ber"),t._v(" "),i("router-link",{attrs:{to:{name:"chuangke"}}},[t.loves.length?i("div",{staticClass:"loves loves_bg"},[i("img",{attrs:{src:"http://img.hena360.cn/m_520.png",alt:"",width:"100%"}})]):t._e()]),t._v(" "),i("div",{staticClass:"v_scrolls"},[i("swiper",{attrs:{options:t.swiperOptions}},t._l(t.bannerList,function(e,a){return i("swiper-slide",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goods_logo,expression:"v.goods_logo"}],key:a},[i("router-link",{attrs:{to:{name:"CommodityDetails",query:{id:e.id}}}},[i("img",{attrs:{src:e.goods_logo}}),t._v(" "),i("p",[t._v(t._s(e.goods_name))])])],1)}))],1),t._v(" "),i("div",{staticClass:"hr"}),t._v(" "),i("router-link",{attrs:{to:"/libraries/libraries"}},[t.libraList.length?i("div",{staticClass:"libra loves libra_bg"},[i("img",{ref:"libraries",attrs:{src:"http://img.hena360.cn/m_flk.png",alt:"",width:"100%"}})]):t._e()]),t._v(" "),i("div",{staticClass:"libra_public"},[i("div",{staticClass:"public_items"},t._l(t.social,function(e,a){return i("div",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goods_logo,expression:"v.goods_logo"}],key:a,staticClass:"items"},[i("router-link",{attrs:{to:{name:"CommodityDetails",query:{id:e.id}}}},[i("div",{staticClass:"item_img"},[i("img",{staticClass:"mui-slider",attrs:{src:e.goods_logo}})]),t._v(" "),i("div",{staticClass:"item_content"},[i("h3",{staticClass:"title1"},[i("span",[t._v(t._s(e.goods_name))])]),t._v(" "),i("p",{staticClass:"dec"},[i("span",[t._v(t._s(e.pre_sale_start_date)+"-"+t._s(e.pre_sale_end_date))]),t._v(" "),i("span",[t._v("限时抢购")])]),t._v(" "),i("div",{staticClass:"price_lq"},[i("span",{staticClass:"price_lt"},[t._v("￥"+t._s(e.goods_price))]),t._v(" "),i("button",{staticClass:"btn",attrs:{type:"button"}},[t._v("领取")])])])])],1)}))]),t._v(" "),i("router-link",{attrs:{to:"/detonation"}},[i("div",{staticClass:"detonation loves detonation_bg"},[i("img",{attrs:{src:"http://img.hena360.cn/m_bpk.png",alt:""}})])]),t._v(" "),i("div",{staticClass:"detonationList"},t._l(t.exp,function(t,e){return i("div",{directives:[{name:"lazy",rawName:"v-lazy",value:t.bg_img,expression:"v.bg_img"}],key:e},[i("router-link",{attrs:{to:{name:"CommodityDetails",query:{id:t.id}}}},[i("img",{staticClass:"mui-slider",staticStyle:{padding:"0 10px 5px 10px"},attrs:{src:t.bg_img,alt:""}})])],1)})),t._v(" "),t._m(0),t._v(" "),i("router-link",{attrs:{to:"/shared"}},[i("div",{staticClass:"shared loves shared_bg"},[i("img",{attrs:{src:"http://img.hena360.cn/m_gxk.png",alt:""}})])]),t._v(" "),i("div",{staticClass:"shared_list"},[i("ul",{staticClass:"shared_item"},t._l(t.Share,function(e,a){return i("router-link",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goods_logo,expression:"v.goods_logo"}],key:a,attrs:{to:{name:"CommodityDetails",query:{id:e.id}}}},[i("li",{staticClass:"item"},[i("div",{staticClass:"item_list"},[i("img",{attrs:{src:e.goods_logo,alt:"",width:"100%"}}),t._v(" "),i("h3",{staticClass:"name"},[t._v(t._s(e.goods_name))]),t._v(" "),i("p",{staticClass:"price_i"},[t._v("￥"+t._s(e.goods_price))])])])])}))]),t._v(" "),t._m(1),t._v(" "),null!=t.Notice?i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"Mask",on:{click:t.Mask}}):t._e(),t._v(" "),null!=t.Notice?i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"Notice"},[i("img",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticStyle:{width:"5%",display:"block",float:"right","margin-bottom":"5%"},attrs:{src:"http://img.hena360.cn/x.png",alt:""},on:{click:t.Mask}}),t._v(" "),i("a",{attrs:{href:t.Notice.jump_url}},[i("img",{attrs:{src:t.Notice.file,alt:""}})])]):t._e(),t._v(" "),i("follow"),t._v(" "),i("v-footer")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticStyle:{display:"block",background:"#f2f2f2","padding-top":"15px"},attrs:{href:"http://jd.hena360.com"}},[e("img",{staticClass:"mui-slider",staticStyle:{padding:"0 10px 5px 10px"},attrs:{src:"http://img.hena360.cn/JD1.png",alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"notice"},[e("img",{staticClass:"mui-slider",attrs:{src:"http://img.hena360.cn/footerLogo.jpg",alt:""}})])}]};e.a=a}});
//# sourceMappingURL=1.977dcf68a1d913fd4b87.js.map