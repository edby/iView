webpackJsonp([5],{"+jRK":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var A=s(e("4YfN")),n=s(e("p8J/"));e("+cd+");var c=e("9rMa");function s(t){return t&&t.__esModule?t:{default:t}}i.default={name:"chitchat",data:function(){return{isRight:!1,title:"",textVal:"",lists:{},friendList:[{id:1,des:"反馈给咖啡馆及发动机",isRead:!1},{id:2,des:"概括了发动机规范来开个机房环境法规和咖啡馆和规范化开发规划开发",isRead:!1}],oneselfList:[{id:1,des:"付款了国际法",isRead:!1},{id:2,des:"股份的开关",isRead:!0}],touch:{},recording:!1,recordingVoice:!1,recordingCancel:!1,PhoneBoard:!0}},computed:(0,A.default)({},(0,c.mapGetters)(["isShield"])),created:function(){this.title=this.$route.query.title,this.lists=this.$route.query.item,this.touch={}},mounted:function(){this.$nextTick(function(){})},methods:(0,A.default)({seedFn:function(){if(""!==this.textVal){var t={id:this.oneselfList+1,des:this.textVal,isRead:!0};this.oneselfList.push(t),this.textVal=""}},soundDown:function(t){this.recording=!0,this.recordingVoice=!0,this.touch.initiated=!0;var i=t.touches[0];this.touch.startX=i.pageX,this.touch.startY=i.pageY},soundMove:function(t){this.touch.initiated&&(t.touches[0].pageY-this.touch.startY<0?(this.recordingVoice=!1,this.recordingCancel=!0):(this.recordingVoice=!0,this.recordingCancel=!1))},soundEnd:function(){this.recording=!1,this.recordingVoice=!1,this.recordingCancel=!1},PhoneBoardFn:function(){this.PhoneBoard=!this.PhoneBoard},changeShield:function(){this.setShield(!this.isShield)}},(0,c.mapMutations)({setShield:"SET_IS_SHIELD"})),components:{VHeader:n.default}}},"6Aou":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2RjM0RUE2OEM5NjExRTg4QzdDOEJFMDkwMDUxMEZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg2RjM0RUE3OEM5NjExRTg4QzdDOEJFMDkwMDUxMEZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZGMzRFQTQ4Qzk2MTFFODhDN0M4QkUwOTAwNTEwRkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZGMzRFQTU4Qzk2MTFFODhDN0M4QkUwOTAwNTEwRkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4u9QOPAAAHMUlEQVR42uxa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"},BL63:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var A=e("+jRK"),n=e.n(A);for(var c in A)"default"!==c&&function(t){e.d(i,t,function(){return A[t]})}(c);var s=e("tQ6Q");var l=function(t){e("fjpD")},a=e("vSla")(n.a,s.a,!1,l,"data-v-0f8ce7c2",null);i.default=a.exports},OcdB:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhEM0Y2QUU3OEM5NjExRThCMEE0RjlCNzE4NDlGNzIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhEM0Y2QUU4OEM5NjExRThCMEE0RjlCNzE4NDlGNzIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEQzRjZBRTU4Qzk2MTFFOEIwQTRGOUI3MTg0OUY3MjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEQzRjZBRTY4Qzk2MTFFOEIwQTRGOUI3MTg0OUY3MjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5blnZkAAAGJ0lEQVR42uxa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"},d5u0:function(t,i,e){t.exports=e.p+"static/img/avatar2.01835fa.png"},efoo:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyQkRGRERDOENENDExRThBMEJGRTNCREZBRDg4NzExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyQkRGREREOENENDExRThBMEJGRTNCREZBRDg4NzExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTJCREZEREE4Q0Q0MTFFOEEwQkZFM0JERkFEODg3MTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTJCREZEREI4Q0Q0MTFFOEEwQkZFM0JERkFEODg3MTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5PM+xCAAAGsElEQVR42uxbXWwUVRSe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"},fjpD:function(t,i){},gmk6:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1MDFFODkzOEM5NjExRThBOENBODExNEY5QjNGRTBFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1MDFFODk0OEM5NjExRThBOENBODExNEY5QjNGRTBFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTUwMUU4OTE4Qzk2MTFFOEE4Q0E4MTE0RjlCM0ZFMEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTUwMUU4OTI4Qzk2MTFFOEE4Q0E4MTE0RjlCM0ZFMEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5JaTM8AAADt0lEQVR42uyaTUhUURiGx78s/wqlbYtqEZVlWUjlmBIRbYIgkCApCMQg0MxyF7TM1KIfCGlR2iKCFlGLKMgcG3+qVdCmTe6DCsJqnDF7T70XPi7zd++5zsydOR+8HM+d8Xqe+33nPefMWLS0tBQopCgOFFgYYANsgA2wATbABjh7UZrohZGRkYdo2n3IdKezs/OMowwDdtCnsCq6MP4epxnuYjsHXYJ+QGU5DLkA1UKDbLuh606ALbhHKI+xZH8JTzOrpBifHMtBNMehKqemtcC2yGflbI074talS30GnHLa5RrQYWgd9Bl6kdFlKcNRAz2DguLaS+goNJ9vG49qaNIGq0IZ0AS0Mp+AFWwY2sZ+CDoCTbPfCE1BFfkAXEPYevbfQAegp1AbNMPrO/jaqlwEXs8dWluK91UxmxasAm+BYmJZUf23AjrkBbSXwJehT5Dag7/iYDfFed9qZm87+1N8QPaPT6PQfugd+7tY6pW5ADzELWiJuLabA9wsrlXSiLbYMhtNcN/f0D5oln31kF7rGJkXwFehXpGVs9B99tewFOvYj5fZxRT3V/dshd7bMu3KyLTWYexdr6GxTiaLBAizr7J9grAK9Bu0VWS2VczZVKEy3czqaIIauJSpa78ykmEeIXtEFoICVkUHNMqfN7LEVTy2GVS6YRmZNad3KvfGOCqWHZiZPW8zl+k4bz0pyjtAY7oC/dE4HASFeyvoMMZTnm7FFruAHRKZjbGMp5P8yinogTh9PWcpuo2IzcgaWOoB7sG9AyZsb5IyThQdItO1XLb2akDH6AFWeTdhbE/QbtAFLhGwwwL2n0Hh8D3jYJAy02XMSlAD2jIyawxqS3pMF/grYQfQnBOZbQZs2MUgpZGp+TYO7dE88MslS9u0fgL2NNoLspQcZjaekd0WFRTinHT7EU+EmZ71ArgfuivdGH9gyoPNitqcDItMT3oArabHB13gOgHb4hGsFWpZGxDuPa5jZBhbNMVqkbZLx1wYVLrRz324ZWQhTSOr1gX+ogbg0qDSjT4BXeLBkqUFPLpMmU0GXcolqzkbwIuBzEWfzcgmliPTqYAz/fWKNLJiQjdmEjgb0W/LdL2XN8/VbxZUpuf4AcJYIQCruJkN08q7SAUc9RlP1C3wCrHl81NYq0q50zkcI3Q7Tksf0X4XDyGngl/Iq8PDWugQL887Bb4FXQz8/+ryng+n6lCiF4oS/b80ntwoD+x+ixvYDnc7Bi5UlzbABtgAG2ADbIANsAE2wG7jrwADADQo8ZPryZKVAAAAAElFTkSuQmCC"},tGeq:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwRUIxOEIwOEM5NjExRThCQTQ0RjQxMzZCRjhBOTE3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwRUIxOEIxOEM5NjExRThCQTQ0RjQxMzZCRjhBOTE3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTBFQjE4QUU4Qzk2MTFFOEJBNDRGNDEzNkJGOEE5MTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTBFQjE4QUY4Qzk2MTFFOEJBNDRGNDEzNkJGOEE5MTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rgzRZAAACP0lEQVR42uyZzytEURTH546fI0z5UeIfsKasrSyUlJX8ShaysSA7P0o2koUFKymalQV7G9kY2cgCKxsbRST5FeaH781RGuc+7765I03n1Kc7vXfveed75947551R6XQ6lA8WDuWJiRARkiMr5C4qpXQzCQZBCUj59FcAHsEaWDT06QMToAYkfPpV1G6Bce6AUuxFpabQzIF78PTN0W+mnVUQo2A5434b2AFJcGXpV6+eOhBDzAM/e0BIJrATGhzU9Ngj5voq3asO6Pf0M+SfMZv2yJPFcuIsRbOeaW/UJgL61Svk3WazJx3sP+6BXwLKAvosNk2CHL8iRISIEBEiQkSIh5AiB75LPfzeBvT5Sr/u/tJ4St21yErw4tGPS0GiNDbhkY43gjOLCUtSDLX0qhDym/0OUZaaDV3M41oc+F3gYja9j+imF3TSTKQslqpOFjfBtqFPKximpefXr6K++2DJ5sXqX29sLmY5fkXIX1ZRyNpBv2UVJUxVlHWwa+jTDHpAJEC8h2DD5vjtdnBMdjCPa3Lgd4aN2SDkmAbV0LcW8YnuW09j44yQeQdCLriYCz1+ofVyuglQ9biksZEcFTUebDb7m4MHvnhUUbKxpBy/IkSEiBARIkJEiKWQAge+i3I0ccpGSHnI//97Jr+ckDIHQqI27yP639NpcA6uLco2uvDQQJ9jzP09MJ6lkDj7NXkUH+ap2lFukexpwXdgBcwa+oxQhabKwm+YUvgDMIaYn30JkVNLhIiQ/BPyIcAA4NtFmoBjpo4AAAAASUVORK5CYII="},tQ6Q:function(t,i,e){"use strict";var A={render:function(){var t=this,i=t.$createElement,A=t._self._c||i;return A("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}],staticClass:"chitchat fixed"},[A("v-header",{attrs:{title:t.title,isRight:t.isRight}}),t._v(" "),A("div",{staticClass:"content"},[A("div",{staticClass:"shield",on:{click:function(i){return i.stopPropagation(),t.changeShield(i)}}},[t._m(0)]),t._v(" "),A("div",{staticClass:"content_row"},[A("div",{staticClass:"friend"},[A("ul",{staticClass:"item"},t._l(t.friendList,function(i,e){return A("li",{key:e},[A("div",{staticClass:"avatar"},[A("img",{attrs:{src:t.lists.avatar,width:"100%",alt:""}})]),t._v(" "),A("div",{staticClass:"cent_body"},[A("div",{staticClass:"des",class:{on:!0===i.isRead},domProps:{innerHTML:t._s(i.des)}},[t._v("des")])])])}))]),t._v(" "),t._m(1),t._v(" "),A("div",{staticClass:"oneself"},[A("ul",{staticClass:"item"},t._l(t.oneselfList,function(i,e){return A("li",{key:e},[A("div",{staticClass:"cent_body"},[A("div",{staticClass:"des",class:{on:!0===i.isRead},domProps:{innerHTML:t._s(i.des)}},[t._v("des")])]),t._v(" "),t._m(2,!0)])}))])])]),t._v(" "),A("div",{staticClass:"contFoot"},[A("div",[A("div",{staticClass:"text"},[A("div",{staticClass:"group_input"},[A("div",{directives:[{name:"show",rawName:"v-show",value:t.PhoneBoard,expression:"PhoneBoard"}],staticClass:"group_input_text"},[A("input",{directives:[{name:"model",rawName:"v-model",value:t.textVal,expression:"textVal"}],attrs:{type:"text"},domProps:{value:t.textVal},on:{keydown:function(i){return"button"in i||13===i.keyCode?t.seedFn(i):null},input:function(i){i.target.composing||(t.textVal=i.target.value)}}})]),t._v(" "),A("div",{directives:[{name:"show",rawName:"v-show",value:!t.PhoneBoard,expression:"!PhoneBoard"}],staticClass:"group_input_sound"},[A("button",{staticClass:"sounds",attrs:{type:"button"},on:{touchstart:function(i){return i.preventDefault(),t.soundDown(i)},touchmove:function(i){return i.preventDefault(),t.soundMove(i)},touchend:t.soundEnd}},[t._v("按住 说话\n            ")])]),t._v(" "),A("div",{staticClass:"btn"},[A("Button",{on:{click:t.seedFn}},[t._v("发送")])],1)])]),t._v(" "),A("div",{staticClass:"icon"},[A("div",{staticClass:"item-icon"},[A("div",{staticClass:"item",on:{click:function(i){return i.stopPropagation(),t.PhoneBoardFn(i)}}},[A("img",{directives:[{name:"show",rawName:"v-show",value:t.PhoneBoard,expression:"PhoneBoard"}],attrs:{src:e("6Aou"),alt:""}}),t._v(" "),A("img",{directives:[{name:"show",rawName:"v-show",value:!t.PhoneBoard,expression:"!PhoneBoard"}],attrs:{src:e("efoo"),alt:""}})])]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5)])])]),t._v(" "),t.recording?A("div",{staticClass:"recording"},[t.recordingVoice?A("div",{staticClass:"recording-voice"},[t._m(6),t._v(" "),A("p",[t._v("手指上划,取消发送")])]):t._e(),t._v(" "),t.recordingCancel?A("div",{staticClass:"recording-cancel"},[A("div",{staticClass:"cancel-inner"}),t._v(" "),A("p",[t._v("松开手指,取消发送")])]):t._e()]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("span",[i("img",{attrs:{src:e("tGeq"),width:"100%",alt:""}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"times"},[i("span",[this._v("15:30")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"avatar"},[i("img",{attrs:{src:e("d5u0"),width:"100%",alt:""}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"item-icon"},[i("img",{attrs:{src:e("OcdB"),alt:""}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"item-icon"},[i("img",{attrs:{src:e("wQAw"),alt:""}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"item-icon"},[i("img",{attrs:{src:e("gmk6"),alt:""}})])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"voice-inner"},[e("div",{staticClass:"voice-icon"}),t._v(" "),e("div",{staticClass:"voice-volume"},[e("span"),t._v(" "),e("span"),t._v(" "),e("span"),t._v(" "),e("span"),t._v(" "),e("span"),t._v(" "),e("span"),t._v(" "),e("span"),t._v(" "),e("span"),t._v(" "),e("span")])])}]};i.a=A},wQAw:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxMTAxOUFCOEM5NjExRThBQjgyQzQ1NjY1RDI4NjFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxMTAxOUFDOEM5NjExRThBQjgyQzQ1NjY1RDI4NjFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTExMDE5QTk4Qzk2MTFFOEFCODJDNDU2NjVEMjg2MUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTExMDE5QUE4Qzk2MTFFOEFCODJDNDU2NjVEMjg2MUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz55AUZKAAADpElEQVR42uybSWgUQRSGe1xijAd1FAaNIgrRg4iiHibqQSU6Q0RFRXNyQ2jxIqgE3EAJLiheFBQdRHFBjCQoJmAkIAREQy4quEwUJB48uMYkbqPG8S/nNTyaTNJT3T2pJvXgY15Xuov6p7b3qiehdDptDCQbZAww04K1YC1YC9aCtWCFbIjbChKJRE/F68BskJKochh4BKqd3GyaZn4FZ7HtYL6L55udClZlSP/t5+fz3sPHwR3wS+LZAvA0aILrCb1K97eFnKaHWI3H4mMiKPRzjkl02HfQhtW6wxPBEBrGxwnaakYo2nHt4ArYCeHd0oIhVvToQ1AckBH7DEQh+qvsotVoE9sCuhSa+2JqjQJz6Ho6qAWxnHsYvVuBj+t0+QmU45trcRhp5c1EpIU2xOHeoihNWCnKm3NdpZcw/3BPYlUxtK1BfPesKCazLQ1nflsA5u8L5o+WmcN86ynyoEFRsBhMA1Oo7DVoBfcofnZjhczvlhHMJ3fIRUOWgf0k2G4LmC92gyrQIBtTZGl7XiOtcxRiRh3cW0rx9xml8+E+trQy27d+FdwHb6msmHp5PbtvG5hEIyMwgqttYmtoWLf2tAOCI2InAKuprBxcBJuDkDysoTDUsn1gbRaxliXpuSpWtgnEgyD4JPOvUe85tQMUQFh2SnXBcRaKdoItEnWInrXOwkrAPJUFr2L+efBToo4OynwsW6my4FnMv+3yxMSymSoLDjP/jYt6XjF/gsqC/3i05f1gfoHKgtuZP95FPbxXP6ssOMn8RS7qKbOdYigrmC9Upot6tnq0+PkuuA58YUP6kEQd4hA/woZzncqCRR66xxZWVuTw/AZQya4rDY+PhP0ILc+CB+xanIvtddCOg+ASK2sCF4KSLS01Mq88S+haZEIbKQO6S6u5SNjHUBoo/jbZtlDFgpQefgNzSZyV/E8FR4nerInSw5QfDfPzxKOTTjF2g48O7n8PdoGFRub1SeBOPCw7Bk5Tcr8CzDAyh+fWKvyEVuKbfgp1Ingw890OL/Hq4zIhzDoF9VJgKkvbHQvmFRR5/EX70ZMjs8T0jufwY+bvSCQS+Rj+Ukavcnl0lvUXBL29WxKp3js2Cl6CG+ADGKqI1t9gnJE57IuwTCtimmZXToJJtDhYqzGCZcshtl5qW8KDtbS6JgMg9LnYBXoT22cP23o7RltKmBaF/v4pfYim2/+tDUIbHT2k/wVAC9aCtWAtWAvWgrXgfNk/AQYAIdHen+PJbFsAAAAASUVORK5CYII="}});
//# sourceMappingURL=5.2df81a582b6b2e7d8c8b.js.map