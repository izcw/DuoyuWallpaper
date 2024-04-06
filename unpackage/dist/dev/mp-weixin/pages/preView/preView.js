"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
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
    let {
      height
    } = common_vendor.index.getMenuButtonBoundingClientRect();
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(5, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(maskChange),
        c: common_assets._imports_0$1,
        d: common_vendor.p({
          type: "back",
          color: "#ccc",
          size: "20"
        }),
        e: common_vendor.o(goBack),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.unref(height) + "px",
        h: common_vendor.unref(height) + "px",
        i: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        j: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        k: common_vendor.p({
          type: "info",
          size: "20"
        }),
        l: common_vendor.o(clickInfo),
        m: common_vendor.p({
          type: "star",
          size: "20"
        }),
        n: common_vendor.o(clickScore),
        o: common_vendor.p({
          type: "download",
          size: "20"
        }),
        p: maskState.value,
        q: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        r: common_vendor.o(clickInfoClose),
        s: common_vendor.o(($event) => _ctx.value = $event),
        t: common_vendor.p({
          value: "3",
          size: "16",
          readonly: true,
          touchable: true,
          modelValue: _ctx.value
        }),
        v: common_vendor.f(9, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        w: common_vendor.sr(infoPopup, "18cea5aa-6", {
          "k": "infoPopup"
        }),
        x: common_vendor.p({
          type: "bottom"
        }),
        y: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        z: common_vendor.o(clickScoreClose),
        A: common_vendor.o(($event) => userScore.value = $event),
        B: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        C: common_vendor.t(userScore.value),
        D: common_vendor.o(submiScore),
        E: !userScore.value,
        F: common_vendor.sr(scorePopup, "18cea5aa-9", {
          "k": "scorePopup"
        }),
        G: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18cea5aa"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/preView/preView.vue"]]);
wx.createPage(MiniProgramPage);
