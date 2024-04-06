"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const clickContact = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: clickContact()
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(3, (item, k0, i0) => {
          return {
            a: "0f7520f0-0-" + i0,
            b: "0f7520f0-1-" + i0
          };
        }),
        b: common_vendor.p({
          type: "contact",
          size: "20"
        }),
        c: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        d: common_vendor.p({
          type: "contact",
          size: "20"
        }),
        e: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        f: common_vendor.o(clickContact),
        g: common_vendor.f(3, (item, k0, i0) => {
          return {
            a: "0f7520f0-4-" + i0,
            b: "0f7520f0-5-" + i0
          };
        }),
        h: common_vendor.p({
          type: "contact",
          size: "20"
        }),
        i: common_vendor.p({
          type: "right",
          size: "18",
          color: "#aaa"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/user/user.vue"]]);
tt.createPage(MiniProgramPage);
