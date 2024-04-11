"use strict";const e=require("../../common/vendor.js"),j=require("../../utils/system.js"),_=require("../../api/apis.js");require("../../utils/request.js");if(!Array){const g=e.resolveComponent("uni-icons"),i=e.resolveComponent("uni-dateformat"),n=e.resolveComponent("uni-rate"),s=e.resolveComponent("uni-popup");(g+i+n+s)()}const A=()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js",V=()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js",q=()=>"../../uni_modules/uni-rate/components/uni-rate/uni-rate.js",B=()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";Math||(A+V+q+B)();const x={__name:"preView",setup(g){const i=e.ref(null),n=e.ref(0),s=e.ref([]),c=e.ref([]),t=e.ref(null),p=e.ref(!1),S=e.index.getStorageSync("strogClassList")||[];s.value=S.map(a=>({...a,picurl:a.smallPicurl.replace("_small.webp",".jpg")}));const v=e.ref(!0),k=()=>{v.value=!v.value},m=e.ref(null),C=()=>{m.value.open()},I=()=>{m.value.close()},f=e.ref(null),l=e.ref(0),b=()=>{t.value.userScore&&(p.value=!0,l.value=t.value.userScore),f.value.open()},h=()=>{f.value.close(),l.value=0,p.value=!1},P=async()=>{e.index.showLoading({title:"加载中..."});let{classid:a,_id:u}=t.value,o=await _.apiGetSetupScore({classid:a,wallId:u,userScore:l.value});e.index.hideLoading(),o.errCode===0&&(e.index.showToast({title:"评分成功",icon:"none"}),s.value[n.value].userScore=l.value,e.index.setStorageSync("strogClassList",s.value),h())};let{height:w}=e.index.getMenuButtonBoundingClientRect();const L=()=>{e.index.navigateBack({success:()=>{},fail(a){e.index.reLaunch({url:"/pages/index/index"})}})};e.onLoad(async a=>{if(i.value=a.id,a.type=="share"){let u=await _.apiDetaiWall({id:i.value});s.value=u.data.map(o=>({...o,picurl:o.smallPicurl.replace("_small.webp",".jpg")}))}n.value=s.value.findIndex(u=>u._id==i.value),t.value=s.value[n.value],y()});const z=a=>{n.value=a.detail.current,t.value=s.value[n.value],y()},y=()=>{c.value.push(n.value<=0?s.value.length-1:n.value-1,n.value,n.value>=s.value.length-1?0:n.value+1),c.value=[...new Set(c.value)]},M=async()=>{try{e.index.showLoading({title:"下载中...",mask:!0});let{classid:a,_id:u}=t.value,o=await _.apiWriteDownload({classid:a,wallId:u});if(o.errCode!=0)throw o;e.index.getImageInfo({src:t.value.picurl,success(r){e.index.saveImageToPhotosAlbum({filePath:r.path,success(d){e.index.showToast({title:"保存成功，请到相册查看",icon:"none"})},fail:d=>{if(d.errMsg=="uni.saveImageToPhotosAlbum:fail cancel"){e.index.showToast({title:"保存失败，请重新点击下载",icon:"none"});return}e.index.showModal({title:"授权提示",content:"需要授权保存相册",success:D=>{D.confirm&&e.index.openSetting({success:T=>{T.authSetting["scope.writePhotosAlbum"]?e.index.showToast({title:"获取授权成功",icon:"none"}):e.index.showToast({title:"获取授权失败！",icon:"none"})}})}})},complete:()=>{e.index.hideLoading()}})}})}catch(a){console.log(a),e.index.hideLoading()}};return e.onShareAppMessage(a=>({title:"多鱼壁纸",path:"/pages/preView/preView?id="+i.value+"&type=share"})),e.onShareTimeline(a=>({title:"多鱼壁纸",query:"id="+i.value+"&type=share"})),(a,u)=>e.e({a:t.value},t.value?{b:e.f(s.value,(o,r,d)=>e.e({a:c.value.includes(r)},c.value.includes(r)?{b:e.o(k,o._id),c:o.picurl}:{},{d:o._id})),c:n.value,d:e.o(z),e:e.p({type:"back",color:"#ccc",size:"20"}),f:e.o(L),g:e.unref(j.getStatusBarHeight)()+"px",h:e.unref(w)+"px",i:e.unref(w)+"px",j:e.t(n.value+1),k:e.t(s.value.length),l:e.p({date:Date.now(),format:"hh:mm"}),m:e.p({date:Date.now(),format:"MM月dd日"}),n:e.p({type:"info",size:"20"}),o:e.o(C),p:e.p({type:"star",size:"20"}),q:e.t(t.value.score),r:e.o(b),s:e.p({type:"download",size:"20"}),t:e.o(M),v:v.value,w:e.p({type:"closeempty",size:"18"}),x:e.o(I),y:e.t(t.value._id),z:e.t(t.value.nickname),A:e.o(o=>a.value=o),B:e.p({value:t.value.score,size:"16",readonly:!0,touchable:!0,modelValue:a.value}),C:e.t(t.value.score),D:e.t(t.value.description),E:e.f(t.value.tabs,(o,r,d)=>({a:e.t(o),b:r})),F:e.sr(m,"18cea5aa-6",{k:"infoPopup"}),G:e.p({type:"bottom"}),H:e.t(p.value?"评分过了～":"壁纸评分"),I:e.p({type:"closeempty",size:"18"}),J:e.o(h),K:e.o(o=>l.value=o),L:e.p({allowHalf:!0,disabled:p.value,["disabled-color"]:"#FFCA3E",modelValue:l.value}),M:e.t(l.value),N:e.o(P),O:!l.value,P:!p.value,Q:e.sr(f,"18cea5aa-9",{k:"scorePopup"}),R:e.p({type:"center",["is-mask-click"]:!1})}:{})}},H=e._export_sfc(x,[["__scopeId","data-v-18cea5aa"],["__file","/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/preView/preView.vue"]]);x.__runtimeHooks=6;wx.createPage(H);
