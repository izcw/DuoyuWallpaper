"use strict";const e=require("../../common/vendor.js"),c=require("../../api/apis.js");require("../../utils/request.js");if(!Array){const n=e.resolveComponent("uni-tag"),a=e.resolveComponent("uni-dateformat"),t=e.resolveComponent("mp-html");(n+a+t)()}const i=()=>"../../uni_modules/uni-tag/components/uni-tag/uni-tag.js",m=()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js",u=()=>"../../uni_modules/mp-html/components/mp-html/mp-html.js";Math||(i+m+u)();const _={__name:"notice",setup(n){let a;const t=e.ref({});e.onLoad(async o=>{a=o.id,s()});const s=()=>{c.apiWallNewsDetail({id:a}).then(o=>{t.value=o.data})};return(o,l)=>e.e({a:t.value.select},t.value.select?{b:e.p({inverted:!0,text:"置顶",type:"error",size:"small"})}:{},{c:e.t(t.value.title),d:e.t(t.value.author),e:e.p({date:t.value.publish_date,format:"yyyy-MM-dd hh:mm:ss"}),f:e.p({content:t.value.content}),g:e.t(t.value.view_count)})}},r=e._export_sfc(_,[["__scopeId","data-v-1c2e4c1e"],["__file","/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/notice/notice.vue"]]);wx.createPage(r);
