webpackJsonp([25],{"5Tnz":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"orderdatails",data:function(){return{title:"订单详情",name:"",phone:"",pcaaddress:"",goods_img:"",goods_name:"",money:"",total_money:"",num:"",created_at:"",status_now:"",order_sn:"",delivery_at:"",pay_at:"",receiving_at:"",data_id:"",goodsexp:[],modal1:!1,status_text:"",id:"",price:"",spec:"",balance:"",use_points:"",detail:"",url:"/#/order/ispay?id="+this.$route.query.id}},created:function(){var t=this;this.data_id=this.$route.query.id,this.$axios("/user/order/view?id="+this.data_id).then(function(a){console.log(a),t.name=a.data.data.orderAddr.name,t.id=a.data.data.id,t.phone=a.data.data.orderAddr.phone,t.pcaaddress=a.data.data.orderAddr.pcaaddress,t.detail=a.data.data.orderAddr.detail,t.spec=a.data.data.orderGoods.spec,t.goods_img=a.data.data.orderGoods.goods_img,t.goods_name=a.data.data.orderGoods.goods_name,t.money=a.data.data.money,t.balance=a.data.data.balance,t.use_points=a.data.data.use_points,t.total_money=a.data.data.orderGoods.total_money,t.price=a.data.data.orderGoods.price,t.num=a.data.data.num,t.created_at=a.data.data.created_at,t.status_now=a.data.data.status_now,t.order_sn=a.data.data.order_sn,t.pay_at=a.data.data.pay_at,t.delivery_at=a.data.data.delivery_at,t.receiving_at=a.data.data.receiving_at,t.status_text=a.data.data.status_text}),this.$axios.get("/user/order/exp?id="+this.$route.query.id).then(function(a){console.log(a),t.goodsexp=a.data.data})},methods:{go:function(){window.history.go(-1)},confirm:function(t){function a(){return t.apply(this,arguments)}return a.toString=function(){return t.toString()},a}(function(){var t=this;1==confirm("亲爱的,你的宝贝收到了吗？")?this.$axios.get("/user/order-goods/receipt?id="+this.$route.query.id).then(function(a){if(2e3==a.data.code)return layer.msg(a.data.message),void setTimeout(function(){t.$router.push({path:"/user/order/ordercompleted"})},2e3)}):layer.msg("你点击了取消！")})}}},N4w6:function(t,a,s){"use strict";var e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}]},[s("Row",{staticClass:"order_details_head"},[s("Col",{attrs:{span:"16"}},["1"==t.status_now?s("h3",[t._v("等待买家付款")]):t._e(),t._v(" "),"2"==t.status_now?s("h3",[t._v("等待卖家发货")]):t._e(),t._v(" "),"3"==t.status_now?s("h3",[t._v("等待买家收货")]):t._e(),t._v(" "),"4"==t.status_now?s("h3",[t._v("订单已完成")]):t._e(),t._v(" "),"22"==t.status_now?s("h3",[t._v("退款处理中")]):t._e(),t._v(" "),"24"==t.status_now?s("h3",[t._v("退款已完成")]):t._e(),t._v(" "),"21"==t.status_now?s("h3",[t._v("退款处理中")]):t._e(),t._v(" "),s("p",[t._v("订单金额（含运费）：￥"+t._s(t.money))])]),t._v(" "),"1"==t.status_now?s("Col",{attrs:{span:"8"}},[s("img",{attrs:{src:"http://img.hena360.cn/_pic49.png",alt:""}})]):t._e(),t._v(" "),"2"==t.status_now?s("Col",{attrs:{span:"8"}},[s("img",{attrs:{src:"http://img.hena360.cn/_pic46.png",alt:""}})]):t._e(),t._v(" "),"3"==t.status_now?s("Col",{attrs:{span:"8"}},[s("img",{attrs:{src:"http://img.hena360.cn/_pic47.png",alt:""}})]):t._e(),t._v(" "),"4"==t.status_now?s("Col",{attrs:{span:"8"}},[s("img",{attrs:{src:"http://img.hena360.cn/_pic51.1.png",alt:""}})]):t._e(),t._v(" "),"22"==t.status_now||"21"==t.status_now||"24"==t.status_now?s("Col",{attrs:{span:"8"}},[s("img",{attrs:{src:"http://img.hena360.cn/_pic51.2.png",alt:""}})]):t._e()],1),t._v(" "),s("Row",{staticClass:"order_details_address"},[s("Col",[t._v(" 收货人："+t._s(t.name)+"\n    "),s("span",[t._v(t._s(t.phone))])]),t._v(" "),s("Col",[t._v(" 收货地址："+t._s(t.pcaaddress)+" "+t._s(t.detail)+"\n    ")])],1),t._v(" "),s("Row",{staticClass:"order_details_list"},[s("Col",{attrs:{span:"24"}},[t._v(" 订单详情\n    ")]),t._v(" "),s("Row",{},[s("Col",{attrs:{span:"6"}},[s("img",{attrs:{src:t.goods_img,alt:"",width:"100%"}})]),t._v(" "),s("Col",{attrs:{span:"12"}},[s("h4",[t._v(t._s(t.goods_name))]),t._v(" "),t.spec.length?s("p",{staticClass:"spec"},[t._v("规格："+t._s(t.spec))]):t._e(),t._v(" "),s("p",[t._v("数量：X "+t._s(t.num))])]),t._v(" "),s("Col",{attrs:{span:"6"}},[s("h4",[t._v("￥"+t._s(t.price))])])],1),t._v(" "),t.balance.length?s("Col",{staticStyle:{"line-height":"28px","margin-top":"10px"},attrs:{span:"24"}},[t._v(" 纳豆抵扣：\n    "),s("span",{staticStyle:{color:"#F24646"}},[t._v("￥"+t._s(t.balance))])]):t._e(),t._v(" "),t.use_points.length?s("Col",{staticStyle:{"line-height":"28px"},attrs:{span:"24"}},[t._v(" 盟豆抵扣：\n    "),s("span",{staticStyle:{color:"#F24646"}},[t._v(t._s(t.use_points))])]):t._e(),t._v(" "),s("Col",{staticStyle:{"line-height":"28px"},attrs:{span:"24"}},[t._v(" 实付款（含运费）\n    "),s("span",{staticStyle:{color:"#F24646",float:"right","padding-right":"15px"}},[t._v("￥"+t._s(t.money))])])],1),t._v(" "),s("Row",{staticClass:"logistics_number"},[s("div",{staticClass:"expdatails"},["3"==t.status_now?s("Button",{staticClass:"exp",attrs:{type:"primary"},on:{click:function(a){t.modal1=!0}}},[t._v("查看物流")]):t._e(),t._v(" "),s("Modal",{attrs:{title:"物流详情",String:""},model:{value:t.modal1,callback:function(a){t.modal1=a},expression:"modal1"}},[s("Timeline",t._l(t.goodsexp,function(a,e){return s("TimelineItem",{key:e},[s("p",{staticClass:"time"},[t._v(t._s(a.datetime))]),t._v(" "),s("p",{staticClass:"content"},[t._v(t._s(a.remark))])])}))],1)],1),t._v(" "),s("Col",[t._v(" 订单编号："+t._s(t.order_sn)+"\n    ")]),t._v(" "),s("Col",[t._v(" 下单时间："+t._s(t.created_at)+"\n    ")]),t._v(" "),"2"==t.status_now||"3"==t.status_now||"4"==t.status_now||"22"==t.status_now||"26"==t.status_now||"21"==t.status_now||"24"==t.status_now?s("Col",[t._v(" 付款时间："+t._s(t.pay_at)+"\n    ")]):t._e(),t._v(" "),"3"==t.status_now||"4"==t.status_now||"26"==t.status_now||"21"==t.status_now||"24"==t.status_now?s("Col",[t._v(" 发货时间："+t._s(t.delivery_at)+"\n    ")]):t._e(),t._v(" "),"4"==t.status_now?s("Col",[t._v(" 收货时间："+t._s(t.receiving_at))]):t._e(),t._v(" "),"1"==t.status_now||"2"==t.status_now||"3"==t.status_now||"4"==t.status_now||"22"==t.status_now||"26"==t.status_now||"24"==t.status_now?s("Col",[t._v(" 订单状态："+t._s(t.status_text)+"\n    ")]):t._e(),t._v(" "),"21"==t.status_now?s("Col",[t._v("订单状态：退款处理中")]):t._e()],1),t._v(" "),s("a",{directives:[{name:"show",rawName:"v-show",value:"1"==t.status_now,expression:"status_now=='1'"}],staticClass:"pay",attrs:{href:t.url,id:this.id}},[t._v("去付款")]),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:"3"==t.status_now,expression:"status_now=='3'"}],staticClass:"confirm",attrs:{id:this.id},on:{click:function(a){t.confirm()}}},[t._v("确认收货")])],1)},staticRenderFns:[]};a.a=e},SLvS:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("5Tnz"),o=s.n(e);for(var n in e)"default"!==n&&function(t){s.d(a,t,function(){return e[t]})}(n);var _=s("N4w6");var i=function(t){s("q5d3")},r=s("vSla")(o.a,_.a,!1,i,"data-v-f0c10ed4",null);a.default=r.exports},q5d3:function(t,a){}});
//# sourceMappingURL=25.278ad9f1af369bf19b48.js.map