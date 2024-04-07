"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uv_skeletons2 = common_vendor.resolveComponent("uv-skeletons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uv_skeletons2 + _easycom_uni_load_more2)();
}
const _easycom_uv_skeletons = () => "../../uni_modules/uv-skeletons/components/uv-skeletons/uv-skeletons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uv_skeletons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "classList",
  setup(__props) {
    let queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    common_vendor.onLoad((e) => {
      let {
        id = null,
        name = null
      } = e;
      queryParams.classid = id;
      common_vendor.index.setNavigationBarTitle({
        // 设置标题名
        title: name
      });
      getClassList();
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.pageNum++;
      getClassList();
    });
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const getClassList = async () => {
      let res = await api_apis.apiGetClassList(queryParams);
      if (queryParams.pageSize > res.data.length)
        noData.value = true;
      classList.value = [...classList.value, ...res.data];
    };
    let loading = common_vendor.ref(true);
    let animate = common_vendor.ref(true);
    let skeleton = common_vendor.ref([{
      type: "custom",
      style: "width:240rpx;height:400rpx;"
    }]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length && !noData.value
      }, !classList.value.length && !noData.value ? {
        b: common_vendor.f(12, (item, k0, i0) => {
          return {
            a: "104357ab-0-" + i0
          };
        }),
        c: common_vendor.p({
          loading: common_vendor.unref(loading),
          skeleton: common_vendor.unref(skeleton),
          animate: common_vendor.unref(animate)
        })
      } : {}, {
        d: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id
          };
        }),
        e: classList.value.length || noData.value
      }, classList.value.length || noData.value ? {
        f: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/classList/classList.vue"]]);
tt.createPage(MiniProgramPage);
