webpackJsonp([49],{"4EOS":function(e,a){},MiVd:function(e,a,t){"use strict";var n={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"title",rawName:"v-title",value:e.title,expression:"title"}]},[t("div",{staticClass:"mui-content addBankCard"},[t("form",{staticClass:"mui-input-group"},[t("div",{staticClass:"mui-input-row"},[t("label",[e._v("银行卡")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.num,expression:"num"}],staticClass:"mui-input-clear",attrs:{type:"text",id:"bank_num",placeholder:"请输入银行卡卡号"},domProps:{value:e.num},on:{input:function(a){a.target.composing||(e.num=a.target.value)}}})]),e._v(" "),t("div",{staticClass:"mui-input-row"},[t("label",[e._v("持卡人")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"mui-input-clear",attrs:{type:"text",id:"bank_username",placeholder:"请输入持卡人姓名"},domProps:{value:e.username},on:{input:function(a){a.target.composing||(e.username=a.target.value)}}})]),e._v(" "),t("div",{staticClass:"mui-input-row ",on:{click:e.select}},[t("label",[e._v("银行名称")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.bank,expression:"bank"}],attrs:{type:"text",id:"bank_id",placeholder:"选择银行",readonly:"readonly",value:"",moeryId:e.moeryId},domProps:{value:e.bank},on:{input:function(a){a.target.composing||(e.bank=a.target.value)}}})])]),e._v(" "),t("p",[e._v("注意：请绑定持卡人本人储蓄卡！（不支持信用卡）")]),e._v(" "),t("input",{attrs:{type:"button",id:"addbank",placeholder:"确认添加",value:"确认"},on:{click:e.addbank}}),e._v(" "),t("ul",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"mui-table-view"},[t("h4",[e._v("请选择银行")]),e._v(" "),e._l(e.category,function(a,n){return t("div",{key:n,on:{click:function(t){e.ban(a.id,a.bank_name)}}},[e._v("\n        "+e._s(a.bank_name)+"\n      ")])})],2),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.shows,expression:"shows"}],staticClass:"box",on:{click:e.hide}})])])},staticRenderFns:[]};a.a=n},fabq:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("kyXt"),i=t.n(n);for(var s in n)"default"!==s&&function(e){t.d(a,e,function(){return n[e]})}(s);var o=t("MiVd");var u=function(e){t("4EOS")},r=t("vSla")(i.a,o.a,!1,u,"data-v-18afb9f0",null);a.default=r.exports},kyXt:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),t("+cd+"),a.default={name:"addbank",data:function(){return{title:"绑定银行卡",num:"",username:"",bank:"",id:"",show:!1,shows:!1,category:[],moeryId:""}},created:function(){var e=this;this.$axios.get("/user/bonus/get-bank-code").then(function(a){e.category=a.data.data}),this.$axios.get("/user/bonus/get-code-info").then(function(a){null!=a.data.data.bank_info&&(e.num=a.data.data.bank_info.bank_num,e.username=a.data.data.bank_info.bank_username,e.moeryId=a.data.data.bank_info.bank_id,e.bank=a.data.data.bank_info.Bank_Name.bank_name)})},methods:{select:function(){this.show=!0,this.shows=!0},hide:function(){this.show=!1,this.shows=!1},ban:function(e,a){this.bank=a,this.moeryId=e},addbank:function(){var e=this;if(""!=this.num)if(!/^\w+$/.test(this.num)||this.num.length<=15||this.num.length>=20)mui.alert("银行卡格式不正确，请重新输入");else if(""!=this.username)if(/^[\u4E00-\u9FA5]{1,6}$/.test(this.username))if(""!=this.bank){var a=t("6iV/");this.$axios.post("/user/bonus/add-bank-code",a.stringify({bank_num:this.num,bank_username:this.username,bank_id:this.moeryId})).then(function(a){2e3==a.data.code?(layer.msg(a.data.message),setTimeout(function(){e.$router.push({name:"BonusEmbody"})},2e3)):3e3==a.data.code&&layer.msg(a.data.message)})}else mui.alert("请选择开户行");else mui.alert("请输入2-6位中文姓名");else mui.alert("请输入持卡人姓名");else mui.alert("请输入银行卡卡号！")}}}}});
//# sourceMappingURL=49.4e93451e64c2083ba7cf.js.map