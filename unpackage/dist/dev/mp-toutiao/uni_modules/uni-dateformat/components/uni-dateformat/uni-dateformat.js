"use strict";const r=require("./date-format.js"),e=require("../../../../common/vendor.js"),a={name:"uniDateformat",props:{date:{type:[Object,String,Number],default(){return"-"}},locale:{type:String,default:"zh"},threshold:{type:Array,default(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data(){return{refreshMark:0}},computed:{dateShow(){return this.refreshMark,r.friendlyDate(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler(){this.setAutoRefresh()},immediate:!0}},methods:{refresh(){this.refreshMark++},setAutoRefresh(){clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval(()=>{this.refresh()},parseInt(this.refreshRate)))}}};function s(n,h,i,f,u,t){return{a:e.t(t.dateShow)}}const o=e._export_sfc(a,[["render",s],["__file","/Users/izcw/Desktop/我的项目/DuoyuWallpaper/uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.vue"]]);tt.createComponent(o);
