webpackJsonp([48],{"2EAr":function(t,e){},K4Of:function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}]},[a("ally",{attrs:{dataList:t.nav}}),t._v(" "),a("div",{staticClass:"ExchangeOfBeans"},[a("div",{staticClass:"tuihuan"},[a("Row",{staticClass:"bouns"},[a("Col",{attrs:{span:"12"}},[t._v("兑换纳豆")]),t._v(" "),a("Col",{attrs:{span:"12"}},[t._v("可用奖金"+t._s(t.bouns)+"元")])],1),t._v(" "),a("Row",{staticClass:"money"},[a("Col",{attrs:{span:"24"}},[t._v(" ￥\n        "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],attrs:{placeholder:"请输入兑换金额",type:"text"},domProps:{value:t.value},on:{input:function(e){e.target.composing||(t.value=e.target.value)}}})]),t._v(" "),a("Col",{attrs:{span:"24"}},[t._v(" 可兑换纳豆"+t._s(t._f("numFilter")(t.retu))+"个\n\n        ")])],1)],1),t._v(" "),a("p",{staticClass:"nan"},[t._v("10元可兑换1个纳豆")]),t._v(" "),a("Row",{staticClass:"btn"},[a("Col",{attrs:{span:"24"}},[a("Button",{attrs:{long:""},on:{click:function(e){t.bonusToBbalans()}}},[t._v("兑换纳豆")])],1),t._v(" "),a("Col",{attrs:{span:"24"}},[a("router-link",{attrs:{to:"/maker/exchange/Exchange/Exchangelist"}},[t._v("兑换明细")])],1)],1)],1)],1)},staticRenderFns:[]};e.a=n},"k/v+":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,s=a("Fc1b"),u=(n=s)&&n.__esModule?n:{default:n};e.default={name:"ExchangeOfBeans",data:function(){return{title:"兑换纳豆",nav:[{url:"ExchangeOfBeans",title:"兑换纳豆"},{url:"BonusEmbody",title:"奖金提现"}],bouns:"",value:""}},components:{ally:u.default},created:function(){var t=this;this.$axios.get("/user/bonus/total").then(function(e){t.bouns=e.data.data.bonus})},computed:{retu:function(){return this.value/10}},methods:{bonusToBbalans:function(){var t=this,e=a("6iV/");""==this.value?layer.msg("兑换数量不能为空！"):this.$axios.post("/guest/bonus/bonus-to-balans",e.stringify({bonus:this.value})).then(function(e){2e3==e.data.code&&(layer.msg(e.data.message),setTimeout(function(){t.$router.push({name:"maker"})},2e3)),3e3==e.data.code&&layer.msg(e.data.message)})}},filters:{numFilter:function(t){var e=Number(t).toFixed(0);return e.substring(0,e.length)}}}},lSDh:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("k/v+"),s=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,function(){return n[t]})}(u);var o=a("K4Of");var r=function(t){a("2EAr")},i=a("vSla")(s.a,o.a,!1,r,"data-v-182f4a56",null);e.default=i.exports}});
//# sourceMappingURL=48.71a60c6057388b7a420d.js.map