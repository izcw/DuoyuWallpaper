"use strict";const e=require("../../common/vendor.js"),i=require("../../api/apis.js");require("../../utils/request.js");if(!Array){const r=e.resolveComponent("custom-nav-bar"),o=e.resolveComponent("uni-icons"),m=e.resolveComponent("uni-dateformat"),n=e.resolveComponent("common-title"),u=e.resolveComponent("theme-item");(r+o+m+n+u)()}const f=()=>"../../components/custom-nav-bar/custom-nav-bar.js",y=()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js",v=()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js",g=()=>"../../components/common-title/common-title.js",b=()=>"../../components/theme-item/theme-item.js";Math||(f+y+v+g+b)();const p={__name:"index",setup(r){const o=e.ref([]);(async()=>{let a=await i.apiGetBanner();o.value=a.data})();const n=e.ref([]);(async()=>{let a=await i.apiGetDayRandom();n.value=a.data})();const _=e.ref([]);(async()=>{let a=await i.apiGetNotice({select:!0});_.value=a.data})();const l=e.ref([]);(async()=>{let a=await i.apiGetClassify({select:!0});l.value=a.data})();const d=a=>{e.index.setStorageSync("strogClassList",n.value),e.index.navigateTo({url:"/pages/preView/preView?id="+a})};return e.onShareAppMessage(a=>({title:"多鱼壁纸",path:"/pages/index/index",imageUrl:"https://picserver.duoyu.link/picfile/image/202403/31-1711876576139.webp"})),e.onShareTimeline(a=>({title:"多鱼壁纸",path:"/pages/index/index"})),(a,C)=>({a:e.p({title:"首页"}),b:e.f(o.value,(t,c,s)=>({a:t.picurl,b:t._id})),c:e.p({type:"sound-filled",size:"20"}),d:e.f(_.value,(t,c,s)=>({a:e.t(t.title),b:"/pages/notice/detail?id="+t._id,c:t._id})),e:e.p({type:"right",size:"16",color:"#333"}),f:e.p({type:"calendar",size:"20"}),g:e.p({date:Date.now(),format:"dd日"}),h:e.f(n.value,(t,c,s)=>({a:t.smallPicurl,b:e.o(k=>d(t._id)),c:t._id})),i:e.f(l.value,(t,c,s)=>({a:t._id,b:"1cf27b2a-7-"+s,c:e.p({item:t})})),j:e.p({isMore:"true"})})}},h=e._export_sfc(p,[["__scopeId","data-v-1cf27b2a"],["__file","/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/index/index.vue"]]);p.__runtimeHooks=6;tt.createPage(h);
