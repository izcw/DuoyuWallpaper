"use strict";const e=require("../../common/vendor.js"),v=require("../../api/apis.js"),f=require("../../utils/common.js");require("../../utils/request.js");if(!Array){const r=e.resolveComponent("uv-skeletons"),s=e.resolveComponent("uni-load-more");(r+s)()}const h=()=>"../../uni_modules/uv-skeletons/components/uv-skeletons/uv-skeletons.js",y=()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";Math||(h+y)();const m={__name:"classList",setup(r){let s={pageNum:1,pageSize:12},n;e.onLoad(t=>{let{id:i=null,name:l=null}=t;i||f.gotoHome(),s.classid=i,n=l,e.index.setNavigationBarTitle({title:n}),u()}),e.onReachBottom(()=>{o.value||(s.pageNum++,u())});const a=e.ref([]),o=e.ref(!1),u=async()=>{let t=await v.apiGetClassList(s);s.pageSize>t.data.length&&(o.value=!0),a.value=[...a.value,...t.data],e.index.setStorageSync("strogClassList",a.value)};let _=e.ref(!0),d=e.ref(!0),p=e.ref([{type:"custom",style:"width:240rpx;height:400rpx;"}]);return e.onShareAppMessage(t=>({title:"多鱼壁纸-"+n,path:"pages/classList/classList?id="+s.classid+"&name="+n})),e.onShareTimeline(t=>({title:"多鱼壁纸-"+n,query:"id="+s.classid+"&name="+n})),e.onUnload(()=>{e.index.removeStorageSync("strogClassList")}),(t,i)=>e.e({a:!a.value.length&&!o.value},!a.value.length&&!o.value?{b:e.f(12,(l,g,c)=>({a:"104357ab-0-"+c})),c:t.index,d:e.p({loading:e.unref(_),skeleton:e.unref(p),animate:e.unref(d)})}:{},{e:e.f(a.value,(l,g,c)=>({a:l.smallPicurl,b:"/pages/preView/preView?id="+l._id,c:l._id})),f:a.value.length||o.value},a.value.length||o.value?{g:e.p({status:o.value?"noMore":"loading"})}:{})}},k=e._export_sfc(m,[["__scopeId","data-v-104357ab"],["__file","/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/classList/classList.vue"]]);m.__runtimeHooks=6;wx.createPage(k);
