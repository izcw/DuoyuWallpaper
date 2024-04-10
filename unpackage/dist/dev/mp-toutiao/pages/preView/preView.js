"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
require("../../utils/request.js");
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
    common_vendor.index.getMenuButtonBoundingClientRect();
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
    const clickDownload = () => {
      common_vendor.index.showLoading({
        title: "下载中...",
        mask: true
      });
      common_vendor.index.getImageInfo({
        src: currentInfo.value.picurl,
        success(res) {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.path,
            success(rest) {
              common_vendor.index.showToast({
                title: "保存成功，请到相册查看",
                icon: "none"
              });
            },
            fail: (err) => {
              if (err.errMsg == "uni.saveImageToPhotosAlbum:fail cancel") {
                common_vendor.index.showToast({
                  title: "保存失败，请重新点击下载",
                  icon: "none"
                });
                return;
              }
              common_vendor.index.showModal({
                title: "授权提示",
                content: "需要授权保存相册",
                success: (resh) => {
                  if (resh.confirm) {
                    common_vendor.index.openSetting({
                      success: (setting) => {
                        if (setting.authSetting["scope.writePhotosAlbum"]) {
                          common_vendor.index.showToast({
                            title: "获取授权成功",
                            icon: "none"
                          });
                        } else {
                          common_vendor.index.showToast({
                            title: "获取授权失败！",
                            icon: "none"
                          });
                        }
                      }
                    });
                  }
                }
              });
            },
            complete: () => {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImags.value.includes(index)
          }, readImags.value.includes(index) ? {
            b: common_vendor.o(maskChange),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        b: currentIndex.value,
        c: common_vendor.o(swiperChange),
        d: common_vendor.t(currentIndex.value + 1),
        e: common_vendor.t(classList.value.length),
        f: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        g: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        h: common_vendor.p({
          type: "info",
          size: "20"
        }),
        i: common_vendor.o(clickInfo),
        j: common_vendor.p({
          type: "star",
          size: "20"
        }),
        k: common_vendor.t(currentInfo.value.score),
        l: common_vendor.o(clickScore),
        m: common_vendor.p({
          type: "download",
          size: "20"
        }),
        n: common_vendor.o(clickDownload),
        o: maskState.value,
        p: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        q: common_vendor.o(clickInfoClose),
        r: common_vendor.t(currentInfo.value._id),
        s: common_vendor.t(currentInfo.value.nickname),
        t: common_vendor.o(($event) => _ctx.value = $event),
        v: common_vendor.p({
          value: currentInfo.value.score,
          size: "16",
          readonly: true,
          touchable: true,
          modelValue: _ctx.value
        }),
        w: common_vendor.t(currentInfo.value.score),
        x: common_vendor.t(currentInfo.value.description),
        y: common_vendor.f(currentInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        z: common_vendor.sr(infoPopup, "18cea5aa-5", {
          "k": "infoPopup"
        }),
        A: common_vendor.p({
          type: "bottom"
        }),
        B: common_vendor.t(isScore.value ? "评分过了～" : "壁纸评分"),
        C: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        D: common_vendor.o(clickScoreClose),
        E: common_vendor.o(($event) => userScore.value = $event),
        F: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        G: common_vendor.t(userScore.value),
        H: common_vendor.o(submiScore),
        I: !userScore.value,
        J: !isScore.value,
        K: common_vendor.sr(scorePopup, "18cea5aa-8", {
          "k": "scorePopup"
        }),
        L: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18cea5aa"], ["__file", "/Users/izcw/Desktop/我的项目/DuoyuWallpaper/pages/preView/preView.vue"]]);
tt.createPage(MiniProgramPage);
