webpackJsonp([45],{"+Vle":function(t,a){},FGEF:function(t,a,s){"use strict";var n={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}]},[s("div",{staticClass:"ranking"},[s("div",{staticClass:"rank"},[t._l(t.second,function(a,n){return s("div",{key:this},[s("img",{attrs:{src:a.user.avatar,alt:""}}),t._v(" "),s("img",{staticClass:"tubiao",attrs:{src:"http://img.hena360.cn/_pic22.png",alt:""}}),t._v(" "),s("p",[t._v(t._s(a.user.nickname))]),t._v(" "),s("p",{staticClass:"many_fr"},[t._v(t._s(a.money))])])}),t._v(" "),t._l(t.first,function(a,n){return s("div",{key:this,staticClass:"middle"},[s("img",{attrs:{src:a.user.avatar,alt:""}}),t._v(" "),s("img",{staticClass:"tubiao",attrs:{src:"http://img.hena360.cn/_pic21.png",alt:""}}),t._v(" "),s("p",[t._v(t._s(a.user.nickname))]),t._v(" "),s("p",{staticClass:"many_fr"},[t._v(t._s(a.money))])])}),t._v(" "),t._l(t.third,function(a,n){return s("div",{key:this},[s("img",{attrs:{src:a.user.avatar,alt:""}}),t._v(" "),s("img",{staticClass:"tubiao",attrs:{src:"http://img.hena360.cn/_pic23.png",alt:""}}),t._v(" "),s("p",[t._v(t._s(a.user.nickname))]),t._v(" "),s("p",{staticClass:"many_fr"},[t._v(t._s(a.money))])])})],2),t._v(" "),t._l(t.last,function(a,n){return s("Row",{key:n,staticClass:"ranking_list"},[s("Col",{staticClass:"length",attrs:{span:"2"}},[t._v(t._s(n+4))]),t._v(" "),s("Col",{staticClass:"list_img",attrs:{span:"4"}},[s("img",{attrs:{src:a.user.avatar,alt:""}})]),t._v(" "),s("Col",{staticClass:"name",attrs:{span:"10"}},[t._v(t._s(a.user.nickname))]),t._v(" "),s("Col",{staticClass:"many",attrs:{span:"8"}},[t._v(t._s(a.money))])],1)})],2)])},staticRenderFns:[]};a.a=n},RGqK:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=s("Zu8L"),i=s.n(n);for(var e in n)"default"!==e&&function(t){s.d(a,t,function(){return n[t]})}(e);var r=s("FGEF");var c=function(t){s("+Vle")},l=s("vSla")(i.a,r.a,!1,c,"data-v-44d0be0b",null);a.default=l.exports},Zu8L:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"ranking",data:function(){return{title:"收益排名",last:[],first:[],second:[],third:[]}},created:function(){var t=this;this.$axios.get("/bonus/bonus/get-bonus-list").then(function(a){console.log(a),t.last=a.data.data.slice(3,10),t.first=a.data.data.slice(0,1),t.second=a.data.data.slice(1,2),t.third=a.data.data.slice(2,3)})},methods:{}}}});
//# sourceMappingURL=45.aa96bf907d353545c016.js.map