"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
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
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const classList = common_vendor.ref([]);
    const readImags = common_vendor.ref([]);
    const currentInfo = common_vendor.ref(null);
    const isScore = common_vendor.ref(false);
    const strogClassList = common_vendor.index.getStorageSync("strogClassList") || [];
    classList.value = strogClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
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
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const submiScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let res = await api_apis.apiGetSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("strogClassList", classList.value);
        clickScoreClose();
      }
    };
    let {
      height
    } = common_vendor.index.getMenuButtonBoundingClientRect();
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad((e) => {
      currentId.value = e.id;
      currentIndex.value = classList.value.findIndex((item) => {
        return item._id == currentId.value;
      });
      currentInfo.value = classList.value[currentIndex.value];
      readImages();
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
      readImages();
    };
    const readImages = () => {
      readImags.value.push(
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
      readImags.value = [...new Set(readImags.value)];
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImags.value.includes(index)
          }, readImags.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        b: currentIndex.value,
        c: common_vendor.o(swiperChange),
        d: common_vendor.p({
          type: "back",
          color: "#ccc",
          size: "20"
        }),
        e: common_vendor.o(goBack),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.unref(height) + "px",
        h: common_vendor.unref(height) + "px",
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(classList.value.length),
        k: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        m: common_vendor.p({
          type: "info",
          size: "20"
        }),
        n: common_vendor.o(clickInfo),
        o: common_vendor.p({
          type: "star",
          size: "20"
        }),
        p: common_vendor.t(currentInfo.value.score),
        q: common_vendor.o(clickScore),
        r: common_vendor.p({
          type: "download",
          size: "20"
        }),
        s: maskState.value,
        t: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        v: common_vendor.o(clickInfoClose),
        w: common_vendor.t(currentInfo.value._id),
        x: common_vendor.t(currentInfo.value.nickname),
        y: common_vendor.o(($event) => _ctx.value = $event),
        z: common_vendor.p({
          value: currentInfo.value.score,
          size: "16",
          readonly: true,
          touchable: true,
          modelValue: _ctx.value
        }),
        A: common_vendor.t(currentInfo.value.score),
        B: common_vendor.t(currentInfo.value.description),
        C: common_vendor.f(currentInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        D: common_vendor.sr(infoPopup, "18cea5aa-6", {
          "k": "infoPopup"
        }),
        E: common_vendor.p({
          type: "bottom"
        }),
        F: common_vendor.t(isScore.value ? "评分过了～" : "壁纸评分"),
        G: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        H: common_vendor.o(clickScoreClose),
        I: common_vendor.o(($event) => userScore.value = $event),
        J: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        K: common_vendor.t(userScore.value),
        L: common_vendor.o(submiScore),
        M: !userScore.value,
        N: !isScore.value,
        O: common_vendor.sr(scorePopup, "18cea5aa-9", {
          "k": "scorePopup"
        }),
        P: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18cea5aa"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/preView/preView.vue"]]);
wx.createPage(MiniProgramPage);
