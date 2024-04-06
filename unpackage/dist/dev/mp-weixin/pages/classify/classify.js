"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  _easycom_theme_item2();
}
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  _easycom_theme_item();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.f(15, (item, k0, i0) => {
      return {
        a: "6bcfa975-0-" + i0
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bcfa975"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/classify/classify.vue"]]);
wx.createPage(MiniProgramPage);
