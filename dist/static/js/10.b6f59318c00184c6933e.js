webpackJsonp([10],{Aliw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=u(a("4YfN")),i=u(a("p8J/")),n=u(a("QNZ2")),o=u(a("IBZt")),r=a("fVKp"),c=a("9rMa");function u(t){return t&&t.__esModule?t:{default:t}}e.default={name:"Personal",data:function(){return{title:"个人主页",dataList:[],OtherPageList:{},uId:null,isFouc:!1,id:""}},computed:(0,s.default)({},(0,c.mapGetters)(["isLogin","loginUrl"])),created:function(){this.uId=this.$route.query.id,(0,r.getLogin)(this),this.getOtherPage(),this.getOtherList()},mounted:function(){this.$nextTick(function(){})},methods:(0,s.default)({},(0,c.mapMutations)({setLoginCode:"SET_IS_LOGIN",setLoginUrl:"SET_LOGIN_URL"}),{priCha:function(){console.log(this.id),layer.msg("暂未开放，敬请期待！")},getOtherPage:function(){var t=this;this.$axios.get("/social/index/other-page?user_id="+this.uId).then(function(e){console.log(e),t.id=e.data.data.id,200===e.status&&2e3===e.data.code&&(t.OtherPageList=e.data.data,console.log(t.OtherPageList))})},getOtherList:function(){var t=this;this.$axios.get("/social/index/other-list?user_id="+this.uId).then(function(e){console.log(e),200===e.status&&2e3===e.data.code&&(t.dataList=e.data.data.items,console.log(t.dataList))})},changeDetails:function(t){this.$router.push({path:"/CommodityDetails",query:{id:t.goods_id,mid:t.user_id}})},focusFn:function(t){var e=this;console.log(t.is_focus),1==t.is_focus?layer.confirm("取消关注后，您将看不到对方发布的实时动态，确认取消？",{title:"取消确认"},function(){e.$axios.get("/social/index/focus-off?id="+t.id).then(function(t){200==t.status&&(2e3==t.data.code?(console.log(t.data.message),layer.msg(t.data.message),e.getOtherPage()):(t.data.code,layer.msg(t.data.message)))})}):this.$axios.get("/social/index/focus?id="+t.id).then(function(t){200==t.status&&(2e3==t.data.code?(console.log(t.data.message),layer.msg(t.data.message),e.getOtherPage()):(t.data.code,layer.msg(t.data.message)))})},changeLike:function(t){var e=this;this.$axios.get("/social/index/like?id="+t).then(function(t){200==t.status&&(2e3==t.data.code?(console.log(t.data.message),layer.msg("点赞成功"),e.getOtherList(),e.getOtherPage()):(t.data.code,layer.msg(t.data.message)))})},changePersonal:function(t){this.$router.push({query:{id:t.user_id},name:"Personal"})}}),components:{VHeader:i.default,PageHeader:n.default,PanelList:o.default},beforeRouteEnter:function(t,e,a){a(function(t){console.log(t.isLogin),setTimeout(function(){1e3==t.isLogin&&t.$router.push({path:"/login?callBack="+encodeURIComponent(window.location.href)})},20)})}}},C30c:function(t,e){},GfBP:function(t,e,a){"use strict";var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}],staticClass:"Personal"},[a("page-header",{attrs:{dataList:t.OtherPageList}}),t._v(" "),t.dataList.length?a("div",{staticClass:"box"},[a("panel-list",{attrs:{isFouc:t.isFouc,dataList:t.dataList},on:{changeDetails:t.changeDetails,changeLike:t.changeLike,changePersonal:t.changePersonal}})],1):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.OtherPageList.is_self,expression:"OtherPageList.is_self == 1"}],staticClass:"personal_foot"},[a("div",{staticClass:"item_group"},[a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.OtherPageList.is_focus||0==t.OtherPageList.is_focus,expression:"OtherPageList.is_focus == 1 || OtherPageList.is_focus == 0"}],staticClass:"item",on:{click:function(e){e.stopPropagation(),t.focusFn(t.OtherPageList)}}},[0==t.OtherPageList.is_focus?a("span",[a("Icon",{attrs:{type:"plus",size:"16"}}),t._v(" 关注")],1):t._e(),t._v(" "),1==t.OtherPageList.is_focus?a("span",[t._v("已关注")]):t._e()]),t._v(" "),a("div",{staticClass:"item",on:{touchstart:function(e){return e.preventDefault(),t.priCha(e)}}},[a("Icon",{attrs:{type:"chatbubble-working",size:"16"}}),t._v(" 私聊")],1)])])],1)},staticRenderFns:[]};e.a=s},QNZ2:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mnZj"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);var o=a("xbA3");var r=function(t){a("C30c")},c=a("vSla")(i.a,o.a,!1,r,"data-v-12e7fe26",null);e.default=c.exports},VUYW:function(t,e){},mnZj:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"pageHeads",data:function(){return{}},props:{dataList:{type:Object,default:{}}},computed:{imgUrl:function(){return"http://img.hena360.cn/V"+(this.dataList.level-1)+".png"}}}},wFum:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Aliw"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);var o=a("GfBP");var r=function(t){a("VUYW")},c=a("vSla")(i.a,o.a,!1,r,"data-v-37b579c8",null);e.default=c.exports},xbA3:function(t,e,a){"use strict";var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pageHeads"},[a("div",{staticClass:"avatar"},[a("img",{attrs:{src:t.dataList.avatar,alt:""}})]),t._v(" "),a("div",{staticClass:"titles"},[t._v(t._s(t.dataList.nickname))]),t._v(" "),a("div",{staticClass:"vip_cl_ion"},[a("span",[a("img",{attrs:{src:t.imgUrl,alt:""}}),t._v(" "),a("em",[t._v(t._s(t.dataList.levelname))])])]),t._v(" "),a("ul",{staticClass:"page_info"},[a("li",[a("p",[t._v(t._s(t.dataList.focus_num))]),t._v(" "),a("p",[t._v("被关注")])]),t._v(" "),a("li",[a("p",[t._v(t._s(t.dataList.like_num))]),t._v(" "),a("p",[t._v("被赞")])]),t._v(" "),a("li",[a("p",[t._v(t._s(t.dataList.social_num))]),t._v(" "),a("p",[t._v("动态")])])])])},staticRenderFns:[]};e.a=s}});
//# sourceMappingURL=10.b6f59318c00184c6933e.js.map