"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_dateformat2 + _easycom_uni_icons2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_icons + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preView",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const infoPopup = common_vendor.ref(null);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const clickScore = () => {
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
    };
    const submiScore = () => {
      console.log("确认评分");
      scorePopup.value.close();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(5, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(maskChange),
        c: common_assets._imports_0$1,
        d: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        e: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        f: common_vendor.p({
          type: "info",
          size: "20"
        }),
        g: common_vendor.o(clickInfo),
        h: common_vendor.p({
          type: "star",
          size: "20"
        }),
        i: common_vendor.o(clickScore),
        j: common_vendor.p({
          type: "download",
          size: "20"
        }),
        k: maskState.value,
        l: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        m: common_vendor.o(clickInfoClose),
        n: common_vendor.o(($event) => _ctx.value = $event),
        o: common_vendor.p({
          value: "3",
          size: "16",
          readonly: true,
          touchable: true,
          modelValue: _ctx.value
        }),
        p: common_vendor.f(9, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        q: common_vendor.sr(infoPopup, "18cea5aa-5", {
          "k": "infoPopup"
        }),
        r: common_vendor.p({
          type: "bottom"
        }),
        s: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        t: common_vendor.o(clickScoreClose),
        v: common_vendor.o(($event) => userScore.value = $event),
        w: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        x: common_vendor.t(userScore.value),
        y: common_vendor.o(submiScore),
        z: !userScore.value,
        A: common_vendor.sr(scorePopup, "18cea5aa-8", {
          "k": "scorePopup"
        }),
        B: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18cea5aa"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/preView/preView.vue"]]);
tt.createPage(MiniProgramPage);
