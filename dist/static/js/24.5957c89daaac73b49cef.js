webpackJsonp([24],{EVnp:function(t,e){},JAhq:function(t,e,s){"use strict";var r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}]},[s("router-link",{attrs:{to:{name:"index"}}},[s("img",{staticClass:"index",attrs:{src:"http://img.hena360.cn/gohome.png",alt:""}})]),t._v(" "),s("div",{staticClass:"mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"},[s("div",{staticClass:"mui-scroll"},[s("router-link",{staticClass:"mui-control-item ",attrs:{to:"/user/order/orderlist",replace:""}},[t._v("全部")]),t._v(" "),s("router-link",{staticClass:"mui-control-item",attrs:{to:"/user/order/orderpending",replace:""}},[t._v("待付款")]),t._v(" "),s("router-link",{staticClass:"mui-control-item mui-active",attrs:{to:"/user/order/orderdelivergoods",replace:""}},[t._v("待发货")]),t._v(" "),s("router-link",{staticClass:"mui-control-item",attrs:{to:"/user/order/ordergoodstobereceived",replace:""}},[t._v("待收货")]),t._v(" "),s("router-link",{staticClass:"mui-control-item ",attrs:{to:"/user/order/ordercompleted",replace:""}},[t._v("已完成")]),t._v(" "),s("router-link",{staticClass:"mui-control-item",attrs:{to:"/user/order/orderrefund",replace:""}},[t._v("退款订单")])],1)]),t._v(" "),s("div",[s("img",{directives:[{name:"show",rawName:"v-show",value:t.shows,expression:"shows"}],staticClass:"img_one",attrs:{src:t.imgs}}),t._v(" "),t._l(t.items,function(e,r){return s("Row",{directives:[{name:"show",rawName:"v-show",value:t.showss,expression:"showss"}],key:r,staticClass:"order_list",attrs:{id:e.id}},[s("router-link",{attrs:{to:{name:"orderdatails",query:{id:e.id}}}},[s("Col",{staticClass:"delivery_sn",attrs:{span:"24"}},[t._v(" 订单编号"+t._s(e.order_sn)+"\n        ")]),t._v(" "),s("Col",{attrs:{span:"6"}},[s("img",{attrs:{src:e.orderGoods.goods_img,alt:"",width:"100%"}})]),t._v(" "),s("Col",{attrs:{span:"18"}},[s("h4",[t._v(t._s(e.orderGoods.goods_name))]),t._v(" "),e.orderGoods.spec.length?s("p",{staticClass:"spec"},[t._v("规格:"+t._s(e.orderGoods.spec))]):t._e(),t._v(" "),s("p",{staticClass:"num"},[t._v("X "+t._s(e.num))])])],1)],1)})],2)],1)},staticRenderFns:[]};e.a=r},V0S6:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("z37D"),o=s.n(r);for(var i in r)"default"!==i&&function(t){s.d(e,t,function(){return r[t]})}(i);var a=s("JAhq");var n=function(t){s("EVnp")},l=s("vSla")(o.a,a.a,!1,n,"data-v-dfdb235c",null);e.default=l.exports},z37D:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"orderdelivergoods",data:function(){return{items:[],title:"待发货",shows:!1,imgs:"",showss:!0}},created:function(){var t=this;mui("body").on("tap","a",function(){document.location.href=this.href}),this.$axios.get("/user/order/index?status=2").then(function(e){0==e.data.data.items.length?(t.shows=!0,t.imgs="http://img.hena360.cn/no_data_img.png"):(t.shows=!1,t.showss=!0,t.items=e.data.data.items)})},mounted:function(){var t=this;setTimeout(function(){t.scroll()},20)},methods:{scroll:function(){mui(".mui-scroll-wrapper").scroll()},index:function(){this.$router.push({name:"index"})}}}}});
//# sourceMappingURL=24.5957c89daaac73b49cef.js.map